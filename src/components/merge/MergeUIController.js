import { Debug } from '../../utils/Debug';
import { DOMUtils } from '../../utils/DOMUtils';
import { MergeContentFormatter } from '../../utils/MergeContentFormatter';
import { NavigationUtils } from '../../utils/NavigationUtils';
import { TranslationManager } from '../../utils/TranslationManager';
import Selectors from '../../constants/Selectors';

/**
 * Controls merge UI elements and interactions
 */
export class MergeUIController {
    /**
     * Initialize UI controller
     * @param {MergeHandler} mergeHandler - Parent merge handler
     */
    constructor(mergeHandler) {
        this.mergeHandler = mergeHandler;
        this.diffViewer = mergeHandler.diffViewer;
        this.modalManager = mergeHandler.modalManager;
        this.translationManager = TranslationManager.getInstance();

        // UI element references
        this.mergeDestination = null;
        this.mergeToggleBtn = null;
        this.mergeToggleIcon = null;
        this.mergeToggleText = null;
    }

    /**
     * Initialize UI elements and event handlers
     */
    initialize() {
        // Initialize merge destination toggle
        this.initMergeDestinationToggle();

        // Set up modal buttons
        this.setupModalButtons();

        // Set up apply merge button
        this.setupApplyMergeButton();

        Debug.log('MergeUIController: Initialized', null, 2);
    }

    /**
     * Initialize merge destination toggle
     */
    initMergeDestinationToggle() {
        // Get the necessary elements
        this.mergeDestination = DOMUtils.getElement(Selectors.MERGE.DESTINATION_DROPDOWN);
        this.mergeToggleBtn = DOMUtils.getElement(Selectors.MERGE.DESTINATION_TOGGLE);

        // Get toggle icon and text by proper IDs, not using name()
        this.mergeToggleIcon = document.getElementById('vdm-merge-controls__toggle-icon');
        this.mergeToggleText = document.getElementById('vdm-merge-controls__toggle-text');

        if (!this.mergeDestination || !this.mergeToggleBtn) {
            Debug.warn('MergeUIController: Missing merge destination elements', null, 2);
            return;
        }

        // Explicitly set type="button" on toggle button to prevent form submission
        if (this.mergeToggleBtn) {
            this.mergeToggleBtn.setAttribute('type', 'button');
        }

        // ALWAYS populate the dropdown options regardless of current state
        // This ensures configuration-based options are always used
        Debug.log('MergeUIController: Populating merge destination options', null, 2);
        this.populateMergeDestinations();

        // Load saved preference or default to 'new'
        const savedDestination = localStorage.getItem('preferredMergeDestination') || 'new';

        // Ensure the value exists in the dropdown
        let valueExists = false;
        for (let i = 0; i < this.mergeDestination.options.length; i++) {
            if (this.mergeDestination.options[i].value === savedDestination) {
                valueExists = true;
                break;
            }
        }

        // Set the value if it exists, otherwise use the first option
        if (valueExists) {
            this.mergeDestination.value = savedDestination;
        } else if (this.mergeDestination.options.length > 0) {
            this.mergeDestination.selectedIndex = 0;
        }

        Debug.log(`MergeUIController: Initial merge destination set to ${this.mergeDestination.value}`, null, 2);

        // Set up event handlers
        this.setupMergeToggleEvents();

        Debug.log('MergeUIController: Merge destination toggle initialized', null, 2);
    }

