import Selectors from '../constants/Selectors';
import { Debug } from '../utils/Debug';

// Cache for chunk elements to avoid repeated DOM queries
const _elementCache = {};
const _iconMarkerCache = {};
const _rowCache = {};
let _chunkIndex = null;

// Cache statistics for diagnostics
const _cacheStats = {
    elementCacheHits: 0,
    elementCacheMisses: 0,
    iconMarkerCacheHits: 0,
    iconMarkerCacheMisses: 0,
    rowCacheHits: 0,
    rowCacheMisses: 0
};

/**
 * Utility functions specific to chunk operations
 */
export class ChunkUtils {
    /**
     * Clear the element cache
     * Should be called when the DOM structure changes significantly
     */
    static clearCache() {
        Object.keys(_elementCache).forEach(key => delete _elementCache[key]);
        Object.keys(_iconMarkerCache).forEach(key => delete _iconMarkerCache[key]);
        Object.keys(_rowCache).forEach(key => delete _rowCache[key]);
        _chunkIndex = null;
        Debug.log('ChunkUtils: Cache cleared', null, 2);
    }

    /**
     * Get cache statistics
     * @returns {Object} Current cache statistics
     */
    static getCacheStats() {
        return {..._cacheStats};
    }

    /**
     * Preload all chunk elements into cache
     * This dramatically improves performance when working with large files
     * @returns {Object} Index of all chunks and their elements
     */
    static preloadChunks() {
        const startTime = performance.now();

        // Clear existing cache first
        ChunkUtils.clearCache();

        // Initialize chunk index
        _chunkIndex = {
            byId: {},
            byLineId: {},
            allChunkIds: new Set()
        };

        // Get all chunk elements in one query
        const allChunkElements = document.querySelectorAll(`${Selectors.DIFF.CHUNK}[data-chunk-id]`);
        Debug.log(`ChunkUtils: Preloading ${allChunkElements.length} chunk elements`, null, 2);

        // Process all chunk elements
        allChunkElements.forEach(element => {
            const chunkId = element.getAttribute('data-chunk-id');
            const side = element.getAttribute('data-side');
            const lineId = element.getAttribute('data-line-id');

            if (!chunkId) return;

            // Add to chunk index
            _chunkIndex.allChunkIds.add(chunkId);

            // Initialize chunk in index if needed
            if (!_chunkIndex.byId[chunkId]) {
                _chunkIndex.byId[chunkId] = {
                    elements: {
                        all: [],
                        left: [],
                        right: []
                    },
                    lineIds: new Set()
                };
            }

            // Add element to appropriate collections
            _chunkIndex.byId[chunkId].elements.all.push(element);
            if (side === 'left') {
                _chunkIndex.byId[chunkId].elements.left.push(element);
            } else if (side === 'right') {
                _chunkIndex.byId[chunkId].elements.right.push(element);
            }

            // Track line ID and add to line index
            if (lineId) {
                _chunkIndex.byId[chunkId].lineIds.add(lineId);

                // Add to line index for quick lookup
                _chunkIndex.byLineId[lineId] = {
                    chunkId: chunkId,
                    element: element
                };

                // Also cache the element's parent row
                const row = element.closest('tr');
                if (row) {
                    _rowCache[element.dataset.lineId] = row;
                }
            }

            // Add to element cache directly to avoid later queries
            // 1. All elements for chunk
            const allCacheKey = `${chunkId}:both`;
            if (!_elementCache[allCacheKey]) {
                _elementCache[allCacheKey] = [];
            }
            _elementCache[allCacheKey].push(element);

            // 2. Side-specific elements
            if (side) {
                const sideCacheKey = `${chunkId}:${side}`;
                if (!_elementCache[sideCacheKey]) {
                    _elementCache[sideCacheKey] = [];
                }
                _elementCache[sideCacheKey].push(element);
            }
        });

        // Preload all icon markers
        const allIconMarkers = document.querySelectorAll(`${Selectors.ICONS.MARKER}[data-line-id]`);
        Debug.log(`ChunkUtils: Preloading ${allIconMarkers.length} icon markers`, null, 2);

        allIconMarkers.forEach(marker => {
            const lineId = marker.getAttribute('data-line-id');
            if (lineId) {
                _iconMarkerCache[lineId] = marker;

                // Also associate with chunk if possible
                if (_chunkIndex.byLineId[lineId]) {
                    const chunkId = _chunkIndex.byLineId[lineId].chunkId;
                    if (!_chunkIndex.byId[chunkId].iconMarkers) {
                        _chunkIndex.byId[chunkId].iconMarkers = [];
                    }
                    _chunkIndex.byId[chunkId].iconMarkers.push(marker);
                }
            }
        });

        const duration = performance.now() - startTime;
        Debug.log(`ChunkUtils: Preloaded ${Object.keys(_chunkIndex.byId).length} chunks in ${duration.toFixed(2)}ms`, null, 2);

        return _chunkIndex;
    }

    /**
     * Get all chunk IDs in the document
     * @returns {Array} Array of chunk IDs
     */
    static getAllChunkIds() {
        // Ensure index is built
        if (!_chunkIndex) {
            ChunkUtils.preloadChunks();
        }

        return Array.from(_chunkIndex.allChunkIds);
    }

