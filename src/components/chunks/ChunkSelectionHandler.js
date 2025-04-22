import { Debug } from '../../utils/Debug';
import { DOMUtils } from '../../utils/DOMUtils';
import Selectors from '../../constants/Selectors';
import { ChunkUtils } from '../../utils/ChunkUtils';
import { IconRegistry } from '../../utils/IconRegistry';
import { TranslationManager } from '../../utils/TranslationManager';
import { LoaderManager } from '../../utils/LoaderManager';

import { ChunkVisualStateManager } from './ChunkVisualStateManager';

/**
 * Handles chunk selection operations
 */
export class ChunkSelectionHandler {
    /**
     * @param {ChunkManager} chunkManager - Parent chunk manager
     */
    constructor(chunkManager) {
        this.chunkManager = chunkManager;
        this.selections = {}; // Store selections separately
        this.visualStateManager = new ChunkVisualStateManager(chunkManager);

        // Define selection state constants to replace hardcoded strings
        this.SELECTED = Selectors.DIFF.CHUNK_SELECTED.name();
        this.UNSELECTED = Selectors.DIFF.CHUNK_UNSELECTED.name();

        // Performance tracking metrics
        this._performanceMetrics = {
            lastOperationTime: 0,
            operationCount: 0
        };
    }

    /**
     * Setup chunk selection handlers
     */
    setupChunkSelection() {
        // Store the handler function with proper binding
        this._boundClickHandler = (event) => this._handleClick(event);
        this._boundCheckAllHandler = (event) => this._handleCheckAll(event);

        // Clear existing handlers and setup new ones for ALL chunk elements
        // by targeting data-chunk-id attribute instead of specific classes
        DOMUtils.setupEventHandlers(
            '[data-chunk-id]:not([data-chunk-id=""])',
            'click',
            this._boundClickHandler,
            {
                removeExisting: true,
                styles: { cursor: 'pointer' }
            }
        );

        // Add "Check All" buttons to each pane and setup handlers
        this._setupCheckAllButtons();

        // Clear ChunkUtils cache to ensure fresh state
        ChunkUtils.clearCache();

        Debug.log('ChunkSelectionHandler: Selection handlers initialized for all chunk elements', null, 2);
    }

    /**
     * Set up "Check All" buttons
     * @private
     */
    _setupCheckAllButtons() {
        // Find panes
        const panes = this.chunkManager.diffViewer.container.querySelectorAll(Selectors.DIFF.PANE);

        if (panes.length !== 2) {
            Debug.log('ChunkSelectionHandler: Could not find both diff panes for "Check All" buttons', null, 2);
            return;
        }

        const leftPane = panes[0];
        const rightPane = panes[1];

        // Create and add the check all buttons to the panes
        this._createCheckAllButtonHeader(leftPane, 'left');
        this._createCheckAllButtonHeader(rightPane, 'right');
    }

    /**
     * Create a header with a "Check All" button for a pane
     * @private
     */
    _createCheckAllButtonHeader(pane, side) {
        // Get translation manager instance
        const translationManager = TranslationManager.getInstance();

        // Create header element
        const header = document.createElement('div');
        header.className = Selectors.DIFF.PANE_HEADER.name();

        // Make header a flex container
        header.classList.add('vdm-d-flex', 'vdm-justify-content-between', 'vdm-align-items-center');

        // Get language information from DiffViewer
        const language = this.chunkManager.diffViewer.runtimeProps.diffData.language || 'Text';

        // Create language badge
        const langBadge = document.createElement('span');
        langBadge.className = 'vdm-badge vdm-badge--info';
        langBadge.textContent = language;

        // Create button element
        const checkAllButton = document.createElement('button');
        checkAllButton.className = `${Selectors.UTILITY.BUTTON.name()} ${Selectors.UTILITY.BUTTON_EXTRA_SMALL.name()} ${Selectors.UTILITY.BUTTON_SECONDARY.name()} ${Selectors.DIFF.CHECK_ALL_BTN.name()}`;
        checkAllButton.setAttribute('data-side', side);
        checkAllButton.setAttribute('data-icon-state', 'unchecked');
        checkAllButton.title = `Select all changes from the ${side} pane`;
        checkAllButton.style.display = 'inline-flex';
        checkAllButton.style.alignItems = 'center';
        checkAllButton.style.verticalAlign = 'middle';

        // Create icon wrapper span
        const iconWrapper = document.createElement('span');
        iconWrapper.className = 'vdm-icon-wrapper';
        iconWrapper.style.marginRight = '3px';
        iconWrapper.style.display = 'inline-flex';
        iconWrapper.style.alignItems = 'center';
        iconWrapper.style.verticalAlign = 'middle';
        iconWrapper.style.height = '14px';
        iconWrapper.style.lineHeight = '1';

        // Add checkbox-unchecked icon by default
        const uncheckIcon = IconRegistry.createIcon('checkbox-unchecked', {
            width: 14,
            height: 14,
            classes: 'vdm-icon-checkbox'
        });

        iconWrapper.appendChild(uncheckIcon);

        // Create text node with a span wrapper for better alignment
        const textSpan = document.createElement('span');
        textSpan.style.display = 'inline-block';
        textSpan.style.verticalAlign = 'middle';
        textSpan.style.lineHeight = '1';
        textSpan.appendChild(document.createTextNode(translationManager.get('checkAll')));

        // Add icon and text to button
        checkAllButton.appendChild(iconWrapper);
        checkAllButton.appendChild(textSpan);

        // Add language badge and button to header
        header.appendChild(langBadge);
        header.appendChild(checkAllButton);

        // Add header as the first child of the pane
        pane.insertBefore(header, pane.firstChild);

        // Add click event handler
        checkAllButton.addEventListener('click', this._boundCheckAllHandler);
    }