    /**
     * Populate merge destination dropdown
     */
    populateMergeDestinations() {
        // Get runtime properties
        const runtimeProps = this.diffViewer.getRuntimeProps();

        // Get diffData which contains file information
        const diffData = runtimeProps.diffData || {};

        // Get filenames from the appropriate sources using the new pattern (no server paths)
        // Prefer new secure properties (newFileName, oldFileName) that only contain the filename
        const newFileName = runtimeProps.newFileName || diffData.new?.filename || runtimeProps.filepath?.split('/').pop() || 'new-file';
        const oldFileName = runtimeProps.oldFileName || diffData.old?.filename || 'old-file';

        // Clean filenames - ensure we're only using the basename without any path components
        const newFile = newFileName.split(/[\/\\]/).pop();
        const oldFile = oldFileName.split(/[\/\\]/).pop();

        Debug.log('MergeUIController: File names for merge destinations', {
            newFileName,
            oldFileName,
            newFile,
            oldFile
        }, 3);

        // Create merged filenames
        const newFileWithoutExt = newFile.substring(0, newFile.lastIndexOf('.')) || newFile;
        const oldFileWithoutExt = oldFile.substring(0, oldFile.lastIndexOf('.')) || oldFile;
        const newFileExt = newFile.substring(newFile.lastIndexOf('.')) || '';
        const oldFileExt = oldFile.substring(oldFile.lastIndexOf('.')) || '';

        const newMergedFile = `${newFileWithoutExt}-merged${newFileExt}`;
        const oldMergedFile = `${oldFileWithoutExt}-merged${oldFileExt}`;

        // Get configuration for enabled save options
        const config = this.diffViewer.getConfig();
        const saveOptions = config?.saveOptions || {
            saveToOriginal: true,
            saveWithSuffix: true,
            saveToOld: true,
            saveToOldWithSuffix: true,
            saveToBoth: true,
            saveToBothWithSuffix: true
        };

        Debug.log('MergeUIController: Save options configuration', saveOptions, 3);

        // IMPORTANT: Always clear ALL existing options to ensure we start fresh
        while (this.mergeDestination.options.length > 0) {
            this.mergeDestination.remove(0);
        }

        // Alternative method to clear options for cross-browser compatibility
        this.mergeDestination.innerHTML = '';

        Debug.log('MergeUIController: Cleared existing dropdown options', null, 3);

        let optionCount = 0;

        // Add options based on configuration
        if (saveOptions.saveToOriginal) {
            DOMUtils.createAndAppendElement('option', this.mergeDestination, {
                attributes: {
                    value: 'new',
                    'data-tooltip': this.translationManager.get('saveToOriginalTooltip', 'Replace the current file with merged content')
                },
                content: `${newFile} (new)`
            });
            optionCount++;
        }

        if (saveOptions.saveWithSuffix) {
            DOMUtils.createAndAppendElement('option', this.mergeDestination, {
                attributes: {
                    value: 'new-suffix',
                    'data-tooltip': this.translationManager.get('saveWithSuffixTooltip', 'Save merged content as a new file with -merged suffix')
                },
                content: `${newMergedFile} (new)`
            });
            optionCount++;
        }

        if (saveOptions.saveToOld) {
            DOMUtils.createAndAppendElement('option', this.mergeDestination, {
                attributes: {
                    value: 'old',
                    'data-tooltip': this.translationManager.get('saveToOldTooltip', 'Replace the old file with merged content')
                },
                content: `${oldFile} (old)`
            });
            optionCount++;
        }

        if (saveOptions.saveToOldWithSuffix) {
            DOMUtils.createAndAppendElement('option', this.mergeDestination, {
                attributes: {
                    value: 'old-suffix',
                    'data-tooltip': this.translationManager.get('saveToOldWithSuffixTooltip', 'Save merged content as a new file with -merged suffix in old location')
                },
                content: `${oldMergedFile} (old)`
            });
            optionCount++;
        }

        if (saveOptions.saveToBoth) {
            DOMUtils.createAndAppendElement('option', this.mergeDestination, {
                attributes: {
                    value: 'both',
                    'data-tooltip': this.translationManager.get('saveToBothTooltip', 'Replace both old and new files with merged content')
                },
                content: this.translationManager.get('saveToBoth', 'Overwrite both files')
            });
            optionCount++;
        }

        if (saveOptions.saveToBothWithSuffix) {
            DOMUtils.createAndAppendElement('option', this.mergeDestination, {
                attributes: {
                    value: 'both-suffix',
                    'data-tooltip': this.translationManager.get('saveToBothWithSuffixTooltip', 'Save merged content as new files with -merged suffix in both locations')
                },
                content: this.translationManager.get('saveToBothWithSuffix', 'Save to both with suffix')
            });
            optionCount++;
        }

        // If no options were added (all disabled), add at least the default option
        if (optionCount === 0) {
            Debug.log('MergeUIController: No save options enabled, adding default option', null, 2);
            DOMUtils.createAndAppendElement('option', this.mergeDestination, {
                attributes: {
                    value: 'new',
                    'data-tooltip': this.translationManager.get('saveToOriginalTooltip', 'Replace the current file with merged content')
                },
                content: `${newFile} (new)`
            });
            optionCount = 1;
        }

        Debug.log(`MergeUIController: Populated merge destinations with ${optionCount} options`, null, 2);
    }

