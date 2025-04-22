import { Debug } from '../utils/Debug';

import { BaseSingleton } from './BaseSingleton';

// Module-level singleton instance
let instance = null;

export class ResourceLoader extends BaseSingleton {
    /**
     * Get the singleton instance
     * @returns {ResourceLoader} The singleton instance
     */
    static getInstance() {
        if (!instance) {
            instance = new ResourceLoader();
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
        this.config = null;
        this.loadedResources = new Set();
        this.loadedLanguages = new Set();
        this.loadedThemes = new Set(); // ADD THIS LINE
        this.CDN_BASE = 'https://cdnjs.cloudflare.com/ajax/libs';
        this.HLJS_VERSION = '11.11.1';
        this.LINE_NUMBERS_VERSION = '2.8.0';

        // Store instance
        instance = this;
    }

    /**
     * Configure the ResourceLoader
     * @param {Object} config - Configuration object
     */
    configure(config) {
        Debug.log('ResourceLoader: Configuring', { config }, 2);

        this.config = config;
        Debug.log('ResourceLoader configured');

        Debug.log('ResourceLoader: Configuration complete', null, 2);
        return this;
    }

    /**
     * Load all dependencies required for the diff viewer
     */
    async loadDependencies() {
        await this.loadSyntaxHighlighterCore();
        await this.loadLanguage(this.config.language || 'php');
        // Note: Theme loading is now ThemeManager's responsibility
        return true;
    }

    // Split theme loading from core highlighter loading
    /**
     * Load syntax highlighter core without theme
     */
    async loadSyntaxHighlighterCore() {
        if (!this.config) {
            Debug.error('ResourceLoader: Must be configured before loading dependencies', null, 2);
            throw new Error('ResourceLoader must be configured before loading dependencies');
        }

        try {
            Debug.log('ResourceLoader: Loading syntax highlighter core (NO THEME)', null, 2);

            // Check if hljs is already loaded
            if (window.hljs) {
                // Changed from level 3 to level 2 - more consistent with other logs
                Debug.log('ResourceLoader: highlight.js already loaded', null, 2);
            } else {
                Debug.log('ResourceLoader: Loading highlight.js from CDN', null, 2);
                await this.loadScript(`${this.CDN_BASE}/highlight.js/${this.HLJS_VERSION}/highlight.min.js`);

                Debug.log('ResourceLoader: Loading line numbers plugin', null, 2);
                await this.loadScript(`${this.CDN_BASE}/highlightjs-line-numbers.js/${this.LINE_NUMBERS_VERSION}/highlightjs-line-numbers.min.js`);
            }

            Debug.log('ResourceLoader: Syntax highlighter core loaded successfully', null, 2);
            return true;
        } catch (error) {
            Debug.error('ResourceLoader: Failed to load syntax highlighter core:', error, 2);
            return false;
        }
    }

    /**
     * Load a specific language for syntax highlighting
     * @param {string} language - The language to load
     * @returns {Promise} - Resolves when language is loaded
     */
    async loadLanguage(language) {
        // Normalize language name
        const langMap = {
            'markup': 'xml',
            'html': 'xml',
            'htm': 'xml',
            'javascript': 'javascript',
            'js': 'javascript',
            'typescript': 'typescript',
            'ts': 'typescript',
            'jsx': 'javascript',
            'tsx': 'typescript'
        };

        // Get the normalized language name
        const normalizedLang = langMap[language.toLowerCase()] || language.toLowerCase();

        // Check if already loaded
        if (this.loadedLanguages.has(normalizedLang)) {
            return true;
        }

        // Load the language
        Debug.log(`ResourceLoader: Loading language ${normalizedLang}`, null, 2);
        try {
            // Since dynamic imports aren't working well with webpack, let's use CDN directly
            await this.loadScript(`${this.CDN_BASE}/highlight.js/${this.HLJS_VERSION}/languages/${normalizedLang}.min.js`);
            this.loadedLanguages.add(normalizedLang);
            Debug.log(`ResourceLoader: Language ${normalizedLang} loaded from CDN successfully`, null, 2);
            return true;
        } catch (error) {
            Debug.warn(`ResourceLoader: Failed to load language ${normalizedLang}, falling back to built-in languages`, { error }, 2);
            // Don't throw - highlight.js will use its built-in detection
            return false;
        }
    }

    /**
     * Cache loaded resources to prevent duplicate requests
     * @private
     */
    _cacheResource(url, loadPromise) {
        if (!this.resourceCache) {
            this.resourceCache = new Map();
        }

        if (!this.resourceCache.has(url)) {
            this.resourceCache.set(url, loadPromise);
        }

        return this.resourceCache.get(url);
    }

    /**
     * Load a script with caching
     * @param {string} url - Script URL
     * @returns {Promise} Loading promise
     */
    loadScript(url) {
        return this._cacheResource(url, new Promise((resolve, reject) => {
            if (this.loadedResources.has(url)) {
                // Removed level 3 debug log - too verbose
                resolve();
                return;
            }

            Debug.log(`ResourceLoader: Loading script: ${url}`, null, 2);
            const script = document.createElement('script');
            script.src = url;
            script.async = true;
            script.onload = () => {
                this.loadedResources.add(url);
                // Removed level 3 debug log - covered by level 2 logs
                resolve();
            };
            script.onerror = () => {
                Debug.error(`ResourceLoader: Failed to load script: ${url}`, null, 2);
                reject(new Error(`Failed to load script: ${url}`));
            };
            document.head.appendChild(script);
        }));
    }

    /**
     * Load a CSS file with Promise support
     */
    loadCSS(href) {
        if (this.loadedThemes.has(href)) {
            // Removed level 3 debug log - too verbose
            return Promise.resolve();
        }

        Debug.log(`ResourceLoader: Loading CSS: ${href}`, null, 2);
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = () => {
                this.loadedThemes.add(href);
                // Removed level 3 debug log - covered by level 2 logs
                resolve();
            };
            link.onerror = () => {
                Debug.error(`ResourceLoader: Failed to load CSS: ${href}`, null, 2);
                reject(new Error(`Failed to load CSS: ${href}`));
            };
            document.head.appendChild(link);
        });
    }
}
