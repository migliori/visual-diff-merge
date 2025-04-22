import { Debug } from './Debug';
import { DOMUtils } from './DOMUtils';

/**
 * Utility functions for the diff viewer
 */
export class ViewerUtils {
    /**
     * Calculate container dimensions for layout planning
     * @param {HTMLElement} container - The container element
     * @returns {Object} Container dimensions
     */
    static getContainerDimensions(container) {
        if (!container) {
            Debug.warn('ViewerUtils: Container not available for dimension calculation', null, 2);
            return { width: 0, height: 0 };
        }

        const rect = container.getBoundingClientRect();
        return {
            width: rect.width,
            height: rect.height,
            top: rect.top,
            left: rect.left,
            aspectRatio: rect.width / rect.height
        };
    }

    /**
     * Create a container element with specified classes
     * @param {string} id - Element ID
     * @param {string|Array} classes - CSS classes to add
     * @param {Object} attributes - Additional attributes to set
     * @returns {HTMLElement} Created element
     */
    static createContainer(id, classes = [], attributes = {}) {
        // Use DOMUtils.createElement instead of direct DOM manipulation
        return DOMUtils.createElement('div', id, classes, attributes);
    }

    /**
     * Determine best view mode based on container dimensions
     * @param {Object} dimensions - Container dimensions
     * @returns {string} View mode ('side-by-side' or 'unified')
     */
    static determineViewMode(dimensions) {
        // For small screens, use unified view
        if (dimensions.width < 768) {
            return 'unified';
        }

        // For wider screens, use side-by-side
        return 'side-by-side';
    }
}
