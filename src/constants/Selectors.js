/**
 * Centralized selectors for DOM elements
 * Using this object allows for easier maintenance and refactoring
 * All selectors include their prefix (# for IDs, . for classes)
 */

// Import Debug for warning messages
import { Debug } from '../utils/Debug';

// Create a proxy handler to intercept property access
const selectorHandler = {
  get(target, prop) {
    // Handle the name() method
    if (prop === 'name') {
      return function() {
        if (target.startsWith('#') || target.startsWith('.')) {
          return target.substring(1);
        } else {
          Debug.warn(`Selector '${target}' doesn't start with '.' or '#' but name() was called on it`);
          return target;
        }
      };
    }

    // Add toString method to allow direct usage in DOM methods
    if (prop === 'toString' || prop === Symbol.toPrimitive) {
      return function() {
        return String(target);
      };
    }

    // Return the original property
    return target[prop];
  }
};

// Function to process all selectors with the proxy
const processSelectors = (obj) => {
  const result = {};

  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result[key] = processSelectors(obj[key]);
    } else if (typeof obj[key] === 'string') {
      // Apply the proxy to each selector string
      result[key] = new Proxy(Object(String(obj[key])), selectorHandler);
    } else {
      result[key] = obj[key];
    }
  }

  return result;
};

// Override utility selectors with values from window.diffConfig.ui if available
const getUtilitySelectors = () => {
  // Default utility selectors
  const defaultUtilitySelectors = {
    BUTTON: '.vdm-btn',
    BUTTON_PRIMARY: '.vdm-btn--primary',
    BUTTON_SECONDARY: '.vdm-btn--secondary',
    BUTTON_INFO: '.vdm-btn--info',
    BUTTON_SUCCESS: '.vdm-btn--success',
    BUTTON_WARNING: '.vdm-btn--warning',
    BUTTON_DANGER: '.vdm-btn--danger',
    BUTTON_FLAT: '.vdm-btn--flat',
    BUTTON_SMALL: '.vdm-btn-sm',
    BUTTON_EXTRA_SMALL: '.vdm-btn-xs',
    BUTTON_LARGE: '.vdm-btn-lg',
    ALERT: '.vdm-alert',
    ALERT_PREFIX: '.vdm-alert--',
    ALERT_INFO: '.vdm-alert--info',
    ALERT_SUCCESS: '.vdm-alert--success',
    ALERT_WARNING: '.vdm-alert--warning',
    ALERT_DANGER: '.vdm-alert--danger',
    FORM_SELECT: '.vdm-select',
    FORM_SELECT_SM: '.vdm-select-sm',
    FLEX: '.vdm-d-flex',
    FLEX_COLUMN: '.vdm-flex-column',
    JUSTIFY_CONTENT_BETWEEN: '.vdm-justify-content-between',
    JUSTIFY_CONTENT_CENTER: '.vdm-justify-content-center',
    ALIGN_ITEMS_CENTER: '.vdm-align-items-center',
    ALIGN_ITEMS_STRETCH: '.vdm-align-items-stretch',
    PADDING_2: '.vdm-p-2',
    PADDING_3: '.vdm-p-3',
    MARGIN_2: '.vdm-m-2',
    MARGIN_TOP_2: '.vdm-mt-2',
    MARGIN_BOTTOM_2: '.vdm-mb-2',
    MARGIN_START_1: '.vdm-ms-1',
    MARGIN_START_2: '.vdm-ms-2',
    MARGIN_END_2: '.vdm-me-2',
    MARGIN_END_3: '.vdm-me-3',
    MARGIN_X_1: '.vdm-mx-1',
    MARGIN_Y_2: '.vdm-my-2',
    MARGIN_END_1: '.vdm-me-1'
  };

  // If window.diffConfig exists and has UI settings, override with those
  if (window.diffConfig && window.diffConfig.ui) {
    try {
      // Map PHP ui settings to our selector format
      if (window.diffConfig.ui.button) {
        defaultUtilitySelectors.BUTTON = '.' + window.diffConfig.ui.button;
      }
      if (window.diffConfig.ui.buttonPrimary) {
        defaultUtilitySelectors.BUTTON_PRIMARY = '.' + window.diffConfig.ui.buttonPrimary;
      }
      if (window.diffConfig.ui.buttonSecondary) {
        defaultUtilitySelectors.BUTTON_SECONDARY = '.' + window.diffConfig.ui.buttonSecondary;
      }
      if (window.diffConfig.ui.buttonInfo) {
        defaultUtilitySelectors.BUTTON_INFO = '.' + window.diffConfig.ui.buttonInfo;
      }
      if (window.diffConfig.ui.buttonSuccess) {
        defaultUtilitySelectors.BUTTON_SUCCESS = '.' + window.diffConfig.ui.buttonSuccess;
      }
      if (window.diffConfig.ui.buttonWarning) {
        defaultUtilitySelectors.BUTTON_WARNING = '.' + window.diffConfig.ui.buttonWarning;
      }
      if (window.diffConfig.ui.buttonDanger) {
        defaultUtilitySelectors.BUTTON_DANGER = '.' + window.diffConfig.ui.buttonDanger;
      }
      if (window.diffConfig.ui.buttonFlat) {
        defaultUtilitySelectors.BUTTON_FLAT = '.' + window.diffConfig.ui.buttonFlat;
      }
      if (window.diffConfig.ui.alert) {
        defaultUtilitySelectors.ALERT = '.' + window.diffConfig.ui.alert;
      }
      if (window.diffConfig.ui.alertInfo) {
        defaultUtilitySelectors.ALERT_INFO = '.' + window.diffConfig.ui.alertInfo;
      }
      if (window.diffConfig.ui.alertSuccess) {
        defaultUtilitySelectors.ALERT_SUCCESS = '.' + window.diffConfig.ui.alertSuccess;
      }
      if (window.diffConfig.ui.alertWarning) {
        defaultUtilitySelectors.ALERT_WARNING = '.' + window.diffConfig.ui.alertWarning;
      }
      if (window.diffConfig.ui.alertDanger) {
        defaultUtilitySelectors.ALERT_DANGER = '.' + window.diffConfig.ui.alertDanger;
      }

      Debug.log('Overriding UI selectors with config values', window.diffConfig.ui, 2);
    } catch (e) {
      Debug.error('Error applying UI selector overrides from config', e, 1);
    }
  }

  return defaultUtilitySelectors;
};

