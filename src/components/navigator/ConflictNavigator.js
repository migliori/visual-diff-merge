import { Debug } from '../../utils/Debug';
import { NavigationUtils } from '../../utils/NavigationUtils';
import Selectors from '../../constants/Selectors';

/**
 * Handles navigation between conflicts
 */
export class ConflictNavigator {
    /**
     * @param {DiffNavigator} navigator - Parent navigator component
     */
    constructor(navigator) {
        this.navigator = navigator;
        this.diffViewer = navigator.diffViewer;
    }

    /**
     * Find all unresolved chunk IDs in the document
     * @returns {Object} Object containing unresolvedChunkIds and total count
     */
    _getUnresolvedChunkInfo() {
        // Find elements with unresolved status
        const unresolvedElements = Array.from(document.querySelectorAll(
            `[data-chunk-id]:not([data-chunk-id=""])`
        )).filter(el => el.classList.contains(Selectors.STATUS.UNRESOLVED.name()));

        if (unresolvedElements.length === 0) {
            Debug.log('ConflictNavigator: No unresolved elements found', null, 2);
            return { unresolvedChunkIds: [], count: 0 };
        }

        // Get a unique list of chunk IDs that have unresolved status
        const unresolvedChunkIds = [...new Set(
            unresolvedElements.map(el => el.getAttribute('data-chunk-id'))
        )];

        Debug.log(`ConflictNavigator: Found ${unresolvedChunkIds.length} unresolved chunks`, null, 3);

        return { unresolvedChunkIds, count: unresolvedChunkIds.length };
    }

    /**
     * Navigate to first conflict
     */
    navigateToFirstConflict() {
        const { unresolvedChunkIds, count } = this._getUnresolvedChunkInfo();

        if (count === 0) {
            Debug.log('ConflictNavigator: No unresolved chunks found', null, 2);
            return false;
        }

        // Find the first chunk with this ID
        const chunks = this.diffViewer.chunkManager.chunks;
        const firstUnresolvedIndex = chunks.findIndex(chunk =>
            unresolvedChunkIds.includes(String(chunk.id))
        );

        if (firstUnresolvedIndex >= 0) {
            Debug.log(`ConflictNavigator: Navigating to first unresolved chunk at index ${firstUnresolvedIndex}`, null, 2);
            return this.navigator.navigateToChunk(firstUnresolvedIndex);
        }

        Debug.log('ConflictNavigator: No matching chunk found', null, 2);
        return false;
    }

    /**
     * Navigate to next conflict
     */
    navigateToNextConflict() {
        const currentIndex = this.navigator.currentChunkIndex;
        Debug.log(`ConflictNavigator: Current chunk index is ${currentIndex}`, null, 3);

        const { unresolvedChunkIds, count } = this._getUnresolvedChunkInfo();

        if (count === 0) {
            Debug.log('ConflictNavigator: No unresolved chunks found', null, 2);
            return false;
        }

        const chunks = this.diffViewer.chunkManager.chunks;

        // Find next chunk or wrap around
        const nextIndex = this._findNextChunkIndex(chunks, unresolvedChunkIds, currentIndex);

        if (nextIndex >= 0) {
            Debug.log(`ConflictNavigator: Navigating to next unresolved chunk at index ${nextIndex}`, null, 2);
            return this.navigator.navigateToChunk(nextIndex);
        }

        Debug.log('ConflictNavigator: No matching chunk found', null, 2);
        return false;
    }

    /**
     * Find the next chunk index from a starting point
     * @private
     */
    _findNextChunkIndex(chunks, unresolvedChunkIds, currentIndex) {
        const indexMap = this._createChunkIndexMap(chunks, unresolvedChunkIds);

        // No matching chunks
        if (indexMap.size === 0) {
            return -1;
        }

        // Get all indices in the map
        const indices = Array.from(indexMap.values()).sort((a, b) => a - b);

        // Find the next index after currentIndex
        for (const index of indices) {
            if (index > currentIndex) {
                return index;
            }
        }

        // Wrap around to beginning
        return indices[0];
    }

    /**
     * Navigate to previous conflict
     */
    navigateToPrevConflict() {
        const currentIndex = this.navigator.currentChunkIndex;

        const { unresolvedChunkIds, count } = this._getUnresolvedChunkInfo();

        if (count === 0) {
            Debug.log('ConflictNavigator: No unresolved chunks found', null, 2);
            return false;
        }

        const chunks = this.diffViewer.chunkManager.chunks;

        // Find previous chunk or wrap around
        const prevIndex = this._findPrevChunkIndex(chunks, unresolvedChunkIds, currentIndex);

        if (prevIndex >= 0) {
            Debug.log(`ConflictNavigator: Navigating to previous unresolved chunk at index ${prevIndex}`, null, 2);
            return this.navigator.navigateToChunk(prevIndex);
        }

        Debug.log('ConflictNavigator: No matching chunk found', null, 2);
        return false;
    }

    /**
     * Find the previous chunk index from a starting point
     * @private
     */
    _findPrevChunkIndex(chunks, unresolvedChunkIds, currentIndex) {
        const indexMap = this._createChunkIndexMap(chunks, unresolvedChunkIds);

        // No matching chunks
        if (indexMap.size === 0) {
            return -1;
        }

        // Get all indices in the map
        const indices = Array.from(indexMap.values()).sort((a, b) => a - b);

        // Find the previous index before currentIndex
        for (let i = indices.length - 1; i >= 0; i--) {
            if (indices[i] < currentIndex) {
                return indices[i];
            }
        }

        // Wrap around to end
        return indices[indices.length - 1];
    }

    /**
     * Create a map of chunk IDs to their indices for fast lookup
     * @private
     */
    _createChunkIndexMap(chunks, unresolvedChunkIds) {
        const indexMap = new Map();

        chunks.forEach((chunk, index) => {
            // Only include chunks that are unresolved
            if (chunk && chunk.id && unresolvedChunkIds.includes(String(chunk.id))) {
                indexMap.set(String(chunk.id), index);
            }
        });

        return indexMap;
    }

    /**
     * Navigate to specific chunk
     * @param {number} index - Chunk index
     * @returns {boolean} Success status
     */
    navigateToChunk(index) {
        // Set current chunk
        this.navigator.currentChunkIndex = index;

        // Get the chunk element
        const chunkElement = this.diffViewer.chunkManager.chunkElements[index];

        // Scroll to it
        if (chunkElement) {
            Debug.log(`ConflictNavigator: Navigating to chunk ${index}`, null, 2);

            // Find the diff-pane-content containing this element
            const paneContent = chunkElement.closest(Selectors.DIFF.PANE_CONTENT);
            if (paneContent) {
                // Use utility to scroll element into view
                NavigationUtils.scrollElementIntoView(chunkElement, paneContent);

                // Add highlight effect
                NavigationUtils.addHighlightEffect(chunkElement, 2000);
            } else {
                Debug.warn(`ConflictNavigator: Cannot navigate - chunk ${index} parent not found`, null, 2);
                return false;
            }
        } else {
            Debug.warn(`ConflictNavigator: Cannot scroll - chunk ${index} not found`, null, 2);
            return false;
        }

        // Update counter
        this.navigator.navigationCounter.updateCounter();
        Debug.log('ConflictNavigator: Navigation complete', null, 2);

        return true;
    }
}
