/**
 * File Upload Manager
 * Handles file uploads and diff comparison for Visual-Diff-Merge
 *
 * This component is responsible for the file upload UI in diff-viewer/file-upload.html
 */

import { Debug } from '../../utils/Debug';
import { EndpointDiscovery } from '../../utils/EndpointDiscovery';
import { LoaderManager } from '../../utils/LoaderManager';
import { TranslationManager } from '../../utils/TranslationManager';
import AlertManager from '../../utils/AlertManager';
import { DiffConfigManager } from '../../utils/DiffConfigManager';

/**
 * Manages the file upload UI and functionality
 */
export class FileUploadManager {
    /**
     * @param {Object} options - Configuration options
     */
    constructor(options = {}) {
        // DOM Elements
        this.form = document.getElementById('file-upload-form');
        this.oldFileInput = document.getElementById('old-file-upload');
        this.newFileInput = document.getElementById('new-file-upload');
        this.diffLoading = document.getElementById('vdm-diff-loading');
        this.diffContainer = document.getElementById('diff-container');
        this.containerWrapper = document.getElementById('vdm-container__wrapper');

        // Initialize loader manager
        this.loaderManager = LoaderManager.getInstance();

        // Initialize the DiffConfigManager with options
        const configManager = DiffConfigManager.getInstance();
        configManager.initialize({
            debug: true,
            logLevel: 3,
            ...options
        });

        // Initialize endpoint discovery
        this.endpointDiscovery = EndpointDiscovery.getInstance();

        // Initialize
        this.init();
    }

    /**
     * Initialize event listeners
     */
    init() {
        Debug.log('FileUploadManager: Initializing', null, 2);

        if (this.form) {
            this.form.addEventListener('submit', (event) => this.handleFormSubmit(event));
        } else {
            Debug.warn('FileUploadManager: Form element not found', null, 1);
        }

        Debug.log('FileUploadManager: Initialization complete', null, 2);
    }

    /**
     * Handle form submission
     * @param {Event} event - Form submit event
     */
    async handleFormSubmit(event) {
        // Prevent default form submission
        event.preventDefault();

        Debug.log('FileUploadManager: Handling file upload submission', null, 2);

        // Get the LoaderManager instance
        const loaderManager = LoaderManager.getInstance();
        // Get the TranslationManager instance
        const translationManager = TranslationManager.getInstance();
        // Get the AlertManager instance
        const alertManager = AlertManager.getInstance();

        // Clear any existing alerts
        alertManager.hideAlert();

        // Show an early loader before starting the process
        const loaderId = loaderManager.showEarlyLoader(translationManager.get('loadingContent', 'Loading files...'));

        try {
            // Reset diffConfig
            this.resetConfig();

            // Get file data
            const fileData = this.getFileData();

            // Read file contents
            loaderManager.updateLoaderMessage(loaderId, translationManager.get('loadingContent', 'Reading file contents...'));
            const fileContents = await this.readFileContents(fileData);

            // Configure diff parameters
            this.configureDiff(fileData, fileContents);

            // Process diff with API
            loaderManager.updateLoaderMessage(loaderId, translationManager.get('loadingContent', 'Processing diff...'));
            const result = await this.processDiff();

            // If contents are identical, stop here - we've already shown the message
            if (result._identicalContent) {
                Debug.log('FileUploadManager: Skipping diff viewer for identical content', null, 2);
                // Hide the loader since we're not continuing
                loaderManager.hideMainLoader(loaderId);
                return;
            }

            // Update diffConfig with API response using the central manager
            DiffConfigManager.getInstance().setDiffConfig(result);

            // Initialize diff viewer
            loaderManager.updateLoaderMessage(loaderId, translationManager.get('renderingDiff', 'Initializing diff viewer...'));
            await this.initializeDiffViewer();

            // Note: We don't hide the loader here because the DiffViewer will adopt it
        } catch (error) {
            Debug.error('FileUploadManager: Error processing diff', error, 1);
            this.handleError(error);

            // Hide the loader if there's an error
            loaderManager.hideMainLoader(loaderId);
        }
    }

    /**
     * Show loading indicators
     */
    showLoading() {
        Debug.log('FileUploadManager: Showing loading indicators', null, 3);

        // Make the container wrapper visible
        if (this.containerWrapper) {
            this.containerWrapper.classList.remove('vdm-d-none');
        }

        // Use the LoaderManager to show the main loader - this ensures only one is active at a time
        this.loaderManager.showMainLoader('Loading files...');

        // Clear any previous content from the diff container
        if (this.diffContainer) {
            this.diffContainer.innerHTML = '';
        }
    }

