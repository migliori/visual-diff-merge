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
        this.boundHandleThemeChange = this.handleThemeChange.bind(this); // Store bound function

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

        // Check if selector already exists in DOM and reuse it
        const existingSelector = document.getElementById(Selectors.THEME.SELECTOR.name());
        if (existingSelector) {
            Debug.log('ThemeSelector: Reusing existing selector in DOM', null, 2);
            this.selectElement = existingSelector;
            this.container = existingSelector.parentNode;

            // Update selector to reflect current theme
            this.updateSelector();

            // Ensure event listener is attached (remove old one first to avoid duplicates)
            this.selectElement.removeEventListener('change', this.boundHandleThemeChange);
            this.selectElement.addEventListener('change', this.boundHandleThemeChange);

            Debug.log('ThemeSelector: Reused existing selector successfully', null, 2);
            return true;
        }

        // If BrowserUIManager is available, let it create the selector
        if (this.browserUIManager) {
            const selectorElements = this.browserUIManager.generateThemeSelector();
            if (selectorElements) {
                Debug.log('ThemeSelector: Using selector created by BrowserUIManager', null, 2);
                this.container = selectorElements.container;
                this.selectElement = selectorElements.selectElement;

                // Populate options and set up event handlers
                const populated = this.populateSelectorOptions();
                if (!populated) {
                    // If population failed, try again after a short delay (themes might not be loaded yet)
                    Debug.log('ThemeSelector: Initial population failed, retrying after delay', null, 2);
                    setTimeout(() => {
                        this.populateSelectorOptions();
                        this.updateSelector();
                    }, 100);
                }

                this.updateSelector();
                this.selectElement.addEventListener('change', this.boundHandleThemeChange);

                Debug.log('ThemeSelector: Initialized with BrowserUIManager selector successfully', null, 2);
                return true;
            }
        }

        // Fallback: Create container for the theme selector (only if doesn't exist)
        this.createSelectorElement();

        // Add the selector to the DOM
        this.addSelectorToDOM();

        // Update selector to reflect current theme
        this.updateSelector();

        // Add listener to ThemeManager to update selector when theme changes
        this.themeManager.addListener(this.updateSelector.bind(this));

        // Also add a listener to repopulate options if themes become available later
        this.themeManager.addListener(() => {
            if (this.selectElement && this.selectElement.options.length === 0) {
                Debug.log('ThemeSelector: Themes became available, repopulating options', null, 2);
                this.populateSelectorOptions();
            }
        });

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
     * Populate selector options with available themes
     */
    populateSelectorOptions() {
        Debug.log('ThemeSelector: Starting to populate selector options', null, 2);

        if (!this.selectElement) {
            Debug.warn('ThemeSelector: No select element available for population', null, 2);
            return false;
        }

        if (!this.themeManager) {
            Debug.warn('ThemeSelector: No theme manager available for population', null, 2);
            return false;
        }

        const currentTheme = this.themeManager.getCurrentTheme();
        Debug.log('ThemeSelector: Current theme', currentTheme, 2);

        // Clear existing options first
        this.selectElement.innerHTML = '';

        // Add options from available themes
        const availableThemes = this.themeManager.getAvailableThemeFamilies();
        Debug.log('ThemeSelector: Available themes', { availableThemes, count: availableThemes?.length || 0 }, 2);

        if (!availableThemes || availableThemes.length === 0) {
            Debug.warn('ThemeSelector: No available themes found', null, 2);
            return false;
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

        Debug.log('ThemeSelector: Populated selector with options',
                  { count: availableThemes.length }, 2);
        return true;
    }

    /**
     * Create the theme selector dropdown
     */
    createSelectorElement() {
        Debug.log('ThemeSelector: Creating new selector element', null, 2);

        // Create the container using DOMUtils with proper array of classes
        this.container = DOMUtils.createElement('div', null, [Selectors.THEME_SELECTOR.WRAPPER.name(), Selectors.UTILITY.MARGIN_END_3.name()]);

        // Create select element using DOMUtils
        this.selectElement = DOMUtils.createAndAppendElement('select', this.container, {
            id: Selectors.THEME.SELECTOR.name(),
            classes: [Selectors.UTILITY.FORM_SELECT.name(), Selectors.UTILITY.FORM_SELECT.name()]
        });

        // Populate options using the separate method
        this.populateSelectorOptions();

        // Add change event handler using stored bound function
        this.selectElement.addEventListener('change', this.boundHandleThemeChange);
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

        // If the selector has no options, try to populate them
        if (this.selectElement.options.length === 0) {
            Debug.log('ThemeSelector: Selector has no options, attempting to populate', null, 2);
            this.populateSelectorOptions();
        }

        const currentTheme = theme || this.themeManager.getCurrentTheme();
        if (this.selectElement.options.length > 0) {
            this.selectElement.value = currentTheme.family;
        }

        Debug.log(`ThemeSelector: Selector updated to ${theme?.family || currentTheme.family}`,
                 { optionsCount: this.selectElement.options.length }, 3);
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

    /**
     * Set the BrowserUIManager reference
     * @param {BrowserUIManager} browserUIManager - The BrowserUIManager instance
     */
    setBrowserUIManager(browserUIManager) {
        this.browserUIManager = browserUIManager;
        Debug.log('ThemeSelector: BrowserUIManager reference set', null, 3);
    }
}