    /**
     * Sort elements by line number
     * @param {Array|NodeList} elements - Elements to sort
     * @returns {Array} Sorted elements
     */
    static sortElementsByLineNumber(elements) {
        return Array.from(elements).sort((a, b) => {
            const aLineNum = parseInt(a.dataset.lineId?.split('-').pop() || '0', 10);
            const bLineNum = parseInt(b.dataset.lineId?.split('-').pop() || '0', 10);
            return aLineNum - bLineNum;
        });
    }

    /**
     * Find elements by chunk ID
     * @param {string} chunkId - The chunk ID to find
     * @param {string} side - Optional side ('left' or 'right')
     * @returns {Array} Matching elements
     */
    static getChunkElements(chunkId, side = null) {
        if (!chunkId) return [];

        // Create cache key
        const cacheKey = `${chunkId}:${side || 'both'}`;

        // Use cached elements if available
        if (_elementCache[cacheKey]) {
            _cacheStats.elementCacheHits++;
            return _elementCache[cacheKey];
        }

        _cacheStats.elementCacheMisses++;

        // Check if we have the chunk index built
        if (_chunkIndex && _chunkIndex.byId[chunkId]) {
            let elements;
            if (side === 'left') {
                elements = _chunkIndex.byId[chunkId].elements.left;
            } else if (side === 'right') {
                elements = _chunkIndex.byId[chunkId].elements.right;
            } else {
                elements = _chunkIndex.byId[chunkId].elements.all;
            }

            // Cache the result
            _elementCache[cacheKey] = elements;
            return elements;
        }

        // Fall back to DOM queries if index not available
        let elements;
        if (side) {
            elements = Array.from(document.querySelectorAll(`${Selectors.DIFF.CHUNK}[data-chunk-id="${chunkId}"][data-side="${side}"]`));
        } else {
            elements = Array.from(document.querySelectorAll(`${Selectors.DIFF.CHUNK}[data-chunk-id="${chunkId}"]`));
        }

        // Cache the result
        _elementCache[cacheKey] = elements;
        return elements;
    }

    /**
     * Get all icon markers for a chunk ID
     * @param {string} chunkId - The chunk ID
     * @returns {Array} Array of icon marker elements
     */
    static getChunkIconMarkers(chunkId) {
        if (!chunkId) return [];

        // Check if we have the chunk index built
        if (_chunkIndex && _chunkIndex.byId[chunkId]) {
            return _chunkIndex.byId[chunkId].iconMarkers || [];
        }

        // If not in index, collect markers by getting line IDs from chunk elements
        const elements = ChunkUtils.getChunkElements(chunkId);
        const markers = [];

        elements.forEach(element => {
            const lineId = element.dataset.lineId;
            if (lineId) {
                const marker = ChunkUtils.getIconMarker(lineId);
                if (marker) {
                    markers.push(marker);
                }
            }
        });

        return markers;
    }

    /**
     * Get icon markers by chunk ID and line ID
     * @param {string} lineId - The line ID
     * @returns {Element|null} Icon marker element or null
     */
    static getIconMarker(lineId) {
        if (!lineId) return null;

        // Use cached marker if available
        if (_iconMarkerCache[lineId]) {
            _cacheStats.iconMarkerCacheHits++;
            return _iconMarkerCache[lineId];
        }

        _cacheStats.iconMarkerCacheMisses++;

        // If we have the index, check there first
        if (_chunkIndex && _chunkIndex.byLineId[lineId]) {
            // Get associated chunk and find marker
            const chunkId = _chunkIndex.byLineId[lineId].chunkId;
            if (_chunkIndex.byId[chunkId].iconMarkers) {
                // Find marker with matching line ID
                const marker = _chunkIndex.byId[chunkId].iconMarkers.find(m =>
                    m.getAttribute('data-line-id') === lineId);

                if (marker) {
                    _iconMarkerCache[lineId] = marker;
                    return marker;
                }
            }
        }

        // Fall back to DOM query
        const iconMarker = document.querySelector(`${Selectors.ICONS.MARKER}[data-line-id="${lineId}"]`);

        // Cache the result
        if (iconMarker) {
            _iconMarkerCache[lineId] = iconMarker;
        }

        return iconMarker;
    }

    /**
     * Get parent row of an element
     * @param {Element} element - The element
     * @returns {Element|null} Parent row element or null
     */
    static getParentRow(element) {
        if (!element) return null;

        const lineId = element.dataset.lineId;

        // Use cached row if available
        if (lineId && _rowCache[lineId]) {
            _cacheStats.rowCacheHits++;
            return _rowCache[lineId];
        }

        _cacheStats.rowCacheMisses++;
        const row = element.closest('tr');

        // Cache the result if line ID is available
        if (lineId && row) {
            _rowCache[lineId] = row;
        }

        return row;
    }

    /**
     * Generate file content from line objects
     * @param {Array} lines - Array of line objects
     * @returns {string} Generated file content
     */
    static generateFileContent(lines) {
        return lines
            .filter(line => line.type === 'content')
            .map(line => line.line)
            .join('\n');
    }
}
