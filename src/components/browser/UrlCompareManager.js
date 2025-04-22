/**
 * URL Compare Manager
 * Handles URL comparison and diff visualization
 *
 * This component is responsible for the URL comparison UI in diff-viewer/url-compare.html
 */

import Selectors from '../../constants/Selectors';
import { Debug } from '../../utils/Debug';
import { EndpointDiscovery } from '../../utils/EndpointDiscovery';
import { TranslationManager } from '../../utils/TranslationManager';
import { LoaderManager } from '../../utils/LoaderManager';
import AlertManager from '../../utils/AlertManager';
import { DiffConfigManager } from '../../utils/DiffConfigManager';

/**
 * Manages the URL comparison UI and functionality
 */
export class UrlCompareManager {
    /**
     * @param {Object} options - Configuration options
     */
    constructor(options = {}) {
        // DOM Elements
        this.form = document.getElementById('url-comparison-form');
        this.oldUrlInput = document.getElementById('old-url');
        this.newUrlInput = document.getElementById('new-url');
        this.loadingMessage = document.getElementById('loading-message');
        this.errorMessage = document.getElementById('error-message');
        this.containerWrapper = document.getElementById('vdm-container__wrapper');

        // Initialize the DiffConfigManager with options
        const configManager = DiffConfigManager.getInstance();
        configManager.initialize({
            debug: true,
            logLevel: 3,
            ...options
        });

        // Initialize endpoint discovery
        this.endpointDiscovery = EndpointDiscovery.getInstance();

        // Initialize translation manager
        this.translationManager = TranslationManager.getInstance();

        // Note: Async initialization is moved to the initialize() method
        // DO NOT call this.init() here directly
    }

    /**
     * Initialize the UrlCompareManager
     * This method should be called after creating an instance
     * @returns {Promise<UrlCompareManager>} The initialized instance
     */
    async initialize() {
        Debug.log('UrlCompareManager: Starting initialization', null, 2);

        // Call the init method to set up event listeners and load language settings
        await this.init();

        // Return this instance for method chaining
        return this;
    }

    /**
     * Initialize event listeners
     * @returns {Promise<void>}
     */
    async init() {
        Debug.log('UrlCompareManager: Initializing', null, 2);

        if (this.form) {
            this.form.addEventListener('submit', (event) => this.handleFormSubmit(event));
        } else {
            Debug.warn('UrlCompareManager: Form element not found', null, 1);
        }

        // Load language settings on initialization and await it to complete
        await this.loadLanguageSettings();

        // Add a debug log to confirm language settings after initialization
        Debug.log(`UrlCompareManager: Initialized with language: ${this.translationManager.getLanguage()}`, null, 2);

        Debug.log('UrlCompareManager: Initialization complete', null, 2);
    }

    /**
     * Load language settings from the API
     * @returns {Promise} A promise that resolves when language settings are loaded
     */
    async loadLanguageSettings() {
        // Replace console logs with Debug utility
        Debug.log('UrlCompareManager: Loading language settings - START', null, 2);

        try {
            // Try to get config endpoint from discovery service
            const configEndpoint = await this.endpointDiscovery.getEndpoint('endpointsConfig');
            Debug.log('UrlCompareManager: Config endpoint', configEndpoint, 3);

            // Fetch configuration including languages
            Debug.log('UrlCompareManager: Fetching from endpoint', configEndpoint, 3);
            const response = await fetch(configEndpoint);

            if (!response.ok) {
                Debug.error(`Failed to fetch config: ${response.status} ${response.statusText}`);
                throw new Error(`Failed to fetch config: ${response.statusText}`);
            }

            const configData = await response.json();
            Debug.log('UrlCompareManager: Received config data', configData, 3);

            // If we have language settings, apply them to translation manager
            if (configData.lang && configData.translations) {
                Debug.log(`UrlCompareManager: Found language settings (${configData.lang})`, null, 2);

                // Log translation manager before initialization
                Debug.log('TranslationManager before initialization', {
                    lang: this.translationManager.getLanguage(),
                    initialized: this.translationManager.isInitialized()
                }, 3);

                this.translationManager.initialize(configData.lang, configData.translations);

                // Log translation manager after initialization
                Debug.log('TranslationManager after initialization', {
                    lang: this.translationManager.getLanguage(),
                    initialized: this.translationManager.isInitialized()
                }, 3);

                // Update diffConfig with the new translations
                const configManager = DiffConfigManager.getInstance();
                configManager.update({
                    lang: configData.lang,
                    translations: configData.translations
                });

                Debug.log('Global diffConfig updated', { lang: window.diffConfig.lang }, 2);
            } else {
                Debug.warn('Language settings not found in config response', configData, 1);
            }

            Debug.log('UrlCompareManager: Loading language settings - END', null, 2);
            return true;
        } catch (error) {
            Debug.error('UrlCompareManager: Error loading language settings', error, 1);
            // Continue without language settings - will use defaults
            return false;
        }
    }

