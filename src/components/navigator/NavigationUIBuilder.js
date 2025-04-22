import { Debug } from '../../utils/Debug';
import { DOMUtils } from '../../utils/DOMUtils';
import Selectors from '../../constants/Selectors';

/**
 * Builds navigation UI elements
 */
export class NavigationUIBuilder {
    /**
     * @param {DiffNavigator} navigator - Parent navigator component
     */
    constructor(navigator) {
        this.navigator = navigator;
    }

    /**
     * Create navigation UI elements
     * @returns {Object|null} Object with counter, prev button, and next button elements
     */
    createNavigationUI() {
        Debug.log('NavigationUIBuilder: Creating navigation UI', null, 2);

        // Find container element - first look for an existing one
        let container = document.querySelector(Selectors.NAVIGATION.CONTAINER);

        // If no container found, create one
        if (!container) {
            Debug.log('NavigationUIBuilder: No navigation container found, creating one', null, 2);

            // Get the diff pane contents as parent reference
            const panes = document.querySelectorAll(Selectors.DIFF.PANE);
            if (!panes || panes.length === 0) {
                Debug.warn('NavigationUIBuilder: No diff panes found to append navigation container');
                return null;
            }

            // Create container
            container = document.createElement('div');
            container.className = Selectors.NAVIGATION.CONTAINER.name();

            // Build controls inside the container
            this._createControls(container);

            // Append after the first pane
            if (panes[0].parentNode) {
                panes[0].parentNode.insertBefore(container, panes[0]);
            }
        } else {
            // Use existing container, but update its contents
            Debug.log('NavigationUIBuilder: Using existing navigation container', null, 2);
            container.innerHTML = '';
            this._createControls(container);
        }

        // Return references to the elements
        return {
            counter: document.getElementById(Selectors.NAVIGATION.COUNTER.name()),
            prevButton: document.getElementById(Selectors.NAVIGATION.PREV_BUTTON.name()),
            nextButton: document.getElementById(Selectors.NAVIGATION.NEXT_BUTTON.name())
        };
    }

    /**
     * Create navigation controls
     * @private
     * @param {Element} container - Container element
     */
    _createControls (container) {
        // Create nav chunk element
        const navChunk = document.createElement('div');
        navChunk.className = Selectors.NAVIGATION.NAV_CHUNK.name();

        // Create counter element
        const counter = document.createElement('span');
        counter.id = Selectors.NAVIGATION.COUNTER.name();
        counter.className = Selectors.NAVIGATION.COUNTER_ELEMENT.name();

        // Create previous button
        const prevButton = document.createElement('button');
        prevButton.id = Selectors.NAVIGATION.PREV_BUTTON.name();
        prevButton.classList.add(
            Selectors.UTILITY.BUTTON.name(),
            Selectors.UTILITY.BUTTON_FLAT.name(),
            Selectors.UTILITY.BUTTON_SMALL.name()
        );
        prevButton.innerHTML = DOMUtils.getIconHtml('chevron-up');
        prevButton.title = 'Previous change';
        prevButton.addEventListener('click', () => this.navigator.navigateToPrevConflict());

        // Create next button
        const nextButton = document.createElement('button');
        nextButton.id = Selectors.NAVIGATION.NEXT_BUTTON.name();
        nextButton.classList.add(
            Selectors.UTILITY.BUTTON.name(),
            Selectors.UTILITY.BUTTON_FLAT.name(),
            Selectors.UTILITY.BUTTON_SMALL.name()
        );
        nextButton.innerHTML = DOMUtils.getIconHtml('chevron-down');
        nextButton.title = 'Next change';
        nextButton.addEventListener('click', () => this.navigator.navigateToNextConflict());

        // Add elements to navChunk
        navChunk.appendChild(prevButton);
        navChunk.appendChild(counter);
        navChunk.appendChild(nextButton);

        // Add navChunk to container
        container.appendChild(navChunk);

        Debug.log('NavigationUIBuilder: Navigation controls created', null, 2);
    }

    /**
     * Clean up event handlers
     */
    destroy() {
        // Find navigation buttons
        const prevButton = document.getElementById(Selectors.NAVIGATION.PREV_BUTTON.name());
        const nextButton = document.getElementById(Selectors.NAVIGATION.NEXT_BUTTON.name());

        // Remove event listeners by cloning
        if (prevButton) {
            const newPrevButton = prevButton.cloneNode(true);
            prevButton.parentNode.replaceChild(newPrevButton, prevButton);
        }

        if (nextButton) {
            const newNextButton = nextButton.cloneNode(true);
            nextButton.parentNode.replaceChild(newNextButton, nextButton);
        }

        Debug.log('NavigationUIBuilder: Event handlers removed', null, 2);
    }
}
