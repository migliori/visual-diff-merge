/**
 * Configuration management utilities
 */
export class ConfigUtils {
    /**
     * Recursively merge multiple configurations
     * @param {...Object} configs - Configurations to merge in order of increasing precedence
     * @returns {Object} Merged configuration
     */
    static mergeConfigurations(...configs) {
        // Start with an empty object
        const result = {};

        // Process each config in order
        for (const config of configs) {
            if (!config || typeof config !== 'object') {
                continue;
            }

            // Merge properties
            for (const key in config) {
                if (Object.prototype.hasOwnProperty.call(config, key)) {
                    // If both values are objects, merge recursively
                    if (
                        typeof result[key] === 'object' &&
                        result[key] !== null &&
                        !Array.isArray(result[key]) &&
                        typeof config[key] === 'object' &&
                        config[key] !== null &&
                        !Array.isArray(config[key])
                    ) {
                        result[key] = this.mergeConfigurations(result[key], config[key]);
                    } else {
                        // Otherwise just override
                        result[key] = config[key];
                    }
                }
            }
        }

        return result;
    }

    /**
     * Validate required configuration
     * @param {Object} config - Configuration to validate
     * @returns {Object} Validation result with isValid and error properties
     */
    static validateConfig(config) {
        const result = {
            isValid: true,
            error: null
        };

        if (!config) {
            result.isValid = false;
            result.error = 'No configuration found - window.diffConfig is not defined';
            return result;
        }

        if (!config.diffData) {
            result.isValid = false;
            result.error = 'No diff data in configuration';

            // Create empty diff data structure to prevent errors
            config.diffData = {
                old: [],
                new: [],
                chunks: []
            };

            // Log additional information to help diagnose the issue
            console.warn('ConfigUtils: Missing diffData in configuration', {
                configKeys: Object.keys(config),
                oldData: config.old ? 'present' : 'missing',
                newData: config.new ? 'present' : 'missing'
            });
        } else if (!config.diffData.chunks) {
            result.isValid = false;
            result.error = 'Missing chunks in diff data';

            // Initialize empty chunks array to prevent errors
            config.diffData.chunks = [];

            console.warn('ConfigUtils: Missing chunks in diffData', {
                diffDataKeys: Object.keys(config.diffData)
            });
        }

        return result;
    }

    /**
     * Get configuration summary for logging
     * @param {Object} config - Configuration object
     * @returns {Object} Summary of key configuration properties
     */
    static getConfigSummary(config) {
        return {
            debug: !!config?.debug,
            chunks: Array.isArray(config?.diffData?.chunks) ?
                config.diffData.chunks.length : 0
        };
    }

    /**
     * Extract file extension from filepath
     * @param {string} filepath - Path to extract extension from
     * @param {string} defaultExtension - Default extension if not found
     * @returns {string} The extracted extension or default
     */
    static getFileExtension(filepath, defaultExtension = 'php') {
        if (!filepath) return defaultExtension;
        return filepath.split('.').pop() || defaultExtension;
    }

    /**
     * Get stored theme preferences
     * @param {Object} config - Configuration with default theme settings
     * @returns {Object} Theme settings object
     */
    static getThemePreferences(config) {
        return {
            mode: localStorage.getItem('diffViewerTheme') ||
                  config?.theme?.defaultMode ||
                  'light',
            family: localStorage.getItem('diffViewerThemeFamily') ||
                    config?.theme?.defaultFamily ||
                    'atom-one'
        };
    }
}