    /**
     * Handle click on "Check All" button
     * @private
     */
    _handleCheckAll(event) {
        const button = event.currentTarget;
        const side = button.getAttribute('data-side');
        const iconState = button.getAttribute('data-icon-state');
        const oppositeButton = this._getOppositeButton(side);

        // Get translation manager and loader manager
        const translationManager = TranslationManager.getInstance();
        const loaderManager = LoaderManager.getInstance();

        if (!side) return;

        // Show loading indicator for batch operations
        const message = translationManager.get('processingChunks') || 'Processing chunks...';
        const loaderId = loaderManager.showLoader(message, {
            fullscreen: true,
            zIndex: 9999
        });

        // Also update button state for visual feedback
        this._setButtonProcessingState(button, true);

        // Track performance
        const startTime = performance.now();

        // Use a small timeout to allow the loader to be shown
        setTimeout(() => {
            // If this button is already checked, uncheck everything
            if (iconState === 'checked') {
                Debug.log('ChunkSelectionHandler: Unchecking all selections', null, 2);

                // Reset this button
                this._toggleButtonIconState(button, 'checked');

                // Reset opposite button if it's checked
                if (oppositeButton && oppositeButton.getAttribute('data-icon-state') === 'checked') {
                    this._toggleButtonIconState(oppositeButton, 'checked');
                }

                // Clear all selections
                this.clearAllSelections(true); // Use optimized batch version
            }
            // If opposite button is checked, toggle both sides
            else if (oppositeButton && oppositeButton.getAttribute('data-icon-state') === 'checked') {
                // Uncheck the opposite side
                this._toggleButtonIconState(oppositeButton, 'checked');

                // Check this side
                this._toggleButtonIconState(button, 'unchecked');

                // Select all on this side
                this.selectAllOnSide(side, true); // Use optimized batch version
            }
            // Default case: check this side
            else {
                this._toggleButtonIconState(button, 'unchecked');
                this.selectAllOnSide(side, true); // Use optimized batch version
            }

            // Reset button state
            this._setButtonProcessingState(button, false);

            // Hide loader
            loaderManager.hideLoader(loaderId);

            // Track performance metrics
            this._recordPerformanceMetrics(startTime);
        }, 50);
    }

    /**
     * Set button to processing state to give visual feedback during long operations
     * @private
     */
    _setButtonProcessingState(button, isProcessing) {
        if (isProcessing) {
            button.classList.add('processing');
            button.style.opacity = '0.8';
            button.style.cursor = 'wait';
        } else {
            button.classList.remove('processing');
            button.style.opacity = '';
            button.style.cursor = '';
        }
    }

