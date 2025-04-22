import { Debug } from '../../utils/Debug';
import Selectors from '../../constants/Selectors';

/**
 * Manages icon marker creation and positioning
 */
export class IconMarkerManager {
    /**
     * @param {DiffViewer} diffViewer - Parent diff viewer
     */
    constructor(diffViewer) {
        this.diffViewer = diffViewer;
    }

    /**
     * Initialize icon markers with proper scroll synchronization
     */
    initializeIconMarkers() {
        // Measure actual cell height for accurate positioning
        const cellHeight = this._calculateCellHeight();
        document.documentElement.style.setProperty('--cell-height', `${cellHeight}px`);

        // Process each diff pane
        const panes = this.diffViewer.container.querySelectorAll(Selectors.DIFF.PANE);

        panes.forEach(pane => {
            this._setupIconColumn(pane);
        });

        // Use a dedicated method to handle all height updates
        this._updateIconColumnHeights();

        // Set up future height updates for window resizing
        this._setupIconHeightUpdater();
    }

    /**
     * Set up icon column for a pane
     * @private
     */
    _setupIconColumn(pane) {
        // Get the content container (scrollable area)
        const content = pane.querySelector(Selectors.DIFF.PANE_CONTENT);
        if (!content) return;

        // Get code table wrapper to match height
        const codeTableWrapper = content.querySelector(Selectors.DIFF.TABLE_WRAPPER);
        if (!codeTableWrapper) {
            Debug.warn('IconMarkerManager: Code table wrapper not found', null, 2);
            return;
        }

        // Create or get icon column
        let iconColumn = pane.querySelector(`:scope > ${Selectors.ICONS.COLUMN}`);
        if (!iconColumn) {
            iconColumn = document.createElement('div');
            iconColumn.className = Selectors.ICONS.COLUMN.name();
            pane.appendChild(iconColumn);
        }

        // Get all cells with chunk IDs
        const chunkCells = content.querySelectorAll(
            `${Selectors.DIFF.LINE_CONTENT}[data-chunk-id]:not([data-chunk-id=""]), ` +
            `${Selectors.DIFF.LINE_PLACEHOLDER}[data-chunk-id]:not([data-chunk-id=""]), ` +
            `${Selectors.DIFF.LINE_CONTENT_EMPTY}[data-chunk-id]:not([data-chunk-id=""])`
        );

        // Organize cells by chunk ID
        const chunkGroups = {};
        chunkCells.forEach(cell => {
            const chunkId = cell.dataset.chunkId;
            if (!chunkGroups[chunkId]) {
                chunkGroups[chunkId] = [];
            }
            chunkGroups[chunkId].push(cell);
        });

        // Process only the first cell of each chunk
        Object.keys(chunkGroups).forEach(chunkId => {
            // Sort by line number
            chunkGroups[chunkId].sort((a, b) => {
                const aLineNum = parseInt(a.dataset.lineId.split('-').pop(), 10);
                const bLineNum = parseInt(b.dataset.lineId.split('-').pop(), 10);
                return aLineNum - bLineNum;
            });

            // Get the first cell in the sorted group
            const firstCell = chunkGroups[chunkId][0];

            if (firstCell) {
                this._createIconMarker(firstCell, iconColumn);
            }
        });

        // Store table height for later use
        if (codeTableWrapper) {
            const tableHeight = codeTableWrapper.scrollHeight;
            pane.dataset.tableHeight = tableHeight;
        }

        // Set up scroll synchronization
        content.addEventListener('scroll', () => {
            // Sync vertical scroll position with requestAnimationFrame
            requestAnimationFrame(() => {
                iconColumn.style.transform = `translateY(-${content.scrollTop}px)`;
            });

            // Handle horizontal scroll state
            if (content.scrollLeft > 0) {
                pane.classList.add(Selectors.STATUS.SCROLLED.name());
            } else {
                pane.classList.remove(Selectors.STATUS.SCROLLED.name());
            }
        }, { passive: true });

        // Initial position
        iconColumn.style.transform = `translateY(-${content.scrollTop}px)`;
    }