    /**
     * Set up merge toggle button events
     */
    setupMergeToggleEvents() {
        // Create event handlers
        const toggleHandler = (event) => {
            // Prevent default action and stop propagation
            event.preventDefault();
            event.stopPropagation();

            // We need a better approach to open the dropdown - the current method doesn't work in all browsers
            if (this.mergeDestination) {
                // Instead of trying to simulate a click, make the dropdown visible
                // First, directly focus the element to prepare it
                this.mergeDestination.focus();

                // If the browser supports it, use the showPicker method
                if (typeof this.mergeDestination.showPicker === 'function') {
                    try {
                        this.mergeDestination.showPicker();
                        Debug.log('MergeUIController: Opened dropdown using showPicker()', null, 3);
                        return;
                    } catch (e) {
                        Debug.log('MergeUIController: showPicker() failed, trying alternative method', e, 2);
                    }
                }

                // Alternative: Use a small delay and click to open
                setTimeout(() => {
                    try {
                        // Create and dispatch a mouse event
                        const clickEvent = new MouseEvent('mousedown', {
                            bubbles: true,
                            cancelable: true,
                            view: window
                        });
                        this.mergeDestination.dispatchEvent(clickEvent);
                    } catch (e) {
                        Debug.log('MergeUIController: Failed to open dropdown with click event', e, 2);
                    }
                }, 10);

                // If all else fails, make the select element very noticeable to prompt user interaction
                this.mergeDestination.classList.add('vdm-dropdown-highlight');
                setTimeout(() => {
                    this.mergeDestination.classList.remove('vdm-dropdown-highlight');
                }, 1000);
            }

            Debug.log('MergeUIController: Toggle button clicked, attempting to open dropdown', null, 3);
        };

        const changeHandler = () => {
            // Update appearance and save preference
            this.updateMergeToggle(this.mergeDestination.value);
            localStorage.setItem('preferredMergeDestination', this.mergeDestination.value);

            Debug.log(`MergeUIController: Selection changed to ${this.mergeDestination.value}`, null, 3);
        };

        // Remove any existing listeners using cloneNode
        const newToggleBtn = this.mergeToggleBtn.cloneNode(true);
        const newMergeDestination = this.mergeDestination.cloneNode(true);

        // Replace elements - Add null checks to prevent errors when elements don't exist in DOM
        if (this.mergeToggleBtn && this.mergeToggleBtn.parentNode) {
            this.mergeToggleBtn.parentNode.replaceChild(newToggleBtn, this.mergeToggleBtn);
        }

        if (this.mergeDestination && this.mergeDestination.parentNode) {
            this.mergeDestination.parentNode.replaceChild(newMergeDestination, this.mergeDestination);
        }

        // Update references
        this.mergeToggleBtn = newToggleBtn;
        this.mergeDestination = newMergeDestination;

        // Add the icon and text elements if they're now missing
        if (!this.mergeToggleBtn.querySelector('#vdm-merge-controls__toggle-icon')) {
            this.mergeToggleIcon = DOMUtils.createAndAppendElement('i', this.mergeToggleBtn, {
                id: 'vdm-merge-controls__toggle-icon',
            });
            this.mergeToggleBtn.insertBefore(this.mergeToggleIcon, this.mergeToggleBtn.firstChild);
        } else {
            this.mergeToggleIcon = this.mergeToggleBtn.querySelector('#vdm-merge-controls__toggle-icon');
        }

        if (!this.mergeToggleBtn.querySelector('#vdm-merge-controls__toggle-text')) {
            this.mergeToggleText = DOMUtils.createAndAppendElement('span', this.mergeToggleBtn, {
                id: 'vdm-merge-controls__toggle-text'
            });
        } else {
            this.mergeToggleText = this.mergeToggleBtn.querySelector('#vdm-merge-controls__toggle-text');
        }

        // Enhance dropdown appearance to make it more visible
        this.mergeDestination.classList.add('vdm-dropdown-visible');
        this.mergeDestination.style.cursor = 'pointer';

        // Add a small down arrow icon to the toggle button to indicate it opens a dropdown
        const dropdownIcon = document.createElement('span');
        dropdownIcon.className = Selectors.UTILITY.MARGIN_START_2.name(); // Using the correct end start class
        dropdownIcon.innerHTML = DOMUtils.getIconHtml('chevron-down', { width: 10, height: 10 });
        this.mergeToggleBtn.appendChild(dropdownIcon);

        // Add event listeners to both the toggle button and dropdown
        this.mergeToggleBtn.addEventListener('click', toggleHandler);
        this.mergeDestination.addEventListener('change', changeHandler);

        // Make the dropdown more interactive and visible
        this.mergeDestination.style.paddingRight = '1.5rem';
        this.mergeDestination.style.appearance = 'menulist';
        this.mergeDestination.style.cursor = 'pointer';

        // Add tooltip to the dropdown
        this.mergeDestination.title = 'Click to select where to save the merged content';

        // Make the dropdown more easily clickable and indicate it's interactive
        this.mergeDestination.addEventListener('mouseover', () => {
            this.mergeDestination.style.borderColor = 'var(--vdm-primary, #0d6efd)';
        });
        this.mergeDestination.addEventListener('mouseout', () => {
            this.mergeDestination.style.borderColor = 'var(--vdm-border-color, #495057)';
        });

        // Re-apply the toggle styling AFTER cloning
        this.updateMergeToggle(this.mergeDestination.value);
    }

