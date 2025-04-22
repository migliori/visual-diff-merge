import { Debug } from '../../utils/Debug';
import { BaseSingleton } from '../../utils/BaseSingleton';
import Selectors from '../../constants/Selectors';
import { DOMUtils } from '../../utils/DOMUtils';
import { TranslationManager } from '../../utils/TranslationManager';

// Module-level singleton instance
let instance = null;

/**
 * Lightweight standalone modal manager without external dependencies
 */
export class ModalManager extends BaseSingleton {
    /**
     * Get the singleton instance
     * @param {Object} options - Configuration options (only used during first initialization)
     * @returns {ModalManager} The singleton instance
     */
    static getInstance(options = {}) {
        if (!instance) {
            instance = new ModalManager(options);
        }
        return instance;
    }

    /**
     * Constructor - protected from direct instantiation
     * @param {Object} options - Configuration options
     */
    constructor(options = {}) {
        super();

        // Skip initialization if instance already exists
        if (!this._isFirstInstance(instance)) {
            return;
        }

        this.options = {
            debug: false,
            translations: {},
            ...options
        };

        this.modals = {};
        this.activeModal = null;
        this.initialized = false;

        Debug.log('ModalManager: Initialized', null, 2);
    }

    /**
     * Initialize modals by creating the necessary HTML
     * @returns {boolean} Success status
     */
    initModals() {
        try {
            if (this.initialized) {
                Debug.log('ModalManager: Already initialized', null, 2);
                return true;
            }

            const translationManager = TranslationManager.getInstance();

            // Create confirm modal
            this.createModal({
                id: Selectors.MODAL.CONFIRM.name(),
                title: translationManager.get('confirmation'),
                contentId: Selectors.MODAL.MESSAGE.name(),
                contentClass: Selectors.UTILITY.PADDING_3.name(),
                footerButtons: [
                    {
                        id: Selectors.MODAL.CONTINUE_BTN.name(),
                        text: translationManager.get('continueResolving'),
                        class: Selectors.UTILITY.BUTTON.name() + ' ' + Selectors.UTILITY.BUTTON_PRIMARY.name() + ' ' + Selectors.UTILITY.MARGIN_END_2.name()
                    },
                    {
                        id: Selectors.MODAL.MERGE_BTN.name(),
                        text: translationManager.get('mergeAnyway'),
                        class: Selectors.UTILITY.BUTTON.name() + ' ' + Selectors.UTILITY.BUTTON_WARNING.name()
                    }
                ]
            });

            // Create preview modal
            this.createModal({
                id: Selectors.MODAL.PREVIEW.name(),
                title: '<span id="' + Selectors.MODAL.PREVIEW_FILENAME.name() + '"></span>',
                contentId: Selectors.MODAL.PREVIEW_CONTENT_ID.name(),
                contentClass: Selectors.MODAL.PREVIEW_CONTENT.name(),
                headerClass: Selectors.MODAL.HEADER_FIXED.name(),
                modalClass: 'vdm-modal--fixed-footer',
                fullscreen: true
            });

            // Create conflict modal
            this.createModal({
                id: Selectors.MERGE.CONFLICT_MODAL.name(),
                title: translationManager.get('unresolvedConflicts'),
                contentId: Selectors.MODAL.MESSAGE.name(),
                contentClass: Selectors.UTILITY.PADDING_3.name(),
                footerButtons: [
                    {
                        id: Selectors.MODAL.CONTINUE_BTN.name(),
                        text: translationManager.get('continueResolving'),
                        class: Selectors.UTILITY.BUTTON.name() + ' ' + Selectors.UTILITY.BUTTON_PRIMARY.name() + ' ' + Selectors.UTILITY.MARGIN_END_2.name()
                    },
                    {
                        id: Selectors.MODAL.MERGE_BTN.name(),
                        text: translationManager.get('mergeAnyway'),
                        class: Selectors.UTILITY.BUTTON.name() + ' ' + Selectors.UTILITY.BUTTON_WARNING.name()
                    }
                ]
            });

            // Add event listeners for close buttons, backdrop clicks, etc.
            this._setupEventListeners();

            this.initialized = true;
            Debug.log('ModalManager: Modals initialized', null, 2);
            return true;
        } catch (error) {
            Debug.error('ModalManager: Error initializing modals', error, 1);
            return false;
        }
    }

