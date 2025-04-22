import { Debug } from '../../utils/Debug';
import { TranslationManager } from '../../utils/TranslationManager';
import { LoaderManager } from '../../utils/LoaderManager';
import AlertManager from '../../utils/AlertManager';

/**
 * Handles merge operation actions
 */
export class MergeOperationHandler {
    /**
     * @param {MergeHandler} mergeHandler - Parent merge handler
     */
    constructor(mergeHandler) {
        this.mergeHandler = mergeHandler;
        this.diffViewer = mergeHandler.diffViewer;
    }

    /**
     * Proceed with merge operation - this is the main entry point called from MergeHandler
     * @param {string} mergeType - Type of merge ('new', 'new-suffix', etc.)
     * @returns {Promise<Object>} Result object with success status
     */
    async proceedWithMerge(mergeType) {
        Debug.log('MergeOperationHandler: Proceeding with merge', { mergeType }, 2);

        // Get runtime properties to check context
        const runtimeProps = this.diffViewer.getRuntimeProps();
        const fileRefId = runtimeProps.fileRefId || '';
        const oldFileRefId = runtimeProps.oldFileRefId || '';

        // If mergeType requires file references but we don't have them,
        // automatically switch to clipboard mode
        if ((mergeType === 'new' || mergeType === 'new-suffix') && !fileRefId) {
            Debug.log('MergeOperationHandler: Switching to clipboard mode (no fileRefId available)', null, 2);
            mergeType = 'clipboard';
        } else if ((mergeType === 'old' || mergeType === 'old-suffix') && !oldFileRefId) {
            Debug.log('MergeOperationHandler: Switching to clipboard mode (no oldFileRefId available)', null, 2);
            mergeType = 'clipboard';
        } else if ((mergeType === 'both' || mergeType === 'both-suffix') && (!fileRefId || !oldFileRefId)) {
            Debug.log('MergeOperationHandler: Switching to clipboard mode (missing file reference IDs)', null, 2);
            mergeType = 'clipboard';
        }

        // Get translation manager for loading message
        const translationManager = TranslationManager.getInstance();
        const loadingMessage = translationManager.get('loadingContent', 'Processing merge...');

        // Show loading indicator
        const loaderManager = LoaderManager.getInstance();
        const loaderId = loaderManager.showLoader(loadingMessage, {
            fullscreen: true,
            zIndex: 1000 // Ensure it appears above other UI elements
        });

        try {
            // Generate merged content
            const mergedContent = this.diffViewer.chunkManager.generateMergedContent();

            // Apply the merge - skip server calls for clipboard type (text-compare, url-compare, file-upload)
            let result;
            if (mergeType === 'clipboard') {
                // For clipboard type, we don't need to save on server, just return success
                result = {
                    success: true,
                    message: translationManager.get('mergeSuccessClipboard', 'Merge completed successfully. The merged content is ready.')
                };
            } else {
                // For file-browser mode, apply the merge on server
                result = await this.applyMerge(mergedContent, mergeType);
            }

            // Hide loading indicator
            loaderManager.hideLoader(loaderId);

            // Show result message
            if (result.success) {
                // Get the result container and show success message
                const resultContainer = document.getElementById('vdm-merge__result');
                if (resultContainer) {
                    resultContainer.innerHTML = '';
                    resultContainer.classList.remove('vdm-d-none');

                    // Use AlertManager to show success message
                    const alertManager = AlertManager.getInstance();
                    const alertElement = alertManager.showSuccess(result.message, {
                        timeout: 0, // Don't auto-dismiss
                        translate: false // Message is already translated
                    });

                    resultContainer.appendChild(alertElement);

                    // Scroll to the result container
                    this.scrollToMergeResult();
                }
            } else {
                // Show error message
                const resultContainer = document.getElementById('vdm-merge__result');
                if (resultContainer) {
                    resultContainer.innerHTML = '';
                    resultContainer.classList.remove('vdm-d-none');

                    // Use AlertManager to show error message
                    const alertManager = AlertManager.getInstance();
                    const alertElement = alertManager.showError(result.message || 'An error occurred during the merge operation.', {
                        timeout: 0, // Don't auto-dismiss
                        translate: false // Message is already translated
                    });

                    resultContainer.appendChild(alertElement);

                    // Scroll to the result container
                    this.scrollToMergeResult();
                }
            }

            return result;
        } catch (error) {
            // Hide loading indicator in case of error
            loaderManager.hideLoader(loaderId);

            Debug.error('MergeOperationHandler: Error in merge operation', error, 1);

            // Show error message in UI
            const resultContainer = document.getElementById('vdm-merge__result');
            if (resultContainer) {
                resultContainer.innerHTML = '';
                resultContainer.classList.remove('vdm-d-none');

                // Use AlertManager to show error message
                const alertManager = AlertManager.getInstance();
                const errorMessage = `Error: ${error.message || 'An unexpected error occurred during merge.'}`;
                const alertElement = alertManager.showError(errorMessage, {
                    timeout: 0, // Don't auto-dismiss
                    translate: false // Error message doesn't need translation
                });

                resultContainer.appendChild(alertElement);
            }

            return {
                success: false,
                message: error.message || 'An unexpected error occurred during merge'
            };
        }
    }

