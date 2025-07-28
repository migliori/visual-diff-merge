// ChunkManager.js - Manages diff chunks and coordinates chunk components
import { Debug } from '../utils/Debug';
import { ChunkUtils } from '../utils/ChunkUtils';
import Selectors from '../constants/Selectors';

import { ChunkRenderer } from './chunks/ChunkRenderer';
import { ChunkSelectionHandler } from './chunks/ChunkSelectionHandler';
import { MergeContentGenerator } from './chunks/MergeContentGenerator';

/**
 * Manages diff chunks and coordinates chunk components
 */
export class ChunkManager {
    /**
     * @param {DiffViewer} diffViewer - Parent diff viewer
     */
    constructor(diffViewer) {
        this.diffViewer = diffViewer;
        this.chunks = [];
        this.oldContent = [];
        this.newContent = [];
        this.chunkElements = [];

        // Create sub-components
        this.renderer = new ChunkRenderer(this);
        this.selectionHandler = new ChunkSelectionHandler(this);
        this.contentGenerator = new MergeContentGenerator(this);

        // Define selection state constants
        this.SELECTED_STATE = Selectors.DIFF.CHUNK_SELECTED.name();
        this.UNSELECTED_STATE = Selectors.DIFF.CHUNK_UNSELECTED.name();

        // Performance tracking
        this._performanceMetrics = {
            initTime: 0,
            renderTime: 0,
            chunkCount: 0
        };

        Debug.log('ChunkManager: Component initialized', null, 2);
    }

    /**
     * Initialize chunks from diff data
     * @param {Object} diffData - Diff data
     */
    initChunks(diffData) {
        const startTime = performance.now();
        Debug.log('ChunkManager: Initializing chunks from diff data', null, 2);

        // Clear previous cache state
        ChunkUtils.clearCache();

        // Save chunks data
        this.chunks = diffData.chunks || [];
        this.oldContent = diffData.old || [];
        this.newContent = diffData.new || [];

        // Track chunk count for performance metrics
        this._performanceMetrics.chunkCount = this.chunks.length;

        // Mark chunks with type 'replace' as conflicts for navigation
        this.chunks.forEach(chunk => {
            chunk.conflict = true;
        });

        Debug.log(`ChunkManager: ${this.chunks.length} chunks initialized`, null, 3);

        // Update navigation counter if available
        if (this.diffViewer.diffNavigator) {
            this.diffViewer.diffNavigator.updateCounter();
        }

        const endTime = performance.now();
        this._performanceMetrics.initTime = endTime - startTime;

        Debug.log(`ChunkManager: Initialization completed in ${this._performanceMetrics.initTime.toFixed(2)}ms`, null, 2);

        // Validate chunk structure
        this.validateChunkStructure();

        return this.chunks;
    }

    /**
     * Render chunks to container
     */
    renderChunks() {
        const startTime = performance.now();

        // Delegate to renderer component
        this.renderer.renderChunks();

        // Initialize the visual state manager
        if (this.selectionHandler.visualStateManager.initialize) {
            this.selectionHandler.visualStateManager.initialize();
        }

        // Setup chunk selection after rendering
        this.setupChunkSelection();

        // Initialize chunk elements for navigation
        this.initChunkElements();

        const endTime = performance.now();
        this._performanceMetrics.renderTime = endTime - startTime;

        Debug.log(`ChunkManager: Rendering completed in ${this._performanceMetrics.renderTime.toFixed(2)}ms`,
            {
                chunkCount: this._performanceMetrics.chunkCount,
                msPerChunk: (this._performanceMetrics.renderTime / Math.max(1, this._performanceMetrics.chunkCount)).toFixed(2)
            }, 2);

        return true;
    }

    /**
     * Setup chunk selection handlers
     */
    setupChunkSelection() {
        // Delegate to selection handler
        this.selectionHandler.setupChunkSelection();
    }

    /**
     * Toggle selection state of a chunk
     * @param {string} chunkId - Chunk ID
     * @param {string} side - 'left' or 'right'
     * @param {string} state - Selection state (this.SELECTED_STATE or this.UNSELECTED_STATE)
     */
    toggleChunkSelection(chunkId, side, state) {
        this.selectionHandler.toggleChunkSelection(chunkId, side, state);
    }

