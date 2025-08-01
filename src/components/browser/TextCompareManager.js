/**
 * Text Compare Manager
 * Handles text comparison and diff visualization
 *
 * This component is responsible for the text comparison UI in diff-viewer/text-compare.html
 */

import Selectors from '../../constants/Selectors';
import { Debug } from '../../utils/Debug';
import { EndpointDiscovery } from '../../utils/EndpointDiscovery';
import { TranslationManager } from '../../utils/TranslationManager';
import { LoaderManager } from '../../utils/LoaderManager';
import AlertManager from '../../utils/AlertManager';
import { DiffConfigManager } from '../../utils/DiffConfigManager';

/**
 * Manages the text comparison UI and functionality
 */
export class TextCompareManager {
    /**
     * @param {Object} options - Configuration options
     */
    constructor(options = {}) {
        // Initialize the DiffConfigManager with options
        const configManager = DiffConfigManager.getInstance();
        configManager.initialize({
            debug: true,
            logLevel: 3,
            ...options
        });

        // Initialize Debug with configuration settings from the manager
        Debug.initialize(window.diffConfig.debug, '[DiffViewer]', window.diffConfig.logLevel);
        Debug.log('TextCompareManager: Constructor called', null, 2);

        // DOM Elements
        this.form = document.getElementById('text-comparison-form');
        this.oldTextInput = document.getElementById('old-text');
        this.newTextInput = document.getElementById('new-text');
        this.loadingMessage = document.getElementById('loading-message');
        this.errorMessage = document.getElementById('error-message');
        this.containerWrapper = document.getElementById('vdm-container__wrapper');

        // Initialize endpoint discovery
        this.endpointDiscovery = EndpointDiscovery.getInstance();

        // Initialize translation manager
        this.translationManager = TranslationManager.getInstance();

        // Note: Async initialization is moved to the initialize() method
        // DO NOT call this.init() here directly
    }

    /**
     * Initialize the TextCompareManager
     * This method should be called after creating an instance
     * @returns {Promise<TextCompareManager>} The initialized instance
     */
    async initialize() {
        Debug.log('TextCompareManager: Starting initialization', null, 2);

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
        Debug.log('TextCompareManager: Initializing', null, 2);

        if (this.form) {
            this.form.addEventListener('submit', (event) => this.handleFormSubmit(event));
        } else {
            Debug.warn('TextCompareManager: Form element not found', null, 1);
        }

        // Load language settings on initialization and await it to complete
        await this.loadLanguageSettings();

        // Add a debug log to confirm language settings after initialization
        Debug.log(`TextCompareManager: Initialized with language: ${this.translationManager.getLanguage()}`, null, 2);

        Debug.log('TextCompareManager: Initialization complete', null, 2);
    }

