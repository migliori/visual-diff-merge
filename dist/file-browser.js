(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

// UNUSED EXPORTS: BrowserUIManager, FileBrowserManager

;// ./src/utils/Debug.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Debug utility for the diff viewer
 * Provides centralized logging with configuration options
 */
/* eslint-disable no-console */
// Disable console warnings for this file only since this is the official logging utility
var DebugUtility = /*#__PURE__*/function () {
  function DebugUtility() {
    _classCallCheck(this, DebugUtility);
    this.enabled = false;
    this.logHistory = [];
    this.maxLogHistory = 100;
    this.prefix = '[DiffViewer]';
    this.logLevel = 1; // Default to only high-level logs
  }

  /**
   * Initialize debug settings
   * @param {boolean} enabled - Enable debug output
   * @param {string} prefix - Prefix for all log messages
   * @param {number} logLevel - Log level (1=high-level, 2=detailed, 3=verbose)
   */
  return _createClass(DebugUtility, [{
    key: "initialize",
    value: function initialize() {
      var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '[DiffViewer]';
      var logLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      // Prevent reinitialization with weaker settings if already properly configured
      if (this.enabled && this.logLevel > 1 && !enabled) {
        console.warn("".concat(this.prefix, " Preventing debug reinitialization with weaker settings"), {
          current: {
            enabled: this.enabled,
            level: this.logLevel
          },
          attempted: {
            enabled: enabled,
            level: logLevel
          }
        });
        return;
      }
      this.enabled = enabled;
      this.prefix = prefix;
      this.logLevel = logLevel; // Don't tie logLevel to enabled state

      console.log('Debug initialized', {
        enabled: this.enabled,
        level: this.logLevel
      });
      this.log('Debug initialized', {
        enabled: this.enabled,
        level: this.logLevel
      });
    }

    /**
     * Check if a message should be logged at the given level
     * @param {number} level - The log level of the message
     * @returns {boolean} - Whether the message should be logged
     */
  }, {
    key: "shouldLog",
    value: function shouldLog() {
      var _window$diffConfig;
      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      // Use instance state as primary source of truth
      // Only fall back to window.diffConfig if not explicitly initialized
      var debugEnabled = this.enabled || this.enabled === false && ((_window$diffConfig = window.diffConfig) === null || _window$diffConfig === void 0 ? void 0 : _window$diffConfig.debug);
      return debugEnabled && level <= this.logLevel;
    }

    /**
     * Log an informational message
     * @param {string} message - The primary message
     * @param {any} data - Additional data to log
     * @param {number} level - Log level (1=high-level, 2=detailed, 3=verbose)
     */
  }, {
    key: "log",
    value: function log(message) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      if (!this.shouldLog(level)) return;
      if (data !== null) {
        console.log("".concat(this.prefix, " ").concat(message), data);
        this._addToHistory('log', [message, data], level);
      } else {
        console.log("".concat(this.prefix, " ").concat(message));
        this._addToHistory('log', [message], level);
      }
    }

    /**
     * Log a warning message (always shown regardless of debug setting)
     * @param {string} message - The primary message
     * @param {any} data - Additional data to log
     * @param {number} level - Log level (always shown, but stored with level)
     */
  }, {
    key: "warn",
    value: function warn(message) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      // Warnings are always shown regardless of debug setting
      if (data !== null) {
        console.warn("".concat(this.prefix, " ").concat(message), data);
        this._addToHistory('warn', [message, data], level);
      } else {
        console.warn("".concat(this.prefix, " ").concat(message));
        this._addToHistory('warn', [message], level);
      }
    }

    /**
     * Log an error message (always shown regardless of debug setting)
     * @param {string} message - The primary message
     * @param {any} data - Additional data to log
     * @param {number} level - Log level (always shown, but stored with level)
     */
  }, {
    key: "error",
    value: function error(message) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      // Errors are always shown regardless of debug setting
      if (data !== null) {
        console.error("".concat(this.prefix, " ").concat(message), data);
        this._addToHistory('error', [message, data], level);
      } else {
        console.error("".concat(this.prefix, " ").concat(message));
        this._addToHistory('error', [message], level);
      }
    }

    /**
     * Get debug log history
     * @param {number} maxLevel - Maximum level to include (1=high-level only, 3=all)
     * @returns {Array} Log history filtered by level
     */
  }, {
    key: "getLogHistory",
    value: function getLogHistory() {
      var maxLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.logLevel;
      if (maxLevel >= this.logLevel) {
        return _toConsumableArray(this.logHistory);
      }
      return this.logHistory.filter(function (entry) {
        return entry.level <= maxLevel;
      });
    }

    /**
     * Clear debug log history
     */
  }, {
    key: "clearLogHistory",
    value: function clearLogHistory() {
      this.logHistory = [];
      this.log('Log history cleared');
    }

    /**
     * Add entry to log history
     * @private
     * @param {string} type - Log type (log, warn, error)
     * @param {Array} args - Message arguments
     * @param {number} level - Log level
     */
  }, {
    key: "_addToHistory",
    value: function _addToHistory(type, args, level) {
      this.logHistory.push({
        timestamp: new Date(),
        type: type,
        message: args,
        level: level
      });

      // Prevent excessive memory usage
      if (this.logHistory.length > this.maxLogHistory) {
        this.logHistory.shift();
      }
    }
  }]);
}(); // Create singleton instance
var Debug = new DebugUtility();

// Export the singleton

;// ./src/constants/Selectors.js
function Selectors_typeof(o) { "@babel/helpers - typeof"; return Selectors_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, Selectors_typeof(o); }
/**
 * Centralized selectors for DOM elements
 * Using this object allows for easier maintenance and refactoring
 * All selectors include their prefix (# for IDs, . for classes)
 */

// Import Debug for warning messages


// Create a proxy handler to intercept property access
var selectorHandler = {
  get: function get(target, prop) {
    // Handle the name() method
    if (prop === 'name') {
      return function () {
        if (target.startsWith('#') || target.startsWith('.')) {
          return target.substring(1);
        } else {
          Debug.warn("Selector '".concat(target, "' doesn't start with '.' or '#' but name() was called on it"));
          return target;
        }
      };
    }

    // Add toString method to allow direct usage in DOM methods
    if (prop === 'toString' || prop === Symbol.toPrimitive) {
      return function () {
        return String(target);
      };
    }

    // Return the original property
    return target[prop];
  }
};

