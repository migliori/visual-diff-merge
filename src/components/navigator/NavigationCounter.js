
/**
 * Manages navigation counter display and state
 */
export class NavigationCounter {
    /**
     * @param {DiffNavigator} navigator - Parent navigator component
     */
    constructor(navigator) {
        this.navigator = navigator;
        this.counterElement = null;
        this.prevButton = null;
        this.nextButton = null;
    }

    /**
     * Set counter element reference
     * @param {Element} element - Counter element
     */
    setCounterElement(element) {
        this.counterElement = element;
    }

    /**
     * Set navigation button references
     * @param {Element} prevButton - Previous button
     * @param {Element} nextButton - Next button
     */
    setButtons(prevButton, nextButton) {
        this.prevButton = prevButton;
        this.nextButton = nextButton;
    }

    /**
     * Update counter display
     * @returns {Array} Active conflicts for navigation
     */
    updateCounter() {
        if (!this.counterElement) return [];

        const chunks = this.navigator.diffViewer.chunkManager.chunks;
        const selections = this.navigator.diffViewer.chunkManager.selections;
        let conflictCount = 0;
        let currentIndex = 0;
        let activeConflicts = [];

        // Count only unresolved conflicts
        chunks.forEach((chunk, index) => {
            if (chunk.conflict && !selections[chunk.id]) {
                // This is an unresolved conflict - no selection made yet
                activeConflicts.push(index);
                conflictCount++;
            }
        });

        // Find current position in active conflicts
        if (this.navigator.currentChunkIndex >= 0) {
            const position = activeConflicts.findIndex(index => index >= this.navigator.currentChunkIndex);
            if (position !== -1) {
                currentIndex = position + 1; // 1-based index for display
            }
        }

        // Update counter text with different symbol when complete
        if (conflictCount === 0) {
            // All conflicts resolved! Show a checkmark
            this.counterElement.textContent = '✓';
            this.counterElement.title = 'All conflicts resolved!';
        } else {
            this.counterElement.textContent = `${currentIndex || 1}/${conflictCount}`;
            this.counterElement.title = `${conflictCount} conflicts remaining`;
        }

        // Enable/disable buttons based on conflict count
        if (this.prevButton && this.nextButton) {
            this.prevButton.disabled = conflictCount === 0;
            this.nextButton.disabled = conflictCount === 0;
        }

        return activeConflicts;
    }
}
