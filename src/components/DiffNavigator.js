import { Debug } from '../utils/Debug';

import { NavigationCounter } from './navigator/NavigationCounter';
import { NavigationUIBuilder } from './navigator/NavigationUIBuilder';
import { ConflictNavigator } from './navigator/ConflictNavigator';

/**
 * DiffNavigator handles navigation between conflicting chunks
 */
export class DiffNavigator {
    /**
     * @param {DiffViewer} diffViewer - Parent diff viewer component
     * @param {boolean} initializeImmediately - Whether to initialize navigation immediately
     */
    constructor(diffViewer, initializeImmediately = true) {
        this.diffViewer = diffViewer;
        this.currentChunkIndex = -1;

        // Validate that the diffViewer has a valid configuration
        if (!this.diffViewer || !this.diffViewer.chunkManager) {
            Debug.error('DiffNavigator: Failed to initialize - diffViewer or chunkManager is missing', null, 1);
            return;
        }

        // Create subcomponents
        this.navigationCounter = new NavigationCounter(this);
        this.uiBuilder = new NavigationUIBuilder(this);
        this.conflictNavigator = new ConflictNavigator(this);

        // Initialize navigation only if requested
        if (initializeImmediately) {
            this.initNavigation();
        }

        Debug.log('DiffNavigator: Component created', null, 2);
    }

    /**
     * Initialize navigation
     */
    initNavigation() {
        Debug.log('DiffNavigator: Initializing', null, 2);

        // Validate that we have chunks before proceeding
        if (!this.diffViewer.chunkManager.chunks || this.diffViewer.chunkManager.chunks.length === 0) {
            Debug.warn('DiffNavigator: No diff chunks found in configuration', {
                configChunks: this.diffViewer.chunkManager.chunks,
                diffConfig: this.diffViewer.diffConfig
            }, 1);

            // Add navigation UI anyway for better UX, but disable buttons
            this.addNavigationButtons(true);
            return;
        }

        // Add navigation UI
        this.addNavigationButtons();

        // Add keyboard shortcuts
        this.setupKeyboardShortcuts();

        // Navigate to first conflict if any
        this.navigateToFirstConflict();

        Debug.log('DiffNavigator: Initialized with chunk navigation',
            { chunks: this.diffViewer.chunkManager.chunks?.length || 0 }, 2);
    }

    /**
     * Add navigation buttons to the interface
     * @param {boolean} disableButtons - Whether to disable navigation buttons
     */
    addNavigationButtons(disableButtons = false) {
        // Create UI elements
        const ui = this.uiBuilder.createNavigationUI();

        if (!ui) return;

        // Save references to counter and buttons
        this.navigationCounter.setCounterElement(ui.counter);
        this.navigationCounter.setButtons(ui.prevButton, ui.nextButton);

        // Disable buttons if requested
        if (disableButtons) {
            ui.prevButton.disabled = true;
            ui.nextButton.disabled = true;
            ui.counter.textContent = 'No diff data';
        } else {
            // Update counter with current count
            this.updateCounter();
        }
    }

    /**
     * Set up keyboard shortcuts for navigation
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            // Only handle if not in input or textarea
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
                return;
            }

            // Check for navigation keys
            switch (event.key) {
                case 'ArrowDown':
                    if (event.ctrlKey || event.metaKey) {
                        event.preventDefault();
                        this.navigateToNextConflict();
                    }
                    break;

                case 'ArrowUp':
                    if (event.ctrlKey || event.metaKey) {
                        event.preventDefault();
                        this.navigateToPrevConflict();
                    }
                    break;
            }
        });
    }

    /**
     * Update navigation counter
     * @returns {Array} Active conflicts
     */
    updateCounter() {
        return this.navigationCounter.updateCounter();
    }

    /**
     * Navigate to the first conflict
     */
    navigateToFirstConflict() {
        // Verify chunks exist before attempting navigation
        if (!this.diffViewer.chunkManager.chunks || this.diffViewer.chunkManager.chunks.length === 0) {
            Debug.warn('DiffNavigator: Cannot navigate - no chunks available', null, 2);
            return false;
        }

        return this.conflictNavigator.navigateToFirstConflict();
    }

    /**
     * Navigate to the next conflict
     */
    navigateToNextConflict() {
        // Verify chunks exist before attempting navigation
        if (!this.diffViewer.chunkManager.chunks || this.diffViewer.chunkManager.chunks.length === 0) {
            Debug.warn('DiffNavigator: Cannot navigate - no chunks available', null, 2);
            return false;
        }

        return this.conflictNavigator.navigateToNextConflict();
    }

    /**
     * Navigate to the previous conflict
     */
    navigateToPrevConflict() {
        // Verify chunks exist before attempting navigation
        if (!this.diffViewer.chunkManager.chunks || this.diffViewer.chunkManager.chunks.length === 0) {
            Debug.warn('DiffNavigator: Cannot navigate - no chunks available', null, 2);
            return false;
        }

        return this.conflictNavigator.navigateToPrevConflict();
    }

    /**
     * Navigate to a specific chunk
     * @param {number} index - Chunk index
     * @returns {boolean} Success status
     */
    navigateToChunk(index) {
        // Verify chunks exist before attempting navigation
        if (!this.diffViewer.chunkManager.chunks || this.diffViewer.chunkManager.chunks.length === 0) {
            Debug.warn('DiffNavigator: Cannot navigate - no chunks available', null, 2);
            return false;
        }

        return this.conflictNavigator.navigateToChunk(index);
    }

    /**
     * Destroy component and clean up event handlers
     */
    destroy() {
        this.uiBuilder.destroy();
        Debug.log('DiffNavigator: Destroyed', null, 2);
    }
}
