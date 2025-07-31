import { Debug } from '../../utils/Debug';
import Selectors from '../../constants/Selectors';
import { DOMUtils } from '../../utils/DOMUtils';
import { TranslationManager } from '../../utils/TranslationManager';

/**
 * Manages browser UI generation for file-browser.php
 * This component handles the dynamic generation of UI elements that were previously
 * hardcoded in the PHP file, ensuring proper use of selectors and translations.
 */
export class BrowserUIManager {
    /**
     * @param {DiffViewer|Object} diffViewer - Parent diff viewer instance or options object
     */
    constructor (diffViewer) {
        // Handle both DiffViewer instance or options object
        if (diffViewer && diffViewer.options) {
            this.diffViewer = diffViewer;
            this.options = diffViewer.options;
        } else {
            this.diffViewer = null;
            this.options = diffViewer || {};
        }

        this.container = null;
        this.elements = {
            themeSwitcher: null,
            diffContainer: null,
            mergeControls: null
        };

        // Get the translation manager instance
        this.translationManager = TranslationManager.getInstance();

        // Log translation state for debugging
        let translationsSource;

        // Extract nested ternary operations into separate statements
        const hasWindowConfig = !!window.diffConfig?.translations;
        const hasOptionsTranslations = !!this.options?.translations;

        if (this.translationManager.isInitialized()) {
            translationsSource = 'TranslationManager';
        } else if (hasWindowConfig) {
            translationsSource = 'window.diffConfig';
        } else if (hasOptionsTranslations) {
            translationsSource = 'options';
        } else {
            translationsSource = 'none';
        }

        const lang = this.translationManager.getLanguage();

        Debug.log(`BrowserUIManager: Created with "${lang}" translations from ${translationsSource}`,
                 this.translationManager.getAllTranslations(), 2);
    }

    /**
     * Set the DiffViewer instance
     * @param {DiffViewer} diffViewer - The DiffViewer instance
     */
    setDiffViewer(diffViewer) {
        if (diffViewer && diffViewer.options) {
            this.diffViewer = diffViewer;
            this.options = diffViewer.options;
            Debug.log('BrowserUIManager: Updated DiffViewer reference', null, 3);
            return true;
        }
        return false;
    }

    /**
     * Get translations from options
     * @returns {Object} Translations object
     */
    getTranslations() {
        // First, try to get translations from the TranslationManager
        if (this.translationManager && this.translationManager.isInitialized()) {
            Debug.log('BrowserUIManager: Using translations from TranslationManager', this.translationManager.getAllTranslations(), 3);
            return this.translationManager.getAllTranslations();
        }

        // Second, try to auto-initialize TranslationManager with window.diffConfig
        if (window.diffConfig?.translations && typeof window.diffConfig.translations === 'object') {
            Debug.log('BrowserUIManager: Auto-initializing TranslationManager from window.diffConfig', window.diffConfig.translations, 3);
            this.translationManager.initialize(
                window.diffConfig.lang || 'en',
                window.diffConfig.translations
            );
            return this.translationManager.getAllTranslations();
        }

        // Fall back to local options if nothing else works
        if (this.options?.translations && typeof this.options.translations === 'object') {
            Debug.log('BrowserUIManager: Using translations from local options', this.options.translations, 3);
            return this.options.translations;
        }

        Debug.log('BrowserUIManager: No translations found, using empty object', null, 3);
        return {};
    }

    /**
     * Initialize UI components
     * @param {string} containerSelector - Container element selector
     */
    initialize(containerSelector = Selectors.CONTAINER.WRAPPER) {
        Debug.log('BrowserUIManager: Initializing UI components', null, 2);

        this.container = document.querySelector(containerSelector);

        if (!this.container) {
            Debug.error('BrowserUIManager: Container element not found', null, 2);
            return false;
        }

        // Change the order of generation - create diff container first
        this.generateDiffContainer();
        this.generateThemeSwitcher();
        this.generateThemeSelector();
        this.generateMergeControls();

        Debug.log('BrowserUIManager: UI components generated', null, 2);
        return true;
    }

