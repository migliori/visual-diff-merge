import { ChunkUtils } from '../../utils/ChunkUtils';
import Selectors from '../../constants/Selectors';
import { Debug } from '../../utils/Debug';

/**
 * Manages visual state updates for chunk selections
 */
export class ChunkVisualStateManager {
    /**
     * @param {ChunkManager} chunkManager - Parent chunk manager
     */
    constructor(chunkManager) {
        this.chunkManager = chunkManager;
        // Batch operations queue
        this._pendingOperations = [];
        // Track whether DOM updates are batched
        this._isBatching = false;
        // Performance metrics
        this._metrics = {
            lastBatchSize: 0,
            lastBatchTime: 0
        };
        Debug.log('ChunkVisualStateManager: Initialized', null, 3);
    }

    /**
     * Initialize the visual state manager
     * Preloads all chunk data for optimal performance with large files
     */
    initialize() {
        // Preload all chunks into cache for better performance
        ChunkUtils.preloadChunks();
        Debug.log('ChunkVisualStateManager: Initialized with preloaded chunks', null, 2);
    }

    /**
     * Update visual selection state
     * @param {string} chunkId - Chunk ID
     * @param {string} side - 'left' or 'right'
     * @param {string} state - 'selected' or 'unselected'
     * @param {boolean} batch - Whether to batch operations (defaults to false for backward compatibility)
     */
    updateVisualState(chunkId, side, state, batch = false) {
        Debug.log(`ChunkVisualStateManager: Updating visual state for chunk ${chunkId}, side ${side}, state ${state}`, null, 3);

        // Get all elements for this chunk side
        const elements = ChunkUtils.getChunkElements(chunkId, side);
        Debug.log(`ChunkVisualStateManager: Found ${elements.length} elements for chunk ${chunkId}`, null, 3);

        // Sort by line number (only needed for getting the first element)
        const sortedElements = ChunkUtils.sortElementsByLineNumber(elements);

        // Get the opposite side to handle placeholder synchronization
        const oppositeSide = side === 'left' ? 'right' : 'left';

        if (batch) {
            // Add to batch queue
            this._pendingOperations.push({
                type: 'updateState',
                chunkId,
                side,
                elements: elements,
                firstElement: sortedElements.length > 0 ? sortedElements[0] : null,
                state: state,
                oppositeSide: oppositeSide
            });
        } else {
            // Apply immediately (for backward compatibility)
            this._applyStateToElements(elements, state);

            // Only update the icon for the first element
            if (sortedElements.length > 0) {
                Debug.log(`ChunkVisualStateManager: Updating icon marker for first element of chunk ${chunkId}`, null, 3);

                // When setting a state on one side, also update opposite side
                const firstElement = sortedElements[0];
                if (firstElement && state === 'selected') {
                    // First handle the selected side
                    this._updateIconMarker(firstElement, state);

                    // Then handle the opposite side marker as a placeholder
                    this._updateOppositeMarker(firstElement, oppositeSide);
                } else {
                    // Normal case without special opposite handling
                    this._updateIconMarker(firstElement, state);
                }
            } else {
                Debug.warn(`ChunkVisualStateManager: No elements found to update icon for chunk ${chunkId}`, null, 3);
            }

            // Notify about selection change
            this._notifySelectionChange();
        }
    }