    /**
     * Generate merged content based on selections
     * @returns {string} Merged content
     */
    generateMergedContent() {
        const selections = this.selectionHandler.getSelections();
        return this.contentGenerator.generateMergedContent(selections);
    }

    /**
     * Generate content from lines array
     * @param {Array} lines - Array of line objects
     * @returns {string} Generated file content
     */
    generateFileFromLines(lines) {
        return this.contentGenerator.generateFileFromLines(lines);
    }

    /**
     * Initialize chunk elements array for navigation
     */
    initChunkElements() {
        // Create array to hold chunk elements
        this.chunkElements = [];

        // Debug total available chunks
        Debug.log(`ChunkManager: Looking for ${this.chunks.length} chunks in DOM`, null, 2);

        this.chunks.forEach((chunk, index) => {
            // Find elements for this chunk ID (using optimized cache query)
            const elements = ChunkUtils.getChunkElements(chunk.id);
            Debug.log(`ChunkManager: Chunk ID ${chunk.id}: Found ${elements.length} elements`, null, 3);

            if (elements.length > 0) {
                // Sort by line number to get the first element
                const sortedElements = ChunkUtils.sortElementsByLineNumber(elements);

                // Store the first element for this chunk
                this.chunkElements[index] = sortedElements[0];
            } else {
                Debug.warn(`ChunkManager: No DOM elements found for chunk ID: ${chunk.id}`, null, 2);
            }
        });

        const initializedCount = this.chunkElements.filter(Boolean).length;
        Debug.log(`ChunkManager: Initialized ${initializedCount}/${this.chunks.length} chunk elements for navigation`, null, 2);

        // Log warning if no elements were found
        if (initializedCount === 0 && this.chunks.length > 0) {
            Debug.error('ChunkManager: No chunk elements found in DOM. Navigation will not work properly.', null, 1);

            // Check if elements with the expected selector exist at all
            const anyChunkElements = document.querySelectorAll(Selectors.DIFF.CHUNK);
            Debug.warn(`ChunkManager: ${anyChunkElements.length} elements match the chunk selector ${Selectors.DIFF.CHUNK}`, null, 2);

            // Check if any elements have data-chunk-id attribute
            const anyChunkIdElements = document.querySelectorAll('[data-chunk-id]');
            Debug.warn(`ChunkManager: ${anyChunkIdElements.length} elements have data-chunk-id attribute`, null, 2);
        }
    }

    /**
     * Validate chunk data structure for proper merge operations
     */
    validateChunkStructure() {
        let validChunks = 0;
        let invalidChunks = 0;

        this.chunks.forEach(chunk => {
            // Check if chunk has proper old/new content arrays
            if (!chunk.old && !chunk.new) {
                Debug.warn(`ChunkManager: Chunk ${chunk.id} missing content arrays`, chunk, 2);
                invalidChunks++;
            } else if (chunk.type === 'replace' && (!chunk.old || !chunk.new)) {
                Debug.warn(`ChunkManager: Replace chunk ${chunk.id} missing old or new content`, chunk, 2);
                invalidChunks++;
            } else {
                validChunks++;
            }
        });

        Debug.log(`ChunkManager: Chunk validation complete`, {
            valid: validChunks,
            invalid: invalidChunks,
            total: this.chunks.length
        }, 2);

        return invalidChunks === 0;
    }

    /**
     * Get performance metrics for this component
     * @returns {Object} Performance metrics
     */
    getPerformanceMetrics() {
        const metrics = {
            ...this._performanceMetrics
        };

        // Add metrics from subcomponents
        if (this.selectionHandler.visualStateManager.getMetrics) {
            metrics.visualStateManager = this.selectionHandler.visualStateManager.getMetrics();
        }

        // Add cache stats
        metrics.cacheStats = ChunkUtils.getCacheStats();

        return metrics;
    }

    /**
     * Get selections
     * @returns {Object} Current selections
     */
    get selections() {
        return this.selectionHandler.getSelections();
    }

    /**
     * Handle selection change callback
     * This maintains compatibility with external code expecting this function
     */
    onSelectionChange() {
        // This can be overridden by DiffViewer
    }
}