    /**
     * Generate theme switcher UI
     */
    generateThemeSwitcher() {
        Debug.log('BrowserUIManager: Generating theme switcher', null, 3);

        // Get the ID without the # prefix for createElement
        const themeSwitcherId = Selectors.THEME.SWITCHER.name();
        const themeLoadingId = Selectors.THEME.LOADING_INDICATOR.name();
        const themeToggleId = Selectors.THEME.TOGGLE.name();

        // Check if theme switcher already exists and if it's still valid to reuse
        let themeSwitcher = document.getElementById(themeSwitcherId);

        if (themeSwitcher) {
            // Verify that the theme switcher is in a proper context (not orphaned)
            // and that the diff UI is being displayed (not in "identical files" mode)
            const diffContainer = document.getElementById(Selectors.DIFF.CONTAINER.name());

            if (diffContainer || this.container.contains(themeSwitcher)) {
                Debug.log('BrowserUIManager: Reusing existing theme switcher', themeSwitcherId, 2);
                // Store reference to existing element
                this.elements.themeSwitcher = themeSwitcher;

                // Ensure it's properly positioned in the container
                if (themeSwitcher.parentNode !== this.container) {
                    this.container.appendChild(themeSwitcher);
                }

                // Make sure it's visible and properly styled - but don't force display here
                // as it will be controlled by showThemeElements()/hideThemeElements()
                themeSwitcher.style.position = 'relative';
                return;
            } else {
                // Theme switcher exists but context is invalid, remove it and create new one
                Debug.log('BrowserUIManager: Removing orphaned theme switcher', themeSwitcherId, 2);
                themeSwitcher.remove();
                themeSwitcher = null;
            }
        }

        // Create new theme switcher element
        Debug.log('BrowserUIManager: Creating new theme switcher', themeSwitcherId, 2);
        themeSwitcher = document.createElement('div');
        themeSwitcher.id = themeSwitcherId;
        themeSwitcher.className = `${Selectors.UTILITY.FLEX.name()} ${Selectors.UTILITY.JUSTIFY_CONTENT_BETWEEN.name()} ${Selectors.UTILITY.PADDING_2.name()}`;
        themeSwitcher.style.cssText = 'display: none !important; position: relative;';

        // Create theme switcher wrapper
        const switcherWrapper = document.createElement('div');
        switcherWrapper.className = Selectors.THEME_SWITCHER.WRAPPER.name();

        // Get SVG icons for light/dark mode
        const sunIcon = DOMUtils.getIconHtml('sun', { classes: Selectors.UTILITY.MARGIN_END_2.name() });
        const moonIcon = DOMUtils.getIconHtml('moon', { classes: Selectors.UTILITY.MARGIN_START_2.name() });

        // Create theme switcher content with toggle
        switcherWrapper.innerHTML = `
            <span class="${Selectors.THEME_SWITCHER.LABEL.name()} ${Selectors.UTILITY.MARGIN_END_2.name()}">${sunIcon}</span>
            <label class="${Selectors.THEME_SWITCHER.CONTROL.name()}" for="${themeToggleId}">
                <input type="checkbox" id="${themeToggleId}" checked>
                <span class="${Selectors.THEME_SWITCHER.SLIDER.name()} ${Selectors.THEME_SWITCHER.SLIDER_ROUND.name()}"></span>
            </label>
            <span class="${Selectors.THEME_SWITCHER.LABEL.name()} ${Selectors.UTILITY.MARGIN_START_2.name()} ">${moonIcon}</span>
        `;

        // Append elements to theme switcher
        themeSwitcher.appendChild(switcherWrapper);

        // Create a separate container for the loader outside the theme switcher hierarchy
        const loadingContainer = document.createElement('div');
        loadingContainer.id = themeLoadingId;
        loadingContainer.style.display = 'none';
        loadingContainer.style.position = 'absolute';
        loadingContainer.style.zIndex = '1000';

        // Append theme switcher to container
        this.container.appendChild(themeSwitcher);

        // Append loading container to body for proper positioning
        document.body.appendChild(loadingContainer);

        // Store reference
        this.elements.themeSwitcher = themeSwitcher;
        this.elements.themeLoadingContainer = loadingContainer;

        // Watch for the vdm-diff__container to have 'loaded' class
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(() => {
                const diffContainer = document.getElementById(Selectors.DIFF.CONTAINER.name());
                if (diffContainer && diffContainer.classList.contains('loaded')) {
                    // If the container is loaded, make the theme switcher visible
                    if (themeSwitcher) {
                        themeSwitcher.style.cssText = 'display: flex !important; position: relative;';
                    }
                    // Disconnect the observer once we've made the change
                    observer.disconnect();
                }
            });
        });

        // Start observing the container's parent element for child changes
        const containerParent = this.container || document.body;
        observer.observe(containerParent, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ['class']
        });
    }

    /**
     * Generate theme selector UI
     * @returns {Object|null} The theme selector container and select element, or null if creation failed
     */
    generateThemeSelector() {
        Debug.log('BrowserUIManager: Generating theme selector', null, 3);

        // Get the ID without the # prefix for createElement
        const themeSelectorId = Selectors.THEME.SELECTOR.name();
        const themeSwitcherId = Selectors.THEME.SWITCHER.name();

        // Check if theme selector already exists and if it's still valid to reuse
        let existingSelector = document.getElementById(themeSelectorId);
        let selectorContainer = null;

        if (existingSelector) {
            selectorContainer = existingSelector.parentNode;
            // Verify that the theme selector is in a proper context (not orphaned)
            const themeSwitcher = document.getElementById(themeSwitcherId);

            if (themeSwitcher && themeSwitcher.contains(selectorContainer)) {
                Debug.log('BrowserUIManager: Reusing existing theme selector', themeSelectorId, 2);
                // Store reference to existing elements
                this.elements.themeSelector = existingSelector;
                this.elements.themeSelectorContainer = selectorContainer;
                return { container: selectorContainer, selectElement: existingSelector };
            } else {
                // Theme selector exists but context is invalid, remove it and create new one
                Debug.log('BrowserUIManager: Removing orphaned theme selector', themeSelectorId, 2);
                if (selectorContainer && selectorContainer.parentNode) {
                    selectorContainer.parentNode.removeChild(selectorContainer);
                }
                existingSelector = null;
                selectorContainer = null;
            }
        }

        // Get theme switcher container - theme selector must be inside it
        const themeSwitcherContainer = document.getElementById(themeSwitcherId);
        if (!themeSwitcherContainer) {
            Debug.warn('BrowserUIManager: No theme switcher container found for theme selector', null, 2);
            return null;
        }

        // Create new theme selector container and element
        Debug.log('BrowserUIManager: Creating new theme selector', themeSelectorId, 2);

        // Create the container using utility classes
        selectorContainer = document.createElement('div');
        selectorContainer.className = `${Selectors.THEME_SELECTOR.WRAPPER.name()} ${Selectors.UTILITY.MARGIN_END_3.name()}`;

        // Create select element
        const selectElement = document.createElement('select');
        selectElement.id = themeSelectorId;
        selectElement.className = `${Selectors.UTILITY.FORM_SELECT.name()} ${Selectors.UTILITY.FORM_SELECT.name()}`;

        // Append select to container
        selectorContainer.appendChild(selectElement);

        // Insert the selector container at the beginning of the theme switcher
        themeSwitcherContainer.insertBefore(selectorContainer, themeSwitcherContainer.firstChild);

        // Store references
        this.elements.themeSelector = selectElement;
        this.elements.themeSelectorContainer = selectorContainer;

        Debug.log('BrowserUIManager: Theme selector created and added to DOM', null, 2);
        return { container: selectorContainer, selectElement: selectElement };
    }

    /**
     * Generate diff container UI
     */
    generateDiffContainer() {
        Debug.log('BrowserUIManager: Generating diff container', null, 3);

        // Get IDs without the # prefix for createElement
        const diffContainerId = Selectors.DIFF.CONTAINER.name();
        const viewerId = Selectors.DIFF.VIEWER.name();

        // Create diff container
        const diffContainer = document.createElement('div');
        diffContainer.id = diffContainerId;

        // Create viewer element
        const viewerElement = document.createElement('div');
        viewerElement.id = viewerId;
        viewerElement.className = Selectors.UTILITY.MARGIN_TOP_2.name();
        viewerElement.style.display = 'none';

        // Set up a mutation observer to watch for display changes on the viewer element
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' &&
                    mutation.attributeName === 'style' &&
                    viewerElement.style.display !== 'none') {
                    // If viewer becomes visible, show the theme switcher
                    if (this.elements.themeSwitcher) {
                        this.elements.themeSwitcher.style.display = 'flex';
                    }
                }
            });
        });

        // Start observing the viewer element for style changes
        observer.observe(viewerElement, { attributes: true });

        // Append elements to diff container
        diffContainer.appendChild(viewerElement);

        // Append diff container to container
        this.container.appendChild(diffContainer);

        // Store reference and log creation
        this.elements.diffContainer = diffContainer;

        // Verify the element was created
        const createdViewer = document.getElementById(viewerId);
        Debug.log(`BrowserUIManager: Viewer element (${viewerId}) created successfully: ${!!createdViewer}`, null, 3);
    }

    /**
     * Generate merge controls UI using translations from DiffViewer
     */
    generateMergeControls() {
        Debug.log('BrowserUIManager: Generating merge controls structure only', null, 3);

        // Get translations from options
        const translations = this.getTranslations();

        // Get IDs without the # prefix for createElement
        const previewButtonId = Selectors.MERGE.BUTTON_PREVIEW.name();
        const toggleButtonId = Selectors.MERGE.DESTINATION_TOGGLE.name();
        const toggleIconId = Selectors.MERGE.TOGGLE_ICON.name();
        const toggleTextId = Selectors.MERGE.TOGGLE_TEXT.name();
        const dropdownId = Selectors.MERGE.DESTINATION_DROPDOWN.name();
        const applyButtonId = Selectors.MERGE.BUTTON_APPLY.name();

        // Create merge controls container
        const mergeControls = document.createElement('div');
        mergeControls.className = `${Selectors.MERGE.CONTROLS_ACTIONS.name()} ${Selectors.UTILITY.FLEX.name()} ${Selectors.UTILITY.ALIGN_ITEMS_CENTER.name()} ${Selectors.UTILITY.JUSTIFY_CONTENT_BETWEEN.name()} ${Selectors.UTILITY.MARGIN_Y_2.name()} ${Selectors.UTILITY.PADDING_2.name()}`;

        // Create preview button section
        const previewSection = document.createElement('div');

        const previewButton = document.createElement('button');
        previewButton.id = previewButtonId;
        previewButton.className = `${Selectors.UTILITY.BUTTON.name()} ${Selectors.UTILITY.BUTTON_INFO.name()}`;
        previewButton.type = 'button';
        previewButton.innerHTML = `${DOMUtils.getIconHtml('eye', { classes: Selectors.UTILITY.MARGIN_END_2.name() })}${translations.preview || 'Preview'}`;

        previewSection.appendChild(previewButton);

        // Create merge controls section
        const mergeSection = document.createElement('div');
        mergeSection.className = `${Selectors.UTILITY.FLEX.name()} ${Selectors.UTILITY.ALIGN_ITEMS_CENTER.name()}`;

        // Create a group for toggle button and dropdown - using input-group styling approach
        const toggleGroup = document.createElement('div');
        toggleGroup.className = `${Selectors.UTILITY.FLEX.name()} ${Selectors.UTILITY.ALIGN_ITEMS_STRETCH.name()} ${Selectors.UTILITY.MARGIN_END_3.name()}`;
        // Add class for styling instead of inline style
        toggleGroup.classList.add('vdm-input-group');

        // Create destination toggle button
        const toggleButton = document.createElement('button');
        toggleButton.id = toggleButtonId;
        toggleButton.className = `${Selectors.UTILITY.BUTTON.name()} ${Selectors.UTILITY.BUTTON_FLAT.name()} vdm-input-group__prepend`;
        toggleButton.type = 'button'; // Explicitly set type to button

        const toggleIcon = document.createElement('span');
        toggleIcon.id = toggleIconId;
        toggleIcon.innerHTML = DOMUtils.getIconHtml('plus-circle', { classes: Selectors.UTILITY.MARGIN_END_2.name() });

        const toggleText = document.createElement('span');
        toggleText.id = toggleTextId;
        toggleText.setAttribute('title', translations.saveToOriginalTooltip || 'Replace the current file with merged content');
        toggleText.textContent = translations.saveToOriginal || 'Save to original';

        toggleButton.appendChild(toggleIcon);
        toggleButton.appendChild(toggleText);

        // Create empty destination dropdown - IMPORTANT CHANGE: No options added
        const dropdown = document.createElement('select');
        dropdown.id = dropdownId;
        dropdown.className = `${Selectors.UTILITY.FORM_SELECT.name()} vdm-input-group__append vdm-select-auto-width`;
        // No options are added here - This will be handled by MergeUIController

        // Add toggle button and dropdown to the toggle group with no spacing between them
        toggleGroup.appendChild(toggleButton);
        toggleGroup.appendChild(dropdown);

        // Create apply merge button
        const applyButton = document.createElement('button');
        applyButton.id = applyButtonId;
        applyButton.className = `${Selectors.UTILITY.BUTTON.name()} ${Selectors.UTILITY.BUTTON_PRIMARY.name()} vdm-nowrap`;
        applyButton.type = 'button';
        applyButton.innerHTML = (translations.applyMerge || 'Apply Merge') + ` ${DOMUtils.getIconHtml('file-circle-plus', { classes: Selectors.UTILITY.MARGIN_START_2.name() })}`;
        applyButton.style.whiteSpace = 'nowrap';
        applyButton.style.display = 'inline-flex';
        applyButton.style.alignItems = 'center';

        // Append toggle group and apply button to merge section
        mergeSection.appendChild(toggleGroup);
        mergeSection.appendChild(applyButton);

        // Append sections to merge controls
        mergeControls.appendChild(previewSection);
        mergeControls.appendChild(mergeSection);

        // Append merge controls to container
        this.container.appendChild(mergeControls);

        // Store reference
        this.elements.mergeControls = mergeControls;

        Debug.log('BrowserUIManager: Created empty merge controls structure (options will be populated by MergeUIController)', null, 2);
    }

    /**
     * Show theme loading indicator using the LoaderManager
     */
    showThemeLoading() {
        const loadingContainer = this.elements.themeLoadingContainer;
        const themeSwitcher = this.elements.themeSwitcher;

        if (loadingContainer && themeSwitcher) {
            // Get the translated message
            const message = TranslationManager.getInstance().get('loadingTheme', 'Loading theme...');

            // Use proper CSS classes for styling
            loadingContainer.innerHTML = `
                <div class="vdm-theme__loading-spinner"></div>
                <span>${message}</span>
            `;

            // Add styling for the translucid background and rounded corners
            loadingContainer.className = 'vdm-theme__loading-indicator';

            // Get the position of the theme switcher
            const rect = themeSwitcher.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Position the loader just above the theme switcher
            loadingContainer.style.top = (rect.top + scrollTop - 40) + 'px';

            // Make the loader visible
            loadingContainer.style.display = 'flex';
        }
    }

    /**
     * Hide theme loading indicator
     */
    hideThemeLoading() {
        const loadingContainer = this.elements.themeLoadingContainer;
        if (loadingContainer) {
            loadingContainer.style.display = 'none';
        }
    }

    /**
     * Clean up event handlers and resources
     */
    destroy() {
        Debug.log('BrowserUIManager: Destroying UI components', null, 2);

        // Hide any active theme loader
        this.hideThemeLoading();

        // Remove generated elements (except theme switcher which should be preserved across instances)
        // Note: Theme switcher is preserved by FileBrowserManager.clearUI() to maintain user experience
        // if (this.elements.themeSwitcher && this.elements.themeSwitcher.parentNode) {
        //     this.elements.themeSwitcher.parentNode.removeChild(this.elements.themeSwitcher);
        // }

        if (this.elements.diffContainer && this.elements.diffContainer.parentNode) {
            this.elements.diffContainer.parentNode.removeChild(this.elements.diffContainer);
        }

        if (this.elements.mergeControls && this.elements.mergeControls.parentNode) {
            this.elements.mergeControls.parentNode.removeChild(this.elements.mergeControls);
        }

        // Reset references but keep theme switcher and theme selector references if they still exist in DOM
        const existingThemeSwitcher = document.getElementById(Selectors.THEME.SWITCHER.name());
        const existingThemeSelector = document.getElementById(Selectors.THEME.SELECTOR.name());
        const existingThemeSelectorContainer = existingThemeSelector ? existingThemeSelector.parentNode : null;

        this.elements = {
            themeSwitcher: existingThemeSwitcher || null,  // Keep reference if still in DOM
            themeSelector: existingThemeSelector || null,  // Keep theme selector reference too
            themeSelectorContainer: existingThemeSelectorContainer || null,  // Keep container reference
            diffContainer: null,
            mergeControls: null
        };

        // Clear DiffViewer reference
        this.diffViewer = null;

        Debug.log('BrowserUIManager: UI components destroyed', null, 2);
    }

    /**
     * Hide theme UI elements when no diff is being displayed (identical files)
     */
    hideThemeElements() {
        Debug.log('BrowserUIManager: Hiding theme elements for identical content', null, 2);

        if (this.elements.themeSwitcher) {
            // Use important to ensure hiding works
            this.elements.themeSwitcher.style.cssText = 'display: none !important; position: relative;';
            Debug.log('BrowserUIManager: Hidden theme switcher', this.elements.themeSwitcher.id, 2);
        }

        // Also hide any standalone theme selector
        const themeSelector = document.getElementById(Selectors.THEME.SELECTOR.name());
        if (themeSelector) {
            themeSelector.style.display = 'none';
            Debug.log('BrowserUIManager: Hidden standalone theme selector', themeSelector.id, 2);
        }
    }

    /**
     * Show theme UI elements when diff is being displayed
     */
    showThemeElements() {
        Debug.log('BrowserUIManager: Showing theme elements for diff content', null, 2);

        if (this.elements.themeSwitcher) {
            // Use important to override the initial !important hiding
            this.elements.themeSwitcher.style.cssText = 'display: flex !important; position: relative;';
            Debug.log('BrowserUIManager: Shown theme switcher', this.elements.themeSwitcher.id, 2);
        }

        // Also show any standalone theme selector
        const themeSelector = document.getElementById(Selectors.THEME.SELECTOR.name());
        if (themeSelector) {
            themeSelector.style.display = 'block';
            Debug.log('BrowserUIManager: Shown standalone theme selector', themeSelector.id, 2);
        }
    }
}