    /**
     * Record performance metrics for optimization analysis
     * @private
     */
    _recordPerformanceMetrics(startTime) {
        const endTime = performance.now();
        const operationTime = endTime - startTime;

        this._performanceMetrics.lastOperationTime = operationTime;
        this._performanceMetrics.operationCount++;

        // Log cache statistics to evaluate caching effectiveness
        const cacheStats = ChunkUtils.getCacheStats();
        const elementHitRatio = cacheStats.elementCacheHits /
            (cacheStats.elementCacheHits + cacheStats.elementCacheMisses) * 100 || 0;
        const iconHitRatio = cacheStats.iconMarkerCacheHits /
            (cacheStats.iconMarkerCacheHits + cacheStats.iconMarkerCacheMisses) * 100 || 0;

        Debug.log(`ChunkSelectionHandler: Operation completed in ${operationTime.toFixed(2)}ms`,
            {
                totalOperations: this._performanceMetrics.operationCount,
                cacheStats: {
                    elementCacheHits: cacheStats.elementCacheHits,
                    elementCacheMisses: cacheStats.elementCacheMisses,
                    elementHitRatio: `${elementHitRatio.toFixed(1)}%`,
                    iconMarkerCacheHits: cacheStats.iconMarkerCacheHits,
                    iconMarkerCacheMisses: cacheStats.iconMarkerCacheMisses,
                    iconHitRatio: `${iconHitRatio.toFixed(1)}%`
                }
            }, 2);
    }

    /**
     * Get the button for the opposite side
     * @private
     * @param {string} currentSide - Current side ('left' or 'right')
     * @returns {Element|null} - The opposite side button element or null if not found
     */
    _getOppositeButton(currentSide) {
        const oppositeSide = currentSide === 'left' ? 'right' : 'left';
        return this.chunkManager.diffViewer.container.querySelector(
            `.${Selectors.DIFF.CHECK_ALL_BTN.name()}[data-side="${oppositeSide}"]`
        );
    }

    /**
     * Toggle button icon state between checked and unchecked
     * @private
     * @param {Element} button - The button element
     * @param {string} currentState - Current icon state ('checked' or 'unchecked')
     */
    _toggleButtonIconState(button, currentState) {
        const iconWrapper = button.querySelector('.vdm-icon-wrapper');
        if (!iconWrapper) return;

        // Clear current icon
        iconWrapper.innerHTML = '';

        // Determine new state based on current state
        let newIconState;
        if (currentState === 'unchecked') {
            newIconState = 'checked';
            iconWrapper.appendChild(IconRegistry.createIcon('checkbox-checked', {
                width: 14,
                height: 14,
                classes: 'vdm-icon-checkbox'
            }));
        } else {
            newIconState = 'unchecked';
            iconWrapper.appendChild(IconRegistry.createIcon('checkbox-unchecked', {
                width: 14,
                height: 14,
                classes: 'vdm-icon-checkbox'
            }));
        }

        // Update icon state attribute
        button.setAttribute('data-icon-state', newIconState);
    }

