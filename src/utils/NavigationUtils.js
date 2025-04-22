import Selectors from '../constants/Selectors';

import { Debug } from './Debug';

/**
 * Navigation-related utility functions
 */
export class NavigationUtils {
    /**
     * Scroll element into view with smooth behavior
     * @param {Element} element - Element to scroll to
     * @param {Element} container - Scrollable container
     * @returns {boolean} Success status
     */
    static scrollElementIntoView(element, container) {
        if (!element || !container) {
            Debug.warn('NavigationUtils: Missing element or container for scrolling', null, 2);
            return false;
        }

        // Calculate the target scroll position (center element in container)
        const elementTop = element.offsetTop;
        const containerHeight = container.clientHeight;
        const scrollTarget = elementTop - (containerHeight / 2) + (element.offsetHeight / 2);

        // Apply scroll with smooth behavior
        container.scrollTo({
            top: scrollTarget,
            behavior: 'smooth'
        });

        return true;
    }

    /**
     * Add highlight effect to an element
     * @param {Element} element - Element to highlight
     * @param {number} duration - Duration in ms
     */
    static addHighlightEffect(element, duration = 2000) {
        if (!element) return;

        element.classList.add(Selectors.NAVIGATION.HIGHLIGHT.name());
        setTimeout(() => {
            element.classList.remove(Selectors.NAVIGATION.HIGHLIGHT.name());
        }, duration);
    }

    /**
     * Make an element draggable
     * @param {Element} element - Element to make draggable
     * @param {Object} options - Configuration options
     * @returns {Object} Clean-up functions
     */
    static makeDraggable(element, options = {}) {
        if (!element) return;

        const defaults = {
            handleSelector: null, // Selector for drag handle (null = entire element)
            ignoreSelector: '.nav-button, .nav-counter', // Elements that shouldn't trigger drag
            positionStyle: 'fixed', // 'fixed' or 'absolute'
            dragClass: 'dragging', // Class to add while dragging
        };

        const config = {...defaults, ...options};
        let isDragging = false;
        let offsetX, offsetY;

        // Mouse down handler
        const mouseDownHandler = (e) => {
            // Skip if clicking on ignored elements
            if (config.ignoreSelector && e.target.matches(config.ignoreSelector)) {
                return;
            }

            // Skip if using handle and not clicking on it
            if (config.handleSelector && !e.target.matches(config.handleSelector)) {
                return;
            }

            isDragging = true;
            element.classList.add(config.dragClass);

            // Calculate offsets differently depending on position style
            const rect = element.getBoundingClientRect();
            offsetX = rect.right - e.clientX;
            offsetY = rect.bottom - e.clientY;

            // Prevent text selection during drag
            e.preventDefault();
        };

        // Mouse move handler
        const mouseMoveHandler = (e) => {
            if (!isDragging) return;

            // Calculate new position from right and bottom edges
            const containerRect = element.parentElement.getBoundingClientRect();
            let newRight = containerRect.right - e.clientX - offsetX;
            let newBottom = containerRect.bottom - e.clientY - offsetY;

            // Ensure the element stays within the container
            newRight = Math.max(0, Math.min(newRight, containerRect.width - element.offsetWidth));
            newBottom = Math.max(0, Math.min(newBottom, containerRect.height - element.offsetHeight));

            // Apply new position using right and bottom
            element.style.right = `${newRight}px`;
            element.style.bottom = `${newBottom}px`;
            element.style.left = 'auto'; // Remove left positioning
            element.style.top = 'auto'; // Remove top positioning
        };

        // Mouse up handler
        const mouseUpHandler = () => {
            if (isDragging) {
                isDragging = false;
                element.classList.remove(config.dragClass);
            }
        };

        // Add event listeners
        element.addEventListener('mousedown', mouseDownHandler);
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);

        // Return clean-up function
        return {
            destroy: () => {
                element.removeEventListener('mousedown', mouseDownHandler);
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            }
        };
    }
}
