import { Debug } from '../utils/Debug';
import { BaseSingleton } from '../utils/BaseSingleton';
import Selectors from '../constants/Selectors';

// Module-level singleton instance
let instance = null;

export class ThemeManager extends BaseSingleton {
    /**
     * Get the singleton instance
     * @returns {ThemeManager} The singleton instance
     */
    static getInstance() {
        if (!instance) {
            instance = new ThemeManager();
        }
        return instance;
    }

    /**
     * Constructor - protected from direct instantiation
     */
    constructor() {
        super();
        // Skip initialization if instance already exists
        if (!this._isFirstInstance(instance)) {
            return;
        }

        // Initialize instance
        this.initialized = false;
        this.availableThemes = null;
        this.currentTheme = { family: null, mode: null };
        this.defaultTheme = { family: 'atom-one', mode: 'dark' };
        this.listeners = [];
        this.resourceLoader = null;

        // Store instance
        instance = this;
    }

    /**
     * Initialize with config and ResourceLoader
     * @param {Object} config - Configuration object with theme settings
     * @param {ResourceLoader} resourceLoader - ResourceLoader instance
     * @returns {boolean} Success status
     */
    initialize(config, resourceLoader) {
        Debug.log('ThemeManager: Initializing', { config }, 2);

        if (this.initialized) return true;

        // Get theme configuration (accepts both legacy and new format)
        this.config = config?.theme || {};
        this.resourceLoader = resourceLoader;

        // Get the availableThemes from ResourceLoader
        this.availableThemes = resourceLoader.config.availableThemes;

        // Set defaults from config or use hardcoded defaults
        this.defaultTheme.family = this.config.defaultFamily || this.defaultTheme.family;
        this.defaultTheme.mode = this.config.defaultMode || this.defaultTheme.mode;

        // Get saved preferences
        const savedFamily = localStorage.getItem('diffViewerThemeFamily') || this.defaultTheme.family;
        const savedMode = localStorage.getItem('diffViewerTheme') || this.defaultTheme.mode;

        this.currentTheme = {
            family: savedFamily,
            mode: savedMode
        };

        Debug.log(`ThemeManager: Initialized with ${savedFamily} (${savedMode})`, null, 2);
        this.initialized = true;

        Debug.log('ThemeManager: Successfully initialized', null, 2);
        return true;
    }

    /**
     * Get theme URL for a specific family and mode
     * @param {string} family - The theme family (e.g., 'atom-one')
     * @param {string} mode - The theme mode ('light' or 'dark')
     * @param {boolean} fallbackToDefaults - Whether to fall back to defaults if not found
     * @returns {string} The theme URL
     */
    getThemeUrl(family, mode, fallbackToDefaults = true) {
        // First check if the requested theme exists
        if (this.availableThemes?.[family]?.[mode]) {
            return this.availableThemes[family][mode];
        }

        // Don't proceed with fallbacks if requested
        if (!fallbackToDefaults) {
            return null;
        }

        // Check if the opposite mode exists for this family
        const alternateMode = mode === 'dark' ? 'light' : 'dark';
        if (this.availableThemes?.[family]?.[alternateMode]) {
            Debug.log(`ThemeManager: Theme ${family} doesn't have ${mode} mode, using ${alternateMode} instead`, null, 2);
            return this.availableThemes[family][alternateMode];
        }

        // Fall back to default theme
        Debug.log(`ThemeManager: Falling back to default theme: ${this.defaultTheme.family} (${mode})`, null, 2);
        return this.availableThemes[this.defaultTheme.family][mode] ||
               this.availableThemes[this.defaultTheme.family][alternateMode];
    }

    /**
     * Check if a theme exists
     * @param {string} family - The theme family
     * @param {string} mode - The theme mode
     * @returns {boolean} Whether the theme exists
     */
    themeExists(family, mode) {
        return !!this.availableThemes?.[family]?.[mode];
    }

    /**
     * Get all available theme families
     * @returns {string[]} Array of theme family names
     */
    getAvailableThemeFamilies() {
        return Object.keys(this.availableThemes || {});
    }

    /**
     * Get available modes for a theme family
     * @param {string} family - The theme family
     * @returns {string[]} Available modes ('light', 'dark', or both)
     */
    getAvailableModesForFamily(family) {
        if (!this.availableThemes?.[family]) {
            return [];
        }
        return Object.keys(this.availableThemes[family]);
    }

    /**
     * Get theme CDN version - useful for consistent versioning
     * @returns {string} The CDN version
     */
    getThemeCdnVersion() {
        return '11.11.1'; // Could be made configurable in the future
    }

    /**
     * Get theme CDN base URL
     * @returns {string} The CDN base URL
     */
    getThemeCdnBase() {
        return 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js';
    }

    /**
     * Get standard theme URL pattern (for direct generation)
     * @param {string} family - Theme family
     * @param {string} mode - Theme mode
     * @returns {string} Standard theme URL
     */
    getStandardThemeUrl(family, mode) {
        return `${this.getThemeCdnBase()}/${this.getThemeCdnVersion()}/styles/base16/${family}-${mode}.min.css`;
    }

