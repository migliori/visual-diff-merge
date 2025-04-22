import { Debug } from '../../utils/Debug';
import { DOMUtils } from '../../utils/DOMUtils';
import { ModalManager } from '../modal/ModalManager';
import { TranslationManager } from '../../utils/TranslationManager';
import Selectors from '../../constants/Selectors';

/**
 * Adds copy buttons to code blocks in the preview modal
 * This implementation uses a fallback strategy for maximum browser compatibility
 */
export class CopyButton {
    /**
     * Initialize copy buttons for code blocks
     * @param {string} containerId - ID of the container element
     * @returns {boolean} Success status
     */
    static addCopyButtonsToPreview(containerId = Selectors.MODAL.PREVIEW_CONTENT_ID.name()) {
        // Get instance of TranslationManager
        const translationManager = TranslationManager.getInstance();

        const container = DOMUtils.getElement(containerId);

        if (!container) {
            // Try direct DOM methods too
            const directElement = document.getElementById(containerId);
            const querySelectorElement = document.querySelector('#' + containerId);

            Debug.log('CopyButton: Alternative container lookup results', {
                getElementById: !!directElement,
                querySelector: !!querySelectorElement
            }, 2);

            Debug.warn('CopyButton: Preview container not found', null, 2);
            return false;
        }

        // Find all code blocks within the container
        const preElements = container.querySelectorAll('pre');

        if (!preElements || preElements.length === 0) {
            Debug.log('CopyButton: No code blocks found in preview', null, 3);
            return false;
        }

        // Add copy button to each pre element
        preElements.forEach(pre => {
            // Check if button already exists
            if (pre.querySelector(Selectors.COPY.BUTTON)) {
                return;
            }

            // Create copy button
            const button = DOMUtils.createElement('button', null, Selectors.COPY.BUTTON.name(), {
                type: 'button',
                title: translationManager.get('copyCode')
            });

            // Add copy button content
            button.innerHTML = `<span class="${Selectors.COPY.ICON.name()}"></span><span class="${Selectors.COPY.TEXT.name()}">${translationManager.get('copy')}</span>`;

            // Position the button within the pre element
            pre.style.position = 'relative';

            // Find code element and insert button before it
            const codeEl = pre.querySelector('code');
            if (codeEl) {
                pre.insertBefore(button, codeEl);
            } else {
                // Fallback to appending if no code element found
                pre.appendChild(button);
            }

            // Add click event with progressive fallback
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                const codeEl = pre.querySelector('code');
                if (!codeEl) return;

                // Store reference to the code element for later use
                // This is important to maintain context during asynchronous operations
                CopyButton._sourceCodeElement = codeEl;

                // Get text content - use most reliable method
                let textToCopy;
                if (codeEl.hasAttribute('data-original-code')) {
                    textToCopy = CopyButton._decodeHTMLEntities(codeEl.getAttribute('data-original-code'));
                    Debug.log('CopyButton: Using original code from attribute', null, 3);
                } else {
                    textToCopy = codeEl.textContent || '';
                    textToCopy = textToCopy.replace(/\n\n+/g, '\n');
                    Debug.log('CopyButton: Using text content from code element', null, 3);
                }

                Debug.log('CopyButton: Text length: ' + textToCopy.length, null, 3);

                // Go straight to the most reliable method - manual copy
                // This ensures consistent behavior across all browsers
                CopyButton._showManualCopyModal(textToCopy);

                // Show visual feedback that copy operation was initiated
                CopyButton._showProcessingState(button);
            });
        });

        Debug.log(`CopyButton: Added copy buttons to ${preElements.length} code blocks`, null, 2);
        return true;
    }

    /**
     * Show processing state on button
     * @param {HTMLElement} button - Button element to update
     * @private
     */
    static _showProcessingState(button) {
        button.classList.add(Selectors.COPY.PROCESSING.name());
        const textSpan = button.querySelector(`.${Selectors.COPY.TEXT.name()}`);
        if (textSpan) {
            textSpan.textContent = 'Open Copy Dialog...';
        }

        setTimeout(() => {
            button.classList.remove(Selectors.COPY.PROCESSING.name());
            if (textSpan) {
                textSpan.textContent = 'Copy';
            }
        }, 1000);
    }

    /**
     * Show copied state on button
     * @param {HTMLElement} button - Button element to update
     * @private
     */
    static _showCopiedState(button) {
        button.classList.add(Selectors.COPY.COPIED.name());
        const textSpan = button.querySelector(`.${Selectors.COPY.TEXT.name()}`);
        if (textSpan) {
            textSpan.textContent = 'Copied!';
        }

        setTimeout(() => {
            button.classList.remove(Selectors.COPY.COPIED.name());
            if (textSpan) {
                textSpan.textContent = 'Copy';
            }
        }, 2000);
    }

    /**
     * Show a modal dialog with text for manual copying using ModalManager
     * @param {string} text - Text to copy
     * @private
     */
    static _showManualCopyModal(text) {
        // Get singleton instance of ModalManager
        const modalManager = ModalManager.getInstance();

        // Create the copy modal and get its ID
        const modalId = modalManager.createCopyModal(text);

        // Open the modal
        modalManager.open(modalId);

        Debug.log('CopyButton: Showing manual copy modal', null, 2);
    }

    /**
     * Show copy failure on button
     * @param {HTMLElement} button - Button element to update
     * @private
     */
    static _showCopyFailure(button) {
        button.innerHTML = DOMUtils.getIconHtml('exclamation-triangle', { classes: Selectors.UTILITY.MARGIN_END_2.name() }) + 'Copy Failed';
        button.classList.remove(Selectors.UTILITY.BUTTON_PRIMARY.name(), Selectors.UTILITY.BUTTON_SUCCESS.name());
        button.classList.add(Selectors.UTILITY.BUTTON_DANGER.name());

        setTimeout(() => {
            button.innerHTML = DOMUtils.getIconHtml('copy', { classes: Selectors.UTILITY.MARGIN_END_2.name() }) + 'Try Again';
            button.classList.remove(Selectors.UTILITY.BUTTON_DANGER.name());
            button.classList.add(Selectors.UTILITY.BUTTON_PRIMARY.name());
        }, 2000);
    }

    /**
     * Decode HTML entities in a string
     * @param {string} html - String with HTML entities
     * @returns {string} Decoded string
     * @private
     */
    static _decodeHTMLEntities(html) {
        if (!html) return '';

        const textarea = document.createElement('textarea');
        textarea.innerHTML = html;
        return textarea.value;
    }
}