    /**
     * Create a modal with the specified configuration
     * @param {Object} config - Modal configuration
     * @param {string} config.id - Modal ID (without # prefix)
     * @param {string} config.title - Modal title (can include HTML)
     * @param {string} [config.contentId] - ID for the content container (without # prefix)
     * @param {string} [config.contentClass] - CSS class for the content container
     * @param {string} [config.modalClass] - Additional CSS class for the modal
     * @param {string} [config.headerClass] - CSS class for the header (overrides default)
     * @param {Array} [config.footerButtons] - Array of button configurations
     * @param {boolean} [config.fullscreen] - Whether to make the modal fullscreen
     * @param {Object} [config.events] - Custom event handlers for modal elements
     * @param {Object} [config.attr] - Additional attributes to add to the modal element
     * @returns {boolean} Success status
     */
    createModal(config) {
        try {
            const modalId = config.id;

            // Check if modal already exists in DOM
            if (document.getElementById(modalId)) {
                Debug.log(`ModalManager: Modal ${modalId} already exists in DOM`, null, 2);
                return true;
            }

            // Use header class from config or default to MODAL.HEADER with prefix removed
            const headerClass = config.headerClass || Selectors.MODAL.HEADER.name();

            // Start building modal HTML
            let modalHtml = `
                <div id="${modalId}" class="${Selectors.MODAL.CONTAINER.name()/*remove dot prefix*/}${config.modalClass ? ' ' + config.modalClass : ''}" style="display: none;"`;

            // Add additional attributes if provided
            if (config.attr) {
                Object.entries(config.attr).forEach(([key, value]) => {
                    modalHtml += ` ${key}="${value}"`;
                });
            }

            modalHtml += `>
                    <div class="${Selectors.MODAL.CONTENT.name()}">
                        <div class="${headerClass}">
                            <h5 class="${Selectors.MODAL.TITLE.name()}">${config.title}</h5>
                            <button class="${Selectors.MODAL.CLOSE.name()}">&times;</button>
                        </div>`;

            // Add content container
            if (config.contentId) {
                modalHtml += `<div id="${config.contentId}" class="${config.contentClass || ''}"></div>`;
            } else {
                modalHtml += `<div class="${config.contentClass || ''}"></div>`;
            }

            // Add footer with buttons if specified
            if (config.footerButtons && config.footerButtons.length > 0) {
                modalHtml += `<div class="${Selectors.MODAL.FOOTER.name()} ${Selectors.UTILITY.FLEX.name()} ${Selectors.UTILITY.JUSTIFY_CONTENT_BETWEEN.name()} ${Selectors.UTILITY.PADDING_3.name()}">`;
                config.footerButtons.forEach(button => {
                    // Check if this is a close button - only buttons with the exact MODAL.CLOSE.name() class should be considered close buttons
                    const isCloseButton = button?.class.split(' ').includes(Selectors.MODAL.CLOSE.name());

                    // Determine the button type based on class
                    let iconName = 'chevron-right'; // Default icon

                    if (button.class) {
                        const classNames = button.class.split(' ');

                        // Determine button type from classes
                        if (classNames.some(cls => cls.includes('primary'))) {
                            iconName = 'check-circle';
                        } else if (classNames.some(cls => cls.includes('success'))) {
                            iconName = 'check-circle';
                        } else if (classNames.some(cls => cls.includes('danger'))) {
                            iconName = 'exclamation-triangle';
                        } else if (classNames.some(cls => cls.includes('warning'))) {
                            iconName = 'exclamation-circle';
                        } else if (classNames.some(cls => cls.includes('info'))) {
                            iconName = 'info-circle';
                        }
                    }

                    // Special case for specific button IDs
                    if (button.id) {
                        if (button.id.toLowerCase().includes('copy')) {
                            iconName = 'copy';
                        } else if (button.id === Selectors.MODAL.CONTINUE_BTN.name()) {
                            iconName = 'chevron-right';
                        } else if (button.id === Selectors.MODAL.MERGE_BTN.name()) {
                            iconName = 'exclamation-circle';
                        }
                    }

                    // Generate icon HTML if this is not a close button
                    let iconHtml = '';
                    if (!isCloseButton) {
                        iconHtml = DOMUtils.getIconHtml(iconName, { classes: Selectors.UTILITY.MARGIN_END_2.name() });
                    }

                    modalHtml += `<button id="${button.id}" class="${button.class || Selectors.UTILITY.BUTTON.name() + ' ' + Selectors.UTILITY.BUTTON_SECONDARY.name()}"`;

                    // Add data attributes if provided
                    if (button.data) {
                        Object.entries(button.data).forEach(([key, value]) => {
                            modalHtml += ` data-${key}="${value}"`;
                        });
                    }

                    // Add the icon before text but only for non-close buttons
                    if (isCloseButton && !button.text) {
                        // For close buttons without text, don't add any content (X will be created by CSS)
                        modalHtml += `></button>`;
                    } else {
                        // For other buttons or close buttons with text, add icon + text span
                        modalHtml += `>${iconHtml}<span>${button.text || ''}</span></button>`;
                    }
                });
                modalHtml += `</div>`;
            }

            // Close the modal structure
            modalHtml += `
                    </div>
                </div>
            `;

            this._appendToBody(modalId, modalHtml);
            this.modals[modalId] = {
                element: document.getElementById(modalId),
                isOpen: false,
                config: config
            };

            // Apply fullscreen if needed
            if (config.fullscreen) {
                const modalElement = document.getElementById(modalId);
                if (modalElement) {
                    this.setFullscreenSize(modalElement);
                }
            }

            // Attach custom event handlers if provided
            if (config.events) {
                const modalElement = document.getElementById(modalId);

                Object.entries(config.events).forEach(([selector, events]) => {
                    let elements;

                    // Handle special selectors
                    if (selector === 'modal') {
                        elements = [modalElement];
                    } else if (selector === 'close') {
                        elements = Array.from(modalElement.querySelectorAll(Selectors.MODAL.CLOSE));
                    } else {
                        // For regular selectors, query within the modal
                        elements = Array.from(modalElement.querySelectorAll(selector));
                    }

                    // Attach events to each matching element
                    elements.forEach(element => {
                        if (element) {
                            Object.entries(events).forEach(([eventName, handler]) => {
                                element.addEventListener(eventName, handler);
                                Debug.log(`ModalManager: Attached ${eventName} event to ${selector} in modal ${modalId}`, null, 3);
                            });
                        }
                    });
                });
            }

            Debug.log(`ModalManager: Created modal - ${modalId}`, null, 3);
            return true;
        } catch (error) {
            Debug.error(`ModalManager: Error creating modal - ${config.id}`, error, 1);
            return false;
        }
    }

