"use strict";
(this["webpackChunkdiff_files"] = this["webpackChunkdiff_files"] || []).push([["diff-viewer-src_components_s"],{

/***/ "./src/components/syntax/CopyButton.js":
/*!*********************************************!*\
  !*** ./src/components/syntax/CopyButton.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CopyButton: () => (/* binding */ CopyButton)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Debug */ "./src/utils/Debug.js");
/* harmony import */ var _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/DOMUtils */ "./src/utils/DOMUtils.js");
/* harmony import */ var _modal_ModalManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modal/ModalManager */ "./src/components/modal/ModalManager.js");
/* harmony import */ var _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/TranslationManager */ "./src/utils/TranslationManager.js");
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../constants/Selectors */ "./src/constants/Selectors.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






/**
 * Adds copy buttons to code blocks in the preview modal
 * This implementation uses a fallback strategy for maximum browser compatibility
 */
var CopyButton = /*#__PURE__*/function () {
  function CopyButton() {
    _classCallCheck(this, CopyButton);
  }
  return _createClass(CopyButton, null, [{
    key: "addCopyButtonsToPreview",
    value:
    /**
     * Initialize copy buttons for code blocks
     * @param {string} containerId - ID of the container element
     * @returns {boolean} Success status
     */
    function addCopyButtonsToPreview() {
      var containerId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants_Selectors__WEBPACK_IMPORTED_MODULE_4__["default"].MODAL.PREVIEW_CONTENT_ID.name();
      // Get instance of TranslationManager
      var translationManager = _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_3__.TranslationManager.getInstance();
      var container = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__.DOMUtils.getElement(containerId);
      if (!container) {
        // Try direct DOM methods too
        var directElement = document.getElementById(containerId);
        var querySelectorElement = document.querySelector('#' + containerId);
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('CopyButton: Alternative container lookup results', {
          getElementById: !!directElement,
          querySelector: !!querySelectorElement
        }, 2);
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn('CopyButton: Preview container not found', null, 2);
        return false;
      }

      // Find all code blocks within the container
      var preElements = container.querySelectorAll('pre');
      if (!preElements || preElements.length === 0) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('CopyButton: No code blocks found in preview', null, 3);
        return false;
      }

      // Add copy button to each pre element
      preElements.forEach(function (pre) {
        // Check if button already exists
        if (pre.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__["default"].COPY.BUTTON)) {
          return;
        }

        // Create copy button
        var button = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__.DOMUtils.createElement('button', null, _constants_Selectors__WEBPACK_IMPORTED_MODULE_4__["default"].COPY.BUTTON.name(), {
          type: 'button',
          title: translationManager.get('copyCode')
        });

        // Add copy button content
        button.innerHTML = "<span class=\"".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__["default"].COPY.ICON.name(), "\"></span><span class=\"").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__["default"].COPY.TEXT.name(), "\">").concat(translationManager.get('copy'), "</span>");

        // Position the button within the pre element
        pre.style.position = 'relative';

        // Find code element and insert button before it
        var codeEl = pre.querySelector('code');
        if (codeEl) {
          pre.insertBefore(button, codeEl);
        } else {
          // Fallback to appending if no code element found
          pre.appendChild(button);
        }

        // Add click event with progressive fallback
        button.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var codeEl = pre.querySelector('code');
          if (!codeEl) return;

          // Store reference to the code element for later use
          // This is important to maintain context during asynchronous operations
          CopyButton._sourceCodeElement = codeEl;

          // Get text content - use most reliable method
          var textToCopy;
          if (codeEl.hasAttribute('data-original-code')) {
            textToCopy = CopyButton._decodeHTMLEntities(codeEl.getAttribute('data-original-code'));
            _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('CopyButton: Using original code from attribute', null, 3);
          } else {
            textToCopy = codeEl.textContent || '';
            textToCopy = textToCopy.replace(/\n\n+/g, '\n');
            _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('CopyButton: Using text content from code element', null, 3);
          }
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('CopyButton: Text length: ' + textToCopy.length, null, 3);

          // Go straight to the most reliable method - manual copy
          // This ensures consistent behavior across all browsers
          CopyButton._showManualCopyModal(textToCopy);

          // Show visual feedback that copy operation was initiated
          CopyButton._showProcessingState(button);
        });
      });
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("CopyButton: Added copy buttons to ".concat(preElements.length, " code blocks"), null, 2);
      return true;
    }

    /**
     * Show processing state on button
     * @param {HTMLElement} button - Button element to update
     * @private
     */
  }, {
    key: "_showProcessingState",
    value: function _showProcessingState(button) {
      button.classList.add(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__["default"].COPY.PROCESSING.name());
      var textSpan = button.querySelector(".".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__["default"].COPY.TEXT.name()));
      if (textSpan) {
        textSpan.textContent = 'Open Copy Dialog...';
      }
      setTimeout(function () {
        button.classList.remove(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__["default"].COPY.PROCESSING.name());
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
  }, {
    key: "_showCopiedState",
    value: function _showCopiedState(button) {
      button.classList.add(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__["default"].COPY.COPIED.name());
      var textSpan = button.querySelector(".".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__["default"].COPY.TEXT.name()));
      if (textSpan) {
        textSpan.textContent = 'Copied!';
      }
      setTimeout(function () {
        button.classList.remove(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__["default"].COPY.COPIED.name());
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
  }, {
    key: "_showManualCopyModal",
    value: function _showManualCopyModal(text) {
      // Get singleton instance of ModalManager
      var modalManager = _modal_ModalManager__WEBPACK_IMPORTED_MODULE_2__.ModalManager.getInstance();

      // Create the copy modal and get its ID
      var modalId = modalManager.createCopyModal(text);

      // Open the modal
      modalManager.open(modalId);
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('CopyButton: Showing manual copy modal', null, 2);
    }

    /**
     * Show copy failure on button
     * @param {HTMLElement} button - Button element to update
     * @private
     */
  }, {
    key: "_showCopyFailure",
    value: function _showCopyFailure(button) {
      button.innerHTML = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__.DOMUtils.getIconHtml('exclamation-triangle', {
        classes: _constants_Selectors__WEBPACK_IMPORTED_MODULE_4__["default"].UTILITY.MARGIN_END_2.name()
      }) + 'Copy Failed';
      button.classList.remove(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__["default"].UTILITY.BUTTON_PRIMARY.name(), _constants_Selectors__WEBPACK_IMPORTED_MODULE_4__["default"].UTILITY.BUTTON_SUCCESS.name());
      button.classList.add(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__["default"].UTILITY.BUTTON_DANGER.name());
      setTimeout(function () {
        button.innerHTML = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__.DOMUtils.getIconHtml('copy', {
          classes: _constants_Selectors__WEBPACK_IMPORTED_MODULE_4__["default"].UTILITY.MARGIN_END_2.name()
        }) + 'Try Again';
        button.classList.remove(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__["default"].UTILITY.BUTTON_DANGER.name());
        button.classList.add(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__["default"].UTILITY.BUTTON_PRIMARY.name());
      }, 2000);
    }

    /**
     * Decode HTML entities in a string
     * @param {string} html - String with HTML entities
     * @returns {string} Decoded string
     * @private
     */
  }, {
    key: "_decodeHTMLEntities",
    value: function _decodeHTMLEntities(html) {
      if (!html) return '';
      var textarea = document.createElement('textarea');
      textarea.innerHTML = html;
      return textarea.value;
    }
  }]);
}();

/***/ }),