    /**
     * Select all chunks on a specific side
     * @param {string} side - 'left' or 'right'
     * @param {boolean} useBatch - Whether to use batching for large files (default: false for backward compatibility)
     */
    selectAllOnSide(side, useBatch = false) {
        const oppositeSide = side === 'left' ? 'right' : 'left';

        Debug.log(`ChunkSelectionHandler: Selecting all chunks on ${side} side${useBatch ? ' (batched)' : ''}`, null, 2);

        // Get all chunks that need resolution
        const conflictChunks = this.chunkManager.chunks.filter(chunk =>
            chunk.conflict || chunk.type === 'replace' || chunk.type === 'add' || chunk.type === 'delete'
        );

        // Check if we should use batching based on number of chunks
        const largeDiff = conflictChunks.length > 20; // Threshold for considering a diff as "large"
        useBatch = useBatch || largeDiff;

        // Show loader for large operations
        let loaderId = null;
        if (useBatch && conflictChunks.length > 50) {
            const translationManager = TranslationManager.getInstance();
            const loaderManager = LoaderManager.getInstance();
            const message = translationManager.get('processingChunks') || 'Processing chunks...';
            loaderId = loaderManager.showLoader(message, {
                fullscreen: true,
                zIndex: 9999
            });
        }

        // Start tracking performance
        const startTime = performance.now();

        if (useBatch) {
            // First update internal state for all chunks
            conflictChunks.forEach(chunk => {
                // Update selections object
                this.selections[chunk.id] = side;

                // Sync with diffConfig for compatibility
                this._syncWithDiffConfig(chunk.id, side);
            });

            // Get all chunks by side for efficient batch processing
            const chunksBySide = new Map();

            // Group all elements by chunk ID and side for batch processing
            conflictChunks.forEach(chunk => {
                // Toggle visual state with batching enabled
                this.visualStateManager.updateVisualState(chunk.id, side, this.SELECTED, true);
                this.visualStateManager.updateVisualState(chunk.id, oppositeSide, this.UNSELECTED, true);

                // Collect chunk elements for resolved status update
                if (!chunksBySide.has(chunk.id)) {
                    const elements = ChunkUtils.getChunkElements(chunk.id);
                    chunksBySide.set(chunk.id, elements);
                }
            });

            // Process visual updates in a single batch
            this.visualStateManager.applyBatch(false); // Don't notify yet

            // Apply resolved status to all chunks in a separate batch
            requestAnimationFrame(() => {
                // Ensure the icon markers are updated by forcing a redraw
                this._refreshIconStates(side, conflictChunks);

                chunksBySide.forEach((elements) => {
                    elements.forEach(element => {
                        element.classList.add(Selectors.STATUS.RESOLVED.name());
                        element.classList.remove(Selectors.STATUS.UNRESOLVED.name());
                    });
                });

                // Update navigation counter after all visual changes
                this._updateNavigationCounter();

                // Now notify about selection change
                if (typeof this.chunkManager.onSelectionChange === 'function') {
                    this.chunkManager.onSelectionChange();
                }

                // Hide loader if it was shown
                if (loaderId) {
                    const loaderManager = LoaderManager.getInstance();
                    loaderManager.hideLoader(loaderId);
                }

                // Record performance metrics after all operations
                this._recordPerformanceMetrics(startTime);
            });
        } else {
            // Legacy approach - process one by one
            conflictChunks.forEach(chunk => {
                this.toggleChunkSelection(chunk.id, side, this.SELECTED);
                this.toggleChunkSelection(chunk.id, oppositeSide, this.UNSELECTED);
            });

            // Callback to notify of selection change
            if (typeof this.chunkManager.onSelectionChange === 'function') {
                this.chunkManager.onSelectionChange();
            }

            // Record performance metrics
            this._recordPerformanceMetrics(startTime);
        }
    }