// Function to process all selectors with the proxy
var _processSelectors = function processSelectors(obj) {
  var result = {};
  for (var key in obj) {
    if (Selectors_typeof(obj[key]) === 'object' && obj[key] !== null) {
      result[key] = _processSelectors(obj[key]);
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
var getUtilitySelectors = function getUtilitySelectors() {
  // Default utility selectors
  var defaultUtilitySelectors = {
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
var baseSelectors = {
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
    MAIN: '#vdm-diff__loading',
    // Main application loader (previously DIFF.LOADING)
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
    CLOSE_BTN: '.vdm-modal__close',
    // Changed from ID to class
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
var Selectors = _processSelectors(baseSelectors);
/* harmony default export */ const constants_Selectors = (Selectors);
;// ./src/utils/BaseSingleton.js
function BaseSingleton_typeof(o) { "@babel/helpers - typeof"; return BaseSingleton_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, BaseSingleton_typeof(o); }
function BaseSingleton_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function BaseSingleton_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, BaseSingleton_toPropertyKey(o.key), o); } }
function BaseSingleton_createClass(e, r, t) { return r && BaseSingleton_defineProperties(e.prototype, r), t && BaseSingleton_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function BaseSingleton_toPropertyKey(t) { var i = BaseSingleton_toPrimitive(t, "string"); return "symbol" == BaseSingleton_typeof(i) ? i : i + ""; }
function BaseSingleton_toPrimitive(t, r) { if ("object" != BaseSingleton_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != BaseSingleton_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Base singleton implementation to standardize pattern across components
 */
var BaseSingleton = /*#__PURE__*/function () {
  function BaseSingleton() {
    BaseSingleton_classCallCheck(this, BaseSingleton);
  }
  return BaseSingleton_createClass(BaseSingleton, [{
    key: "_isFirstInstance",
    value:
    /**
     * Check if this instance is already instantiated
     * @protected
     * @param {Object} instanceVar - The module-level instance variable
     * @returns {boolean} True if this is the first initialization
     */
    function _isFirstInstance(instanceVar) {
      return !instanceVar;
    }
  }], [{
    key: "getInstance",
    value:
    /**
     * Get the singleton instance - must be implemented by subclasses
     * @returns {BaseSingleton} The singleton instance
     */
    function getInstance() {
      throw new Error('getInstance() must be implemented by subclass');
    }
  }]);
}();
;// ./src/utils/TranslationManager.js
function TranslationManager_typeof(o) { "@babel/helpers - typeof"; return TranslationManager_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, TranslationManager_typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function TranslationManager_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function TranslationManager_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, TranslationManager_toPropertyKey(o.key), o); } }
function TranslationManager_createClass(e, r, t) { return r && TranslationManager_defineProperties(e.prototype, r), t && TranslationManager_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == TranslationManager_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = TranslationManager_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function TranslationManager_toPropertyKey(t) { var i = TranslationManager_toPrimitive(t, "string"); return "symbol" == TranslationManager_typeof(i) ? i : i + ""; }
function TranslationManager_toPrimitive(t, r) { if ("object" != TranslationManager_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != TranslationManager_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Translation Manager
 * Provides centralized access to translations throughout the application
 */



/**
 * Singleton class that manages translations across the application
 */
var TranslationManager = /*#__PURE__*/function (_BaseSingleton) {
  /**
   * Constructor - private, use getInstance()
   */
  function TranslationManager() {
    var _this;
    TranslationManager_classCallCheck(this, TranslationManager);
    _this = _callSuper(this, TranslationManager);
    _this.translations = {};
    _this.lang = 'en';
    _this.initialized = false;

    // IMPORTANT: Initialize immediately with window.diffConfig if available
    _this._initializeFromGlobalConfig();
    return _this;
  }

  /**
   * Try to initialize from global config immediately
   * @private
   */
  _inherits(TranslationManager, _BaseSingleton);
  return TranslationManager_createClass(TranslationManager, [{
    key: "_initializeFromGlobalConfig",
    value: function _initializeFromGlobalConfig() {
      if (window.diffConfig && window.diffConfig.translations) {
        Debug.log('TranslationManager: Auto-initializing from window.diffConfig', window.diffConfig.translations, 2);
        this.initialize(window.diffConfig.lang || 'en', window.diffConfig.translations);
        return true;
      }
      return false;
    }

    /**
     * Initialize with language and translations
     * @param {string} lang - The language code
     * @param {Object} translations - Translation key-value pairs
     */
  }, {
    key: "initialize",
    value: function initialize() {
      var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';
      var translations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.lang = lang;
      this.translations = translations;
      this.initialized = true;
      Debug.log("TranslationManager: Initialized with \"".concat(lang, "\" language"), this.translations, 2);
    }

    /**
     * Get a translation by key
     * @param {string} key - The translation key
     * @param {string} defaultValue - Default value if key not found (defaults to key itself)
     * @returns {string} The translated text or default value
     */
  }, {
    key: "get",
    value: function get(key) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      // If not initialized and window.diffConfig exists, try to initialize from there
      if (!this.initialized) {
        this._initializeFromGlobalConfig();
      }

      // Check if we have translations for the current language
      if (this.translations[this.lang] && this.translations[this.lang][key]) {
        return this.translations[this.lang][key];
      }

      // Fallback to English if the key exists there
      if (this.translations['en'] && this.translations['en'][key]) {
        Debug.log("TranslationManager: Key \"".concat(key, "\" not found in \"").concat(this.lang, "\", using English fallback"), null, 2);
        return this.translations['en'][key];
      }

      // Use provided default or key itself
      return defaultValue !== null ? defaultValue : key;
    }

    /**
     * Check if initialization has been completed
     * @returns {boolean} True if initialized
     */
  }, {
    key: "isInitialized",
    value: function isInitialized() {
      // Try to initialize if not already done
      if (!this.initialized) {
        this._initializeFromGlobalConfig();
      }
      return this.initialized;
    }

    /**
     * Get the current language
     * @returns {string} The current language code
     */
  }, {
    key: "getLanguage",
    value: function getLanguage() {
      // Try to initialize if not already done
      if (!this.initialized) {
        this._initializeFromGlobalConfig();
      }
      return this.lang;
    }

    /**
     * Get all translations
     * @returns {Object} All translations
     */
  }, {
    key: "getAllTranslations",
    value: function getAllTranslations() {
      // Try to initialize if not already done
      if (!this.initialized) {
        this._initializeFromGlobalConfig();
      }
      return _objectSpread({}, this.translations);
    }
  }], [{
    key: "getInstance",
    value:
    /**
     * Get the singleton instance
     * @returns {TranslationManager} The singleton instance
     */
    function getInstance() {
      if (!TranslationManager._instance) {
        TranslationManager._instance = new TranslationManager();
        Debug.log('TranslationManager: Instance created', null, 2);
      }
      return TranslationManager._instance;
    }
  }]);
}(BaseSingleton);
/**
 * @private
 * Singleton instance
 */
_defineProperty(TranslationManager, "_instance", null);
;// ./src/utils/LoaderManager.js
function LoaderManager_typeof(o) { "@babel/helpers - typeof"; return LoaderManager_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, LoaderManager_typeof(o); }
function LoaderManager_toConsumableArray(r) { return LoaderManager_arrayWithoutHoles(r) || LoaderManager_iterableToArray(r) || LoaderManager_unsupportedIterableToArray(r) || LoaderManager_nonIterableSpread(); }
function LoaderManager_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function LoaderManager_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function LoaderManager_arrayWithoutHoles(r) { if (Array.isArray(r)) return LoaderManager_arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || LoaderManager_unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function LoaderManager_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return LoaderManager_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? LoaderManager_arrayLikeToArray(r, a) : void 0; } }
function LoaderManager_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function LoaderManager_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function LoaderManager_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? LoaderManager_ownKeys(Object(t), !0).forEach(function (r) { LoaderManager_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : LoaderManager_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function LoaderManager_defineProperty(e, r, t) { return (r = LoaderManager_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function LoaderManager_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function LoaderManager_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, LoaderManager_toPropertyKey(o.key), o); } }
function LoaderManager_createClass(e, r, t) { return r && LoaderManager_defineProperties(e.prototype, r), t && LoaderManager_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function LoaderManager_toPropertyKey(t) { var i = LoaderManager_toPrimitive(t, "string"); return "symbol" == LoaderManager_typeof(i) ? i : i + ""; }
function LoaderManager_toPrimitive(t, r) { if ("object" != LoaderManager_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != LoaderManager_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function LoaderManager_callSuper(t, o, e) { return o = LoaderManager_getPrototypeOf(o), LoaderManager_possibleConstructorReturn(t, LoaderManager_isNativeReflectConstruct() ? Reflect.construct(o, e || [], LoaderManager_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function LoaderManager_possibleConstructorReturn(t, e) { if (e && ("object" == LoaderManager_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return LoaderManager_assertThisInitialized(t); }
function LoaderManager_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function LoaderManager_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (LoaderManager_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function LoaderManager_getPrototypeOf(t) { return LoaderManager_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, LoaderManager_getPrototypeOf(t); }
function LoaderManager_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && LoaderManager_setPrototypeOf(t, e); }
function LoaderManager_setPrototypeOf(t, e) { return LoaderManager_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, LoaderManager_setPrototypeOf(t, e); }





/**
 * LoaderManager - Centralized utility for managing loading indicators
 *
 * This singleton class provides methods to display and hide loading indicators
 * throughout the application in a consistent manner. It supports different styles
 * of loaders including fullscreen, inline, and element-specific indicators.
 */

// Module-level singleton instance
var instance = null;

/**
 * LoaderManager class
 *
 * Provides methods to display and hide loading indicators throughout the application
 */
var LoaderManager = /*#__PURE__*/function (_BaseSingleton) {
  function LoaderManager() {
    LoaderManager_classCallCheck(this, LoaderManager);
    return LoaderManager_callSuper(this, LoaderManager, arguments);
  }
  LoaderManager_inherits(LoaderManager, _BaseSingleton);
  return LoaderManager_createClass(LoaderManager, [{
    key: "initialize",
    value:
    /**
     * Initialize the LoaderManager
     */
    function initialize() {
      // If already initialized, just return
      if (this.initialized) {
        return;
      }
      this.activeLoaders = new Map();
      this.loaderIdCounter = 0;
      this.isMainLoaderActive = false; // Track if main loader is active
      this.mainLoaderId = null; // Store the ID of the main loader for reference
      this.recentlyRemovedLoaders = new Set(); // Track recently removed loaders to prevent errors

      // Track loader operations for debugging
      this.operationLog = [];
      this.maxLogEntries = 20;

      // Set flag to remember log level in debug mode
      this.verboseLogging = Debug.isInitialized ? Debug.logLevel > 2 : false;

      // Mark as initialized
      this.initialized = true;
    }

    /**
     * Get the singleton instance
     * @returns {LoaderManager} Instance
     */
  }, {
    key: "_logOperation",
    value:
    /**
     * Log an operation for debugging
     * @private
     */
    function _logOperation(operation, details) {
      // Keep a short log history for debugging
      if (this.operationLog.length >= this.maxLogEntries) {
        this.operationLog.shift(); // Remove oldest entry
      }
      this.operationLog.push({
        timestamp: new Date().toISOString(),
        operation: operation,
        details: details
      });
    }

    /**
     * Create a loader element with the given message
     *
     * @param {string} message - Message to display
     * @param {Object} options - Options for the loader
     * @returns {HTMLElement} The loader element
     * @private
     */
  }, {
    key: "_createLoaderElement",
    value: function _createLoaderElement(message) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // Use an early translation if TranslationManager is available
      if (message && typeof message === 'string' && message.startsWith('$') && TranslationManager.getInstance().isInitialized()) {
        var translationKey = message.substring(1);
        var translatedMessage = TranslationManager.getInstance().get(translationKey);
        if (translatedMessage) {
          message = translatedMessage;
        }
      }
      var loader = document.createElement('div');
      loader.className = 'vdm-loader';
      if (options.fullscreen) {
        loader.classList.add('vdm-loader--fullscreen');
      }
      if (options.inline) {
        loader.classList.add('vdm-loader--inline');
      }
      if (options.small) {
        loader.classList.add('vdm-loader--small');
      }
      if (options.container) {
        loader.classList.add('vdm-loader--container');
      }
      if (options.className) {
        loader.classList.add(options.className);
      }
      if (options.zIndex) {
        loader.style.zIndex = options.zIndex;
      }

      // Create spinner
      var spinner = document.createElement('div');
      spinner.className = 'vdm-loader__spinner';
      loader.appendChild(spinner);

      // Add message if provided
      if (message) {
        var messageElement = document.createElement('div');
        messageElement.className = 'vdm-loader__message';
        messageElement.textContent = message;
        loader.appendChild(messageElement);
      }
      return loader;
    }

    /**
     * Show a loading indicator
     *
     * @param {string} message - Message to display with the loader
     * @param {Object} options - Options for the loader
     * @param {boolean} options.fullscreen - Whether to show a fullscreen loader
     * @param {boolean} options.inline - Whether to show an inline loader
     * @param {boolean} options.small - Whether to show a small loader
     * @param {string} options.className - Additional CSS class to add to the loader
     * @param {HTMLElement} options.target - Target element to add the loader to
     * @param {number} options.zIndex - Z-index for the loader
     * @returns {string} ID of the loader (use this to hide the specific loader)
     */
  }, {
    key: "showLoader",
    value: function showLoader() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Loading...';
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // If main loader is active and we're showing a fullscreen loader,
      // reuse the main loader with updated message
      if (this.isMainLoaderActive && this.mainLoaderId && options.fullscreen) {
        Debug.log('LoaderManager: Reusing main loader for fullscreen request', {
          message: message
        }, 3);
        this.updateLoaderMessage(this.mainLoaderId, message);
        return this.mainLoaderId;
      }
      Debug.log('LoaderManager: Showing loader', {
        message: message,
        options: options
      }, 3);
      var loaderId = "loader-".concat(++this.loaderIdCounter);
      var loaderElement = this._createLoaderElement(message, options);
      loaderElement.setAttribute('data-loader-id', loaderId);

      // Add loader to the correct target element
      if (options.target && options.target instanceof HTMLElement) {
        // If the target has position: static, change to relative for proper positioning
        var targetPosition = window.getComputedStyle(options.target).getPropertyValue('position');
        if (targetPosition === 'static') {
          options.target.style.position = 'relative';
        }
        options.target.appendChild(loaderElement);
      } else {
        document.body.appendChild(loaderElement);
      }

      // Store reference to the loader
      this.activeLoaders.set(loaderId, {
        element: loaderElement,
        target: options.target || document.body,
        fullscreen: !!options.fullscreen,
        timestamp: Date.now()
      });

      // Remove from recently removed list if it's there (unlikely but possible with ID reuse)
      this.recentlyRemovedLoaders["delete"](loaderId);
      this._logOperation('show', {
        id: loaderId,
        message: message,
        type: 'regular'
      });

      // Add showing class to trigger CSS transitions if any
      setTimeout(function () {
        if (loaderElement.parentNode) {
          loaderElement.classList.add('vdm-loader--showing');
        }
      }, 10);
      return loaderId;
    }

    /**
     * Show the main application loader and hide all other loaders
     *
     * @param {string} message - Optional message to display
     * @param {Object} options - Additional options for the loader
     * @returns {string} ID of the loader
     */
  }, {
    key: "showMainLoader",
    value: function showMainLoader() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Loading...';
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      Debug.log('LoaderManager: Showing main loader', {
        message: message
      }, 2);

      // If main loader is already active, just update the message and return the existing ID
      if (this.isMainLoaderActive && this.mainLoaderId && this.activeLoaders.has(this.mainLoaderId)) {
        Debug.log('LoaderManager: Main loader already active, updating message', {
          currentId: this.mainLoaderId,
          message: message
        }, 2);
        this.updateLoaderMessage(this.mainLoaderId, message);
        return this.mainLoaderId;
      }

      // Hide all other loaders when showing the main one
      this._hideAllInlineLoaders();

      // Get the main loader element if it exists in the DOM
      var mainLoaderElement = document.getElementById(constants_Selectors.LOADER.MAIN.name());
      if (mainLoaderElement) {
        // If the element already exists in the DOM, just show it
        mainLoaderElement.style.display = 'flex';
        mainLoaderElement.classList.add(constants_Selectors.LOADER.ACTIVE.name());

        // If it has a message element, update it
        var messageElement = mainLoaderElement.querySelector('.vdm-loader__message');
        if (messageElement) {
          messageElement.textContent = message;
        } else if (message) {
          // Create message element if it doesn't exist but message is provided
          var newMessageElement = document.createElement('div');
          newMessageElement.className = 'vdm-loader__message';
          newMessageElement.textContent = message;
          mainLoaderElement.appendChild(newMessageElement);
        }

        // Generate an ID for this loader instance
        var loaderId = "main-loader-".concat(++this.loaderIdCounter);

        // Store reference
        this.activeLoaders.set(loaderId, {
          element: mainLoaderElement,
          target: document.body,
          isMainLoader: true,
          timestamp: Date.now()
        });

        // Update tracking
        this.isMainLoaderActive = true;
        this.mainLoaderId = loaderId;

        // Remove from recently removed list if it's there
        this.recentlyRemovedLoaders["delete"](loaderId);
        this._logOperation('show', {
          id: loaderId,
          message: message,
          type: 'main-existing'
        });
        return loaderId;
      } else {
        // If the element doesn't exist, create it using showLoader
        var _loaderId = this.showLoader(message, LoaderManager_objectSpread({
          fullscreen: true,
          className: constants_Selectors.LOADER.MAIN.name(),
          zIndex: 9999
        }, options));

        // Mark this as the main loader
        var loaderInfo = this.activeLoaders.get(_loaderId);
        if (loaderInfo) {
          loaderInfo.isMainLoader = true;
          loaderInfo.element.id = constants_Selectors.LOADER.MAIN.name();
        }

        // Update tracking
        this.isMainLoaderActive = true;
        this.mainLoaderId = _loaderId;
        this._logOperation('show', {
          id: _loaderId,
          message: message,
          type: 'main-new'
        });
        return _loaderId;
      }
    }

    /**
     * Show a loading indicator early in the page lifecycle before DiffViewer initialization
     * This is specifically for components that need to show loaders before the main app initializes
     *
     * @param {string} message - Message to display with the loader
     * @param {Object} options - Options for the loader
     * @returns {string} ID of the loader
     */
  }, {
    key: "showEarlyLoader",
    value: function showEarlyLoader() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Loading...';
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // If debug is already initialized, use it, otherwise don't log
      if (Debug.isInitialized) {
        Debug.log('LoaderManager: Showing early loader', {
          message: message
        }, 2);
      }

      // Create a loader that will become the main loader
      var loaderId = this.showLoader(message, LoaderManager_objectSpread({
        fullscreen: true,
        className: constants_Selectors.LOADER.MAIN.name(),
        zIndex: 9999
      }, options));

      // Mark this as the main loader
      var loaderInfo = this.activeLoaders.get(loaderId);
      if (loaderInfo) {
        loaderInfo.isMainLoader = true;
        loaderInfo.isEarlyLoader = true; // Mark as an early loader
        loaderInfo.element.id = constants_Selectors.LOADER.MAIN.name();
      }

      // Update tracking
      this.isMainLoaderActive = true;
      this.mainLoaderId = loaderId;
      this._logOperation('show', {
        id: loaderId,
        message: message,
        type: 'early-loader'
      });
      return loaderId;
    }

    /**
     * Convert an early loader to the main loader to ensure continuity
     * Call this method from enableDiffViewer to take over an existing early loader
     *
     * @param {string} message - Optional new message to display
     * @returns {string} ID of the main loader
     */
  }, {
    key: "adoptEarlyLoader",
    value: function adoptEarlyLoader() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      // If there's no active main loader, create one
      if (!this.isMainLoaderActive || !this.mainLoaderId) {
        if (Debug.isInitialized) {
          Debug.log('LoaderManager: No early loader to adopt, creating new main loader', null, 2);
        }
        return this.showMainLoader(message);
      }

      // Update the message if provided
      if (message) {
        this.updateLoaderMessage(this.mainLoaderId, message);
      }
      if (Debug.isInitialized) {
        Debug.log('LoaderManager: Adopted early loader as main loader', {
          id: this.mainLoaderId
        }, 2);
      }
      return this.mainLoaderId;
    }

    /**
     * Hide the main loader
     *
     * @param {string} loaderId - Optional ID of the loader to hide
     * @returns {boolean} Success status
     */
  }, {
    key: "hideMainLoader",
    value: function hideMainLoader() {
      var loaderId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      Debug.log('LoaderManager: Hiding main loader', {
        loaderId: loaderId
      }, 2);

      // Special handling: If this was recently removed, just return success
      if (loaderId && this.recentlyRemovedLoaders.has(loaderId)) {
        Debug.log('LoaderManager: Main loader was recently removed', {
          loaderId: loaderId
        }, 2);
        return true;
      }

      // If main loader isn't active, silently succeed
      if (!this.isMainLoaderActive) {
        Debug.log('LoaderManager: Main loader not active, nothing to hide', null, 2);
        return true;
      }

      // If loaderId is provided but doesn't match the main loader ID, verify it
      if (loaderId && loaderId !== this.mainLoaderId) {
        var loaderInfo = this.activeLoaders.get(loaderId);
        // If it's not found or not a main loader, use the stored main loader ID
        if (!(loaderInfo !== null && loaderInfo !== void 0 && loaderInfo.isMainLoader)) {
          Debug.log('LoaderManager: Using stored main loader ID', {
            providedId: loaderId,
            actualMainId: this.mainLoaderId
          }, 2);
          loaderId = this.mainLoaderId;
        }
      } else if (!loaderId) {
        // If no ID provided, use the stored main loader ID
        loaderId = this.mainLoaderId;
      }

      // If we couldn't determine a loader ID or it doesn't exist anymore,
      // try to clean up by element ID
      if (!loaderId || !this.activeLoaders.has(loaderId)) {
        var mainLoaderElement = document.getElementById(constants_Selectors.LOADER.MAIN.name());
        if (mainLoaderElement) {
          mainLoaderElement.style.display = 'none';
          if (mainLoaderElement.parentNode) {
            mainLoaderElement.parentNode.removeChild(mainLoaderElement);
          }
          Debug.log('LoaderManager: Removed main loader by element ID', null, 2);
        }

        // Reset state
        this.isMainLoaderActive = false;
        this.mainLoaderId = null;
        return true;
      }

      // Now hide the specific loader
      var success = this._hideSpecificLoader(loaderId);
      if (success) {
        // Remember we removed this loader so we don't try to hide it again
        this.recentlyRemovedLoaders.add(loaderId);

        // Update state
        this.isMainLoaderActive = false;
        this.mainLoaderId = null;
        this._logOperation('hide', {
          id: loaderId,
          type: 'main'
        });
      }
      return success;
    }

    /**
     * Hide all inline loaders (internal method)
     * @private
     */
  }, {
    key: "_hideAllInlineLoaders",
    value: function _hideAllInlineLoaders() {
      var _this = this;
      Debug.log('LoaderManager: Hiding all inline loaders', null, 3);

      // Find all inline loaders
      var inlineLoaderIds = Array.from(this.activeLoaders.entries()).filter(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          _id = _ref2[0],
          info = _ref2[1];
        return !info.isMainLoader && !info.fullscreen;
      }).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 1),
          id = _ref4[0];
        return id;
      });

      // Hide each one
      inlineLoaderIds.forEach(function (id) {
        _this._hideSpecificLoader(id);

        // Remember we removed this loader
        _this.recentlyRemovedLoaders.add(id);
        _this._logOperation('hide', {
          id: id,
          type: 'inline-batch'
        });
      });

      // Also look for any inline loaders in the DOM that might not be tracked
      document.querySelectorAll('.vdm-loader--inline').forEach(function (loader) {
        _this._removeLoaderElement(loader);
        _this._logOperation('hide', {
          element: 'untracked-inline',
          type: 'dom-query'
        });
      });
    }

    /**
     * Hide a specific loader by ID
     *
     * @param {string} loaderId - ID of the loader to hide
     * @returns {boolean} Success status
     */
  }, {
    key: "hideLoader",
    value: function hideLoader(loaderId) {
      var _this2 = this;
      // If no loaderId specified, hide all loaders
      if (!loaderId) {
        Debug.log('LoaderManager: Hiding all loaders', null, 3);
        var loaderIds = Array.from(this.activeLoaders.keys());
        var _success = true;
        loaderIds.forEach(function (id) {
          if (!_this2._hideSpecificLoader(id)) {
            _success = false;
          }

          // Remember we removed this loader
          _this2.recentlyRemovedLoaders.add(id);
          _this2._logOperation('hide', {
            id: id,
            type: 'all-batch'
          });
        });

        // Reset main loader tracking
        this.isMainLoaderActive = false;
        this.mainLoaderId = null;
        return _success;
      }

      // Special handling: If this was recently removed, just return success
      if (this.recentlyRemovedLoaders.has(loaderId)) {
        Debug.log('LoaderManager: Loader was recently removed', {
          loaderId: loaderId
        }, 2);
        return true;
      }

      // Case: this is the main loader
      if (loaderId === this.mainLoaderId) {
        return this.hideMainLoader(loaderId);
      }

      // Hide a specific loader
      Debug.log('LoaderManager: Hiding loader', {
        loaderId: loaderId
      }, 3);
      var success = this._hideSpecificLoader(loaderId);
      if (success) {
        // Remember we removed this loader
        this.recentlyRemovedLoaders.add(loaderId);
        this._logOperation('hide', {
          id: loaderId,
          type: 'specific'
        });
      }
      return success;
    }

    /**
     * Internal method to hide a specific loader
     *
     * @param {string} loaderId - ID of the loader to hide
     * @returns {boolean} Success status
     * @private
     */
  }, {
    key: "_hideSpecificLoader",
    value: function _hideSpecificLoader(loaderId) {
      var _loader$element;
      // Special handling: If this was recently removed, just return success
      if (this.recentlyRemovedLoaders.has(loaderId)) {
        Debug.log('LoaderManager: Loader was recently removed (in _hideSpecificLoader)', {
          loaderId: loaderId
        }, 3);
        return true;
      }
      var loader = this.activeLoaders.get(loaderId);
      if (!loader) {
        Debug.log('LoaderManager: No loader found to hide', {
          loaderId: loaderId
        }, 2);
        return false;
      }

      // Update main loader status if this was a main loader
      if (loader.isMainLoader) {
        this.isMainLoaderActive = false;
        this.mainLoaderId = null;
      }

      // Check if the element still exists in DOM
      if (!((_loader$element = loader.element) !== null && _loader$element !== void 0 && _loader$element.parentNode)) {
        // Element is already removed, just clean up our tracking
        this.activeLoaders["delete"](loaderId);
        Debug.log('LoaderManager: Loader element was already removed from DOM', {
          loaderId: loaderId
        }, 3);
        return true;
      }

      // Remove the loader element with transition
      this._removeLoaderElement(loader.element);
      this.activeLoaders["delete"](loaderId);

      // Remember we removed this loader
      this.recentlyRemovedLoaders.add(loaderId);
      return true;
    }

    /**
     * Remove a loader element with transition
     *
     * @param {HTMLElement} loaderElement - Loader element to remove
     * @private
     */
  }, {
    key: "_removeLoaderElement",
    value: function _removeLoaderElement(loaderElement) {
      // First remove the showing class to trigger CSS transitions if any
      loaderElement.classList.remove('vdm-loader--showing');

      // Wait for transition to complete before removing the element
      setTimeout(function () {
        if (loaderElement.parentNode) {
          loaderElement.parentNode.removeChild(loaderElement);
        }
      }, 300); // Match this timing with CSS transition duration
    }

    /**
     * Show a loader in a specific container (useful for buttons, etc.)
     *
     * @param {HTMLElement} container - Container element to add the loader to
     * @param {string} message - Optional message to display
     * @param {Object} options - Options for the loader
     * @returns {string} ID of the loader
     */
  }, {
    key: "showLoaderInContainer",
    value: function showLoaderInContainer(container) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var loaderId = this.showLoader(message, LoaderManager_objectSpread({
        target: container,
        container: true,
        small: true
      }, options));
      this._logOperation('show', {
        id: loaderId,
        message: message,
        type: 'container'
      });
      return loaderId;
    }

    /**
     * Update an existing loader's message
     *
     * @param {string} loaderId - ID of the loader to update
     * @param {string} message - New message to display
     * @returns {boolean} Success status
     */
  }, {
    key: "updateLoaderMessage",
    value: function updateLoaderMessage(loaderId, message) {
      var _loader$element2;
      // Don't log anything when recently removed IDs are encountered
      // This eliminates the spam in the console for removed loaders
      if (loaderId && this.recentlyRemovedLoaders.has(loaderId)) {
        return true; // Silently succeed
      }

      // If this is a falsy ID and main loader is active, use the main loader
      if (!loaderId && this.isMainLoaderActive && this.mainLoaderId) {
        loaderId = this.mainLoaderId;
        Debug.log('LoaderManager: Using main loader ID for message update', {
          mainLoaderId: loaderId
        }, 3);
      }
      var loader = this.activeLoaders.get(loaderId);
      if (!loader) {
        // Only log at level 2 if we're in verbose mode (reduces noise)
        if (this.verboseLogging) {
          Debug.log('LoaderManager: No loader found to update message', {
            loaderId: loaderId
          }, 2);
        }
        return false;
      }

      // Check if element still exists in DOM
      if (!((_loader$element2 = loader.element) !== null && _loader$element2 !== void 0 && _loader$element2.parentNode)) {
        Debug.log('LoaderManager: Loader element was removed from DOM', {
          loaderId: loaderId
        }, 3);
        this.activeLoaders["delete"](loaderId);
        this.recentlyRemovedLoaders.add(loaderId);
        return false;
      }
      var messageElement = loader.element.querySelector('.vdm-loader__message');
      if (messageElement) {
        messageElement.textContent = message;
        this._logOperation('update', {
          id: loaderId,
          message: message,
          type: 'existing-element'
        });
        return true;
      } else if (message) {
        // Create message element if it doesn't exist but a message is provided
        var newMessageElement = document.createElement('div');
        newMessageElement.className = 'vdm-loader__message';
        newMessageElement.textContent = message;
        loader.element.appendChild(newMessageElement);
        this._logOperation('update', {
          id: loaderId,
          message: message,
          type: 'new-element'
        });
        return true;
      }
      return false;
    }

    /**
     * Check if a loader with the given ID exists
     * @param {string} loaderId - Loader ID to check
     * @returns {boolean} - Whether the loader exists
     */
  }, {
    key: "hasLoader",
    value: function hasLoader(loaderId) {
      return this.activeLoaders.has(loaderId) && !this.recentlyRemovedLoaders.has(loaderId);
    }

    /**
     * Clean up old entries in the recentlyRemovedLoaders set to prevent memory leaks
     * Called periodically by the system
     */
  }, {
    key: "_cleanupOldRemovedLoaders",
    value: function _cleanupOldRemovedLoaders() {
      // If the set gets too large, clean up old entries
      if (this.recentlyRemovedLoaders.size > 20) {
        // Just reset the whole set for simplicity
        this.recentlyRemovedLoaders.clear();
      }
    }

    /**
     * Get debug information about a specific loader
     * @param {string} loaderId - Loader ID to check
     * @returns {Object|null} Loader information
     */
  }, {
    key: "getLoaderInfo",
    value: function getLoaderInfo(loaderId) {
      var _loader$element$query;
      if (!loaderId) return null;
      var loader = this.activeLoaders.get(loaderId);
      if (!loader) {
        return {
          exists: false,
          wasRemoved: this.recentlyRemovedLoaders.has(loaderId)
        };
      }
      return {
        exists: true,
        isMain: !!loader.isMainLoader,
        fullscreen: !!loader.fullscreen,
        message: (_loader$element$query = loader.element.querySelector('.vdm-loader__message')) === null || _loader$element$query === void 0 ? void 0 : _loader$element$query.textContent,
        age: Date.now() - (loader.timestamp || 0),
        // milliseconds since creation
        inDom: !!loader.element.parentNode
      };
    }

    /**
     * Debug method to get active loader information
     * @returns {Object} Information about current loaders
     */
  }, {
    key: "getLoaderStatus",
    value: function getLoaderStatus() {
      // Clean up the recently removed list to keep it tidy
      this._cleanupOldRemovedLoaders();
      return {
        activeCount: this.activeLoaders.size,
        recentlyRemovedCount: this.recentlyRemovedLoaders.size,
        mainLoaderActive: this.isMainLoaderActive,
        mainLoaderId: this.mainLoaderId,
        operations: LoaderManager_toConsumableArray(this.operationLog),
        loaders: Array.from(this.activeLoaders.entries()).map(function (_ref5) {
          var _info$element$querySe;
          var _ref6 = _slicedToArray(_ref5, 2),
            id = _ref6[0],
            info = _ref6[1];
          return {
            id: id,
            isMain: !!info.isMainLoader,
            fullscreen: !!info.fullscreen,
            message: (_info$element$querySe = info.element.querySelector('.vdm-loader__message')) === null || _info$element$querySe === void 0 ? void 0 : _info$element$querySe.textContent,
            age: Date.now() - (info.timestamp || 0),
            // milliseconds since creation
            inDom: !!info.element.parentNode
          };
        })
      };
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!instance) {
        instance = new LoaderManager();
        instance.initialize();
      }
      return instance;
    }
  }]);
}(BaseSingleton);
/* harmony default export */ const utils_LoaderManager = ((/* unused pure expression or super */ null && (LoaderManager)));
;// ./src/utils/AlertManager.js
function AlertManager_typeof(o) { "@babel/helpers - typeof"; return AlertManager_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, AlertManager_typeof(o); }
function AlertManager_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function AlertManager_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? AlertManager_ownKeys(Object(t), !0).forEach(function (r) { AlertManager_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : AlertManager_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function AlertManager_defineProperty(e, r, t) { return (r = AlertManager_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function AlertManager_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function AlertManager_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, AlertManager_toPropertyKey(o.key), o); } }
function AlertManager_createClass(e, r, t) { return r && AlertManager_defineProperties(e.prototype, r), t && AlertManager_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function AlertManager_toPropertyKey(t) { var i = AlertManager_toPrimitive(t, "string"); return "symbol" == AlertManager_typeof(i) ? i : i + ""; }
function AlertManager_toPrimitive(t, r) { if ("object" != AlertManager_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != AlertManager_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function AlertManager_callSuper(t, o, e) { return o = AlertManager_getPrototypeOf(o), AlertManager_possibleConstructorReturn(t, AlertManager_isNativeReflectConstruct() ? Reflect.construct(o, e || [], AlertManager_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function AlertManager_possibleConstructorReturn(t, e) { if (e && ("object" == AlertManager_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return AlertManager_assertThisInitialized(t); }
function AlertManager_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function AlertManager_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (AlertManager_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function AlertManager_getPrototypeOf(t) { return AlertManager_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, AlertManager_getPrototypeOf(t); }
function AlertManager_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && AlertManager_setPrototypeOf(t, e); }
function AlertManager_setPrototypeOf(t, e) { return AlertManager_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, AlertManager_setPrototypeOf(t, e); }





/**
 * AlertManager - Centralized utility for managing alert messages
 *
 * This singleton class provides methods to display and hide alert messages
 * throughout the application in a consistent manner. It supports different types
 * of alerts including info, success, warning, and danger.
 */

// Module-level singleton instance
var AlertManager_instance = null;

/**
 * AlertManager class
 *
 * Provides methods to display and hide alert messages throughout the application
 */
var AlertManager = /*#__PURE__*/function (_BaseSingleton) {
  function AlertManager() {
    AlertManager_classCallCheck(this, AlertManager);
    return AlertManager_callSuper(this, AlertManager, arguments);
  }
  AlertManager_inherits(AlertManager, _BaseSingleton);
  return AlertManager_createClass(AlertManager, [{
    key: "initialize",
    value:
    /**
     * Initialize the AlertManager
     */
    function initialize() {
      // If already initialized, just return
      if (this.initialized) {
        return;
      }
      this.containerId = 'vdm-alert-container';
      this.activeAlert = null;
      this.timeoutId = null;

      // Ensure the alert container exists and store it in this.container
      this.container = this._ensureContainer();

      // Mark as initialized
      this.initialized = true;
      Debug.log('AlertManager: Initialized', null, 2);
    }

    /**
     * Get the singleton instance
     * @returns {AlertManager} Instance
     */
  }, {
    key: "_ensureContainer",
    value:
    /**
     * Ensure the alert container exists in the DOM
     * @private
     */
    function _ensureContainer() {
      var container = document.getElementById(this.containerId);
      if (!container) {
        container = document.createElement('div');
        container.id = this.containerId;
        container.className = 'vdm-alert-container';
        container.style.position = 'fixed';
        container.style.top = '20px';
        container.style.left = '50%';
        container.style.transform = 'translateX(-50%)';
        container.style.zIndex = '9999';
        container.style.width = 'auto';
        container.style.maxWidth = '90%';
        document.body.appendChild(container);
        Debug.log('AlertManager: Created alert container', null, 2);
      }
      return container;
    }

    /**
     * Create and show an alert
     * @param {string} message - The alert message
     * @param {string} type - The alert type: 'success', 'info', 'warning', 'error'
     * @param {Object} options - Alert options
     * @returns {HTMLElement} - The alert element
     */
  }, {
    key: "showAlert",
    value: function showAlert(message, type) {
      var _this = this;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      Debug.log('AlertManager.showAlert called with type', type, 2);
      Debug.log('AlertManager.showAlert message', message, 3);

      // Default options
      var defaultOptions = {
        timeout: 5000,
        // Auto-dismiss after 5 seconds (0 = no auto-dismiss)
        dismissable: true,
        // Show close button
        translate: true,
        // Translate message if TranslationManager is available
        className: '',
        // Additional CSS classes
        container: null,
        // Container element (defaults to this.container)
        targetElement: null,
        // Target element to place alert relative to
        placement: 'before' // Placement relative to targetElement ('before' or 'after')
      };
      var mergedOptions = AlertManager_objectSpread(AlertManager_objectSpread({}, defaultOptions), options);

      // Only use the container if we're not placing relative to a target element
      var useContainer = !mergedOptions.targetElement && (mergedOptions.container || this.container);
      Debug.log('AlertManager placement options', {
        hasTargetElement: !!mergedOptions.targetElement,
        placement: mergedOptions.placement,
        useContainer: !!useContainer
      }, 3);

      // Create alert element
      var alertElement = document.createElement('div');

      // Get the base alert class from Selectors if available
      var baseAlertClass = constants_Selectors.UTILITY.ALERT ? constants_Selectors.UTILITY.ALERT.toString().substring(1) :
      // Remove leading '.'
      'vdm-alert';

      // Start with base class
      var alertClass = baseAlertClass;

      // Type-specific class - use the proper format with double hyphens
      if (type) {
        // Use proper format from Selectors if available
        var typeClass = type === 'info' && constants_Selectors.UTILITY.ALERT_INFO ? constants_Selectors.UTILITY.ALERT_INFO.toString().substring(1) : // Remove leading '.'
        "".concat(baseAlertClass, "--").concat(type); // Use the proper double-hyphen format

        alertClass += " ".concat(typeClass);
      }

      // Add any custom classes
      if (mergedOptions.className) {
        alertClass += " ".concat(mergedOptions.className);
      }
      alertElement.className = alertClass;
      Debug.log('Alert classnames', alertElement.className, 3);
      Debug.log('Alert selector values', {
        selectorBase: constants_Selectors.UTILITY.ALERT ? constants_Selectors.UTILITY.ALERT.toString() : 'vdm-alert',
        selectorType: type ? "".concat(baseAlertClass, "--").concat(type) : 'none'
      }, 3);

      // Translate message if needed
      var finalMessage = message;
      if (mergedOptions.translate && typeof TranslationManager !== 'undefined') {
        var translationManager = TranslationManager.getInstance();
        if (translationManager && typeof translationManager.get === 'function') {
          finalMessage = translationManager.get(message, message);
        }
      }

      // Set content
      alertElement.innerHTML = finalMessage;

      // Add close button if dismissable
      if (mergedOptions.dismissable) {
        var closeButton = document.createElement('button');
        // Fix the close button class to match the CSS definition
        closeButton.className = 'vdm-alert__close';
        closeButton.innerHTML = '&times;';
        closeButton.setAttribute('aria-label', 'Close');
        closeButton.setAttribute('type', 'button');
        alertElement.appendChild(closeButton);

        // Add click event for close button
        closeButton.addEventListener('click', function () {
          return _this.hideAlert(alertElement);
        });
        Debug.log('Close button', closeButton ? 'found' : 'not found', 3);
      }

      // Add to container or place relative to target element
      if (mergedOptions.targetElement) {
        Debug.log('AlertManager: Placing alert relative to target element', {
          target: mergedOptions.targetElement,
          placement: mergedOptions.placement
        }, 3);
        if (mergedOptions.placement === 'before') {
          // Insert before the target element
          mergedOptions.targetElement.parentNode.insertBefore(alertElement, mergedOptions.targetElement);
        } else if (mergedOptions.placement === 'after') {
          // Insert after the target element
          if (mergedOptions.targetElement.nextSibling) {
            mergedOptions.targetElement.parentNode.insertBefore(alertElement, mergedOptions.targetElement.nextSibling);
          } else {
            mergedOptions.targetElement.parentNode.appendChild(alertElement);
          }
        }
      } else if (useContainer) {
        // Regular container append if no target element is specified
        useContainer.appendChild(alertElement);
        Debug.log('Alert appended to container', null, 3);
      } else {
        // Fallback to body if no container and no target element
        document.body.appendChild(alertElement);
        Debug.log('Alert appended to body', null, 3);
      }

      // Store reference to the active alert
      this.activeAlert = alertElement;

      // Set up auto-dismiss
      if (mergedOptions.timeout > 0) {
        this.timeoutId = setTimeout(function () {
          _this.hideAlert(alertElement);
        }, mergedOptions.timeout);
      }
      Debug.log('Returning alert element', alertElement, 3);
      return alertElement;
    }

    /**
     * Hide the current alert if one exists
     * @param {HTMLElement} alertElement - Optional specific alert element to hide
     */
  }, {
    key: "hideAlert",
    value: function hideAlert() {
      var _this$activeAlert;
      var alertElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      // Clear any existing timeout
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }

      // If a specific alert element is provided, remove it
      if (alertElement !== null && alertElement !== void 0 && alertElement.parentNode) {
        alertElement.parentNode.removeChild(alertElement);
        Debug.log('AlertManager: Hiding specific alert', null, 3);

        // If this was the active alert, clear the reference
        if (this.activeAlert === alertElement) {
          this.activeAlert = null;
        }
        return;
      }

      // Otherwise, remove the active alert if it exists
      if ((_this$activeAlert = this.activeAlert) !== null && _this$activeAlert !== void 0 && _this$activeAlert.parentNode) {
        this.activeAlert.parentNode.removeChild(this.activeAlert);
        this.activeAlert = null;
        Debug.log('AlertManager: Hiding active alert', null, 3);
      }
    }

    /**
     * Show an info alert
     *
     * @param {string} message - Message to display
     * @param {Object} options - Alert options
     * @returns {HTMLElement} The alert element
     */
  }, {
    key: "showInfo",
    value: function showInfo(message) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.showAlert(message, 'info', options);
    }

    /**
     * Show a success alert
     *
     * @param {string} message - Message to display
     * @param {Object} options - Alert options
     * @returns {HTMLElement} The alert element
     */
  }, {
    key: "showSuccess",
    value: function showSuccess(message) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.showAlert(message, 'success', options);
    }

    /**
     * Show a warning alert
     *
     * @param {string} message - Message to display
     * @param {Object} options - Alert options
     * @returns {HTMLElement} The alert element
     */
  }, {
    key: "showWarning",
    value: function showWarning(message) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.showAlert(message, 'warning', options);
    }

    /**
     * Show a danger/error alert
     *
     * @param {string} message - Message to display
     * @param {Object} options - Alert options
     * @returns {HTMLElement} The alert element
     */
  }, {
    key: "showError",
    value: function showError(message) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.showAlert(message, 'danger', options);
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!AlertManager_instance) {
        AlertManager_instance = new AlertManager();
        AlertManager_instance.initialize();
      }
      return AlertManager_instance;
    }
  }]);
}(BaseSingleton);
/* harmony default export */ const utils_AlertManager = (AlertManager);
;// ./src/utils/DiffConfigManager.js
function DiffConfigManager_typeof(o) { "@babel/helpers - typeof"; return DiffConfigManager_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, DiffConfigManager_typeof(o); }
function DiffConfigManager_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function DiffConfigManager_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? DiffConfigManager_ownKeys(Object(t), !0).forEach(function (r) { DiffConfigManager_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : DiffConfigManager_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function DiffConfigManager_defineProperty(e, r, t) { return (r = DiffConfigManager_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function DiffConfigManager_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function DiffConfigManager_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, DiffConfigManager_toPropertyKey(o.key), o); } }
function DiffConfigManager_createClass(e, r, t) { return r && DiffConfigManager_defineProperties(e.prototype, r), t && DiffConfigManager_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function DiffConfigManager_toPropertyKey(t) { var i = DiffConfigManager_toPrimitive(t, "string"); return "symbol" == DiffConfigManager_typeof(i) ? i : i + ""; }
function DiffConfigManager_toPrimitive(t, r) { if ("object" != DiffConfigManager_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != DiffConfigManager_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
/**
 * DiffConfigManager.js
 *
 * Singleton utility to centralize management of the diffConfig configuration object.
 * This provides a single source of truth for the diffConfig settings used throughout the application.
 */



/**
 * Manages the diffConfig configuration settings as a singleton
 */
var _diffConfig = /*#__PURE__*/new WeakMap();
var _DiffConfigManager_brand = /*#__PURE__*/new WeakSet();
var DiffConfigManager = /*#__PURE__*/function () {
  /**
   * Private constructor - use getInstance() instead
   * @private
   */
  function DiffConfigManager() {
    DiffConfigManager_classCallCheck(this, DiffConfigManager);
    /**
     * Update the global window.diffConfig object
     * @private
     */
    _classPrivateMethodInitSpec(this, _DiffConfigManager_brand);
    /**
     * Centralized diffConfig object
     * @type {Object}
     * @private
     */
    _classPrivateFieldInitSpec(this, _diffConfig, {});
    // Initialize the diffConfig with any existing window.diffConfig
    if (typeof window !== 'undefined' && window.diffConfig) {
      Debug.log('DiffConfigManager: Initializing with existing window.diffConfig', window.diffConfig, 2);
      _classPrivateFieldSet(_diffConfig, this, DiffConfigManager_objectSpread({}, window.diffConfig));
    } else {
      _classPrivateFieldSet(_diffConfig, this, {
        debug: false,
        logLevel: 1,
        old: {},
        "new": {}
      });
    }

    // Make the diffConfig available globally through window.diffConfig
    _assertClassBrand(_DiffConfigManager_brand, this, _updateGlobalDiffConfig).call(this);
  }

  /**
   * Get the singleton instance
   * @returns {DiffConfigManager} The singleton instance
   */
  return DiffConfigManager_createClass(DiffConfigManager, [{
    key: "initialize",
    value:
    /**
     * Initialize with configuration
     * @param {Object} config - The initial configuration
     */
    function initialize() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Debug.log('DiffConfigManager: Initializing with config', config, 2);
      _classPrivateFieldSet(_diffConfig, this, DiffConfigManager_objectSpread(DiffConfigManager_objectSpread({}, _classPrivateFieldGet(_diffConfig, this)), config));
      _assertClassBrand(_DiffConfigManager_brand, this, _updateGlobalDiffConfig).call(this);
    }

    /**
     * Get the current diffConfig
     * @returns {Object} The current diffConfig
     */
  }, {
    key: "getDiffConfig",
    value: function getDiffConfig() {
      return _classPrivateFieldGet(_diffConfig, this);
    }

    /**
     * Set a new diffConfig, completely replacing the current one
     * @param {Object} config - The new configuration to use
     */
  }, {
    key: "setDiffConfig",
    value: function setDiffConfig() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Debug.log('DiffConfigManager: Setting new diffConfig', config, 2);
      _classPrivateFieldSet(_diffConfig, this, DiffConfigManager_objectSpread({}, config));
      _assertClassBrand(_DiffConfigManager_brand, this, _updateGlobalDiffConfig).call(this);
    }

    /**
     * Reset the diffConfig to default values, possibly with new overrides
     * @param {Object} overrides - Optional configuration overrides to apply after reset
     */
  }, {
    key: "reset",
    value: function reset() {
      var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Debug.log('DiffConfigManager: Resetting diffConfig with overrides', overrides, 2);
      _classPrivateFieldSet(_diffConfig, this, DiffConfigManager_objectSpread({
        debug: false,
        logLevel: 1,
        old: {},
        "new": {}
      }, overrides));
      _assertClassBrand(_DiffConfigManager_brand, this, _updateGlobalDiffConfig).call(this);
    }

    /**
     * Update part of the configuration
     * @param {Object} partialConfig - The partial configuration to update
     */
  }, {
    key: "update",
    value: function update() {
      var partialConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Debug.log('DiffConfigManager: Updating diffConfig with', partialConfig, 3);

      // Check if the partialConfig has a nested 'config' property
      if (partialConfig && partialConfig.config && DiffConfigManager_typeof(partialConfig.config) === 'object') {
        Debug.log('DiffConfigManager: Extracting nested config property', partialConfig.config, 3);
        // Use the nested config object instead of the wrapper
        _classPrivateFieldSet(_diffConfig, this, _assertClassBrand(_DiffConfigManager_brand, this, _mergeDeep).call(this, _classPrivateFieldGet(_diffConfig, this), partialConfig.config));
      } else {
        // Use the original object if no nested config property
        _classPrivateFieldSet(_diffConfig, this, _assertClassBrand(_DiffConfigManager_brand, this, _mergeDeep).call(this, _classPrivateFieldGet(_diffConfig, this), partialConfig));
      }
      _assertClassBrand(_DiffConfigManager_brand, this, _updateGlobalDiffConfig).call(this);
    }

    /**
     * Set a specific configuration value by key
     * @param {string} key - The configuration key
     * @param {*} value - The value to set
     */
  }, {
    key: "set",
    value: function set(key, value) {
      Debug.log("DiffConfigManager: Setting ".concat(key), value, 3);
      _classPrivateFieldGet(_diffConfig, this)[key] = value;
      _assertClassBrand(_DiffConfigManager_brand, this, _updateGlobalDiffConfig).call(this);
    }

    /**
     * Get a specific configuration value by key
     * @param {string} key - The configuration key
     * @param {*} defaultValue - Default value if the key doesn't exist
     * @returns {*} The configuration value
     */
  }, {
    key: "get",
    value: function get(key) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return key in _classPrivateFieldGet(_diffConfig, this) ? _classPrivateFieldGet(_diffConfig, this)[key] : defaultValue;
    }

    /**
     * Remove a specific configuration key
     * @param {string} key - The configuration key to remove
     */
  }, {
    key: "remove",
    value: function remove(key) {
      if (key in _classPrivateFieldGet(_diffConfig, this)) {
        Debug.log("DiffConfigManager: Removing ".concat(key), null, 3);
        delete _classPrivateFieldGet(_diffConfig, this)[key];
        _assertClassBrand(_DiffConfigManager_brand, this, _updateGlobalDiffConfig).call(this);
      }
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!_instance._) {
        _instance._ = new DiffConfigManager();
      }
      return _instance._;
    }
  }]);
}();
function _updateGlobalDiffConfig() {
  if (typeof window !== 'undefined') {
    window.diffConfig = DiffConfigManager_objectSpread({}, _classPrivateFieldGet(_diffConfig, this));
  }
}
/**
 * Deep merge two objects recursively
 * @param {Object} target - Target object
 * @param {Object} source - Source object to merge
 * @returns {Object} The merged object
 * @private
 */
function _mergeDeep(target, source) {
  var _this = this;
  var output = DiffConfigManager_objectSpread({}, target);
  if (_assertClassBrand(_DiffConfigManager_brand, this, _isObject).call(this, target) && _assertClassBrand(_DiffConfigManager_brand, this, _isObject).call(this, source)) {
    Object.keys(source).forEach(function (key) {
      if (_assertClassBrand(_DiffConfigManager_brand, _this, _isObject).call(_this, source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = _assertClassBrand(_DiffConfigManager_brand, _this, _mergeDeep).call(_this, target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}
/**
 * Check if a value is an object
 * @param {*} item - The value to check
 * @returns {boolean} True if the value is an object
 * @private
 */
function _isObject(item) {
  return item && DiffConfigManager_typeof(item) === 'object' && !Array.isArray(item);
}
/**
 * Private instance - follows singleton pattern
 * @type {DiffConfigManager}
 * @private
 */
var _instance = {
  _: null
};
/* harmony default export */ const utils_DiffConfigManager = ((/* unused pure expression or super */ null && (DiffConfigManager)));
;// ./src/components/browser/FileBrowserManager.js
function FileBrowserManager_typeof(o) { "@babel/helpers - typeof"; return FileBrowserManager_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, FileBrowserManager_typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == FileBrowserManager_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(FileBrowserManager_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function FileBrowserManager_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function FileBrowserManager_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? FileBrowserManager_ownKeys(Object(t), !0).forEach(function (r) { FileBrowserManager_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : FileBrowserManager_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function FileBrowserManager_defineProperty(e, r, t) { return (r = FileBrowserManager_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function FileBrowserManager_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function FileBrowserManager_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, FileBrowserManager_toPropertyKey(o.key), o); } }
function FileBrowserManager_createClass(e, r, t) { return r && FileBrowserManager_defineProperties(e.prototype, r), t && FileBrowserManager_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function FileBrowserManager_toPropertyKey(t) { var i = FileBrowserManager_toPrimitive(t, "string"); return "symbol" == FileBrowserManager_typeof(i) ? i : i + ""; }
function FileBrowserManager_toPrimitive(t, r) { if ("object" != FileBrowserManager_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != FileBrowserManager_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * File Browser Manager
 * Handles file selection, comparison, and diff visualization
 *
 * This component is responsible for the file browser UI in diff-viewer/file-browser.php
 */








/**
 * Manages the file browser UI and functionality
 */
var FileBrowserManager = /*#__PURE__*/function () {
  /**
   * @param {Object} options - Configuration options
   */
  function FileBrowserManager() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    FileBrowserManager_classCallCheck(this, FileBrowserManager);
    // Check if we have the new single select or the old dual selects
    this.compareFileSelect = document.getElementById('compare-file');
    this.oldFileSelect = document.getElementById('old-file');
    this.newFileSelect = document.getElementById('new-file');

    // Debug: Log which elements were found
    Debug.log('FileBrowserManager: Constructor - Element detection', {
      compareFileSelect: !!this.compareFileSelect,
      oldFileSelect: !!this.oldFileSelect,
      newFileSelect: !!this.newFileSelect
    }, 2);

    // Initialize the DiffConfigManager with the options
    var configManager = DiffConfigManager.getInstance();
    configManager.initialize(FileBrowserManager_objectSpread({
      container: 'vdm-diff__viewer'
    }, options));

    // Initialize loader manager
    this.loaderManager = LoaderManager.getInstance();

    // Initialize translation manager
    this.translationManager = TranslationManager.getInstance();
    this.init();
  }

  /**
   * Initialize the file browser
   */
  return FileBrowserManager_createClass(FileBrowserManager, [{
    key: "init",
    value: function init() {
      var _this = this;
      Debug.log('FileBrowserManager: Initializing', null, 2);

      // Check if we have the new single select system
      if (this.compareFileSelect) {
        Debug.log('FileBrowserManager: Using new single file select system', null, 2);
        // No need for sync in single select mode
      } else if (this.oldFileSelect && this.newFileSelect) {
        Debug.log('FileBrowserManager: Using legacy dual file select system', null, 2);
        // Add event listeners to selectors for legacy mode
        this.oldFileSelect.addEventListener('change', function () {
          return _this.syncFileSelections();
        });
        this.newFileSelect.addEventListener('change', function () {
          // When user manually selects a new file, we don't sync
        });
      } else {
        Debug.warn('FileBrowserManager: No valid file select elements found', null, 1);
      }

      // Form submit handler
      var form = document.getElementById('vdm-file-comparison-form');
      if (form) {
        form.addEventListener('submit', function (event) {
          return _this.handleComparison(event);
        });
      } else {
        Debug.warn('FileBrowserManager: Form element not found', null, 1);
      }

      // Initial sync
      this.syncFileSelections();
      Debug.log('FileBrowserManager: Initialization complete', null, 2);
    }

    /**
     * Handle file comparison form submission
     * @param {Event} event - Form submit event
     */
  }, {
    key: "handleComparison",
    value: (function () {
      var _handleComparison = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {
        var alertManager, containerWrapper, loaderId, fileData, contents, result, uiManagerSuccess, viewerElement;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              event.preventDefault();
              Debug.log('FileBrowserManager: Handling comparison', null, 2);

              // Get the AlertManager instance to clear any existing alerts
              alertManager = utils_AlertManager.getInstance();
              alertManager.hideAlert();

              // Get the container wrapper element
              containerWrapper = document.getElementById(constants_Selectors.CONTAINER.WRAPPER.replace('#', '')); // Clear any existing content immediately before loading new content
              this.clearUI();

              // Show the container wrapper if it's hidden
              if (containerWrapper !== null && containerWrapper !== void 0 && containerWrapper.classList.contains('vdm-d-none')) {
                containerWrapper.classList.remove('vdm-d-none');
              }

              // Show an early loader before starting the process
              loaderId = this.loaderManager.showEarlyLoader(this.translationManager.get('loadingContent', 'Processing content...'));
              _context.prev = 8;
              // Clean up previous instances first
              this.cleanupPreviousInstance();

              // 1. Gather selected file data
              fileData = this.getSelectedFilesData(); // 2. Fetch file contents
              this.loaderManager.updateLoaderMessage(loaderId, this.translationManager.get('loadingContent', 'Loading file contents...'));
              _context.next = 14;
              return this.fetchFileContents(fileData);
            case 14:
              contents = _context.sent;
              if (!(contents.old === contents["new"])) {
                _context.next = 20;
                break;
              }
              Debug.log('FileBrowserManager: File contents are identical', null, 2);
              this.loaderManager.hideMainLoader(loaderId);
              this.handleIdenticalContent();
              return _context.abrupt("return");
            case 20:
              // 3. Configure diffConfig
              this.configureDiffData(fileData, contents);

              // 4. Process diff data
              this.loaderManager.updateLoaderMessage(loaderId, this.translationManager.get('processingChunks', 'Processing diff...'));
              _context.next = 24;
              return this.processDiff();
            case 24:
              result = _context.sent;
              if (!result.identical) {
                _context.next = 30;
                break;
              }
              Debug.log('FileBrowserManager: Files contain identical content according to backend', null, 2);
              this.loaderManager.hideMainLoader(loaderId);
              this.handleIdenticalContent();
              return _context.abrupt("return");
            case 30:
              // 5. Update diffConfig with result
              DiffConfigManager.getInstance().setDiffConfig(result);

              // 6. Initialize the UI manager
              this.loaderManager.updateLoaderMessage(loaderId, this.translationManager.get('loadingDiff', 'Initializing viewer...'));
              _context.next = 34;
              return this.initializeUIManager();
            case 34:
              uiManagerSuccess = _context.sent;
              if (uiManagerSuccess) {
                _context.next = 39;
                break;
              }
              Debug.error('FileBrowserManager: Failed to initialize UI manager', null, 1);
              this.loaderManager.hideMainLoader(loaderId);
              return _context.abrupt("return");
            case 39:
              _context.next = 41;
              return this.initializeDiffViewer();
            case 41:
              _context.next = 49;
              break;
            case 43:
              _context.prev = 43;
              _context.t0 = _context["catch"](8);
              Debug.error('FileBrowserManager: Error during comparison', _context.t0, 1);
              // Hide the loader if there's an error
              this.loaderManager.hideMainLoader(loaderId);

              // Get elements for error display
              viewerElement = document.getElementById('vdm-diff__viewer');
              this.handleError(_context.t0, null, viewerElement);
            case 49:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[8, 43]]);
      }));
      function handleComparison(_x) {
        return _handleComparison.apply(this, arguments);
      }
      return handleComparison;
    }()
    /**
     * Clean up previous instances
     */
    )
  }, {
    key: "cleanupPreviousInstance",
    value: function cleanupPreviousInstance() {
      // Clean up previous instances if they exist
      if (window.diffViewer) {
        try {
          Debug.log('FileBrowserManager: Cleaning up previous DiffViewer instance', null, 2);
          window.diffViewer.destroy();
          window.diffViewer = null;
        } catch (e) {
          Debug.warn('FileBrowserManager: Error destroying previous diffViewer', e, 1);
        }
      }
      if (window.vdmBrowserUIManager) {
        try {
          Debug.log('FileBrowserManager: Cleaning up previous BrowserUIManager instance', null, 2);
          window.vdmBrowserUIManager.destroy();
          window.vdmBrowserUIManager = null;
        } catch (e) {
          Debug.warn('FileBrowserManager: Error destroying previous BrowserUIManager', e, 1);
        }
      }
    }

    /**
     * Initialize the UI manager
     * @returns {Promise<boolean>} Success status
     */
  }, {
    key: "initializeUIManager",
    value: (function () {
      var _initializeUIManager = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var initResult;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              Debug.log('FileBrowserManager: Initializing UI manager', null, 2);

              // Import the BrowserUIManager if available
              if (!(typeof BrowserUIManager !== 'undefined')) {
                _context2.next = 22;
                break;
              }
              _context2.prev = 2;
              // Create new instance with the global window.diffConfig
              window.vdmBrowserUIManager = new BrowserUIManager(window.diffConfig);

              // Initialize with container
              _context2.next = 6;
              return window.vdmBrowserUIManager.initialize(constants_Selectors.CONTAINER.WRAPPER);
            case 6:
              initResult = _context2.sent;
              if (!initResult) {
                _context2.next = 11;
                break;
              }
              return _context2.abrupt("return", true);
            case 11:
              Debug.warn('FileBrowserManager: BrowserUIManager initialize returned false, falling back to manual UI creation', null, 1);
              return _context2.abrupt("return", this.createBasicUIElements());
            case 13:
              _context2.next = 20;
              break;
            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2["catch"](2);
              Debug.error('FileBrowserManager: BrowserUIManager initialize failed', _context2.t0, 1);
              Debug.warn('FileBrowserManager: Falling back to manual UI creation due to BrowserUIManager error', null, 1);
              return _context2.abrupt("return", this.createBasicUIElements());
            case 20:
              _context2.next = 24;
              break;
            case 22:
              Debug.warn('FileBrowserManager: BrowserUIManager not available, UI elements must be created manually', null, 1);
              // Fallback: Create basic UI elements manually
              return _context2.abrupt("return", this.createBasicUIElements());
            case 24:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[2, 15]]);
      }));
      function initializeUIManager() {
        return _initializeUIManager.apply(this, arguments);
      }
      return initializeUIManager;
    }()
    /**
     * Initialize the diff viewer
     * @returns {Promise<boolean>} Success status
     */
    )
  }, {
    key: "initializeDiffViewer",
    value: (function () {
      var _initializeDiffViewer = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _window$diffConfig$ne, _window$diffConfig$ne2, configManager, viewerContainer;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              Debug.log('FileBrowserManager: Initializing diff viewer', null, 2);

              // Check if DiffViewer is available
              if (!(typeof DiffViewer !== 'undefined')) {
                _context3.next = 17;
                break;
              }
              configManager = DiffConfigManager.getInstance(); // Update container with correct selector ID
              configManager.set('container', constants_Selectors.DIFF.VIEWER.replace('#', ''));

              // Ensure the runtime properties are set at the top level where DiffViewer expects them
              if (!window.diffConfig.fileRefId && (_window$diffConfig$ne = window.diffConfig["new"]) !== null && _window$diffConfig$ne !== void 0 && _window$diffConfig$ne.ref_id) {
                configManager.set('fileRefId', window.diffConfig["new"].ref_id);
                Debug.log('FileBrowserManager: Setting top-level fileRefId from new.ref_id', window.diffConfig.fileRefId, 1);
              }

              // SECURITY: Use safe filenames and fileRefIds, not server paths
              if (!window.diffConfig.newFileName && (_window$diffConfig$ne2 = window.diffConfig["new"]) !== null && _window$diffConfig$ne2 !== void 0 && _window$diffConfig$ne2.filename) {
                configManager.set('newFileName', window.diffConfig["new"].filename);
                Debug.log('FileBrowserManager: Setting top-level newFileName from new.filename', window.diffConfig.newFileName, 1);
              }

              // Always explicitly set serverSaveEnabled if we have file references
              configManager.set('serverSaveEnabled', !!window.diffConfig.fileRefId);

              // DEBUG log the final diffConfig properties before initialization
              Debug.log('FileBrowserManager: Final diffConfig settings before initialization', {
                fileRefId: window.diffConfig.fileRefId,
                oldFileRefId: window.diffConfig.oldFileRefId,
                newFileName: window.diffConfig.newFileName,
                oldFileName: window.diffConfig.oldFileName,
                serverSaveEnabled: window.diffConfig.serverSaveEnabled,
                demoEnabled: window.diffConfig.demoEnabled
              }, 1);

              // Validate the diff data before attempting to initialize
              if (!(!window.diffConfig.diffData || !Array.isArray(window.diffConfig.diffData.chunks) || window.diffConfig.diffData.chunks.length === 0)) {
                _context3.next = 13;
                break;
              }
              Debug.warn('FileBrowserManager: No valid diff data found for initialization', {
                hasDiffData: !!window.diffConfig.diffData,
                diffDataKeys: window.diffConfig.diffData ? Object.keys(window.diffConfig.diffData) : []
              }, 1);

              // Get container element
              viewerContainer = document.getElementById(window.diffConfig.container);
              if (viewerContainer) {
                viewerContainer.innerHTML = "\n                        <div class=\"".concat(constants_Selectors.UTILITY.ALERT_WARNING, "\">\n                            <h4>No Differences Found</h4>\n                            <p>The files appear to be identical or the diff engine couldn't process them correctly.</p>\n                            <p>Try selecting different files to compare.</p>\n                        </div>\n                    ");
              }

              // Return early to prevent initialization errors
              return _context3.abrupt("return", false);
            case 13:
              // Create a new DiffViewer instance
              window.diffViewer = new DiffViewer(window.diffConfig);

              // Initialize the viewer
              return _context3.abrupt("return", window.diffViewer.initialize());
            case 17:
              if (!(typeof window.enableDiffViewer === 'function')) {
                _context3.next = 22;
                break;
              }
              // Fall back to the global enableDiffViewer function if available
              Debug.log('FileBrowserManager: DiffViewer not available, falling back to enableDiffViewer', null, 2);
              return _context3.abrupt("return", window.enableDiffViewer());
            case 22:
              Debug.error('FileBrowserManager: DiffViewer not available', null, 1);
              throw new Error('DiffViewer not available');
            case 24:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function initializeDiffViewer() {
        return _initializeDiffViewer.apply(this, arguments);
      }
      return initializeDiffViewer;
    }()
    /**
     * Get selected files data
     * @returns {Object} Selected files data
     */
    )
  }, {
    key: "getSelectedFilesData",
    value: function getSelectedFilesData() {
      Debug.log('FileBrowserManager: Getting selected files data', null, 3);

      // Check if we're using the new single select system
      if (this.compareFileSelect) {
        Debug.log('FileBrowserManager: Using single select system', null, 3);
        if (this.compareFileSelect.selectedIndex < 0) {
          throw new Error('No file selected');
        }
        var selectedOption = this.compareFileSelect.options[this.compareFileSelect.selectedIndex];
        if (!selectedOption) {
          throw new Error('Selected option not found');
        }
        var oldRefId = selectedOption.getAttribute('data-old-ref-id');
        var newRefId = selectedOption.getAttribute('data-new-ref-id');
        var oldPath = selectedOption.getAttribute('data-old-path');
        var newPath = selectedOption.getAttribute('data-new-path');
        if (!oldRefId || !newRefId) {
          throw new Error('Missing file reference IDs in selected option');
        }
        Debug.log('FileBrowserManager: Single select data', {
          oldRefId: oldRefId,
          newRefId: newRefId,
          oldPath: oldPath,
          newPath: newPath
        }, 3);
        return {
          old: {
            path: oldPath,
            // SECURITY: Only retrieve file reference ID, not server path
            refId: oldRefId
          },
          "new": {
            path: newPath,
            // SECURITY: Only retrieve file reference ID, not server path
            refId: newRefId
          }
        };
      }

      // Fallback to legacy dual select system
      if (this.oldFileSelect && this.newFileSelect) {
        Debug.log('FileBrowserManager: Using legacy dual select system', null, 3);
        return {
          old: {
            path: this.oldFileSelect.value,
            // SECURITY: Only retrieve file reference ID, not server path
            refId: this.oldFileSelect.options[this.oldFileSelect.selectedIndex].getAttribute('data-ref-id')
          },
          "new": {
            path: this.newFileSelect.value,
            // SECURITY: Only retrieve file reference ID, not server path
            refId: this.newFileSelect.options[this.newFileSelect.selectedIndex].getAttribute('data-ref-id')
          }
        };
      }
      throw new Error('No valid file selection elements found');
    }

    /**
     * Fetch file contents
     * @param {Object} fileData - File data object
     * @returns {Promise<Object>} File contents
     */
  }, {
    key: "fetchFileContents",
    value: (function () {
      var _fetchFileContents = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(fileData) {
        var fetchFile, oldContent, newContent;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              Debug.log('FileBrowserManager: Fetching file contents', fileData, 3);

              // Use the API endpoint to safely retrieve file content
              fetchFile = /*#__PURE__*/function () {
                var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(filePath, refId) {
                  var _window$diffConfig, baseApiUrl, apiUrl, response, data, _response;
                  return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                    while (1) switch (_context4.prev = _context4.next) {
                      case 0:
                        if (!refId) {
                          _context4.next = 16;
                          break;
                        }
                        Debug.log('FileBrowserManager: Using reference ID for file', {
                          filePath: filePath,
                          refId: refId
                        }, 3);

                        // Get API URL from configuration, fallback to relative path
                        baseApiUrl = ((_window$diffConfig = window.diffConfig) === null || _window$diffConfig === void 0 ? void 0 : _window$diffConfig.apiBaseUrl) || '../api/';
                        apiUrl = "".concat(baseApiUrl, "get-file-content.php?refId=").concat(encodeURIComponent(refId));
                        Debug.log('FileBrowserManager: API URL', {
                          apiUrl: apiUrl,
                          baseApiUrl: baseApiUrl
                        }, 3);
                        _context4.next = 7;
                        return fetch(apiUrl);
                      case 7:
                        response = _context4.sent;
                        if (response.ok) {
                          _context4.next = 10;
                          break;
                        }
                        throw new Error("Failed to load file: ".concat(filePath, " (Status: ").concat(response.status, ")"));
                      case 10:
                        _context4.next = 12;
                        return response.json();
                      case 12:
                        data = _context4.sent;
                        return _context4.abrupt("return", data.content);
                      case 16:
                        Debug.log('FileBrowserManager: Using direct path for file', {
                          filePath: filePath
                        }, 3);

                        // SECURITY: Ensure the path is not absolute or contains dangerous patterns
                        if (!filePath.match(/^(\/|\\|https?:|file:|[a-zA-Z]:\\)/i)) {
                          _context4.next = 19;
                          break;
                        }
                        throw new Error("Invalid file path format: ".concat(filePath));
                      case 19:
                        _context4.next = 21;
                        return fetch(filePath);
                      case 21:
                        _response = _context4.sent;
                        if (_response.ok) {
                          _context4.next = 24;
                          break;
                        }
                        throw new Error("Failed to load file: ".concat(filePath, " (Status: ").concat(_response.status, ")"));
                      case 24:
                        _context4.next = 26;
                        return _response.text();
                      case 26:
                        return _context4.abrupt("return", _context4.sent);
                      case 27:
                      case "end":
                        return _context4.stop();
                    }
                  }, _callee4);
                }));
                return function fetchFile(_x3, _x4) {
                  return _ref.apply(this, arguments);
                };
              }();
              _context5.prev = 2;
              _context5.next = 5;
              return fetchFile(fileData.old.path, fileData.old.refId);
            case 5:
              oldContent = _context5.sent;
              _context5.next = 8;
              return fetchFile(fileData["new"].path, fileData["new"].refId);
            case 8:
              newContent = _context5.sent;
              if (!(oldContent === newContent)) {
                _context5.next = 12;
                break;
              }
              Debug.log('FileBrowserManager: Files contain identical content', null, 2);
              return _context5.abrupt("return", {
                old: oldContent,
                "new": newContent,
                identical: true
              });
            case 12:
              return _context5.abrupt("return", {
                old: oldContent,
                "new": newContent
              });
            case 15:
              _context5.prev = 15;
              _context5.t0 = _context5["catch"](2);
              Debug.error('FileBrowserManager: Failed to load one or both files', _context5.t0, 1);
              throw _context5.t0;
            case 19:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[2, 15]]);
      }));
      function fetchFileContents(_x2) {
        return _fetchFileContents.apply(this, arguments);
      }
      return fetchFileContents;
    }()
    /**
     * Configure diff data
     * @param {Object} fileData - File data object
     * @param {Object} contents - File contents
     */
    )
  }, {
    key: "configureDiffData",
    value: function configureDiffData(fileData, contents) {
      Debug.log('FileBrowserManager: Configuring diff data', fileData, 3);

      // DEBUG: Log file reference data before configuration
      Debug.log('FileBrowserManager: File reference data before configuration', {
        old: {
          refId: fileData.old.refId,
          path: fileData.old.path
        },
        "new": {
          refId: fileData["new"].refId,
          path: fileData["new"].path
        }
      }, 1);

      // Extract just the filenames (not paths) for security
      var oldFileName = fileData.old.path.split('/').pop();
      var newFileName = fileData["new"].path.split('/').pop();
      var configManager = DiffConfigManager.getInstance();

      // Set the old file data
      configManager.update({
        old: {
          type: 'file',
          content: contents.old,
          path: fileData.old.path,
          ref_id: fileData.old.refId,
          filename: oldFileName
        },
        "new": {
          type: 'file',
          content: contents["new"],
          path: fileData["new"].path,
          ref_id: fileData["new"].refId,
          filename: newFileName
        },
        filepath: newFileName,
        fileRefId: fileData["new"].refId || '',
        oldFileRefId: fileData.old.refId || '',
        newFileName: newFileName,
        oldFileName: oldFileName,
        serverSaveEnabled: !!(fileData["new"].refId || fileData.old.refId)
      });

      // DEBUG: Log the configured diffConfig
      Debug.log('FileBrowserManager: Configured diffConfig file references', {
        fileRefId: window.diffConfig.fileRefId,
        oldFileRefId: window.diffConfig.oldFileRefId,
        newFileName: window.diffConfig.newFileName,
        oldFileName: window.diffConfig.oldFileName,
        serverSaveEnabled: window.diffConfig.serverSaveEnabled,
        old: {
          ref_id: window.diffConfig.old.ref_id,
          filename: window.diffConfig.old.filename
        },
        "new": {
          ref_id: window.diffConfig["new"].ref_id,
          filename: window.diffConfig["new"].filename
        }
      }, 1);
    }

    /**
     * Process diff with API
     * @returns {Promise<Object>} API response
     */
  }, {
    key: "processDiff",
    value: (function () {
      var _processDiff = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var diffProcessorEndpoint, _window$diffConfig2, _window$diffConfig3, baseApiUrl, _window$diffConfig4, _window$diffConfig5, _baseApiUrl, response, result, translationManager, lang;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              Debug.log('FileBrowserManager: Processing diff with API', null, 2);
              // Use endpoint discovery if available
              _context6.prev = 1;
              if (!window.vdmEndpointDiscovery) {
                _context6.next = 9;
                break;
              }
              _context6.next = 5;
              return window.vdmEndpointDiscovery.getEndpoint('diffProcessor');
            case 5:
              diffProcessorEndpoint = _context6.sent;
              Debug.log('FileBrowserManager: Endpoint discovery found endpoint', diffProcessorEndpoint, 2);
              _context6.next = 12;
              break;
            case 9:
              // Fall back to config or default
              baseApiUrl = ((_window$diffConfig2 = window.diffConfig) === null || _window$diffConfig2 === void 0 ? void 0 : _window$diffConfig2.apiBaseUrl) || '../api/';
              diffProcessorEndpoint = ((_window$diffConfig3 = window.diffConfig) === null || _window$diffConfig3 === void 0 || (_window$diffConfig3 = _window$diffConfig3.apiEndpoints) === null || _window$diffConfig3 === void 0 ? void 0 : _window$diffConfig3.diffProcessor) || "".concat(baseApiUrl, "diff-processor.php");
              Debug.log('FileBrowserManager: Using fallback endpoint', diffProcessorEndpoint, 2);
            case 12:
              _context6.next = 19;
              break;
            case 14:
              _context6.prev = 14;
              _context6.t0 = _context6["catch"](1);
              Debug.warn('FileBrowserManager: Error discovering endpoints', _context6.t0, 1);
              // Fall back to config or default
              _baseApiUrl = ((_window$diffConfig4 = window.diffConfig) === null || _window$diffConfig4 === void 0 ? void 0 : _window$diffConfig4.apiBaseUrl) || '../api/';
              diffProcessorEndpoint = ((_window$diffConfig5 = window.diffConfig) === null || _window$diffConfig5 === void 0 || (_window$diffConfig5 = _window$diffConfig5.apiEndpoints) === null || _window$diffConfig5 === void 0 ? void 0 : _window$diffConfig5.diffProcessor) || "".concat(_baseApiUrl, "diff-processor.php");
            case 19:
              _context6.next = 21;
              return fetch(diffProcessorEndpoint, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(window.diffConfig)
              });
            case 21:
              response = _context6.sent;
              if (response.ok) {
                _context6.next = 25;
                break;
              }
              Debug.error('FileBrowserManager: API request failed', {
                status: response.status,
                statusText: response.statusText
              }, 1);
              throw new Error("API request failed: ".concat(response.status, " ").concat(response.statusText));
            case 25:
              _context6.next = 27;
              return response.json();
            case 27:
              result = _context6.sent;
              if (!result.error) {
                _context6.next = 31;
                break;
              }
              Debug.error('FileBrowserManager: API returned error', result.error, 1);
              throw new Error(result.error);
            case 31:
              // Initialize TranslationManager with server-provided data
              translationManager = TranslationManager.getInstance();
              if (result.config && result.config.translations) {
                lang = result.config.lang || 'en';
                Debug.log("FileBrowserManager: Initializing TranslationManager with \"".concat(lang, "\" language from server response"), result.config.translations, 2);
                translationManager.initialize(lang, result.config.translations);
              }

              // Move all properties from the nested config object to the root level
              if (result.config && FileBrowserManager_typeof(result.config) === 'object') {
                Debug.log('FileBrowserManager: Moving all properties from config to root level', result.config, 2);

                // Loop through all properties in config and move them to the root level
                Object.keys(result.config).forEach(function (key) {
                  var _result$key;
                  // Only copy if the property doesn't already exist at root level
                  // or if it does exist but is empty/undefined
                  if (result[key] === undefined || key === 'diffData' && (!((_result$key = result[key]) !== null && _result$key !== void 0 && _result$key.chunks) || result[key].chunks.length === 0)) {
                    Debug.log("FileBrowserManager: Moving ".concat(key, " from config to root level"), result.config[key], 3);
                    result[key] = result.config[key];
                  }
                });
              }
              return _context6.abrupt("return", result);
            case 35:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[1, 14]]);
      }));
      function processDiff() {
        return _processDiff.apply(this, arguments);
      }
      return processDiff;
    }()
    /**
     * Update diff config with API response
     * @param {Object} result - API response
     */
    )
  }, {
    key: "updateDiffConfig",
    value: function updateDiffConfig(result) {
      var _result$config;
      Debug.log('FileBrowserManager: Updating diff config with API response', null, 3);
      // Make sure we have a valid result
      if (!result || FileBrowserManager_typeof(result) !== 'object') {
        Debug.error('FileBrowserManager: Invalid result from API', result, 1);
        this.diffConfig.diffData = {
          old: [],
          "new": [],
          chunks: []
        };
        return;
      }

      // PRIORITIZE SERVER TRANSLATIONS - Do this first, before anything else
      if ((_result$config = result.config) !== null && _result$config !== void 0 && _result$config.translations) {
        // Make sure translations are set in window.diffConfig immediately
        if (!window.diffConfig) {
          window.diffConfig = {};
        }
        window.diffConfig.lang = result.config.lang || 'en';
        window.diffConfig.translations = result.config.translations;

        // Also update this.diffConfig
        this.diffConfig.lang = result.config.lang || 'en';
        this.diffConfig.translations = result.config.translations;
        Debug.log('FileBrowserManager: Server translations set in window.diffConfig', {
          lang: window.diffConfig.lang,
          translationCount: Object.keys(window.diffConfig.translations).length
        }, 1);
      }

      // Add demoEnabled flag from the server response
      if (result.config && result.config.demoEnabled !== undefined) {
        this.diffConfig.demoEnabled = result.config.demoEnabled;
        Debug.log('FileBrowserManager: Demo mode flag set from server', this.diffConfig.demoEnabled, 2);
      }

      // Handle case where the diffData is directly provided
      if (result.diffData) {
        this.diffConfig.diffData = {
          old: result.diffData.old || [],
          "new": result.diffData["new"] || [],
          chunks: result.diffData.chunks || []
        };
      }
      // Handle case where diff components are at the root level
      else if (result.old || result["new"] || result.chunks) {
        var _result$old, _result$new;
        this.diffConfig.diffData = {
          old: ((_result$old = result.old) === null || _result$old === void 0 ? void 0 : _result$old.lines) || [],
          "new": ((_result$new = result["new"]) === null || _result$new === void 0 ? void 0 : _result$new.lines) || [],
          chunks: result.chunks || []
        };
      }
      // Handle case where we have data but in an unexpected format
      else if (result.success === true && result.config) {
        // Try to extract diffData from the config
        if (result.config.diffData) {
          this.diffConfig.diffData = result.config.diffData;
        } else {
          // Create empty structure as fallback
          this.diffConfig.diffData = {
            old: [],
            "new": [],
            chunks: []
          };
          Debug.warn('FileBrowserManager: API returned success but no diffData was found in the response', result, 2);
        }
      }
      // Fallback when no recognizable diff data is found
      else {
        // Create empty structure as fallback
        this.diffConfig.diffData = {
          old: [],
          "new": [],
          chunks: []
        };
        Debug.warn('FileBrowserManager: Could not extract diff data from API response', result, 2);
      }

      // Additional validations
      if (!Array.isArray(this.diffConfig.diffData.old)) {
        this.diffConfig.diffData.old = [];
        Debug.warn('FileBrowserManager: diffData.old is not an array, using empty array instead', null, 2);
      }
      if (!Array.isArray(this.diffConfig.diffData["new"])) {
        this.diffConfig.diffData["new"] = [];
        Debug.warn('FileBrowserManager: diffData.new is not an array, using empty array instead', null, 2);
      }
      if (!Array.isArray(this.diffConfig.diffData.chunks)) {
        this.diffConfig.diffData.chunks = [];
        Debug.warn('FileBrowserManager: diffData.chunks is not an array, using empty array instead', null, 2);
      }

      // Retain any other useful configuration from the result
      if (result.config) {
        // Extract useful configurations but avoid overriding already set values
        var _result$config2 = result.config,
          debug = _result$config2.debug,
          theme = _result$config2.theme,
          apiEndpoint = _result$config2.apiEndpoint;
        if (debug !== undefined && this.diffConfig.debug === undefined) {
          this.diffConfig.debug = debug;
        }
        if (theme && !this.diffConfig.theme) {
          this.diffConfig.theme = theme;
        }
        if (apiEndpoint && !this.diffConfig.apiEndpoint) {
          this.diffConfig.apiEndpoint = apiEndpoint;
        }
      }

      // Make diffConfig globally available
      window.diffConfig = FileBrowserManager_objectSpread({}, this.diffConfig);
    }

    /**
     * Process API response, checking for demo mode
     * @param {Object} result - API response
     * @returns {boolean} Whether demo mode was detected and processed
     */
  }, {
    key: "processDemoResponse",
    value: function processDemoResponse(result) {
      // Check if this was a demo response
      if (result.demo && result.simulated) {
        Debug.log('FileBrowserManager: Demo mode detected', null, 2);

        // Get the alert manager
        var alertManager = utils_AlertManager.getInstance();

        // Get translation manager for proper messaging
        var translationManager = TranslationManager.getInstance();
        var title = translationManager.get('demoModeTitle', 'Simulation Complete');
        var message = result.message || translationManager.get('demoModeMessage', 'This is a demonstration only. Files will not be modified.');
        var simulated = translationManager.get('demoModeSimulated', 'Your merge choices would have been applied successfully in a real environment.');

        // Show demo message using the existing alert manager
        var demoMessage = "\n                <strong>".concat(title, "</strong><br>\n                ").concat(message, "<br>\n                ").concat(simulated, "\n            ");

        // Use the warning type to make it stand out
        alertManager.showWarning(demoMessage, {
          timeout: 0,
          translate: false
        });
        return true;
      }
      return false;
    }

    /**
     * Handle error
     * @param {Error} error - Error object
     * @param {HTMLElement} loadingElement - Loading element
     * @param {HTMLElement} viewerElement - Viewer element
     */
  }, {
    key: "handleError",
    value: function handleError(error, loadingElement, viewerElement) {
      Debug.error('FileBrowserManager: Error processing diff', error, 1);

      // Hide loading indicator
      if (loadingElement) loadingElement.style.display = 'none';

      // Show error in viewer using AlertManager
      if (viewerElement) {
        viewerElement.style.display = 'flex';
        viewerElement.innerHTML = ''; // Clear existing content

        // Use AlertManager to create the alert
        var alertManager = utils_AlertManager.getInstance();
        var errorMessage = "\n                <h4>Error Processing Diff</h4>\n                <p>".concat(error.message, "</p>\n            ");
        var alertElement = alertManager.showError(errorMessage, {
          timeout: 0,
          // Don't auto-dismiss
          translate: false,
          // Error message doesn't need translation
          className: 'm-3' // Add margin for better appearance
        });
        viewerElement.appendChild(alertElement);
      }
    }

    /**
     * Clear the UI elements before loading new content
     * This method is called immediately when the form is submitted
     */
  }, {
    key: "clearUI",
    value: function clearUI() {
      Debug.log('FileBrowserManager: Clearing UI', null, 2);

      // Get the container wrapper element
      var containerWrapper = document.getElementById(constants_Selectors.CONTAINER.WRAPPER.replace('#', ''));
      if (containerWrapper) {
        // Save any .vdm-user-content elements before clearing
        var userContentElements = containerWrapper.querySelectorAll('.vdm-user-content');
        var savedUserContent = [];
        userContentElements.forEach(function (element) {
          savedUserContent.push(element.cloneNode(true));
        });

        // Clear the container content while keeping its structure
        containerWrapper.innerHTML = '';

        // Restore saved .vdm-user-content elements
        if (savedUserContent.length > 0) {
          Debug.log("FileBrowserManager: Restoring ".concat(savedUserContent.length, " user content elements"), null, 2);
          savedUserContent.forEach(function (element) {
            containerWrapper.appendChild(element);
          });
        }
      }

      // Clear any result messages
      var resultContainer = document.getElementById('vdm-merge__result');
      if (resultContainer) {
        resultContainer.innerHTML = '';
        resultContainer.classList.add('vdm-d-none');
      }

      // Clean up any existing dynamic elements
      var existingViewers = document.querySelectorAll('.vdm-diff__viewer, .vdm-diff-ui');
      existingViewers.forEach(function (element) {
        element.innerHTML = '';
        // Either remove the element or hide it
        element.classList.add('vdm-d-none');
      });
      Debug.log('FileBrowserManager: UI cleared', null, 2);
    }

    /**
     * Sync file selections (only for legacy dual select system)
     */
  }, {
    key: "syncFileSelections",
    value: function syncFileSelections() {
      Debug.log('FileBrowserManager: Syncing file selections', null, 3);

      // Only sync if we're using the legacy dual select system
      if (this.compareFileSelect) {
        Debug.log('FileBrowserManager: Skipping sync - using single select system', null, 3);
        return;
      }
      if (!this.oldFileSelect || !this.newFileSelect) {
        Debug.warn('FileBrowserManager: Cannot sync file selections - select elements not found', null, 2);
        return;
      }

      // Get the filename from the selected old file
      var oldValue = this.oldFileSelect.value;
      var oldFileName = oldValue.split('/').pop();

      // Try to find a matching file in the new files dropdown
      var matchFound = false;

      // First try exact match
      for (var i = 0; i < this.newFileSelect.options.length; i++) {
        var newOption = this.newFileSelect.options[i];
        var newFileName = newOption.value.split('/').pop();
        if (newFileName === oldFileName) {
          this.newFileSelect.selectedIndex = i;
          matchFound = true;
          break;
        }
      }

      // If no exact match, try extension match
      if (!matchFound) {
        var fileExt = oldFileName.split('.').pop();
        for (var _i = 0; _i < this.newFileSelect.options.length; _i++) {
          var newValue = this.newFileSelect.options[_i].value;
          if (newValue.endsWith('.' + fileExt)) {
            this.newFileSelect.selectedIndex = _i;
            break;
          }
        }
      }
    }

    /**
     * Handle identical content case
     */
  }, {
    key: "handleIdenticalContent",
    value: function handleIdenticalContent() {
      Debug.log('FileBrowserManager: Files contain identical content', null, 2);

      // Get the container wrapper element
      var containerWrapper = document.getElementById(constants_Selectors.CONTAINER.WRAPPER.replace('#', ''));

      // Make sure the container wrapper is visible
      if (containerWrapper) {
        containerWrapper.classList.remove('vdm-d-none');
      }

      // Get translation manager and retrieve the message
      var translationManager = TranslationManager.getInstance();
      var message = translationManager.get('identicalContentMessage', 'The contents are identical. There\'s nothing to merge.');

      // Use AlertManager to create the alert
      var alertManager = utils_AlertManager.getInstance();

      // Create alert container if it doesn't exist
      var alertContainer = containerWrapper.querySelector('.vdm-alert-container');
      if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.className = 'vdm-alert-container';

        // Find .vdm-user-content if it exists, otherwise prepend to containerWrapper
        var userContent = containerWrapper.querySelector('.vdm-user-content');
        if (userContent) {
          userContent.after(alertContainer);
        } else {
          containerWrapper.prepend(alertContainer);
        }
      }

      // Set alert container as the container for the alert
      alertManager.container = alertContainer;

      // Show the alert in the proper container
      alertManager.showInfo(message, {
        timeout: 0,
        // Don't auto-dismiss
        translate: false,
        // Message is already translated
        className: 'vdm-mb-3',
        // Add margin bottom for spacing
        container: alertContainer
      });

      // Hide the diff viewer elements but keep our alert visible
      if (containerWrapper) {
        // Get any existing diffViewer content inside the container and hide it
        var diffContainer = containerWrapper.querySelector(constants_Selectors.DIFF.CONTAINER);
        if (diffContainer) {
          diffContainer.style.display = 'none';
        }
        Debug.log('FileBrowserManager: Hidden diff container for identical content', null, 2);
      }

      // Make sure any existing diff viewer instances are destroyed
      this.cleanupPreviousInstance();
    }

    /**
     * Create basic UI elements manually when BrowserUIManager is not available
     * @returns {boolean} Success status
     */
  }, {
    key: "createBasicUIElements",
    value: function createBasicUIElements() {
      Debug.log('FileBrowserManager: Creating basic UI elements manually', null, 2);

      // Get the container wrapper element
      var containerWrapper = document.getElementById(constants_Selectors.CONTAINER.WRAPPER.replace('#', ''));
      if (!containerWrapper) {
        Debug.error('FileBrowserManager: Container wrapper not found', constants_Selectors.CONTAINER.WRAPPER, 1);
        return false;
      }

      // Create the main diff viewer container
      var diffViewerId = constants_Selectors.DIFF.VIEWER.replace('#', '');
      var diffViewer = document.getElementById(diffViewerId);
      if (!diffViewer) {
        diffViewer = document.createElement('div');
        diffViewer.id = diffViewerId;
        diffViewer.className = 'vdm-diff-ui';
        containerWrapper.appendChild(diffViewer);
        Debug.log('FileBrowserManager: Created diff viewer element', {
          id: diffViewerId
        }, 2);
      }

      // Create the diff container inside the viewer
      var diffContainerId = constants_Selectors.DIFF.CONTAINER.replace('#', '');
      var diffContainer = document.getElementById(diffContainerId);
      if (!diffContainer) {
        diffContainer = document.createElement('div');
        diffContainer.id = diffContainerId;
        diffContainer.className = 'vdm-diff__container';
        diffViewer.appendChild(diffContainer);
        Debug.log('FileBrowserManager: Created diff container element', {
          id: diffContainerId
        }, 2);
      }

      // Create the basic structure for left and right panes
      if (!diffContainer.querySelector('.vdm-diff__pane--left')) {
        var leftPane = document.createElement('div');
        leftPane.className = 'vdm-diff__pane vdm-diff__pane--left';
        leftPane.innerHTML = '<div class="vdm-diff__content"></div>';
        diffContainer.appendChild(leftPane);
      }
      if (!diffContainer.querySelector('.vdm-diff__pane--right')) {
        var rightPane = document.createElement('div');
        rightPane.className = 'vdm-diff__pane vdm-diff__pane--right';
        rightPane.innerHTML = '<div class="vdm-diff__content"></div>';
        diffContainer.appendChild(rightPane);
      }
      Debug.log('FileBrowserManager: Basic UI elements created successfully', null, 2);
      return true;
    }
  }]);
}();

