import Selectors from '../constants/Selectors';

import { BaseSingleton } from './BaseSingleton';
import { Debug } from './Debug';
import { TranslationManager } from './TranslationManager';

/**
 * AlertManager - Centralized utility for managing alert messages
 *
 * This singleton class provides methods to display and hide alert messages
 * throughout the application in a consistent manner. It supports different types
 * of alerts including info, success, warning, and danger.
 */

// Module-level singleton instance
let instance = null;

/**
 * AlertManager class
 *
 * Provides methods to display and hide alert messages throughout the application
 */
export class AlertManager extends BaseSingleton {
    /**
     * Initialize the AlertManager
     */
    initialize() {
        // If already initialized, just return
        if (this.initialized) {
            return;
        }

        this.containerId = 'vdm-alert-container';
        this.activeAlert = null;
        this.timeoutId = null;

        // Ensure the alert container exists and store it in this.container
        this.container = this._ensureContainer();

        // Mark as initialized
        this.initialized = true;

        Debug.log('AlertManager: Initialized', null, 2);
    }

    /**
     * Get the singleton instance
     * @returns {AlertManager} Instance
     */
    static getInstance() {
        if (!instance) {
            instance = new AlertManager();
            instance.initialize();
        }
        return instance;
    }

    /**
     * Ensure the alert container exists in the DOM
     * @private
     */
    _ensureContainer() {
        let container = document.getElementById(this.containerId);

        if (!container) {
            container = document.createElement('div');
            container.id = this.containerId;
            container.className = 'vdm-alert-container';
            container.style.position = 'fixed';
            container.style.top = '20px';
            container.style.left = '50%';
            container.style.transform = 'translateX(-50%)';
            container.style.zIndex = '9999';
            container.style.width = 'auto';
            container.style.maxWidth = '90%';

            document.body.appendChild(container);
            Debug.log('AlertManager: Created alert container', null, 2);
        }

        return container;
    }