    /**
     * Determine the appropriate icon for a button based on context
     * @private
     * @param {Object} button - The button configuration object
     * @returns {string} The name of the icon to use
     */
    _getIconNameForButton(button) {
        // First, check the IconRegistry to ensure we use icons that actually exist

        // Icons based on button text (case insensitive)
        const buttonText = button.text.toLowerCase();

        if (buttonText.includes('continue')) return 'chevron-right';
        if (buttonText.includes('merge')) return 'check'; // Changed from code-merge to check
        if (buttonText.includes('close') || buttonText.includes('cancel')) return 'exclamation-circle'; // Changed from times-circle
        if (buttonText.includes('confirm') || buttonText.includes('ok')) return 'check-circle';
        if (buttonText.includes('copy')) return 'copy';
        if (buttonText.includes('download')) return 'file'; // Changed from download
        if (buttonText.includes('upload')) return 'file-circle-plus'; // Changed from upload
        if (buttonText.includes('save')) return 'check-circle'; // Changed from save
        if (buttonText.includes('delete')) return 'exclamation-triangle'; // Changed from trash
        if (buttonText.includes('edit')) return 'eye'; // Changed from edit

        // Icons based on button class
        if (button.class) {
            const buttonClass = button.class.toLowerCase();

            if (buttonClass.includes('primary')) return 'check';
            if (buttonClass.includes('secondary')) return 'chevron-right';
            if (buttonClass.includes('success')) return 'check-circle';
            if (buttonClass.includes('danger')) return 'exclamation-triangle';
            if (buttonClass.includes('warning')) return 'exclamation-circle';
            if (buttonClass.includes('info')) return 'info-circle';
        }

        // Default icon if no matching pattern found
        return 'chevron-right';
    }

