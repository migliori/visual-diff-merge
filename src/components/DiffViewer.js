import { Debug } from '../utils/Debug';
import { ResourceLoader } from '../utils/ResourceLoader';
import { DOMUtils } from '../utils/DOMUtils';
import { ConfigUtils } from '../utils/ConfigUtils';
import { EndpointDiscovery } from '../utils/EndpointDiscovery';
import { TranslationManager } from '../utils/TranslationManager';
import Selectors from '../constants/Selectors';

import { ThemeManager } from './ThemeManager';
import { ThemeSelector } from './ThemeSelector';
import { SyntaxHighlighter } from './SyntaxHighlighter';
import { ChunkManager } from './ChunkManager';
import { ThemeToggle } from './ThemeToggle';
import { MergeHandler } from './MergeHandler';
import { DiffNavigator } from './DiffNavigator';
import { ScrollSynchronizer } from './viewer/ScrollSynchronizer';
import { IconMarkerManager } from './viewer/IconMarkerManager';
import { LayoutManager } from './viewer/LayoutManager';
import { ModalManager } from './modal/ModalManager';

/**
 * Main diff viewer component
 */
export class DiffViewer {
    /**
     * @param {Object} options - Configuration options
     */
    constructor(options = {}) {
        // Default configuration matching PHP javascript section structure
        const defaultOptions = {
            // Basic configuration
            lang: 'en',
            debug: false,
            logLevel: 2,

            // Theme settings
            theme: {
                defaultFamily: 'atom-one',
                defaultMode: 'dark',
                showSelector: true
            },

            // API endpoint
            apiEndpoint: null

            // We've removed default translations from here as they'll be handled by TranslationManager
        };

        // Merge options in priority order
        // Configuration comes from: defaults < window.diffConfig < constructor options
        this.config = ConfigUtils.mergeConfigurations(defaultOptions, window.diffConfig || {}, options);

        // Create separate internal runtime properties
        this.runtimeProps = {
            diffData: options.diffData || window.diffConfig?.diffData || null,
            serverSaveEnabled: options.serverSaveEnabled || window.diffConfig?.serverSaveEnabled || false,
            // SECURITY: Remove server paths and use only secure fileRefIds
            fileRefId: options.fileRefId || window.diffConfig?.fileRefId || '',
            oldFileRefId: options.oldFileRefId || window.diffConfig?.oldFileRefId || '',
            // Keep safe filename properties (not paths)
            newFileName: options.newFileName || window.diffConfig?.newFileName || '',
            oldFileName: options.oldFileName || window.diffConfig?.oldFileName || '',
            isIdentical: options.isIdentical || window.diffConfig?.isIdentical || false,
            filepath: options.filepath || window.diffConfig?.filepath || null,
            demoEnabled: options.demoEnabled || window.diffConfig?.demoEnabled || false
        };

        // Store the main loader ID if provided from window.enableDiffViewer
        this.mainLoaderId = options.mainLoaderId || null;

        // Set debug values early
        Debug.initialize(this.config.debug, '[DiffViewer]', this.config.logLevel || 2);

        // Initialize TranslationManager with the translations from the config
        const translationManager = TranslationManager.getInstance();
        if (!translationManager.isInitialized() && this.config.translations) {
            Debug.log('DiffViewer: Initializing TranslationManager', {
                lang: this.config.lang || 'en',
                translations: this.config.translations
            }, 2);
            translationManager.initialize(this.config.lang || 'en', this.config.translations);
        } else {
            Debug.log('DiffViewer: TranslationManager already initialized', null, 2);
        }

        // Get container element - now always using Selectors.DIFF.VIEWER
        this.container = document.querySelector(Selectors.DIFF.VIEWER);

        if (!this.container) {
            Debug.error('DiffViewer: Container element not found', null, 2);
            throw new Error('Container element not found');
        }

        // Verify diff data
        if (!this.runtimeProps.diffData) {
            Debug.error('DiffViewer: No diff data provided', null, 2);
            throw new Error('No diff data provided');
        }

        Debug.log('DiffViewer: Initializing component', null, 2);

        // Initialize services (singletons)
        this._initializeServices();

        // Create components
        this._createComponents();

        Debug.log('DiffViewer: Component created', null, 2);
    }

