/**
 * Debug utility for the diff viewer
 * Provides centralized logging with configuration options
 */

/* eslint-disable no-console */
// Disable console warnings for this file only since this is the official logging utility

class DebugUtility {
    constructor() {
        this.enabled = false;
        this.logHistory = [];
        this.maxLogHistory = 100;
        this.prefix = '[DiffViewer]';
        this.logLevel = 1; // Default to only high-level logs
    }

    /**
     * Initialize debug settings
     * @param {boolean} enabled - Enable debug output
     * @param {string} prefix - Prefix for all log messages
     * @param {number} logLevel - Log level (1=high-level, 2=detailed, 3=verbose)
     */
    initialize (enabled = false, prefix = '[DiffViewer]', logLevel = 1) {
        // Prevent reinitialization with weaker settings if already properly configured
        if (this.enabled && this.logLevel > 1 && !enabled) {
            console.warn(`${this.prefix} Preventing debug reinitialization with weaker settings`, {
                current: { enabled: this.enabled, level: this.logLevel },
                attempted: { enabled, level: logLevel }
            });
            return;
        }

        this.enabled = enabled;
        this.prefix = prefix;
        this.logLevel = logLevel; // Don't tie logLevel to enabled state

        console.log('Debug initialized', { enabled: this.enabled, level: this.logLevel });
        this.log('Debug initialized', { enabled: this.enabled, level: this.logLevel });
    }

    /**
     * Check if a message should be logged at the given level
     * @param {number} level - The log level of the message
     * @returns {boolean} - Whether the message should be logged
     */
    shouldLog(level = 1) {
        // Use instance state as primary source of truth
        // Only fall back to window.diffConfig if not explicitly initialized
        const debugEnabled = this.enabled || (this.enabled === false && window.diffConfig?.debug);
        return debugEnabled && level <= this.logLevel;
    }

    /**
     * Log an informational message
     * @param {string} message - The primary message
     * @param {any} data - Additional data to log
     * @param {number} level - Log level (1=high-level, 2=detailed, 3=verbose)
     */
    log(message, data = null, level = 1) {
        if (!this.shouldLog(level)) return;

        if (data !== null) {
            console.log(`${this.prefix} ${message}`, data);
            this._addToHistory('log', [message, data], level);
        } else {
            console.log(`${this.prefix} ${message}`);
            this._addToHistory('log', [message], level);
        }
    }

    /**
     * Log a warning message (always shown regardless of debug setting)
     * @param {string} message - The primary message
     * @param {any} data - Additional data to log
     * @param {number} level - Log level (always shown, but stored with level)
     */
    warn (message, data = null, level = 1) {
        // Warnings are always shown regardless of debug setting
        if (data !== null) {
            console.warn(`${this.prefix} ${message}`, data);
            this._addToHistory('warn', [message, data], level);
        } else {
            console.warn(`${this.prefix} ${message}`);
            this._addToHistory('warn', [message], level);
        }
    }

    /**
     * Log an error message (always shown regardless of debug setting)
     * @param {string} message - The primary message
     * @param {any} data - Additional data to log
     * @param {number} level - Log level (always shown, but stored with level)
     */
    error(message, data = null, level = 1) {
        // Errors are always shown regardless of debug setting
        if (data !== null) {
            console.error(`${this.prefix} ${message}`, data);
            this._addToHistory('error', [message, data], level);
        } else {
            console.error(`${this.prefix} ${message}`);
            this._addToHistory('error', [message], level);
        }
    }

    /**
     * Get debug log history
     * @param {number} maxLevel - Maximum level to include (1=high-level only, 3=all)
     * @returns {Array} Log history filtered by level
     */
    getLogHistory(maxLevel = this.logLevel) {
        if (maxLevel >= this.logLevel) {
            return [...this.logHistory];
        }
        return this.logHistory.filter(entry => entry.level <= maxLevel);
    }

    /**
     * Clear debug log history
     */
    clearLogHistory() {
        this.logHistory = [];
        this.log('Log history cleared');
    }

    /**
     * Add entry to log history
     * @private
     * @param {string} type - Log type (log, warn, error)
     * @param {Array} args - Message arguments
     * @param {number} level - Log level
     */
    _addToHistory(type, args, level) {
        this.logHistory.push({
            timestamp: new Date(),
            type,
            message: args,
            level
        });

        // Prevent excessive memory usage
        if (this.logHistory.length > this.maxLogHistory) {
            this.logHistory.shift();
        }
    }
}

// Create singleton instance
const Debug = new DebugUtility();

// Export the singleton
export { Debug };
