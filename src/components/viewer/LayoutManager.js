import { Debug } from '../../utils/Debug';
import { DOMUtils } from '../../utils/DOMUtils';
import Selectors from '../../constants/Selectors'; // Add this import

/**
 * Manages layout dimensions and responsive behavior
 */
export class LayoutManager {
    /**
     * @param {DiffViewer} diffViewer - Parent diff viewer
     */
    constructor(diffViewer) {
        this.diffViewer = diffViewer;
        this.paneWidth = 0;
    }

    /**
     * Initialize layout manager
     */
    initialize() {
        // Initial pane width update
        this.updatePaneWidth();

        // Listen for window resize
        window.addEventListener('resize', () => {
            this.updatePaneWidth();
        });

        // Set up mutation observer for content changes
        this.setupWidthObserver();

        Debug.log('LayoutManager: Initialized', null, 2);
    }

    /**
     * Update pane width and CSS variables
     */
    updatePaneWidth() {
        // Use DOMUtils.getElements for consistent element selection
        const panes = DOMUtils.getElements(Selectors.DIFF.PANE, this.diffViewer.container);
        if (!panes || panes.length === 0) return;

        const pane = panes[0];
        const newWidth = pane.clientWidth;

        if (newWidth !== this.paneWidth) {
            this.paneWidth = newWidth;

            // Instead of direct DOM manipulation, use a helper method to set CSS variables
            this.setCSSVariable('--diff-pane-width', `${this.paneWidth}px`);

            Debug.log(`LayoutManager: Updated pane width: ${this.paneWidth}px`, null, 3);
        }
    }

    /**
     * Set CSS variable consistently
     * @param {string} name - Variable name
     * @param {string} value - Variable value
     */
    setCSSVariable(name, value) {
        document.documentElement.style.setProperty(name, value);
    }

    /**
     * Set up observer for content changes affecting width
     */
    setupWidthObserver() {
        // Create mutation observer
        const observer = new MutationObserver((mutations) => {
            let shouldUpdate = false;

            for (const mutation of mutations) {
                if (mutation.type === 'childList' ||
                    (mutation.type === 'attributes' &&
                     (mutation.attributeName === 'style' || mutation.attributeName === 'class'))) {
                    shouldUpdate = true;
                    break;
                }
            }

            if (shouldUpdate) {
                this.updatePaneWidth();
            }
        });

        // Start observing the container
        observer.observe(this.diffViewer.container, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });

        // Store for potential cleanup
        this.observer = observer;

        Debug.log('LayoutManager: Width observer setup complete', null, 2);
    }

    /**
     * Clean up event handlers and observers
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }

        Debug.log('LayoutManager: Destroyed', null, 2);
    }
}
