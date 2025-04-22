// MergeHandler.js - Handles merging of selected lines
import { Debug } from '../utils/Debug';
import AlertManager from '../utils/AlertManager';

import { MergePreviewManager } from './merge/MergePreviewManager';
import { MergeUIController } from './merge/MergeUIController';
import { MergeOperationHandler } from './merge/MergeOperationHandler';


/**
 * Main coordinator for merge operations
 */
export class MergeHandler {
    /**
     * Initialize merge handler
     * @param {DiffViewer} diffViewer - Parent diff viewer
     */
    constructor(diffViewer) {
        this.diffViewer = diffViewer;

        // Use the shared modalManager instance
        this.modalManager = this.diffViewer.modalManager;

        // Create subcomponents using composition
        this.previewManager = new MergePreviewManager(this);
        this.uiController = new MergeUIController(this);
        this.operationHandler = new MergeOperationHandler(this);

        // Initialize components
        this.initialize();

        Debug.log('MergeHandler: Component initialized', null, 2);
    }

    /**
     * Initialize all subcomponents
     */
    initialize() {
        // Check if we should use server or local controls
        const runtimeProps = this.diffViewer.getRuntimeProps();
        const serverSaveEnabled = runtimeProps && runtimeProps.serverSaveEnabled;

        Debug.log(`MergeHandler: Initializing with serverSaveEnabled=${serverSaveEnabled}`, null, 2);

        // Initialize UI controller first
        this.uiController.initialize();

        // If server save is disabled, set up local-only controls
        if (serverSaveEnabled === false) {
            Debug.log('MergeHandler: Server save is disabled, using local-only controls', null, 2);
            this.uiController.setupLocalOnlyControls();
        }

        // Then initialize preview manager
        this.previewManager.initialize();

        Debug.log('MergeHandler: All subcomponents initialized', null, 2);
    }

    /**
     * Preview the merged file
     * Delegates to preview manager
     */
    previewMerge() {
        this.previewManager.handlePreviewClick();
    }

    /**
     * Generate merged content based on selections
     * @returns {string} Merged content
     */
    getMergedContent() {
        return this.diffViewer.chunkManager.generateMergedContent();
    }

    /**
     * Proceed with merge operation
     * Delegates to operation handler
     * @param {string} mergeType - Type of merge ('original' or 'new')
     * @returns {Promise} Promise resolving when merge completes
     */
    proceedWithMerge(mergeType) {
        return this.operationHandler.proceedWithMerge(mergeType);
    }

    /**
     * Count unresolved conflicts
     * Delegates to UI controller
     * @returns {number} Number of unresolved conflicts
     */
    countUnresolvedConflicts() {
        return this.uiController.countUnresolvedConflicts();
    }

    /**
     * Show conflict resolution modal
     * Delegates to UI controller
     * @param {number} unresolvedCount - Number of unresolved conflicts
     */
    showConflictModal(unresolvedCount) {
        this.uiController.showConflictModal(unresolvedCount);
    }

    /**
     * Highlight unresolved chunks
     * Delegates to UI controller
     */
    highlightUnresolvedChunks() {
        return this.uiController.highlightUnresolvedChunks();
    }

    /**
     * Create alert element with proper BEM classes
     * @param {boolean} resolved - Whether the conflict is resolved
     * @param {string} success_message - Success message to display
     * @param {string} message - Warning message to display
     * @returns {HTMLElement} Alert element
     */
    createAlertElement(resolved, success_message, message) {
        const alertManager = AlertManager.getInstance();

        if (resolved) {
            return alertManager.showSuccess(success_message, {
                timeout: 0, // Don't auto-dismiss
                translate: false // Message is already provided
            });
        } else {
            return alertManager.showWarning(message, {
                timeout: 0, // Don't auto-dismiss
                translate: false // Message is already provided
            });
        }
    }
}
