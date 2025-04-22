import Selectors from '../constants/Selectors';

import { Debug } from './Debug';
import { IconRegistry } from './IconRegistry';
import AlertManager from './AlertManager';

// Cache for DOM queries
const elementCache = new Map();

/**
 * Reusable DOM manipulation utilities
 */
export class DOMUtils {
    /**
     * Set up a button handler with proper cleanup
     * @param {string} buttonId - Button element ID
     * @param {Function} handlerFn - Event handler function
     * @param {string} logName - Name for logging
     * @returns {Object|null} Handler information or null if element not found
     */
    static setupButtonHandler(buttonId, handlerFn, logName = '') {
        const button = document.getElementById(buttonId);
        if (!button) {
            Debug.warn(`DOMUtils: Button ${buttonId} not found`, null, 2);
            return null;
        }

        const instanceId = Date.now();

        // Clean up if needed
        if (button._handlerId && button._handlerId !== instanceId) {
            // Clone to remove all event listeners
            const newBtn = button.cloneNode(true);
            if (button.parentNode) {
                button.parentNode.replaceChild(newBtn, button);
            }
            Debug.log(`DOMUtils: Cleaned up previous handler for ${logName || buttonId}`, null, 2);
            handlerFn(newBtn);
            newBtn._handlerId = instanceId;
            return { element: newBtn, id: instanceId };
        } else {
            button._handlerId = instanceId;
            handlerFn(button);
            return { element: button, id: instanceId };
        }
    }

    /**
     * Get element by ID with error handling
     * @param {string} id - Element ID
     * @returns {Element|null} The found element or null
     */
    static getElement(id) {
        if (!id) {
            Debug.error('DOMUtils.getElement: Empty ID provided', null, 1);
            return null;
        }

        // Check cache first
        if (elementCache.has(id)) {
            return elementCache.get(id);
        }

        // Try direct getElementById first
        let element = document.getElementById(id);

        // If not found and the id doesn't include a #, try with a selector
        if (!element) {
            try {
                if (!id.includes('#') && !id.includes('.')) {
                    // If just an ID without # prefix, try with # prefix
                    element = document.querySelector('#' + id);
                } else {
                    // Try as selector
                    element = document.querySelector(id);
                }
            } catch (e) {
                Debug.error(`DOMUtils.getElement: Error with selector: ${e.message}`, null, 1);
            }
        }

        if (!element) {
            Debug.error(`DOMUtils.getElement: Element with ID '${id}' not found`, null, 1);
        } else {
            // Cache the found element
            elementCache.set(id, element);
        }

        return element;
    }

    /**
     * Update toggle button appearance
     * @param {string} currentValue - Current toggle value
     * @param {Object} elements - Object containing button, icon, and text elements
     * @param {Object} options - Configuration options
     */
    static updateToggleButton(currentValue, elements, options) {
        const { toggleBtn, toggleIcon, toggleText } = elements;
        const {
            firstOption, secondOption,
            firstClass, secondClass,
            firstText, secondText,
            firstTooltip, secondTooltip
        } = options;

        if (!toggleBtn || !toggleIcon || !toggleText) {
            Debug.warn('DOMUtils: Missing elements for toggle button update');
            return;
        }

        Debug.log(`DOMUtils: Updating toggle button to ${currentValue}`, null, 2);

        // Set the button class based on current value
        if (currentValue === firstOption) {
            toggleIcon.className = firstClass;
            toggleText.textContent = firstText;
            toggleBtn.title = firstTooltip || firstText;
            toggleBtn.setAttribute('data-value', firstOption);
        } else if (currentValue === secondOption) {
            toggleIcon.className = secondClass;
            toggleText.textContent = secondText;
            toggleBtn.title = secondTooltip || secondText;
            toggleBtn.setAttribute('data-value', secondOption);
        } else {
            Debug.warn(`DOMUtils: Invalid toggle value: ${currentValue}`);
        }
    }

    /**
     * Show a standardized message in a container
     * @param {string} containerId - Container element ID
     * @param {string} message - Message content
     * @param {string} type - Message type: 'info', 'success', 'warning', 'danger'
     * @param {Object} options - Additional options
     * @returns {boolean} Success status
     */
    static showMessage(containerId, message, type = 'info', options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            Debug.warn(`DOMUtils: Container #${containerId} not found for message`, null, 2);
            return false;
        }

