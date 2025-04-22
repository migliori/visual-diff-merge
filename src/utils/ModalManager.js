/**
 * Modal Manager - Centralized handler for application modals
 * Provides abstraction over Materialize Modal implementation
 */
import Selectors from '../constants/Selectors';

import { Debug } from './Debug';
import { BaseSingleton } from './BaseSingleton';

// Module-level singleton instance
let instance = null;

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

        // Only initialize if this is the first instance
        if (this._isFirstInstance(instance)) {
            this.options = {
                debug: false,
                translations: {},
                ...options
            };

            this.instances = {};

            Debug.log('ModalManager: Initialized', null, 2);
        }
        // Constructor should not return a value - it implicitly returns 'this'
    }

    /**
     * Initialize all modals in the application
     * @returns {boolean} Success status
     */
    initModals() {  // Change from "init" to "initModals" to maintain consistency
        try {
            // Check if Materialize is available
            if (typeof M === 'undefined' || !M.Modal) {
                Debug.log('ModalManager: Materialize not available', null, 1);
                return false;
            }

            // Register common modals with appropriate options
            this.register(Selectors.MERGE.PREVIEW_MODAL.substring(1), {
                dismissible: true,
                opacity: 0.5,
                inDuration: 250,
                outDuration: 200,
                startingTop: '2%',
                endingTop: '2%',
                onOpenStart: (modal) => this.setFullscreenSize(modal)
            });

            this.register(Selectors.MODAL.CONFIRM.substring(1), {
                dismissible: true,
                opacity: 0.5
            });

            Debug.log('ModalManager: Modals initialized', null, 2);
            return true;
        } catch (error) {
            Debug.log('ModalManager: Error initializing modals', error, 1);
            return false;
        }
    }

    /**
     * Register a modal instance with Materialize
     * @param {string} modalId - ID of the modal element
     * @param {Object} options - Modal configuration options
     * @returns {boolean} Success status
     */
    register(modalId, options = {}) {
        try {
            const element = document.getElementById(modalId);
            if (!element) {
                Debug.log(`ModalManager: Element not found - ${modalId}`, null, 2);
                return false;
            }

            this.instances[modalId] = M.Modal.init(element, options);
            Debug.log(`ModalManager: Registered modal - ${modalId}`, null, 3);
            return true;
        } catch (error) {
            Debug.log(`ModalManager: Error registering modal - ${modalId}`, error, 1);
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
            if (!this.instances[modalId]) {
                Debug.log(`ModalManager: Modal not registered - ${modalId}`, null, 2);
                return false;
            }

            this.instances[modalId].open();
            Debug.log(`ModalManager: Opened modal - ${modalId}`, null, 3);
            return true;
        } catch (error) {
            Debug.log(`ModalManager: Error opening modal - ${modalId}`, error, 1);
            return false;
        }
    }

    /**
     * Close a modal by ID
     * @param {string} modalId - ID of the modal to close
     * @returns {boolean} Success status
     */
    close(modalId) {
        try {
            if (!this.instances[modalId]) {
                Debug.log(`ModalManager: Modal not registered - ${modalId}`, null, 2);
                return false;
            }

            this.instances[modalId].close();
            Debug.log(`ModalManager: Closed modal - ${modalId}`, null, 3);
            return true;
        } catch (error) {
            Debug.log(`ModalManager: Error closing modal - ${modalId}`, error, 1);
            return false;
        }
    }

    /**
     * Set content for a modal
     * @param {string} modalId - ID of the modal
     * @param {string|Element} content - HTML content or DOM element
     * @param {string} contentSelector - Selector for content container (defaults to first child of modal-content)
     * @returns {boolean} Success status
     */
    setContent(modalId, content, contentSelector = null) {
        try {
            const modalElement = document.getElementById(modalId);
            if (!modalElement) {
                Debug.log(`ModalManager: Modal element not found - ${modalId}`, null, 2);
                return false;
            }

            // Find content container
            let contentContainer;
            if (contentSelector) {
                contentContainer = modalElement.querySelector(contentSelector);
            } else {
                contentContainer = modalElement.querySelector(`${Selectors.MODAL.CONTENT} > div`) ||
                                   modalElement.querySelector(Selectors.MODAL.CONTENT);
            }

            if (!contentContainer) {
                Debug.log(`ModalManager: Content container not found in modal - ${modalId}`, null, 2);
                return false;
            }

            // Set content based on type
            if (typeof content === 'string') {
                contentContainer.innerHTML = content;
            } else if (content instanceof Element) {
                contentContainer.innerHTML = '';
                contentContainer.appendChild(content);
            }

            Debug.log(`ModalManager: Updated content for modal - ${modalId}`, null, 3);
            return true;
        } catch (error) {
            Debug.log(`ModalManager: Error setting content for modal - ${modalId}`, error, 1);
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
            if (!modalElement) return false;

            // Adjust modal height to fill viewport
            const modalContent = modalElement.querySelector(Selectors.MODAL.CONTENT);
            if (modalContent) {
                const viewportHeight = window.innerHeight;
                const headerHeight = modalElement.querySelector(Selectors.MODAL.HEADER)?.offsetHeight || 0;
                const footerHeight = modalElement.querySelector(Selectors.MODAL.FOOTER)?.offsetHeight || 0;

                // Calculate available height and add slight padding
                const availableHeight = viewportHeight - headerHeight - footerHeight - 40;
                modalContent.style.maxHeight = `${availableHeight}px`;
                modalContent.style.height = `${availableHeight}px`;
            }

            return true;
        } catch (error) {
            Debug.log('ModalManager: Error setting fullscreen size', error, 1);
            return false;
        }
    }

    /**
     * Destroy all modal instances and clean up
     */
    destroy() {
        try {
            Object.keys(this.instances).forEach(modalId => {
                if (this.instances[modalId] && typeof this.instances[modalId].destroy === 'function') {
                    this.instances[modalId].destroy();
                    Debug.log(`ModalManager: Destroyed modal - ${modalId}`, null, 3);
                }
            });

            this.instances = {};
            Debug.log('ModalManager: All modals destroyed', null, 2);
        } catch (error) {
            Debug.log('ModalManager: Error destroying modals', error, 1);
        }
    }
}