    /**
     * Update merge toggle button appearance
     */
    updateMergeToggle(value) {
        // Define color classes for different destination types
        const newFileColorClass = 'vdm-text-primary'; // Purple for new file destinations
        const oldFileColorClass = 'vdm-text-warning'; // Amber for old file destinations
        const bothFilesColorClass = 'vdm-text-info';  // Turquoise for both files destinations

        // Define button style classes that match the color theme
        const newFileBtnClass = Selectors.UTILITY.BUTTON_PRIMARY.name(); // Purple button
        const oldFileBtnClass = Selectors.UTILITY.BUTTON_WARNING.name(); // Amber button
        const bothFilesBtnClass = Selectors.UTILITY.BUTTON_INFO.name();  // Turquoise button

        // Create single SVG icon HTML for each destination state with appropriate color class
        // Always use a single icon per destination type with color indicating the destination
        let iconHtml = '';
        let colorClass = '';
        let buttonClass = '';

        // Determine icon, color class, and button class based on destination type
        switch (value) {
            case 'new':
            case 'new-suffix':
                // New file destinations use file icon with primary color
                iconHtml = 'file';
                colorClass = newFileColorClass;
                buttonClass = newFileBtnClass;
                break;

            case 'old':
            case 'old-suffix':
                // Old file destinations use file-lines icon with warning color
                iconHtml = 'file-lines';
                colorClass = oldFileColorClass;
                buttonClass = oldFileBtnClass;
                break;

            case 'both':
            case 'both-suffix':
                // Both files destinations use file-copy icon with info color
                iconHtml = 'file-copy';
                colorClass = bothFilesColorClass;
                buttonClass = bothFilesBtnClass;
                break;

            default:
                // Default to new file icon with primary color
                iconHtml = 'file';
                colorClass = newFileColorClass;
                buttonClass = newFileBtnClass;
                break;
        }

        // Generate the icon HTML with proper classes
        const iconClasses = `${Selectors.UTILITY.MARGIN_END_1.name()} ${colorClass}`;
        this.mergeToggleIcon.innerHTML = DOMUtils.getIconHtml(iconHtml, { classes: iconClasses });

        // Update the Apply Merge button style to match the destination
        const applyButton = document.getElementById(Selectors.MERGE.BUTTON_APPLY.name());
        if (applyButton) {
            // Remove any existing button style classes
            applyButton.classList.remove(
                Selectors.UTILITY.BUTTON_PRIMARY.name(),
                Selectors.UTILITY.BUTTON_WARNING.name(),
                Selectors.UTILITY.BUTTON_INFO.name(),
                Selectors.UTILITY.BUTTON_SUCCESS.name(),
                Selectors.UTILITY.BUTTON_DANGER.name(),
                Selectors.UTILITY.BUTTON_SECONDARY.name()
            );

            // Add the appropriate button style class
            applyButton.classList.add(buttonClass);

            Debug.log(`MergeUIController: Updated apply button style to ${buttonClass}`, null, 3);
        }

        // Update text content based on the destination value
        switch (value) {
            case 'new':
                // Save to new file (overwrite)
                this.mergeToggleText.textContent = this.translationManager.get('saveToOriginal', 'Save to original');
                this.mergeToggleBtn.title = this.translationManager.get('saveToOriginalTooltip', '');
                this.mergeToggleBtn.setAttribute('data-value', 'new');
                break;

            case 'new-suffix':
                // Save to new file with suffix
                this.mergeToggleText.textContent = this.translationManager.get('saveWithSuffix', 'Save with suffix');
                this.mergeToggleBtn.title = this.translationManager.get('saveWithSuffixTooltip', '');
                this.mergeToggleBtn.setAttribute('data-value', 'new-suffix');
                break;

            case 'old':
                // Save to old file (overwrite)
                this.mergeToggleText.textContent = this.translationManager.get('saveToOld', 'Save to old file');
                this.mergeToggleBtn.title = this.translationManager.get('saveToOldTooltip', '');
                this.mergeToggleBtn.setAttribute('data-value', 'old');
                break;

            case 'old-suffix':
                // Save to old file with suffix
                this.mergeToggleText.textContent = this.translationManager.get('saveToOldWithSuffix', 'Save to old with suffix');
                this.mergeToggleBtn.title = this.translationManager.get('saveToOldWithSuffixTooltip', '');
                this.mergeToggleBtn.setAttribute('data-value', 'old-suffix');
                break;

            case 'both':
                // Save to both files (overwrite)
                this.mergeToggleText.textContent = this.translationManager.get('saveToBoth', 'Save to both files');
                this.mergeToggleBtn.title = this.translationManager.get('saveToBothTooltip', '');
                this.mergeToggleBtn.setAttribute('data-value', 'both');
                break;

            case 'both-suffix':
                // Save to both files with suffix
                this.mergeToggleText.textContent = this.translationManager.get('saveToBothWithSuffix', 'Save to both with suffix');
                this.mergeToggleBtn.title = this.translationManager.get('saveToBothWithSuffixTooltip', '');
                this.mergeToggleBtn.setAttribute('data-value', 'both-suffix');
                break;

            default:
                // Default to 'new' if value is not recognized
                this.mergeToggleText.textContent = this.translationManager.get('saveToOriginal', 'Save to original');
                this.mergeToggleBtn.title = this.translationManager.get('saveToOriginalTooltip', '');
                this.mergeToggleBtn.setAttribute('data-value', 'new');
                break;
        }

        Debug.log(`MergeUIController: Toggle updated to ${value}`, null, 3);
    }

