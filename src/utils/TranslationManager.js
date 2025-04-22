/**
 * Translation Manager
 * Provides centralized access to translations throughout the application
 */
import { BaseSingleton } from './BaseSingleton';
import { Debug } from './Debug';

/**
 * Singleton class that manages translations across the application
 */
export class TranslationManager extends BaseSingleton {
    /**
     * @private
     * Singleton instance
     */
    static _instance = null;

    /**
     * Get the singleton instance
     * @returns {TranslationManager} The singleton instance
     */
    static getInstance() {
        if (!TranslationManager._instance) {
            TranslationManager._instance = new TranslationManager();
            Debug.log('TranslationManager: Instance created', null, 2);
        }
        return TranslationManager._instance;
    }

    /**
     * Constructor - private, use getInstance()
     */
    constructor() {
        super();
        this.translations = {};
        this.lang = 'en';
        this.initialized = false;

        // IMPORTANT: Initialize immediately with window.diffConfig if available
        this._initializeFromGlobalConfig();
    }

    /**
     * Try to initialize from global config immediately
     * @private
     */
    _initializeFromGlobalConfig() {
        if (window.diffConfig && window.diffConfig.translations) {
            Debug.log('TranslationManager: Auto-initializing from window.diffConfig', window.diffConfig.translations, 2);
            this.initialize(
                window.diffConfig.lang || 'en',
                window.diffConfig.translations
            );
            return true;
        }
        return false;
    }

    /**
     * Initialize with language and translations
     * @param {string} lang - The language code
     * @param {Object} translations - Translation key-value pairs
     */
    initialize(lang = 'en', translations = {}) {
        this.lang = lang;
        this.translations = translations;
        this.initialized = true;
        Debug.log(`TranslationManager: Initialized with "${lang}" language`, this.translations, 2);
    }

    /**
     * Get a translation by key
     * @param {string} key - The translation key
     * @param {string} defaultValue - Default value if key not found (defaults to key itself)
     * @returns {string} The translated text or default value
     */
    get(key, defaultValue = null) {
        // If not initialized and window.diffConfig exists, try to initialize from there
        if (!this.initialized) {
            this._initializeFromGlobalConfig();
        }

        // Check if we have translations for the current language
        if (this.translations[this.lang] && this.translations[this.lang][key]) {
            return this.translations[this.lang][key];
        }

        // Fallback to English if the key exists there
        if (this.translations['en'] && this.translations['en'][key]) {
            Debug.log(`TranslationManager: Key "${key}" not found in "${this.lang}", using English fallback`, null, 2);
            return this.translations['en'][key];
        }

        // Use provided default or key itself
        return defaultValue !== null ? defaultValue : key;
    }

    /**
     * Check if initialization has been completed
     * @returns {boolean} True if initialized
     */
    isInitialized() {
        // Try to initialize if not already done
        if (!this.initialized) {
            this._initializeFromGlobalConfig();
        }
        return this.initialized;
    }

    /**
     * Get the current language
     * @returns {string} The current language code
     */
    getLanguage() {
        // Try to initialize if not already done
        if (!this.initialized) {
            this._initializeFromGlobalConfig();
        }
        return this.lang;
    }

    /**
     * Get all translations
     * @returns {Object} All translations
     */
    getAllTranslations() {
        // Try to initialize if not already done
        if (!this.initialized) {
            this._initializeFromGlobalConfig();
        }
        return {...this.translations};
    }
}