    /**
     * Handle form submission
     * @param {Event} event - Form submit event
     */
    async handleFormSubmit(event) {
        // Prevent default form submission
        event.preventDefault();

        Debug.log('UrlCompareManager: Handling URL comparison submission', null, 2);

        // Get the LoaderManager instance
        const loaderManager = LoaderManager.getInstance();
        // Get the TranslationManager instance
        const translationManager = TranslationManager.getInstance();
        // Get the AlertManager instance
        const alertManager = AlertManager.getInstance();

        // Clear any existing alerts
        alertManager.hideAlert();

        // Show an early loader before starting the process
        const loaderId = loaderManager.showEarlyLoader(translationManager.get('loadingContent', 'Loading URL comparison...'));

        try {
            // Make sure language settings are loaded before proceeding
            await this.loadLanguageSettings();

            // Reset diffConfig
            this.resetConfig();

            // Get URL data
            const urlData = this.getUrlData();

            // Configure diff parameters
            this.configureDiff(urlData);

            // Update loader message for URL fetching
            loaderManager.updateLoaderMessage(loaderId, translationManager.get('loadingContent', 'Fetching URL content...'));

            // Process diff with API
            const result = await this.processDiff();

            // If contents are identical, stop here - we've already shown the message
            if (result._identicalContent) {
                Debug.log('UrlCompareManager: Skipping diff viewer for identical content', null, 2);
                // Hide the loader since we're not continuing
                loaderManager.hideMainLoader(loaderId);
                return;
            }

            // Update diffConfig with API response using the centralized manager
            DiffConfigManager.getInstance().setDiffConfig(result);

            // Update loader message before initializing diff viewer
            loaderManager.updateLoaderMessage(loaderId, translationManager.get('renderingDiff', 'Initializing diff viewer...'));

            // Initialize diff viewer
            await this.initializeDiffViewer();

            // Note: We don't hide the loader here because the DiffViewer will adopt it
        } catch (error) {
            Debug.error('UrlCompareManager: Error processing diff', error, 1);
            this.handleError(error);

            // Hide the loader if there's an error
            loaderManager.hideMainLoader(loaderId);
        }
    }