    /**
     * Update the opposite side's marker when a chunk is selected
     * @private
     * @param {Element} element - The element being selected
     * @param {string} oppositeSide - The opposite side ('left' or 'right')
     */
    _updateOppositeMarker(element, oppositeSide) {
        if (!element?.dataset?.lineId) return;

        // Extract line number from lineId (format: "side-number")
        const lineIdParts = element.dataset.lineId.split('-');
        if (lineIdParts.length !== 2) return;

        const lineNumber = lineIdParts[1];
        const oppositeLineId = `${oppositeSide}-${lineNumber}`;

        // Find the opposite marker
        const oppositeMarker = ChunkUtils.getIconMarker(oppositeLineId);
        if (!oppositeMarker) {
            Debug.warn(`ChunkVisualStateManager: Could not find opposite marker for ${oppositeLineId}`, null, 3);
            return;
        }

        Debug.log(`ChunkVisualStateManager: Updating opposite marker ${oppositeLineId}`, {
            currentClasses: Array.from(oppositeMarker.classList)
        }, 3);

        // Remove selection classes
        oppositeMarker.classList.remove(
            Selectors.DIFF.CHUNK_SELECTED.name(),
            Selectors.DIFF.CHUNK_UNSELECTED.name(),
            Selectors.ICONS.SELECT.name(),
            Selectors.ICONS.SELECT_LEFT.name(),
            Selectors.ICONS.SELECT_RIGHT.name()
        );

        // CRITICAL DECISION POINT: Determine if the opposite marker should be a placeholder
        // This is determined by whether the line only exists on one side

        // Only mark as placeholder if it was originally a placeholder
        const wasPlaceholder = oppositeMarker.classList.contains(Selectors.ICONS.MARKER_PLACEHOLDER.name());

        if (wasPlaceholder) {
            // If it was a placeholder, keep it as a placeholder
            oppositeMarker.classList.add(Selectors.ICONS.MARKER_PLACEHOLDER.name());
            Debug.log(`ChunkVisualStateManager: Preserved placeholder status for ${oppositeLineId}`, null, 3);
        } else {
            // Otherwise mark it as unselected
            oppositeMarker.classList.add(Selectors.DIFF.CHUNK_UNSELECTED.name());
            Debug.log(`ChunkVisualStateManager: Set opposite marker ${oppositeLineId} as unselected`, null, 3);
        }
    }

    /**
     * Reset visual state for a chunk
     * @param {string} chunkId - Chunk ID
     * @param {boolean} batch - Whether to batch operations (defaults to false for backward compatibility)
     */
    resetVisualState(chunkId, batch = false) {
        Debug.log(`ChunkVisualStateManager: Resetting visual state for chunk ${chunkId}`, null, 3);

        // Get all elements for this chunk (both sides)
        const elements = ChunkUtils.getChunkElements(chunkId);
        Debug.log(`ChunkVisualStateManager: Found ${elements.length} elements for chunk ${chunkId}`, null, 3);

        // Get icon markers associated with this chunk more efficiently
        const iconMarkers = ChunkUtils.getChunkIconMarkers(chunkId);

        if (batch) {
            // Add to batch queue
            this._pendingOperations.push({
                type: 'resetState',
                chunkId,
                elements: elements,
                iconMarkers: iconMarkers
            });
        } else {
            // Apply immediately (for backward compatibility)
            this._applyResetToElements(elements, iconMarkers);

            Debug.log(`ChunkVisualStateManager: Reset ${iconMarkers.length} icon markers for chunk ${chunkId}`, null, 3);

            // Notify about selection change
            this._notifySelectionChange();
        }
    }

    /**
     * Process all pending visual updates in a single batch
     * @param {boolean} notify - Whether to trigger notification after batch (default: true)
     */
    applyBatch(notify = true) {
        if (this._pendingOperations.length === 0) {
            return;
        }

        // Set batching state flag
        this._isBatching = true;
        const batchSize = this._pendingOperations.length;
        this._metrics.lastBatchSize = batchSize;

        // Use a single RAF call for better performance
        requestAnimationFrame(() => {
            const startTime = performance.now();
            Debug.log(`ChunkVisualStateManager: Applying batch of ${batchSize} operations`, null, 2);

            try {
                // Group operations by type for better performance
                const updateOperations = [];
                const resetOperations = [];

                // Sort operations into groups
                this._pendingOperations.forEach(operation => {
                    if (operation.type === 'updateState') {
                        updateOperations.push(operation);
                    } else if (operation.type === 'resetState') {
                        resetOperations.push(operation);
                    }
                });

                // Process reset operations first to ensure clean state
                if (resetOperations.length > 0) {
                    this._processBatchedResets(resetOperations);
                }

                // Then process update operations
                if (updateOperations.length > 0) {
                    this._processBatchedUpdates(updateOperations);
                }

                // Track batch processing time
                const endTime = performance.now();
                const processingTime = endTime - startTime;
                this._metrics.lastBatchTime = processingTime;

                Debug.log(`ChunkVisualStateManager: Batch processing completed in ${processingTime.toFixed(2)}ms`,
                    {
                        operations: batchSize,
                        resetOps: resetOperations.length,
                        updateOps: updateOperations.length,
                        msPerOperation: (processingTime / batchSize).toFixed(2)
                    }, 2);
            }
            catch (error) {
                Debug.error(`Error during batch processing: ${error.message}`, error, 1);
            }
            finally {
                // Clear the queue
                this._pendingOperations = [];

                // Reset batching state flag
                this._isBatching = false;

                // Send notification if requested
                if (notify) {
                    this._notifySelectionChange();
                }
            }
        });
    }