/***/ "./src/components/viewer/BrowserUIManager.js":
/*!***************************************************!*\
  !*** ./src/components/viewer/BrowserUIManager.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BrowserUIManager: () => (/* binding */ BrowserUIManager)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Debug */ "./src/utils/Debug.js");
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants/Selectors */ "./src/constants/Selectors.js");
/* harmony import */ var _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/DOMUtils */ "./src/utils/DOMUtils.js");
/* harmony import */ var _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/TranslationManager */ "./src/utils/TranslationManager.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





/**
 * Manages browser UI generation for file-browser.php
 * This component handles the dynamic generation of UI elements that were previously
 * hardcoded in the PHP file, ensuring proper use of selectors and translations.
 */
var BrowserUIManager = /*#__PURE__*/function () {
  /**
   * @param {DiffViewer|Object} diffViewer - Parent diff viewer instance or options object
   */
  function BrowserUIManager(diffViewer) {
    var _window$diffConfig, _this$options;
    _classCallCheck(this, BrowserUIManager);
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
    this.translationManager = _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_3__.TranslationManager.getInstance();

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
    _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("BrowserUIManager: Created with \"".concat(lang, "\" translations from ").concat(translationsSource), this.translationManager.getAllTranslations(), 2);
  }

  /**
   * Set the DiffViewer instance
   * @param {DiffViewer} diffViewer - The DiffViewer instance
   */
  return _createClass(BrowserUIManager, [{
    key: "setDiffViewer",
    value: function setDiffViewer(diffViewer) {
      if (diffViewer && diffViewer.options) {
        this.diffViewer = diffViewer;
        this.options = diffViewer.options;
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('BrowserUIManager: Updated DiffViewer reference', null, 3);
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
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('BrowserUIManager: Using translations from TranslationManager', this.translationManager.getAllTranslations(), 3);
        return this.translationManager.getAllTranslations();
      }

      // Second, try to auto-initialize TranslationManager with window.diffConfig
      if ((_window$diffConfig2 = window.diffConfig) !== null && _window$diffConfig2 !== void 0 && _window$diffConfig2.translations && _typeof(window.diffConfig.translations) === 'object') {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('BrowserUIManager: Auto-initializing TranslationManager from window.diffConfig', window.diffConfig.translations, 3);
        this.translationManager.initialize(window.diffConfig.lang || 'en', window.diffConfig.translations);
        return this.translationManager.getAllTranslations();
      }

      // Fall back to local options if nothing else works
      if ((_this$options2 = this.options) !== null && _this$options2 !== void 0 && _this$options2.translations && _typeof(this.options.translations) === 'object') {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('BrowserUIManager: Using translations from local options', this.options.translations, 3);
        return this.options.translations;
      }
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('BrowserUIManager: No translations found, using empty object', null, 3);
      return {};
    }

    /**
     * Initialize UI components
     * @param {string} containerSelector - Container element selector
     */
  }, {
    key: "initialize",
    value: function initialize() {
      var containerSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].CONTAINER.WRAPPER;
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('BrowserUIManager: Initializing UI components', null, 2);
      this.container = document.querySelector(containerSelector);
      if (!this.container) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('BrowserUIManager: Container element not found', null, 2);
        return false;
      }

      // Change the order of generation - create diff container first
      this.generateDiffContainer();
      this.generateThemeSwitcher();
      this.generateMergeControls();
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('BrowserUIManager: UI components generated', null, 2);
      return true;
    }

    /**
     * Generate theme switcher UI
     */
  }, {
    key: "generateThemeSwitcher",
    value: function generateThemeSwitcher() {
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('BrowserUIManager: Generating theme switcher', null, 3);

      // Get the ID without the # prefix for createElement
      var themeSwitcherId = _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].THEME.SWITCHER.name();
      var themeLoadingId = _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].THEME.LOADING_INDICATOR.name();
      var themeToggleId = _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].THEME.TOGGLE.name();

      // Create theme switcher element
      var themeSwitcher = document.createElement('div');
      themeSwitcher.id = themeSwitcherId;
      themeSwitcher.className = "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.FLEX.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.JUSTIFY_CONTENT_BETWEEN.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.PADDING_2.name());
      themeSwitcher.style.cssText = 'display: none !important; position: relative;';

      // Create theme switcher wrapper
      var switcherWrapper = document.createElement('div');
      switcherWrapper.className = _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].THEME_SWITCHER.WRAPPER.name();

      // Get SVG icons for light/dark mode
      var sunIcon = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__.DOMUtils.getIconHtml('sun', {
        classes: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.MARGIN_END_2.name()
      });
      var moonIcon = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__.DOMUtils.getIconHtml('moon', {
        classes: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.MARGIN_START_2.name()
      });

      // Create theme switcher content with toggle
      switcherWrapper.innerHTML = "\n            <span class=\"".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].THEME_SWITCHER.LABEL.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.MARGIN_END_2.name(), "\">").concat(sunIcon, "</span>\n            <label class=\"").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].THEME_SWITCHER.CONTROL.name(), "\" for=\"").concat(themeToggleId, "\">\n                <input type=\"checkbox\" id=\"").concat(themeToggleId, "\" checked>\n                <span class=\"").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].THEME_SWITCHER.SLIDER.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].THEME_SWITCHER.SLIDER_ROUND.name(), "\"></span>\n            </label>\n            <span class=\"").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].THEME_SWITCHER.LABEL.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.MARGIN_START_2.name(), " \">").concat(moonIcon, "</span>\n        ");

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
          var diffContainer = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].DIFF.CONTAINER.name());
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
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('BrowserUIManager: Generating diff container', null, 3);

      // Get IDs without the # prefix for createElement
      var diffContainerId = _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].DIFF.CONTAINER.name();
      var viewerId = _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].DIFF.VIEWER.name();

      // Create diff container
      var diffContainer = document.createElement('div');
      diffContainer.id = diffContainerId;

      // Create viewer element
      var viewerElement = document.createElement('div');
      viewerElement.id = viewerId;
      viewerElement.className = _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.MARGIN_TOP_2.name();
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
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("BrowserUIManager: Viewer element (".concat(viewerId, ") created successfully: ").concat(!!createdViewer), null, 3);
    }

    /**
     * Generate merge controls UI using translations from DiffViewer
     */
  }, {
    key: "generateMergeControls",
    value: function generateMergeControls() {
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('BrowserUIManager: Generating merge controls structure only', null, 3);

      // Get translations from options
      var translations = this.getTranslations();

      // Get IDs without the # prefix for createElement
      var previewButtonId = _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].MERGE.BUTTON_PREVIEW.name();
      var toggleButtonId = _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].MERGE.DESTINATION_TOGGLE.name();
      var toggleIconId = _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].MERGE.TOGGLE_ICON.name();
      var toggleTextId = _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].MERGE.TOGGLE_TEXT.name();
      var dropdownId = _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].MERGE.DESTINATION_DROPDOWN.name();
      var applyButtonId = _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].MERGE.BUTTON_APPLY.name();

      // Create merge controls container
      var mergeControls = document.createElement('div');
      mergeControls.className = "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].MERGE.CONTROLS_ACTIONS.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.FLEX.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.ALIGN_ITEMS_CENTER.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.JUSTIFY_CONTENT_BETWEEN.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.MARGIN_Y_2.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.PADDING_2.name());

      // Create preview button section
      var previewSection = document.createElement('div');
      var previewButton = document.createElement('button');
      previewButton.id = previewButtonId;
      previewButton.className = "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.BUTTON.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.BUTTON_INFO.name());
      previewButton.type = 'button';
      previewButton.innerHTML = "".concat(_utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__.DOMUtils.getIconHtml('eye', {
        classes: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.MARGIN_END_2.name()
      })).concat(translations.preview || 'Preview');
      previewSection.appendChild(previewButton);

      // Create merge controls section
      var mergeSection = document.createElement('div');
      mergeSection.className = "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.FLEX.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.ALIGN_ITEMS_CENTER.name());

      // Create a group for toggle button and dropdown - using input-group styling approach
      var toggleGroup = document.createElement('div');
      toggleGroup.className = "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.FLEX.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.ALIGN_ITEMS_STRETCH.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.MARGIN_END_3.name());
      // Add class for styling instead of inline style
      toggleGroup.classList.add('vdm-input-group');

      // Create destination toggle button
      var toggleButton = document.createElement('button');
      toggleButton.id = toggleButtonId;
      toggleButton.className = "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.BUTTON.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.BUTTON_FLAT.name(), " vdm-input-group__prepend");
      toggleButton.type = 'button'; // Explicitly set type to button

      var toggleIcon = document.createElement('span');
      toggleIcon.id = toggleIconId;
      toggleIcon.innerHTML = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__.DOMUtils.getIconHtml('plus-circle', {
        classes: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.MARGIN_END_2.name()
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
      dropdown.className = "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.FORM_SELECT.name(), " vdm-input-group__append vdm-select-auto-width");
      // No options are added here - This will be handled by MergeUIController

      // Add toggle button and dropdown to the toggle group with no spacing between them
      toggleGroup.appendChild(toggleButton);
      toggleGroup.appendChild(dropdown);

      // Create apply merge button
      var applyButton = document.createElement('button');
      applyButton.id = applyButtonId;
      applyButton.className = "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.BUTTON.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.BUTTON_PRIMARY.name(), " vdm-nowrap");
      applyButton.type = 'button';
      applyButton.innerHTML = (translations.applyMerge || 'Apply Merge') + " ".concat(_utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__.DOMUtils.getIconHtml('file-circle-plus', {
        classes: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.MARGIN_START_2.name()
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
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('BrowserUIManager: Created empty merge controls structure (options will be populated by MergeUIController)', null, 2);
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
        var message = _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_3__.TranslationManager.getInstance().get('loadingTheme', 'Loading theme...');

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
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('BrowserUIManager: Destroying UI components', null, 2);

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
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('BrowserUIManager: UI components destroyed', null, 2);
    }
  }]);
}();

