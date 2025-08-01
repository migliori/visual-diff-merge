/**
 * File Browser Manager
 * Handles file selection, comparison, and diff visualization
 *
 * This component is responsible for the file browser UI in diff-viewer/file-browser.php
 */

import Selectors from '../../constants/Selectors';
import { Debug } from '../../utils/Debug';
import { TranslationManager } from '../../utils/TranslationManager';
import { LoaderManager } from '../../utils/LoaderManager';
import AlertManager from '../../utils/AlertManager';
import { DiffConfigManager } from '../../utils/DiffConfigManager';

/**
 * Manages the file browser UI and functionality
 */
export class FileBrowserManager {
    /**
     * @param {Object} options - Configuration options
     */
    constructor(options = {}) {
        // Check if we have the new single select or the old dual selects
        this.compareFileSelect = document.getElementById('compare-file');
        this.oldFileSelect = document.getElementById('old-file');
        this.newFileSelect = document.getElementById('new-file');

        // Debug: Log which elements were found
        Debug.log('FileBrowserManager: Constructor - Element detection', {
            compareFileSelect: !!this.compareFileSelect,
            oldFileSelect: !!this.oldFileSelect,
            newFileSelect: !!this.newFileSelect
        }, 2);

        // Initialize loader manager
        this.loaderManager = LoaderManager.getInstance();

        // Initialize translation manager
        this.translationManager = TranslationManager.getInstance();

        // Initialize asynchronously to ensure server config is loaded
        this.initAsync(options);
    }

    /**
     * Async initialization to ensure server config is loaded first
     * @param {Object} options - Configuration options
     */
    async initAsync(options = {}) {
        try {
            // Initialize the DiffConfigManager with the options
            const configManager = DiffConfigManager.getInstance();
            await configManager.initialize({
                container: 'vdm-diff__viewer',
                ...options
            });

            // Now proceed with normal initialization
            this.init();
        } catch (error) {
            Debug.error('FileBrowserManager: Error during async initialization', error, 1);
            // Proceed with normal initialization even if server config failed
            this.init();
        }
    }

    /**
     * Initialize the file browser
     */
    init() {
        Debug.log('FileBrowserManager: Initializing', null, 2);

        // Check if we have the new single select system
        if (this.compareFileSelect) {
            Debug.log('FileBrowserManager: Using new single file select system', null, 2);
            // No need for sync in single select mode
        } else if (this.oldFileSelect && this.newFileSelect) {
            Debug.log('FileBrowserManager: Using legacy dual file select system', null, 2);
            // Add event listeners to selectors for legacy mode
            this.oldFileSelect.addEventListener('change', () => this.syncFileSelections());
            this.newFileSelect.addEventListener('change', () => {
                // When user manually selects a new file, we don't sync
            });
        } else {
            Debug.warn('FileBrowserManager: No valid file select elements found', null, 1);
        }

        // Form submit handler
        const form = document.getElementById('vdm-file-comparison-form');
        if (form) {
            form.addEventListener('submit', (event) => this.handleComparison(event));
        } else {
            Debug.warn('FileBrowserManager: Form element not found', null, 1);
        }

        // Initial sync
        this.syncFileSelections();

        Debug.log('FileBrowserManager: Initialization complete', null, 2);
    }

    /**
     * Handle file comparison form submission
     * @param {Event} event - Form submit event
     */
    async handleComparison(event) {
        event.preventDefault();
        Debug.log('FileBrowserManager: Handling comparison', null, 2);

        // Get the AlertManager instance to clear any existing alerts
        const alertManager = AlertManager.getInstance();
        alertManager.hideAlert();

        // Get the container wrapper element
        const containerWrapper = document.getElementById(Selectors.CONTAINER.WRAPPER.replace('#', ''));

        // Clear any existing content immediately before loading new content
        this.clearUI();

        // Show the container wrapper if it's hidden
        if (containerWrapper?.classList.contains('vdm-d-none')) {
            containerWrapper.classList.remove('vdm-d-none');
        }

        // Show an early loader before starting the process
        const loaderId = this.loaderManager.showEarlyLoader(
            this.translationManager.get('loadingContent', 'Processing content...')
        );

        try {
            // Clean up previous instances first
            this.cleanupPreviousInstance();

            // 1. Gather selected file data
            const fileData = this.getSelectedFilesData();

            // 2. Fetch file contents
            this.loaderManager.updateLoaderMessage(loaderId, this.translationManager.get('loadingContent', 'Loading file contents...'));
            const contents = await this.fetchFileContents(fileData);

            // Check for identical content
            if (contents.old === contents.new) {
                Debug.log('FileBrowserManager: File contents are identical', null, 2);
                this.loaderManager.hideMainLoader(loaderId);
                this.handleIdenticalContent();
                return;
            }

            // 3. Configure diffConfig
            this.configureDiffData(fileData, contents);

            // 4. Process diff data
            this.loaderManager.updateLoaderMessage(loaderId, this.translationManager.get('processingChunks', 'Processing diff...'));
            const result = await this.processDiff();

            // Skip if identical content
            if (result.identical) {
                Debug.log('FileBrowserManager: Files contain identical content according to backend', null, 2);
                this.loaderManager.hideMainLoader(loaderId);
                this.handleIdenticalContent();
                return;
            }

            // 5. Update diffConfig with result - preserving runtime values
            const configManager = DiffConfigManager.getInstance();

            // Use the safe setDiffConfig method to preserve critical runtime values like fileRefId
            configManager.setDiffConfigSafe(result);

            Debug.log('FileBrowserManager: DiffConfig updated safely with preserved runtime values', {
                fileRefId: window.diffConfig.fileRefId,
                oldFileRefId: window.diffConfig.oldFileRefId,
                serverSaveEnabled: window.diffConfig.serverSaveEnabled
            }, 1);

            // 6. Initialize the UI manager
            this.loaderManager.updateLoaderMessage(loaderId, this.translationManager.get('loadingDiff', 'Initializing viewer...'));
            const uiManagerSuccess = await this.initializeUIManager();

            if (!uiManagerSuccess) {
                Debug.error('FileBrowserManager: Failed to initialize UI manager', null, 1);
                this.loaderManager.hideMainLoader(loaderId);
                return;
            }

            // 7. Initialize diff viewer
            await this.initializeDiffViewer();

            // Note: We don't hide the loader here since DiffViewer will adopt it
        } catch (error) {
            Debug.error('FileBrowserManager: Error during comparison', error, 1);
            // Hide the loader if there's an error
            this.loaderManager.hideMainLoader(loaderId);

            // Get elements for error display
            const viewerElement = document.getElementById('vdm-diff__viewer');
            this.handleError(error, null, viewerElement);
        }
    }

