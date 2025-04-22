import { Debug } from '../../utils/Debug';
import { MergeContentFormatter } from '../../utils/MergeContentFormatter';
import { DOMUtils } from '../../utils/DOMUtils';
import { StringUtils } from '../../utils/StringUtils';
import { CopyButton } from '../syntax/CopyButton';
import Selectors from '../../constants/Selectors';
import { TranslationManager } from '../../utils/TranslationManager';
import { LoaderManager } from '../../utils/LoaderManager';

/**
 * Handles preview functionality for merges
 */
export class MergePreviewManager {
    /**
     * Initialize preview manager
     * @param {MergeHandler} mergeHandler - Parent merge handler
     */
    constructor(mergeHandler) {
        this.mergeHandler = mergeHandler;
        this.diffViewer = mergeHandler.diffViewer;
        this.modalManager = mergeHandler.modalManager;
    }

    /**
     * Initialize preview button and events
     * Sets up the preview button click handler
     */
    initialize() {
        // Set up the preview button event handler
        this.setupPreviewButton();
        Debug.log('MergePreviewManager: Initialized', null, 2);
    }

    /**
     * Set up the preview button with event handler
     * Recreates button to remove existing handlers
     */
    setupPreviewButton() {
        // Try to find the standard preview button first
        const previewButton = document.getElementById(Selectors.MERGE.BUTTON_PREVIEW.name());

        // If not found, check for the "Get merged result" button (used in local-only mode)
        const getMergedResultButton = !previewButton ?
            document.getElementById(Selectors.MERGE.GET_MERGED_RESULT_BTN.name()) : null;

        // Use whichever button is available
        const buttonToUse = previewButton || getMergedResultButton;

        if (!buttonToUse) {
            Debug.warn('MergePreviewManager: Preview button not found', null, 2);
            return;
        }

        // Remove any existing handlers by cloning
        const newBtn = buttonToUse.cloneNode(true);
        if (buttonToUse.parentNode) {
            buttonToUse.parentNode.replaceChild(newBtn, buttonToUse);
        }

        // Add the icon and text if needed (only for the regular preview button)
        if (buttonToUse === previewButton && (!newBtn.innerHTML || newBtn.innerHTML.trim() === '')) {
            newBtn.innerHTML = DOMUtils.getIconHtml('eye', { classes: 'me-2' }) + 'Preview';
        }

        // Add handler
        newBtn.addEventListener('click', this.handlePreviewClick.bind(this));
        Debug.log(`MergePreviewManager: ${buttonToUse === previewButton ? 'Preview' : 'Get merged result'} button handler set up`, null, 3);
    }

    /**
     * Handle preview button click
     * Generates preview content and shows in modal
     */
    handlePreviewClick() {
        Debug.log('MergePreviewManager: Preview button clicked', null, 2);

        // Get translation manager for loading message
        const translationManager = TranslationManager.getInstance();
        const loadingMessage = translationManager.get('loadingContent', 'Generating preview...');

        // Show loading indicator
        const loaderManager = LoaderManager.getInstance();
        const loaderId = loaderManager.showLoader(loadingMessage, {
            fullscreen: true,
            zIndex: 1000 // Ensure it appears above other UI elements
        });

        try {
            // Get the merged content from the content generator
            const mergedContent = this.mergeHandler.getMergedContent();

            // Get file extension from runtime properties instead of options
            const fileToMerge = this.diffViewer.runtimeProps?.filepath || '';
            const extension = fileToMerge.split('.').pop().toLowerCase();

            // Format the content for preview with line numbers
            const formattedContent = MergeContentFormatter.formatPreview(mergedContent, extension, true);

            // Hide loading indicator now that content is ready
            loaderManager.hideLoader(loaderId);

            // Set the filename in the preview modal title using DOMUtils
            DOMUtils.setContent(
                Selectors.MODAL.PREVIEW_FILENAME.name(),
                this.diffViewer.runtimeProps.filepath || 'merged-file'
            );

            // Use ModalManager to set content and open modal
            this.modalManager.setContent(
                Selectors.MODAL.PREVIEW.name(),
                formattedContent,
                Selectors.MODAL.PREVIEW_CONTENT_ID.name()
            );

            // Create controls container
            const controlsContainer = document.createElement('div');
            controlsContainer.classList.add(Selectors.UTILITY.FLEX.name(),
                                           Selectors.UTILITY.JUSTIFY_CONTENT_BETWEEN.name(),
                                           Selectors.UTILITY.MARGIN_TOP_2.name(),
                                           Selectors.UTILITY.PADDING_2.name());

            // Create message area
            const messageArea = document.createElement('div');
            messageArea.id = 'merge-preview-message';
            messageArea.classList.add(Selectors.UTILITY.FLEX.name(),
                                     Selectors.UTILITY.ALIGN_ITEMS_CENTER.name());
            controlsContainer.appendChild(messageArea);

            // Open the modal
            this.modalManager.open(Selectors.MODAL.PREVIEW.name());

            // Apply syntax highlighting if available
            this.applySyntaxHighlighting();

            // Add copy buttons to code blocks
            CopyButton.addCopyButtonsToPreview(Selectors.MODAL.PREVIEW_CONTENT_ID.name());

            Debug.log('MergePreviewManager: Preview opened successfully', null, 2);
        } catch (error) {
            // Hide loading indicator in case of error
            loaderManager.hideLoader(loaderId);

            Debug.error('MergePreviewManager: Error during preview:', error, 2);
            this.showPreviewError(error);
        }
    }

    /**
     * Apply syntax highlighting to preview content
     * Uses highlight.js if available
     */
    applySyntaxHighlighting() {
        if (!window.hljs) {
            Debug.log('MergePreviewManager: Highlight.js not available', null, 3);
            return;
        }

        try {
            // Use DOMUtils to get the preview element
            const preElement = DOMUtils.getElement(Selectors.MODAL.PREVIEW_CONTENT_ID.name())?.querySelector('pre');
            const codeElement = preElement?.querySelector('code');

            if (!codeElement) {
                Debug.warn('MergePreviewManager: No code element found for highlighting', null, 2);
                return;
            }

            // Apply syntax highlighting
            window.hljs.highlightElement(codeElement);

            // Add line numbers if the pre element has the data-line-numbers attribute
            if (preElement.getAttribute('data-line-numbers') === 'true' && window.hljs.lineNumbersBlock) {
                window.hljs.lineNumbersBlock(codeElement);
                Debug.log('MergePreviewManager: Line numbers added to preview', null, 3);
            }

            Debug.log('MergePreviewManager: Syntax highlighting applied', null, 3);
        } catch (error) {
            Debug.warn('MergePreviewManager: Error applying syntax highlighting:', error, 2);
        }
    }

    /**
     * Show error in preview modal
     * @param {Error} error - Error object
     */
    showPreviewError(error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        const escapedError = StringUtils.escapeHtml(errorMessage);

        // First clear the modal content
        this.modalManager.setContent(
            Selectors.MODAL.PREVIEW.name(),
            '',
            Selectors.MODAL.PREVIEW_CONTENT_ID.name()
        );

        // Then use DOMUtils to show the message
        DOMUtils.showMessage(
            Selectors.MODAL.PREVIEW_CONTENT_ID.name(),
            `<h4>Error Generating Preview</h4><p>${escapedError}</p>`,
            'danger',
            { className: '' } // No margin in modal
        );

        this.modalManager.open(Selectors.MODAL.PREVIEW.name());
    }
}
