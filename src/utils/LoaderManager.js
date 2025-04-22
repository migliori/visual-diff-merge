import Selectors from '../constants/Selectors';

import { Debug } from './Debug';
import { BaseSingleton } from './BaseSingleton';
import { TranslationManager } from './TranslationManager';

/**
 * LoaderManager - Centralized utility for managing loading indicators
 *
 * This singleton class provides methods to display and hide loading indicators
 * throughout the application in a consistent manner. It supports different styles
 * of loaders including fullscreen, inline, and element-specific indicators.
 */

// Module-level singleton instance
let instance = null;

/**
 * LoaderManager class
 *
 * Provides methods to display and hide loading indicators throughout the application
 */
export class LoaderManager extends BaseSingleton {
    /**
     * Initialize the LoaderManager
     */
    initialize() {
        // If already initialized, just return
        if (this.initialized) {
            return;
        }

        this.activeLoaders = new Map();
        this.loaderIdCounter = 0;
        this.isMainLoaderActive = false; // Track if main loader is active
        this.mainLoaderId = null; // Store the ID of the main loader for reference
        this.recentlyRemovedLoaders = new Set(); // Track recently removed loaders to prevent errors

        // Track loader operations for debugging
        this.operationLog = [];
        this.maxLogEntries = 20;

        // Set flag to remember log level in debug mode
        this.verboseLogging = Debug.isInitialized ? Debug.logLevel > 2 : false;

        // Mark as initialized
        this.initialized = true;
    }

    /**
     * Get the singleton instance
     * @returns {LoaderManager} Instance
     */
    static getInstance() {
        if (!instance) {
            instance = new LoaderManager();
            instance.initialize();
        }
        return instance;
    }

    /**
     * Log an operation for debugging
     * @private
     */
    _logOperation(operation, details) {
        // Keep a short log history for debugging
        if (this.operationLog.length >= this.maxLogEntries) {
            this.operationLog.shift(); // Remove oldest entry
        }

        this.operationLog.push({
            timestamp: new Date().toISOString(),
            operation,
            details
        });
    }

    /**
     * Create a loader element with the given message
     *
     * @param {string} message - Message to display
     * @param {Object} options - Options for the loader
     * @returns {HTMLElement} The loader element
     * @private
     */
    _createLoaderElement(message, options = {}) {
        // Use an early translation if TranslationManager is available
        if (message && typeof message === 'string' && message.startsWith('$') && TranslationManager.getInstance().isInitialized()) {
            const translationKey = message.substring(1);
            const translatedMessage = TranslationManager.getInstance().get(translationKey);
            if (translatedMessage) {
                message = translatedMessage;
            }
        }

        const loader = document.createElement('div');
        loader.className = 'vdm-loader';

        if (options.fullscreen) {
            loader.classList.add('vdm-loader--fullscreen');
        }

        if (options.inline) {
            loader.classList.add('vdm-loader--inline');
        }

        if (options.small) {
            loader.classList.add('vdm-loader--small');
        }

        if (options.container) {
            loader.classList.add('vdm-loader--container');
        }

        if (options.className) {
            loader.classList.add(options.className);
        }

        if (options.zIndex) {
            loader.style.zIndex = options.zIndex;
        }

        // Create spinner
        const spinner = document.createElement('div');
        spinner.className = 'vdm-loader__spinner';
        loader.appendChild(spinner);

        // Add message if provided
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'vdm-loader__message';
            messageElement.textContent = message;
            loader.appendChild(messageElement);
        }