    /**
     * Initialize service singletons
     * @private
     */
    _initializeServices() {
        // Get service singletons
        this.resourceLoader = ResourceLoader.getInstance();
        this.themeManager = ThemeManager.getInstance();
        this.themeSelector = ThemeSelector.getInstance(this);
        this.modalManager = ModalManager.getInstance({
            debug: this.config.debug,
            translations: this.config.translations
        });

        // Initialize ThemeManager with config and ResourceLoader
        this.themeManager.initialize({
            theme: this.config.theme
        }, this.resourceLoader);
    }

    /**
     * Create component instances
     * @private
     */
    _createComponents() {
        // Create core components
        this.syntaxHighlighter = new SyntaxHighlighter(this);
        this.chunkManager = new ChunkManager(this);

        // Create UI components - pass browserUIManager to ThemeToggle if available
        this.themeToggle = new ThemeToggle(
            this.browserUIManager,
            Selectors.THEME.TOGGLE.name(),
            Selectors.CONTAINER.WRAPPER.name()
        );
        this.mergeHandler = new MergeHandler(this);

        // Create DiffNavigator but don't initialize it yet - it will be initialized after chunks are loaded
        this.diffNavigator = new DiffNavigator(this, false);

        // Create layout components
        this.scrollSynchronizer = new ScrollSynchronizer(this);
        this.iconMarkerManager = new IconMarkerManager(this);
        this.layoutManager = new LayoutManager(this);
    }

    /**
     * Initialize the diff viewer and render content
     */
    async initialize() {
        Debug.log('DiffViewer: Beginning initialization', null, 2);

        try {
            // PHASE 1: DATA INITIALIZATION
            await this._initializeData();

            // PHASE 2: RESOURCE LOADING
            await this._loadResources();

            // PHASE 3: UI RENDERING
            await this._renderUI();

            // PHASE 4: UI ENHANCEMENT
            await this._setupUIFeatures();

            // Display demo mode warning if enabled
            if (this.runtimeProps.demoEnabled) {
                this._showDemoModeWarning();
            }

            // Initialize ModalManager early
            this.modalManager.initModals();

            Debug.log('DiffViewer: Initialization complete', null, 2);
            return true;
        } catch (error) {
            Debug.error('DiffViewer: Error during initialization:', error, 2);
            this._handleInitializationError(error);
            throw error;
        }
    }

    /**
     * Handle initialization error
     * @private
     */
    _handleInitializationError(error) {
        Debug.error('DiffViewer: Error handling initialization failure', error, 2);

        // Get translation manager for error display
        const translationManager = TranslationManager.getInstance();
        const errorText = translationManager.get('errorLoadingDiff') || 'Error Loading Diff Viewer';

        // Display error message in container
        const errorMessage = document.createElement('div');
        errorMessage.className = `${Selectors.UTILITY.ALERT_DANGER.name()} vdm-m-3`;
        errorMessage.innerHTML = `
            <h4>${errorText}</h4>
            <p>${error.message || 'An unexpected error occurred.'}</p>
        `;

        // Add error to container
        if (this.container) {
            // Keep existing content, just append the error
            this.container.appendChild(errorMessage);

            // Make sure container is visible
            this.container.style.display = 'flex';
        }
    }

    /**
     * Initialize data structures
     * @private
     */
    async _initializeData() {
        // Initialize chunks from diff data
        this.chunkManager.initChunks(this.runtimeProps.diffData);

        Debug.log(`DiffViewer: Loaded ${this.runtimeProps.diffData.chunks?.length || 0} chunks and content arrays: old=${this.runtimeProps.diffData.old?.length || 0}, new=${this.runtimeProps.diffData.new?.length || 0}`, null, 2);
    }

    /**
     * Load required resources
     * @private
     */
    async _loadResources() {
        // Load syntax highlighter if not already loaded
        if (!this.syntaxHighlighter.highlightJsLoaded) {
            await this.syntaxHighlighter.initialize();
            await this.syntaxHighlighter.loadHighlightJs();
        }

        // Load theme through ThemeManager
        const currentTheme = this.themeManager.getCurrentTheme();
        await this.themeManager.applyTheme(currentTheme.family, currentTheme.mode);
    }

