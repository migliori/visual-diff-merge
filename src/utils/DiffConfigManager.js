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
     * Centralized diffConfig object
     * @type {Object}
     * @private
     */
    #diffConfig = {};

    /**
     * Private constructor - use getInstance() instead
     * @private
     */
    constructor() {
        // Initialize the diffConfig with any existing window.diffConfig
        if (typeof window !== 'undefined' && window.diffConfig) {
            Debug.log('DiffConfigManager: Initializing with existing window.diffConfig', window.diffConfig, 2);
            this.#diffConfig = { ...window.diffConfig };
        } else {
            this.#diffConfig = {
                debug: false,
                logLevel: 1,
                old: {},
                new: {}
            };
        }

        // Make the diffConfig available globally through window.diffConfig
        this.#updateGlobalDiffConfig();
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
    initialize(config = {}) {
        Debug.log('DiffConfigManager: Initializing with config', config, 2);
        this.#diffConfig = { ...this.#diffConfig, ...config };
        this.#updateGlobalDiffConfig();
    }

    /**
     * Get the current diffConfig
     * @returns {Object} The current diffConfig
     */
    getDiffConfig() {
        return this.#diffConfig;
    }

    /**
     * Set a new diffConfig, completely replacing the current one
     * @param {Object} config - The new configuration to use
     */
    setDiffConfig(config = {}) {
        Debug.log('DiffConfigManager: Setting new diffConfig', config, 2);
        this.#diffConfig = { ...config };
        this.#updateGlobalDiffConfig();
    }

    /**
     * Reset the diffConfig to default values, possibly with new overrides
     * @param {Object} overrides - Optional configuration overrides to apply after reset
     */
    reset(overrides = {}) {
        Debug.log('DiffConfigManager: Resetting diffConfig with overrides', overrides, 2);
        this.#diffConfig = {
            debug: false,
            logLevel: 1,
            old: {},
            new: {},
            ...overrides
        };
        this.#updateGlobalDiffConfig();
    }

    /**
     * Update part of the configuration
     * @param {Object} partialConfig - The partial configuration to update
     */
    update(partialConfig = {}) {
        Debug.log('DiffConfigManager: Updating diffConfig with', partialConfig, 3);

        // Check if the partialConfig has a nested 'config' property
        if (partialConfig && partialConfig.config && typeof partialConfig.config === 'object') {
            Debug.log('DiffConfigManager: Extracting nested config property', partialConfig.config, 3);
            // Use the nested config object instead of the wrapper
            this.#diffConfig = this.#mergeDeep(this.#diffConfig, partialConfig.config);
        } else {
            // Use the original object if no nested config property
            this.#diffConfig = this.#mergeDeep(this.#diffConfig, partialConfig);
        }

        this.#updateGlobalDiffConfig();
    }

    /**
     * Set a specific configuration value by key
     * @param {string} key - The configuration key
     * @param {*} value - The value to set
     */
    set(key, value) {
        Debug.log(`DiffConfigManager: Setting ${key}`, value, 3);
        this.#diffConfig[key] = value;
        this.#updateGlobalDiffConfig();
    }

    /**
     * Get a specific configuration value by key
     * @param {string} key - The configuration key
     * @param {*} defaultValue - Default value if the key doesn't exist
     * @returns {*} The configuration value
     */
    get(key, defaultValue = null) {
        return key in this.#diffConfig ? this.#diffConfig[key] : defaultValue;
    }

    /**
     * Remove a specific configuration key
     * @param {string} key - The configuration key to remove
     */
    remove(key) {
        if (key in this.#diffConfig) {
            Debug.log(`DiffConfigManager: Removing ${key}`, null, 3);
            delete this.#diffConfig[key];
            this.#updateGlobalDiffConfig();
        }
    }

    /**
     * Update the global window.diffConfig object
     * @private
     */
    #updateGlobalDiffConfig() {
        if (typeof window !== 'undefined') {
            window.diffConfig = { ...this.#diffConfig };
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