    /**
     * Create a single icon marker for a cell
     * @private
     */
    _createIconMarker(cell, iconColumn) {
        const lineId = cell.dataset.lineId;
        if (!lineId) return;

        // Check if marker already exists
        let marker = iconColumn.querySelector(`${Selectors.ICONS.MARKER}[data-line-id="${lineId}"]`);

        // Create new marker only if it doesn't exist
        if (!marker) {
            marker = document.createElement('div');
            marker.className = Selectors.ICONS.MARKER.name();

            // Add class for placeholder lines
            if (cell.classList.contains(Selectors.DIFF.LINE_PLACEHOLDER.name())) {
                marker.classList.add(Selectors.ICONS.MARKER_PLACEHOLDER.name());
            }

            // Use line ID for matching
            marker.dataset.lineId = lineId;

            // Set position index
            const lineNumber = lineId.split('-').pop();
            marker.dataset.iconIndex = lineNumber;
            marker.style.setProperty('--icon-index', lineNumber);

            // DO NOT transfer selection state classes - they will be managed by ChunkVisualStateManager
            // Selection state and placeholder status are orthogonal concepts and should be managed separately

            // Add to icon column
            iconColumn.appendChild(marker);
        }
    }

    /**
     * Calculate cell height with maximum precision
     * @private
     * @returns {number} Precise cell height in pixels
     */
    _calculateCellHeight() {
        // Get multiple line number cells for better accuracy
        const lineNumberCells = this.diffViewer.container.querySelectorAll(Selectors.CODE.LINE_NUMBER);

        if (!lineNumberCells || lineNumberCells.length === 0) {
            Debug.log('IconMarkerManager: No line number cells found, using default height', null, 2);
            return 20.5; // Fallback height
        }

        // Take the median height from first few cells (more reliable than just the first)
        const heights = [];
        const sampleSize = Math.min(5, lineNumberCells.length);

        for (let i = 0; i < sampleSize; i++) {
            heights.push(lineNumberCells[i].getBoundingClientRect().height);
        }

        // Sort heights and take the median (middle) value
        heights.sort((a, b) => a - b);
        const medianHeight = heights[Math.floor(heights.length / 2)];

        Debug.log(`IconMarkerManager: Sampled heights: ${heights.join(', ')}, using median: ${medianHeight}px`, null, 3);

        return medianHeight;
    }

    /**
     * Set up height updater for window resizing
     * @private
     */
    _setupIconHeightUpdater() {
        // Debounce to avoid excessive updates
        let resizeTimer;

        // Add window resize listener
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this._updateIconColumnHeights();
            }, 100);
        });

        // Initial update
        this._updateIconColumnHeights();
    }

    /**
     * Update all icon column heights
     * @private
     */
    _updateIconColumnHeights() {
        const panes = this.diffViewer.container.querySelectorAll(Selectors.DIFF.PANE);
        const heights = {}; // Track heights for logging

        panes.forEach(pane => {
            const content = pane.querySelector(Selectors.DIFF.PANE_CONTENT);
            const iconColumn = pane.querySelector(Selectors.ICONS.COLUMN);
            const codeTableWrapper = content?.querySelector(Selectors.DIFF.TABLE_WRAPPER);

            if (iconColumn && codeTableWrapper) {
                const tableHeight = codeTableWrapper.scrollHeight;
                const currentHeight = parseInt(iconColumn.style.height) || 0;

                // Only update if height changed significantly
                if (Math.abs(currentHeight - tableHeight) > 5) {
                    iconColumn.style.height = `${tableHeight}px`;
                    heights[pane.dataset.side || 'pane'] = tableHeight;
                }
            }
        });

        // Log all height updates in one message
        if (Object.keys(heights).length > 0) {
            Debug.log('IconMarkerManager: Updated icon column heights:', heights, 3);
        }
    }
}