    /**
     * Reset configuration
     */
    resetConfig() {
        Debug.log('FileUploadManager: Resetting configuration', null, 3);

        // Get the current language settings before reset
        const lang = window.diffConfig?.lang;
        const translations = window.diffConfig?.translations;

        // Reset the configuration with DiffConfigManager
        const configManager = DiffConfigManager.getInstance();
        configManager.reset({
            debug: true,
            logLevel: 3,
            old: {},
            new: {},
            lang,
            translations
        });

        // Clean up previous instances
        this.cleanupPreviousInstance();
    }

    /**
     * Clean up previous instances
     */
    cleanupPreviousInstance() {
        // Clean up previous instances if they exist
        if (window.diffViewer) {
            try {
                Debug.log('FileUploadManager: Cleaning up previous DiffViewer instance', null, 2);
                window.diffViewer.destroy();
                window.diffViewer = null;
            } catch (e) {
                Debug.warn('FileUploadManager: Error destroying previous diffViewer', e, 1);
            }
        }

        if (window.vdmBrowserUIManager) {
            try {
                Debug.log('FileUploadManager: Cleaning up previous BrowserUIManager instance', null, 2);
                window.vdmBrowserUIManager.destroy();
                window.vdmBrowserUIManager = null;
            } catch (e) {
                Debug.warn('FileUploadManager: Error destroying previous BrowserUIManager', e, 1);
            }
        }
    }

    /**
     * Get file data from inputs
     * @returns {Object} File data object
     */
    getFileData() {
        Debug.log('FileUploadManager: Getting file data from inputs', null, 3);

        const oldFile = this.oldFileInput.files[0];
        const newFile = this.newFileInput.files[0];

        if (!oldFile || !newFile) {
            throw new Error('Please select both old and new files');
        }

        return {
            old: oldFile,
            new: newFile
        };
    }

    /**
     * Read file contents
     * @param {Object} fileData - File data object
     * @returns {Promise<Object>} File contents
     */
    async readFileContents(fileData) {
        Debug.log('FileUploadManager: Reading file contents', fileData, 3);

        try {
            const oldContent = await this.readFileAsText(fileData.old);
            const newContent = await this.readFileAsText(fileData.new);

            return {
                old: oldContent,
                new: newContent
            };
        } catch (error) {
            Debug.error('FileUploadManager: Failed to read files', error, 1);
            throw new Error(`Failed to read files: ${error.message}`);
        }
    }

