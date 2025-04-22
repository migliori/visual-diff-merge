/**
 * Base singleton implementation to standardize pattern across components
 */
export class BaseSingleton {
    /**
     * Get the singleton instance - must be implemented by subclasses
     * @returns {BaseSingleton} The singleton instance
     */
    static getInstance() {
        throw new Error('getInstance() must be implemented by subclass');
    }

    /**
     * Check if this instance is already instantiated
     * @protected
     * @param {Object} instanceVar - The module-level instance variable
     * @returns {boolean} True if this is the first initialization
     */
    _isFirstInstance(instanceVar) {
        return !instanceVar;
    }
}