    /**
     * Reset configuration
     */
    resetConfig() {
        Debug.log('UrlCompareManager: Resetting configuration', null, 3);

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
                Debug.log('UrlCompareManager: Cleaning up previous DiffViewer instance', null, 2);
                window.diffViewer.destroy();
                window.diffViewer = null;
            } catch (e) {
                Debug.warn('UrlCompareManager: Error destroying previous diffViewer', e, 1);
            }
        }

        if (window.vdmBrowserUIManager) {
            try {
                Debug.log('UrlCompareManager: Cleaning up previous BrowserUIManager instance', null, 2);
                window.vdmBrowserUIManager.destroy();
                window.vdmBrowserUIManager = null;
            } catch (e) {
                Debug.warn('UrlCompareManager: Error destroying previous BrowserUIManager', e, 1);
            }
        }
    }

    /**
     * Get URL data from inputs
     * @returns {Object} URL data object
     */
    getUrlData() {
        Debug.log('UrlCompareManager: Getting URL data from inputs', null, 3);

        const oldUrl = this.oldUrlInput.value;
        const newUrl = this.newUrlInput.value;

        if (!oldUrl || !newUrl) {
            throw new Error('Please enter both old and new URLs');
        }

        return {
            old: {
                url: oldUrl
            },
            new: {
                url: newUrl
            }
        };
    }

    /**
     * Configure diff parameters
     * @param {Object} urlData - URL data object
     */
    configureDiff(urlData) {
        Debug.log('UrlCompareManager: Configuring diff parameters', urlData, 3);

        const configManager = DiffConfigManager.getInstance();

        // Update the configuration with URL data
        configManager.update({
            old: {
                type: 'url',
                url: urlData.old.url
            },
            new: {
                type: 'url',
                url: urlData.new.url
            }
        });

        // Set language if provided
        if (urlData.language) {
            configManager.set('language', urlData.language);
        }
    }

    /**
     * Process diff with API
     * @returns {Promise<Object>} API response
     */
    async processDiff() {
        Debug.log('UrlCompareManager: Processing diff with API', null, 2);

        try {
            // For URL comparison, we need to fetch the content first
            if (window.diffConfig.old.type === 'url' && window.diffConfig.new.type === 'url') {
                Debug.log('UrlCompareManager: Fetching URL content before processing diff', null, 2);

                try {
                    // Get API endpoint for URL content
                    const urlContentEndpoint = '../api/get-url-content.php';

                    // Fetch old content
                    const oldUrlResponse = await fetch(`${urlContentEndpoint}?url=${encodeURIComponent(window.diffConfig.old.url)}`);
                    if (!oldUrlResponse.ok) {
                        throw new Error(`Failed to fetch old URL: ${oldUrlResponse.status} ${oldUrlResponse.statusText}`);
                    }
                    const oldUrlData = await oldUrlResponse.json();
                    if (!oldUrlData.success) {
                        throw new Error(`Error fetching old URL: ${oldUrlData.error}`);
                    }

                    // Fetch new content
                    const newUrlResponse = await fetch(`${urlContentEndpoint}?url=${encodeURIComponent(window.diffConfig.new.url)}`);
                    if (!newUrlResponse.ok) {
                        throw new Error(`Failed to fetch new URL: ${newUrlResponse.status} ${newUrlResponse.statusText}`);
                    }
                    const newUrlData = await newUrlResponse.json();
                    if (!newUrlData.success) {
                        throw new Error(`Error fetching new URL: ${newUrlData.error}`);
                    }

                    // Check if contents are identical
                    if (oldUrlData.content === newUrlData.content) {
                        // Get translation manager
                        const translationManager = TranslationManager.getInstance();

                        // Use the generic identicalContentMessage translation key
                        const message = translationManager.get('identicalContentMessage', 'The contents are identical. There\'s nothing to merge.');

                        this.handleIdenticalContent(message);
                        return {
                            _identicalContent: true,
                            success: true,
                            message: message
                        };
                    }

                    // Update config with actual content instead of just URLs
                    const configManager = DiffConfigManager.getInstance();
                    configManager.update({
                        old: {
                            ...window.diffConfig.old,
                            content: oldUrlData.content
                        },
                        new: {
                            ...window.diffConfig.new,
                            content: newUrlData.content
                        }
                    });

                    Debug.log('UrlCompareManager: Successfully fetched URL content', null, 2);
                } catch (error) {
                    Debug.error('UrlCompareManager: Error fetching URL content', error, 1);
                    throw error;
                }
            }

            // Get API endpoint with endpoint discovery or fallback
            let apiEndpoint = null;

            // Try to get endpoint from discovery service
            try {
                apiEndpoint = await this.endpointDiscovery.getEndpoint('diffProcessor');
                Debug.log('UrlCompareManager: Using discovered endpoint', apiEndpoint, 2);
            } catch (error) {
                // We'll handle this with the fallback below
                Debug.warn('UrlCompareManager: Endpoint discovery failed', error, 1);
            }

            // Use fallback if endpoint discovery failed
            if (!apiEndpoint) {
                apiEndpoint = window.diffConfig?.apiEndpoint || '../api/diff-processor.php';
                Debug.warn('UrlCompareManager: Using fallback endpoint', apiEndpoint, 1);
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
                this.handleIdenticalContent(result.message || "The URLs contain identical content.");
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
                        Debug.log(`UrlCompareManager: Moving ${prop} from config to root level`, null, 2);
                        result[prop] = result.config[prop];
                    }
                }
            }

            return result;
        } catch (error) {
            Debug.error('UrlCompareManager: API processing failed', error, 1);
            throw error;
        }
    }

    /**
     * Initialize diff viewer
     * @returns {Promise<boolean>} Success status
     */
    async initializeDiffViewer() {
        Debug.log('UrlCompareManager: Initializing diff viewer', null, 2);

        try {
            // Check if enableDiffViewer function is available
            if (typeof window.enableDiffViewer === 'function') {
                Debug.log('UrlCompareManager: Using enableDiffViewer function', null, 2);

                // Call the enableDiffViewer function
                const result = await window.enableDiffViewer();
                return result;
            } else {
                Debug.error('UrlCompareManager: enableDiffViewer function not available', null, 1);
                throw new Error('enableDiffViewer function not available. Check that diff-viewer.min.js is properly loaded.');
            }
        } catch (error) {
            Debug.error('UrlCompareManager: Error initializing diff viewer', error, 1);
            throw error;
        }
    }

    /**
     * Handle identical content case
     * @param {string} message - Message to display
     */
    handleIdenticalContent(message) {
        Debug.log('UrlCompareManager: URLs contain identical content', message, 2);

        // Get translation manager
        const translationManager = TranslationManager.getInstance();

        // Get loader manager to hide any active loaders
        const loaderManager = LoaderManager.getInstance();

        // Get the localized message
        const localizedMessage = translationManager.get('filesIdenticalMessage', '<strong>Files are identical</strong><br>The files you are comparing are identical. No differences found.');
        Debug.log('Final message being displayed', localizedMessage, 2);

        // Hide any active loaders
        loaderManager.hideMainLoader();

        // Use AlertManager to create the alert
        const alertManager = AlertManager.getInstance();
        const alertElement = alertManager.showInfo(localizedMessage, {
            timeout: 0, // Don't auto-dismiss
            translate: false, // Message is already translated
            className: 'vdm-mb-3' // Add margin bottom for spacing
        });

        // Find the container wrapper
        const containerWrapper = document.querySelector(Selectors.CONTAINER.WRAPPER);
        if (containerWrapper) {
            // Make sure the container is visible (remove vdm-d-none class)
            containerWrapper.classList.remove('vdm-d-none');

            // Prepend the alert to the container wrapper
            containerWrapper.prepend(alertElement);
        }

        // Hide the diff viewer elements but keep our alert visible
        if (this.containerWrapper) {
            // Get any existing diffViewer content inside the container and hide it
            const diffContainer = this.containerWrapper.querySelector(Selectors.DIFF.CONTAINER);
            if (diffContainer) {
                diffContainer.style.display = 'none';
            }

            Debug.log('UrlCompareManager: Hidden diff container for identical content', null, 2);
        }

        // Make sure any existing diff viewer instances are destroyed
        this.cleanupPreviousInstance();

        // Set a flag indicating we've handled identical content
        this._identicalContentHandled = true;
    }

    /**
     * Handle error
     * @param {Error} error - Error object
     */
    handleError(error) {
        Debug.error('UrlCompareManager: Error processing diff', error, 1);

        // Get translation manager
        const translationManager = TranslationManager.getInstance();

        // Get loader manager to hide any active loaders
        const loaderManager = LoaderManager.getInstance();

        // Hide any active loaders
        loaderManager.hideMainLoader();

        Debug.log('TranslationManager', translationManager, 3);

        // Get translated error message
        const errorMessage = translationManager.get('errorFetchingUrl', 'Error fetching content. Please check the URLs and try again.');

        // Use AlertManager to create the alert
        const alertManager = AlertManager.getInstance();
        const alertElement = alertManager.showError(errorMessage, {
            timeout: 0, // Don't auto-dismiss
            translate: false, // Message is already translated
            className: 'vdm-mb-3' // Add margin bottom for spacing
        });

        // Find the container wrapper
        const containerWrapper = document.querySelector(Selectors.CONTAINER.WRAPPER);
        if (containerWrapper) {
            // Make sure the container is visible (remove vdm-d-none class)

            containerWrapper.classList.remove('vdm-d-none');

            // Prepend the alert to the container wrapper
            containerWrapper.prepend(alertElement);
        }

        // Hide the container wrapper content to prevent loading the diff viewer
        // but keep the error message visible
        if (this.containerWrapper) {
            // Get any existing diffViewer content inside the container and hide it
            const diffContainer = this.containerWrapper.querySelector(Selectors.DIFF.CONTAINER);
            if (diffContainer) {
                diffContainer.style.display = 'none';
            }

            Debug.log('UrlCompareManager: Hidden diff container due to error', null, 2);
        }

        // Make sure any existing diff viewer instances are destroyed
        this.cleanupPreviousInstance();
    }
}

// Export the class
export default UrlCompareManager;