    /**
     * Render UI components
     * @private
     */
    async _renderUI() {
        // Make sure container is visible
        if (this.container) {
            this.container.style.display = 'flex';
        }

        // Render the diff chunks
        Debug.log(`DiffViewer: Rendering ${this.runtimeProps.diffData.chunks?.length || 0} chunks`, null, 2);
        this.chunkManager.renderChunks();

        // Apply syntax highlighting
        this.syntaxHighlighter.highlightAll(this.container);

        // Initialize theme based on preference
        this.themeToggle.initialize();

        // Initialize theme selector if enabled
        if (this.config.theme.showSelector) {
            this.themeSelector.initialize();
        }

        // Mark container as loaded using DOMUtils
        DOMUtils.toggleClass(Selectors.DIFF.CONTAINER.name(), 'loaded', true);

        // Show the content wrapper if needed
        const containerWrapper = document.querySelector(Selectors.CONTAINER.WRAPPER);
        if (containerWrapper?.classList.contains('vdm-d-none')) {
            containerWrapper.classList.remove('vdm-d-none');
        }

        // Fix theme switcher position - move it above the diff container
        const themeSwitcher = document.querySelector(Selectors.THEME.SWITCHER);
        const diffContainer = document.querySelector(Selectors.DIFF.CONTAINER);
        diffContainer?.parentNode?.insertBefore?.(themeSwitcher, diffContainer);
        if (themeSwitcher && diffContainer) {
            Debug.log('DiffViewer: Repositioned theme switcher above diff container', null, 2);
        }
    }

    /**
     * Set up UI features and enhancements
     * @private
     */
    async _setupUIFeatures() {
        // Set up scroll synchronization
        this.scrollSynchronizer.setupSynchronizedScrolling();

        // Initialize layout manager
        this.layoutManager.initialize();

        // Set up icon markers
        this.iconMarkerManager.initializeIconMarkers();

        // Initialize the DiffNavigator AFTER chunks are loaded and rendered
        if (this.diffNavigator) {
            Debug.log('DiffViewer: Initializing navigation with loaded chunks', null, 2);
            this.diffNavigator.initNavigation();
        }

        // Dispatch a custom event to notify that the diff viewer has finished loading
        // This allows other components to know when the diff viewer is ready
        const diffLoadedEvent = new CustomEvent('vdm-diff-loaded', {
            detail: {
                timestamp: new Date(),
                viewer: this
            }
        });
        document.dispatchEvent(diffLoadedEvent);
        Debug.log('DiffViewer: Dispatched vdm-diff-loaded event', null, 2);

        Debug.log('DiffViewer: UI features and enhancements set up', null, 2);
    }

    /**
     * Display a warning message for demo mode
     * @private
     */
    _showDemoModeWarning() {
        Debug.log('DiffViewer: Showing demo mode warning', null, 2);

        // Use the AlertManager to show the warning
        const AlertManager = window.AlertManager || (this.browserUIManager?.AlertManager);

        if (AlertManager) {
            const alertManager = AlertManager.getInstance();

            // Find the form element to place the alert before
            const comparisonForm = document.querySelector('#vdm-file-comparison-form');

            // Show warning about demo mode
            alertManager.showAlert(
                `<strong>Demo Mode Active</strong> - Merging is disabled on this server and will be simulated.
                To use the file browser with actual file modifications, please install Visual Diff Merge on your own server.`,
                'warning',
                {
                    dismissable: true,
                    className: 'vdm-mb-3',
                    translate: false, // Disable translation
                    targetElement: comparisonForm, // Place before the form
                    placement: 'before',
                    timeout: 0 // Prevent auto-dismiss
                }
            );

            Debug.log('DiffViewer: Demo mode warning displayed via AlertManager', null, 2);
        }
    }

    /**
     * Updates configuration with new values
     * @param {Object} newConfig - New configuration values to apply
     */
    updateConfig(newConfig) {
        if (!newConfig) return;

        // Merge new config with current config
        this.config = ConfigUtils.mergeConfigurations(this.config, newConfig);

        Debug.log('DiffViewer: Configuration updated', newConfig, 3);
    }

    /**
     * Updates runtime properties
     * @param {Object} props - New runtime properties to apply
     */
    updateRuntimeProps(props) {
        if (!props) return;

        // Merge new runtime properties with current ones
        this.runtimeProps = {...this.runtimeProps, ...props};

        Debug.log('DiffViewer: Runtime properties updated', props, 3);
    }

    /**
     * Get the current configuration
     * @returns {Object} Current configuration
     */
    getConfig() {
        return {...this.config};
    }