    /**
     * Create and show an alert
     * @param {string} message - The alert message
     * @param {string} type - The alert type: 'success', 'info', 'warning', 'error'
     * @param {Object} options - Alert options
     * @returns {HTMLElement} - The alert element
     */
    showAlert(message, type, options = {}) {
        Debug.log('AlertManager.showAlert called with type', type, 2);
        Debug.log('AlertManager.showAlert message', message, 3);

        // Default options
        const defaultOptions = {
            timeout: 5000,      // Auto-dismiss after 5 seconds (0 = no auto-dismiss)
            dismissable: true,  // Show close button
            translate: true,    // Translate message if TranslationManager is available
            className: '',      // Additional CSS classes
            container: null,    // Container element (defaults to this.container)
            targetElement: null, // Target element to place alert relative to
            placement: 'before' // Placement relative to targetElement ('before' or 'after')
        };

        const mergedOptions = { ...defaultOptions, ...options };

        // Only use the container if we're not placing relative to a target element
        const useContainer = !mergedOptions.targetElement && (mergedOptions.container || this.container);

        Debug.log('AlertManager placement options', {
            hasTargetElement: !!mergedOptions.targetElement,
            placement: mergedOptions.placement,
            useContainer: !!useContainer
        }, 3);

        // Create alert element
        const alertElement = document.createElement('div');

        // Get the base alert class from Selectors if available
        const baseAlertClass = Selectors.UTILITY.ALERT ?
            Selectors.UTILITY.ALERT.toString().substring(1) : // Remove leading '.'
            'vdm-alert';

        // Start with base class
        let alertClass = baseAlertClass;

        // Type-specific class - use the proper format with double hyphens
        if (type) {
            // Use proper format from Selectors if available
            const typeClass = type === 'info' && Selectors.UTILITY.ALERT_INFO ?
                Selectors.UTILITY.ALERT_INFO.toString().substring(1) : // Remove leading '.'
                `${baseAlertClass}--${type}`; // Use the proper double-hyphen format

            alertClass += ` ${typeClass}`;
        }

        // Add any custom classes
        if (mergedOptions.className) {
            alertClass += ` ${mergedOptions.className}`;
        }

        alertElement.className = alertClass;
        Debug.log('Alert classnames', alertElement.className, 3);
        Debug.log('Alert selector values', {
            selectorBase: Selectors.UTILITY.ALERT ? Selectors.UTILITY.ALERT.toString() : 'vdm-alert',
            selectorType: type ? `${baseAlertClass}--${type}` : 'none'
        }, 3);

        // Translate message if needed
        let finalMessage = message;
        if (mergedOptions.translate && typeof TranslationManager !== 'undefined') {
            const translationManager = TranslationManager.getInstance();
            if (translationManager && typeof translationManager.get === 'function') {
                finalMessage = translationManager.get(message, message);
            }
        }

        // Set content
        alertElement.innerHTML = finalMessage;

        // Add close button if dismissable
        if (mergedOptions.dismissable) {
            const closeButton = document.createElement('button');
            // Fix the close button class to match the CSS definition
            closeButton.className = 'vdm-alert__close';
            closeButton.innerHTML = '&times;';
            closeButton.setAttribute('aria-label', 'Close');
            closeButton.setAttribute('type', 'button');
            alertElement.appendChild(closeButton);

            // Add click event for close button
            closeButton.addEventListener('click', () => this.hideAlert(alertElement));
            Debug.log('Close button', closeButton ? 'found' : 'not found', 3);
        }

        // Add to container or place relative to target element
        if (mergedOptions.targetElement) {
            Debug.log('AlertManager: Placing alert relative to target element', {
                target: mergedOptions.targetElement,
                placement: mergedOptions.placement
            }, 3);

            if (mergedOptions.placement === 'before') {
                // Insert before the target element
                mergedOptions.targetElement.parentNode.insertBefore(alertElement, mergedOptions.targetElement);
            } else if (mergedOptions.placement === 'after') {
                // Insert after the target element
                if (mergedOptions.targetElement.nextSibling) {
                    mergedOptions.targetElement.parentNode.insertBefore(alertElement, mergedOptions.targetElement.nextSibling);
                } else {
                    mergedOptions.targetElement.parentNode.appendChild(alertElement);
                }
            }
        } else if (useContainer) {
            // Regular container append if no target element is specified
            useContainer.appendChild(alertElement);
            Debug.log('Alert appended to container', null, 3);
        } else {
            // Fallback to body if no container and no target element
            document.body.appendChild(alertElement);
            Debug.log('Alert appended to body', null, 3);
        }

        // Store reference to the active alert
        this.activeAlert = alertElement;

        // Set up auto-dismiss
        if (mergedOptions.timeout > 0) {
            this.timeoutId = setTimeout(() => {
                this.hideAlert(alertElement);
            }, mergedOptions.timeout);
        }

        Debug.log('Returning alert element', alertElement, 3);
        return alertElement;
    }

    /**
     * Hide the current alert if one exists
     * @param {HTMLElement} alertElement - Optional specific alert element to hide
     */
    hideAlert(alertElement = null) {
        // Clear any existing timeout
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }

        // If a specific alert element is provided, remove it
        if (alertElement?.parentNode) {
            alertElement.parentNode.removeChild(alertElement);
            Debug.log('AlertManager: Hiding specific alert', null, 3);

            // If this was the active alert, clear the reference
            if (this.activeAlert === alertElement) {
                this.activeAlert = null;
            }
            return;
        }

        // Otherwise, remove the active alert if it exists
        if (this.activeAlert?.parentNode) {
            this.activeAlert.parentNode.removeChild(this.activeAlert);
            this.activeAlert = null;
            Debug.log('AlertManager: Hiding active alert', null, 3);
        }
    }

    /**
     * Show an info alert
     *
     * @param {string} message - Message to display
     * @param {Object} options - Alert options
     * @returns {HTMLElement} The alert element
     */
    showInfo(message, options = {}) {
        return this.showAlert(message, 'info', options);
    }

    /**
     * Show a success alert
     *
     * @param {string} message - Message to display
     * @param {Object} options - Alert options
     * @returns {HTMLElement} The alert element
     */
    showSuccess(message, options = {}) {
        return this.showAlert(message, 'success', options);
    }

    /**
     * Show a warning alert
     *
     * @param {string} message - Message to display
     * @param {Object} options - Alert options
     * @returns {HTMLElement} The alert element
     */
    showWarning(message, options = {}) {
        return this.showAlert(message, 'warning', options);
    }

    /**
     * Show a danger/error alert
     *
     * @param {string} message - Message to display
     * @param {Object} options - Alert options
     * @returns {HTMLElement} The alert element
     */
    showError(message, options = {}) {
        return this.showAlert(message, 'danger', options);
    }
}

export default AlertManager;