        // Default options
        const {
            _iconName = null,     // Custom icon name (preserved for backwards compatibility)
            className = 'mt-5',  // Additional CSS classes
            elementId = '',      // ID for created element
            keepExisting = false // Whether to append or replace content
        } = options;

        // Use AlertManager to create the alert
        const alertManager = AlertManager.getInstance();

        // Clear existing content unless we're keeping it
        if (!keepExisting) {
            container.innerHTML = '';
        }

        // Check if HAS_ICON exists in UTILITY and provide a fallback if it doesn't
        let iconClass = '';
        try {
            if (Selectors.UTILITY && Selectors.UTILITY.HAS_ICON) {
                iconClass = Selectors.UTILITY.HAS_ICON.name();
            } else {
                // Fallback if HAS_ICON is not defined
                iconClass = 'vdm-has-icon';
                Debug.log('DOMUtils: Using fallback icon class because Selectors.UTILITY.HAS_ICON is undefined', null, 2);
            }
        } catch (e) {
            // Fallback if any error occurs
            iconClass = 'vdm-has-icon';
            Debug.warn('DOMUtils: Error getting icon class, using fallback', e, 2);
        }

        // Create the alert with AlertManager
        const alertElement = alertManager.showAlert(message, type, {
            timeout: 0, // Don't auto-dismiss
            translate: false, // Don't translate the message
            className: `${iconClass} ${className}`
        });

        // Set ID if specified
        if (elementId) {
            alertElement.id = elementId;
        }

        // Append to container
        container.appendChild(alertElement);