const baseSelectors = {
    // Code display
    CODE: {
        LINE_CONTENT: '.vdm-code__line-content',
        LINE_EMPTY: '.vdm-code__line--empty',
        LINE_NUMBER: '.vdm-code__line-number',
        TABLE: '.vdm-code__table'
    },

    // Container elements
    CONTAINER: {
        ROOT: '#vdm-container',
        WRAPPER: '#vdm-container__wrapper'
    },

    // Copy functionality
    COPY: {
        BUTTON: '.vdm-code__copy-btn',
        COPIED: '.vdm-code__copy--copied',
        ICON: '.vdm-code__copy-icon',
        MODAL: {
            ACTIONS: '.vdm-modal__copy-actions',
            BUTTON: '.vdm-modal__copy-btn',
            DIALOG: '.vdm-modal__copy-dialog',
            INSTRUCTIONS: '.vdm-modal__copy-instructions',
            TEXTAREA: '.vdm-modal__copy-textarea-container',
            TEXTAREA_ELEM: '.vdm-modal__copy-textarea'
        },
        PROCESSING: '.vdm-code__copy--processing',
        TEXT: '.vdm-code__copy-text'
    },

    // Diff viewer elements
    DIFF: {
        CHECK_ALL_BTN: '.vdm-check-all-btn',
        CHUNK: '.vdm-diff__chunk',
        CHUNK_SELECTED: '.vdm-diff__chunk--selected',
        CHUNK_UNSELECTED: '.vdm-diff__chunk--unselected',
        CONTAINER: '#vdm-diff__container',
        CONTENT_WRAPPER: '#vdm-diff__content-wrapper',
        LINE_ADD: '.vdm-diff__line--add',
        LINE_CONTENT: '.vdm-code__line-content',
        LINE_CONTENT_EMPTY: '.vdm-code__line-content--empty',
        LINE_DELETE: '.vdm-diff__line--delete',
        LINE_PLACEHOLDER: '.vdm-diff__line--placeholder',
        LINE_REPLACE_LEFT: '.vdm-diff__line--replace-left',
        LINE_REPLACE_RIGHT: '.vdm-diff__line--replace-right',
        // LOADING selector removed - use Selectors.LOADER.MAIN instead
        PANE: '.vdm-diff__pane',
        PANE_CONTENT: '.vdm-diff__pane-content',
        PANE_HEADER: '.vdm-pane-header',
        PANE_LEFT: '#vdm-diff__pane--left',
        PANE_RIGHT: '#vdm-diff__pane--right',
        PANES_CONTAINER: '.vdm-diff__panes-container',
        PLACEHOLDER: '.vdm-diff__placeholder',
        TABLE_WRAPPER: '.vdm-diff__table-wrapper',
        VIEWER: '#vdm-diff__viewer'
    },

    // Icon markers
    ICONS: {
        COLUMN: '.vdm-icon__column',
        MARKER: '.vdm-icon__marker',
        MARKER_PLACEHOLDER: '.vdm-icon__marker--placeholder',
        SELECT: '.vdm-icon__select',
        SELECT_LEFT: '.vdm-icon__select--left',
        SELECT_RIGHT: '.vdm-icon__select--right'
    },

    // Loader elements
    LOADER: {
        ACTIVE: '.vdm-loader--active',
        CONTAINER: '.vdm-loader__container',
        FULLSCREEN: '.vdm-loader--fullscreen',
        INDICATOR: '#vdm-loader__indicator',
        INLINE: '.vdm-loader--inline',
        MAIN: '#vdm-diff__loading', // Main application loader (previously DIFF.LOADING)
        SPINNER: '.vdm-loader__spinner',
        TEXT: '.vdm-loader__text',
        WRAPPER: '.vdm-loader__wrapper'
    },

    // Merge controls
    MERGE: {
        BUTTON_APPLY: '#vdm-merge__button--apply',
        BUTTON_PREVIEW: '#vdm-merge__button--preview',
        CONFLICT_MODAL: '#vdm-merge__conflict-modal',
        CONTROLS_ACTIONS: '.vdm-merge-controls__actions',
        DESTINATION_DROPDOWN: '#vdm-merge__destination-dropdown',
        DESTINATION_TOGGLE: '#vdm-merge__destination-toggle',
        GET_MERGED_RESULT_BTN: '#vdm-merge__get-merged-result-btn',
        MODAL: '#vdm-merge__modal',
        PREVIEW_CONTENT: '#vdm-merge__preview-content',
        PREVIEW_MODAL: '#vdm-merge__preview-modal',
        TOGGLE_ICON: '#vdm-merge-controls__toggle-icon',
        TOGGLE_TEXT: '#vdm-merge-controls__toggle-text'
    },

    // Modal dialogs
    MODAL: {
        BACKDROP: '#vdm-modal-backdrop',
        CLOSE: '.vdm-modal__close',
        CLOSE_BTN: '.vdm-modal__close', // Changed from ID to class
        CODE_COPY: '#vdm-modal--code-copy',
        CONFIRM: '#vdm-modal--confirm',
        CONFIRMATION_CONTENT: '#vdm-modal__confirmation-content',
        CONTAINER: '.vdm-modal',
        CONTENT: '.vdm-modal__content',
        CONTINUE_BTN: '#vdm-modal__continue-btn',
        COPY_CONTENT: '#vdm-modal__copy-content',
        FIXED_FOOTER: '.vdm-modal--fixed-footer',
        FOOTER: '.vdm-modal__footer',
        FULLSCREEN: '.vdm-modal--fullscreen',
        HEADER: '.vdm-modal__header',
        HEADER_FIXED: '.vdm-modal__header--fixed',
        MERGE_BTN: '#vdm-modal__merge-btn',
        MESSAGE: '#vdm-modal__message',
        PREVIEW: '#vdm-modal--preview',
        PREVIEW_CONTENT: '.vdm-modal__preview-content',
        PREVIEW_CONTENT_ID: '#vdm-merge__preview-content',
        PREVIEW_FILENAME: '#vdm-modal__preview-filename',
        TITLE: '.vdm-modal__title'
    },

    // Navigation
    NAVIGATION: {
        CONTAINER: '.vdm-nav__controls',
        COUNTER: '#vdm-nav__counter',
        COUNTER_ELEMENT: '.vdm-navigator__counter',
        HIGHLIGHT: '.vdm-highlight',
        NAV_CHUNK: '.vdm-nav__chunk',
        NEXT_BUTTON: '#vdm-nav__button--next',
        PREV_BUTTON: '#vdm-nav__button--prev'
    },

    // Status indicators
    STATUS: {
        LOADED: '.vdm-status__loaded',
        RESOLVED: '.vdm-status__resolved',
        SCROLLED: '.vdm-status__scrolled-horizontally',
        UNRESOLVED: '.vdm-status__unresolved'
    },

    // Theme and appearance
    THEME: {
        DARK: '.vdm-theme--dark',
        LIGHT: '.vdm-theme--light',
        LOADING_INDICATOR: '#vdm-theme__loading-indicator',
        MODE_PREFIX: '.vdm-theme',
        SELECTOR: '#vdm-theme__selector',
        SWITCHER: '#vdm-theme-switcher',
        TOGGLE: '#vdm-theme__toggle'
    },

    // Theme switcher components
    THEME_SWITCHER: {
        CONTROL: '.vdm-theme-switcher__control',
        LABEL: '.vdm-theme-switcher__label',
        SLIDER: '.vdm-theme-switcher__slider',
        SLIDER_ROUND: '.vdm-theme-switcher__slider--round',
        WRAPPER: '.vdm-theme-switcher__wrapper'
    },

    // Theme selector components
    THEME_SELECTOR: {
        WRAPPER: '.vdm-theme-selector__wrapper'
    },

    // Tooltips
    TOOLTIP: {
        ARROW: '.vdm-tooltip__arrow',
        CONTAINER: '.vdm-tooltip',
        CONTENT: '.vdm-tooltip__content'
    },

    // Utility classes - these can be overridden from PHP config
    UTILITY: getUtilitySelectors()
};

// Process the selectors to add the name functionality
const Selectors = processSelectors(baseSelectors);

export default Selectors;