    /**
     * Clean up previous instances
     */
    cleanupPreviousInstance() {
        // Clean up previous instances if they exist
        if (window.diffViewer) {
            try {
                Debug.log('FileBrowserManager: Cleaning up previous DiffViewer instance', null, 2);
                window.diffViewer.destroy();
                window.diffViewer = null;
            } catch (e) {
                Debug.warn('FileBrowserManager: Error destroying previous diffViewer', e, 1);
            }
        }

        if (window.vdmBrowserUIManager) {
            try {
                Debug.log('FileBrowserManager: Cleaning up previous BrowserUIManager instance', null, 2);
                window.vdmBrowserUIManager.destroy();
                window.vdmBrowserUIManager = null;
            } catch (e) {
                Debug.warn('FileBrowserManager: Error destroying previous BrowserUIManager', e, 1);
            }
        }
    }

    /**
     * Initialize the UI manager
     * @returns {Promise<boolean>} Success status
     */
    async initializeUIManager() {
        Debug.log('FileBrowserManager: Initializing UI manager', null, 2);

        // Import the BrowserUIManager if available
        if (typeof BrowserUIManager !== 'undefined') {
            try {
                // Create new instance with the global window.diffConfig
                window.vdmBrowserUIManager = new BrowserUIManager(window.diffConfig);

                // Initialize with container
                const initResult = await window.vdmBrowserUIManager.initialize(Selectors.CONTAINER.WRAPPER);

                if (initResult) {
                    return true;
                } else {
                    Debug.warn('FileBrowserManager: BrowserUIManager initialize returned false, falling back to manual UI creation', null, 1);
                    return this.createBasicUIElements();
                }
            } catch (error) {
                Debug.error('FileBrowserManager: BrowserUIManager initialize failed', error, 1);
                Debug.warn('FileBrowserManager: Falling back to manual UI creation due to BrowserUIManager error', null, 1);
                return this.createBasicUIElements();
            }
        } else {
            Debug.warn('FileBrowserManager: BrowserUIManager not available, UI elements must be created manually', null, 1);
            // Fallback: Create basic UI elements manually
            return this.createBasicUIElements();
        }
    }