/***/ }),

/***/ "./src/components/viewer/IconMarkerManager.js":
/*!****************************************************!*\
  !*** ./src/components/viewer/IconMarkerManager.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconMarkerManager: () => (/* binding */ IconMarkerManager)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Debug */ "./src/utils/Debug.js");
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants/Selectors */ "./src/constants/Selectors.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/**
 * Manages icon marker creation and positioning
 */
var IconMarkerManager = /*#__PURE__*/function () {
  /**
   * @param {DiffViewer} diffViewer - Parent diff viewer
   */
  function IconMarkerManager(diffViewer) {
    _classCallCheck(this, IconMarkerManager);
    this.diffViewer = diffViewer;
  }

  /**
   * Initialize icon markers with proper scroll synchronization
   */
  return _createClass(IconMarkerManager, [{
    key: "initializeIconMarkers",
    value: function initializeIconMarkers() {
      var _this = this;
      // Measure actual cell height for accurate positioning
      var cellHeight = this._calculateCellHeight();
      document.documentElement.style.setProperty('--cell-height', "".concat(cellHeight, "px"));

      // Process each diff pane
      var panes = this.diffViewer.container.querySelectorAll(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].DIFF.PANE);
      panes.forEach(function (pane) {
        _this._setupIconColumn(pane);
      });

      // Use a dedicated method to handle all height updates
      this._updateIconColumnHeights();

      // Set up future height updates for window resizing
      this._setupIconHeightUpdater();
    }

    /**
     * Set up icon column for a pane
     * @private
     */
  }, {
    key: "_setupIconColumn",
    value: function _setupIconColumn(pane) {
      var _this2 = this;
      // Get the content container (scrollable area)
      var content = pane.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].DIFF.PANE_CONTENT);
      if (!content) return;

      // Get code table wrapper to match height
      var codeTableWrapper = content.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].DIFF.TABLE_WRAPPER);
      if (!codeTableWrapper) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn('IconMarkerManager: Code table wrapper not found', null, 2);
        return;
      }

      // Create or get icon column
      var iconColumn = pane.querySelector(":scope > ".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].ICONS.COLUMN));
      if (!iconColumn) {
        iconColumn = document.createElement('div');
        iconColumn.className = _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].ICONS.COLUMN.name();
        pane.appendChild(iconColumn);
      }

      // Get all cells with chunk IDs
      var chunkCells = content.querySelectorAll("".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].DIFF.LINE_CONTENT, "[data-chunk-id]:not([data-chunk-id=\"\"]), ") + "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].DIFF.LINE_PLACEHOLDER, "[data-chunk-id]:not([data-chunk-id=\"\"]), ") + "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].DIFF.LINE_CONTENT_EMPTY, "[data-chunk-id]:not([data-chunk-id=\"\"])"));

      // Organize cells by chunk ID
      var chunkGroups = {};
      chunkCells.forEach(function (cell) {
        var chunkId = cell.dataset.chunkId;
        if (!chunkGroups[chunkId]) {
          chunkGroups[chunkId] = [];
        }
        chunkGroups[chunkId].push(cell);
      });

      // Process only the first cell of each chunk
      Object.keys(chunkGroups).forEach(function (chunkId) {
        // Sort by line number
        chunkGroups[chunkId].sort(function (a, b) {
          var aLineNum = parseInt(a.dataset.lineId.split('-').pop(), 10);
          var bLineNum = parseInt(b.dataset.lineId.split('-').pop(), 10);
          return aLineNum - bLineNum;
        });

        // Get the first cell in the sorted group
        var firstCell = chunkGroups[chunkId][0];
        if (firstCell) {
          _this2._createIconMarker(firstCell, iconColumn);
        }
      });

      // Store table height for later use
      if (codeTableWrapper) {
        var tableHeight = codeTableWrapper.scrollHeight;
        pane.dataset.tableHeight = tableHeight;
      }

      // Set up scroll synchronization
      content.addEventListener('scroll', function () {
        // Sync vertical scroll position with requestAnimationFrame
        requestAnimationFrame(function () {
          iconColumn.style.transform = "translateY(-".concat(content.scrollTop, "px)");
        });

        // Handle horizontal scroll state
        if (content.scrollLeft > 0) {
          pane.classList.add(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].STATUS.SCROLLED.name());
        } else {
          pane.classList.remove(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].STATUS.SCROLLED.name());
        }
      }, {
        passive: true
      });

      // Initial position
      iconColumn.style.transform = "translateY(-".concat(content.scrollTop, "px)");
    }

    /**
     * Create a single icon marker for a cell
     * @private
     */
  }, {
    key: "_createIconMarker",
    value: function _createIconMarker(cell, iconColumn) {
      var lineId = cell.dataset.lineId;
      if (!lineId) return;

      // Check if marker already exists
      var marker = iconColumn.querySelector("".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].ICONS.MARKER, "[data-line-id=\"").concat(lineId, "\"]"));

      // Create new marker only if it doesn't exist
      if (!marker) {
        marker = document.createElement('div');
        marker.className = _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].ICONS.MARKER.name();

        // Add class for placeholder lines
        if (cell.classList.contains(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].DIFF.LINE_PLACEHOLDER.name())) {
          marker.classList.add(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].ICONS.MARKER_PLACEHOLDER.name());
        }

        // Use line ID for matching
        marker.dataset.lineId = lineId;

        // Set position index
        var lineNumber = lineId.split('-').pop();
        marker.dataset.iconIndex = lineNumber;
        marker.style.setProperty('--icon-index', lineNumber);

        // DO NOT transfer selection state classes - they will be managed by ChunkVisualStateManager
        // Selection state and placeholder status are orthogonal concepts and should be managed separately

        // Add to icon column
        iconColumn.appendChild(marker);
      }
    }

    /**
     * Calculate cell height with maximum precision
     * @private
     * @returns {number} Precise cell height in pixels
     */
  }, {
    key: "_calculateCellHeight",
    value: function _calculateCellHeight() {
      // Get multiple line number cells for better accuracy
      var lineNumberCells = this.diffViewer.container.querySelectorAll(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].CODE.LINE_NUMBER);
      if (!lineNumberCells || lineNumberCells.length === 0) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('IconMarkerManager: No line number cells found, using default height', null, 2);
        return 20.5; // Fallback height
      }

      // Take the median height from first few cells (more reliable than just the first)
      var heights = [];
      var sampleSize = Math.min(5, lineNumberCells.length);
      for (var i = 0; i < sampleSize; i++) {
        heights.push(lineNumberCells[i].getBoundingClientRect().height);
      }

      // Sort heights and take the median (middle) value
      heights.sort(function (a, b) {
        return a - b;
      });
      var medianHeight = heights[Math.floor(heights.length / 2)];
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("IconMarkerManager: Sampled heights: ".concat(heights.join(', '), ", using median: ").concat(medianHeight, "px"), null, 3);
      return medianHeight;
    }

    /**
     * Set up height updater for window resizing
     * @private
     */
  }, {
    key: "_setupIconHeightUpdater",
    value: function _setupIconHeightUpdater() {
      var _this3 = this;
      // Debounce to avoid excessive updates
      var resizeTimer;

      // Add window resize listener
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          _this3._updateIconColumnHeights();
        }, 100);
      });

      // Initial update
      this._updateIconColumnHeights();
    }

    /**
     * Update all icon column heights
     * @private
     */
  }, {
    key: "_updateIconColumnHeights",
    value: function _updateIconColumnHeights() {
      var panes = this.diffViewer.container.querySelectorAll(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].DIFF.PANE);
      var heights = {}; // Track heights for logging

      panes.forEach(function (pane) {
        var content = pane.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].DIFF.PANE_CONTENT);
        var iconColumn = pane.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].ICONS.COLUMN);
        var codeTableWrapper = content === null || content === void 0 ? void 0 : content.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].DIFF.TABLE_WRAPPER);
        if (iconColumn && codeTableWrapper) {
          var tableHeight = codeTableWrapper.scrollHeight;
          var currentHeight = parseInt(iconColumn.style.height) || 0;

          // Only update if height changed significantly
          if (Math.abs(currentHeight - tableHeight) > 5) {
            iconColumn.style.height = "".concat(tableHeight, "px");
            heights[pane.dataset.side || 'pane'] = tableHeight;
          }
        }
      });

      // Log all height updates in one message
      if (Object.keys(heights).length > 0) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('IconMarkerManager: Updated icon column heights:', heights, 3);
      }
    }
  }]);
}();