// Expose to global scope
if (typeof window !== 'undefined') {
  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    window.fileBrowserManager = new FileBrowserManager();
  });
}
;// ./src/utils/IconRegistry.js
function IconRegistry_typeof(o) { "@babel/helpers - typeof"; return IconRegistry_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, IconRegistry_typeof(o); }
function IconRegistry_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function IconRegistry_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, IconRegistry_toPropertyKey(o.key), o); } }
function IconRegistry_createClass(e, r, t) { return r && IconRegistry_defineProperties(e.prototype, r), t && IconRegistry_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function IconRegistry_toPropertyKey(t) { var i = IconRegistry_toPrimitive(t, "string"); return "symbol" == IconRegistry_typeof(i) ? i : i + ""; }
function IconRegistry_toPrimitive(t, r) { if ("object" != IconRegistry_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != IconRegistry_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Central registry for SVG icons
 * This eliminates the need for external icon libraries
 */
var IconRegistry = /*#__PURE__*/function () {
  function IconRegistry() {
    IconRegistry_classCallCheck(this, IconRegistry);
  }
  return IconRegistry_createClass(IconRegistry, null, [{
    key: "getIcon",
    value:
    /**
     * Get SVG markup for the specified icon
     * @param {string} iconName - Name of the icon
     * @param {Object} options - Additional options for the icon
     * @returns {string} SVG markup
     */
    function getIcon(iconName) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _options$classes = options.classes,
        classes = _options$classes === void 0 ? '' : _options$classes,
        _options$width = options.width,
        width = _options$width === void 0 ? 16 : _options$width,
        _options$height = options.height,
        height = _options$height === void 0 ? 16 : _options$height,
        _options$title = options.title,
        title = _options$title === void 0 ? '' : _options$title,
        _options$ariaHidden = options.ariaHidden,
        ariaHidden = _options$ariaHidden === void 0 ? true : _options$ariaHidden;

      // Get the SVG path data
      var pathData = this._getIconPathData(iconName);
      if (!pathData) {
        console.warn("Icon not found: ".concat(iconName));
        return '';
      }

      // Create title element for accessibility if provided
      var titleElement = title ? "<title>".concat(title, "</title>") : '';

      // Generate the SVG with the right attributes
      return "<svg\n            class=\"vdm-icon ".concat(classes, "\"\n            width=\"").concat(width, "\"\n            height=\"").concat(height, "\"\n            viewBox=\"").concat(pathData.viewBox || '0 0 512 512', "\"\n            ").concat(ariaHidden ? 'aria-hidden="true"' : 'role="img"', "\n            focusable=\"false\"\n        >\n            ").concat(titleElement, "\n            ").concat(pathData.paths, "\n        </svg>");
    }

    /**
     * Get the path data for an icon
     * @private
     * @param {string} iconName - Name of the icon
     * @returns {Object|null} Icon path data or null if not found
     */
  }, {
    key: "_getIconPathData",
    value: function _getIconPathData(iconName) {
      // Map of icon names to their SVG path data
      var icons = {
        'chevron-up': {
          viewBox: '0 0 512 512',
          paths: '<path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>'
        },
        'chevron-down': {
          viewBox: '0 0 512 512',
          paths: '<path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>'
        },
        'eye': {
          viewBox: '0 0 576 512',
          paths: '<path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>'
        },
        'sun': {
          viewBox: '0 0 512 512',
          paths: '<path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/>'
        },
        'moon': {
          viewBox: '0 0 384 512',
          paths: '<path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/>'
        },
        'file': {
          viewBox: '0 0 384 512',
          paths: '<path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"/>'
        },
        'file-circle-plus': {
          viewBox: '0 0 576 512',
          paths: '<path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM288 368a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-80c-8.8 0-16 7.2-16 16v48H368c-8.8 0-16 7.2-16 16s7.2 16 16 16h48v48c0 8.8 7.2 16 16 16s16-7.2 16-16V384h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H448V304c0-8.8-7.2-16-16-16z"/>'
        },
        'file-lines': {
          viewBox: '0 0 384 512',
          paths: '<path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>'
        },
        'file-copy': {
          viewBox: '0 0 576 512',
          paths: '<path d="M384 480h48c20.9 0 38.7-13.4 45.3-32H416c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16h61.3C470.7 157.4 452.9 144 432 144H384V64c0-35.3-28.7-64-64-64H64C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H384zM128 64H320V144H128V64zM400 240V416H144V192H352c26.5 0 48 21.5 48 48zm176-48c0-8.8-7.2-16-16-16H432c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H560c8.8 0 16-7.2 16-16V192z"/>'
        },
        'plus-circle': {
          viewBox: '0 0 512 512',
          paths: '<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>'
        },
        'exclamation-triangle': {
          viewBox: '0 0 512 512',
          paths: '<path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>'
        },
        'copy': {
          viewBox: '0 0 512 512',
          paths: '<path d="M272 0H396.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128H192v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"/>'
        },
        // Add more icons as needed
        'check-circle': {
          viewBox: '0 0 512 512',
          paths: '<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>'
        },
        'chevron-right': {
          viewBox: '0 0 320 512',
          paths: '<path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>'
        },
        'download': {
          viewBox: '0 0 512 512',
          paths: '<path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>'
        },
        'uncheck-circle': {
          viewBox: '0 0 512 512',
          paths: '<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24v112c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm-32 224a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>'
        },
        'info-circle': {
          viewBox: '0 0 512 512',
          paths: '<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>'
        },
        'exclamation-circle': {
          viewBox: '0 0 512 512',
          paths: '<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM256 128c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>'
        },
        'checkbox-unchecked': {
          viewBox: '0 0 24 24',
          paths: '<path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>'
        },
        'checkbox-checked': {
          viewBox: '0 0 24 24',
          paths: '<path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
        }
      };
      return icons[iconName] || null;
    }

    /**
     * Create DOM element for an icon
     * @param {string} iconName - Name of the icon
     * @param {Object} options - Additional options for the icon
     * @returns {Element} The created SVG element
     */
  }, {
    key: "createIcon",
    value: function createIcon(iconName) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var svgString = this.getIcon(iconName, options);
      if (!svgString) return null;
      var template = document.createElement('template');
      template.innerHTML = svgString.trim();
      return template.content.firstChild;
    }
  }]);
}();
;// ./src/utils/DOMUtils.js
function DOMUtils_typeof(o) { "@babel/helpers - typeof"; return DOMUtils_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, DOMUtils_typeof(o); }
function DOMUtils_slicedToArray(r, e) { return DOMUtils_arrayWithHoles(r) || DOMUtils_iterableToArrayLimit(r, e) || DOMUtils_unsupportedIterableToArray(r, e) || DOMUtils_nonIterableRest(); }
function DOMUtils_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function DOMUtils_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function DOMUtils_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function DOMUtils_toConsumableArray(r) { return DOMUtils_arrayWithoutHoles(r) || DOMUtils_iterableToArray(r) || DOMUtils_unsupportedIterableToArray(r) || DOMUtils_nonIterableSpread(); }
function DOMUtils_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function DOMUtils_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return DOMUtils_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? DOMUtils_arrayLikeToArray(r, a) : void 0; } }
function DOMUtils_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function DOMUtils_arrayWithoutHoles(r) { if (Array.isArray(r)) return DOMUtils_arrayLikeToArray(r); }
function DOMUtils_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function DOMUtils_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function DOMUtils_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, DOMUtils_toPropertyKey(o.key), o); } }
function DOMUtils_createClass(e, r, t) { return r && DOMUtils_defineProperties(e.prototype, r), t && DOMUtils_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function DOMUtils_toPropertyKey(t) { var i = DOMUtils_toPrimitive(t, "string"); return "symbol" == DOMUtils_typeof(i) ? i : i + ""; }
function DOMUtils_toPrimitive(t, r) { if ("object" != DOMUtils_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != DOMUtils_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





// Cache for DOM queries
var elementCache = new Map();

/**
 * Reusable DOM manipulation utilities
 */
var DOMUtils = /*#__PURE__*/function () {
  function DOMUtils() {
    DOMUtils_classCallCheck(this, DOMUtils);
  }
  return DOMUtils_createClass(DOMUtils, null, [{
    key: "setupButtonHandler",
    value:
    /**
     * Set up a button handler with proper cleanup
     * @param {string} buttonId - Button element ID
     * @param {Function} handlerFn - Event handler function
     * @param {string} logName - Name for logging
     * @returns {Object|null} Handler information or null if element not found
     */
    function setupButtonHandler(buttonId, handlerFn) {
      var logName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var button = document.getElementById(buttonId);
      if (!button) {
        Debug.warn("DOMUtils: Button ".concat(buttonId, " not found"), null, 2);
        return null;
      }
      var instanceId = Date.now();

      // Clean up if needed
      if (button._handlerId && button._handlerId !== instanceId) {
        // Clone to remove all event listeners
        var newBtn = button.cloneNode(true);
        if (button.parentNode) {
          button.parentNode.replaceChild(newBtn, button);
        }
        Debug.log("DOMUtils: Cleaned up previous handler for ".concat(logName || buttonId), null, 2);
        handlerFn(newBtn);
        newBtn._handlerId = instanceId;
        return {
          element: newBtn,
          id: instanceId
        };
      } else {
        button._handlerId = instanceId;
        handlerFn(button);
        return {
          element: button,
          id: instanceId
        };
      }
    }

    /**
     * Get element by ID with error handling
     * @param {string} id - Element ID
     * @returns {Element|null} The found element or null
     */
  }, {
    key: "getElement",
    value: function getElement(id) {
      if (!id) {
        Debug.error('DOMUtils.getElement: Empty ID provided', null, 1);
        return null;
      }

      // Check cache first
      if (elementCache.has(id)) {
        return elementCache.get(id);
      }

      // Try direct getElementById first
      var element = document.getElementById(id);

      // If not found and the id doesn't include a #, try with a selector
      if (!element) {
        try {
          if (!id.includes('#') && !id.includes('.')) {
            // If just an ID without # prefix, try with # prefix
            element = document.querySelector('#' + id);
          } else {
            // Try as selector
            element = document.querySelector(id);
          }
        } catch (e) {
          Debug.error("DOMUtils.getElement: Error with selector: ".concat(e.message), null, 1);
        }
      }
      if (!element) {
        Debug.error("DOMUtils.getElement: Element with ID '".concat(id, "' not found"), null, 1);
      } else {
        // Cache the found element
        elementCache.set(id, element);
      }
      return element;
    }

    /**
     * Update toggle button appearance
     * @param {string} currentValue - Current toggle value
     * @param {Object} elements - Object containing button, icon, and text elements
     * @param {Object} options - Configuration options
     */
  }, {
    key: "updateToggleButton",
    value: function updateToggleButton(currentValue, elements, options) {
      var toggleBtn = elements.toggleBtn,
        toggleIcon = elements.toggleIcon,
        toggleText = elements.toggleText;
      var firstOption = options.firstOption,
        secondOption = options.secondOption,
        firstClass = options.firstClass,
        secondClass = options.secondClass,
        firstText = options.firstText,
        secondText = options.secondText,
        firstTooltip = options.firstTooltip,
        secondTooltip = options.secondTooltip;
      if (!toggleBtn || !toggleIcon || !toggleText) {
        Debug.warn('DOMUtils: Missing elements for toggle button update');
        return;
      }
      Debug.log("DOMUtils: Updating toggle button to ".concat(currentValue), null, 2);

      // Set the button class based on current value
      if (currentValue === firstOption) {
        toggleIcon.className = firstClass;
        toggleText.textContent = firstText;
        toggleBtn.title = firstTooltip || firstText;
        toggleBtn.setAttribute('data-value', firstOption);
      } else if (currentValue === secondOption) {
        toggleIcon.className = secondClass;
        toggleText.textContent = secondText;
        toggleBtn.title = secondTooltip || secondText;
        toggleBtn.setAttribute('data-value', secondOption);
      } else {
        Debug.warn("DOMUtils: Invalid toggle value: ".concat(currentValue));
      }
    }

    /**
     * Show a standardized message in a container
     * @param {string} containerId - Container element ID
     * @param {string} message - Message content
     * @param {string} type - Message type: 'info', 'success', 'warning', 'danger'
     * @param {Object} options - Additional options
     * @returns {boolean} Success status
     */
  }, {
    key: "showMessage",
    value: function showMessage(containerId, message) {
      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'info';
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var container = document.getElementById(containerId);
      if (!container) {
        Debug.warn("DOMUtils: Container #".concat(containerId, " not found for message"), null, 2);
        return false;
      }

      // Default options
      var _options$_iconName = options._iconName,
        _iconName = _options$_iconName === void 0 ? null : _options$_iconName,
        _options$className = options.className,
        className = _options$className === void 0 ? 'mt-5' : _options$className,
        _options$elementId = options.elementId,
        elementId = _options$elementId === void 0 ? '' : _options$elementId,
        _options$keepExisting = options.keepExisting,
        keepExisting = _options$keepExisting === void 0 ? false : _options$keepExisting;

      // Use AlertManager to create the alert
      var alertManager = utils_AlertManager.getInstance();

      // Clear existing content unless we're keeping it
      if (!keepExisting) {
        container.innerHTML = '';
      }

      // Check if HAS_ICON exists in UTILITY and provide a fallback if it doesn't
      var iconClass = '';
      try {
        if (constants_Selectors.UTILITY && constants_Selectors.UTILITY.HAS_ICON) {
          iconClass = constants_Selectors.UTILITY.HAS_ICON.name();
        } else {
          // Fallback if HAS_ICON is not defined
          iconClass = 'vdm-has-icon';
          Debug.log('DOMUtils: Using fallback icon class because Selectors.UTILITY.HAS_ICON is undefined', null, 2);
        }
      } catch (e) {
        // Fallback if any error occurs
        iconClass = 'vdm-has-icon';
        Debug.warn('DOMUtils: Error getting icon class, using fallback', e, 2);
      }

      // Create the alert with AlertManager
      var alertElement = alertManager.showAlert(message, type, {
        timeout: 0,
        // Don't auto-dismiss
        translate: false,
        // Don't translate the message
        className: "".concat(iconClass, " ").concat(className)
      });

      // Set ID if specified
      if (elementId) {
        alertElement.id = elementId;
      }

      // Append to container
      container.appendChild(alertElement);
      return true;
    }

    /**
     * Toggle element visibility
     * @param {string} elementId - Element ID
     * @param {boolean} visible - Whether element should be visible
     * @param {string} displayMode - Display mode when visible
     * @returns {boolean} Success status
     */
  }, {
    key: "toggleVisibility",
    value: function toggleVisibility(elementId, visible) {
      var displayMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'block';
      var element = document.getElementById(elementId);
      if (!element) {
        Debug.warn("DOMUtils: Element #".concat(elementId, " not found for visibility toggle"), null, 2);
        return false;
      }
      element.style.display = visible ? displayMode : 'none';
      return true;
    }

    /**
     * Add or remove a class from an element
     * @param {string} elementId - Element ID
     * @param {string} className - Class name to toggle
     * @param {boolean} add - Whether to add or remove the class
     * @returns {boolean} Success status
     */
  }, {
    key: "toggleClass",
    value: function toggleClass(elementId, className) {
      var add = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var element = document.getElementById(elementId);
      if (!element) {
        Debug.warn("DOMUtils: Element #".concat(elementId, " not found for class toggle"), null, 2);
        return false;
      }
      if (add) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
      return true;
    }

    /**
     * Create an element with specified attributes
     * @param {string} tagName - Element tag name
     * @param {string|null} id - Element ID
     * @param {string|Array} classes - CSS classes
     * @param {Object} attributes - Additional attributes
     * @returns {HTMLElement} Created element
     */
  }, {
    key: "createElement",
    value: function createElement() {
      var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var classes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var attributes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var element = document.createElement(tagName);

      // Set ID if provided
      if (id) {
        element.id = id;
      }

      // Add classes - handle both arrays and space-separated strings
      if (classes) {
        var classList;
        if (Array.isArray(classes)) {
          classList = classes;
        } else if (typeof classes === 'string') {
          classList = classes.split(/\s+/).filter(Boolean);
        } else {
          classList = [];
        }
        if (classList.length > 0) {
          var _element$classList;
          (_element$classList = element.classList).add.apply(_element$classList, DOMUtils_toConsumableArray(classList));
        }
      }

      // Set attributes
      Object.entries(attributes).forEach(function (_ref) {
        var _ref2 = DOMUtils_slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
        if (value !== undefined && value !== null) {
          element.setAttribute(key, value);
        }
      });
      return element;
    }

    /**
     * Create and append an element to a container
     * @param {string} tagName - Element tag name
     * @param {Element|string} container - Container element or ID
     * @param {Object} options - Element options
     * @returns {HTMLElement|null} Created element or null if container not found
     */
  }, {
    key: "createAndAppendElement",
    value: function createAndAppendElement(tagName, container) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      // Get container element if ID was provided
      var containerElement = typeof container === 'string' ? document.getElementById(container) : container;
      if (!containerElement) {
        Debug.warn("DOMUtils: Container not found for createAndAppendElement", null, 2);
        return null;
      }

      // Extract options
      var _options$id = options.id,
        id = _options$id === void 0 ? null : _options$id,
        _options$classes = options.classes,
        classes = _options$classes === void 0 ? [] : _options$classes,
        _options$attributes = options.attributes,
        attributes = _options$attributes === void 0 ? {} : _options$attributes,
        _options$content = options.content,
        content = _options$content === void 0 ? null : _options$content;

      // Create element
      var element = DOMUtils.createElement(tagName, id, classes, attributes);

      // Set content if provided
      if (content !== null) {
        if (typeof content === 'string') {
          element.innerHTML = content;
        } else if (content instanceof Node) {
          element.appendChild(content);
        }
      }

      // Append to container
      containerElement.appendChild(element);
      return element;
    }

    /**
     * Set element content safely
     * @param {string} elementId - Element ID
     * @param {string} content - HTML content
     * @returns {boolean} Success status
     */
  }, {
    key: "setContent",
    value: function setContent(elementId, content) {
      var element = document.getElementById(elementId);
      if (!element) {
        Debug.warn("DOMUtils: Element #".concat(elementId, " not found for content update"), null, 2);
        return false;
      }
      element.innerHTML = content;
      return true;
    }

    /**
     * Get elements by selector
     * @param {string} selector - CSS selector
     * @param {Element|Document|string} context - Search context or ID
     * @returns {NodeList|null} Selected elements or null if context not found
     */
  }, {
    key: "getElements",
    value: function getElements(selector) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
      // Get context element if ID was provided
      var contextElement = typeof context === 'string' ? document.getElementById(context) : context;
      if (!contextElement) {
        Debug.warn("DOMUtils: Context not found for selector: ".concat(selector), null, 2);
        return null;
      }
      return contextElement.querySelectorAll(selector);
    }

    /**
     * Append HTML content to an element
     * @param {string} elementId - Element ID
     * @param {string} content - HTML content to append
     * @returns {boolean} Success status
     */
  }, {
    key: "appendContent",
    value: function appendContent(elementId, content) {
      var element = document.getElementById(elementId);
      if (!element) {
        Debug.warn("DOMUtils: Element #".concat(elementId, " not found for content append"), null, 2);
        return false;
      }
      element.insertAdjacentHTML('beforeend', content);
      return true;
    }

    /**
     * Remove an element safely
     * @param {string|Element} elementOrId - Element or element ID to remove
     * @returns {boolean} Success status
     */
  }, {
    key: "removeElement",
    value: function removeElement(elementOrId) {
      var element = typeof elementOrId === 'string' ? document.getElementById(elementOrId) : element;
      if (!(element !== null && element !== void 0 && element.parentNode)) {
        Debug.warn("DOMUtils: Element not found or has no parent for removal", null, 2);
        return false;
      }
      element.parentNode.removeChild(element);
      return true;
    }

    /**
     * Setup event handlers on elements matching a selector
     * @param {string} selector - CSS selector to match elements
     * @param {string} eventType - Event type (e.g., 'click', 'change')
     * @param {function} handler - Event handler function
     * @param {Object} options - Additional options
     * @returns {number} Number of elements that received the handler
     */
  }, {
    key: "setupEventHandlers",
    value: function setupEventHandlers(selector, eventType, handler) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var _options$context = options.context,
        context = _options$context === void 0 ? document : _options$context,
        _options$removeExisti = options.removeExisting,
        removeExisting = _options$removeExisti === void 0 ? false : _options$removeExisti,
        _options$styles = options.styles,
        styles = _options$styles === void 0 ? null : _options$styles;
      var elements = DOMUtils.getElements(selector, context);
      if (!elements) return 0;

      // Remove existing handlers if requested
      if (removeExisting) {
        elements.forEach(function (element) {
          element.removeEventListener(eventType, handler);
        });
      }

      // Add new handlers and apply styles
      elements.forEach(function (element) {
        element.addEventListener(eventType, handler);

        // Apply styles if provided
        if (styles) {
          Object.entries(styles).forEach(function (_ref3) {
            var _ref4 = DOMUtils_slicedToArray(_ref3, 2),
              property = _ref4[0],
              value = _ref4[1];
            element.style[property] = value;
          });
        }
      });
      return elements.length;
    }

    /**
     * Create an icon element
     * @param {string} iconName - Name of the icon
     * @param {Object} options - Icon options
     * @returns {Element} SVG icon element
     */
  }, {
    key: "createIcon",
    value: function createIcon(iconName) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return IconRegistry.createIcon(iconName, options);
    }

    /**
     * Get icon HTML string
     * @param {string} iconName - Name of the icon
     * @param {Object} options - Icon options
     * @returns {string} SVG icon HTML
     */
  }, {
    key: "getIconHtml",
    value: function getIconHtml(iconName) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return IconRegistry.getIcon(iconName, options);
    }
  }]);
}();
;// ./src/components/viewer/BrowserUIManager.js
function BrowserUIManager_typeof(o) { "@babel/helpers - typeof"; return BrowserUIManager_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, BrowserUIManager_typeof(o); }
function BrowserUIManager_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function BrowserUIManager_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, BrowserUIManager_toPropertyKey(o.key), o); } }
function BrowserUIManager_createClass(e, r, t) { return r && BrowserUIManager_defineProperties(e.prototype, r), t && BrowserUIManager_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function BrowserUIManager_toPropertyKey(t) { var i = BrowserUIManager_toPrimitive(t, "string"); return "symbol" == BrowserUIManager_typeof(i) ? i : i + ""; }
function BrowserUIManager_toPrimitive(t, r) { if ("object" != BrowserUIManager_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != BrowserUIManager_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





/**
 * Manages browser UI generation for file-browser.php
 * This component handles the dynamic generation of UI elements that were previously
 * hardcoded in the PHP file, ensuring proper use of selectors and translations.
 */
var BrowserUIManager_BrowserUIManager = /*#__PURE__*/function () {
  /**
   * @param {DiffViewer|Object} diffViewer - Parent diff viewer instance or options object
   */
  function BrowserUIManager(diffViewer) {
    var _window$diffConfig, _this$options;
    BrowserUIManager_classCallCheck(this, BrowserUIManager);
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
    var translationsSource;

    // Extract nested ternary operations into separate statements
    var hasWindowConfig = !!((_window$diffConfig = window.diffConfig) !== null && _window$diffConfig !== void 0 && _window$diffConfig.translations);
    var hasOptionsTranslations = !!((_this$options = this.options) !== null && _this$options !== void 0 && _this$options.translations);
    if (this.translationManager.isInitialized()) {
      translationsSource = 'TranslationManager';
    } else if (hasWindowConfig) {
      translationsSource = 'window.diffConfig';
    } else if (hasOptionsTranslations) {
      translationsSource = 'options';
    } else {
      translationsSource = 'none';
    }
    var lang = this.translationManager.getLanguage();
    Debug.log("BrowserUIManager: Created with \"".concat(lang, "\" translations from ").concat(translationsSource), this.translationManager.getAllTranslations(), 2);
  }

  /**
   * Set the DiffViewer instance
   * @param {DiffViewer} diffViewer - The DiffViewer instance
   */
  return BrowserUIManager_createClass(BrowserUIManager, [{
    key: "setDiffViewer",
    value: function setDiffViewer(diffViewer) {
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
  }, {
    key: "getTranslations",
    value: function getTranslations() {
      var _window$diffConfig2, _this$options2;
      // First, try to get translations from the TranslationManager
      if (this.translationManager && this.translationManager.isInitialized()) {
        Debug.log('BrowserUIManager: Using translations from TranslationManager', this.translationManager.getAllTranslations(), 3);
        return this.translationManager.getAllTranslations();
      }

      // Second, try to auto-initialize TranslationManager with window.diffConfig
      if ((_window$diffConfig2 = window.diffConfig) !== null && _window$diffConfig2 !== void 0 && _window$diffConfig2.translations && BrowserUIManager_typeof(window.diffConfig.translations) === 'object') {
        Debug.log('BrowserUIManager: Auto-initializing TranslationManager from window.diffConfig', window.diffConfig.translations, 3);
        this.translationManager.initialize(window.diffConfig.lang || 'en', window.diffConfig.translations);
        return this.translationManager.getAllTranslations();
      }

      // Fall back to local options if nothing else works
      if ((_this$options2 = this.options) !== null && _this$options2 !== void 0 && _this$options2.translations && BrowserUIManager_typeof(this.options.translations) === 'object') {
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
  }, {
    key: "initialize",
    value: function initialize() {
      var containerSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : constants_Selectors.CONTAINER.WRAPPER;
      Debug.log('BrowserUIManager: Initializing UI components', null, 2);
      this.container = document.querySelector(containerSelector);
      if (!this.container) {
        Debug.error('BrowserUIManager: Container element not found', null, 2);
        return false;
      }

      // Change the order of generation - create diff container first
      this.generateDiffContainer();
      this.generateThemeSwitcher();
      this.generateMergeControls();
      Debug.log('BrowserUIManager: UI components generated', null, 2);
      return true;
    }

    /**
     * Generate theme switcher UI
     */
  }, {
    key: "generateThemeSwitcher",
    value: function generateThemeSwitcher() {
      Debug.log('BrowserUIManager: Generating theme switcher', null, 3);

      // Get the ID without the # prefix for createElement
      var themeSwitcherId = constants_Selectors.THEME.SWITCHER.name();
      var themeLoadingId = constants_Selectors.THEME.LOADING_INDICATOR.name();
      var themeToggleId = constants_Selectors.THEME.TOGGLE.name();

      // Create theme switcher element
      var themeSwitcher = document.createElement('div');
      themeSwitcher.id = themeSwitcherId;
      themeSwitcher.className = "".concat(constants_Selectors.UTILITY.FLEX.name(), " ").concat(constants_Selectors.UTILITY.JUSTIFY_CONTENT_BETWEEN.name(), " ").concat(constants_Selectors.UTILITY.PADDING_2.name());
      themeSwitcher.style.cssText = 'display: none !important; position: relative;';

      // Create theme switcher wrapper
      var switcherWrapper = document.createElement('div');
      switcherWrapper.className = constants_Selectors.THEME_SWITCHER.WRAPPER.name();

      // Get SVG icons for light/dark mode
      var sunIcon = DOMUtils.getIconHtml('sun', {
        classes: constants_Selectors.UTILITY.MARGIN_END_2.name()
      });
      var moonIcon = DOMUtils.getIconHtml('moon', {
        classes: constants_Selectors.UTILITY.MARGIN_START_2.name()
      });

      // Create theme switcher content with toggle
      switcherWrapper.innerHTML = "\n            <span class=\"".concat(constants_Selectors.THEME_SWITCHER.LABEL.name(), " ").concat(constants_Selectors.UTILITY.MARGIN_END_2.name(), "\">").concat(sunIcon, "</span>\n            <label class=\"").concat(constants_Selectors.THEME_SWITCHER.CONTROL.name(), "\" for=\"").concat(themeToggleId, "\">\n                <input type=\"checkbox\" id=\"").concat(themeToggleId, "\" checked>\n                <span class=\"").concat(constants_Selectors.THEME_SWITCHER.SLIDER.name(), " ").concat(constants_Selectors.THEME_SWITCHER.SLIDER_ROUND.name(), "\"></span>\n            </label>\n            <span class=\"").concat(constants_Selectors.THEME_SWITCHER.LABEL.name(), " ").concat(constants_Selectors.UTILITY.MARGIN_START_2.name(), " \">").concat(moonIcon, "</span>\n        ");

      // Append elements to theme switcher
      themeSwitcher.appendChild(switcherWrapper);

      // Create a separate container for the loader outside the theme switcher hierarchy
      var loadingContainer = document.createElement('div');
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
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function () {
          var diffContainer = document.getElementById(constants_Selectors.DIFF.CONTAINER.name());
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
      var containerParent = this.container || document.body;
      observer.observe(containerParent, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ['class']
      });
    }

    /**
     * Generate diff container UI
     */
  }, {
    key: "generateDiffContainer",
    value: function generateDiffContainer() {
      var _this = this;
      Debug.log('BrowserUIManager: Generating diff container', null, 3);

      // Get IDs without the # prefix for createElement
      var diffContainerId = constants_Selectors.DIFF.CONTAINER.name();
      var viewerId = constants_Selectors.DIFF.VIEWER.name();

      // Create diff container
      var diffContainer = document.createElement('div');
      diffContainer.id = diffContainerId;

      // Create viewer element
      var viewerElement = document.createElement('div');
      viewerElement.id = viewerId;
      viewerElement.className = constants_Selectors.UTILITY.MARGIN_TOP_2.name();
      viewerElement.style.display = 'none';

      // Set up a mutation observer to watch for display changes on the viewer element
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'style' && viewerElement.style.display !== 'none') {
            // If viewer becomes visible, show the theme switcher
            if (_this.elements.themeSwitcher) {
              _this.elements.themeSwitcher.style.display = 'flex';
            }
          }
        });
      });

      // Start observing the viewer element for style changes
      observer.observe(viewerElement, {
        attributes: true
      });

      // Append elements to diff container
      diffContainer.appendChild(viewerElement);

      // Append diff container to container
      this.container.appendChild(diffContainer);

      // Store reference and log creation
      this.elements.diffContainer = diffContainer;

      // Verify the element was created
      var createdViewer = document.getElementById(viewerId);
      Debug.log("BrowserUIManager: Viewer element (".concat(viewerId, ") created successfully: ").concat(!!createdViewer), null, 3);
    }

    /**
     * Generate merge controls UI using translations from DiffViewer
     */
  }, {
    key: "generateMergeControls",
    value: function generateMergeControls() {
      Debug.log('BrowserUIManager: Generating merge controls structure only', null, 3);

      // Get translations from options
      var translations = this.getTranslations();

      // Get IDs without the # prefix for createElement
      var previewButtonId = constants_Selectors.MERGE.BUTTON_PREVIEW.name();
      var toggleButtonId = constants_Selectors.MERGE.DESTINATION_TOGGLE.name();
      var toggleIconId = constants_Selectors.MERGE.TOGGLE_ICON.name();
      var toggleTextId = constants_Selectors.MERGE.TOGGLE_TEXT.name();
      var dropdownId = constants_Selectors.MERGE.DESTINATION_DROPDOWN.name();
      var applyButtonId = constants_Selectors.MERGE.BUTTON_APPLY.name();

      // Create merge controls container
      var mergeControls = document.createElement('div');
      mergeControls.className = "".concat(constants_Selectors.MERGE.CONTROLS_ACTIONS.name(), " ").concat(constants_Selectors.UTILITY.FLEX.name(), " ").concat(constants_Selectors.UTILITY.ALIGN_ITEMS_CENTER.name(), " ").concat(constants_Selectors.UTILITY.JUSTIFY_CONTENT_BETWEEN.name(), " ").concat(constants_Selectors.UTILITY.MARGIN_Y_2.name(), " ").concat(constants_Selectors.UTILITY.PADDING_2.name());

      // Create preview button section
      var previewSection = document.createElement('div');
      var previewButton = document.createElement('button');
      previewButton.id = previewButtonId;
      previewButton.className = "".concat(constants_Selectors.UTILITY.BUTTON.name(), " ").concat(constants_Selectors.UTILITY.BUTTON_INFO.name());
      previewButton.type = 'button';
      previewButton.innerHTML = "".concat(DOMUtils.getIconHtml('eye', {
        classes: constants_Selectors.UTILITY.MARGIN_END_2.name()
      })).concat(translations.preview || 'Preview');
      previewSection.appendChild(previewButton);

      // Create merge controls section
      var mergeSection = document.createElement('div');
      mergeSection.className = "".concat(constants_Selectors.UTILITY.FLEX.name(), " ").concat(constants_Selectors.UTILITY.ALIGN_ITEMS_CENTER.name());

      // Create a group for toggle button and dropdown - using input-group styling approach
      var toggleGroup = document.createElement('div');
      toggleGroup.className = "".concat(constants_Selectors.UTILITY.FLEX.name(), " ").concat(constants_Selectors.UTILITY.ALIGN_ITEMS_STRETCH.name(), " ").concat(constants_Selectors.UTILITY.MARGIN_END_3.name());
      // Add class for styling instead of inline style
      toggleGroup.classList.add('vdm-input-group');

      // Create destination toggle button
      var toggleButton = document.createElement('button');
      toggleButton.id = toggleButtonId;
      toggleButton.className = "".concat(constants_Selectors.UTILITY.BUTTON.name(), " ").concat(constants_Selectors.UTILITY.BUTTON_FLAT.name(), " vdm-input-group__prepend");
      toggleButton.type = 'button'; // Explicitly set type to button

      var toggleIcon = document.createElement('span');
      toggleIcon.id = toggleIconId;
      toggleIcon.innerHTML = DOMUtils.getIconHtml('plus-circle', {
        classes: constants_Selectors.UTILITY.MARGIN_END_2.name()
      });
      var toggleText = document.createElement('span');
      toggleText.id = toggleTextId;
      toggleText.setAttribute('title', translations.saveToOriginalTooltip || 'Replace the current file with merged content');
      toggleText.textContent = translations.saveToOriginal || 'Save to original';
      toggleButton.appendChild(toggleIcon);
      toggleButton.appendChild(toggleText);

      // Create empty destination dropdown - IMPORTANT CHANGE: No options added
      var dropdown = document.createElement('select');
      dropdown.id = dropdownId;
      dropdown.className = "".concat(constants_Selectors.UTILITY.FORM_SELECT.name(), " vdm-input-group__append vdm-select-auto-width");
      // No options are added here - This will be handled by MergeUIController

      // Add toggle button and dropdown to the toggle group with no spacing between them
      toggleGroup.appendChild(toggleButton);
      toggleGroup.appendChild(dropdown);

      // Create apply merge button
      var applyButton = document.createElement('button');
      applyButton.id = applyButtonId;
      applyButton.className = "".concat(constants_Selectors.UTILITY.BUTTON.name(), " ").concat(constants_Selectors.UTILITY.BUTTON_PRIMARY.name(), " vdm-nowrap");
      applyButton.type = 'button';
      applyButton.innerHTML = (translations.applyMerge || 'Apply Merge') + " ".concat(DOMUtils.getIconHtml('file-circle-plus', {
        classes: constants_Selectors.UTILITY.MARGIN_START_2.name()
      }));
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
  }, {
    key: "showThemeLoading",
    value: function showThemeLoading() {
      var loadingContainer = this.elements.themeLoadingContainer;
      var themeSwitcher = this.elements.themeSwitcher;
      if (loadingContainer && themeSwitcher) {
        // Get the translated message
        var message = TranslationManager.getInstance().get('loadingTheme', 'Loading theme...');

        // Use proper CSS classes for styling
        loadingContainer.innerHTML = "\n                <div class=\"vdm-theme__loading-spinner\"></div>\n                <span>".concat(message, "</span>\n            ");

        // Add styling for the translucid background and rounded corners
        loadingContainer.className = 'vdm-theme__loading-indicator';

        // Get the position of the theme switcher
        var rect = themeSwitcher.getBoundingClientRect();
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Position the loader just above the theme switcher
        loadingContainer.style.top = rect.top + scrollTop - 40 + 'px';

        // Make the loader visible
        loadingContainer.style.display = 'flex';
      }
    }

    /**
     * Hide theme loading indicator
     */
  }, {
    key: "hideThemeLoading",
    value: function hideThemeLoading() {
      var loadingContainer = this.elements.themeLoadingContainer;
      if (loadingContainer) {
        loadingContainer.style.display = 'none';
      }
    }

    /**
     * Clean up event handlers and resources
     */
  }, {
    key: "destroy",
    value: function destroy() {
      Debug.log('BrowserUIManager: Destroying UI components', null, 2);

      // Hide any active theme loader
      this.hideThemeLoading();

      // Remove generated elements
      if (this.elements.themeSwitcher && this.elements.themeSwitcher.parentNode) {
        this.elements.themeSwitcher.parentNode.removeChild(this.elements.themeSwitcher);
      }
      if (this.elements.diffContainer && this.elements.diffContainer.parentNode) {
        this.elements.diffContainer.parentNode.removeChild(this.elements.diffContainer);
      }
      if (this.elements.mergeControls && this.elements.mergeControls.parentNode) {
        this.elements.mergeControls.parentNode.removeChild(this.elements.mergeControls);
      }

      // Reset references
      this.elements = {
        themeSwitcher: null,
        diffContainer: null,
        mergeControls: null
      };

      // Clear DiffViewer reference
      this.diffViewer = null;
      Debug.log('BrowserUIManager: UI components destroyed', null, 2);
    }
  }]);
}();
;// ./src/file-browser.js
/**
 * File Browser entry point
 * Exports the FileBrowserManager for use in the file browser example
 */




// Export the FileBrowserManager class for direct use


// Also expose to window object for backwards compatibility
if (typeof window !== 'undefined') {
  window.FileBrowserManager = FileBrowserManager;
  window.BrowserUIManager = BrowserUIManager_BrowserUIManager;
}
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=file-browser.js.map