    /**
     * Read a file as text
     * @param {File} file - File object
     * @returns {Promise<string>} File content as text
     */
    readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    }

    /**
     * Configure diff parameters
     * @param {Object} fileData - File data object
     * @param {Object} fileContents - File contents
     */
    configureDiff(fileData, fileContents) {
        Debug.log('FileUploadManager: Configuring diff parameters', fileData, 3);

        const configManager = DiffConfigManager.getInstance();

        // Update the configuration with file data
        configManager.update({
            old: {
                type: 'upload',
                content: fileContents.old,
                filename: fileData.old.name
            },
            new: {
                type: 'upload',
                content: fileContents.new,
                filename: fileData.new.name
            },
            // Use the old filename as the filepath for syntax detection
            filepath: fileData.old.name
        });
    }

    /**
     * Process diff with API
     * @returns {Promise<Object>} API response
     */
    async processDiff() {
        Debug.log('FileUploadManager: Processing diff with API', null, 2);

        try {
            // Get API endpoint with endpoint discovery or fallback
            let apiEndpoint = null;

            // Try to get endpoint from discovery service
            try {
                apiEndpoint = await this.endpointDiscovery.getEndpoint('diffProcessor');
                Debug.log('FileUploadManager: Using discovered endpoint', apiEndpoint, 2);
            } catch (error) {
                // We'll handle this with the fallback below
                Debug.warn('FileUploadManager: Endpoint discovery failed', error, 1);
            }

            // Use fallback if endpoint discovery failed
            if (!apiEndpoint) {
                apiEndpoint = window.diffConfig?.apiEndpoint || '../api/diff-processor.php';
                Debug.warn('FileUploadManager: Using fallback endpoint', apiEndpoint, 1);
            }

            // Get CSRF token if present in the page
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            // Prepare request headers
            const headers = {
                'Content-Type': 'application/json'
            };

            // Add CSRF token if available
            if (csrfToken) {
                headers['X-CSRF-Token'] = csrfToken;
                DiffConfigManager.getInstance().set('csrfToken', csrfToken);
            }

            // Send data to API
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers,
                body: JSON.stringify(window.diffConfig)
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();

            if (result.error) {
                throw new Error(result.error);
            }

            // Check if contents are identical
            if (result.identical === true) {
                // Handle identical content case
                this.handleIdenticalContent(result.message || "The files are identical.");
                // Mark the result with a special flag to indicate identical content
                result._identicalContent = true;
                return result;
            }

            // Comprehensive Fix: Move all important properties from config to root level
            if (result.config) {
                const importantProps = [
                    'diffData',
                    'serverSaveEnabled',
                    'fileRefId',
                    'oldFileRefId',
                    'newFileName',
                    'oldFileName',
                    'filepath',
                    'demoEnabled'
                ];

                for (const prop of importantProps) {
                    if (result.config[prop] !== undefined &&
                        (result[prop] === undefined ||
                         (prop === 'diffData' && (!result[prop].chunks || result[prop].chunks.length === 0)))) {
                        Debug.log(`FileUploadManager: Moving ${prop} from config to root level`, null, 2);
                        result[prop] = result.config[prop];
                    }
                }
            }

            return result;
        } catch (error) {
            Debug.error('FileUploadManager: API processing failed', error, 1);
            throw new Error(`Failed to process diff: ${error.message}`);
        }
    }

    /**
     * Initialize diff viewer
     * @returns {Promise<boolean>} Success status
     */
    async initializeDiffViewer() {
        Debug.log('FileUploadManager: Initializing diff viewer', null, 2);

        try {
            // Check if DiffViewer is available
            if (typeof DiffViewer !== 'undefined') {
                // Create a new DiffViewer instance using the global window.diffConfig
                window.diffViewer = new DiffViewer(window.diffConfig);

                // Initialize the viewer
                return window.diffViewer.initialize();
            } else if (typeof window.enableDiffViewer === 'function') {
                // Fall back to the global enableDiffViewer function if available
                Debug.log('FileUploadManager: DiffViewer not available, falling back to enableDiffViewer', null, 2);
                return window.enableDiffViewer();
            } else {
                Debug.error('FileUploadManager: DiffViewer not available', null, 1);
                throw new Error('DiffViewer not available');
            }
        } catch (error) {
            Debug.error('FileUploadManager: Error initializing diff viewer', error, 1);
            throw error;
        }
    }

    /**
     * Handle identical content case
     * @param {string} message - Message to display
     */
    handleIdenticalContent(message) {
        Debug.log('FileUploadManager: Files are identical', message, 2);

        // Hide the loading indicator using the LoaderManager
        this.loaderManager.hideMainLoader();

        // Hide the diff container wrapper since we won't show a diff
        if (this.containerWrapper) {
            this.containerWrapper.classList.add('vdm-d-none');
        }

        // Get the result container
        const resultContainer = document.getElementById('vdm-merge__result');
        if (resultContainer) {
            // Show the result container
            resultContainer.classList.remove('vdm-d-none');
            resultContainer.innerHTML = '';

            // Use AlertManager to show the identical content message
            const alertManager = AlertManager.getInstance();
            const alertElement = alertManager.showInfo(message, {
                timeout: 0, // Don't auto-dismiss
                translate: false // Message is already translated
            });

            // Add the alert to the result container
            resultContainer.appendChild(alertElement);
        }
    }

    /**
     * Handle error
     * @param {Error} error - Error object
     */
    handleError(error) {
        // If this is our special "identical content" marker, do nothing
        // as we've already displayed the message
        if (error.message === 'IDENTICAL_CONTENT') {
            Debug.log('FileUploadManager: Handling identical content (expected)', null, 2);
            return;
        }

        Debug.error('FileUploadManager: Error processing diff', error, 1);

        // Hide loading indicator using LoaderManager
        this.loaderManager.hideMainLoader();

        // Show error in container using AlertManager
        if (this.diffContainer) {
            this.diffContainer.innerHTML = '';

            const alertManager = AlertManager.getInstance();
            const errorMessage = `
                <h4>Error Processing Files</h4>
                <p>${error.message || 'An unknown error occurred'}</p>
            `;

            const alertElement = alertManager.showError(errorMessage, {
                timeout: 0, // Don't auto-dismiss
                translate: false, // Error message doesn't need translation
                className: 'vdm-p-3' // Add padding for better appearance
            });

            this.diffContainer.appendChild(alertElement);
        }
    }
}

// Export the class
export default FileUploadManager;