    /**
     * Force refresh icon states for chunks
     * This ensures icon markers are correctly updated during batch operations
     * @private
     */
    _refreshIconStates(selectedSide, chunks) {
        const oppositeSide = selectedSide === 'left' ? 'right' : 'left';

        // Force all chunks to properly show their selection state visually
        chunks.forEach(chunk => {
            // Get elements for both sides
            const selectedElements = ChunkUtils.getChunkElements(chunk.id, selectedSide);
            const oppositeElements = ChunkUtils.getChunkElements(chunk.id, oppositeSide);

            // Handle selected side
            if (selectedElements.length > 0) {
                // Sort by line number to get first element for icon marker
                const sortedElements = ChunkUtils.sortElementsByLineNumber(selectedElements);
                const firstElement = sortedElements[0];

                if (firstElement) {
                    const lineId = firstElement.dataset.lineId;
                    if (lineId) {
                        // Force direct icon marker update with the correct side
                        const iconMarker = ChunkUtils.getIconMarker(lineId);
                        if (iconMarker) {
                            // Remove all state classes first
                            iconMarker.classList.remove(
                                Selectors.DIFF.CHUNK_SELECTED.name(),
                                Selectors.DIFF.CHUNK_UNSELECTED.name(),
                                Selectors.ICONS.SELECT.name(),
                                Selectors.ICONS.SELECT_LEFT.name(),
                                Selectors.ICONS.SELECT_RIGHT.name()
                            );

                            // Add selected state
                            iconMarker.classList.add(Selectors.DIFF.CHUNK_SELECTED.name());

                            // Add the side-specific icon marker
                            if (selectedSide === 'left') {
                                iconMarker.classList.add(Selectors.ICONS.SELECT_LEFT.name());
                            } else {
                                iconMarker.classList.add(Selectors.ICONS.SELECT_RIGHT.name());
                            }
                        }
                    }
                }

                // Apply the selected class to all elements for this chunk on the selected side
                selectedElements.forEach(element => {
                    // Remove all selection classes first
                    element.classList.remove(
                        Selectors.DIFF.CHUNK_SELECTED.name(),
                        Selectors.DIFF.CHUNK_UNSELECTED.name()
                    );

                    // Add selected class
                    element.classList.add(Selectors.DIFF.CHUNK_SELECTED.name());

                    // Update the parent row too
                    const row = ChunkUtils.getParentRow(element);
                    if (row) {
                        row.classList.remove(
                            Selectors.DIFF.CHUNK_SELECTED.name(),
                            Selectors.DIFF.CHUNK_UNSELECTED.name()
                        );
                        row.classList.add(Selectors.DIFF.CHUNK_SELECTED.name());
                    }
                });
            }

            // Handle opposite side
            if (oppositeElements.length > 0) {
                // Clear any icon markers on the opposite side
                const sortedOppositeElements = ChunkUtils.sortElementsByLineNumber(oppositeElements);
                const firstOppositeElement = sortedOppositeElements[0];

                if (firstOppositeElement) {
                    const oppositeLineId = firstOppositeElement.dataset.lineId;
                    if (oppositeLineId) {
                        const oppositeIconMarker = ChunkUtils.getIconMarker(oppositeLineId);
                        if (oppositeIconMarker) {
                            // Clear all selection related classes
                            oppositeIconMarker.classList.remove(
                                Selectors.DIFF.CHUNK_SELECTED.name(),
                                Selectors.DIFF.CHUNK_UNSELECTED.name(),
                                Selectors.ICONS.SELECT.name(),
                                Selectors.ICONS.SELECT_LEFT.name(),
                                Selectors.ICONS.SELECT_RIGHT.name()
                            );

                            // DETERMINE IF THIS SHOULD BE A PLACEHOLDER
                            // Apply the same placeholder logic used in _updateOppositeMarker

                            // Check if the opposite element has placeholder attributes
                            const hasPlaceholder = firstOppositeElement.dataset.hasPlaceholder === 'true';
                            const isPlaceholderType = firstOppositeElement.classList.contains(Selectors.DIFF.LINE_PLACEHOLDER.name());
                            const wasPlaceholder = oppositeIconMarker.classList.contains(Selectors.ICONS.MARKER_PLACEHOLDER.name());

                            // Find the corresponding selected element for the same line number
                            const lineNumber = oppositeLineId.split('-')[1];
                            const selectedLineId = `${selectedSide}-${lineNumber}`;
                            const selectedElement = document.querySelector(`[data-line-id="${selectedLineId}"]`);

                            // Check if the selected element indicates this should be a placeholder
                            const selectedHasPlaceholder = selectedElement?.dataset.hasPlaceholder === 'true';
                            const selectedIsPlaceholderType = selectedElement?.classList.contains(Selectors.DIFF.LINE_PLACEHOLDER.name());

                            // If any of these conditions are true, this should be a placeholder
                            if (hasPlaceholder || isPlaceholderType || wasPlaceholder ||
                                selectedHasPlaceholder || selectedIsPlaceholderType) {
                                // Set as placeholder
                                oppositeIconMarker.classList.add(Selectors.ICONS.MARKER_PLACEHOLDER.name());
                                Debug.log(`ChunkSelectionHandler: Set opposite marker ${oppositeLineId} as placeholder during batch refresh`, null, 3);
                            } else {
                                // Normal unselected state
                                oppositeIconMarker.classList.add(Selectors.DIFF.CHUNK_UNSELECTED.name());
                            }
                        }
                    }
                }

                // Apply the unselected class to all elements on the opposite side
                oppositeElements.forEach(element => {
                    // Remove all selection classes first
                    element.classList.remove(
                        Selectors.DIFF.CHUNK_SELECTED.name(),
                        Selectors.DIFF.CHUNK_UNSELECTED.name()
                    );

                    // Add unselected class
                    element.classList.add(Selectors.DIFF.CHUNK_UNSELECTED.name());

                    // Update the parent row too
                    const row = ChunkUtils.getParentRow(element);
                    if (row) {
                        row.classList.remove(
                            Selectors.DIFF.CHUNK_SELECTED.name(),
                            Selectors.DIFF.CHUNK_UNSELECTED.name()
                        );
                        row.classList.add(Selectors.DIFF.CHUNK_UNSELECTED.name());
                    }
                });
            }
        });
    }