    /**
     * Apply merged content to file
     * @param {string} mergedContent - Merged content
     * @param {string} mergeType - Merge type (new, new-suffix, old, old-suffix, both, both-suffix)
     * @returns {Promise<Object>} Result object with success status
     */
    async applyMerge(mergedContent, mergeType) {
        // Get the runtime properties - using only fileRefId, not server paths
        const runtimeProps = this.diffViewer.getRuntimeProps();

        // Get only the file reference IDs - security improvement
        const fileRefId = runtimeProps.fileRefId || '';
        const oldFileRefId = runtimeProps.oldFileRefId || '';

        Debug.log('MergeOperationHandler: File references for merge operation', {
            fileRefId,
            oldFileRefId,
            mergeType
        }, 2);

        // If no file references are available, automatically fall back to clipboard mode
        if (((mergeType === 'new' || mergeType === 'new-suffix') && !fileRefId) ||
            ((mergeType === 'old' || mergeType === 'old-suffix') && !oldFileRefId) ||
            ((mergeType === 'both' || mergeType === 'both-suffix') && (!fileRefId || !oldFileRefId))) {

            Debug.log('MergeOperationHandler: Switching to clipboard mode in applyMerge (missing file references)', null, 2);
            return {
                success: true,
                message: TranslationManager.getInstance().get('mergeSuccessClipboard', 'Merge completed successfully. The merged content is ready.')
            };
        }

        // Rest of original validation kept for safety
        if ((mergeType === 'new' || mergeType === 'new-suffix') && !fileRefId) {
            Debug.error('MergeOperationHandler: No file reference ID available for new file', null, 1);
            return {
                success: false,
                message: 'No file reference ID available to save changes to new file'
            };
        } else if ((mergeType === 'old' || mergeType === 'old-suffix') && !oldFileRefId) {
            Debug.error('MergeOperationHandler: No file reference ID available for old file', null, 1);
            return {
                success: false,
                message: 'No file reference ID available to save changes to old file'
            };
        } else if ((mergeType === 'both' || mergeType === 'both-suffix') && (!fileRefId || !oldFileRefId)) {
            Debug.error('MergeOperationHandler: Missing file reference IDs for both files', null, 1);
            return {
                success: false,
                message: 'Missing file reference IDs to save changes to both files'
            };
        }

        // Get selections and beautification status
        const selections = JSON.stringify(this.diffViewer.chunkManager.selections);
        const wasBeautified = this.diffViewer.isContentBeautified() ? 1 : 0;

        try {
            // SECURITY: Only use fileRefId - never pass server paths
            const formParams = {
                action: 'registerMergedContent',
                content: mergedContent,
                selections,
                mergeType,
                wasBeautified
            };

            // Add appropriate file reference IDs based on merge type
            if (mergeType === 'new' || mergeType === 'new-suffix' || mergeType === 'both' || mergeType === 'both-suffix') {
                formParams.fileRefId = fileRefId;
            }

            if (mergeType === 'old' || mergeType === 'old-suffix' || mergeType === 'both' || mergeType === 'both-suffix') {
                formParams.oldFileRefId = oldFileRefId;
            }

            Debug.log('MergeOperationHandler: Form parameters for save request', formParams, 2);

            // Get API endpoint
            const endpoint = await this.diffViewer.getEndpoint('ajaxDiffMerge');
            Debug.log('MergeOperationHandler: Using endpoint', { endpoint }, 2);

            // Send the request
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formParams)
            });

            // Parse response
            const result = await response.json();
            Debug.log('MergeOperationHandler: API response', result, 2);

            return result;
        } catch (error) {
            Debug.error("MergeOperationHandler: Error applying merge:", error, 1);
            return {
                success: false,
                message: `Error applying merge: ${error.message}`
            };
        }
    }

    /**
     * Scroll to the merge result container
     */
    scrollToMergeResult() {
        const resultElement = document.getElementById('vdm-merge__result');
        if (resultElement) {
            // Scroll the element into view with smooth behavior
            resultElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            Debug.log('MergeOperationHandler: Scrolled to merge result', null, 2);
        }
    }
}