    /**
     * Get the current runtime properties
     * @returns {Object} Current runtime properties
     */
    getRuntimeProps() {
        // DEBUG: Add logging to identify when this method is called and what it returns
        Debug.log('DiffViewer.getRuntimeProps called', {
            fileRefId: this.runtimeProps.fileRefId || '(none)',
            oldFileRefId: this.runtimeProps.oldFileRefId || '(none)',
            newFileName: this.runtimeProps.newFileName || '(none)',
            oldFileName: this.runtimeProps.oldFileName || '(none)',
            // Also check if these properties are in window.diffConfig
            windowDiffConfig: {
                hasFileRefId: window.diffConfig && 'fileRefId' in window.diffConfig,
                fileRefId: window.diffConfig?.fileRefId || '(none)',
                hasOldFileRefId: window.diffConfig && 'oldFileRefId' in window.diffConfig,
                oldFileRefId: window.diffConfig?.oldFileRefId || '(none)',
                hasNewFileName: window.diffConfig && 'newFileName' in window.diffConfig,
                newFileName: window.diffConfig?.newFileName || '(none)',
                hasOldFileName: window.diffConfig && 'oldFileName' in window.diffConfig,
                oldFileName: window.diffConfig?.oldFileName || '(none)'
            }
        }, 3);

        return {...this.runtimeProps};
    }

    /**
     * Clean up event handlers and resources
     */
    destroy() {
        // Destroy layout manager
        if (this.layoutManager) {
            this.layoutManager.destroy();
        }

        // Clean up diffNavigator
        if (this.diffNavigator) {
            this.diffNavigator.destroy();
        }

        // Remove loaded class from container
        DOMUtils.toggleClass(Selectors.DIFF.CONTAINER.name(), 'loaded', false);

        // Additional cleanup as needed
        Debug.log('DiffViewer: Component destroyed', null, 2);
    }

    /**
     * Initialize runtime properties
     */
    initializeRuntimeProps() {
        // Common runtime properties
        this.runtimeProps = {
            diffData: this.options.diffData || {},
            serverSaveEnabled: this.options.serverSaveEnabled || false,
            // SECURITY: Use only secure fileRefIds and filenames, not server paths
            fileRefId: this.options.fileRefId || window.diffConfig?.fileRefId || '',
            oldFileRefId: this.options.oldFileRefId || window.diffConfig?.oldFileRefId || '',
            newFileName: this.options.newFileName || window.diffConfig?.newFileName || '',
            oldFileName: this.options.oldFileName || window.diffConfig?.oldFileName || '',
            isIdentical: this.options.isIdentical || window.diffConfig?.isIdentical || false,
            filepath: this.options.filepath || window.diffConfig?.filepath || ''
        };

        Debug.log('DiffViewer: Runtime properties initialized', this.runtimeProps, 3);
    }

    /**
     * Check if the content has been beautified
     * @returns {boolean} True if content has been beautified
     */
    isContentBeautified() {
        // Check if the beautified flag exists in runtime properties
        // If not defined, default to false
        return this.runtimeProps.isBeautified || false;
    }

    /**
     * Get API endpoint by name
     * @param {string} endpointName - Name of the endpoint to get
     * @returns {Promise<string>} The endpoint URL
     */
    async getEndpoint(endpointName) {
        Debug.log(`DiffViewer: Getting endpoint for ${endpointName}`, null, 2);

        try {
            // Use EndpointDiscovery if available
            const endpointDiscovery = EndpointDiscovery.getInstance();
            const endpoint = await endpointDiscovery.getEndpoint(endpointName);

            Debug.log(`DiffViewer: Found endpoint for ${endpointName}`, endpoint, 2);
            return endpoint;
        } catch (error) {
            // Fall back to config or default endpoints
            Debug.warn(`DiffViewer: Error getting endpoint for ${endpointName}, using fallback`, error, 1);

            // Check if we have endpoints in the config
            if (this.config?.apiEndpoints[endpointName]) {
                return this.config.apiEndpoints[endpointName];
            }

            // Default endpoints as a last resort
            const defaultEndpoints = {
                'ajaxDiffMerge': '../api/ajax-diff-merge.php',
                'diffProcessor': '../api/diff-processor.php'
            };

            return defaultEndpoints[endpointName] || '../api/' + endpointName + '.php';
        }
    }

    /**
     * Set the BrowserUIManager instance
     * @param {Object} browserUIManager - BrowserUIManager instance
     * @returns {DiffViewer} This instance for method chaining
     */
    setBrowserUIManager(browserUIManager) {
        this.browserUIManager = browserUIManager;

        // Update references in components that need the BrowserUIManager
        if (this.themeToggle) {
            this.themeToggle.setBrowserUIManager(browserUIManager);
        }

        Debug.log('DiffViewer: BrowserUIManager reference set', null, 2);
        return this;
    }
}