    /**
     * Load language settings from the API
     * @returns {Promise} A promise that resolves when language settings are loaded
     */
    async loadLanguageSettings() {
        // Replace console logs with Debug utility
        Debug.log('TextCompareManager: Loading language settings - START', null, 2);

        try {
            // Try to get config endpoint from discovery service
            const configEndpoint = await this.endpointDiscovery.getEndpoint('endpointsConfig');
            Debug.log('TextCompareManager: Config endpoint', configEndpoint, 3);

            // Fetch configuration including languages
            Debug.log('TextCompareManager: Fetching from endpoint', configEndpoint, 3);
            const response = await fetch(configEndpoint);

            if (!response.ok) {
                Debug.error(`Failed to fetch config: ${response.status} ${response.statusText}`);
                throw new Error(`Failed to fetch config: ${response.statusText}`);
            }

            const configData = await response.json();
            Debug.log('TextCompareManager: Received config data', configData, 3);

            // If we have language settings, apply them to translation manager
            if (configData.lang && configData.translations) {
                Debug.log(`TextCompareManager: Found language settings (${configData.lang})`, null, 2);

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

            Debug.log('TextCompareManager: Loading language settings - END', null, 2);
            return true;
        } catch (error) {
            Debug.error('TextCompareManager: Error loading language settings', error, 1);
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

        Debug.log('TextCompareManager: Handling text comparison submission', null, 2);

        // Get the LoaderManager instance
        const loaderManager = LoaderManager.getInstance();
        // Get the TranslationManager instance
        const translationManager = TranslationManager.getInstance();
        // Get the AlertManager instance
        const alertManager = AlertManager.getInstance();

        // Clear any existing alerts
        alertManager.hideAlert();

        // Show an early loader before starting the process
        const loaderId = loaderManager.showEarlyLoader(translationManager.get('loadingContent', 'Loading text comparison...'));

        try {
            // Make sure language settings are loaded before proceeding
            await this.loadLanguageSettings();

            // Reset diffConfig
            this.resetConfig();

            // Get text data
            const textData = this.getTextData();

            // Configure diff parameters
            this.configureDiff(textData);

            // Update loader message for processing diff
            loaderManager.updateLoaderMessage(loaderId, translationManager.get('processingText', 'Processing text content...'));

            // Process diff with API
            const result = await this.processDiff();

            // If contents are identical, stop here - we've already shown the message
            if (result._identicalContent) {
                Debug.log('TextCompareManager: Skipping diff viewer for identical content', null, 2);
                // Hide the loader since we're not continuing
                loaderManager.hideMainLoader(loaderId);
                return;
            }

            // Update diffConfig with API response using the centralized manager
            DiffConfigManager.getInstance().setDiffConfigSafe(result);

            // Update loader message before initializing diff viewer
            loaderManager.updateLoaderMessage(loaderId, translationManager.get('renderingDiff', 'Initializing diff viewer...'));

            // Initialize diff viewer
            await this.initializeDiffViewer();

            // Note: We don't hide the loader here because the DiffViewer will adopt it
        } catch (error) {
            Debug.error('TextCompareManager: Error processing diff', error, 1);
            this.handleError(error);

            // Hide the loader if there's an error
            loaderManager.hideMainLoader(loaderId);
        }
    }

    /**
     * Reset configuration
     */
    resetConfig() {
        Debug.log('TextCompareManager: Resetting configuration', null, 3);

        // Get the current configuration
        const currentConfig = window.diffConfig;

        // Keep language settings when resetting
        const lang = currentConfig.lang;
        const translations = currentConfig.translations;

        // Reset the configuration
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
                Debug.log('TextCompareManager: Cleaning up previous DiffViewer instance', null, 2);
                window.diffViewer.destroy();
                window.diffViewer = null;
            } catch (e) {
                Debug.warn('TextCompareManager: Error destroying previous diffViewer', e, 1);
            }
        }

        if (window.vdmBrowserUIManager) {
            try {
                Debug.log('TextCompareManager: Cleaning up previous BrowserUIManager instance', null, 2);
                window.vdmBrowserUIManager.destroy();
                window.vdmBrowserUIManager = null;
            } catch (e) {
                Debug.warn('TextCompareManager: Error destroying previous BrowserUIManager', e, 1);
            }
        }
    }

    /**
     * Get text data from textareas
     * @returns {Object} Text data object
     */
    getTextData() {
        Debug.log('TextCompareManager: Getting text data from inputs', null, 3);

        const oldText = this.oldTextInput.value;
        const newText = this.newTextInput.value;

        if (!oldText || !newText) {
            throw new Error('Please enter both old and new text');
        }

        return {
            old: {
                content: oldText
            },
            new: {
                content: newText
            }
        };
    }

    /**
     * Configure diff parameters
     * @param {Object} textData - Text data object
     */
    configureDiff(textData) {
        Debug.log('TextCompareManager: Configuring diff parameters', textData, 3);

        const configManager = DiffConfigManager.getInstance();

        // Update the configuration with text data
        configManager.update({
            old: {
                type: 'text',
                content: textData.old.content
            },
            new: {
                type: 'text',
                content: textData.new.content
            }
        });

        // Set language if provided
        if (textData.language) {
            configManager.set('language', textData.language);
        }
    }

