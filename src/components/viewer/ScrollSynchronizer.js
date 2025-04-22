import { Debug } from '../../utils/Debug';
import Selectors from '../../constants/Selectors';

/**
 * Handles scroll synchronization between panes
 */
export class ScrollSynchronizer {
    /**
     * @param {DiffViewer} diffViewer - Parent diff viewer
     */
    constructor(diffViewer) {
        this.diffViewer = diffViewer;
        this.isSyncing = false;
    }

    /**
     * Set up synchronized scrolling between panes
     */
    setupSynchronizedScrolling() {
        // Find panes
        const panes = this.diffViewer.container.querySelectorAll(Selectors.DIFF.PANE);

        if (panes.length !== 2) {
            Debug.log(`ScrollSynchronizer: Could not find both diff panes. Found: ${panes.length}`, null, 2);
            return;
        }

        const leftPane = panes[0];
        const rightPane = panes[1];

        // Get content elements
        const leftContent = leftPane.querySelector(Selectors.DIFF.PANE_CONTENT);
        const rightContent = rightPane.querySelector(Selectors.DIFF.PANE_CONTENT);

        if (!leftContent || !rightContent) {
            Debug.log('ScrollSynchronizer: Could not find all required scrolling elements', null, 2);
            return;
        }

        // Store references
        this.leftContent = leftContent;
        this.rightContent = rightContent;

        // Sync both vertical AND horizontal scrolling between panes
        leftContent.addEventListener('scroll', () => this._handleScroll(leftContent, rightContent), { passive: true });
        rightContent.addEventListener('scroll', () => this._handleScroll(rightContent, leftContent), { passive: true });

        // Listen for window resize
        window.addEventListener('resize', () => {
            this._updateScrollState(leftContent);
            this._updateScrollState(rightContent);
        });

        Debug.log('ScrollSynchronizer: Horizontal and vertical scroll synchronization set up', null, 2);
    }

    /**
     * Handle scroll events
     * @private
     */
    _handleScroll(sourceElement, targetElement) {
        // Only update if not already syncing to avoid loops
        if (!this.isSyncing) {
            this.isSyncing = true;

            // Sync vertical scrolling (top position)
            targetElement.scrollTop = sourceElement.scrollTop;

            // IMPORTANT: Also sync horizontal scrolling
            targetElement.scrollLeft = sourceElement.scrollLeft;

            this._updateScrollState(sourceElement);

            // Reset syncing flag after a short delay
            setTimeout(() => {
                this.isSyncing = false;
            }, 10);
        }
    }

    /**
     * Update CSS class based on scroll state
     * @private
     */
    _updateScrollState(contentElement) {
        const wasScrolled = contentElement.classList.contains(Selectors.STATUS.SCROLLED.name());
        const isScrolled = contentElement.scrollLeft > 0;

        // Only update if the state changed
        if (wasScrolled !== isScrolled) {
            if (isScrolled) {
                contentElement.classList.add(Selectors.STATUS.SCROLLED.name());
            } else {
                contentElement.classList.remove(Selectors.STATUS.SCROLLED.name());
            }
        }
    }
}