    /**
     * Set up modal buttons
     */
    setupModalButtons() {
        // Add a direct event listener to the document for clicks on modal buttons
        document.addEventListener('click', (event) => {
            // Handle continue merging button
            if (event.target.closest && event.target.closest(`#${Selectors.MODAL.CONTINUE_BTN.name()}`)) {
                Debug.log('MergeUIController: Continue merging button clicked via delegation', null, 2);
                this.modalManager.close(Selectors.MERGE.CONFLICT_MODAL.name());

                // Also close the preview modal - use MODAL.PREVIEW instead of MERGE.PREVIEW_MODAL
                const previewModalId = Selectors.MODAL.PREVIEW.name();
                Debug.log(`MergeUIController: Also closing preview modal (ID: ${previewModalId})`, null, 1);
                this.modalManager.close(previewModalId);

                setTimeout(() => {
                    this.highlightUnresolvedChunks();
                }, 400);
            }

            // Handle merge anyway button
            if (event.target.closest && event.target.closest(`#${Selectors.MODAL.MERGE_BTN.name()}`)) {
                Debug.log('MergeUIController: Merge anyway button clicked via delegation', null, 2);
                this.modalManager.close(Selectors.MERGE.CONFLICT_MODAL.name());
                this.mergeHandler.proceedWithMerge(this.getMergeType());
            }
        });

        // For compatibility, still register the before-open callback as well
        if (this.modalManager && typeof this.modalManager.registerBeforeOpenCallback === 'function') {
            this.modalManager.registerBeforeOpenCallback(Selectors.MERGE.CONFLICT_MODAL.name(), () => {
                // Log the presence of the buttons when the modal opens
                const continueBtn = document.getElementById(Selectors.MODAL.CONTINUE_BTN.name());
                const mergeBtn = document.getElementById(Selectors.MODAL.MERGE_BTN.name());

                Debug.log(`MergeUIController: Modal opened, buttons present: continueBtn=${!!continueBtn}, mergeBtn=${!!mergeBtn}`, null, 2);

                // Add direct click handlers (as a backup)
                if (continueBtn) {
                    continueBtn.onclick = () => {
                        Debug.log('MergeUIController: Continue merging clicked via direct handler', null, 2);
                        this.modalManager.close(Selectors.MERGE.CONFLICT_MODAL.name());

                        // Also close the preview modal - use MODAL.PREVIEW instead of MERGE.PREVIEW_MODAL
                        const previewModalId = Selectors.MODAL.PREVIEW.name();
                        Debug.log(`MergeUIController: Also closing preview modal (ID: ${previewModalId})`, null, 1);
                        this.modalManager.close(previewModalId);

                        setTimeout(() => {
                            this.highlightUnresolvedChunks();
                        }, 400);
                        return false; // Prevent default
                    };
                }

                if (mergeBtn) {
                    mergeBtn.onclick = () => {
                        Debug.log('MergeUIController: Merge anyway clicked via direct handler', null, 2);
                        this.modalManager.close(Selectors.MERGE.CONFLICT_MODAL.name());
                        this.mergeHandler.proceedWithMerge(this.getMergeType());
                        return false; // Prevent default
                    };
                }
            });
        }
    }