    /**
     * Process a batch of reset operations efficiently
     * @private
     */
    _processBatchedResets(operations) {
        if (operations.length === 0) return;

        // Group elements and markers by class operations for fewer DOM updates
        const allElements = [];
        const allIconMarkers = [];

        // Collect all elements and markers to be reset
        operations.forEach(operation => {
            if (operation.elements) {
                allElements.push(...operation.elements);
            }
            if (operation.iconMarkers) {
                allIconMarkers.push(...operation.iconMarkers);
            }
        });

        // Apply resets in bulk
        this._applyResetToElements(allElements, allIconMarkers);
    }

    /**
     * Process a batch of update operations efficiently
     * @private
     */
    _processBatchedUpdates(operations) {
        if (operations.length === 0) return;

        // Group elements by state for more efficient DOM updates
        const elementsByState = {
            'selected': [],
            'unselected': []
        };

        // First elements for icon marker updates
        const firstElementsByState = {
            'selected': {},  // chunkId -> {element, oppositeSide}
            'unselected': {} // chunkId -> {element}
        };

        // Group elements by state
        operations.forEach(operation => {
            const { elements, firstElement, state, chunkId, side, oppositeSide } = operation;

            if (elements && elements.length > 0) {
                if (state === 'selected' || state === 'unselected') {
                    elementsByState[state].push(...elements);
                }
            }

            // Track first element of each chunk for icon marker updates
            if (firstElement && chunkId) {
                if (state === 'selected' || state === 'unselected') {
                    firstElementsByState[state][chunkId] = {
                        element: firstElement,
                        side: side,
                        oppositeSide: oppositeSide
                    };
                }
            }
        });

        // Apply updates by state
        Object.entries(elementsByState).forEach(([state, elements]) => {
            if (elements.length > 0) {
                this._applyStateToElements(elements, state);
            }
        });

        // Update icon markers
        Object.entries(firstElementsByState).forEach(([state, chunksMap]) => {
            Object.entries(chunksMap).forEach(([_chunkId, data]) => {
                // Update the element's marker
                this._updateIconMarker(data.element, state);

                // For selected elements, also update the opposite marker
                if (state === 'selected' && data.oppositeSide) {
                    this._updateOppositeMarker(data.element, data.oppositeSide);
                }
            });
        });

        // Force a DOM layout refresh to ensure styles are applied
        if (document.body) {
            document.body.getBoundingClientRect();
        }
    }

    /**
     * Apply state changes to elements using efficient operations
     * @private
     */
    _applyStateToElements(elements, state) {
        if (!elements || elements.length === 0) return;

        // For better performance, prepare the classes to add/remove
        const removeClasses = [
            Selectors.DIFF.CHUNK_SELECTED.name(),
            Selectors.DIFF.CHUNK_UNSELECTED.name()
        ];

        let addClass = '';
        if (state === 'selected') {
            addClass = Selectors.DIFF.CHUNK_SELECTED.name();
        } else if (state === 'unselected') {
            addClass = Selectors.DIFF.CHUNK_UNSELECTED.name();
        } else {
            // Fallback for backward compatibility
            addClass = state;
        }

        // Collect all rows to update at once (reduces layout thrashing)
        const rows = new Set();

        // Apply to all elements efficiently
        elements.forEach(element => {
            // Remove classes
            element.classList.remove(...removeClasses);

            // Add class
            element.classList.add(addClass);

            // Add placeholder class if needed
            if (element.classList.contains(Selectors.DIFF.LINE_PLACEHOLDER.name())) {
                element.classList.add(Selectors.DIFF.PLACEHOLDER.name());
            }

            // Collect parent row for batch update
            const row = ChunkUtils.getParentRow(element);
            if (row) {
                rows.add(row);
            }
        });

        // Update all rows at once
        rows.forEach(row => {
            row.classList.remove(...removeClasses);
            row.classList.add(addClass);
        });
    }