        return loader;
    }

    /**
     * Show a loading indicator
     *
     * @param {string} message - Message to display with the loader
     * @param {Object} options - Options for the loader
     * @param {boolean} options.fullscreen - Whether to show a fullscreen loader
     * @param {boolean} options.inline - Whether to show an inline loader
     * @param {boolean} options.small - Whether to show a small loader
     * @param {string} options.className - Additional CSS class to add to the loader
     * @param {HTMLElement} options.target - Target element to add the loader to
     * @param {number} options.zIndex - Z-index for the loader
     * @returns {string} ID of the loader (use this to hide the specific loader)
     */
    showLoader(message = 'Loading...', options = {}) {
        // If main loader is active and we're showing a fullscreen loader,
        // reuse the main loader with updated message
        if (this.isMainLoaderActive && this.mainLoaderId && options.fullscreen) {
            Debug.log('LoaderManager: Reusing main loader for fullscreen request', { message }, 3);
            this.updateLoaderMessage(this.mainLoaderId, message);
            return this.mainLoaderId;
        }

        Debug.log('LoaderManager: Showing loader', { message, options }, 3);

        const loaderId = `loader-${++this.loaderIdCounter}`;
        const loaderElement = this._createLoaderElement(message, options);
        loaderElement.setAttribute('data-loader-id', loaderId);

        // Add loader to the correct target element
        if (options.target && options.target instanceof HTMLElement) {
            // If the target has position: static, change to relative for proper positioning
            const targetPosition = window.getComputedStyle(options.target).getPropertyValue('position');
            if (targetPosition === 'static') {
                options.target.style.position = 'relative';
            }
            options.target.appendChild(loaderElement);
        } else {
            document.body.appendChild(loaderElement);
        }

        // Store reference to the loader
        this.activeLoaders.set(loaderId, {
            element: loaderElement,
            target: options.target || document.body,
            fullscreen: !!options.fullscreen,
            timestamp: Date.now()
        });

        // Remove from recently removed list if it's there (unlikely but possible with ID reuse)
        this.recentlyRemovedLoaders.delete(loaderId);

        this._logOperation('show', { id: loaderId, message, type: 'regular' });

        // Add showing class to trigger CSS transitions if any
        setTimeout(() => {
            if (loaderElement.parentNode) {
                loaderElement.classList.add('vdm-loader--showing');
            }
        }, 10);

        return loaderId;
    }

    /**
     * Show the main application loader and hide all other loaders
     *
     * @param {string} message - Optional message to display
     * @param {Object} options - Additional options for the loader
     * @returns {string} ID of the loader
     */
    showMainLoader(message = 'Loading...', options = {}) {
        Debug.log('LoaderManager: Showing main loader', { message }, 2);

        // If main loader is already active, just update the message and return the existing ID
        if (this.isMainLoaderActive && this.mainLoaderId && this.activeLoaders.has(this.mainLoaderId)) {
            Debug.log('LoaderManager: Main loader already active, updating message', {
                currentId: this.mainLoaderId,
                message
            }, 2);

            this.updateLoaderMessage(this.mainLoaderId, message);
            return this.mainLoaderId;
        }

        // Hide all other loaders when showing the main one
        this._hideAllInlineLoaders();

        // Get the main loader element if it exists in the DOM
        const mainLoaderElement = document.getElementById(Selectors.LOADER.MAIN.name());

        if (mainLoaderElement) {
            // If the element already exists in the DOM, just show it
            mainLoaderElement.style.display = 'flex';
            mainLoaderElement.classList.add(Selectors.LOADER.ACTIVE.name());

            // If it has a message element, update it
            const messageElement = mainLoaderElement.querySelector('.vdm-loader__message');
            if (messageElement) {
                messageElement.textContent = message;
            } else if (message) {
                // Create message element if it doesn't exist but message is provided
                const newMessageElement = document.createElement('div');
                newMessageElement.className = 'vdm-loader__message';
                newMessageElement.textContent = message;
                mainLoaderElement.appendChild(newMessageElement);
            }

            // Generate an ID for this loader instance
            const loaderId = `main-loader-${++this.loaderIdCounter}`;

            // Store reference
            this.activeLoaders.set(loaderId, {
                element: mainLoaderElement,
                target: document.body,
                isMainLoader: true,
                timestamp: Date.now()
            });

            // Update tracking
            this.isMainLoaderActive = true;
            this.mainLoaderId = loaderId;

            // Remove from recently removed list if it's there
            this.recentlyRemovedLoaders.delete(loaderId);

            this._logOperation('show', { id: loaderId, message, type: 'main-existing' });

            return loaderId;
        } else {
            // If the element doesn't exist, create it using showLoader
            const loaderId = this.showLoader(message, {
                fullscreen: true,
                className: Selectors.LOADER.MAIN.name(),
                zIndex: 9999,
                ...options
            });

            // Mark this as the main loader
            const loaderInfo = this.activeLoaders.get(loaderId);
            if (loaderInfo) {
                loaderInfo.isMainLoader = true;
                loaderInfo.element.id = Selectors.LOADER.MAIN.name();
            }

            // Update tracking
            this.isMainLoaderActive = true;
            this.mainLoaderId = loaderId;

            this._logOperation('show', { id: loaderId, message, type: 'main-new' });

            return loaderId;
        }
    }

    /**
     * Show a loading indicator early in the page lifecycle before DiffViewer initialization
     * This is specifically for components that need to show loaders before the main app initializes
     *
     * @param {string} message - Message to display with the loader
     * @param {Object} options - Options for the loader
     * @returns {string} ID of the loader
     */
    showEarlyLoader(message = 'Loading...', options = {}) {
        // If debug is already initialized, use it, otherwise don't log
        if (Debug.isInitialized) {
            Debug.log('LoaderManager: Showing early loader', { message }, 2);
        }

        // Create a loader that will become the main loader
        const loaderId = this.showLoader(message, {
            fullscreen: true,
            className: Selectors.LOADER.MAIN.name(),
            zIndex: 9999,
            ...options
        });

        // Mark this as the main loader
        const loaderInfo = this.activeLoaders.get(loaderId);
        if (loaderInfo) {
            loaderInfo.isMainLoader = true;
            loaderInfo.isEarlyLoader = true; // Mark as an early loader
            loaderInfo.element.id = Selectors.LOADER.MAIN.name();
        }

        // Update tracking
        this.isMainLoaderActive = true;
        this.mainLoaderId = loaderId;

        this._logOperation('show', { id: loaderId, message, type: 'early-loader' });

        return loaderId;
    }

    /**
     * Convert an early loader to the main loader to ensure continuity
     * Call this method from enableDiffViewer to take over an existing early loader
     *
     * @param {string} message - Optional new message to display
     * @returns {string} ID of the main loader
     */
    adoptEarlyLoader(message = null) {
        // If there's no active main loader, create one
        if (!this.isMainLoaderActive || !this.mainLoaderId) {
            if (Debug.isInitialized) {
                Debug.log('LoaderManager: No early loader to adopt, creating new main loader', null, 2);
            }
            return this.showMainLoader(message);
        }

        // Update the message if provided
        if (message) {
            this.updateLoaderMessage(this.mainLoaderId, message);
        }

        if (Debug.isInitialized) {
            Debug.log('LoaderManager: Adopted early loader as main loader', { id: this.mainLoaderId }, 2);
        }

        return this.mainLoaderId;
    }

    /**
     * Hide the main loader
     *
     * @param {string} loaderId - Optional ID of the loader to hide
     * @returns {boolean} Success status
     */
    hideMainLoader(loaderId = null) {
        Debug.log('LoaderManager: Hiding main loader', { loaderId }, 2);

        // Special handling: If this was recently removed, just return success
        if (loaderId && this.recentlyRemovedLoaders.has(loaderId)) {
            Debug.log('LoaderManager: Main loader was recently removed', { loaderId }, 2);
            return true;
        }

        // If main loader isn't active, silently succeed
        if (!this.isMainLoaderActive) {
            Debug.log('LoaderManager: Main loader not active, nothing to hide', null, 2);
            return true;
        }

        // If loaderId is provided but doesn't match the main loader ID, verify it
        if (loaderId && loaderId !== this.mainLoaderId) {
            const loaderInfo = this.activeLoaders.get(loaderId);
            // If it's not found or not a main loader, use the stored main loader ID
            if (!loaderInfo?.isMainLoader) {
                Debug.log('LoaderManager: Using stored main loader ID',
                    { providedId: loaderId, actualMainId: this.mainLoaderId }, 2);
                loaderId = this.mainLoaderId;
            }
        } else if (!loaderId) {
            // If no ID provided, use the stored main loader ID
            loaderId = this.mainLoaderId;
        }

        // If we couldn't determine a loader ID or it doesn't exist anymore,
        // try to clean up by element ID
        if (!loaderId || !this.activeLoaders.has(loaderId)) {
            const mainLoaderElement = document.getElementById(Selectors.LOADER.MAIN.name());
            if (mainLoaderElement) {
                mainLoaderElement.style.display = 'none';
                if (mainLoaderElement.parentNode) {
                    mainLoaderElement.parentNode.removeChild(mainLoaderElement);
                }
                Debug.log('LoaderManager: Removed main loader by element ID', null, 2);
            }

            // Reset state
            this.isMainLoaderActive = false;
            this.mainLoaderId = null;
            return true;
        }

        // Now hide the specific loader
        const success = this._hideSpecificLoader(loaderId);

        if (success) {
            // Remember we removed this loader so we don't try to hide it again
            this.recentlyRemovedLoaders.add(loaderId);

            // Update state
            this.isMainLoaderActive = false;
            this.mainLoaderId = null;

            this._logOperation('hide', { id: loaderId, type: 'main' });
        }

        return success;
    }

    /**
     * Hide all inline loaders (internal method)
     * @private
     */
    _hideAllInlineLoaders() {
        Debug.log('LoaderManager: Hiding all inline loaders', null, 3);

        // Find all inline loaders
        const inlineLoaderIds = Array.from(this.activeLoaders.entries())
            .filter(([_id, info]) => !info.isMainLoader && !info.fullscreen)
            .map(([id]) => id);

        // Hide each one
        inlineLoaderIds.forEach(id => {
            this._hideSpecificLoader(id);

            // Remember we removed this loader
            this.recentlyRemovedLoaders.add(id);

            this._logOperation('hide', { id, type: 'inline-batch' });
        });

        // Also look for any inline loaders in the DOM that might not be tracked
        document.querySelectorAll('.vdm-loader--inline').forEach(loader => {
            this._removeLoaderElement(loader);
            this._logOperation('hide', { element: 'untracked-inline', type: 'dom-query' });
        });
    }

    /**
     * Hide a specific loader by ID
     *
     * @param {string} loaderId - ID of the loader to hide
     * @returns {boolean} Success status
     */
    hideLoader(loaderId) {
        // If no loaderId specified, hide all loaders
        if (!loaderId) {
            Debug.log('LoaderManager: Hiding all loaders', null, 3);
            const loaderIds = Array.from(this.activeLoaders.keys());
            let success = true;

            loaderIds.forEach(id => {
                if (!this._hideSpecificLoader(id)) {
                    success = false;
                }

                // Remember we removed this loader
                this.recentlyRemovedLoaders.add(id);

                this._logOperation('hide', { id, type: 'all-batch' });
            });

            // Reset main loader tracking
            this.isMainLoaderActive = false;
            this.mainLoaderId = null;

            return success;
        }

        // Special handling: If this was recently removed, just return success
        if (this.recentlyRemovedLoaders.has(loaderId)) {
            Debug.log('LoaderManager: Loader was recently removed', { loaderId }, 2);
            return true;
        }

        // Case: this is the main loader
        if (loaderId === this.mainLoaderId) {
            return this.hideMainLoader(loaderId);
        }

        // Hide a specific loader
        Debug.log('LoaderManager: Hiding loader', { loaderId }, 3);
        const success = this._hideSpecificLoader(loaderId);

        if (success) {
            // Remember we removed this loader
            this.recentlyRemovedLoaders.add(loaderId);

            this._logOperation('hide', { id: loaderId, type: 'specific' });
        }

        return success;
    }

    /**
     * Internal method to hide a specific loader
     *
     * @param {string} loaderId - ID of the loader to hide
     * @returns {boolean} Success status
     * @private
     */
    _hideSpecificLoader(loaderId) {
        // Special handling: If this was recently removed, just return success
        if (this.recentlyRemovedLoaders.has(loaderId)) {
            Debug.log('LoaderManager: Loader was recently removed (in _hideSpecificLoader)', { loaderId }, 3);
            return true;
        }

        const loader = this.activeLoaders.get(loaderId);

        if (!loader) {
            Debug.log('LoaderManager: No loader found to hide', { loaderId }, 2);
            return false;
        }

        // Update main loader status if this was a main loader
        if (loader.isMainLoader) {
            this.isMainLoaderActive = false;
            this.mainLoaderId = null;
        }

        // Check if the element still exists in DOM
        if (!loader.element?.parentNode) {
            // Element is already removed, just clean up our tracking
            this.activeLoaders.delete(loaderId);
            Debug.log('LoaderManager: Loader element was already removed from DOM', { loaderId }, 3);
            return true;
        }

        // Remove the loader element with transition
        this._removeLoaderElement(loader.element);
        this.activeLoaders.delete(loaderId);

        // Remember we removed this loader
        this.recentlyRemovedLoaders.add(loaderId);

        return true;
    }

    /**
     * Remove a loader element with transition
     *
     * @param {HTMLElement} loaderElement - Loader element to remove
     * @private
     */
    _removeLoaderElement(loaderElement) {
        // First remove the showing class to trigger CSS transitions if any
        loaderElement.classList.remove('vdm-loader--showing');

        // Wait for transition to complete before removing the element
        setTimeout(() => {
            if (loaderElement.parentNode) {
                loaderElement.parentNode.removeChild(loaderElement);
            }
        }, 300); // Match this timing with CSS transition duration
    }

    /**
     * Show a loader in a specific container (useful for buttons, etc.)
     *
     * @param {HTMLElement} container - Container element to add the loader to
     * @param {string} message - Optional message to display
     * @param {Object} options - Options for the loader
     * @returns {string} ID of the loader
     */
    showLoaderInContainer(container, message = '', options = {}) {
        const loaderId = this.showLoader(message, {
            target: container,
            container: true,
            small: true,
            ...options
        });

        this._logOperation('show', { id: loaderId, message, type: 'container' });

        return loaderId;
    }

    /**
     * Update an existing loader's message
     *
     * @param {string} loaderId - ID of the loader to update
     * @param {string} message - New message to display
     * @returns {boolean} Success status
     */
    updateLoaderMessage(loaderId, message) {
        // Don't log anything when recently removed IDs are encountered
        // This eliminates the spam in the console for removed loaders
        if (loaderId && this.recentlyRemovedLoaders.has(loaderId)) {
            return true; // Silently succeed
        }

        // If this is a falsy ID and main loader is active, use the main loader
        if (!loaderId && this.isMainLoaderActive && this.mainLoaderId) {
            loaderId = this.mainLoaderId;
            Debug.log('LoaderManager: Using main loader ID for message update', { mainLoaderId: loaderId }, 3);
        }

        const loader = this.activeLoaders.get(loaderId);

        if (!loader) {
            // Only log at level 2 if we're in verbose mode (reduces noise)
            if (this.verboseLogging) {
                Debug.log('LoaderManager: No loader found to update message', { loaderId }, 2);
            }
            return false;
        }

        // Check if element still exists in DOM
        if (!loader.element?.parentNode) {
            Debug.log('LoaderManager: Loader element was removed from DOM', { loaderId }, 3);
            this.activeLoaders.delete(loaderId);
            this.recentlyRemovedLoaders.add(loaderId);
            return false;
        }

        const messageElement = loader.element.querySelector('.vdm-loader__message');

        if (messageElement) {
            messageElement.textContent = message;
            this._logOperation('update', { id: loaderId, message, type: 'existing-element' });
            return true;
        } else if (message) {
            // Create message element if it doesn't exist but a message is provided
            const newMessageElement = document.createElement('div');
            newMessageElement.className = 'vdm-loader__message';
            newMessageElement.textContent = message;
            loader.element.appendChild(newMessageElement);
            this._logOperation('update', { id: loaderId, message, type: 'new-element' });
            return true;
        }

        return false;
    }

    /**
     * Check if a loader with the given ID exists
     * @param {string} loaderId - Loader ID to check
     * @returns {boolean} - Whether the loader exists
     */
    hasLoader(loaderId) {
        return this.activeLoaders.has(loaderId) &&
               !this.recentlyRemovedLoaders.has(loaderId);
    }

    /**
     * Clean up old entries in the recentlyRemovedLoaders set to prevent memory leaks
     * Called periodically by the system
     */
    _cleanupOldRemovedLoaders() {
        // If the set gets too large, clean up old entries
        if (this.recentlyRemovedLoaders.size > 20) {
            // Just reset the whole set for simplicity
            this.recentlyRemovedLoaders.clear();
        }
    }

    /**
     * Get debug information about a specific loader
     * @param {string} loaderId - Loader ID to check
     * @returns {Object|null} Loader information
     */
    getLoaderInfo(loaderId) {
        if (!loaderId) return null;

        const loader = this.activeLoaders.get(loaderId);
        if (!loader) {
            return {
                exists: false,
                wasRemoved: this.recentlyRemovedLoaders.has(loaderId)
            };
        }

        return {
            exists: true,
            isMain: !!loader.isMainLoader,
            fullscreen: !!loader.fullscreen,
            message: loader.element.querySelector('.vdm-loader__message')?.textContent,
            age: Date.now() - (loader.timestamp || 0), // milliseconds since creation
            inDom: !!loader.element.parentNode
        };
    }

    /**
     * Debug method to get active loader information
     * @returns {Object} Information about current loaders
     */
    getLoaderStatus() {
        // Clean up the recently removed list to keep it tidy
        this._cleanupOldRemovedLoaders();

        return {
            activeCount: this.activeLoaders.size,
            recentlyRemovedCount: this.recentlyRemovedLoaders.size,
            mainLoaderActive: this.isMainLoaderActive,
            mainLoaderId: this.mainLoaderId,
            operations: [...this.operationLog],
            loaders: Array.from(this.activeLoaders.entries()).map(([id, info]) => ({
                id,
                isMain: !!info.isMainLoader,
                fullscreen: !!info.fullscreen,
                message: info.element.querySelector('.vdm-loader__message')?.textContent,
                age: Date.now() - (info.timestamp || 0), // milliseconds since creation
                inDom: !!info.element.parentNode
            }))
        };
    }
}

export default LoaderManager;