    /**
     * Process diff with API
     * @returns {Promise<Object>} API response
     */
    async processDiff() {
        Debug.log('TextCompareManager: Processing diff with API', null, 2);

        try {
            // Check if contents are identical before sending to API
            if (window.diffConfig.old.content === window.diffConfig.new.content) {
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

            // Get API endpoint with endpoint discovery or fallback
            let apiEndpoint = null;

            // Try to get endpoint from discovery service
            try {
                apiEndpoint = await this.endpointDiscovery.getEndpoint('diffProcessor');
                Debug.log('TextCompareManager: Using discovered endpoint', apiEndpoint, 2);
            } catch (error) {
                // We'll handle this with the fallback below
                Debug.warn('TextCompareManager: Endpoint discovery failed', error, 1);
            }

            // Use fallback if endpoint discovery failed
            if (!apiEndpoint) {
                apiEndpoint = window.diffConfig?.apiEndpoint || '../api/diff-processor.php';
                Debug.warn('TextCompareManager: Using fallback endpoint', apiEndpoint, 1);
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
                this.handleIdenticalContent(result.message || "The texts contain identical content.");
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
                        Debug.log(`TextCompareManager: Moving ${prop} from config to root level`, null, 2);
                        result[prop] = result.config[prop];
                    }
                }
            }

            return result;
        } catch (error) {
            Debug.error('TextCompareManager: API processing failed', error, 1);
            throw error;
        }
    }

    /**
     * Initialize diff viewer
     * @returns {Promise<boolean>} Success status
     */
    async initializeDiffViewer() {
        Debug.log('TextCompareManager: Initializing diff viewer', null, 2);

        try {
            // Check if enableDiffViewer function is available
            if (typeof window.enableDiffViewer === 'function') {
                Debug.log('TextCompareManager: Using enableDiffViewer function', null, 2);

                // Call the enableDiffViewer function
                const result = await window.enableDiffViewer();
                return result;
            } else {
                Debug.error('TextCompareManager: enableDiffViewer function not available', null, 1);
                throw new Error('enableDiffViewer function not available. Check that diff-viewer.min.js is properly loaded.');
            }
        } catch (error) {
            Debug.error('TextCompareManager: Error initializing diff viewer', error, 1);
            throw error;
        }
    }

    /**
     * Handle identical content case
     * @param {string} message - Message to display
     */
    handleIdenticalContent(message) {
        Debug.log('TextCompareManager: Texts contain identical content', message, 2);

        // Get translation manager
        const translationManager = TranslationManager.getInstance();

        // Get loader manager to hide any active loaders
        const loaderManager = LoaderManager.getInstance();

        // Get the localized message
        const localizedMessage = translationManager.get('filesIdenticalMessage', '<strong>Contents are identical</strong><br>The text snippets you are comparing are identical. No differences found.');
        Debug.log('Final message being displayed', localizedMessage, 2);

        // Hide any active loaders
        loaderManager.hideMainLoader();

        // Use AlertManager to create the alert
        const alertManager = AlertManager.getInstance();

        // Find the container wrapper
        const containerWrapper = document.querySelector(Selectors.CONTAINER.WRAPPER);
        if (!containerWrapper) {
            Debug.error('TextCompareManager: Container wrapper not found for alert display');
            // If no container wrapper, use the default alert mechanism as a fallback
            alertManager.showInfo(localizedMessage, {
                timeout: 0,
                translate: false
            });
            return;
        }

        // Make sure the container wrapper is visible
        containerWrapper.classList.remove('vdm-d-none');

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
        alertManager.showInfo(localizedMessage, {
            timeout: 0, // Don't auto-dismiss
            translate: false, // Message is already translated
            className: 'vdm-mb-3', // Add margin bottom for spacing
            container: alertContainer
        });

        // Hide the diff viewer elements but keep our alert visible
        if (this.containerWrapper) {
            // Get any existing diffViewer content inside the container and hide it
            const diffContainer = this.containerWrapper.querySelector(Selectors.DIFF.CONTAINER);
            if (diffContainer) {
                diffContainer.style.display = 'none';
            }

            Debug.log('TextCompareManager: Hidden diff container for identical content', null, 2);
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
        Debug.error('TextCompareManager: Error processing diff', error, 1);

        // Get translation manager
        const translationManager = TranslationManager.getInstance();

        // Get loader manager to hide any active loaders
        const loaderManager = LoaderManager.getInstance();

        // Hide any active loaders
        loaderManager.hideMainLoader();

        // Get translated error message
        const errorMessage = translationManager.get('errorProcessingText', 'Error processing content. Please check your input and try again.');

        // Use AlertManager to create the alert
        const alertManager = AlertManager.getInstance();

        // Find the container wrapper
        const containerWrapper = document.querySelector(Selectors.CONTAINER.WRAPPER);
        if (!containerWrapper) {
            Debug.error('TextCompareManager: Container wrapper not found for error display');
            // If no container wrapper, use the default alert mechanism as a fallback
            alertManager.showError(errorMessage, {
                timeout: 0,
                translate: false
            });
            return;
        }

        // Make sure the container wrapper is visible
        containerWrapper.classList.remove('vdm-d-none');

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
        alertManager.showError(errorMessage, {
            timeout: 0, // Don't auto-dismiss
            translate: false, // Message is already translated
            className: 'vdm-mb-3', // Add margin bottom for spacing
            container: alertContainer
        });

        // Hide the diff viewer elements but keep our alert visible
        if (this.containerWrapper) {
            // Get any existing diffViewer content inside the container and hide it
            const diffContainer = this.containerWrapper.querySelector(Selectors.DIFF.CONTAINER);
            if (diffContainer) {
                diffContainer.style.display = 'none';
            }

            Debug.log('TextCompareManager: Hidden diff container due to error', null, 2);
        }

        // Make sure any existing diff viewer instances are destroyed
        this.cleanupPreviousInstance();
    }
}

// Export the class
export default TextCompareManager;