    /**
     * Initialize the diff viewer
     * @returns {Promise<boolean>} Success status
     */
    async initializeDiffViewer() {
        Debug.log('FileBrowserManager: Initializing diff viewer', null, 2);

        // Check if DiffViewer is available
        if (typeof DiffViewer !== 'undefined') {
            const configManager = DiffConfigManager.getInstance();

            // Update container with correct selector ID
            configManager.set('container', Selectors.DIFF.VIEWER.replace('#', ''));

            // Ensure the runtime properties are set at the top level where DiffViewer expects them
            if (!window.diffConfig.fileRefId && window.diffConfig.new?.ref_id) {
                configManager.set('fileRefId', window.diffConfig.new.ref_id);
                Debug.log('FileBrowserManager: Setting top-level fileRefId from new.ref_id', window.diffConfig.new.ref_id, 1);
            }

            // SECURITY: Use safe filenames and fileRefIds, not server paths
            if (!window.diffConfig.newFileName && window.diffConfig.new?.filename) {
                configManager.set('newFileName', window.diffConfig.new.filename);
                Debug.log('FileBrowserManager: Setting top-level newFileName from new.filename', window.diffConfig.new.filename, 1);
            }

            // Always explicitly set serverSaveEnabled if we have file references
            // Use the value that was just set or the current value
            const currentFileRefId = window.diffConfig.fileRefId || window.diffConfig.new?.ref_id || '';
            const hasFileRefs = !!(currentFileRefId || window.diffConfig.oldFileRefId || window.diffConfig.old?.ref_id);
            configManager.set('serverSaveEnabled', hasFileRefs);
            Debug.log('FileBrowserManager: Setting serverSaveEnabled', {
                hasFileRefs,
                currentFileRefId,
                oldFileRefId: window.diffConfig.oldFileRefId || window.diffConfig.old?.ref_id
            }, 1);

            // DEBUG log the final diffConfig properties before initialization
            Debug.log('FileBrowserManager: Final diffConfig settings before initialization', {
                fileRefId: window.diffConfig.fileRefId,
                oldFileRefId: window.diffConfig.oldFileRefId,
                newFileName: window.diffConfig.newFileName,
                oldFileName: window.diffConfig.oldFileName,
                serverSaveEnabled: window.diffConfig.serverSaveEnabled,
                demoEnabled: window.diffConfig.demoEnabled
            }, 1);

            // Validate the diff data before attempting to initialize
            if (!window.diffConfig.diffData ||
                !Array.isArray(window.diffConfig.diffData.chunks) ||
                window.diffConfig.diffData.chunks.length === 0) {

                Debug.warn('FileBrowserManager: No valid diff data found for initialization', {
                    hasDiffData: !!window.diffConfig.diffData,
                    diffDataKeys: window.diffConfig.diffData ? Object.keys(window.diffConfig.diffData) : []
                }, 1);

                // Get container element
                const viewerContainer = document.getElementById(window.diffConfig.container);
                if (viewerContainer) {
                    viewerContainer.innerHTML = `
                        <div class="${Selectors.UTILITY.ALERT_WARNING}">
                            <h4>No Differences Found</h4>
                            <p>The files appear to be identical or the diff engine couldn't process them correctly.</p>
                            <p>Try selecting different files to compare.</p>
                        </div>
                    `;
                }

                // Return early to prevent initialization errors
                return false;
            }

            // Create a new DiffViewer instance
            window.diffViewer = new DiffViewer(window.diffConfig);

            // Initialize the viewer
            const initResult = await window.diffViewer.initialize();

            Debug.log('FileBrowserManager: DiffViewer initialization result', initResult, 2);
            Debug.log('FileBrowserManager: BrowserUIManager available', !!window.vdmBrowserUIManager, 2);

            // Ensure theme elements are available and visible when diff UI is successfully displayed
            if (initResult) {
                // Always ensure the BrowserUIManager has generated theme elements and make them visible
                if (window.vdmBrowserUIManager) {
                    // First ensure theme switcher exists (regenerate if needed)
                    const themeSwitcherId = Selectors.THEME.SWITCHER.name();
                    const themeSwitcherExists = !!document.getElementById(themeSwitcherId);
                    Debug.log('FileBrowserManager: Theme switcher exists in DOM', themeSwitcherExists, 2);

                    if (!themeSwitcherExists) {
                        Debug.log('FileBrowserManager: Theme switcher not found, regenerating', null, 2);
                        window.vdmBrowserUIManager.generateThemeSwitcher();
                    }

                    // Always call showThemeElements to ensure proper visibility
                    if (typeof window.vdmBrowserUIManager.showThemeElements === 'function') {
                        Debug.log('FileBrowserManager: Calling showThemeElements after DiffViewer initialization', null, 2);
                        window.vdmBrowserUIManager.showThemeElements();
                    }
                } else {
                    Debug.warn('FileBrowserManager: BrowserUIManager not available, cannot show theme elements', null, 1);
                }
            } else {
                Debug.warn('FileBrowserManager: DiffViewer initialization failed, not showing theme elements', null, 1);
            }

            return initResult;
        } else if (typeof window.enableDiffViewer === 'function') {
            // Fall back to the global enableDiffViewer function if available
            Debug.log('FileBrowserManager: DiffViewer not available, falling back to enableDiffViewer', null, 2);
            return window.enableDiffViewer();
        } else {
            Debug.error('FileBrowserManager: DiffViewer not available', null, 1);
            throw new Error('DiffViewer not available');
        }
    }

    /**
     * Get selected files data
     * @returns {Object} Selected files data
     */
    getSelectedFilesData() {
        Debug.log('FileBrowserManager: Getting selected files data', null, 3);

        // Check if we're using the new single select system
        if (this.compareFileSelect) {
            Debug.log('FileBrowserManager: Using single select system', null, 3);

            if (this.compareFileSelect.selectedIndex < 0) {
                throw new Error('No file selected');
            }

            const selectedOption = this.compareFileSelect.options[this.compareFileSelect.selectedIndex];
            if (!selectedOption) {
                throw new Error('Selected option not found');
            }

            const oldRefId = selectedOption.getAttribute('data-old-ref-id');
            const newRefId = selectedOption.getAttribute('data-new-ref-id');
            const oldPath = selectedOption.getAttribute('data-old-path');
            const newPath = selectedOption.getAttribute('data-new-path');

            if (!oldRefId || !newRefId) {
                throw new Error('Missing file reference IDs in selected option');
            }

            Debug.log('FileBrowserManager: Single select data', {
                oldRefId, newRefId, oldPath, newPath
            }, 3);

            return {
                old: {
                    path: oldPath,
                    // SECURITY: Only retrieve file reference ID, not server path
                    refId: oldRefId
                },
                new: {
                    path: newPath,
                    // SECURITY: Only retrieve file reference ID, not server path
                    refId: newRefId
                }
            };
        }

        // Fallback to legacy dual select system
        if (this.oldFileSelect && this.newFileSelect) {
            Debug.log('FileBrowserManager: Using legacy dual select system', null, 3);
            return {
                old: {
                    path: this.oldFileSelect.value,
                    // SECURITY: Only retrieve file reference ID, not server path
                    refId: this.oldFileSelect.options[this.oldFileSelect.selectedIndex]
                        .getAttribute('data-ref-id')
                },
                new: {
                    path: this.newFileSelect.value,
                    // SECURITY: Only retrieve file reference ID, not server path
                    refId: this.newFileSelect.options[this.newFileSelect.selectedIndex]
                        .getAttribute('data-ref-id')
                }
            };
        }

        throw new Error('No valid file selection elements found');
    }