/***/ }),

/***/ "./src/components/viewer/LayoutManager.js":
/*!************************************************!*\
  !*** ./src/components/viewer/LayoutManager.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LayoutManager: () => (/* binding */ LayoutManager)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Debug */ "./src/utils/Debug.js");
/* harmony import */ var _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/DOMUtils */ "./src/utils/DOMUtils.js");
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants/Selectors */ "./src/constants/Selectors.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


 // Add this import

/**
 * Manages layout dimensions and responsive behavior
 */
var LayoutManager = /*#__PURE__*/function () {
  /**
   * @param {DiffViewer} diffViewer - Parent diff viewer
   */
  function LayoutManager(diffViewer) {
    _classCallCheck(this, LayoutManager);
    this.diffViewer = diffViewer;
    this.paneWidth = 0;
  }

  /**
   * Initialize layout manager
   */
  return _createClass(LayoutManager, [{
    key: "initialize",
    value: function initialize() {
      var _this = this;
      // Initial pane width update
      this.updatePaneWidth();

      // Listen for window resize
      window.addEventListener('resize', function () {
        _this.updatePaneWidth();
      });

      // Set up mutation observer for content changes
      this.setupWidthObserver();
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('LayoutManager: Initialized', null, 2);
    }

    /**
     * Update pane width and CSS variables
     */
  }, {
    key: "updatePaneWidth",
    value: function updatePaneWidth() {
      // Use DOMUtils.getElements for consistent element selection
      var panes = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__.DOMUtils.getElements(_constants_Selectors__WEBPACK_IMPORTED_MODULE_2__["default"].DIFF.PANE, this.diffViewer.container);
      if (!panes || panes.length === 0) return;
      var pane = panes[0];
      var newWidth = pane.clientWidth;
      if (newWidth !== this.paneWidth) {
        this.paneWidth = newWidth;

        // Instead of direct DOM manipulation, use a helper method to set CSS variables
        this.setCSSVariable('--diff-pane-width', "".concat(this.paneWidth, "px"));
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("LayoutManager: Updated pane width: ".concat(this.paneWidth, "px"), null, 3);
      }
    }

    /**
     * Set CSS variable consistently
     * @param {string} name - Variable name
     * @param {string} value - Variable value
     */
  }, {
    key: "setCSSVariable",
    value: function setCSSVariable(name, value) {
      document.documentElement.style.setProperty(name, value);
    }

    /**
     * Set up observer for content changes affecting width
     */
  }, {
    key: "setupWidthObserver",
    value: function setupWidthObserver() {
      var _this2 = this;
      // Create mutation observer
      var observer = new MutationObserver(function (mutations) {
        var shouldUpdate = false;
        var _iterator = _createForOfIteratorHelper(mutations),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var mutation = _step.value;
            if (mutation.type === 'childList' || mutation.type === 'attributes' && (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
              shouldUpdate = true;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (shouldUpdate) {
          _this2.updatePaneWidth();
        }
      });

      // Start observing the container
      observer.observe(this.diffViewer.container, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });

      // Store for potential cleanup
      this.observer = observer;
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('LayoutManager: Width observer setup complete', null, 2);
    }

    /**
     * Clean up event handlers and observers
     */
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('LayoutManager: Destroyed', null, 2);
    }
  }]);
}();

