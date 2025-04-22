import { Debug } from '../utils/Debug';
import Selectors from '../constants/Selectors';
import { BaseSingleton } from '../utils/BaseSingleton';
import { DOMUtils } from '../utils/DOMUtils';
import { TranslationManager } from '../utils/TranslationManager';

import { ThemeManager } from './ThemeManager';

// Module-level variables
let instance = null;

/**
 * Manages theme family selection dropdown
 */
export class ThemeSelector extends BaseSingleton {
    /**
     * Get the singleton instance
     * @param {DiffViewer} diffViewer - The DiffViewer instance (only used during first initialization)
     * @returns {ThemeSelector} The singleton instance
     */
    static getInstance(diffViewer = null) {
        Debug.log('ThemeSelector: Retrieving or creating instance', null, 3);
        if (!instance) {
            instance = new ThemeSelector(diffViewer);
        } else if (diffViewer && !instance.diffViewer) {
            // Update diffViewer if it was null previously
            instance.diffViewer = diffViewer;
        }
        return instance;
    }

    /**
     * Constructor - protected from direct instantiation
     * @param {DiffViewer} diffViewer - The DiffViewer instance
     */
    constructor(diffViewer) {
        super();
        // Skip initialization if instance already exists
        if (!this._isFirstInstance(instance)) {
            return;
        }

        Debug.log('ThemeSelector: Instance created', null, 3);

        // Initialize instance
        this.diffViewer = diffViewer;
        this.container = null;
        this.selectElement = null;
        this.themeManager = ThemeManager.getInstance();
        this.translationManager = TranslationManager.getInstance();
        this.browserUIManager = null;

        // Store instance
        instance = this;
    }

    /**
     * Initialize the theme selector
     */
    initialize() {
        // Check if theme selector should be enabled using the new config structure
        if (!this._isThemeSelectorEnabled()) {
            Debug.log('ThemeSelector: Theme selector disabled in configuration', null, 2);
            return false;
        }

        Debug.log('ThemeSelector: Initializing', null, 2);

        // Create container for the theme selector
        this.createSelectorElement();

        // Add the selector to the DOM
        this.addSelectorToDOM();

        // Update selector to reflect current theme
        this.updateSelector();

        // Add listener to ThemeManager to update selector when theme changes
        this.themeManager.addListener(this.updateSelector.bind(this));

        Debug.log('ThemeSelector: Initialized successfully', null, 2);
        return true;
    }

    /**
     * Check if theme selector should be enabled
     * @private
     * @returns {boolean} Whether the theme selector should be enabled
     */
    _isThemeSelectorEnabled() {
        // First try the new config structure
        if (this.diffViewer?.getConfig()?.theme?.selector !== undefined) {
            return !!this.diffViewer.getConfig().theme.selector;
        }

        // Then try the old options structure
        if (this.diffViewer?.options?.themeSelector !== undefined) {
            return !!this.diffViewer.options.themeSelector;
        }

        // Finally try the global diffConfig
        if (window.diffConfig?.theme?.selector !== undefined) {
            return !!window.diffConfig.theme.selector;
        }

        // Default to true - always show selector unless explicitly disabled
        return true;
    }

    /**
     * Create the theme selector dropdown
     */
    createSelectorElement() {
        const currentTheme = this.themeManager.getCurrentTheme();

        // Create the container using DOMUtils with proper array of classes
        this.container = DOMUtils.createElement('div', null, [Selectors.THEME_SELECTOR.WRAPPER.name(), Selectors.UTILITY.MARGIN_END_3.name()]);

        // Create select element using DOMUtils
        this.selectElement = DOMUtils.createAndAppendElement('select', this.container, {
            id: Selectors.THEME.SELECTOR.name(),
            classes: [Selectors.UTILITY.FORM_SELECT.name(), Selectors.UTILITY.FORM_SELECT.name()]
        });

        // Add options from available themes
        const availableThemes = this.themeManager.getAvailableThemeFamilies();
        if (!availableThemes || availableThemes.length === 0) {
            Debug.warn('ThemeSelector: No available themes found', null, 2);
            return;
        }

        availableThemes.forEach(themeKey => {
            DOMUtils.createAndAppendElement('option', this.selectElement, {
                attributes: {
                    value: themeKey,
                    selected: themeKey === currentTheme.family
                },
                content: this.formatThemeName(themeKey)
            });
        });

        Debug.log('ThemeSelector: Created selector with options',
                  { count: availableThemes.length }, 2);

        // Add change event handler
        this.selectElement.addEventListener('change', this.handleThemeChange.bind(this));
    }

    /**
     * Format theme name for display (e.g., "atom-one" to "Atom One")
     * @param {string} themeName - Theme name in kebab-case
     * @returns {string} Formatted theme name
     */
    formatThemeName(themeName) {
        return themeName
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    /**
     * Add the selector to the DOM
     */
    addSelectorToDOM() {
        // Find theme switcher container using DOMUtils
        const themeSwitcherContainer = DOMUtils.getElement(Selectors.THEME.SWITCHER.name());
        if (!themeSwitcherContainer) {
            Debug.warn('ThemeSelector: No theme switcher container found', null, 2);
            return false;
        }

        // Insert the selector before any existing elements
        themeSwitcherContainer.insertBefore(this.container, themeSwitcherContainer.firstChild);

        Debug.log('ThemeSelector: Selector added to DOM', null, 2);
        return true;
    }

    /**
     * Update selector to match current theme
     * @param {Object} theme - Theme object
     */
    updateSelector(theme) {
        if (!this.selectElement) return;

        const currentTheme = theme || this.themeManager.getCurrentTheme();
        this.selectElement.value = currentTheme.family;

        Debug.log(`ThemeSelector: Selector updated to ${theme?.family || currentTheme.family}`, null, 3);
    }

    /**
     * Handle theme change event
     * @param {Event} event - Change event
     */
    handleThemeChange(event) {
        const selectedTheme = event.target.value;

        // Try to get the BrowserUIManager instance if not already set
        if (!this.browserUIManager && this.diffViewer?.browserUIManager) {
            this.browserUIManager = this.diffViewer.browserUIManager;
        }

        // Show the theme loading indicator
        if (this.browserUIManager) {
            this.browserUIManager.showThemeLoading();
        }

        try {
            // Apply the theme and then hide the loader when complete
            this.themeManager.setThemeFamily(selectedTheme)
                .then(() => {
                    // Hide the loader after theme is loaded
                    if (this.browserUIManager) {
                        this.browserUIManager.hideThemeLoading();
                    }
                    Debug.log(`ThemeSelector: Theme changed to ${selectedTheme}`, null, 2);
                })
                .catch(error => {
                    // Hide loader on error
                    if (this.browserUIManager) {
                        this.browserUIManager.hideThemeLoading();
                    }
                    Debug.error('ThemeSelector: Error changing theme:', error, 2);
                });
        } catch (error) {
            // Hide loader on immediate error
            if (this.browserUIManager) {
                this.browserUIManager.hideThemeLoading();
            }
            Debug.error('ThemeSelector: Error changing theme:', error, 2);
        }
    }
}
