/**
 * DiffConfigManager.js
 *
 * Singleton utility to centralize management of the diffConfig configuration object.
 * This provides a single source of truth for the diffConfig settings used throughout the application.
 */

import { Debug } from './Debug';

/**
 * Manages the diffConfig configuration settings as a singleton
 */
export class DiffConfigManager {
    /**
     * Private instance - follows singleton pattern
     * @type {DiffConfigManager}
     * @private
     */
    static #instance = null;

    /**
     * Private constructor - use getInstance() instead
     * @private
     */
    constructor() {
        // Track if server config has been loaded to avoid multiple loads
        this._serverConfigLoaded = false;

        // Initialize window.diffConfig if it doesn't exist
        if (typeof window !== 'undefined' && !window.diffConfig) {
            Debug.log('DiffConfigManager: Initializing empty window.diffConfig', null, 2);
            window.diffConfig = {
                debug: false,
                logLevel: 1,
                old: {},
                new: {}
            };
        } else if (typeof window !== 'undefined' && window.diffConfig) {
            Debug.log('DiffConfigManager: Using existing window.diffConfig', window.diffConfig, 2);
        }
    }

    /**
     * Load configuration from server if needed
     * @returns {Promise<void>}
     */
    async ensureServerConfigLoaded() {
        // Only load server config once to avoid overriding runtime values
        if (this._serverConfigLoaded) {
            Debug.log('DiffConfigManager: Server config already loaded, skipping', null, 2);
            return;
        }

        // Check if we already have a server-provided apiBaseUrl
        if (typeof window !== 'undefined' && window.diffConfig?.apiBaseUrl) {
            Debug.log('DiffConfigManager: Server config already loaded with apiBaseUrl', window.diffConfig.apiBaseUrl, 2);
            this._serverConfigLoaded = true;
            return;
        }

        try {
            Debug.log('DiffConfigManager: Loading server configuration...', null, 2);

            // Try to determine the API base URL from script location
            let apiBaseUrl = '';
            const scripts = document.querySelectorAll('script[src*="visual-diff-merge"]');
            if (scripts.length > 0) {
                const scriptSrc = scripts[0].src;
                const match = scriptSrc.match(/^(.+\/visual-diff-merge[^\/]*)\//);
                if (match) {
                    apiBaseUrl = match[1] + '/api/';
                }
            }

            if (!apiBaseUrl) {
                Debug.log('DiffConfigManager: Could not determine API base URL from script location', null, 2);
                return;
            }

            // Fetch configuration from server
            const configResponse = await fetch(apiBaseUrl + 'endpoint-config.php');
            if (configResponse.ok) {
                const serverConfig = await configResponse.json();

                // The endpoint returns the config directly, not nested in a 'javascript' property
                if (serverConfig && typeof serverConfig === 'object') {
                    Debug.log('DiffConfigManager: Loaded server configuration', serverConfig, 2);
                    if (typeof window !== 'undefined') {
                        // Preserve existing serverSaveEnabled if it's already set
                        const existingServerSaveEnabled = window.diffConfig?.serverSaveEnabled;
                        window.diffConfig = { ...(window.diffConfig || {}), ...serverConfig };

                        // Don't override serverSaveEnabled if it was already explicitly set
                        if (existingServerSaveEnabled !== undefined && !serverConfig.hasOwnProperty('serverSaveEnabled')) {
                            window.diffConfig.serverSaveEnabled = existingServerSaveEnabled;
                            Debug.log('DiffConfigManager: Preserved existing serverSaveEnabled', existingServerSaveEnabled, 2);
                        }

                        // Mark as loaded to prevent future loads
                        this._serverConfigLoaded = true;
                    }
                }
            } else {
                Debug.warn('DiffConfigManager: Failed to load server configuration', configResponse.status, 1);
            }
        } catch (error) {
            Debug.warn('DiffConfigManager: Error loading server configuration', error, 1);
        } finally {
            // Mark as loaded even if there was an error to prevent retries
            this._serverConfigLoaded = true;
        }
    }

    /**
     * Get the singleton instance
     * @returns {DiffConfigManager} The singleton instance
     */
    static getInstance() {
        if (!DiffConfigManager.#instance) {
            DiffConfigManager.#instance = new DiffConfigManager();
        }
        return DiffConfigManager.#instance;
    }

    /**
     * Initialize with configuration
     * @param {Object} config - The initial configuration
     */
    async initialize(config = {}) {
        Debug.log('DiffConfigManager: Initializing with config', config, 2);

        // Check if serverSaveEnabled is already set in window.diffConfig
        const hasRuntimeServerSaveEnabled = typeof window !== 'undefined' &&
            window.diffConfig &&
            window.diffConfig.hasOwnProperty('serverSaveEnabled');

        // Only load server config if we don't have runtime values already set
        if (!hasRuntimeServerSaveEnabled) {
            await this.ensureServerConfigLoaded();
        } else {
            Debug.log('DiffConfigManager: Skipping server config load - serverSaveEnabled already set',
                window.diffConfig.serverSaveEnabled, 2);
        }

        // Then apply the provided config
        if (typeof window !== 'undefined') {
            window.diffConfig = { ...(window.diffConfig || {}), ...config };
        } else {
            Debug.error('DiffConfigManager: Cannot initialize, window is not available', null, 1);
        }
    }

    /**
     * Get the current diffConfig (reference to window.diffConfig)
     * @returns {Object} The current diffConfig
     */
    getDiffConfig() {
        if (typeof window === 'undefined' || !window.diffConfig) {
            Debug.warn('DiffConfigManager: window.diffConfig is not available', null, 1);
            return {};
        }
        return window.diffConfig;
    }

    /**
     * Set a new diffConfig, completely replacing the current one
     * @param {Object} config - The new configuration to use
     */
    setDiffConfig(config = {}) {
        Debug.log('DiffConfigManager: Setting new diffConfig', config, 2);
        if (typeof window !== 'undefined') {
            window.diffConfig = { ...config };
        } else {
            Debug.error('DiffConfigManager: Cannot set config, window is not available', null, 1);
        }
    }

    /**
     * Safely set a new diffConfig while preserving critical runtime values
     * This method preserves fileRefId, oldFileRefId, and other runtime properties
     * that should not be overwritten by server responses
     * @param {Object} config - The new configuration to use
     */
    setDiffConfigSafe(config = {}) {
        Debug.log('DiffConfigManager: Setting new diffConfig safely (preserving runtime values)', config, 2);

        if (typeof window === 'undefined') {
            Debug.error('DiffConfigManager: Cannot set config, window is not available', null, 1);
            return;
        }

        // Define critical runtime properties that should be preserved
        const criticalRuntimeProps = [
            'fileRefId',
            'oldFileRefId',
            'newFileName',
            'oldFileName',
            'serverSaveEnabled'
        ];

        // Preserve existing critical values
        const preservedValues = {};
        criticalRuntimeProps.forEach(prop => {
            if (window.diffConfig && window.diffConfig[prop] !== undefined && window.diffConfig[prop] !== null && window.diffConfig[prop] !== '') {
                preservedValues[prop] = window.diffConfig[prop];
                Debug.log(`DiffConfigManager: Preserving existing ${prop}`, window.diffConfig[prop], 3);
            }
        });

        // Set the new config
        window.diffConfig = { ...config };

        // Restore preserved values (they take precedence over server values)
        Object.entries(preservedValues).forEach(([key, value]) => {
            window.diffConfig[key] = value;
            Debug.log(`DiffConfigManager: Restored critical runtime property ${key}`, value, 3);
        });

        Debug.log('DiffConfigManager: Safe setDiffConfig completed', {
            preservedCount: Object.keys(preservedValues).length,
            preserved: Object.keys(preservedValues)
        }, 2);
    }

    /**
     * Reset the diffConfig to default values, possibly with new overrides
     * @param {Object} overrides - Optional configuration overrides to apply after reset
     */
    reset(overrides = {}) {
        Debug.log('DiffConfigManager: Resetting diffConfig with overrides', overrides, 2);
        if (typeof window !== 'undefined') {
            window.diffConfig = {
                debug: false,
                logLevel: 1,
                old: {},
                new: {},
                ...overrides
            };
        } else {
            Debug.error('DiffConfigManager: Cannot reset config, window is not available', null, 1);
        }
    }

    /**
     * Update part of the configuration
     * @param {Object} partialConfig - The partial configuration to update
     */
    update(partialConfig = {}) {
        Debug.log('DiffConfigManager: Updating diffConfig with', partialConfig, 3);

        if (typeof window === 'undefined' || !window.diffConfig) {
            Debug.warn('DiffConfigManager: window.diffConfig not available for update', null, 1);
            return;
        }

        // Check if the partialConfig has a nested 'config' property
        if (partialConfig && partialConfig.config && typeof partialConfig.config === 'object') {
            Debug.log('DiffConfigManager: Extracting nested config property', partialConfig.config, 3);
            // Use the nested config object instead of the wrapper
            window.diffConfig = this.#mergeDeep(window.diffConfig, partialConfig.config);
        } else {
            // Use the original object if no nested config property
            window.diffConfig = this.#mergeDeep(window.diffConfig, partialConfig);
        }
    }

    /**
     * Set a specific configuration value by key
     * @param {string} key - The configuration key
     * @param {*} value - The value to set
     */
    set(key, value) {
        Debug.log(`DiffConfigManager: Setting ${key}`, value, 3);
        if (typeof window !== 'undefined' && window.diffConfig) {
            window.diffConfig[key] = value;
        } else {
            Debug.error(`DiffConfigManager: Cannot set ${key}, window.diffConfig not available`, null, 1);
        }
    }

    /**
     * Get a specific configuration value by key
     * @param {string} key - The configuration key
     * @param {*} defaultValue - Default value if the key doesn't exist
     * @returns {*} The configuration value
     */
    get(key, defaultValue = null) {
        if (typeof window === 'undefined' || !window.diffConfig) {
            Debug.warn(`DiffConfigManager: Cannot get ${key}, window.diffConfig not available`, null, 1);
            return defaultValue;
        }
        return key in window.diffConfig ? window.diffConfig[key] : defaultValue;
    }

    /**
     * Check if a configuration key exists
     * @param {string} key - The configuration key to check
     * @returns {boolean} True if the key exists
     */
    has(key) {
        if (typeof window === 'undefined' || !window.diffConfig) {
            Debug.warn(`DiffConfigManager: Cannot check ${key}, window.diffConfig not available`, null, 1);
            return false;
        }
        return key in window.diffConfig;
    }

    /**
     * Remove a specific configuration key
     * @param {string} key - The configuration key to remove
     */
    remove(key) {
        if (typeof window !== 'undefined' && window.diffConfig && key in window.diffConfig) {
            Debug.log(`DiffConfigManager: Removing ${key}`, null, 3);
            delete window.diffConfig[key];
        } else {
            Debug.warn(`DiffConfigManager: Cannot remove ${key}, not found or window.diffConfig not available`, null, 1);
        }
    }

    /**
     * Deep merge two objects recursively
     * @param {Object} target - Target object
     * @param {Object} source - Source object to merge
     * @returns {Object} The merged object
     * @private
     */
    #mergeDeep(target, source) {
        const output = { ...target };

        if (this.#isObject(target) && this.#isObject(source)) {
            Object.keys(source).forEach(key => {
                if (this.#isObject(source[key])) {
                    if (!(key in target)) {
                        output[key] = source[key];
                    } else {
                        output[key] = this.#mergeDeep(target[key], source[key]);
                    }
                } else {
                    output[key] = source[key];
                }
            });
        }

        return output;
    }

    /**
     * Check if a value is an object
     * @param {*} item - The value to check
     * @returns {boolean} True if the value is an object
     * @private
     */
    #isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }
}

export default DiffConfigManager;