    /**
     * Append HTML to body
     * @private
     * @param {string} modalId - Modal ID
     * @param {string} html - HTML to append
     */
    _appendToBody(modalId, html) {
        // Create wrapper div for modals if it doesn't exist
        let modal = document.getElementById(modalId);
        if (!modal) {
            // Convert HTML string to DOM element before appending
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = html;
            document.body.appendChild(tempContainer.firstElementChild);
        }

        // Create or update the backdrop element
        let backdrop = document.getElementById(Selectors.MODAL.BACKDROP.name());
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.id = Selectors.MODAL.BACKDROP.name();
            backdrop.style.display = 'none';
            document.body.appendChild(backdrop);
        }
    }

    /**
     * Set up event listeners for modals
     * @private
     */
    _setupEventListeners() {
        // Use document-level event delegation for close buttons
        document.addEventListener('click', (event) => {
            // Check if the clicked element is a close button or has the close class
            if (event.target.matches(Selectors.MODAL.CLOSE)) {
                const modal = event.target.closest(Selectors.MODAL.CONTAINER);
                if (modal?.id) {
                    this.close(modal.id);
                }
            }
        });

        // Backdrop click to close
        const backdrop = document.getElementById(Selectors.MODAL.BACKDROP.name());
        if (backdrop) {
            backdrop.addEventListener('click', () => {
                if (this.activeModal) {
                    this.close(this.activeModal);
                }
            });
        }

        // ESC key to close
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.activeModal) {
                this.close(this.activeModal);
            }
        });
    }

    /**
     * Register a modal instance
     * @param {string} modalId - ID of the modal element
     * @param {Object} options - Modal configuration options
     * @returns {boolean} Success status
     */
    register(modalId, options = {}) {
        try {
            const element = document.getElementById(modalId);
            if (!element) {
                Debug.warn(`ModalManager: Element not found for modal ID ${modalId}`, null, 2);
                return false;
            }

            this.modals[modalId] = {
                element: element,
                isOpen: false,
                options: options
            };

            Debug.log(`ModalManager: Registered modal - ${modalId}`, null, 3);
            return true;
        } catch (error) {
            Debug.error(`ModalManager: Error registering modal - ${modalId}`, error, 1);
            return false;
        }
    }

    /**
     * Register a callback to be executed before opening a modal
     * @param {string} modalId - ID of the modal
     * @param {Function} callback - Function to execute before opening
     * @returns {boolean} Success status
     */
    registerBeforeOpenCallback(modalId, callback) {
        try {
            if (!this.modals[modalId]) {
                this.modals[modalId] = {
                    element: document.getElementById(modalId),
                    isOpen: false,
                    config: {}
                };
            }

            if (!this.modals[modalId].beforeOpenCallbacks) {
                this.modals[modalId].beforeOpenCallbacks = [];
            }

            this.modals[modalId].beforeOpenCallbacks.push(callback);
            Debug.log(`ModalManager: Registered before-open callback for modal ${modalId}`, null, 2);
            return true;
        } catch (error) {
            Debug.error(`ModalManager: Error registering before-open callback for modal ${modalId}`, error, 1);
            return false;
        }
    }

    /**
     * Open a modal by ID
     * @param {string} modalId - ID of the modal to open
     * @returns {boolean} Success status
     */
    open(modalId) {
        try {
            const modal = this.modals[modalId];
            if (!modal) {
                Debug.warn(`ModalManager: Cannot open modal ${modalId} - not registered`, null, 2);

                // Forcefully try to find the modal element even if not registered
                const element = document.getElementById(modalId);
                if (element) {
                    Debug.log(`ModalManager: Found unregistered modal element ${modalId}, registering now`, null, 2);
                    this.register(modalId, { element });
                    this._showModal(modalId);
                    return true;
                }

                return false;
            }

            // Execute any registered before-open callbacks
            if (modal.beforeOpenCallbacks && modal.beforeOpenCallbacks.length > 0) {
                Debug.log(`ModalManager: Executing ${modal.beforeOpenCallbacks.length} before-open callbacks for modal ${modalId}`, null, 2);
                modal.beforeOpenCallbacks.forEach(callback => {
                    try {
                        callback();
                    } catch (err) {
                        Debug.error(`ModalManager: Error in before-open callback for modal ${modalId}`, err, 1);
                    }
                });
            }

            this._showModal(modalId);
            return true;
        } catch (error) {
            Debug.error(`ModalManager: Error opening modal ${modalId}:`, error, 2);
            return false;
        }
    }

    /**
     * Show a modal
     * @private
     * @param {string} modalId - Modal ID to show
     */
    _showModal(modalId) {
        const modal = this.modals[modalId];
        if (!modal) {
            Debug.warn(`ModalManager: Modal ${modalId} not found`, null, 2);
            return;
        }

        // Set as active modal - important for proper backdrop handling
        this.activeModal = modalId;

        // Show backdrop
        const backdrop = document.getElementById(Selectors.MODAL.BACKDROP.name());
        if (backdrop) {
            backdrop.style.display = 'block';
            setTimeout(() => {
                backdrop.style.opacity = '1';
            }, 10);
        }

        // IMPORTANT: Force modal display style using direct manipulation
        // Show modal with animation - set display IMMEDIATELY
        modal.element.style.display = 'block';
        modal.element.style.opacity = '0';

        // Debug logs to help diagnose modal display issues
        Debug.log(`ModalManager: Setting modal ${modalId} display to block`, {
            modalElement: modal.element.id,
            displayBefore: modal.element.style.display
        }, 2);

        // Apply animation
        setTimeout(() => {
            modal.element.style.opacity = '1';
            Debug.log(`ModalManager: Fading in modal ${modalId}`, null, 3);
        }, 10);

        modal.isOpen = true;

        // Handle fullscreen if needed
        if (modalId === Selectors.MODAL.PREVIEW.name()) {
            this.setFullscreenSize(modal.element);
        }

        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    }

    /**
     * Hide a modal
     * @private
     * @param {string} modalId - Modal ID to hide
     */
    _hideModal(modalId) {
        const modal = this.modals[modalId];
        if (!modal) return;

        // Fade out
        modal.element.style.opacity = '0';

        // After animation completes
        setTimeout(() => {
            modal.element.style.display = 'none';
            modal.isOpen = false;

            // Hide backdrop if this is the currently active modal
            if (this.activeModal === modalId) {
                const backdrop = document.getElementById(Selectors.MODAL.BACKDROP.name());
                if (backdrop) {
                    backdrop.style.opacity = '0';

                    // Hide backdrop after fade-out animation
                    setTimeout(() => {
                        backdrop.style.display = 'none';
                    }, 150);
                }

                // Reset body scrolling
                document.body.style.overflow = '';
                this.activeModal = null;
            }
        }, 250); // Match transition duration
    }

    /**
     * Close a modal by ID
     * @param {string} modalId - ID of the modal to close
     * @returns {boolean} Success status
     */
    close(modalId) {
        try {
            if (!this.modals[modalId]) {
                Debug.warn(`ModalManager: Modal not found - ${modalId}`, null, 2);
                return false;
            }

            this._hideModal(modalId);

            Debug.log(`ModalManager: Closed modal - ${modalId}`, null, 3);
            return true;
        } catch (error) {
            Debug.error(`ModalManager: Error closing modal - ${modalId}`, error, 1);
            return false;
        }
    }

    /**
     * Set content for a modal
     * @param {string} modalId - ID of the modal
     * @param {string|Element} content - HTML content or DOM element
     * @param {string} contentSelector - Selector for content container
     * @returns {boolean} Success status
     */
    setContent(modalId, content, contentSelector = null) {
        try {
            Debug.log(`ModalManager: Setting content for modal ${modalId}`, {
                contentType: typeof content,
                contentLength: typeof content === 'string' ? content.length : 'Element',
                contentPreview: typeof content === 'string' ? content.substring(0, 150) + '...' : 'Element object',
                targetSelector: contentSelector
            }, 2);

            const modal = this.modals[modalId];
            if (!modal) {
                Debug.error(`ModalManager: Modal not found - ${modalId}`, null, 1);
                return false;
            }

            // Find the content container
            let container;
            if (contentSelector) {
                Debug.log(`ModalManager: Looking for content container with selector: ${contentSelector}`, null, 2);
                // Check if contentSelector is an ID without # prefix
                if (!contentSelector.startsWith('#') && !contentSelector.startsWith('.')) {
                    container = document.getElementById(contentSelector);
                    Debug.log(`ModalManager: Tried getElementById with: ${contentSelector}, found: ${!!container}`, null, 2);
                }

                // If not found or not an ID, try as a selector
                if (!container) {
                    container = document.querySelector(contentSelector);
                    Debug.log(`ModalManager: Tried querySelector with: ${contentSelector}, found: ${!!container}`, null, 2);
                }

                // Log container details
                Debug.log(`ModalManager: Container lookup result:`, {
                    found: !!container,
                    id: container?.id || 'none',
                    classList: container ? Array.from(container.classList) : []
                }, 2);
            } else {
                container = modal.element.querySelector(Selectors.MODAL.CONTENT);
                Debug.log(`ModalManager: Using default content container:`, {
                    found: !!container,
                    selector: Selectors.MODAL.CONTENT
                }, 2);

                if (!container) {
                    Debug.error(`ModalManager: Content container not found - ${modalId}`, null, 1);
                    return false;
                }
            }

            if (!container) {
                Debug.error(`ModalManager: Could not find content container with selector: ${contentSelector}`, null, 1);
                return false;
            }

            // Set the content
            if (typeof content === 'string') {
                Debug.log(`ModalManager: Setting HTML content for modal ${modalId}`, {
                    contentLength: content.length,
                    containsPre: content.includes('<pre'),
                    container: container.id || container.className
                }, 2);

                container.innerHTML = content;

                // Verify the content was set correctly
                const hasPreElements = container.querySelectorAll('pre').length > 0;
                Debug.log(`ModalManager: Content set verification:`, {
                    hasPreElements,
                    innerHTML: container.innerHTML.substring(0, 100) + '...'
                }, 2);

                if (content.includes('<pre') && !hasPreElements) {
                    Debug.warn(`ModalManager: Content included <pre> tags but none found after setting innerHTML`, {
                        innerHtmlLength: container.innerHTML.length
                    }, 1);
                }
            } else if (content instanceof Element) {
                Debug.log(`ModalManager: Setting Element content for modal ${modalId}`, {
                    elementType: content.tagName,
                    elementId: content.id || 'none'
                }, 2);
                container.innerHTML = '';
                container.appendChild(content);
            } else {
                Debug.error(`ModalManager: Invalid content type - ${typeof content}`, null, 1);
                return false;
            }

            Debug.log(`ModalManager: Content set for modal - ${modalId}`, null, 3);
            return true;
        } catch (error) {
            Debug.error(`ModalManager: Error setting content - ${modalId}`, error, 1);
            return false;
        }
    }

    /**
     * Set fullscreen size for modal
     * @param {Element} modalElement - Modal DOM element
     * @returns {boolean} Success status
     */
    setFullscreenSize(modalElement) {
        try {
            if (!modalElement) {
                Debug.warn('ModalManager: Modal element not provided for fullscreen', null, 2);
                return false;
            }

            // Add fullscreen class
            modalElement.classList.add(Selectors.MODAL.FULLSCREEN.name());

            // Calculate and set the height
            const headerHeight = modalElement.querySelector(Selectors.MODAL.HEADER) ?
                modalElement.querySelector(Selectors.MODAL.HEADER).offsetHeight : 0;

            const content = modalElement.querySelector(Selectors.MODAL.CONTENT);
            if (content) {
                content.style.height = `calc(100% - ${headerHeight}px)`;
            }

            Debug.log('ModalManager: Modal set to fullscreen size', null, 3);
            return true;
        } catch (error) {
            Debug.error('ModalManager: Error setting fullscreen size', error, 1);
            return false;
        }
    }

    /**
     * Creates a code copy modal for displaying and copying code snippets
     * @param {string} codeText - The code text to display in the modal
     * @returns {string} Modal ID
     */
    createCopyModal(codeText) {
        const modalId = Selectors.MODAL.CODE_COPY.name();
        // Get translations
        const translationManager = TranslationManager.getInstance();

        // Create modal if it doesn't exist yet
        if (!this.modals[modalId]) {
            this.createModal({
                id: modalId,
                title: translationManager.get('copyCode'),
                contentId: Selectors.MODAL.COPY_CONTENT.name(),
                modalClass: Selectors.MODAL.FIXED_FOOTER.name(),
                headerClass: Selectors.MODAL.HEADER_FIXED.name(),
                footerButtons: [
                    {
                        class: `${Selectors.MODAL.CLOSE.name()} ${Selectors.UTILITY.BUTTON.name()} ${Selectors.UTILITY.BUTTON_SECONDARY.name()}`
                    }
                ]
            });
        }

        // Create content with textarea and copy button
        const safeText = this._escapeHtml(codeText);
        const content = `
            <div class="${Selectors.COPY.MODAL.DIALOG.name()}">
                <p class="${Selectors.COPY.MODAL.INSTRUCTIONS.name()}">${translationManager.get('copyInstructions')}</p>
                <div class="${Selectors.COPY.MODAL.TEXTAREA.name()}">
                    <textarea id="${Selectors.COPY.MODAL.TEXTAREA_ELEM.name()}" class="${Selectors.COPY.MODAL.TEXTAREA_ELEM.name()}">${safeText}</textarea>
                </div>
                <div class="${Selectors.COPY.MODAL.ACTIONS.name()}">
                    <button id="${Selectors.COPY.MODAL.BUTTON.name()}" class="${Selectors.COPY.MODAL.BUTTON.name()} ${Selectors.UTILITY.BUTTON.name()} ${Selectors.UTILITY.BUTTON_PRIMARY.name()}">
                        ${DOMUtils.getIconHtml('copy', { classes: Selectors.UTILITY.MARGIN_END_2.name() })}
                        <span>${translationManager.get('copyToClipboard')}</span>
                    </button>
                </div>
            </div>
        `;

        // Set content
        this.setContent(modalId, content, Selectors.MODAL.COPY_CONTENT.name());

        // Set up event handlers after a short delay to ensure DOM is ready
        setTimeout(() => {
            const textarea = document.getElementById(Selectors.COPY.MODAL.TEXTAREA_ELEM.name());
            const copyBtn = document.getElementById(Selectors.COPY.MODAL.BUTTON.name());

            if (textarea) {
                // Select all text when focused
                textarea.addEventListener('focus', function() {
                    this.select();
                });

                // Initial focus and select
                textarea.select();
            }

            if (copyBtn && textarea) {
                copyBtn.addEventListener('click', function() {
                    // Focus and select the textarea
                    textarea.select();

                    try {
                        // Try to copy using clipboard API or fallback to execCommand
                        let success = false;

                        if (navigator.clipboard?.writeText) {
                            navigator.clipboard.writeText(textarea.value)
                                .then(() => {
                                    this._showCopySuccess(copyBtn);
                                    Debug.log('ModalManager: Successfully copied using Clipboard API', null, 3);
                                })
                                .catch(_err => {
                                    // Fallback to execCommand
                                    // @SuppressWarnings(javascript:S1874) - Keeping for browser compatibility
                                    success = document.execCommand('copy');
                                    if (success) {
                                        this._showCopySuccess(copyBtn);
                                        Debug.log('ModalManager: Successfully copied using execCommand fallback', null, 3);
                                    } else {
                                        this._showCopyFailure(copyBtn);
                                        Debug.warn('ModalManager: Copy failed with execCommand fallback', null, 2);
                                    }
                                });
                        } else {
                            // Try execCommand directly
                            // @SuppressWarnings(javascript:S1874) - Keeping for browser compatibility
                            success = document.execCommand('copy');
                            if (success) {
                                this._showCopySuccess(copyBtn);
                                Debug.log('ModalManager: Successfully copied using execCommand', null, 3);
                            } else {
                                this._showCopyFailure(copyBtn);
                                Debug.warn('ModalManager: Copy failed with execCommand', null, 2);
                            }
                        }
                    } catch (err) {
                        this._showCopyFailure(copyBtn);
                        Debug.error('ModalManager: Error during copy operation', err, 2);
                    }
                }.bind(this)); // Bind to modal manager for access to helper methods
            }
        }, 300);

        return modalId;
    }

    /**
     * Show success state on copy button
     * @param {HTMLElement} button - Button element
     * @private
     */
    _showCopySuccess(button) {
        const translationManager = TranslationManager.getInstance();
        button.innerHTML = DOMUtils.getIconHtml('check-circle', { classes: 'vdm-icon--success ' + Selectors.UTILITY.MARGIN_END_2.name() }) +
            `<span>${translationManager.get('copied')}</span>`;
        button.classList.remove(Selectors.UTILITY.BUTTON_PRIMARY.name());
        button.classList.add(Selectors.UTILITY.BUTTON_SUCCESS.name());

        setTimeout(() => {
            button.innerHTML = DOMUtils.getIconHtml('copy', { classes: Selectors.UTILITY.MARGIN_END_2.name() }) +
                `<span>${translationManager.get('copyToClipboard')}</span>`;
            button.classList.remove(Selectors.UTILITY.BUTTON_SUCCESS.name());
            button.classList.add(Selectors.UTILITY.BUTTON_PRIMARY.name());
        }, 2000);
    }

    /**
     * Show failure state on copy button
     * @param {HTMLElement} button - Button element
     * @private
     */
    _showCopyFailure(button) {
        const translationManager = TranslationManager.getInstance();
        button.innerHTML = DOMUtils.getIconHtml('exclamation-triangle', { classes: 'vdm-icon--danger ' + Selectors.UTILITY.MARGIN_END_2.name() }) +
            `<span>${translationManager.get('copyFailed')}</span>`;
        button.classList.remove(Selectors.UTILITY.BUTTON_PRIMARY.name());
        button.classList.add(Selectors.UTILITY.BUTTON_DANGER.name());

        setTimeout(() => {
            button.innerHTML = DOMUtils.getIconHtml('copy', { classes: Selectors.UTILITY.MARGIN_END_2.name() }) +
                `<span>${translationManager.get('tryAgain')}</span>`;
            button.classList.remove(Selectors.UTILITY.BUTTON_DANGER.name());
            button.classList.add(Selectors.UTILITY.BUTTON_PRIMARY.name());
        }, 2000);
    }

    /**
     * Escape HTML entities in a string
     * @param {string} html - String to escape
     * @returns {string} Escaped string
     * @private
     */
    _escapeHtml(html) {
        if (!html) return '';

        return html
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /**
     * Create a modal dynamically with content and open it immediately
     * @param {Object} config - Modal configuration (see createModal)
     * @param {string|Element} content - Content to set in the modal
     * @param {string} [contentSelector] - Optional content container selector
     * @returns {string} Modal ID
     */
    createAndOpenModal(config, content, contentSelector = null) {
        try {
            // Generate a unique ID if none provided
            if (!config.id) {
                config.id = 'vdm-modal--dynamic-' + Date.now();
            }

            // Create the modal
            this.createModal(config);

            // Set the content if provided
            if (content) {
                this.setContent(config.id, content, contentSelector || config.contentId);
            }

            // Open the modal
            this.open(config.id);

            return config.id;
        } catch (error) {
            Debug.error('ModalManager: Error creating and opening modal', error, 1);
            return null;
        }
    }

    /**
     * Create a simple confirmation modal
     * @param {Object} options - Confirmation options
     * @param {string} options.title - Modal title
     * @param {string} options.message - Confirmation message
     * @param {string} options.confirmText - Text for confirm button
     * @param {string} options.cancelText - Text for cancel button
     * @param {Function} options.onConfirm - Callback for confirm action
     * @param {Function} options.onCancel - Callback for cancel action
     * @returns {string} Modal ID
     */
    createConfirmationModal(options) {
        const modalId = 'vdm-modal--confirmation-' + Date.now();

        // Create modal
        this.createModal({
            id: modalId,
            title: options.title || 'Confirmation',
            contentId: 'vdm-modal__confirmation-content',
            contentClass: Selectors.UTILITY.PADDING_3.name(),
            footerButtons: [
                {
                    id: `${modalId}-cancel-btn`,
                    text: options.cancelText || 'Cancel',
                    class: `${Selectors.MODAL.CLOSE.name()} ${Selectors.UTILITY.BUTTON.name()} ${Selectors.UTILITY.BUTTON_SECONDARY.name()} me-2`
                },
                {
                    id: `${modalId}-confirm-btn`,
                    text: options.confirmText || 'Confirm',
                    class: `${Selectors.UTILITY.BUTTON.name()} ${Selectors.UTILITY.BUTTON_PRIMARY.name()}`
                }
            ],
            events: {
                [`#${modalId}-confirm-btn`]: {
                    click: () => {
                        if (typeof options.onConfirm === 'function') {
                            options.onConfirm();
                        }
                        this.close(modalId);
                    }
                },
                [`#${modalId}-cancel-btn`]: {
                    click: () => {
                        if (typeof options.onCancel === 'function') {
                            options.onCancel();
                        }
                        this.close(modalId);
                    }
                }
            }
        });

        // Set message content
        this.setContent(modalId, `<p>${options.message || ''}</p>`, 'vdm-modal__confirmation-content');

        // Open the modal
        this.open(modalId);

        return modalId;
    }

    /**
     * Create an alert modal for showing messages
     * @param {Object} options - Alert options
     * @param {string} options.title - Modal title
     * @param {string} options.message - Alert message
     * @param {string} options.type - Alert type (success, info, warning, danger)
     * @param {string} options.buttonText - Text for button
     * @param {Function} options.onClose - Callback for close action
     * @returns {string} Modal ID
     */
    createAlertModal(options) {
        const modalId = `${Selectors.MODAL.CONTAINER.name()}--alert-${Date.now()}`;

        // Determine alert class based on type
        const alertClass = options.type ?
            `${Selectors.UTILITY.ALERT} ${Selectors.UTILITY.ALERT_PREFIX}${options.type}` :
            `${Selectors.UTILITY.ALERT} ${Selectors.UTILITY.ALERT_INFO}`;

        // Create modal
        this.createModal({
            id: modalId,
            title: options.title || 'Alert',
            contentId: `${Selectors.MODAL.CONTAINER.name()}__alert-content`,
            contentClass: Selectors.UTILITY.PADDING_3.name(),
            footerButtons: [
                {
                    id: `${modalId}-ok-btn`,
                    text: options.buttonText || 'OK',
                    class: `${Selectors.MODAL.CLOSE.name()} ${Selectors.UTILITY.BUTTON.name()} ${Selectors.UTILITY.BUTTON_PRIMARY.name()}`
                }
            ],
            events: {
                [`#${modalId}-ok-btn`]: {
                    click: (e) => {
                        if (typeof options.onClose === 'function') {
                            options.onClose(e);
                        }
                        this.close(modalId);
                    }
                }
            }
        });

        // Create alert content
        const alertContent = `
            <div class="${alertClass} mb-0">
                ${options.message || ''}
            </div>
        `;

        // Set content
        this.setContent(modalId, alertContent, `${Selectors.MODAL.CONTAINER.name()}__alert-content`);

        // Open the modal
        this.open(modalId);

        return modalId;
    }

    /**
     * Destroy all modal instances and clean up
     */
    destroy() {
        try {
            // Close any open modal
            if (this.activeModal) {
                this.close(this.activeModal);
            }

            // Reset all modal references
            this.modals = {};
            this.activeModal = null;

            Debug.log('ModalManager: Destroyed', null, 2);
        } catch (error) {
            Debug.error('ModalManager: Error during destroy', error, 1);
        }
    }
}
