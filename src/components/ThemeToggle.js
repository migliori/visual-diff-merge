import { Debug } from '../utils/Debug';
import Selectors from '../constants/Selectors';
import { DOMUtils } from '../utils/DOMUtils';
import { TranslationManager } from '../utils/TranslationManager';

import { ThemeManager } from './ThemeManager';

/**
 * Handles theme light/dark toggle functionality
 */
export class ThemeToggle {
    /**
     * @param {Object} browserUIManager - BrowserUIManager instance
     * @param {string} toggleElementId - Toggle element ID
     * @param {string} containerId - Container element ID
     */
    constructor(browserUIManager = null, toggleElementId = Selectors.THEME.TOGGLE.name(), containerId = Selectors.CONTAINER.WRAPPER.name()) {
        this.toggleElementId = toggleElementId;
        this.containerId = containerId;

        // Use DOMUtils for element retrieval with consistent error handling
        this.toggleElement = DOMUtils.getElement(toggleElementId);
        this.container = DOMUtils.getElement(containerId);
        this.themeManager = ThemeManager.getInstance();
        this.translationManager = TranslationManager.getInstance();
        this.browserUIManager = browserUIManager;

        Debug.log('ThemeToggle: Component created', null, 2);
    }

    /**
     * Initialize toggle with event handlers
     */
    initialize() {
        Debug.log('ThemeToggle: Initializing', null, 2);

        if (!this.toggleElement || !this.container) {
            Debug.warn(`ThemeToggle: Elements not found for initialization - toggle: ${!!this.toggleElement}, container: ${!!this.container}`, null, 2);
            return false;
        }

        // Get current theme from ThemeManager
        const currentTheme = this.themeManager.getCurrentTheme();
        this.toggleElement.checked = currentTheme.mode === 'dark';

        // Apply initial theme class to container using ThemeManager's method
        this.themeManager.updateContainerThemeClass(currentTheme.mode);

        // Add event listener to toggle element
        this.toggleElement.addEventListener('change', this.handleToggle.bind(this));

        // Add listener to ThemeManager to update toggle when theme changes from elsewhere
        this.themeManager.addListener(this.updateToggle.bind(this));

        // Log whether we have a BrowserUIManager instance
        Debug.log(`ThemeToggle: BrowserUIManager reference ${this.browserUIManager ? 'is available' : 'is not available'}`, null, 2);

        Debug.log('ThemeToggle: Initialized successfully', null, 2);
        return true;
    }

    /**
     * Set the BrowserUIManager instance
     * @param {Object} browserUIManager - BrowserUIManager instance
     * @returns {ThemeToggle} - This instance for chaining
     */
    setBrowserUIManager(browserUIManager) {
        this.browserUIManager = browserUIManager;
        Debug.log('ThemeToggle: BrowserUIManager reference set', null, 2);
        return this;
    }

    /**
     * Handle toggle event
     * @param {Event} event - Change event
     */
    handleToggle(event) {
        const isDark = event.target.checked;
        const newMode = isDark ? 'dark' : 'light';

        // Show the theme loading indicator
        if (this.browserUIManager) {
            this.browserUIManager.showThemeLoading();
        } else {
            Debug.log('ThemeToggle: BrowserUIManager not available, no loading indicator will be shown', null, 2);
        }

        try {
            // Apply the theme and then hide the loader when complete
            this.themeManager.setThemeMode(newMode)
                .then(() => {
                    // Hide the loader after theme is loaded
                    if (this.browserUIManager) {
                        this.browserUIManager.hideThemeLoading();
                    }
                    Debug.log(`ThemeToggle: Theme toggled to ${newMode} mode`, null, 2);
                })
                .catch(error => {
                    // Hide loader on error
                    if (this.browserUIManager) {
                        this.browserUIManager.hideThemeLoading();
                    }
                    Debug.error('ThemeToggle: Error toggling theme:', error, 2);
                });
        } catch (error) {
            // Hide loader on immediate error
            if (this.browserUIManager) {
                this.browserUIManager.hideThemeLoading();
            }
            Debug.error('ThemeToggle: Error toggling theme:', error, 2);
        }
    }

    /**
     * Update toggle state based on theme
     * @param {Object} theme - Theme object
     */
    updateToggle(theme) {
        if (!this.toggleElement) return;

        const currentTheme = theme || this.themeManager.getCurrentTheme();
        this.toggleElement.checked = currentTheme.mode === 'dark';

        // Instead of using our own updateContainerClass method,
        // leverage the centralized method from ThemeManager
        if (this.container) {
            this.themeManager.updateContainerThemeClass(currentTheme.mode);
        }
    }
}