        return true;
    }

    /**
     * Toggle element visibility
     * @param {string} elementId - Element ID
     * @param {boolean} visible - Whether element should be visible
     * @param {string} displayMode - Display mode when visible
     * @returns {boolean} Success status
     */
    static toggleVisibility(elementId, visible, displayMode = 'block') {
        const element = document.getElementById(elementId);
        if (!element) {
            Debug.warn(`DOMUtils: Element #${elementId} not found for visibility toggle`, null, 2);
            return false;
        }

        element.style.display = visible ? displayMode : 'none';
        return true;
    }

    /**
     * Add or remove a class from an element
     * @param {string} elementId - Element ID
     * @param {string} className - Class name to toggle
     * @param {boolean} add - Whether to add or remove the class
     * @returns {boolean} Success status
     */
    static toggleClass(elementId, className, add = true) {
        const element = document.getElementById(elementId);
        if (!element) {
            Debug.warn(`DOMUtils: Element #${elementId} not found for class toggle`, null, 2);
            return false;
        }

        if (add) {
            element.classList.add(className);
        } else {
            element.classList.remove(className);
        }

        return true;
    }

    /**
     * Create an element with specified attributes
     * @param {string} tagName - Element tag name
     * @param {string|null} id - Element ID
     * @param {string|Array} classes - CSS classes
     * @param {Object} attributes - Additional attributes
     * @returns {HTMLElement} Created element
     */
    static createElement(tagName = 'div', id = null, classes = [], attributes = {}) {
        const element = document.createElement(tagName);

        // Set ID if provided
        if (id) {
            element.id = id;
        }

        // Add classes - handle both arrays and space-separated strings
        if (classes) {
            let classList;
            if (Array.isArray(classes)) {
                classList = classes;
            } else if (typeof classes === 'string') {
                classList = classes.split(/\s+/).filter(Boolean);
            } else {
                classList = [];
            }

            if (classList.length > 0) {
                element.classList.add(...classList);
            }
        }

        // Set attributes
        Object.entries(attributes).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                element.setAttribute(key, value);
            }
        });

        return element;
    }

    /**
     * Create and append an element to a container
     * @param {string} tagName - Element tag name
     * @param {Element|string} container - Container element or ID
     * @param {Object} options - Element options
     * @returns {HTMLElement|null} Created element or null if container not found
     */
    static createAndAppendElement(tagName, container, options = {}) {
        // Get container element if ID was provided
        const containerElement = typeof container === 'string'
            ? document.getElementById(container)
            : container;

        if (!containerElement) {
            Debug.warn(`DOMUtils: Container not found for createAndAppendElement`, null, 2);
            return null;
        }

        // Extract options
        const { id = null, classes = [], attributes = {}, content = null } = options;

        // Create element
        const element = DOMUtils.createElement(tagName, id, classes, attributes);

        // Set content if provided
        if (content !== null) {
            if (typeof content === 'string') {
                element.innerHTML = content;
            } else if (content instanceof Node) {
                element.appendChild(content);
            }
        }

        // Append to container
        containerElement.appendChild(element);

        return element;
    }

    /**
     * Set element content safely
     * @param {string} elementId - Element ID
     * @param {string} content - HTML content
     * @returns {boolean} Success status
     */
    static setContent(elementId, content) {
        const element = document.getElementById(elementId);
        if (!element) {
            Debug.warn(`DOMUtils: Element #${elementId} not found for content update`, null, 2);
            return false;
        }

        element.innerHTML = content;
        return true;
    }

    /**
     * Get elements by selector
     * @param {string} selector - CSS selector
     * @param {Element|Document|string} context - Search context or ID
     * @returns {NodeList|null} Selected elements or null if context not found
     */
    static getElements(selector, context = document) {
        // Get context element if ID was provided
        const contextElement = typeof context === 'string'
            ? document.getElementById(context)
            : context;

        if (!contextElement) {
            Debug.warn(`DOMUtils: Context not found for selector: ${selector}`, null, 2);
            return null;
        }

        return contextElement.querySelectorAll(selector);
    }

    /**
     * Append HTML content to an element
     * @param {string} elementId - Element ID
     * @param {string} content - HTML content to append
     * @returns {boolean} Success status
     */
    static appendContent(elementId, content) {
        const element = document.getElementById(elementId);
        if (!element) {
            Debug.warn(`DOMUtils: Element #${elementId} not found for content append`, null, 2);
            return false;
        }

        element.insertAdjacentHTML('beforeend', content);
        return true;
    }

    /**
     * Remove an element safely
     * @param {string|Element} elementOrId - Element or element ID to remove
     * @returns {boolean} Success status
     */
    static removeElement(elementOrId) {
        const element = typeof elementOrId === 'string'
            ? document.getElementById(elementOrId)
            : element;

        if (!element?.parentNode) {
            Debug.warn(`DOMUtils: Element not found or has no parent for removal`, null, 2);
            return false;
        }

        element.parentNode.removeChild(element);
        return true;
    }

    /**
     * Setup event handlers on elements matching a selector
     * @param {string} selector - CSS selector to match elements
     * @param {string} eventType - Event type (e.g., 'click', 'change')
     * @param {function} handler - Event handler function
     * @param {Object} options - Additional options
     * @returns {number} Number of elements that received the handler
     */
    static setupEventHandlers(selector, eventType, handler, options = {}) {
        const {
            context = document,
            removeExisting = false,
            styles = null
        } = options;

        const elements = DOMUtils.getElements(selector, context);
        if (!elements) return 0;

        // Remove existing handlers if requested
        if (removeExisting) {
            elements.forEach(element => {
                element.removeEventListener(eventType, handler);
            });
        }

        // Add new handlers and apply styles
        elements.forEach(element => {
            element.addEventListener(eventType, handler);

            // Apply styles if provided
            if (styles) {
                Object.entries(styles).forEach(([property, value]) => {
                    element.style[property] = value;
                });
            }
        });

        return elements.length;
    }

    /**
     * Create an icon element
     * @param {string} iconName - Name of the icon
     * @param {Object} options - Icon options
     * @returns {Element} SVG icon element
     */
    static createIcon(iconName, options = {}) {
        return IconRegistry.createIcon(iconName, options);
    }

    /**
     * Get icon HTML string
     * @param {string} iconName - Name of the icon
     * @param {Object} options - Icon options
     * @returns {string} SVG icon HTML
     */
    static getIconHtml(iconName, options = {}) {
        return IconRegistry.getIcon(iconName, options);
    }
}