    /**
     * Apply theme (load CSS and update UI)
     * @param {string} family - Theme family
     * @param {string} mode - Theme mode
     * @returns {Promise<boolean>} Success status
     */
    async applyTheme(family, mode) {
        if (!this.initialized || !this.resourceLoader) {
            Debug.warn('ThemeManager: Not properly initialized', null, 2);
            return false;
        }

        // Use our centralized method to get the URL
        const themeUrl = this.getThemeUrl(family, mode);
        if (!themeUrl) {
            Debug.error(`ThemeManager: Could not resolve URL for theme ${family}/${mode}`, null, 2);
            return false;
        }

        Debug.log(`ThemeManager: Applying theme ${family}/${mode}`, null, 2);

        // Skip if theme is already active
        const activeTheme = document.querySelector(
            'link[href*="highlight.js"][href*="/styles/"][rel="stylesheet"]:not([disabled])'
        );

        if (activeTheme && activeTheme.getAttribute('href') === themeUrl) {
            Debug.log(`ThemeManager: Theme ${family}/${mode} already active`, null, 2);
            return true;
        }

        try {
            // Load CSS if needed
            if (!document.querySelector(`link[href="${themeUrl}"]`)) {
                await this.resourceLoader.loadCSS(themeUrl);
            }

            // Disable all current theme stylesheets
            document.querySelectorAll('link[href*="highlight.js"][href*="/styles/"][rel="stylesheet"]:not([disabled])').forEach(link => {
                link.disabled = true;
            });

            // Enable the new theme
            const themeLink = document.querySelector(`link[href="${themeUrl}"]`);
            if (themeLink) {
                themeLink.disabled = false;
                Debug.log(`ThemeManager: Theme applied: ${family} (${mode})`, null, 2);
            }

            // Update container class for dark/light mode
            this.updateContainerThemeClass(mode);

            // Update current theme and save to localStorage
            this.currentTheme = { family, mode };
            localStorage.setItem('diffViewerThemeFamily', family);
            localStorage.setItem('diffViewerTheme', mode);

            // Notify all listeners
            this.notifyListeners();

            Debug.log(`ThemeManager: Theme applied successfully: ${family}/${mode}`, null, 2);
            return true;
        } catch (error) {
            Debug.error('ThemeManager: Error during theme operation:', error, 2);
            return false;
        }
    }

    /**
     * Update container theme class based on mode
     * @param {string} mode - Theme mode ('light' or 'dark')
     */
    updateContainerThemeClass(mode) {
        const container = document.getElementById(Selectors.CONTAINER.WRAPPER.name());
        if (container) {
            container.classList.remove(Selectors.THEME.DARK.name(), Selectors.THEME.LIGHT.name());
            container.classList.add(Selectors.THEME.MODE_PREFIX.name() + '--' + mode);
        }
    }

    /**
     * Set theme mode only (light/dark)
     * @param {string} mode - Theme mode ('light' or 'dark')
     * @returns {Promise<boolean>} Success status
     */
    async setThemeMode(mode) {
        Debug.log(`ThemeManager: Setting theme mode to ${mode}`, null, 2);
        return this.applyTheme(this.currentTheme.family, mode);
    }

    /**
     * Set theme family only (keeps current mode)
     * @param {string} family - Theme family
     * @returns {Promise<boolean>} Success status
     */
    async setThemeFamily(family) {
        Debug.log(`ThemeManager: Setting theme family to ${family}`, null, 2);
        return this.applyTheme(family, this.currentTheme.mode);
    }

    /**
     * Add a listener to be notified of theme changes
     * @param {Function} listener - Listener function
     */
    addListener(listener) {
        if (typeof listener === 'function') {
            this.listeners.push(listener);
        }
    }

    /**
     * Notify all listeners of theme changes
     */
    notifyListeners() {
        this.listeners.forEach(listener => {
            try {
                listener(this.currentTheme);
            } catch (error) {
                Debug.error('ThemeManager: Error in theme listener:', error, 2);
            }
        });
    }

    /**
     * Get current theme information
     * @returns {Object} Current theme information
     */
    getCurrentTheme() {
        return { ...this.currentTheme };
    }

    /**
     * Load initial theme based on current settings
     * @returns {Promise<boolean>} Success status
     */
    async loadInitialTheme() {
        if (!this.initialized || !this.resourceLoader) {
            Debug.warn('ThemeManager: Not properly initialized', null, 2);
            return false;
        }

        // Get theme from current settings
        const family = this.currentTheme.family || this.defaultTheme.family;
        const mode = this.currentTheme.mode || this.defaultTheme.mode;

        Debug.log(`ThemeManager: Loading initial theme ${family}/${mode}`, null, 2);

        try {
            // Apply the theme
            const themeUrl = this.getThemeUrl(family, mode);
            if (!themeUrl) {
                Debug.error(`ThemeManager: Could not resolve URL for theme ${family}/${mode}`, null, 2);
                return false;
            }

            // Load CSS if needed
            if (!document.querySelector(`link[href="${themeUrl}"]`)) {
                await this.resourceLoader.loadCSS(themeUrl);
            }

            // Disable all current theme stylesheets
            document.querySelectorAll('link[href*="highlight.js"][href*="/styles/"][rel="stylesheet"]:not([disabled])').forEach(link => {
                link.disabled = true;
            });

            // Enable the new theme
            const themeLink = document.querySelector(`link[href="${themeUrl}"]`);
            if (themeLink) {
                themeLink.disabled = false;
                Debug.log(`ThemeManager: Theme applied: ${family} (${mode})`, null, 2);
            }

            // Update container class for dark/light mode
            this.updateContainerThemeClass(mode);

            // Update current theme and save to localStorage
            this.currentTheme = { family, mode };
            localStorage.setItem('diffViewerThemeFamily', family);
            localStorage.setItem('diffViewerTheme', mode);

            // Notify all listeners
            this.notifyListeners();

            Debug.log(`ThemeManager: Initial theme applied successfully: ${family}/${mode}`, null, 2);
            return true;
        } catch (error) {
            Debug.error('ThemeManager: Error during initial theme loading:', error, 2);
            return false;
        }
    }
}