    /**
     * Set up apply merge button
     */
    setupApplyMergeButton() {
        // Get the Apply Merge button
        const applyButton = document.getElementById(Selectors.MERGE.BUTTON_APPLY.name());
        if (!applyButton) {
            Debug.warn('MergeUIController: Apply merge button not found', null, 2);
            return;
        }

        // Get the merge controls actions container
        const mergeControlsActions = document.querySelector(Selectors.MERGE.CONTROLS_ACTIONS.toString());
        if (!mergeControlsActions) {
            Debug.warn('MergeUIController: Merge controls container not found', null, 2);
            return;
        }

        // Get the merge destination dropdown and toggle button
        const destinationDropdown = document.getElementById(Selectors.MERGE.DESTINATION_DROPDOWN.name());
        const toggleButton = document.getElementById(Selectors.MERGE.DESTINATION_TOGGLE.name());

        // Create a form element to wrap the merge controls
        const form = document.createElement('form');
        form.id = 'vdm-merge__form';
        form.className = mergeControlsActions.className;
        form.style.display = 'flex';
        form.style.justifyContent = 'space-between';
        form.style.width = '100%';

        // Replace the merge controls actions container with the form
        if (mergeControlsActions.parentNode) {
            mergeControlsActions.parentNode.replaceChild(form, mergeControlsActions);

            // Move all content from the original container to the form
            while (mergeControlsActions.firstChild) {
                form.appendChild(mergeControlsActions.firstChild);
            }

            // Make sure the dropdown is inside the form by checking if it exists but is outside
            if (destinationDropdown && !form.contains(destinationDropdown)) {
                const destinationContainer = document.querySelector('.vdm-merge-controls__destination');
                if (destinationContainer) {
                    form.insertBefore(destinationContainer, form.firstChild);
                }
            }

            Debug.log('MergeUIController: Created form wrapper for merge controls', null, 2);
        }

        // Listen for form submission instead of button click
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.handleApplyMerge();
            Debug.log('MergeUIController: Form submitted', null, 3);
        });

        // Important: Prevent the toggle button from submitting the form
        if (toggleButton) {
            toggleButton.type = 'button'; // Explicitly set type to 'button' to prevent form submission

            // Add a click handler that stops propagation
            toggleButton.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();

                // The toggle logic is already in setupMergeToggleEvents
                // This is just to prevent form submission
                Debug.log('MergeUIController: Toggle button click intercepted to prevent form submission', null, 3);
            });
        }

        // For backwards compatibility, also keep the button click handler
        applyButton.addEventListener('click', (event) => {
            event.preventDefault();
            // Validate that the button is inside the form
            if (applyButton.form) {
                applyButton.form.dispatchEvent(new Event('submit'));
            } else {
                this.handleApplyMerge();
            }
            Debug.log('MergeUIController: Apply merge clicked', null, 3);
        });
    }

    /**
     * Handle the apply merge button click
     */
    handleApplyMerge() {
        // Count unresolved conflicts
        const unresolvedCount = this.countUnresolvedConflicts();

        if (unresolvedCount > 0) {
            this.showConflictModal(unresolvedCount);
        } else {
            // Check if we're in file-browser mode or not by checking for fileRefId
            const runtimeProps = this.diffViewer.getRuntimeProps();
            const fileRefId = runtimeProps.fileRefId || '';
            const oldFileRefId = runtimeProps.oldFileRefId || '';

            // If neither fileRefId exists, we're in a non-file-browser mode
            // (text-compare, url-compare, file-upload)
            if (!fileRefId && !oldFileRefId) {
                // Use 'clipboard' merge type for non-file-browser modes
                Debug.log('MergeUIController: Using clipboard merge type for non-file-browser mode', null, 2);
                this.mergeHandler.proceedWithMerge('clipboard');
            } else {
                // Use selected merge type for file-browser mode
                Debug.log('MergeUIController: Using selected merge type for file-browser mode', null, 2);
                this.mergeHandler.proceedWithMerge(this.getMergeType());
            }
        }
    }

    /**
     * Count unresolved conflicts
     * @returns {number} Number of unresolved conflicts
     */
    countUnresolvedConflicts() {
        const conflictChunks = this.diffViewer.chunkManager.chunks.filter(c => c.conflict);
        const selections = this.diffViewer.chunkManager.selections || {};
        return conflictChunks.length - Object.keys(selections).length;
    }

    /**
     * Show conflict resolution modal
     * @param {number} unresolvedCount - Number of unresolved conflicts
     */
    showConflictModal(unresolvedCount) {
        // Get translations from config
        const translations = this.diffViewer.getConfig().translations || {};

        // Set message about unresolved conflicts
        const message = MergeContentFormatter.formatUnresolvedCount(unresolvedCount, translations);

        // Open the conflict modal
        this.modalManager.open(Selectors.MERGE.CONFLICT_MODAL.name());

        // Set the message in the modal
        setTimeout(() => {
            DOMUtils.showMessage(Selectors.MODAL.MESSAGE.name(), message, 'warning', {
                className: '' // No extra margin needed in modal
            });
            Debug.log('MergeUIController: Showing conflict modal with message', null, 2);
        }, 50);

        // Attach event handlers to buttons with a small delay to ensure the modal is fully rendered
        setTimeout(() => {
            const continueBtn = document.getElementById(Selectors.MODAL.CONTINUE_BTN.name());
            const mergeBtn = document.getElementById(Selectors.MODAL.MERGE_BTN.name());

            // Handle the Continue button
            if (continueBtn) {
                // Remove any existing handlers by cloning
                const newContinueBtn = continueBtn.cloneNode(true);
                continueBtn.parentNode.replaceChild(newContinueBtn, continueBtn);

                // Add direct, simplified handler
                newContinueBtn.addEventListener('click', () => {
                    Debug.log('MergeUIController: Continue button clicked', null, 2);

                    // First close the conflict modal
                    this.modalManager.close(Selectors.MERGE.CONFLICT_MODAL.name());

                    // Then close the preview modal
                    const previewModalId = Selectors.MODAL.PREVIEW.name();
                    Debug.log(`MergeUIController: Closing preview modal (ID: ${previewModalId})`, null, 2);
                    this.modalManager.close(previewModalId);

                    // Highlight any unresolved chunks after a delay
                    setTimeout(() => {
                        this.highlightUnresolvedChunks();
                    }, 400);
                });
            }

            // Handle the Merge Anyway button
            if (mergeBtn) {
                // Remove any existing handlers by cloning
                const newMergeBtn = mergeBtn.cloneNode(true);
                mergeBtn.parentNode.replaceChild(newMergeBtn, mergeBtn);

                // Add direct, simplified handler
                newMergeBtn.addEventListener('click', () => {
                    Debug.log('MergeUIController: Merge anyway button clicked', null, 2);
                    this.modalManager.close(Selectors.MERGE.CONFLICT_MODAL.name());
                    this.mergeHandler.proceedWithMerge(this.getMergeType());
                });
            }
        }, 50);
    }

    /**
     * Get current merge type from UI
     * @returns {string} Merge type ('original' or 'new')
     */
    getMergeType() {
        return this.mergeDestination?.value || 'original';
    }

    /**
     * Highlight unresolved chunks
     * @returns {boolean} True if any chunk was highlighted
     */
    highlightUnresolvedChunks() {
        Debug.log('MergeUIController: Finding first unresolved conflict', null, 2);

        // Get all chunks and current selections
        const chunks = this.diffViewer.chunkManager.chunks;
        const selections = this.diffViewer.chunkManager.selections || {};

        // Find the first unresolved chunk
        for (const chunk of chunks) {
            if (chunk.conflict && !selections[chunk.id]) {
                // Use DiffNavigator to navigate to this chunk
                const chunkIndex = chunks.indexOf(chunk);
                if (this.diffViewer.diffNavigator) {
                    // First navigate to the chunk
                    this.diffViewer.diffNavigator.navigateToChunk(chunkIndex);

                    // Then highlight the chunk element using imported NavigationUtils
                    const chunkElement = document.querySelector(`[data-chunk-id="${chunk.id}"]`);
                    if (chunkElement) {
                        NavigationUtils.addHighlightEffect(chunkElement, 4000);
                    }

                    Debug.log(`MergeUIController: Highlighted unresolved chunk ${chunk.id}`, null, 2);
                    return true;
                }
            }
        }

        Debug.log('MergeUIController: No unresolved conflicts found', null, 2);
        return false;
    }

    /**
     * Setup local-only controls when server save is disabled
     * This creates a simplified UI with just the "Get merged result" button
     */
    setupLocalOnlyControls() {
        Debug.log('MergeUIController: Setting up local-only controls (server save disabled)', null, 2);

        // Get translations using the TranslationManager
        Debug.log('MergeUIController: Getting translations for local-only controls', this.translationManager, 2);
        const getMergedResultText = this.translationManager.get('getMergedResult', 'Get Merged Result');
        const getMergedResultTooltip = this.translationManager.get('getMergedResultTooltip', 'View and download the merged content');

        // Find the merge controls container
        const mergeControlsActions = document.querySelector(Selectors.MERGE.CONTROLS_ACTIONS.toString());

        if (!mergeControlsActions) {
            Debug.error('MergeUIController: Could not find merge controls container', null, 1);
            return;
        }

        // Clear any existing content from the container to ensure we only have our button
        mergeControlsActions.innerHTML = '';

        // Create the "Get merged result" button
        const getMergedResultBtn = document.createElement('button');
        getMergedResultBtn.id = Selectors.MERGE.GET_MERGED_RESULT_BTN.name();
        getMergedResultBtn.className = `${Selectors.UTILITY.BUTTON.name()} ${Selectors.UTILITY.BUTTON_PRIMARY.name()}`;
        getMergedResultBtn.title = getMergedResultTooltip;

        // Add download icon and text using the proper icon system
        const downloadIconHtml = DOMUtils.getIconHtml('download', { classes: Selectors.UTILITY.MARGIN_END_1.name() });
        getMergedResultBtn.innerHTML = `${downloadIconHtml} ${getMergedResultText}`;

        // Add to container (align to right)
        const buttonContainer = document.createElement('div');
        buttonContainer.className = `${Selectors.UTILITY.FLEX.name()} ${Selectors.UTILITY.JUSTIFY_CONTENT_BETWEEN.name()} w-100`;
        buttonContainer.style.width = '100%';

        // Add a spacer on the left to push the button to the right
        const spacer = document.createElement('div');
        spacer.style.flex = '1';

        buttonContainer.appendChild(spacer);
        buttonContainer.appendChild(getMergedResultBtn);
        mergeControlsActions.appendChild(buttonContainer);

        // Add event handler to show the preview content when clicked
        getMergedResultBtn.addEventListener('click', (event) => {
            event.preventDefault();

            // Use 'clipboard' merge type for non-file-browser modes
            this.mergeHandler.proceedWithMerge('clipboard');

            Debug.log('MergeUIController: Get merged result button clicked (using clipboard merge type)', null, 2);
        });

        Debug.log('MergeUIController: Local-only controls setup complete', null, 2);
    }
}