    /**
     * Fetch file contents
     * @param {Object} fileData - File data object
     * @returns {Promise<Object>} File contents
     */
    async fetchFileContents(fileData) {
        Debug.log('FileBrowserManager: Fetching file contents', fileData, 3);

        // Use the API endpoint to safely retrieve file content
        const fetchFile = async (filePath, refId) => {
            // SECURITY: Always use fileRefId when available
            if (refId) {
                Debug.log('FileBrowserManager: Using reference ID for file', { filePath, refId }, 3);

                // Get API URL from DiffConfigManager (which has the latest server config)
                const configManager = DiffConfigManager.getInstance();
                const baseApiUrl = configManager.get('apiBaseUrl') || window.diffConfig?.apiBaseUrl || '../api/';
                const apiUrl = `${baseApiUrl}get-file-content.php?refId=${encodeURIComponent(refId)}`;

                Debug.log('FileBrowserManager: API URL', { apiUrl, baseApiUrl }, 3);
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`Failed to load file: ${filePath} (Status: ${response.status})`);
                }

                const data = await response.json();
                return data.content;
            }
            // Last resort: try direct fetch of the file path (should be a relative path only)
            else {
                Debug.log('FileBrowserManager: Using direct path for file', { filePath }, 3);

                // SECURITY: Ensure the path is not absolute or contains dangerous patterns
                if (filePath.match(/^(\/|\\|https?:|file:|[a-zA-Z]:\\)/i)) {
                    throw new Error(`Invalid file path format: ${filePath}`);
                }

                const response = await fetch(filePath);

                if (!response.ok) {
                    throw new Error(`Failed to load file: ${filePath} (Status: ${response.status})`);
                }

                return await response.text();
            }
        };

        try {
            const oldContent = await fetchFile(fileData.old.path, fileData.old.refId);
            const newContent = await fetchFile(fileData.new.path, fileData.new.refId);

            // Check if contents are identical
            if (oldContent === newContent) {
                Debug.log('FileBrowserManager: Files contain identical content', null, 2);

                return {
                    old: oldContent,
                    new: newContent,
                    identical: true
                };
            }

            return {
                old: oldContent,
                new: newContent
            };
        } catch (error) {
            Debug.error('FileBrowserManager: Failed to load one or both files', error, 1);
            throw error;
        }
    }

    /**
     * Configure diff data
     * @param {Object} fileData - File data object
     * @param {Object} contents - File contents
     */
    configureDiffData(fileData, contents) {
        Debug.log('FileBrowserManager: Configuring diff data', fileData, 3);

        // DEBUG: Log file reference data before configuration
        Debug.log('FileBrowserManager: File reference data before configuration', {
            old: {
                refId: fileData.old.refId,
                path: fileData.old.path
            },
            new: {
                refId: fileData.new.refId,
                path: fileData.new.path
            }
        }, 1);

        // Extract just the filenames (not paths) for security
        const oldFileName = fileData.old.path.split('/').pop();
        const newFileName = fileData.new.path.split('/').pop();

        const configManager = DiffConfigManager.getInstance();

        // Set the old file data
        configManager.update({
            old: {
                type: 'file',
                content: contents.old,
                path: fileData.old.path,
                ref_id: fileData.old.refId,
                filename: oldFileName
            },
            new: {
                type: 'file',
                content: contents.new,
                path: fileData.new.path,
                ref_id: fileData.new.refId,
                filename: newFileName
            },
            filepath: newFileName,
            fileRefId: fileData.new.refId || '',
            oldFileRefId: fileData.old.refId || '',
            newFileName: newFileName,
            oldFileName: oldFileName,
            serverSaveEnabled: !!(fileData.new.refId || fileData.old.refId)
        });

        // DEBUG: Log the configured diffConfig
        Debug.log('FileBrowserManager: Configured diffConfig file references', {
            fileRefId: window.diffConfig.fileRefId,
            oldFileRefId: window.diffConfig.oldFileRefId,
            newFileName: window.diffConfig.newFileName,
            oldFileName: window.diffConfig.oldFileName,
            serverSaveEnabled: window.diffConfig.serverSaveEnabled,
            old: {
                ref_id: window.diffConfig.old.ref_id,
                filename: window.diffConfig.old.filename
            },
            new: {
                ref_id: window.diffConfig.new.ref_id,
                filename: window.diffConfig.new.filename
            }
        }, 1);
    }

    /**
     * Process diff with API
     * @returns {Promise<Object>} API response
     */
    async processDiff() {
        Debug.log('FileBrowserManager: Processing diff with API', null, 2);
        // Use endpoint discovery if available
        let diffProcessorEndpoint;

        try {
            // Try to use the global endpoint discovery instance
            if (window.vdmEndpointDiscovery) {
                diffProcessorEndpoint = await window.vdmEndpointDiscovery.getEndpoint('diffProcessor');
                Debug.log('FileBrowserManager: Endpoint discovery found endpoint', diffProcessorEndpoint, 2);
            } else {
                // Fall back to config or default - use DiffConfigManager for latest server config
                const configManager = DiffConfigManager.getInstance();
                const baseApiUrl = configManager.get('apiBaseUrl') || window.diffConfig?.apiBaseUrl || '../api/';
                diffProcessorEndpoint = window.diffConfig?.apiEndpoints?.diffProcessor || `${baseApiUrl}diff-processor.php`;
                Debug.log('FileBrowserManager: Using fallback endpoint', diffProcessorEndpoint, 2);
            }
        } catch (error) {
            Debug.warn('FileBrowserManager: Error discovering endpoints', error, 1);
            // Fall back to config or default - use DiffConfigManager for latest server config
            const configManager = DiffConfigManager.getInstance();
            const baseApiUrl = configManager.get('apiBaseUrl') || window.diffConfig?.apiBaseUrl || '../api/';
            diffProcessorEndpoint = window.diffConfig?.apiEndpoints?.diffProcessor || `${baseApiUrl}diff-processor.php`;
        }

        const response = await fetch(diffProcessorEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(window.diffConfig)
        });

        if (!response.ok) {
            Debug.error('FileBrowserManager: API request failed', {
                status: response.status,
                statusText: response.statusText
            }, 1);
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        if (result.error) {
            Debug.error('FileBrowserManager: API returned error', result.error, 1);
            throw new Error(result.error);
        }

        // Initialize TranslationManager with server-provided data
        const translationManager = TranslationManager.getInstance();
        if (result.config && result.config.translations) {
            const lang = result.config.lang || 'en';
            Debug.log(`FileBrowserManager: Initializing TranslationManager with "${lang}" language from server response`, result.config.translations, 2);
            translationManager.initialize(lang, result.config.translations);
        }

        // Move all properties from the nested config object to the root level
        if (result.config && typeof result.config === 'object') {
            Debug.log('FileBrowserManager: Moving all properties from config to root level', result.config, 2);

            // Loop through all properties in config and move them to the root level
            Object.keys(result.config).forEach(key => {
                // Only copy if the property doesn't already exist at root level
                // or if it does exist but is empty/undefined
                // EXCEPTION: Never overwrite serverSaveEnabled as it's determined by FileBrowserManager
                if (key === 'serverSaveEnabled') {
                    Debug.log('FileBrowserManager: Preserving existing serverSaveEnabled, not overwriting from server',
                        { existing: result.serverSaveEnabled, fromServer: result.config[key] }, 2);
                    return; // Skip this key
                }

                if (result[key] === undefined ||
                    (key === 'diffData' && (!result[key]?.chunks || result[key].chunks.length === 0))) {
                    Debug.log(`FileBrowserManager: Moving ${key} from config to root level`, result.config[key], 3);
                    result[key] = result.config[key];
                }
            });
        }

        return result;
    }

    /**
     * Update diff config with API response
     * @param {Object} result - API response
     */
    updateDiffConfig(result) {
        Debug.log('FileBrowserManager: Updating diff config with API response', null, 3);
        // Make sure we have a valid result
        if (!result || typeof result !== 'object') {
            Debug.error('FileBrowserManager: Invalid result from API', result, 1);
            this.diffConfig.diffData = {
                old: [],
                new: [],
                chunks: []
            };
            return;
        }

        // PRIORITIZE SERVER TRANSLATIONS - Do this first, before anything else
        if (result.config?.translations) {
            // Make sure translations are set in window.diffConfig immediately
            if (!window.diffConfig) {
                window.diffConfig = {};
            }

            window.diffConfig.lang = result.config.lang || 'en';
            window.diffConfig.translations = result.config.translations;

            // Also update this.diffConfig
            this.diffConfig.lang = result.config.lang || 'en';
            this.diffConfig.translations = result.config.translations;

            Debug.log('FileBrowserManager: Server translations set in window.diffConfig', {
                lang: window.diffConfig.lang,
                translationCount: Object.keys(window.diffConfig.translations).length
            }, 1);
        }

        // Add demoEnabled flag from the server response
        if (result.config && result.config.demoEnabled !== undefined) {
            this.diffConfig.demoEnabled = result.config.demoEnabled;
            Debug.log('FileBrowserManager: Demo mode flag set from server', this.diffConfig.demoEnabled, 2);
        }

        // Handle case where the diffData is directly provided
        if (result.diffData) {
            this.diffConfig.diffData = {
                old: result.diffData.old || [],
                new: result.diffData.new || [],
                chunks: result.diffData.chunks || []
            };
        }
        // Handle case where diff components are at the root level
        else if (result.old || result.new || result.chunks) {
            this.diffConfig.diffData = {
                old: result.old?.lines || [],
                new: result.new?.lines || [],
                chunks: result.chunks || []
            };
        }
        // Handle case where we have data but in an unexpected format
        else if (result.success === true && result.config) {
            // Try to extract diffData from the config
            if (result.config.diffData) {
                this.diffConfig.diffData = result.config.diffData;
            } else {
                // Create empty structure as fallback
                this.diffConfig.diffData = {
                    old: [],
                    new: [],
                    chunks: []
                };
                Debug.warn('FileBrowserManager: API returned success but no diffData was found in the response', result, 2);
            }
        }
        // Fallback when no recognizable diff data is found
        else {
            // Create empty structure as fallback
            this.diffConfig.diffData = {
                old: [],
                new: [],
                chunks: []
            };
            Debug.warn('FileBrowserManager: Could not extract diff data from API response', result, 2);
        }

        // Additional validations
        if (!Array.isArray(this.diffConfig.diffData.old)) {
            this.diffConfig.diffData.old = [];
            Debug.warn('FileBrowserManager: diffData.old is not an array, using empty array instead', null, 2);
        }

        if (!Array.isArray(this.diffConfig.diffData.new)) {
            this.diffConfig.diffData.new = [];
            Debug.warn('FileBrowserManager: diffData.new is not an array, using empty array instead', null, 2);
        }

        if (!Array.isArray(this.diffConfig.diffData.chunks)) {
            this.diffConfig.diffData.chunks = [];
            Debug.warn('FileBrowserManager: diffData.chunks is not an array, using empty array instead', null, 2);
        }

        // Retain any other useful configuration from the result
        if (result.config) {
            // Extract useful configurations but avoid overriding already set values
            const { debug, theme, apiEndpoint } = result.config;

            if (debug !== undefined && this.diffConfig.debug === undefined) {
                this.diffConfig.debug = debug;
            }

            if (theme && !this.diffConfig.theme) {
                this.diffConfig.theme = theme;
            }

            if (apiEndpoint && !this.diffConfig.apiEndpoint) {
                this.diffConfig.apiEndpoint = apiEndpoint;
            }
        }

        // Preserve existing apiBaseUrl before updating window.diffConfig
        const existingApiBaseUrl = window.diffConfig?.apiBaseUrl;

        // Make diffConfig globally available
        window.diffConfig = { ...this.diffConfig };

        // Restore apiBaseUrl if it was previously set (client-side preference)
        // But give priority to server-provided apiBaseUrl
        if (result.config?.apiBaseUrl) {
            // Server provided apiBaseUrl takes priority
            window.diffConfig.apiBaseUrl = result.config.apiBaseUrl;
            this.diffConfig.apiBaseUrl = result.config.apiBaseUrl;
        } else if (existingApiBaseUrl) {
            // Fall back to existing client-side apiBaseUrl
            window.diffConfig.apiBaseUrl = existingApiBaseUrl;
            this.diffConfig.apiBaseUrl = existingApiBaseUrl;
        }
    }

    /**
     * Process API response, checking for demo mode
     * @param {Object} result - API response
     * @returns {boolean} Whether demo mode was detected and processed
     */
    processDemoResponse(result) {
        // Check if this was a demo response
        if (result.demo && result.simulated) {
            Debug.log('FileBrowserManager: Demo mode detected', null, 2);

            // Get the alert manager
            const alertManager = AlertManager.getInstance();

            // Get translation manager for proper messaging
            const translationManager = TranslationManager.getInstance();
            const title = translationManager.get('demoModeTitle', 'Simulation Complete');
            const message = result.message || translationManager.get('demoModeMessage', 'This is a demonstration only. Files will not be modified.');
            const simulated = translationManager.get('demoModeSimulated', 'Your merge choices would have been applied successfully in a real environment.');

            // Show demo message using the existing alert manager
            const demoMessage = `
                <strong>${title}</strong><br>
                ${message}<br>
                ${simulated}
            `;

            // Use the warning type to make it stand out
            alertManager.showWarning(demoMessage, {
                timeout: 0,
                translate: false
            });

            return true;
        }

        return false;
    }

    /**
     * Handle error
     * @param {Error} error - Error object
     * @param {HTMLElement} loadingElement - Loading element
     * @param {HTMLElement} viewerElement - Viewer element
     */
    handleError(error, loadingElement, viewerElement) {
        Debug.error('FileBrowserManager: Error processing diff', error, 1);

        // Hide loading indicator
        if (loadingElement) loadingElement.style.display = 'none';

        // Show error in viewer using AlertManager
        if (viewerElement) {
            viewerElement.style.display = 'flex';
            viewerElement.innerHTML = ''; // Clear existing content

            // Use AlertManager to create the alert
            const alertManager = AlertManager.getInstance();
            const errorMessage = `
                <h4>Error Processing Diff</h4>
                <p>${error.message}</p>
            `;

            const alertElement = alertManager.showError(errorMessage, {
                timeout: 0, // Don't auto-dismiss
                translate: false, // Error message doesn't need translation
                className: 'm-3' // Add margin for better appearance
            });

            viewerElement.appendChild(alertElement);
        }
    }

    /**
     * Clear the UI elements before loading new content
     * This method is called immediately when the form is submitted
     */
    clearUI() {
        Debug.log('FileBrowserManager: Clearing UI', null, 2);

        // Get the container wrapper element
        const containerWrapper = document.getElementById(Selectors.CONTAINER.WRAPPER.replace('#', ''));

        if (containerWrapper) {
            Debug.log('FileBrowserManager: Container wrapper found, current HTML length:', containerWrapper.innerHTML.length, 2);

            // Log all current children before preservation
            const currentChildren = Array.from(containerWrapper.children);
            Debug.log('FileBrowserManager: Current children before preservation:', currentChildren.map(child => `${child.tagName}#${child.id || 'no-id'}.${child.className || 'no-class'}`), 2);

            // Save elements that should be preserved before clearing
            const elementsToPreserve = [];

            // Save .vdm-user-content elements
            const userContentElements = containerWrapper.querySelectorAll('.vdm-user-content');
            userContentElements.forEach(element => {
                elementsToPreserve.push(element);
                element.remove(); // Remove from DOM temporarily
            });

            // Note: We no longer preserve theme selectors during clearUI as they will be
            // recreated appropriately based on whether diff UI is needed or not

            // Clear the container content while keeping its structure
            Debug.log(`FileBrowserManager: Clearing container innerHTML, current content: "${containerWrapper.innerHTML.substring(0, 100)}..."`, null, 2);
            containerWrapper.innerHTML = '';

            // Restore only user content elements (theme selectors will be recreated as needed)
            if (elementsToPreserve.length > 0) {
                Debug.log(`FileBrowserManager: Restoring ${elementsToPreserve.length} preserved elements (user content only)`, null, 2);
                elementsToPreserve.forEach((element, index) => {
                    Debug.log(`FileBrowserManager: Restoring element ${index + 1}: ${element.tagName}#${element.id || 'no-id'}.${element.className || 'no-class'}`, null, 3);
                    containerWrapper.appendChild(element);
                });
            } else {
                Debug.log('FileBrowserManager: No elements to restore', null, 2);
            }

            // Log final state
            const finalChildren = Array.from(containerWrapper.children);
            Debug.log('FileBrowserManager: Final children after restoration:', finalChildren.map(child => `${child.tagName}#${child.id || 'no-id'}.${child.className || 'no-class'}`), 2);
        }

        // Clear any result messages
        const resultContainer = document.getElementById('vdm-merge__result');
        if (resultContainer) {
            resultContainer.innerHTML = '';
            resultContainer.classList.add('vdm-d-none');
        }

        // Clean up any existing dynamic elements
        const existingViewers = document.querySelectorAll('.vdm-diff__viewer, .vdm-diff-ui');
        existingViewers.forEach(element => {
            element.innerHTML = '';
            // Either remove the element or hide it
            element.classList.add('vdm-d-none');
        });

        Debug.log('FileBrowserManager: UI cleared', null, 2);
    }

    /**
     * Sync file selections (only for legacy dual select system)
     */
    syncFileSelections() {
        Debug.log('FileBrowserManager: Syncing file selections', null, 3);

        // Only sync if we're using the legacy dual select system
        if (this.compareFileSelect) {
            Debug.log('FileBrowserManager: Skipping sync - using single select system', null, 3);
            return;
        }

        if (!this.oldFileSelect || !this.newFileSelect) {
            Debug.warn('FileBrowserManager: Cannot sync file selections - select elements not found', null, 2);
            return;
        }

        // Get the filename from the selected old file
        const oldValue = this.oldFileSelect.value;
        const oldFileName = oldValue.split('/').pop();

        // Try to find a matching file in the new files dropdown
        let matchFound = false;

        // First try exact match
        for (let i = 0; i < this.newFileSelect.options.length; i++) {
            const newOption = this.newFileSelect.options[i];
            const newFileName = newOption.value.split('/').pop();

            if (newFileName === oldFileName) {
                this.newFileSelect.selectedIndex = i;
                matchFound = true;
                break;
            }
        }

        // If no exact match, try extension match
        if (!matchFound) {
            const fileExt = oldFileName.split('.').pop();
            for (let i = 0; i < this.newFileSelect.options.length; i++) {
                const newValue = this.newFileSelect.options[i].value;
                if (newValue.endsWith('.' + fileExt)) {
                    this.newFileSelect.selectedIndex = i;
                    break;
                }
            }
        }
    }

    /**
     * Handle identical content case
     */
    handleIdenticalContent() {
        Debug.log('FileBrowserManager: Files contain identical content', null, 2);

        // Get the container wrapper element
        const containerWrapper = document.getElementById(Selectors.CONTAINER.WRAPPER.replace('#', ''));

        // Make sure the container wrapper is visible
        if (containerWrapper) {
            containerWrapper.classList.remove('vdm-d-none');
        }

        // Hide or remove theme selector when no diff UI is needed
        this.hideThemeSelector();

        // Also hide theme elements via BrowserUIManager if available
        if (window.vdmBrowserUIManager && typeof window.vdmBrowserUIManager.hideThemeElements === 'function') {
            window.vdmBrowserUIManager.hideThemeElements();
        }

        // Get translation manager and retrieve the message
        const translationManager = TranslationManager.getInstance();
        const message = translationManager.get('identicalContentMessage', 'The contents are identical. There\'s nothing to merge.');

        // Use AlertManager to create the alert
        const alertManager = AlertManager.getInstance();

        // Create alert container if it doesn't exist
        let alertContainer = containerWrapper.querySelector('.vdm-alert-container');
        if (!alertContainer) {
            alertContainer = document.createElement('div');
            alertContainer.className = 'vdm-alert-container';

            // Find .vdm-user-content if it exists, otherwise prepend to containerWrapper
            const userContent = containerWrapper.querySelector('.vdm-user-content');
            if (userContent) {
                userContent.after(alertContainer);
            } else {
                containerWrapper.prepend(alertContainer);
            }
        }

        // Set alert container as the container for the alert
        alertManager.container = alertContainer;

        // Show the alert in the proper container
        alertManager.showInfo(message, {
            timeout: 0, // Don't auto-dismiss
            translate: false, // Message is already translated
            className: 'vdm-mb-3', // Add margin bottom for spacing
            container: alertContainer
        });

        // Hide the diff viewer elements but keep our alert visible
        if (containerWrapper) {
            // Get any existing diffViewer content inside the container and hide it
            const diffContainer = containerWrapper.querySelector(Selectors.DIFF.CONTAINER);
            if (diffContainer) {
                diffContainer.style.display = 'none';
            }

            Debug.log('FileBrowserManager: Hidden diff container for identical content', null, 2);
        }

        // Make sure any existing diff viewer instances are destroyed
        this.cleanupPreviousInstance();
    }

    /**
     * Create basic UI elements manually when BrowserUIManager is not available
     * @returns {boolean} Success status
     */
    createBasicUIElements() {
        Debug.log('FileBrowserManager: Creating basic UI elements manually', null, 2);

        // Get the container wrapper element
        const containerWrapper = document.getElementById(Selectors.CONTAINER.WRAPPER.replace('#', ''));
        if (!containerWrapper) {
            Debug.error('FileBrowserManager: Container wrapper not found', Selectors.CONTAINER.WRAPPER, 1);
            return false;
        }

        // Create the main diff viewer container
        const diffViewerId = Selectors.DIFF.VIEWER.replace('#', '');
        let diffViewer = document.getElementById(diffViewerId);

        if (!diffViewer) {
            diffViewer = document.createElement('div');
            diffViewer.id = diffViewerId;
            diffViewer.className = 'vdm-diff-ui';
            containerWrapper.appendChild(diffViewer);

            Debug.log('FileBrowserManager: Created diff viewer element', { id: diffViewerId }, 2);
        }

        // Create the diff container inside the viewer
        const diffContainerId = Selectors.DIFF.CONTAINER.replace('#', '');
        let diffContainer = document.getElementById(diffContainerId);

        if (!diffContainer) {
            diffContainer = document.createElement('div');
            diffContainer.id = diffContainerId;
            diffContainer.className = 'vdm-diff__container';
            diffViewer.appendChild(diffContainer);

            Debug.log('FileBrowserManager: Created diff container element', { id: diffContainerId }, 2);
        }

        // Create the basic structure for left and right panes
        if (!diffContainer.querySelector('.vdm-diff__pane--left')) {
            const leftPane = document.createElement('div');
            leftPane.className = 'vdm-diff__pane vdm-diff__pane--left';
            leftPane.innerHTML = '<div class="vdm-diff__content"></div>';
            diffContainer.appendChild(leftPane);
        }

        if (!diffContainer.querySelector('.vdm-diff__pane--right')) {
            const rightPane = document.createElement('div');
            rightPane.className = 'vdm-diff__pane vdm-diff__pane--right';
            rightPane.innerHTML = '<div class="vdm-diff__content"></div>';
            diffContainer.appendChild(rightPane);
        }

        Debug.log('FileBrowserManager: Basic UI elements created successfully', null, 2);
        return true;
    }

    /**
     * Hide theme selector and switcher when no diff UI is needed (identical files)
     */
    hideThemeSelector() {
        Debug.log('FileBrowserManager: Hiding theme selector for identical content', null, 2);

        // Hide theme switcher container
        const themeSwitcher = document.getElementById(Selectors.THEME.SWITCHER.name());
        if (themeSwitcher) {
            themeSwitcher.style.display = 'none';
            Debug.log('FileBrowserManager: Hidden theme switcher container', themeSwitcher.id, 2);
        }

        // Hide theme selector wrapper if it exists independently
        const themeSelectorWrapper = document.querySelector(`.${Selectors.THEME_SWITCHER.WRAPPER.name()}`);
        if (themeSelectorWrapper) {
            themeSelectorWrapper.style.display = 'none';
            Debug.log('FileBrowserManager: Hidden theme selector wrapper', null, 2);
        }

        // Hide individual theme selector if it exists
        const themeSelector = document.getElementById(Selectors.THEME.SELECTOR.name());
        if (themeSelector) {
            themeSelector.style.display = 'none';
            Debug.log('FileBrowserManager: Hidden theme selector', themeSelector.id, 2);
        }
    }
}

// Expose to global scope
if (typeof window !== 'undefined') {
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        window.fileBrowserManager = new FileBrowserManager();
    });
}