    /**
     * Apply reset operations to elements and icon markers efficiently
     * @private
     */
    _applyResetToElements(elements, iconMarkers) {
        if ((!elements || elements.length === 0) && (!iconMarkers || iconMarkers.length === 0)) return;

        // Pre-compute classes to remove for better performance
        const removeClasses = [
            Selectors.DIFF.CHUNK_SELECTED.name(),
            Selectors.DIFF.CHUNK_UNSELECTED.name()
        ];

        const iconRemoveClasses = [
            Selectors.DIFF.CHUNK_SELECTED.name(),
            Selectors.DIFF.CHUNK_UNSELECTED.name(),
            Selectors.ICONS.SELECT.name(),
            Selectors.ICONS.SELECT_LEFT.name(),
            Selectors.ICONS.SELECT_RIGHT.name()
        ];

        // Collect all rows to update at once (reduces layout thrashing)
        const rows = new Set();

        // Remove classes from elements efficiently
        if (elements && elements.length > 0) {
            elements.forEach(el => {
                // Skip null or undefined elements
                if (!el) return;

                // Reset element classes
                el.classList.remove(...removeClasses);

                // Collect parent row for batch update
                const row = ChunkUtils.getParentRow(el);
                if (row) {
                    rows.add(row);
                }
            });

            // Reset all rows at once
            rows.forEach(row => {
                row.classList.remove(...removeClasses);
            });
        }

        // Reset icon markers efficiently
        if (iconMarkers && iconMarkers.length > 0) {
            iconMarkers.forEach(marker => {
                if (marker) {
                    // Store placeholder status before removing classes
                    const isPlaceholder = marker.classList.contains(Selectors.ICONS.MARKER_PLACEHOLDER.name());

                    // Remove selection-related classes
                    marker.classList.remove(...iconRemoveClasses);

                    // Preserve placeholder status when resetting
                    if (isPlaceholder) {
                        marker.classList.add(Selectors.ICONS.MARKER_PLACEHOLDER.name());
                    }
                }
            });
        }
    }

    /**
     * Update icon marker for the element
     * @private
     */
    _updateIconMarker(element, state) {
        if (!element) return;

        const lineId = element.dataset.lineId;
        if (!lineId) return;

        Debug.log(`ChunkVisualStateManager: Looking for icon marker with lineId ${lineId}`, null, 3);
        // Find and update the icon marker (use cached version if available)
        const iconMarker = ChunkUtils.getIconMarker(lineId);

        if (iconMarker) {
            Debug.log(`ChunkVisualStateManager: Updating icon marker state to ${state}`, {
                lineId: lineId,
                currentClasses: Array.from(iconMarker.classList)
            }, 3);

            // Store the placeholder status before removing classes
            const isPlaceholder = iconMarker.classList.contains(Selectors.ICONS.MARKER_PLACEHOLDER.name());

            // Only remove selection-related classes, preserve placeholder status
            iconMarker.classList.remove(
                Selectors.DIFF.CHUNK_SELECTED.name(),
                Selectors.DIFF.CHUNK_UNSELECTED.name(),
                Selectors.ICONS.SELECT.name(),
                Selectors.ICONS.SELECT_LEFT.name(),
                Selectors.ICONS.SELECT_RIGHT.name()
            );

            // Add the appropriate class based on state
            if (state === 'selected') {
                iconMarker.classList.add(Selectors.DIFF.CHUNK_SELECTED.name());

                // Add the side-appropriate selection icon class
                if (element.dataset.side === 'left') {
                    iconMarker.classList.add(Selectors.ICONS.SELECT_LEFT.name());
                } else {
                    iconMarker.classList.add(Selectors.ICONS.SELECT_RIGHT.name());
                }
            } else if (state === 'unselected') {
                iconMarker.classList.add(Selectors.DIFF.CHUNK_UNSELECTED.name());
            } else {
                // Fallback for backward compatibility
                iconMarker.classList.add(state);
            }

            // Preserve placeholder status - don't try to infer it from the element
            if (isPlaceholder && !iconMarker.classList.contains(Selectors.ICONS.MARKER_PLACEHOLDER.name())) {
                iconMarker.classList.add(Selectors.ICONS.MARKER_PLACEHOLDER.name());
                Debug.log(`ChunkVisualStateManager: Preserved placeholder marker status`, null, 3);
            }
        } else {
            Debug.warn(`ChunkVisualStateManager: No icon marker found for line ${lineId}`, null, 3);
        }
    }

    /**
     * Notify about selection change
     * @private
     */
    _notifySelectionChange() {
        Debug.log(`ChunkVisualStateManager: Notifying about selection change`, null, 3);
        if (typeof this.chunkManager.onSelectionChange === 'function') {
            this.chunkManager.onSelectionChange();
        } else {
            Debug.log(`ChunkVisualStateManager: No onSelectionChange handler defined`, null, 3);
        }
    }

    /**
     * Get performance metrics
     * @returns {Object} Current metrics
     */
    getMetrics() {
        return {...this._metrics};
    }
}