    /**
     * Handle click event on chunk
     * @private
     */
    _handleClick(event) {
        const element = event.currentTarget;
        const chunkId = element.getAttribute('data-chunk-id');
        const side = element.getAttribute('data-side');

        Debug.log(`ChunkSelectionHandler: Click detected on side ${side} for chunk ${chunkId}`, {
            element: element.outerHTML.substring(0, 100) + '...' // Log first 100 chars of HTML
        }, 3);

        if (chunkId && side) {
            // Check if the chunk is already selected on this side
            const isAlreadySelected = this.selections[chunkId] === side &&
                element.classList.contains(Selectors.DIFF.CHUNK_SELECTED.name());

            if (isAlreadySelected) {
                // Unselect this chunk
                Debug.log(`ChunkSelectionHandler: Unselecting chunk ${chunkId} as it was already selected`, null, 3);

                // Remove from selections
                delete this.selections[chunkId];

                // Remove from diffConfig if it exists
                if (this.chunkManager.diffViewer?.diffConfig?.chunkSelections) {
                    delete this.chunkManager.diffViewer.diffConfig.chunkSelections[chunkId];
                }

                // Reset visual state for both sides
                this.visualStateManager.resetVisualState(chunkId);

                // Remove resolved status from all elements with this chunk ID
                const chunkElements = ChunkUtils.getChunkElements(chunkId);
                chunkElements.forEach(element => {
                    element.classList.remove(Selectors.STATUS.RESOLVED.name());
                    element.classList.add(Selectors.STATUS.UNRESOLVED.name());
                });

                // Update navigation counter
                this._updateNavigationCounter();

                // Notify about selection change
                if (typeof this.chunkManager.onSelectionChange === 'function') {
                    this.chunkManager.onSelectionChange();
                }
            } else {
                // Get the opposite side
                const oppositeSide = side === 'left' ? 'right' : 'left';

                // Debug before toggling
                Debug.log(`ChunkSelectionHandler: Toggling chunk ${chunkId}`, {
                    selectedSide: side,
                    oppositeSide: oppositeSide
                }, 3);

                // Toggle both sides
                this.toggleChunkSelection(chunkId, side, this.SELECTED);
                this.toggleChunkSelection(chunkId, oppositeSide, this.UNSELECTED);
            }
        }
    }

    /**
     * Toggle selection state of a chunk side
     * @param {string} chunkId - Chunk ID
     * @param {string} side - 'left' or 'right'
     * @param {string} state - Selection state constant (SELECTED or UNSELECTED)
     * @param {boolean} batch - Whether to use batching (default: false for backward compatibility)
     */
    toggleChunkSelection(chunkId, side, state, batch = false) {
        // Update the selections object
        if (state === this.SELECTED) {
            this.selections[chunkId] = side;

            // Sync with diffConfig for compatibility
            this._syncWithDiffConfig(chunkId, side);

            // Update the navigation counter
            this._updateNavigationCounter();

            if (!batch) {
                // Add resolved status to all elements with this chunk ID
                const chunkElements = ChunkUtils.getChunkElements(chunkId);
                chunkElements.forEach(element => {
                    element.classList.add(Selectors.STATUS.RESOLVED.name());
                    element.classList.remove(Selectors.STATUS.UNRESOLVED.name());
                });
            }
        }

        // Update visual selection using the specialized component
        this.visualStateManager.updateVisualState(chunkId, side, state, batch);
    }

    /**
     * Sync selection with diffConfig
     * @private
     */
    _syncWithDiffConfig(chunkId, side) {
        if (this.chunkManager.diffViewer?.diffConfig?.chunkSelections) {
            this.chunkManager.diffViewer.diffConfig.chunkSelections[chunkId] = side;
        }
    }

    /**
     * Update navigation counter
     * @private
     */
    _updateNavigationCounter() {
        if (this.chunkManager.diffViewer?.diffNavigator) {
            this.chunkManager.diffViewer.diffNavigator.updateCounter();
        }
    }

    /**
     * Get all selections
     * @returns {Object} Map of chunkId to selected side
     */
    getSelections() {
        return {...this.selections};
    }

    /**
     * Check if a chunk is resolved (has selection)
     * @param {string} chunkId - Chunk ID to check
     * @returns {boolean} True if resolved
     */
    isChunkResolved(chunkId) {
        return !!this.selections[chunkId];
    }

    /**
     * Get unresolved chunk count
     * @returns {number} Number of unresolved chunks
     */
    getUnresolvedCount() {
        const conflictChunks = this.chunkManager.chunks.filter(c => c.conflict);
        return conflictChunks.length - Object.keys(this.selections).length;
    }