/***/ }),

/***/ "./src/components/viewer/ScrollSynchronizer.js":
/*!*****************************************************!*\
  !*** ./src/components/viewer/ScrollSynchronizer.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScrollSynchronizer: () => (/* binding */ ScrollSynchronizer)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Debug */ "./src/utils/Debug.js");
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants/Selectors */ "./src/constants/Selectors.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/**
 * Handles scroll synchronization between panes
 */
var ScrollSynchronizer = /*#__PURE__*/function () {
  /**
   * @param {DiffViewer} diffViewer - Parent diff viewer
   */
  function ScrollSynchronizer(diffViewer) {
    _classCallCheck(this, ScrollSynchronizer);
    this.diffViewer = diffViewer;
    this.isSyncing = false;
  }

  /**
   * Set up synchronized scrolling between panes
   */
  return _createClass(ScrollSynchronizer, [{
    key: "setupSynchronizedScrolling",
    value: function setupSynchronizedScrolling() {
      var _this = this;
      // Find panes
      var panes = this.diffViewer.container.querySelectorAll(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].DIFF.PANE);
      if (panes.length !== 2) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ScrollSynchronizer: Could not find both diff panes. Found: ".concat(panes.length), null, 2);
        return;
      }
      var leftPane = panes[0];
      var rightPane = panes[1];

      // Get content elements
      var leftContent = leftPane.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].DIFF.PANE_CONTENT);
      var rightContent = rightPane.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].DIFF.PANE_CONTENT);
      if (!leftContent || !rightContent) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ScrollSynchronizer: Could not find all required scrolling elements', null, 2);
        return;
      }

      // Store references
      this.leftContent = leftContent;
      this.rightContent = rightContent;

      // Sync both vertical AND horizontal scrolling between panes
      leftContent.addEventListener('scroll', function () {
        return _this._handleScroll(leftContent, rightContent);
      }, {
        passive: true
      });
      rightContent.addEventListener('scroll', function () {
        return _this._handleScroll(rightContent, leftContent);
      }, {
        passive: true
      });

      // Listen for window resize
      window.addEventListener('resize', function () {
        _this._updateScrollState(leftContent);
        _this._updateScrollState(rightContent);
      });
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ScrollSynchronizer: Horizontal and vertical scroll synchronization set up', null, 2);
    }

    /**
     * Handle scroll events
     * @private
     */
  }, {
    key: "_handleScroll",
    value: function _handleScroll(sourceElement, targetElement) {
      var _this2 = this;
      // Only update if not already syncing to avoid loops
      if (!this.isSyncing) {
        this.isSyncing = true;

        // Sync vertical scrolling (top position)
        targetElement.scrollTop = sourceElement.scrollTop;

        // IMPORTANT: Also sync horizontal scrolling
        targetElement.scrollLeft = sourceElement.scrollLeft;
        this._updateScrollState(sourceElement);

        // Reset syncing flag after a short delay
        setTimeout(function () {
          _this2.isSyncing = false;
        }, 10);
      }
    }

    /**
     * Update CSS class based on scroll state
     * @private
     */
  }, {
    key: "_updateScrollState",
    value: function _updateScrollState(contentElement) {
      var wasScrolled = contentElement.classList.contains(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].STATUS.SCROLLED.name());
      var isScrolled = contentElement.scrollLeft > 0;

      // Only update if the state changed
      if (wasScrolled !== isScrolled) {
        if (isScrolled) {
          contentElement.classList.add(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].STATUS.SCROLLED.name());
        } else {
          contentElement.classList.remove(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].STATUS.SCROLLED.name());
        }
      }
    }
  }]);
}();

/***/ })

}]);
//# sourceMappingURL=diff-viewer-src_components_s.js.map