    /**
     * Clear all selections from both sides
     * @param {boolean} useBatch - Whether to use batching for performance (default: false for backward compatibility)
     */
    clearAllSelections(useBatch = false) {
        // Get all chunks that need resolution
        const conflictChunks = this.chunkManager.chunks.filter(chunk =>
            chunk.conflict || chunk.type === 'replace' || chunk.type === 'add' || chunk.type === 'delete'
        );

        // Check if we should use batching based on number of chunks
        const largeDiff = conflictChunks.length > 20; // Threshold for considering a diff as "large"
        useBatch = useBatch || largeDiff;

        // Show loader for large operations
        let loaderId = null;
        if (useBatch) {
            const selectedChunks = conflictChunks.filter(chunk => this.isChunkResolved(chunk.id));
            if (selectedChunks.length > 50) { // Only show loader for large batches
                const translationManager = TranslationManager.getInstance();
                const loaderManager = LoaderManager.getInstance();
                const message = translationManager.get('processingChunks') || 'Processing chunks...';
                loaderId = loaderManager.showLoader(message, {
                    fullscreen: true,
                    zIndex: 9999
                });
            }
        }

        // Start tracking performance
        const startTime = performance.now();

        if (useBatch) {
            Debug.log(`ChunkSelectionHandler: Clearing all selections using batch operations`, null, 2);

            // First update internal state
            const selectedChunks = conflictChunks.filter(chunk => this.isChunkResolved(chunk.id));

            // Use a set for faster lookups
            const selectedChunkIds = new Set(selectedChunks.map(chunk => chunk.id));

            // Collect all elements that need updating
            const elementsToUpdate = new Map();

            // Remove from internal objects efficiently
            selectedChunkIds.forEach(chunkId => {
                // Remove from selections object
                delete this.selections[chunkId];

                // Remove from diffConfig if it exists
                if (this.chunkManager.diffViewer?.diffConfig?.chunkSelections) {
                    delete this.chunkManager.diffViewer.diffConfig.chunkSelections[chunkId];
                }

                // Queue visual state reset with batching
                this.visualStateManager.resetVisualState(chunkId, true);

                // Collect elements for later class updates
                const elements = ChunkUtils.getChunkElements(chunkId);
                elementsToUpdate.set(chunkId, elements);
            });

            // Apply all visual updates in a batch
            this.visualStateManager.applyBatch(false); // Don't notify yet

            // Update element status classes in a separate batch
            requestAnimationFrame(() => {
                elementsToUpdate.forEach((elements, _chunkId) => {
                    elements.forEach(element => {
                        element.classList.remove(Selectors.STATUS.RESOLVED.name());
                        element.classList.add(Selectors.STATUS.UNRESOLVED.name());
                    });
                });

                // Update navigation counter after all visual changes
                this._updateNavigationCounter();

                // Now notify about selection change
                if (typeof this.chunkManager.onSelectionChange === 'function') {
                    this.chunkManager.onSelectionChange();
                }

                // Hide loader if it was shown
                if (loaderId) {
                    const loaderManager = LoaderManager.getInstance();
                    loaderManager.hideLoader(loaderId);
                }

                // Record performance metrics after all operations
                this._recordPerformanceMetrics(startTime);
            });
        } else {
            // Legacy approach - clear selection for each chunk individually
            conflictChunks.forEach(chunk => {
                // Skip chunks that aren't selected
                if (!this.isChunkResolved(chunk.id)) return;

                // Remove resolved status from all elements with this chunk ID
                const chunkElements = ChunkUtils.getChunkElements(chunk.id);
                chunkElements.forEach(element => {
                    element.classList.remove(Selectors.STATUS.RESOLVED.name());
                    element.classList.add(Selectors.STATUS.UNRESOLVED.name());
                });

                // Remove from selections object
                delete this.selections[chunk.id];

                // Remove from diffConfig if it exists
                if (this.chunkManager.diffViewer?.diffConfig?.chunkSelections) {
                    delete this.chunkManager.diffViewer.diffConfig.chunkSelections[chunk.id];
                }

                // Reset visual state for both sides
                this.visualStateManager.resetVisualState(chunk.id);
            });

            // Update navigation counter
            this._updateNavigationCounter();

            // Callback to notify of selection change
            if (typeof this.chunkManager.onSelectionChange === 'function') {
                this.chunkManager.onSelectionChange();
            }

            // Record performance metrics
            this._recordPerformanceMetrics(startTime);
        }
    }
}
