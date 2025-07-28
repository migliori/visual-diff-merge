"use strict";
(this["webpackChunkdiff_files"] = this["webpackChunkdiff_files"] || []).push([[349],{

/***/ 0:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ MergePreviewManager)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(979);
/* harmony import */ var _utils_MergeContentFormatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(533);
/* harmony import */ var _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(759);
/* harmony import */ var _utils_StringUtils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(594);
/* harmony import */ var _syntax_CopyButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(566);
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(762);
/* harmony import */ var _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(428);
/* harmony import */ var _utils_LoaderManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(102);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }









/**
 * Handles preview functionality for merges
 */
var MergePreviewManager = /*#__PURE__*/function () {
  /**
   * Initialize preview manager
   * @param {MergeHandler} mergeHandler - Parent merge handler
   */
  function MergePreviewManager(mergeHandler) {
    _classCallCheck(this, MergePreviewManager);
    this.mergeHandler = mergeHandler;
    this.diffViewer = mergeHandler.diffViewer;
    this.modalManager = mergeHandler.modalManager;
  }

  /**
   * Initialize preview button and events
   * Sets up the preview button click handler
   */
  return _createClass(MergePreviewManager, [{
    key: "initialize",
    value: function initialize() {
      // Set up the preview button event handler
      this.setupPreviewButton();
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergePreviewManager: Initialized', null, 2);
    }

    /**
     * Set up the preview button with event handler
     * Recreates button to remove existing handlers
     */
  }, {
    key: "setupPreviewButton",
    value: function setupPreviewButton() {
      // Try to find the standard preview button first
      var previewButton = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.MERGE.BUTTON_PREVIEW.name());

      // If not found, check for the "Get merged result" button (used in local-only mode)
      var getMergedResultButton = !previewButton ? document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.MERGE.GET_MERGED_RESULT_BTN.name()) : null;

      // Use whichever button is available
      var buttonToUse = previewButton || getMergedResultButton;
      if (!buttonToUse) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.warn('MergePreviewManager: Preview button not found', null, 2);
        return;
      }

      // Remove any existing handlers by cloning
      var newBtn = buttonToUse.cloneNode(true);
      if (buttonToUse.parentNode) {
        buttonToUse.parentNode.replaceChild(newBtn, buttonToUse);
      }

      // Add the icon and text if needed (only for the regular preview button)
      if (buttonToUse === previewButton && (!newBtn.innerHTML || newBtn.innerHTML.trim() === '')) {
        newBtn.innerHTML = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__/* .DOMUtils */ .e.getIconHtml('eye', {
          classes: 'me-2'
        }) + 'Preview';
      }

      // Add handler
      newBtn.addEventListener('click', this.handlePreviewClick.bind(this));
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("MergePreviewManager: ".concat(buttonToUse === previewButton ? 'Preview' : 'Get merged result', " button handler set up"), null, 3);
    }

    /**
     * Handle preview button click
     * Generates preview content and shows in modal
     */
  }, {
    key: "handlePreviewClick",
    value: function handlePreviewClick() {
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergePreviewManager: Preview button clicked', null, 2);

      // Get translation manager for loading message
      var translationManager = _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_5__/* .TranslationManager */ .n.getInstance();
      var loadingMessage = translationManager.get('loadingContent', 'Generating preview...');

      // Show loading indicator
      var loaderManager = _utils_LoaderManager__WEBPACK_IMPORTED_MODULE_6__/* .LoaderManager */ .D.getInstance();
      var loaderId = loaderManager.showLoader(loadingMessage, {
        fullscreen: true,
        zIndex: 1000 // Ensure it appears above other UI elements
      });
      try {
        var _this$diffViewer$runt;
        // Get the merged content from the content generator
        var mergedContent = this.mergeHandler.getMergedContent();

        // Get file extension from runtime properties instead of options
        var fileToMerge = ((_this$diffViewer$runt = this.diffViewer.runtimeProps) === null || _this$diffViewer$runt === void 0 ? void 0 : _this$diffViewer$runt.filepath) || '';
        var extension = fileToMerge.split('.').pop().toLowerCase();

        // Format the content for preview with line numbers
        var formattedContent = _utils_MergeContentFormatter__WEBPACK_IMPORTED_MODULE_1__/* .MergeContentFormatter */ .G.formatPreview(mergedContent, extension, true);

        // Hide loading indicator now that content is ready
        loaderManager.hideLoader(loaderId);

        // Set the filename in the preview modal title using DOMUtils
        _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__/* .DOMUtils */ .e.setContent(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.MODAL.PREVIEW_FILENAME.name(), this.diffViewer.runtimeProps.filepath || 'merged-file');

        // Use ModalManager to set content and open modal
        this.modalManager.setContent(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.MODAL.PREVIEW.name(), formattedContent, _constants_Selectors__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.MODAL.PREVIEW_CONTENT_ID.name());

        // Create controls container
        var controlsContainer = document.createElement('div');
        controlsContainer.classList.add(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.UTILITY.FLEX.name(), _constants_Selectors__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.UTILITY.JUSTIFY_CONTENT_BETWEEN.name(), _constants_Selectors__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.UTILITY.MARGIN_TOP_2.name(), _constants_Selectors__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.UTILITY.PADDING_2.name());

        // Create message area
        var messageArea = document.createElement('div');
        messageArea.id = 'merge-preview-message';
        messageArea.classList.add(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.UTILITY.FLEX.name(), _constants_Selectors__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.UTILITY.ALIGN_ITEMS_CENTER.name());
        controlsContainer.appendChild(messageArea);

        // Open the modal
        this.modalManager.open(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.MODAL.PREVIEW.name());

        // Apply syntax highlighting if available
        this.applySyntaxHighlighting();

        // Add copy buttons to code blocks
        _syntax_CopyButton__WEBPACK_IMPORTED_MODULE_3__/* .CopyButton */ .i.addCopyButtonsToPreview(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.MODAL.PREVIEW_CONTENT_ID.name());
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergePreviewManager: Preview opened successfully', null, 2);
      } catch (error) {
        // Hide loading indicator in case of error
        loaderManager.hideLoader(loaderId);
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error('MergePreviewManager: Error during preview:', error, 2);
        this.showPreviewError(error);
      }
    }

    /**
     * Apply syntax highlighting to preview content
     * Uses highlight.js if available
     */
  }, {
    key: "applySyntaxHighlighting",
    value: function applySyntaxHighlighting() {
      if (!window.hljs) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergePreviewManager: Highlight.js not available', null, 3);
        return;
      }
      try {
        var _DOMUtils$getElement;
        // Use DOMUtils to get the preview element
        var preElement = (_DOMUtils$getElement = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__/* .DOMUtils */ .e.getElement(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.MODAL.PREVIEW_CONTENT_ID.name())) === null || _DOMUtils$getElement === void 0 ? void 0 : _DOMUtils$getElement.querySelector('pre');
        var codeElement = preElement === null || preElement === void 0 ? void 0 : preElement.querySelector('code');
        if (!codeElement) {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.warn('MergePreviewManager: No code element found for highlighting', null, 2);
          return;
        }

        // Apply syntax highlighting
        window.hljs.highlightElement(codeElement);

        // Add line numbers if the pre element has the data-line-numbers attribute
        if (preElement.getAttribute('data-line-numbers') === 'true' && window.hljs.lineNumbersBlock) {
          window.hljs.lineNumbersBlock(codeElement);
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergePreviewManager: Line numbers added to preview', null, 3);
        }
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergePreviewManager: Syntax highlighting applied', null, 3);
      } catch (error) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.warn('MergePreviewManager: Error applying syntax highlighting:', error, 2);
      }
    }

    /**
     * Show error in preview modal
     * @param {Error} error - Error object
     */
  }, {
    key: "showPreviewError",
    value: function showPreviewError(error) {
      var errorMessage = error instanceof Error ? error.message : String(error);
      var escapedError = _utils_StringUtils__WEBPACK_IMPORTED_MODULE_7__/* .StringUtils */ .$.escapeHtml(errorMessage);

      // First clear the modal content
      this.modalManager.setContent(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.MODAL.PREVIEW.name(), '', _constants_Selectors__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.MODAL.PREVIEW_CONTENT_ID.name());

      // Then use DOMUtils to show the message
      _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__/* .DOMUtils */ .e.showMessage(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.MODAL.PREVIEW_CONTENT_ID.name(), "<h4>Error Generating Preview</h4><p>".concat(escapedError, "</p>"), 'danger', {
        className: ''
      } // No margin in modal
      );
      this.modalManager.open(_constants_Selectors__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.MODAL.PREVIEW.name());
    }
  }]);
}();

/***/ }),

/***/ 146:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ ConflictNavigator)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(979);
/* harmony import */ var _utils_NavigationUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(343);
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(762);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
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
 * Handles navigation between conflicts
 */
var ConflictNavigator = /*#__PURE__*/function () {
  /**
   * @param {DiffNavigator} navigator - Parent navigator component
   */
  function ConflictNavigator(navigator) {
    _classCallCheck(this, ConflictNavigator);
    this.navigator = navigator;
    this.diffViewer = navigator.diffViewer;
  }

  /**
   * Find all unresolved chunk IDs in the document
   * @returns {Object} Object containing unresolvedChunkIds and total count
   */
  return _createClass(ConflictNavigator, [{
    key: "_getUnresolvedChunkInfo",
    value: function _getUnresolvedChunkInfo() {
      // Find elements with unresolved status
      var unresolvedElements = Array.from(document.querySelectorAll("[data-chunk-id]:not([data-chunk-id=\"\"])")).filter(function (el) {
        return el.classList.contains(_constants_Selectors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.STATUS.UNRESOLVED.name());
      });
      if (unresolvedElements.length === 0) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('ConflictNavigator: No unresolved elements found', null, 2);
        return {
          unresolvedChunkIds: [],
          count: 0
        };
      }

      // Get a unique list of chunk IDs that have unresolved status
      var unresolvedChunkIds = _toConsumableArray(new Set(unresolvedElements.map(function (el) {
        return el.getAttribute('data-chunk-id');
      })));
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ConflictNavigator: Found ".concat(unresolvedChunkIds.length, " unresolved chunks"), null, 3);
      return {
        unresolvedChunkIds: unresolvedChunkIds,
        count: unresolvedChunkIds.length
      };
    }

    /**
     * Navigate to first conflict
     */
  }, {
    key: "navigateToFirstConflict",
    value: function navigateToFirstConflict() {
      var _this$_getUnresolvedC = this._getUnresolvedChunkInfo(),
        unresolvedChunkIds = _this$_getUnresolvedC.unresolvedChunkIds,
        count = _this$_getUnresolvedC.count;
      if (count === 0) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('ConflictNavigator: No unresolved chunks found', null, 2);
        return false;
      }

      // Find the first chunk with this ID
      var chunks = this.diffViewer.chunkManager.chunks;
      var firstUnresolvedIndex = chunks.findIndex(function (chunk) {
        return unresolvedChunkIds.includes(String(chunk.id));
      });
      if (firstUnresolvedIndex >= 0) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ConflictNavigator: Navigating to first unresolved chunk at index ".concat(firstUnresolvedIndex), null, 2);
        return this.navigator.navigateToChunk(firstUnresolvedIndex);
      }
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('ConflictNavigator: No matching chunk found', null, 2);
      return false;
    }

    /**
     * Navigate to next conflict
     */
  }, {
    key: "navigateToNextConflict",
    value: function navigateToNextConflict() {
      var currentIndex = this.navigator.currentChunkIndex;
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ConflictNavigator: Current chunk index is ".concat(currentIndex), null, 3);
      var _this$_getUnresolvedC2 = this._getUnresolvedChunkInfo(),
        unresolvedChunkIds = _this$_getUnresolvedC2.unresolvedChunkIds,
        count = _this$_getUnresolvedC2.count;
      if (count === 0) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('ConflictNavigator: No unresolved chunks found', null, 2);
        return false;
      }
      var chunks = this.diffViewer.chunkManager.chunks;

      // Find next chunk or wrap around
      var nextIndex = this._findNextChunkIndex(chunks, unresolvedChunkIds, currentIndex);
      if (nextIndex >= 0) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ConflictNavigator: Navigating to next unresolved chunk at index ".concat(nextIndex), null, 2);
        return this.navigator.navigateToChunk(nextIndex);
      }
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('ConflictNavigator: No matching chunk found', null, 2);
      return false;
    }

    /**
     * Find the next chunk index from a starting point
     * @private
     */
  }, {
    key: "_findNextChunkIndex",
    value: function _findNextChunkIndex(chunks, unresolvedChunkIds, currentIndex) {
      var indexMap = this._createChunkIndexMap(chunks, unresolvedChunkIds);

      // No matching chunks
      if (indexMap.size === 0) {
        return -1;
      }

      // Get all indices in the map
      var indices = Array.from(indexMap.values()).sort(function (a, b) {
        return a - b;
      });

      // Find the next index after currentIndex
      var _iterator = _createForOfIteratorHelper(indices),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var index = _step.value;
          if (index > currentIndex) {
            return index;
          }
        }

        // Wrap around to beginning
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return indices[0];
    }

    /**
     * Navigate to previous conflict
     */
  }, {
    key: "navigateToPrevConflict",
    value: function navigateToPrevConflict() {
      var currentIndex = this.navigator.currentChunkIndex;
      var _this$_getUnresolvedC3 = this._getUnresolvedChunkInfo(),
        unresolvedChunkIds = _this$_getUnresolvedC3.unresolvedChunkIds,
        count = _this$_getUnresolvedC3.count;
      if (count === 0) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('ConflictNavigator: No unresolved chunks found', null, 2);
        return false;
      }
      var chunks = this.diffViewer.chunkManager.chunks;

      // Find previous chunk or wrap around
      var prevIndex = this._findPrevChunkIndex(chunks, unresolvedChunkIds, currentIndex);
      if (prevIndex >= 0) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ConflictNavigator: Navigating to previous unresolved chunk at index ".concat(prevIndex), null, 2);
        return this.navigator.navigateToChunk(prevIndex);
      }
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('ConflictNavigator: No matching chunk found', null, 2);
      return false;
    }

    /**
     * Find the previous chunk index from a starting point
     * @private
     */
  }, {
    key: "_findPrevChunkIndex",
    value: function _findPrevChunkIndex(chunks, unresolvedChunkIds, currentIndex) {
      var indexMap = this._createChunkIndexMap(chunks, unresolvedChunkIds);

      // No matching chunks
      if (indexMap.size === 0) {
        return -1;
      }

      // Get all indices in the map
      var indices = Array.from(indexMap.values()).sort(function (a, b) {
        return a - b;
      });

      // Find the previous index before currentIndex
      for (var i = indices.length - 1; i >= 0; i--) {
        if (indices[i] < currentIndex) {
          return indices[i];
        }
      }

      // Wrap around to end
      return indices[indices.length - 1];
    }

    /**
     * Create a map of chunk IDs to their indices for fast lookup
     * @private
     */
  }, {
    key: "_createChunkIndexMap",
    value: function _createChunkIndexMap(chunks, unresolvedChunkIds) {
      var indexMap = new Map();
      chunks.forEach(function (chunk, index) {
        // Only include chunks that are unresolved
        if (chunk && chunk.id && unresolvedChunkIds.includes(String(chunk.id))) {
          indexMap.set(String(chunk.id), index);
        }
      });
      return indexMap;
    }

    /**
     * Navigate to specific chunk
     * @param {number} index - Chunk index
     * @returns {boolean} Success status
     */
  }, {
    key: "navigateToChunk",
    value: function navigateToChunk(index) {
      // Set current chunk
      this.navigator.currentChunkIndex = index;

      // Get the chunk element
      var chunkElement = this.diffViewer.chunkManager.chunkElements[index];

      // Scroll to it
      if (chunkElement) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ConflictNavigator: Navigating to chunk ".concat(index), null, 2);

        // Find the diff-pane-content containing this element
        var paneContent = chunkElement.closest(_constants_Selectors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.DIFF.PANE_CONTENT);
        if (paneContent) {
          // Use utility to scroll element into view
          _utils_NavigationUtils__WEBPACK_IMPORTED_MODULE_1__/* .NavigationUtils */ .a.scrollElementIntoView(chunkElement, paneContent);

          // Add highlight effect
          _utils_NavigationUtils__WEBPACK_IMPORTED_MODULE_1__/* .NavigationUtils */ .a.addHighlightEffect(chunkElement, 2000);
        } else {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.warn("ConflictNavigator: Cannot navigate - chunk ".concat(index, " parent not found"), null, 2);
          return false;
        }
      } else {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.warn("ConflictNavigator: Cannot scroll - chunk ".concat(index, " not found"), null, 2);
        return false;
      }

      // Update counter
      this.navigator.navigationCounter.updateCounter();
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('ConflictNavigator: Navigation complete', null, 2);
      return true;
    }
  }]);
}();

/***/ }),

/***/ 208:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ ChunkRenderer)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(979);
/* harmony import */ var _utils_StringUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(594);
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(762);
/* harmony import */ var _utils_LoaderManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(102);
/* harmony import */ var _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(428);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






/**
 * Responsible for rendering chunk content
 */
var ChunkRenderer = /*#__PURE__*/function () {
  /**
   * @param {ChunkManager} chunkManager - Parent chunk manager
   */
  function ChunkRenderer(chunkManager) {
    _classCallCheck(this, ChunkRenderer);
    this.chunkManager = chunkManager;
  }

  /**
   * Render all chunks to container
   */
  return _createClass(ChunkRenderer, [{
    key: "renderChunks",
    value: function renderChunks() {
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('ChunkRenderer: Beginning chunk rendering', null, 2);

      // Show loading indicator for large diffs (more than 100 chunks)
      var loaderId = null;
      if (this.chunkManager.chunks.length > 100) {
        var translationManager = _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_3__/* .TranslationManager */ .n.getInstance();
        var loaderManager = _utils_LoaderManager__WEBPACK_IMPORTED_MODULE_2__/* .LoaderManager */ .D.getInstance();
        var loadingMessage = translationManager.get('renderingDiff', 'Rendering diff...');
        loaderId = loaderManager.showLoader(loadingMessage, {
          fullscreen: true,
          zIndex: 1000
        });
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('ChunkRenderer: Showing loader for large diff rendering', null, 2);
      }

      // Performance tracking
      var startTime = performance.now();

      // Generate HTML for both panes
      var leftHtml = this.buildDiffPaneHtml(this.chunkManager.oldContent, 'left');
      var rightHtml = this.buildDiffPaneHtml(this.chunkManager.newContent, 'right');

      // Inject HTML into container - WITHOUT creating empty pane headers
      // The headers will be added by ChunkSelectionHandler later
      this.chunkManager.diffViewer.container.innerHTML = "\n            <div class=\"".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.DIFF.PANES_CONTAINER.name(), "\">\n                <div class=\"").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.DIFF.PANE.name(), "\" id=\"").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.DIFF.PANE_LEFT.name(), "\" data-side=\"left\">\n                    ").concat(leftHtml, "\n                </div>\n                <div class=\"").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.DIFF.PANE.name(), "\" id=\"").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.DIFF.PANE_RIGHT.name(), "\" data-side=\"right\">\n                    ").concat(rightHtml, "\n                </div>\n            </div>\n        ");

      // Hide loader if shown
      if (loaderId) {
        var _loaderManager = _utils_LoaderManager__WEBPACK_IMPORTED_MODULE_2__/* .LoaderManager */ .D.getInstance();
        _loaderManager.hideLoader(loaderId);

        // Log performance metrics
        var endTime = performance.now();
        var duration = endTime - startTime;
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ChunkRenderer: Rendered ".concat(this.chunkManager.chunks.length, " chunks in ").concat(duration.toFixed(2), "ms"), null, 2);
      } else {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ChunkRenderer: Rendered ".concat(this.chunkManager.chunks.length, " chunks successfully"), null, 2);
      }
    }

    /**
     * Build HTML for a diff pane
     * @param {Array} lines - Content lines
     * @param {string} side - 'left' or 'right'
     * @returns {string} Generated HTML
     */
  }, {
    key: "buildDiffPaneHtml",
    value: function buildDiffPaneHtml(lines, side) {
      // First, identify chunks that have placeholder lines
      var chunksWithPlaceholders = new Set();
      var _iterator = _createForOfIteratorHelper(lines),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var line = _step.value;
          if (line.type === 'placeholder' && line.chunkId) {
            chunksWithPlaceholders.add(line.chunkId);
          }
        }

        // Create HTML with nested containers for proper scrolling
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var html = "<div class=\"".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.DIFF.PANE_CONTENT.name(), " hljs\">"); // Add scrolling container
      html += "<div class=\"".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.DIFF.TABLE_WRAPPER.name(), "\">");
      html += "<table class=\"".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.CODE.TABLE.name(), "\"><tbody>");
      var lineCounter = 0;
      var _iterator2 = _createForOfIteratorHelper(lines),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _line = _step2.value;
          html += this._renderDiffLine(_line, side, ++lineCounter, chunksWithPlaceholders);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      html += '</tbody></table>';
      html += '</div>'; // Close table wrapper
      html += '</div>'; // Close scrolling container

      return html;
    }

    /**
     * Render a single diff line
     * @private
     */
  }, {
    key: "_renderDiffLine",
    value: function _renderDiffLine(line, side, lineNumber, chunksWithPlaceholders) {
      var html = '<tr>';
      var chunkId = line.chunkId !== undefined ? line.chunkId : '';

      // Get chunk type if this is a chunk line
      var chunkType = '';
      if (chunkId !== '') {
        var chunk = this.chunkManager.chunks.find(function (c) {
          return c.id === chunkId;
        });
        chunkType = chunk ? chunk.type : '';
      }

      // Add line number cell
      html += "<td class=\"".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.CODE.LINE_NUMBER.name(), "\">").concat(lineNumber, "</td>");

      // Check if this chunk has placeholder lines
      var hasPlaceholder = chunkId !== '' && chunksWithPlaceholders.has(chunkId);
      if (line.type === 'placeholder') {
        html += this._renderPlaceholderLine(line, chunkId, chunkType, side, lineNumber);
      } else {
        html += this._renderContentLine(line, chunkId, chunkType, side, lineNumber, hasPlaceholder);
      }
      html += '</tr>';
      return html;
    }

    /**
     * Render placeholder line
     * @private
     */
  }, {
    key: "_renderPlaceholderLine",
    value: function _renderPlaceholderLine(line, chunkId, chunkType, side, lineNumber) {
      // Add status class for chunks that can be navigated
      var additionalClass = '';
      if (chunkId !== '') {
        // Add the vdm-diff__chunk class for elements with chunk IDs
        additionalClass += " ".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.DIFF.CHUNK.name());
        if (line.conflict || chunkType === 'replace' || chunkType === 'add' || chunkType === 'delete') {
          additionalClass += " ".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.STATUS.UNRESOLVED.name());
        }
      }
      return "<td class=\"".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.CODE.LINE_CONTENT.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.DIFF.LINE_CONTENT_EMPTY.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.DIFF.LINE_PLACEHOLDER.name()).concat(additionalClass, "\"\n                   data-chunk-id=\"").concat(chunkId, "\"\n                   data-chunk-type=\"").concat(chunkType, "\"\n                   data-side=\"").concat(side, "\"\n                   data-placeholder-type=\"").concat(line.placeholderType || 'default', "\"\n                   data-line-id=\"").concat(side, "-").concat(lineNumber, "\"\n                   data-has-placeholder=\"true\">&nbsp;</td>");
    }

    /**
     * Render content line
     * @private
     */
  }, {
    key: "_renderContentLine",
    value: function _renderContentLine(line, chunkId, chunkType, side, lineNumber, hasPlaceholder) {
      var lineContent = line.line;
      var isEmpty = !lineContent || lineContent === '\r' || lineContent === '\n';

      // Add different classes based on chunk type
      var additionalClass = '';
      if (chunkId !== '') {
        additionalClass = this._getChunkClass(chunkType, side);

        // Add the vdm-diff__chunk class for elements with chunk IDs
        additionalClass += " ".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.DIFF.CHUNK.name());

        // Add status class for chunks that can be navigated - include all chunk types that need resolution
        if (line.conflict || chunkType === 'replace' || chunkType === 'add' || chunkType === 'delete') {
          additionalClass += " ".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.STATUS.UNRESOLVED.name());
        }
      }
      if (isEmpty) {
        additionalClass += " ".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.CODE.LINE_EMPTY.name());
        return "<td class=\"".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.CODE.LINE_CONTENT.name()).concat(additionalClass, "\"\n                       data-chunk-id=\"").concat(chunkId, "\"\n                       data-chunk-type=\"").concat(chunkType, "\"\n                       data-side=\"").concat(side, "\"\n                       data-line-id=\"").concat(side, "-").concat(lineNumber, "\"\n                       ").concat(hasPlaceholder ? 'data-has-placeholder="true"' : '', ">&nbsp;</td>");
      } else {
        // Add the line content with proper attributes for chunk handling
        var displayContent = _utils_StringUtils__WEBPACK_IMPORTED_MODULE_4__/* .StringUtils */ .$.escapeHtml ? _utils_StringUtils__WEBPACK_IMPORTED_MODULE_4__/* .StringUtils */ .$.escapeHtml(lineContent) : lineContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // Add cursor: pointer to all clickable chunk elements
        var styleAttr = chunkId !== '' ? ' style="cursor: pointer;"' : '';
        return "<td class=\"".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.CODE.LINE_CONTENT.name()).concat(additionalClass, "\"\n                       data-chunk-id=\"").concat(chunkId, "\"\n                       data-chunk-type=\"").concat(chunkType, "\"\n                       data-side=\"").concat(side, "\"\n                       data-line-id=\"").concat(side, "-").concat(lineNumber, "\"\n                       ").concat(hasPlaceholder ? 'data-has-placeholder="true"' : '').concat(styleAttr, ">").concat(displayContent, "</td>");
      }
    }

    /**
     * Get CSS class for a chunk type
     * @private
     */
  }, {
    key: "_getChunkClass",
    value: function _getChunkClass(chunkType, side) {
      if (chunkType === 'delete' && side === 'left') {
        return " ".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.DIFF.LINE_DELETE.name());
      } else if (chunkType === 'add' && side === 'right') {
        return " ".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.DIFF.LINE_ADD.name());
      } else if (chunkType === 'replace') {
        var cls = " ".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.DIFF.LINE_ADD.name());
        if (side === 'left') {
          cls += " ".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.DIFF.LINE_REPLACE_LEFT.name());
        } else {
          cls += " ".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.DIFF.LINE_REPLACE_RIGHT.name());
        }
        return cls;
      }
      return '';
    }
  }]);
}();

/***/ }),

/***/ 268:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ MergeContentGenerator)
/* harmony export */ });
/* harmony import */ var _utils_ChunkUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(840);
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(979);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/**
 * Generates merged content from selections
 */
var MergeContentGenerator = /*#__PURE__*/function () {
  /**
   * @param {ChunkManager} chunkManager - Parent chunk manager
   */
  function MergeContentGenerator(chunkManager) {
    _classCallCheck(this, MergeContentGenerator);
    this.chunkManager = chunkManager;
  }

  /**
  * Extract lines for a specific chunk and side
  * @param {string} chunkId - Chunk identifier
  * @param {string} side - Side to extract ('old' or 'new')
  * @returns {Array} Array of lines for the chunk
  */
  return _createClass(MergeContentGenerator, [{
    key: "extractChunkLines",
    value: function extractChunkLines(chunkId, side) {
      var chunk = this.chunkManager.chunks.find(function (c) {
        return c.id === chunkId;
      });
      if (!chunk) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_1__/* .Debug */ .y.log("MergeContentGenerator: Chunk not found: ".concat(chunkId), null, 3);
        return [];
      }

      // Get the content array based on side (old or new)
      var contentArray = side === 'old' ? this.chunkManager.oldContent : this.chunkManager.newContent;

      // Filter lines that belong to this chunk
      var lines = contentArray.filter(function (line) {
        return line.chunkId === chunkId;
      });
      _utils_Debug__WEBPACK_IMPORTED_MODULE_1__/* .Debug */ .y.log("MergeContentGenerator: Extracted ".concat(lines.length, " lines from chunk ").concat(chunkId, " (").concat(side, ")"), {
        chunkId: chunkId,
        side: side,
        linesCount: lines.length,
        totalContentLines: contentArray.length,
        sampleLines: lines.slice(0, 3)
      }, 3);
      return lines;
    }

    /**
     * Generate merged content based on selections
     * @param {Object} selections - Map of chunk IDs to selected sides
     * @returns {string} Merged content
     */
  }, {
    key: "generateMergedContent",
    value: function generateMergedContent(selections) {
      _utils_Debug__WEBPACK_IMPORTED_MODULE_1__/* .Debug */ .y.log('MergeContentGenerator: Starting merge generation', {
        totalChunks: this.chunkManager.chunks.length,
        selections: Object.keys(selections).length
      }, 2);

      // If no selections, return right side content
      if (Object.keys(selections).length === 0) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_1__/* .Debug */ .y.log('MergeContentGenerator: No selections, returning new content', null, 2);
        return _utils_ChunkUtils__WEBPACK_IMPORTED_MODULE_0__/* .ChunkUtils */ .N.generateFileContent(this.chunkManager.newContent);
      }
      var mergedLines = [];

      // Create a map of chunk lines by chunk ID for faster lookup
      var oldChunkLines = {};
      var newChunkLines = {};

      // Group lines by chunk ID
      this.chunkManager.oldContent.forEach(function (line) {
        if (line.chunkId) {
          if (!oldChunkLines[line.chunkId]) {
            oldChunkLines[line.chunkId] = [];
          }
          oldChunkLines[line.chunkId].push(line);
        }
      });
      this.chunkManager.newContent.forEach(function (line) {
        if (line.chunkId) {
          if (!newChunkLines[line.chunkId]) {
            newChunkLines[line.chunkId] = [];
          }
          newChunkLines[line.chunkId].push(line);
        }
      });

      // Track which chunks we've processed to avoid duplicates
      var processedChunks = new Set();

      // Process all lines from newContent in order, but replace chunks as needed
      var _iterator = _createForOfIteratorHelper(this.chunkManager.newContent),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var line = _step.value;
          if (line.chunkId && selections[line.chunkId]) {
            // This line belongs to a chunk with a selection
            if (!processedChunks.has(line.chunkId)) {
              // First time we encounter this chunk - add all lines from selected side
              var selectedSide = selections[line.chunkId];
              if (selectedSide === 'left') {
                // Add all lines from old content for this chunk
                var chunkLines = oldChunkLines[line.chunkId] || [];
                chunkLines.forEach(function (chunkLine) {
                  if (chunkLine.type === 'content') {
                    mergedLines.push(chunkLine);
                  }
                });
              } else {
                // Add all lines from new content for this chunk
                var _chunkLines = newChunkLines[line.chunkId] || [];
                _chunkLines.forEach(function (chunkLine) {
                  if (chunkLine.type === 'content') {
                    mergedLines.push(chunkLine);
                  }
                });
              }
              processedChunks.add(line.chunkId);
            }
            // Skip this individual line since we've added the whole chunk
          } else if (!line.chunkId) {
            // This is common content (not part of any chunk)
            if (line.type === 'content') {
              mergedLines.push(line);
            }
          }
          // Skip lines that belong to chunks without selections
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      _utils_Debug__WEBPACK_IMPORTED_MODULE_1__/* .Debug */ .y.log('MergeContentGenerator: Processing complete', {
        totalMergedLines: mergedLines.length,
        processedChunks: Array.from(processedChunks),
        sampleLines: mergedLines.slice(0, 3).map(function (l) {
          var _l$line;
          return ((_l$line = l.line) === null || _l$line === void 0 ? void 0 : _l$line.substring(0, 50)) + '...' || 0;
        })
      }, 3);
      var mergedContent = _utils_ChunkUtils__WEBPACK_IMPORTED_MODULE_0__/* .ChunkUtils */ .N.generateFileContent(mergedLines);
      _utils_Debug__WEBPACK_IMPORTED_MODULE_1__/* .Debug */ .y.log('MergeContentGenerator: Merge generation complete', {
        totalLines: mergedLines.length,
        contentLength: mergedContent.length
      }, 2);
      return mergedContent;
    }

    /**
     * Generate file content from lines
     * @param {Array} lines - Array of line objects
     * @returns {string} Generated content
     */
  }, {
    key: "generateFileFromLines",
    value: function generateFileFromLines(lines) {
      return _utils_ChunkUtils__WEBPACK_IMPORTED_MODULE_0__/* .ChunkUtils */ .N.generateFileContent(lines);
    }
  }]);
}();

/***/ }),

/***/ 371:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ MergeOperationHandler)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(979);
/* harmony import */ var _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(428);
/* harmony import */ var _utils_LoaderManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(102);
/* harmony import */ var _utils_AlertManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(579);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





/**
 * Handles merge operation actions
 */
var MergeOperationHandler = /*#__PURE__*/function () {
  /**
   * @param {MergeHandler} mergeHandler - Parent merge handler
   */
  function MergeOperationHandler(mergeHandler) {
    _classCallCheck(this, MergeOperationHandler);
    this.mergeHandler = mergeHandler;
    this.diffViewer = mergeHandler.diffViewer;
  }

  /**
   * Proceed with merge operation - this is the main entry point called from MergeHandler
   * @param {string} mergeType - Type of merge ('new', 'new-suffix', etc.)
   * @returns {Promise<Object>} Result object with success status
   */
  return _createClass(MergeOperationHandler, [{
    key: "proceedWithMerge",
    value: (function () {
      var _proceedWithMerge = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(mergeType) {
        var runtimeProps, fileRefId, oldFileRefId, translationManager, loadingMessage, loaderManager, loaderId, mergedContent, result, resultContainer, alertManager, alertElement, _resultContainer, _alertManager, _alertElement, _resultContainer2, _alertManager2, errorMessage, _alertElement2;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeOperationHandler: Proceeding with merge', {
                mergeType: mergeType
              }, 2);

              // Get runtime properties to check context
              runtimeProps = this.diffViewer.getRuntimeProps();
              fileRefId = runtimeProps.fileRefId || '';
              oldFileRefId = runtimeProps.oldFileRefId || ''; // If mergeType requires file references but we don't have them,
              // automatically switch to clipboard mode
              if ((mergeType === 'new' || mergeType === 'new-suffix') && !fileRefId) {
                _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeOperationHandler: Switching to clipboard mode (no fileRefId available)', null, 2);
                mergeType = 'clipboard';
              } else if ((mergeType === 'old' || mergeType === 'old-suffix') && !oldFileRefId) {
                _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeOperationHandler: Switching to clipboard mode (no oldFileRefId available)', null, 2);
                mergeType = 'clipboard';
              } else if ((mergeType === 'both' || mergeType === 'both-suffix') && (!fileRefId || !oldFileRefId)) {
                _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeOperationHandler: Switching to clipboard mode (missing file reference IDs)', null, 2);
                mergeType = 'clipboard';
              }

              // Get translation manager for loading message
              translationManager = _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_1__/* .TranslationManager */ .n.getInstance();
              loadingMessage = translationManager.get('loadingContent', 'Processing merge...'); // Show loading indicator
              loaderManager = _utils_LoaderManager__WEBPACK_IMPORTED_MODULE_2__/* .LoaderManager */ .D.getInstance();
              loaderId = loaderManager.showLoader(loadingMessage, {
                fullscreen: true,
                zIndex: 1000 // Ensure it appears above other UI elements
              });
              _context.prev = 9;
              // Generate merged content
              mergedContent = this.diffViewer.chunkManager.generateMergedContent(); // Apply the merge - skip server calls for clipboard type (text-compare, url-compare, file-upload)
              if (!(mergeType === 'clipboard')) {
                _context.next = 15;
                break;
              }
              // For clipboard type, we don't need to save on server, just return success
              result = {
                success: true,
                message: translationManager.get('mergeSuccessClipboard', 'Merge completed successfully. The merged content is ready.')
              };
              _context.next = 18;
              break;
            case 15:
              _context.next = 17;
              return this.applyMerge(mergedContent, mergeType);
            case 17:
              result = _context.sent;
            case 18:
              // Hide loading indicator
              loaderManager.hideLoader(loaderId);

              // Show result message
              if (result.success) {
                // Get the result container and show success message
                resultContainer = document.getElementById('vdm-merge__result');
                if (resultContainer) {
                  resultContainer.innerHTML = '';
                  resultContainer.classList.remove('vdm-d-none');

                  // Use AlertManager to show success message
                  alertManager = _utils_AlertManager__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.getInstance();
                  alertElement = alertManager.showSuccess(result.message, {
                    timeout: 0,
                    // Don't auto-dismiss
                    translate: false // Message is already translated
                  });
                  resultContainer.appendChild(alertElement);

                  // Scroll to the result container
                  this.scrollToMergeResult();
                }
              } else {
                // Show error message
                _resultContainer = document.getElementById('vdm-merge__result');
                if (_resultContainer) {
                  _resultContainer.innerHTML = '';
                  _resultContainer.classList.remove('vdm-d-none');

                  // Use AlertManager to show error message
                  _alertManager = _utils_AlertManager__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.getInstance();
                  _alertElement = _alertManager.showError(result.message || 'An error occurred during the merge operation.', {
                    timeout: 0,
                    // Don't auto-dismiss
                    translate: false // Message is already translated
                  });
                  _resultContainer.appendChild(_alertElement);

                  // Scroll to the result container
                  this.scrollToMergeResult();
                }
              }
              return _context.abrupt("return", result);
            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](9);
              // Hide loading indicator in case of error
              loaderManager.hideLoader(loaderId);
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error('MergeOperationHandler: Error in merge operation', _context.t0, 1);

              // Show error message in UI
              _resultContainer2 = document.getElementById('vdm-merge__result');
              if (_resultContainer2) {
                _resultContainer2.innerHTML = '';
                _resultContainer2.classList.remove('vdm-d-none');

                // Use AlertManager to show error message
                _alertManager2 = _utils_AlertManager__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.getInstance();
                errorMessage = "Error: ".concat(_context.t0.message || 'An unexpected error occurred during merge.');
                _alertElement2 = _alertManager2.showError(errorMessage, {
                  timeout: 0,
                  // Don't auto-dismiss
                  translate: false // Error message doesn't need translation
                });
                _resultContainer2.appendChild(_alertElement2);
              }
              return _context.abrupt("return", {
                success: false,
                message: _context.t0.message || 'An unexpected error occurred during merge'
              });
            case 30:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[9, 23]]);
      }));
      function proceedWithMerge(_x) {
        return _proceedWithMerge.apply(this, arguments);
      }
      return proceedWithMerge;
    }()
    /**
     * Apply merged content to file
     * @param {string} mergedContent - Merged content
     * @param {string} mergeType - Merge type (new, new-suffix, old, old-suffix, both, both-suffix)
     * @returns {Promise<Object>} Result object with success status
     */
    )
  }, {
    key: "applyMerge",
    value: (function () {
      var _applyMerge = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(mergedContent, mergeType) {
        var runtimeProps, fileRefId, oldFileRefId, selections, wasBeautified, formParams, endpoint, response, result;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              // Get the runtime properties - using only fileRefId, not server paths
              runtimeProps = this.diffViewer.getRuntimeProps(); // Get only the file reference IDs - security improvement
              fileRefId = runtimeProps.fileRefId || '';
              oldFileRefId = runtimeProps.oldFileRefId || '';
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeOperationHandler: File references for merge operation', {
                fileRefId: fileRefId,
                oldFileRefId: oldFileRefId,
                mergeType: mergeType
              }, 2);

              // If no file references are available, automatically fall back to clipboard mode
              if (!((mergeType === 'new' || mergeType === 'new-suffix') && !fileRefId || (mergeType === 'old' || mergeType === 'old-suffix') && !oldFileRefId || (mergeType === 'both' || mergeType === 'both-suffix') && (!fileRefId || !oldFileRefId))) {
                _context2.next = 7;
                break;
              }
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeOperationHandler: Switching to clipboard mode in applyMerge (missing file references)', null, 2);
              return _context2.abrupt("return", {
                success: true,
                message: _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_1__/* .TranslationManager */ .n.getInstance().get('mergeSuccessClipboard', 'Merge completed successfully. The merged content is ready.')
              });
            case 7:
              if (!((mergeType === 'new' || mergeType === 'new-suffix') && !fileRefId)) {
                _context2.next = 12;
                break;
              }
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error('MergeOperationHandler: No file reference ID available for new file', null, 1);
              return _context2.abrupt("return", {
                success: false,
                message: 'No file reference ID available to save changes to new file'
              });
            case 12:
              if (!((mergeType === 'old' || mergeType === 'old-suffix') && !oldFileRefId)) {
                _context2.next = 17;
                break;
              }
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error('MergeOperationHandler: No file reference ID available for old file', null, 1);
              return _context2.abrupt("return", {
                success: false,
                message: 'No file reference ID available to save changes to old file'
              });
            case 17:
              if (!((mergeType === 'both' || mergeType === 'both-suffix') && (!fileRefId || !oldFileRefId))) {
                _context2.next = 20;
                break;
              }
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error('MergeOperationHandler: Missing file reference IDs for both files', null, 1);
              return _context2.abrupt("return", {
                success: false,
                message: 'Missing file reference IDs to save changes to both files'
              });
            case 20:
              // Get selections and beautification status
              selections = JSON.stringify(this.diffViewer.chunkManager.selections);
              wasBeautified = this.diffViewer.isContentBeautified() ? 1 : 0;
              _context2.prev = 22;
              // SECURITY: Only use fileRefId - never pass server paths
              formParams = {
                action: 'registerMergedContent',
                content: mergedContent,
                selections: selections,
                mergeType: mergeType,
                wasBeautified: wasBeautified
              }; // Add appropriate file reference IDs based on merge type
              if (mergeType === 'new' || mergeType === 'new-suffix' || mergeType === 'both' || mergeType === 'both-suffix') {
                formParams.fileRefId = fileRefId;
              }
              if (mergeType === 'old' || mergeType === 'old-suffix' || mergeType === 'both' || mergeType === 'both-suffix') {
                formParams.oldFileRefId = oldFileRefId;
              }
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeOperationHandler: Form parameters for save request', formParams, 2);

              // Get API endpoint
              _context2.next = 29;
              return this.diffViewer.getEndpoint('ajaxDiffMerge');
            case 29:
              endpoint = _context2.sent;
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeOperationHandler: Using endpoint', {
                endpoint: endpoint
              }, 2);

              // Send the request
              _context2.next = 33;
              return fetch(endpoint, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(formParams)
              });
            case 33:
              response = _context2.sent;
              _context2.next = 36;
              return response.json();
            case 36:
              result = _context2.sent;
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeOperationHandler: API response', result, 2);
              return _context2.abrupt("return", result);
            case 41:
              _context2.prev = 41;
              _context2.t0 = _context2["catch"](22);
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error("MergeOperationHandler: Error applying merge:", _context2.t0, 1);
              return _context2.abrupt("return", {
                success: false,
                message: "Error applying merge: ".concat(_context2.t0.message)
              });
            case 45:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[22, 41]]);
      }));
      function applyMerge(_x2, _x3) {
        return _applyMerge.apply(this, arguments);
      }
      return applyMerge;
    }()
    /**
     * Scroll to the merge result container
     */
    )
  }, {
    key: "scrollToMergeResult",
    value: function scrollToMergeResult() {
      var resultElement = document.getElementById('vdm-merge__result');
      if (resultElement) {
        // Scroll the element into view with smooth behavior
        resultElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeOperationHandler: Scrolled to merge result', null, 2);
      }
    }
  }]);
}();

/***/ }),

/***/ 459:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ NavigationCounter)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Manages navigation counter display and state
 */
var NavigationCounter = /*#__PURE__*/function () {
  /**
   * @param {DiffNavigator} navigator - Parent navigator component
   */
  function NavigationCounter(navigator) {
    _classCallCheck(this, NavigationCounter);
    this.navigator = navigator;
    this.counterElement = null;
    this.prevButton = null;
    this.nextButton = null;
  }

  /**
   * Set counter element reference
   * @param {Element} element - Counter element
   */
  return _createClass(NavigationCounter, [{
    key: "setCounterElement",
    value: function setCounterElement(element) {
      this.counterElement = element;
    }

    /**
     * Set navigation button references
     * @param {Element} prevButton - Previous button
     * @param {Element} nextButton - Next button
     */
  }, {
    key: "setButtons",
    value: function setButtons(prevButton, nextButton) {
      this.prevButton = prevButton;
      this.nextButton = nextButton;
    }

    /**
     * Update counter display
     * @returns {Array} Active conflicts for navigation
     */
  }, {
    key: "updateCounter",
    value: function updateCounter() {
      var _this = this;
      if (!this.counterElement) return [];
      var chunks = this.navigator.diffViewer.chunkManager.chunks;
      var selections = this.navigator.diffViewer.chunkManager.selections;
      var conflictCount = 0;
      var currentIndex = 0;
      var activeConflicts = [];

      // Count only unresolved conflicts
      chunks.forEach(function (chunk, index) {
        if (chunk.conflict && !selections[chunk.id]) {
          // This is an unresolved conflict - no selection made yet
          activeConflicts.push(index);
          conflictCount++;
        }
      });

      // Find current position in active conflicts
      if (this.navigator.currentChunkIndex >= 0) {
        var position = activeConflicts.findIndex(function (index) {
          return index >= _this.navigator.currentChunkIndex;
        });
        if (position !== -1) {
          currentIndex = position + 1; // 1-based index for display
        }
      }

      // Update counter text with different symbol when complete
      if (conflictCount === 0) {
        // All conflicts resolved! Show a checkmark
        this.counterElement.textContent = '✓';
        this.counterElement.title = 'All conflicts resolved!';
      } else {
        this.counterElement.textContent = "".concat(currentIndex || 1, "/").concat(conflictCount);
        this.counterElement.title = "".concat(conflictCount, " conflicts remaining");
      }

      // Enable/disable buttons based on conflict count
      if (this.prevButton && this.nextButton) {
        this.prevButton.disabled = conflictCount === 0;
        this.nextButton.disabled = conflictCount === 0;
      }
      return activeConflicts;
    }
  }]);
}();

/***/ }),

/***/ 646:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ NavigationUIBuilder)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(979);
/* harmony import */ var _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(759);
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(762);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




/**
 * Builds navigation UI elements
 */
var NavigationUIBuilder = /*#__PURE__*/function () {
  /**
   * @param {DiffNavigator} navigator - Parent navigator component
   */
  function NavigationUIBuilder(navigator) {
    _classCallCheck(this, NavigationUIBuilder);
    this.navigator = navigator;
  }

  /**
   * Create navigation UI elements
   * @returns {Object|null} Object with counter, prev button, and next button elements
   */
  return _createClass(NavigationUIBuilder, [{
    key: "createNavigationUI",
    value: function createNavigationUI() {
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('NavigationUIBuilder: Creating navigation UI', null, 2);

      // Find container element - first look for an existing one
      var container = document.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.NAVIGATION.CONTAINER);

      // If no container found, create one
      if (!container) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('NavigationUIBuilder: No navigation container found, creating one', null, 2);

        // Get the diff pane contents as parent reference
        var panes = document.querySelectorAll(_constants_Selectors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.DIFF.PANE);
        if (!panes || panes.length === 0) {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.warn('NavigationUIBuilder: No diff panes found to append navigation container');
          return null;
        }

        // Create container
        container = document.createElement('div');
        container.className = _constants_Selectors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.NAVIGATION.CONTAINER.name();

        // Build controls inside the container
        this._createControls(container);

        // Append after the first pane
        if (panes[0].parentNode) {
          panes[0].parentNode.insertBefore(container, panes[0]);
        }
      } else {
        // Use existing container, but update its contents
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('NavigationUIBuilder: Using existing navigation container', null, 2);
        container.innerHTML = '';
        this._createControls(container);
      }

      // Return references to the elements
      return {
        counter: document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.NAVIGATION.COUNTER.name()),
        prevButton: document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.NAVIGATION.PREV_BUTTON.name()),
        nextButton: document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.NAVIGATION.NEXT_BUTTON.name())
      };
    }

    /**
     * Create navigation controls
     * @private
     * @param {Element} container - Container element
     */
  }, {
    key: "_createControls",
    value: function _createControls(container) {
      var _this = this;
      // Create nav chunk element
      var navChunk = document.createElement('div');
      navChunk.className = _constants_Selectors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.NAVIGATION.NAV_CHUNK.name();

      // Create counter element
      var counter = document.createElement('span');
      counter.id = _constants_Selectors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.NAVIGATION.COUNTER.name();
      counter.className = _constants_Selectors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.NAVIGATION.COUNTER_ELEMENT.name();

      // Create previous button
      var prevButton = document.createElement('button');
      prevButton.id = _constants_Selectors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.NAVIGATION.PREV_BUTTON.name();
      prevButton.classList.add(_constants_Selectors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.UTILITY.BUTTON.name(), _constants_Selectors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.UTILITY.BUTTON_FLAT.name(), _constants_Selectors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.UTILITY.BUTTON_SMALL.name());
      prevButton.innerHTML = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__/* .DOMUtils */ .e.getIconHtml('chevron-up');
      prevButton.title = 'Previous change';
      prevButton.addEventListener('click', function () {
        return _this.navigator.navigateToPrevConflict();
      });

      // Create next button
      var nextButton = document.createElement('button');
      nextButton.id = _constants_Selectors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.NAVIGATION.NEXT_BUTTON.name();
      nextButton.classList.add(_constants_Selectors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.UTILITY.BUTTON.name(), _constants_Selectors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.UTILITY.BUTTON_FLAT.name(), _constants_Selectors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.UTILITY.BUTTON_SMALL.name());
      nextButton.innerHTML = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__/* .DOMUtils */ .e.getIconHtml('chevron-down');
      nextButton.title = 'Next change';
      nextButton.addEventListener('click', function () {
        return _this.navigator.navigateToNextConflict();
      });

      // Add elements to navChunk
      navChunk.appendChild(prevButton);
      navChunk.appendChild(counter);
      navChunk.appendChild(nextButton);

      // Add navChunk to container
      container.appendChild(navChunk);
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('NavigationUIBuilder: Navigation controls created', null, 2);
    }

    /**
     * Clean up event handlers
     */
  }, {
    key: "destroy",
    value: function destroy() {
      // Find navigation buttons
      var prevButton = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.NAVIGATION.PREV_BUTTON.name());
      var nextButton = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.NAVIGATION.NEXT_BUTTON.name());

      // Remove event listeners by cloning
      if (prevButton) {
        var newPrevButton = prevButton.cloneNode(true);
        prevButton.parentNode.replaceChild(newPrevButton, prevButton);
      }
      if (nextButton) {
        var newNextButton = nextButton.cloneNode(true);
        nextButton.parentNode.replaceChild(newNextButton, nextButton);
      }
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('NavigationUIBuilder: Event handlers removed', null, 2);
    }
  }]);
}();

/***/ }),

/***/ 653:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ ModalManager)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(979);
/* harmony import */ var _utils_BaseSingleton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(454);
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(762);
/* harmony import */ var _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(759);
/* harmony import */ var _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(428);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }






// Module-level singleton instance
var instance = null;

/**
 * Lightweight standalone modal manager without external dependencies
 */
var ModalManager = /*#__PURE__*/function (_BaseSingleton) {
  /**
   * Constructor - protected from direct instantiation
   * @param {Object} options - Configuration options
   */
  function ModalManager() {
    var _this;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, ModalManager);
    _this = _callSuper(this, ModalManager);

    // Skip initialization if instance already exists
    if (!_this._isFirstInstance(instance)) {
      return _possibleConstructorReturn(_this);
    }
    _this.options = _objectSpread({
      debug: false,
      translations: {}
    }, options);
    _this.modals = {};
    _this.activeModal = null;
    _this.initialized = false;
    _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('ModalManager: Initialized', null, 2);
    return _this;
  }

  /**
   * Initialize modals by creating the necessary HTML
   * @returns {boolean} Success status
   */
  _inherits(ModalManager, _BaseSingleton);
  return _createClass(ModalManager, [{
    key: "initModals",
    value: function initModals() {
      try {
        if (this.initialized) {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('ModalManager: Already initialized', null, 2);
          return true;
        }
        var translationManager = _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_3__/* .TranslationManager */ .n.getInstance();

        // Create confirm modal
        this.createModal({
          id: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.CONFIRM.name(),
          title: translationManager.get('confirmation'),
          contentId: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.MESSAGE.name(),
          contentClass: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.PADDING_3.name(),
          footerButtons: [{
            id: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.CONTINUE_BTN.name(),
            text: translationManager.get('continueResolving'),
            "class": _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON.name() + ' ' + _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON_PRIMARY.name() + ' ' + _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.MARGIN_END_2.name()
          }, {
            id: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.MERGE_BTN.name(),
            text: translationManager.get('mergeAnyway'),
            "class": _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON.name() + ' ' + _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON_WARNING.name()
          }]
        });

        // Create preview modal
        this.createModal({
          id: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.PREVIEW.name(),
          title: '<span id="' + _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.PREVIEW_FILENAME.name() + '"></span>',
          contentId: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.PREVIEW_CONTENT_ID.name(),
          contentClass: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.PREVIEW_CONTENT.name(),
          headerClass: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.HEADER_FIXED.name(),
          modalClass: 'vdm-modal--fixed-footer',
          fullscreen: true
        });

        // Create conflict modal
        this.createModal({
          id: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MERGE.CONFLICT_MODAL.name(),
          title: translationManager.get('unresolvedConflicts'),
          contentId: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.MESSAGE.name(),
          contentClass: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.PADDING_3.name(),
          footerButtons: [{
            id: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.CONTINUE_BTN.name(),
            text: translationManager.get('continueResolving'),
            "class": _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON.name() + ' ' + _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON_PRIMARY.name() + ' ' + _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.MARGIN_END_2.name()
          }, {
            id: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.MERGE_BTN.name(),
            text: translationManager.get('mergeAnyway'),
            "class": _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON.name() + ' ' + _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON_WARNING.name()
          }]
        });

        // Add event listeners for close buttons, backdrop clicks, etc.
        this._setupEventListeners();
        this.initialized = true;
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('ModalManager: Modals initialized', null, 2);
        return true;
      } catch (error) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error('ModalManager: Error initializing modals', error, 1);
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
  }, {
    key: "createModal",
    value: function createModal(config) {
      try {
        var modalId = config.id;

        // Check if modal already exists in DOM
        if (document.getElementById(modalId)) {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ModalManager: Modal ".concat(modalId, " already exists in DOM"), null, 2);
          return true;
        }

        // Use header class from config or default to MODAL.HEADER with prefix removed
        var headerClass = config.headerClass || _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.HEADER.name();

        // Start building modal HTML
        var modalHtml = "\n                <div id=\"".concat(modalId, "\" class=\"").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.CONTAINER.name() /*remove dot prefix*/).concat(config.modalClass ? ' ' + config.modalClass : '', "\" style=\"display: none;\"");

        // Add additional attributes if provided
        if (config.attr) {
          Object.entries(config.attr).forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];
            modalHtml += " ".concat(key, "=\"").concat(value, "\"");
          });
        }
        modalHtml += ">\n                    <div class=\"".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.CONTENT.name(), "\">\n                        <div class=\"").concat(headerClass, "\">\n                            <h5 class=\"").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.TITLE.name(), "\">").concat(config.title, "</h5>\n                            <button class=\"").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.CLOSE.name(), "\">&times;</button>\n                        </div>");

        // Add content container
        if (config.contentId) {
          modalHtml += "<div id=\"".concat(config.contentId, "\" class=\"").concat(config.contentClass || '', "\"></div>");
        } else {
          modalHtml += "<div class=\"".concat(config.contentClass || '', "\"></div>");
        }

        // Add footer with buttons if specified
        if (config.footerButtons && config.footerButtons.length > 0) {
          modalHtml += "<div class=\"".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.FOOTER.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.FLEX.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.JUSTIFY_CONTENT_BETWEEN.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.PADDING_3.name(), "\">");
          config.footerButtons.forEach(function (button) {
            // Check if this is a close button - only buttons with the exact MODAL.CLOSE.name() class should be considered close buttons
            var isCloseButton = button === null || button === void 0 ? void 0 : button["class"].split(' ').includes(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.CLOSE.name());

            // Determine the button type based on class
            var iconName = 'chevron-right'; // Default icon

            if (button["class"]) {
              var classNames = button["class"].split(' ');

              // Determine button type from classes
              if (classNames.some(function (cls) {
                return cls.includes('primary');
              })) {
                iconName = 'check-circle';
              } else if (classNames.some(function (cls) {
                return cls.includes('success');
              })) {
                iconName = 'check-circle';
              } else if (classNames.some(function (cls) {
                return cls.includes('danger');
              })) {
                iconName = 'exclamation-triangle';
              } else if (classNames.some(function (cls) {
                return cls.includes('warning');
              })) {
                iconName = 'exclamation-circle';
              } else if (classNames.some(function (cls) {
                return cls.includes('info');
              })) {
                iconName = 'info-circle';
              }
            }

            // Special case for specific button IDs
            if (button.id) {
              if (button.id.toLowerCase().includes('copy')) {
                iconName = 'copy';
              } else if (button.id === _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.CONTINUE_BTN.name()) {
                iconName = 'chevron-right';
              } else if (button.id === _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.MERGE_BTN.name()) {
                iconName = 'exclamation-circle';
              }
            }

            // Generate icon HTML if this is not a close button
            var iconHtml = '';
            if (!isCloseButton) {
              iconHtml = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__/* .DOMUtils */ .e.getIconHtml(iconName, {
                classes: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.MARGIN_END_2.name()
              });
            }
            modalHtml += "<button id=\"".concat(button.id, "\" class=\"").concat(button["class"] || _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON.name() + ' ' + _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON_SECONDARY.name(), "\"");

            // Add data attributes if provided
            if (button.data) {
              Object.entries(button.data).forEach(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                  key = _ref4[0],
                  value = _ref4[1];
                modalHtml += " data-".concat(key, "=\"").concat(value, "\"");
              });
            }

            // Add the icon before text but only for non-close buttons
            if (isCloseButton && !button.text) {
              // For close buttons without text, don't add any content (X will be created by CSS)
              modalHtml += "></button>";
            } else {
              // For other buttons or close buttons with text, add icon + text span
              modalHtml += ">".concat(iconHtml, "<span>").concat(button.text || '', "</span></button>");
            }
          });
          modalHtml += "</div>";
        }

        // Close the modal structure
        modalHtml += "\n                    </div>\n                </div>\n            ";
        this._appendToBody(modalId, modalHtml);
        this.modals[modalId] = {
          element: document.getElementById(modalId),
          isOpen: false,
          config: config
        };

        // Apply fullscreen if needed
        if (config.fullscreen) {
          var modalElement = document.getElementById(modalId);
          if (modalElement) {
            this.setFullscreenSize(modalElement);
          }
        }

        // Attach custom event handlers if provided
        if (config.events) {
          var _modalElement = document.getElementById(modalId);
          Object.entries(config.events).forEach(function (_ref5) {
            var _ref6 = _slicedToArray(_ref5, 2),
              selector = _ref6[0],
              events = _ref6[1];
            var elements;

            // Handle special selectors
            if (selector === 'modal') {
              elements = [_modalElement];
            } else if (selector === 'close') {
              elements = Array.from(_modalElement.querySelectorAll(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.CLOSE));
            } else {
              // For regular selectors, query within the modal
              elements = Array.from(_modalElement.querySelectorAll(selector));
            }

            // Attach events to each matching element
            elements.forEach(function (element) {
              if (element) {
                Object.entries(events).forEach(function (_ref7) {
                  var _ref8 = _slicedToArray(_ref7, 2),
                    eventName = _ref8[0],
                    handler = _ref8[1];
                  element.addEventListener(eventName, handler);
                  _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ModalManager: Attached ".concat(eventName, " event to ").concat(selector, " in modal ").concat(modalId), null, 3);
                });
              }
            });
          });
        }
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ModalManager: Created modal - ".concat(modalId), null, 3);
        return true;
      } catch (error) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error("ModalManager: Error creating modal - ".concat(config.id), error, 1);
        return false;
      }
    }

    /**
     * Determine the appropriate icon for a button based on context
     * @private
     * @param {Object} button - The button configuration object
     * @returns {string} The name of the icon to use
     */
  }, {
    key: "_getIconNameForButton",
    value: function _getIconNameForButton(button) {
      // First, check the IconRegistry to ensure we use icons that actually exist

      // Icons based on button text (case insensitive)
      var buttonText = button.text.toLowerCase();
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
      if (button["class"]) {
        var buttonClass = button["class"].toLowerCase();
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
  }, {
    key: "_appendToBody",
    value: function _appendToBody(modalId, html) {
      // Create wrapper div for modals if it doesn't exist
      var modal = document.getElementById(modalId);
      if (!modal) {
        // Convert HTML string to DOM element before appending
        var tempContainer = document.createElement('div');
        tempContainer.innerHTML = html;
        document.body.appendChild(tempContainer.firstElementChild);
      }

      // Create or update the backdrop element
      var backdrop = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.BACKDROP.name());
      if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.BACKDROP.name();
        backdrop.style.display = 'none';
        document.body.appendChild(backdrop);
      }
    }

    /**
     * Set up event listeners for modals
     * @private
     */
  }, {
    key: "_setupEventListeners",
    value: function _setupEventListeners() {
      var _this2 = this;
      // Use document-level event delegation for close buttons
      document.addEventListener('click', function (event) {
        // Check if the clicked element is a close button or has the close class
        if (event.target.matches(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.CLOSE)) {
          var modal = event.target.closest(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.CONTAINER);
          if (modal !== null && modal !== void 0 && modal.id) {
            _this2.close(modal.id);
          }
        }
      });

      // Backdrop click to close
      var backdrop = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.BACKDROP.name());
      if (backdrop) {
        backdrop.addEventListener('click', function () {
          if (_this2.activeModal) {
            _this2.close(_this2.activeModal);
          }
        });
      }

      // ESC key to close
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && _this2.activeModal) {
          _this2.close(_this2.activeModal);
        }
      });
    }

    /**
     * Register a modal instance
     * @param {string} modalId - ID of the modal element
     * @param {Object} options - Modal configuration options
     * @returns {boolean} Success status
     */
  }, {
    key: "register",
    value: function register(modalId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      try {
        var element = document.getElementById(modalId);
        if (!element) {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.warn("ModalManager: Element not found for modal ID ".concat(modalId), null, 2);
          return false;
        }
        this.modals[modalId] = {
          element: element,
          isOpen: false,
          options: options
        };
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ModalManager: Registered modal - ".concat(modalId), null, 3);
        return true;
      } catch (error) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error("ModalManager: Error registering modal - ".concat(modalId), error, 1);
        return false;
      }
    }

    /**
     * Register a callback to be executed before opening a modal
     * @param {string} modalId - ID of the modal
     * @param {Function} callback - Function to execute before opening
     * @returns {boolean} Success status
     */
  }, {
    key: "registerBeforeOpenCallback",
    value: function registerBeforeOpenCallback(modalId, callback) {
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
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ModalManager: Registered before-open callback for modal ".concat(modalId), null, 2);
        return true;
      } catch (error) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error("ModalManager: Error registering before-open callback for modal ".concat(modalId), error, 1);
        return false;
      }
    }

    /**
     * Open a modal by ID
     * @param {string} modalId - ID of the modal to open
     * @returns {boolean} Success status
     */
  }, {
    key: "open",
    value: function open(modalId) {
      try {
        var modal = this.modals[modalId];
        if (!modal) {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.warn("ModalManager: Cannot open modal ".concat(modalId, " - not registered"), null, 2);

          // Forcefully try to find the modal element even if not registered
          var element = document.getElementById(modalId);
          if (element) {
            _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ModalManager: Found unregistered modal element ".concat(modalId, ", registering now"), null, 2);
            this.register(modalId, {
              element: element
            });
            this._showModal(modalId);
            return true;
          }
          return false;
        }

        // Execute any registered before-open callbacks
        if (modal.beforeOpenCallbacks && modal.beforeOpenCallbacks.length > 0) {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ModalManager: Executing ".concat(modal.beforeOpenCallbacks.length, " before-open callbacks for modal ").concat(modalId), null, 2);
          modal.beforeOpenCallbacks.forEach(function (callback) {
            try {
              callback();
            } catch (err) {
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error("ModalManager: Error in before-open callback for modal ".concat(modalId), err, 1);
            }
          });
        }
        this._showModal(modalId);
        return true;
      } catch (error) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error("ModalManager: Error opening modal ".concat(modalId, ":"), error, 2);
        return false;
      }
    }

    /**
     * Show a modal
     * @private
     * @param {string} modalId - Modal ID to show
     */
  }, {
    key: "_showModal",
    value: function _showModal(modalId) {
      var modal = this.modals[modalId];
      if (!modal) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.warn("ModalManager: Modal ".concat(modalId, " not found"), null, 2);
        return;
      }

      // Set as active modal - important for proper backdrop handling
      this.activeModal = modalId;

      // Show backdrop
      var backdrop = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.BACKDROP.name());
      if (backdrop) {
        backdrop.style.display = 'block';
        setTimeout(function () {
          backdrop.style.opacity = '1';
        }, 10);
      }

      // IMPORTANT: Force modal display style using direct manipulation
      // Show modal with animation - set display IMMEDIATELY
      modal.element.style.display = 'block';
      modal.element.style.opacity = '0';

      // Debug logs to help diagnose modal display issues
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ModalManager: Setting modal ".concat(modalId, " display to block"), {
        modalElement: modal.element.id,
        displayBefore: modal.element.style.display
      }, 2);

      // Apply animation
      setTimeout(function () {
        modal.element.style.opacity = '1';
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ModalManager: Fading in modal ".concat(modalId), null, 3);
      }, 10);
      modal.isOpen = true;

      // Handle fullscreen if needed
      if (modalId === _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.PREVIEW.name()) {
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
  }, {
    key: "_hideModal",
    value: function _hideModal(modalId) {
      var _this3 = this;
      var modal = this.modals[modalId];
      if (!modal) return;

      // Fade out
      modal.element.style.opacity = '0';

      // After animation completes
      setTimeout(function () {
        modal.element.style.display = 'none';
        modal.isOpen = false;

        // Hide backdrop if this is the currently active modal
        if (_this3.activeModal === modalId) {
          var backdrop = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.BACKDROP.name());
          if (backdrop) {
            backdrop.style.opacity = '0';

            // Hide backdrop after fade-out animation
            setTimeout(function () {
              backdrop.style.display = 'none';
            }, 150);
          }

          // Reset body scrolling
          document.body.style.overflow = '';
          _this3.activeModal = null;
        }
      }, 250); // Match transition duration
    }

    /**
     * Close a modal by ID
     * @param {string} modalId - ID of the modal to close
     * @returns {boolean} Success status
     */
  }, {
    key: "close",
    value: function close(modalId) {
      try {
        if (!this.modals[modalId]) {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.warn("ModalManager: Modal not found - ".concat(modalId), null, 2);
          return false;
        }
        this._hideModal(modalId);
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ModalManager: Closed modal - ".concat(modalId), null, 3);
        return true;
      } catch (error) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error("ModalManager: Error closing modal - ".concat(modalId), error, 1);
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
  }, {
    key: "setContent",
    value: function setContent(modalId, content) {
      var contentSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      try {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ModalManager: Setting content for modal ".concat(modalId), {
          contentType: _typeof(content),
          contentLength: typeof content === 'string' ? content.length : 'Element',
          contentPreview: typeof content === 'string' ? content.substring(0, 150) + '...' : 'Element object',
          targetSelector: contentSelector
        }, 2);
        var modal = this.modals[modalId];
        if (!modal) {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error("ModalManager: Modal not found - ".concat(modalId), null, 1);
          return false;
        }

        // Find the content container
        var container;
        if (contentSelector) {
          var _container;
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ModalManager: Looking for content container with selector: ".concat(contentSelector), null, 2);
          // Check if contentSelector is an ID without # prefix
          if (!contentSelector.startsWith('#') && !contentSelector.startsWith('.')) {
            container = document.getElementById(contentSelector);
            _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ModalManager: Tried getElementById with: ".concat(contentSelector, ", found: ").concat(!!container), null, 2);
          }

          // If not found or not an ID, try as a selector
          if (!container) {
            container = document.querySelector(contentSelector);
            _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ModalManager: Tried querySelector with: ".concat(contentSelector, ", found: ").concat(!!container), null, 2);
          }

          // Log container details
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ModalManager: Container lookup result:", {
            found: !!container,
            id: ((_container = container) === null || _container === void 0 ? void 0 : _container.id) || 'none',
            classList: container ? Array.from(container.classList) : []
          }, 2);
        } else {
          container = modal.element.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.CONTENT);
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ModalManager: Using default content container:", {
            found: !!container,
            selector: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.CONTENT
          }, 2);
          if (!container) {
            _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error("ModalManager: Content container not found - ".concat(modalId), null, 1);
            return false;
          }
        }
        if (!container) {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error("ModalManager: Could not find content container with selector: ".concat(contentSelector), null, 1);
          return false;
        }

        // Set the content
        if (typeof content === 'string') {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ModalManager: Setting HTML content for modal ".concat(modalId), {
            contentLength: content.length,
            containsPre: content.includes('<pre'),
            container: container.id || container.className
          }, 2);
          container.innerHTML = content;

          // Verify the content was set correctly
          var hasPreElements = container.querySelectorAll('pre').length > 0;
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ModalManager: Content set verification:", {
            hasPreElements: hasPreElements,
            innerHTML: container.innerHTML.substring(0, 100) + '...'
          }, 2);
          if (content.includes('<pre') && !hasPreElements) {
            _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.warn("ModalManager: Content included <pre> tags but none found after setting innerHTML", {
              innerHtmlLength: container.innerHTML.length
            }, 1);
          }
        } else if (content instanceof Element) {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ModalManager: Setting Element content for modal ".concat(modalId), {
            elementType: content.tagName,
            elementId: content.id || 'none'
          }, 2);
          container.innerHTML = '';
          container.appendChild(content);
        } else {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error("ModalManager: Invalid content type - ".concat(_typeof(content)), null, 1);
          return false;
        }
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("ModalManager: Content set for modal - ".concat(modalId), null, 3);
        return true;
      } catch (error) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error("ModalManager: Error setting content - ".concat(modalId), error, 1);
        return false;
      }
    }

    /**
     * Set fullscreen size for modal
     * @param {Element} modalElement - Modal DOM element
     * @returns {boolean} Success status
     */
  }, {
    key: "setFullscreenSize",
    value: function setFullscreenSize(modalElement) {
      try {
        if (!modalElement) {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.warn('ModalManager: Modal element not provided for fullscreen', null, 2);
          return false;
        }

        // Add fullscreen class
        modalElement.classList.add(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.FULLSCREEN.name());

        // Calculate and set the height
        var headerHeight = modalElement.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.HEADER) ? modalElement.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.HEADER).offsetHeight : 0;
        var content = modalElement.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.CONTENT);
        if (content) {
          content.style.height = "calc(100% - ".concat(headerHeight, "px)");
        }
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('ModalManager: Modal set to fullscreen size', null, 3);
        return true;
      } catch (error) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error('ModalManager: Error setting fullscreen size', error, 1);
        return false;
      }
    }

    /**
     * Creates a code copy modal for displaying and copying code snippets
     * @param {string} codeText - The code text to display in the modal
     * @returns {string} Modal ID
     */
  }, {
    key: "createCopyModal",
    value: function createCopyModal(codeText) {
      var _this4 = this;
      var modalId = _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.CODE_COPY.name();
      // Get translations
      var translationManager = _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_3__/* .TranslationManager */ .n.getInstance();

      // Create modal if it doesn't exist yet
      if (!this.modals[modalId]) {
        this.createModal({
          id: modalId,
          title: translationManager.get('copyCode'),
          contentId: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.COPY_CONTENT.name(),
          modalClass: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.FIXED_FOOTER.name(),
          headerClass: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.HEADER_FIXED.name(),
          footerButtons: [{
            "class": "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.CLOSE.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON_SECONDARY.name())
          }]
        });
      }

      // Create content with textarea and copy button
      var safeText = this._escapeHtml(codeText);
      var content = "\n            <div class=\"".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.COPY.MODAL.DIALOG.name(), "\">\n                <p class=\"").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.COPY.MODAL.INSTRUCTIONS.name(), "\">").concat(translationManager.get('copyInstructions'), "</p>\n                <div class=\"").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.COPY.MODAL.TEXTAREA.name(), "\">\n                    <textarea id=\"").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.COPY.MODAL.TEXTAREA_ELEM.name(), "\" class=\"").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.COPY.MODAL.TEXTAREA_ELEM.name(), "\">").concat(safeText, "</textarea>\n                </div>\n                <div class=\"").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.COPY.MODAL.ACTIONS.name(), "\">\n                    <button id=\"").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.COPY.MODAL.BUTTON.name(), "\" class=\"").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.COPY.MODAL.BUTTON.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON_PRIMARY.name(), "\">\n                        ").concat(_utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__/* .DOMUtils */ .e.getIconHtml('copy', {
        classes: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.MARGIN_END_2.name()
      }), "\n                        <span>").concat(translationManager.get('copyToClipboard'), "</span>\n                    </button>\n                </div>\n            </div>\n        ");

      // Set content
      this.setContent(modalId, content, _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.COPY_CONTENT.name());

      // Set up event handlers after a short delay to ensure DOM is ready
      setTimeout(function () {
        var textarea = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.COPY.MODAL.TEXTAREA_ELEM.name());
        var copyBtn = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.COPY.MODAL.BUTTON.name());
        if (textarea) {
          // Select all text when focused
          textarea.addEventListener('focus', function () {
            this.select();
          });

          // Initial focus and select
          textarea.select();
        }
        if (copyBtn && textarea) {
          copyBtn.addEventListener('click', function () {
            var _this5 = this;
            // Focus and select the textarea
            textarea.select();
            try {
              var _navigator$clipboard;
              // Try to copy using clipboard API or fallback to execCommand
              var success = false;
              if ((_navigator$clipboard = navigator.clipboard) !== null && _navigator$clipboard !== void 0 && _navigator$clipboard.writeText) {
                navigator.clipboard.writeText(textarea.value).then(function () {
                  _this5._showCopySuccess(copyBtn);
                  _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('ModalManager: Successfully copied using Clipboard API', null, 3);
                })["catch"](function (_err) {
                  // Fallback to execCommand
                  // @SuppressWarnings(javascript:S1874) - Keeping for browser compatibility
                  success = document.execCommand('copy');
                  if (success) {
                    _this5._showCopySuccess(copyBtn);
                    _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('ModalManager: Successfully copied using execCommand fallback', null, 3);
                  } else {
                    _this5._showCopyFailure(copyBtn);
                    _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.warn('ModalManager: Copy failed with execCommand fallback', null, 2);
                  }
                });
              } else {
                // Try execCommand directly
                // @SuppressWarnings(javascript:S1874) - Keeping for browser compatibility
                success = document.execCommand('copy');
                if (success) {
                  this._showCopySuccess(copyBtn);
                  _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('ModalManager: Successfully copied using execCommand', null, 3);
                } else {
                  this._showCopyFailure(copyBtn);
                  _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.warn('ModalManager: Copy failed with execCommand', null, 2);
                }
              }
            } catch (err) {
              this._showCopyFailure(copyBtn);
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error('ModalManager: Error during copy operation', err, 2);
            }
          }.bind(_this4)); // Bind to modal manager for access to helper methods
        }
      }, 300);
      return modalId;
    }

    /**
     * Show success state on copy button
     * @param {HTMLElement} button - Button element
     * @private
     */
  }, {
    key: "_showCopySuccess",
    value: function _showCopySuccess(button) {
      var translationManager = _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_3__/* .TranslationManager */ .n.getInstance();
      button.innerHTML = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__/* .DOMUtils */ .e.getIconHtml('check-circle', {
        classes: 'vdm-icon--success ' + _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.MARGIN_END_2.name()
      }) + "<span>".concat(translationManager.get('copied'), "</span>");
      button.classList.remove(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON_PRIMARY.name());
      button.classList.add(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON_SUCCESS.name());
      setTimeout(function () {
        button.innerHTML = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__/* .DOMUtils */ .e.getIconHtml('copy', {
          classes: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.MARGIN_END_2.name()
        }) + "<span>".concat(translationManager.get('copyToClipboard'), "</span>");
        button.classList.remove(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON_SUCCESS.name());
        button.classList.add(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON_PRIMARY.name());
      }, 2000);
    }

    /**
     * Show failure state on copy button
     * @param {HTMLElement} button - Button element
     * @private
     */
  }, {
    key: "_showCopyFailure",
    value: function _showCopyFailure(button) {
      var translationManager = _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_3__/* .TranslationManager */ .n.getInstance();
      button.innerHTML = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__/* .DOMUtils */ .e.getIconHtml('exclamation-triangle', {
        classes: 'vdm-icon--danger ' + _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.MARGIN_END_2.name()
      }) + "<span>".concat(translationManager.get('copyFailed'), "</span>");
      button.classList.remove(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON_PRIMARY.name());
      button.classList.add(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON_DANGER.name());
      setTimeout(function () {
        button.innerHTML = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__/* .DOMUtils */ .e.getIconHtml('copy', {
          classes: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.MARGIN_END_2.name()
        }) + "<span>".concat(translationManager.get('tryAgain'), "</span>");
        button.classList.remove(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON_DANGER.name());
        button.classList.add(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON_PRIMARY.name());
      }, 2000);
    }

    /**
     * Escape HTML entities in a string
     * @param {string} html - String to escape
     * @returns {string} Escaped string
     * @private
     */
  }, {
    key: "_escapeHtml",
    value: function _escapeHtml(html) {
      if (!html) return '';
      return html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    /**
     * Create a modal dynamically with content and open it immediately
     * @param {Object} config - Modal configuration (see createModal)
     * @param {string|Element} content - Content to set in the modal
     * @param {string} [contentSelector] - Optional content container selector
     * @returns {string} Modal ID
     */
  }, {
    key: "createAndOpenModal",
    value: function createAndOpenModal(config, content) {
      var contentSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
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
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error('ModalManager: Error creating and opening modal', error, 1);
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
  }, {
    key: "createConfirmationModal",
    value: function createConfirmationModal(options) {
      var _this6 = this;
      var modalId = 'vdm-modal--confirmation-' + Date.now();

      // Create modal
      this.createModal({
        id: modalId,
        title: options.title || 'Confirmation',
        contentId: 'vdm-modal__confirmation-content',
        contentClass: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.PADDING_3.name(),
        footerButtons: [{
          id: "".concat(modalId, "-cancel-btn"),
          text: options.cancelText || 'Cancel',
          "class": "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.CLOSE.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON_SECONDARY.name(), " me-2")
        }, {
          id: "".concat(modalId, "-confirm-btn"),
          text: options.confirmText || 'Confirm',
          "class": "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON_PRIMARY.name())
        }],
        events: _defineProperty(_defineProperty({}, "#".concat(modalId, "-confirm-btn"), {
          click: function click() {
            if (typeof options.onConfirm === 'function') {
              options.onConfirm();
            }
            _this6.close(modalId);
          }
        }), "#".concat(modalId, "-cancel-btn"), {
          click: function click() {
            if (typeof options.onCancel === 'function') {
              options.onCancel();
            }
            _this6.close(modalId);
          }
        })
      });

      // Set message content
      this.setContent(modalId, "<p>".concat(options.message || '', "</p>"), 'vdm-modal__confirmation-content');

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
  }, {
    key: "createAlertModal",
    value: function createAlertModal(options) {
      var _this7 = this;
      var modalId = "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.CONTAINER.name(), "--alert-").concat(Date.now());

      // Determine alert class based on type
      var alertClass = options.type ? "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.ALERT, " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.ALERT_PREFIX).concat(options.type) : "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.ALERT, " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.ALERT_INFO);

      // Create modal
      this.createModal({
        id: modalId,
        title: options.title || 'Alert',
        contentId: "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.CONTAINER.name(), "__alert-content"),
        contentClass: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.PADDING_3.name(),
        footerButtons: [{
          id: "".concat(modalId, "-ok-btn"),
          text: options.buttonText || 'OK',
          "class": "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.CLOSE.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.UTILITY.BUTTON_PRIMARY.name())
        }],
        events: _defineProperty({}, "#".concat(modalId, "-ok-btn"), {
          click: function click(e) {
            if (typeof options.onClose === 'function') {
              options.onClose(e);
            }
            _this7.close(modalId);
          }
        })
      });

      // Create alert content
      var alertContent = "\n            <div class=\"".concat(alertClass, " mb-0\">\n                ").concat(options.message || '', "\n            </div>\n        ");

      // Set content
      this.setContent(modalId, alertContent, "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.MODAL.CONTAINER.name(), "__alert-content"));

      // Open the modal
      this.open(modalId);
      return modalId;
    }

    /**
     * Destroy all modal instances and clean up
     */
  }, {
    key: "destroy",
    value: function destroy() {
      try {
        // Close any open modal
        if (this.activeModal) {
          this.close(this.activeModal);
        }

        // Reset all modal references
        this.modals = {};
        this.activeModal = null;
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('ModalManager: Destroyed', null, 2);
      } catch (error) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error('ModalManager: Error during destroy', error, 1);
      }
    }
  }], [{
    key: "getInstance",
    value:
    /**
     * Get the singleton instance
     * @param {Object} options - Configuration options (only used during first initialization)
     * @returns {ModalManager} The singleton instance
     */
    function getInstance() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!instance) {
        instance = new ModalManager(options);
      }
      return instance;
    }
  }]);
}(_utils_BaseSingleton__WEBPACK_IMPORTED_MODULE_4__/* .BaseSingleton */ .t);

/***/ }),

/***/ 878:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ MergeUIController)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(979);
/* harmony import */ var _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(759);
/* harmony import */ var _utils_MergeContentFormatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(533);
/* harmony import */ var _utils_NavigationUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(343);
/* harmony import */ var _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(428);
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(762);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }







/**
 * Controls merge UI elements and interactions
 */
var MergeUIController = /*#__PURE__*/function () {
  /**
   * Initialize UI controller
   * @param {MergeHandler} mergeHandler - Parent merge handler
   */
  function MergeUIController(mergeHandler) {
    _classCallCheck(this, MergeUIController);
    this.mergeHandler = mergeHandler;
    this.diffViewer = mergeHandler.diffViewer;
    this.modalManager = mergeHandler.modalManager;
    this.translationManager = _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_4__/* .TranslationManager */ .n.getInstance();

    // UI element references
    this.mergeDestination = null;
    this.mergeToggleBtn = null;
    this.mergeToggleIcon = null;
    this.mergeToggleText = null;
  }

  /**
   * Initialize UI elements and event handlers
   */
  return _createClass(MergeUIController, [{
    key: "initialize",
    value: function initialize() {
      // Initialize merge destination toggle
      this.initMergeDestinationToggle();

      // Set up modal buttons
      this.setupModalButtons();

      // Set up apply merge button
      this.setupApplyMergeButton();
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Initialized', null, 2);
    }

    /**
     * Initialize merge destination toggle
     */
  }, {
    key: "initMergeDestinationToggle",
    value: function initMergeDestinationToggle() {
      // Get the necessary elements
      this.mergeDestination = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__/* .DOMUtils */ .e.getElement(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MERGE.DESTINATION_DROPDOWN);
      this.mergeToggleBtn = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__/* .DOMUtils */ .e.getElement(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MERGE.DESTINATION_TOGGLE);

      // Get toggle icon and text by proper IDs, not using name()
      this.mergeToggleIcon = document.getElementById('vdm-merge-controls__toggle-icon');
      this.mergeToggleText = document.getElementById('vdm-merge-controls__toggle-text');
      if (!this.mergeDestination || !this.mergeToggleBtn) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.warn('MergeUIController: Missing merge destination elements', null, 2);
        return;
      }

      // Explicitly set type="button" on toggle button to prevent form submission
      if (this.mergeToggleBtn) {
        this.mergeToggleBtn.setAttribute('type', 'button');
      }

      // ALWAYS populate the dropdown options regardless of current state
      // This ensures configuration-based options are always used
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Populating merge destination options', null, 2);
      this.populateMergeDestinations();

      // Load saved preference or default to 'new'
      var savedDestination = localStorage.getItem('preferredMergeDestination') || 'new';

      // Ensure the value exists in the dropdown
      var valueExists = false;
      for (var i = 0; i < this.mergeDestination.options.length; i++) {
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
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("MergeUIController: Initial merge destination set to ".concat(this.mergeDestination.value), null, 2);

      // Set up event handlers
      this.setupMergeToggleEvents();
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Merge destination toggle initialized', null, 2);
    }

    /**
     * Populate merge destination dropdown
     */
  }, {
    key: "populateMergeDestinations",
    value: function populateMergeDestinations() {
      var _diffData$new, _runtimeProps$filepat, _diffData$old;
      // Get runtime properties
      var runtimeProps = this.diffViewer.getRuntimeProps();

      // Get diffData which contains file information
      var diffData = runtimeProps.diffData || {};

      // Get filenames from the appropriate sources using the new pattern (no server paths)
      // Prefer new secure properties (newFileName, oldFileName) that only contain the filename
      var newFileName = runtimeProps.newFileName || ((_diffData$new = diffData["new"]) === null || _diffData$new === void 0 ? void 0 : _diffData$new.filename) || ((_runtimeProps$filepat = runtimeProps.filepath) === null || _runtimeProps$filepat === void 0 ? void 0 : _runtimeProps$filepat.split('/').pop()) || 'new-file';
      var oldFileName = runtimeProps.oldFileName || ((_diffData$old = diffData.old) === null || _diffData$old === void 0 ? void 0 : _diffData$old.filename) || 'old-file';

      // Clean filenames - ensure we're only using the basename without any path components
      var newFile = newFileName.split(/[\/\\]/).pop();
      var oldFile = oldFileName.split(/[\/\\]/).pop();
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: File names for merge destinations', {
        newFileName: newFileName,
        oldFileName: oldFileName,
        newFile: newFile,
        oldFile: oldFile
      }, 3);

      // Create merged filenames
      var newFileWithoutExt = newFile.substring(0, newFile.lastIndexOf('.')) || newFile;
      var oldFileWithoutExt = oldFile.substring(0, oldFile.lastIndexOf('.')) || oldFile;
      var newFileExt = newFile.substring(newFile.lastIndexOf('.')) || '';
      var oldFileExt = oldFile.substring(oldFile.lastIndexOf('.')) || '';
      var newMergedFile = "".concat(newFileWithoutExt, "-merged").concat(newFileExt);
      var oldMergedFile = "".concat(oldFileWithoutExt, "-merged").concat(oldFileExt);

      // Get configuration for enabled save options
      var config = this.diffViewer.getConfig();
      var saveOptions = (config === null || config === void 0 ? void 0 : config.saveOptions) || {
        saveToOriginal: true,
        saveWithSuffix: true,
        saveToOld: true,
        saveToOldWithSuffix: true,
        saveToBoth: true,
        saveToBothWithSuffix: true
      };
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Save options configuration', saveOptions, 3);

      // IMPORTANT: Always clear ALL existing options to ensure we start fresh
      while (this.mergeDestination.options.length > 0) {
        this.mergeDestination.remove(0);
      }

      // Alternative method to clear options for cross-browser compatibility
      this.mergeDestination.innerHTML = '';
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Cleared existing dropdown options', null, 3);
      var optionCount = 0;

      // Add options based on configuration
      if (saveOptions.saveToOriginal) {
        _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__/* .DOMUtils */ .e.createAndAppendElement('option', this.mergeDestination, {
          attributes: {
            value: 'new',
            'data-tooltip': this.translationManager.get('saveToOriginalTooltip', 'Replace the current file with merged content')
          },
          content: "".concat(newFile, " (new)")
        });
        optionCount++;
      }
      if (saveOptions.saveWithSuffix) {
        _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__/* .DOMUtils */ .e.createAndAppendElement('option', this.mergeDestination, {
          attributes: {
            value: 'new-suffix',
            'data-tooltip': this.translationManager.get('saveWithSuffixTooltip', 'Save merged content as a new file with -merged suffix')
          },
          content: "".concat(newMergedFile, " (new)")
        });
        optionCount++;
      }
      if (saveOptions.saveToOld) {
        _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__/* .DOMUtils */ .e.createAndAppendElement('option', this.mergeDestination, {
          attributes: {
            value: 'old',
            'data-tooltip': this.translationManager.get('saveToOldTooltip', 'Replace the old file with merged content')
          },
          content: "".concat(oldFile, " (old)")
        });
        optionCount++;
      }
      if (saveOptions.saveToOldWithSuffix) {
        _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__/* .DOMUtils */ .e.createAndAppendElement('option', this.mergeDestination, {
          attributes: {
            value: 'old-suffix',
            'data-tooltip': this.translationManager.get('saveToOldWithSuffixTooltip', 'Save merged content as a new file with -merged suffix in old location')
          },
          content: "".concat(oldMergedFile, " (old)")
        });
        optionCount++;
      }
      if (saveOptions.saveToBoth) {
        _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__/* .DOMUtils */ .e.createAndAppendElement('option', this.mergeDestination, {
          attributes: {
            value: 'both',
            'data-tooltip': this.translationManager.get('saveToBothTooltip', 'Replace both old and new files with merged content')
          },
          content: this.translationManager.get('saveToBoth', 'Overwrite both files')
        });
        optionCount++;
      }
      if (saveOptions.saveToBothWithSuffix) {
        _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__/* .DOMUtils */ .e.createAndAppendElement('option', this.mergeDestination, {
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
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: No save options enabled, adding default option', null, 2);
        _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__/* .DOMUtils */ .e.createAndAppendElement('option', this.mergeDestination, {
          attributes: {
            value: 'new',
            'data-tooltip': this.translationManager.get('saveToOriginalTooltip', 'Replace the current file with merged content')
          },
          content: "".concat(newFile, " (new)")
        });
        optionCount = 1;
      }
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("MergeUIController: Populated merge destinations with ".concat(optionCount, " options"), null, 2);
    }

    /**
     * Set up merge toggle button events
     */
  }, {
    key: "setupMergeToggleEvents",
    value: function setupMergeToggleEvents() {
      var _this = this;
      // Create event handlers
      var toggleHandler = function toggleHandler(event) {
        // Prevent default action and stop propagation
        event.preventDefault();
        event.stopPropagation();

        // We need a better approach to open the dropdown - the current method doesn't work in all browsers
        if (_this.mergeDestination) {
          // Instead of trying to simulate a click, make the dropdown visible
          // First, directly focus the element to prepare it
          _this.mergeDestination.focus();

          // If the browser supports it, use the showPicker method
          if (typeof _this.mergeDestination.showPicker === 'function') {
            try {
              _this.mergeDestination.showPicker();
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Opened dropdown using showPicker()', null, 3);
              return;
            } catch (e) {
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: showPicker() failed, trying alternative method', e, 2);
            }
          }

          // Alternative: Use a small delay and click to open
          setTimeout(function () {
            try {
              // Create and dispatch a mouse event
              var clickEvent = new MouseEvent('mousedown', {
                bubbles: true,
                cancelable: true,
                view: window
              });
              _this.mergeDestination.dispatchEvent(clickEvent);
            } catch (e) {
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Failed to open dropdown with click event', e, 2);
            }
          }, 10);

          // If all else fails, make the select element very noticeable to prompt user interaction
          _this.mergeDestination.classList.add('vdm-dropdown-highlight');
          setTimeout(function () {
            _this.mergeDestination.classList.remove('vdm-dropdown-highlight');
          }, 1000);
        }
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Toggle button clicked, attempting to open dropdown', null, 3);
      };
      var changeHandler = function changeHandler() {
        // Update appearance and save preference
        _this.updateMergeToggle(_this.mergeDestination.value);
        localStorage.setItem('preferredMergeDestination', _this.mergeDestination.value);
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("MergeUIController: Selection changed to ".concat(_this.mergeDestination.value), null, 3);
      };

      // Remove any existing listeners using cloneNode
      var newToggleBtn = this.mergeToggleBtn.cloneNode(true);
      var newMergeDestination = this.mergeDestination.cloneNode(true);

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
        this.mergeToggleIcon = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__/* .DOMUtils */ .e.createAndAppendElement('i', this.mergeToggleBtn, {
          id: 'vdm-merge-controls__toggle-icon'
        });
        this.mergeToggleBtn.insertBefore(this.mergeToggleIcon, this.mergeToggleBtn.firstChild);
      } else {
        this.mergeToggleIcon = this.mergeToggleBtn.querySelector('#vdm-merge-controls__toggle-icon');
      }
      if (!this.mergeToggleBtn.querySelector('#vdm-merge-controls__toggle-text')) {
        this.mergeToggleText = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__/* .DOMUtils */ .e.createAndAppendElement('span', this.mergeToggleBtn, {
          id: 'vdm-merge-controls__toggle-text'
        });
      } else {
        this.mergeToggleText = this.mergeToggleBtn.querySelector('#vdm-merge-controls__toggle-text');
      }

      // Enhance dropdown appearance to make it more visible
      this.mergeDestination.classList.add('vdm-dropdown-visible');
      this.mergeDestination.style.cursor = 'pointer';

      // Add a small down arrow icon to the toggle button to indicate it opens a dropdown
      var dropdownIcon = document.createElement('span');
      dropdownIcon.className = _constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.UTILITY.MARGIN_START_2.name(); // Using the correct end start class
      dropdownIcon.innerHTML = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__/* .DOMUtils */ .e.getIconHtml('chevron-down', {
        width: 10,
        height: 10
      });
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
      this.mergeDestination.addEventListener('mouseover', function () {
        _this.mergeDestination.style.borderColor = 'var(--vdm-primary, #0d6efd)';
      });
      this.mergeDestination.addEventListener('mouseout', function () {
        _this.mergeDestination.style.borderColor = 'var(--vdm-border-color, #495057)';
      });

      // Re-apply the toggle styling AFTER cloning
      this.updateMergeToggle(this.mergeDestination.value);
    }

    /**
     * Update merge toggle button appearance
     */
  }, {
    key: "updateMergeToggle",
    value: function updateMergeToggle(value) {
      // Define color classes for different destination types
      var newFileColorClass = 'vdm-text-primary'; // Purple for new file destinations
      var oldFileColorClass = 'vdm-text-warning'; // Amber for old file destinations
      var bothFilesColorClass = 'vdm-text-info'; // Turquoise for both files destinations

      // Define button style classes that match the color theme
      var newFileBtnClass = _constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.UTILITY.BUTTON_PRIMARY.name(); // Purple button
      var oldFileBtnClass = _constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.UTILITY.BUTTON_WARNING.name(); // Amber button
      var bothFilesBtnClass = _constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.UTILITY.BUTTON_INFO.name(); // Turquoise button

      // Create single SVG icon HTML for each destination state with appropriate color class
      // Always use a single icon per destination type with color indicating the destination
      var iconHtml = '';
      var colorClass = '';
      var buttonClass = '';

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
      var iconClasses = "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.UTILITY.MARGIN_END_1.name(), " ").concat(colorClass);
      this.mergeToggleIcon.innerHTML = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__/* .DOMUtils */ .e.getIconHtml(iconHtml, {
        classes: iconClasses
      });

      // Update the Apply Merge button style to match the destination
      var applyButton = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MERGE.BUTTON_APPLY.name());
      if (applyButton) {
        // Remove any existing button style classes
        applyButton.classList.remove(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.UTILITY.BUTTON_PRIMARY.name(), _constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.UTILITY.BUTTON_WARNING.name(), _constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.UTILITY.BUTTON_INFO.name(), _constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.UTILITY.BUTTON_SUCCESS.name(), _constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.UTILITY.BUTTON_DANGER.name(), _constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.UTILITY.BUTTON_SECONDARY.name());

        // Add the appropriate button style class
        applyButton.classList.add(buttonClass);
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("MergeUIController: Updated apply button style to ".concat(buttonClass), null, 3);
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
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("MergeUIController: Toggle updated to ".concat(value), null, 3);
    }

    /**
     * Set up modal buttons
     */
  }, {
    key: "setupModalButtons",
    value: function setupModalButtons() {
      var _this2 = this;
      // Add a direct event listener to the document for clicks on modal buttons
      document.addEventListener('click', function (event) {
        // Handle continue merging button
        if (event.target.closest && event.target.closest("#".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MODAL.CONTINUE_BTN.name()))) {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Continue merging button clicked via delegation', null, 2);
          _this2.modalManager.close(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MERGE.CONFLICT_MODAL.name());

          // Also close the preview modal - use MODAL.PREVIEW instead of MERGE.PREVIEW_MODAL
          var previewModalId = _constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MODAL.PREVIEW.name();
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("MergeUIController: Also closing preview modal (ID: ".concat(previewModalId, ")"), null, 1);
          _this2.modalManager.close(previewModalId);
          setTimeout(function () {
            _this2.highlightUnresolvedChunks();
          }, 400);
        }

        // Handle merge anyway button
        if (event.target.closest && event.target.closest("#".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MODAL.MERGE_BTN.name()))) {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Merge anyway button clicked via delegation', null, 2);
          _this2.modalManager.close(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MERGE.CONFLICT_MODAL.name());
          _this2.mergeHandler.proceedWithMerge(_this2.getMergeType());
        }
      });

      // For compatibility, still register the before-open callback as well
      if (this.modalManager && typeof this.modalManager.registerBeforeOpenCallback === 'function') {
        this.modalManager.registerBeforeOpenCallback(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MERGE.CONFLICT_MODAL.name(), function () {
          // Log the presence of the buttons when the modal opens
          var continueBtn = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MODAL.CONTINUE_BTN.name());
          var mergeBtn = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MODAL.MERGE_BTN.name());
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("MergeUIController: Modal opened, buttons present: continueBtn=".concat(!!continueBtn, ", mergeBtn=").concat(!!mergeBtn), null, 2);

          // Add direct click handlers (as a backup)
          if (continueBtn) {
            continueBtn.onclick = function () {
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Continue merging clicked via direct handler', null, 2);
              _this2.modalManager.close(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MERGE.CONFLICT_MODAL.name());

              // Also close the preview modal - use MODAL.PREVIEW instead of MERGE.PREVIEW_MODAL
              var previewModalId = _constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MODAL.PREVIEW.name();
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("MergeUIController: Also closing preview modal (ID: ".concat(previewModalId, ")"), null, 1);
              _this2.modalManager.close(previewModalId);
              setTimeout(function () {
                _this2.highlightUnresolvedChunks();
              }, 400);
              return false; // Prevent default
            };
          }
          if (mergeBtn) {
            mergeBtn.onclick = function () {
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Merge anyway clicked via direct handler', null, 2);
              _this2.modalManager.close(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MERGE.CONFLICT_MODAL.name());
              _this2.mergeHandler.proceedWithMerge(_this2.getMergeType());
              return false; // Prevent default
            };
          }
        });
      }
    }

    /**
     * Set up apply merge button
     */
  }, {
    key: "setupApplyMergeButton",
    value: function setupApplyMergeButton() {
      var _this3 = this;
      // Get the Apply Merge button
      var applyButton = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MERGE.BUTTON_APPLY.name());
      if (!applyButton) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.warn('MergeUIController: Apply merge button not found', null, 2);
        return;
      }

      // Get the merge controls actions container
      var mergeControlsActions = document.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MERGE.CONTROLS_ACTIONS.toString());
      if (!mergeControlsActions) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.warn('MergeUIController: Merge controls container not found', null, 2);
        return;
      }

      // Get the merge destination dropdown and toggle button
      var destinationDropdown = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MERGE.DESTINATION_DROPDOWN.name());
      var toggleButton = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MERGE.DESTINATION_TOGGLE.name());

      // Create a form element to wrap the merge controls
      var form = document.createElement('form');
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
          var destinationContainer = document.querySelector('.vdm-merge-controls__destination');
          if (destinationContainer) {
            form.insertBefore(destinationContainer, form.firstChild);
          }
        }
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Created form wrapper for merge controls', null, 2);
      }

      // Listen for form submission instead of button click
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        _this3.handleApplyMerge();
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Form submitted', null, 3);
      });

      // Important: Prevent the toggle button from submitting the form
      if (toggleButton) {
        toggleButton.type = 'button'; // Explicitly set type to 'button' to prevent form submission

        // Add a click handler that stops propagation
        toggleButton.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();

          // The toggle logic is already in setupMergeToggleEvents
          // This is just to prevent form submission
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Toggle button click intercepted to prevent form submission', null, 3);
        });
      }

      // For backwards compatibility, also keep the button click handler
      applyButton.addEventListener('click', function (event) {
        event.preventDefault();
        // Validate that the button is inside the form
        if (applyButton.form) {
          applyButton.form.dispatchEvent(new Event('submit'));
        } else {
          _this3.handleApplyMerge();
        }
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Apply merge clicked', null, 3);
      });
    }

    /**
     * Handle the apply merge button click
     */
  }, {
    key: "handleApplyMerge",
    value: function handleApplyMerge() {
      // Count unresolved conflicts
      var unresolvedCount = this.countUnresolvedConflicts();
      if (unresolvedCount > 0) {
        this.showConflictModal(unresolvedCount);
      } else {
        // Check if we're in file-browser mode or not by checking for fileRefId
        var runtimeProps = this.diffViewer.getRuntimeProps();
        var fileRefId = runtimeProps.fileRefId || '';
        var oldFileRefId = runtimeProps.oldFileRefId || '';

        // If neither fileRefId exists, we're in a non-file-browser mode
        // (text-compare, url-compare, file-upload)
        if (!fileRefId && !oldFileRefId) {
          // Use 'clipboard' merge type for non-file-browser modes
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Using clipboard merge type for non-file-browser mode', null, 2);
          this.mergeHandler.proceedWithMerge('clipboard');
        } else {
          // Use selected merge type for file-browser mode
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Using selected merge type for file-browser mode', null, 2);
          this.mergeHandler.proceedWithMerge(this.getMergeType());
        }
      }
    }

    /**
     * Count unresolved conflicts
     * @returns {number} Number of unresolved conflicts
     */
  }, {
    key: "countUnresolvedConflicts",
    value: function countUnresolvedConflicts() {
      var conflictChunks = this.diffViewer.chunkManager.chunks.filter(function (c) {
        return c.conflict;
      });
      var selections = this.diffViewer.chunkManager.selections || {};
      return conflictChunks.length - Object.keys(selections).length;
    }

    /**
     * Show conflict resolution modal
     * @param {number} unresolvedCount - Number of unresolved conflicts
     */
  }, {
    key: "showConflictModal",
    value: function showConflictModal(unresolvedCount) {
      var _this4 = this;
      // Get translations from config
      var translations = this.diffViewer.getConfig().translations || {};

      // Set message about unresolved conflicts
      var message = _utils_MergeContentFormatter__WEBPACK_IMPORTED_MODULE_2__/* .MergeContentFormatter */ .G.formatUnresolvedCount(unresolvedCount, translations);

      // Open the conflict modal
      this.modalManager.open(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MERGE.CONFLICT_MODAL.name());

      // Set the message in the modal
      setTimeout(function () {
        _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__/* .DOMUtils */ .e.showMessage(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MODAL.MESSAGE.name(), message, 'warning', {
          className: '' // No extra margin needed in modal
        });
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Showing conflict modal with message', null, 2);
      }, 50);

      // Attach event handlers to buttons with a small delay to ensure the modal is fully rendered
      setTimeout(function () {
        var continueBtn = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MODAL.CONTINUE_BTN.name());
        var mergeBtn = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MODAL.MERGE_BTN.name());

        // Handle the Continue button
        if (continueBtn) {
          // Remove any existing handlers by cloning
          var newContinueBtn = continueBtn.cloneNode(true);
          continueBtn.parentNode.replaceChild(newContinueBtn, continueBtn);

          // Add direct, simplified handler
          newContinueBtn.addEventListener('click', function () {
            _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Continue button clicked', null, 2);

            // First close the conflict modal
            _this4.modalManager.close(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MERGE.CONFLICT_MODAL.name());

            // Then close the preview modal
            var previewModalId = _constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MODAL.PREVIEW.name();
            _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("MergeUIController: Closing preview modal (ID: ".concat(previewModalId, ")"), null, 2);
            _this4.modalManager.close(previewModalId);

            // Highlight any unresolved chunks after a delay
            setTimeout(function () {
              _this4.highlightUnresolvedChunks();
            }, 400);
          });
        }

        // Handle the Merge Anyway button
        if (mergeBtn) {
          // Remove any existing handlers by cloning
          var newMergeBtn = mergeBtn.cloneNode(true);
          mergeBtn.parentNode.replaceChild(newMergeBtn, mergeBtn);

          // Add direct, simplified handler
          newMergeBtn.addEventListener('click', function () {
            _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Merge anyway button clicked', null, 2);
            _this4.modalManager.close(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MERGE.CONFLICT_MODAL.name());
            _this4.mergeHandler.proceedWithMerge(_this4.getMergeType());
          });
        }
      }, 50);
    }

    /**
     * Get current merge type from UI
     * @returns {string} Merge type ('original' or 'new')
     */
  }, {
    key: "getMergeType",
    value: function getMergeType() {
      var _this$mergeDestinatio;
      return ((_this$mergeDestinatio = this.mergeDestination) === null || _this$mergeDestinatio === void 0 ? void 0 : _this$mergeDestinatio.value) || 'original';
    }

    /**
     * Highlight unresolved chunks
     * @returns {boolean} True if any chunk was highlighted
     */
  }, {
    key: "highlightUnresolvedChunks",
    value: function highlightUnresolvedChunks() {
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Finding first unresolved conflict', null, 2);

      // Get all chunks and current selections
      var chunks = this.diffViewer.chunkManager.chunks;
      var selections = this.diffViewer.chunkManager.selections || {};

      // Find the first unresolved chunk
      var _iterator = _createForOfIteratorHelper(chunks),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var chunk = _step.value;
          if (chunk.conflict && !selections[chunk.id]) {
            // Use DiffNavigator to navigate to this chunk
            var chunkIndex = chunks.indexOf(chunk);
            if (this.diffViewer.diffNavigator) {
              // First navigate to the chunk
              this.diffViewer.diffNavigator.navigateToChunk(chunkIndex);

              // Then highlight the chunk element using imported NavigationUtils
              var chunkElement = document.querySelector("[data-chunk-id=\"".concat(chunk.id, "\"]"));
              if (chunkElement) {
                _utils_NavigationUtils__WEBPACK_IMPORTED_MODULE_3__/* .NavigationUtils */ .a.addHighlightEffect(chunkElement, 4000);
              }
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log("MergeUIController: Highlighted unresolved chunk ".concat(chunk.id), null, 2);
              return true;
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: No unresolved conflicts found', null, 2);
      return false;
    }

    /**
     * Setup local-only controls when server save is disabled
     * This creates a simplified UI with just the "Get merged result" button
     */
  }, {
    key: "setupLocalOnlyControls",
    value: function setupLocalOnlyControls() {
      var _this5 = this;
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Setting up local-only controls (server save disabled)', null, 2);

      // Get translations using the TranslationManager
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Getting translations for local-only controls', this.translationManager, 2);
      var getMergedResultText = this.translationManager.get('getMergedResult', 'Get Merged Result');
      var getMergedResultTooltip = this.translationManager.get('getMergedResultTooltip', 'View and download the merged content');

      // Find the merge controls container
      var mergeControlsActions = document.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MERGE.CONTROLS_ACTIONS.toString());
      if (!mergeControlsActions) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.error('MergeUIController: Could not find merge controls container', null, 1);
        return;
      }

      // Clear any existing content from the container to ensure we only have our button
      mergeControlsActions.innerHTML = '';

      // Create the "Get merged result" button
      var getMergedResultBtn = document.createElement('button');
      getMergedResultBtn.id = _constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.MERGE.GET_MERGED_RESULT_BTN.name();
      getMergedResultBtn.className = "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.UTILITY.BUTTON.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.UTILITY.BUTTON_PRIMARY.name());
      getMergedResultBtn.title = getMergedResultTooltip;

      // Add download icon and text using the proper icon system
      var downloadIconHtml = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_1__/* .DOMUtils */ .e.getIconHtml('download', {
        classes: _constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.UTILITY.MARGIN_END_1.name()
      });
      getMergedResultBtn.innerHTML = "".concat(downloadIconHtml, " ").concat(getMergedResultText);

      // Add to container (align to right)
      var buttonContainer = document.createElement('div');
      buttonContainer.className = "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.UTILITY.FLEX.name(), " ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.UTILITY.JUSTIFY_CONTENT_BETWEEN.name(), " w-100");
      buttonContainer.style.width = '100%';

      // Add a spacer on the left to push the button to the right
      var spacer = document.createElement('div');
      spacer.style.flex = '1';
      buttonContainer.appendChild(spacer);
      buttonContainer.appendChild(getMergedResultBtn);
      mergeControlsActions.appendChild(buttonContainer);

      // Add event handler to show the preview content when clicked
      getMergedResultBtn.addEventListener('click', function (event) {
        event.preventDefault();

        // Use 'clipboard' merge type for non-file-browser modes
        _this5.mergeHandler.proceedWithMerge('clipboard');
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Get merged result button clicked (using clipboard merge type)', null, 2);
      });
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__/* .Debug */ .y.log('MergeUIController: Local-only controls setup complete', null, 2);
    }
  }]);
}();

/***/ }),

/***/ 992:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Y: () => (/* binding */ ChunkSelectionHandler)
});

// EXTERNAL MODULE: ./src/utils/Debug.js
var Debug = __webpack_require__(979);
// EXTERNAL MODULE: ./src/utils/DOMUtils.js
var DOMUtils = __webpack_require__(759);
// EXTERNAL MODULE: ./src/constants/Selectors.js
var Selectors = __webpack_require__(762);
// EXTERNAL MODULE: ./src/utils/ChunkUtils.js
var ChunkUtils = __webpack_require__(840);
// EXTERNAL MODULE: ./src/utils/IconRegistry.js
var IconRegistry = __webpack_require__(648);
// EXTERNAL MODULE: ./src/utils/TranslationManager.js
var TranslationManager = __webpack_require__(428);
// EXTERNAL MODULE: ./src/utils/LoaderManager.js
var LoaderManager = __webpack_require__(102);
;// ./src/components/chunks/ChunkVisualStateManager.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
 * Manages visual state updates for chunk selections
 */
var ChunkVisualStateManager = /*#__PURE__*/function () {
  /**
   * @param {ChunkManager} chunkManager - Parent chunk manager
   */
  function ChunkVisualStateManager(chunkManager) {
    _classCallCheck(this, ChunkVisualStateManager);
    this.chunkManager = chunkManager;
    // Batch operations queue
    this._pendingOperations = [];
    // Track whether DOM updates are batched
    this._isBatching = false;
    // Performance metrics
    this._metrics = {
      lastBatchSize: 0,
      lastBatchTime: 0
    };
    Debug/* Debug */.y.log('ChunkVisualStateManager: Initialized', null, 3);
  }

  /**
   * Initialize the visual state manager
   * Preloads all chunk data for optimal performance with large files
   */
  return _createClass(ChunkVisualStateManager, [{
    key: "initialize",
    value: function initialize() {
      // Preload all chunks into cache for better performance
      ChunkUtils/* ChunkUtils */.N.preloadChunks();
      Debug/* Debug */.y.log('ChunkVisualStateManager: Initialized with preloaded chunks', null, 2);
    }

    /**
     * Update visual selection state
     * @param {string} chunkId - Chunk ID
     * @param {string} side - 'left' or 'right'
     * @param {string} state - 'selected' or 'unselected'
     * @param {boolean} batch - Whether to batch operations (defaults to false for backward compatibility)
     */
  }, {
    key: "updateVisualState",
    value: function updateVisualState(chunkId, side, state) {
      var batch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      Debug/* Debug */.y.log("ChunkVisualStateManager: Updating visual state for chunk ".concat(chunkId, ", side ").concat(side, ", state ").concat(state), null, 3);

      // Get all elements for this chunk side
      var elements = ChunkUtils/* ChunkUtils */.N.getChunkElements(chunkId, side);
      Debug/* Debug */.y.log("ChunkVisualStateManager: Found ".concat(elements.length, " elements for chunk ").concat(chunkId), null, 3);

      // Sort by line number (only needed for getting the first element)
      var sortedElements = ChunkUtils/* ChunkUtils */.N.sortElementsByLineNumber(elements);

      // Get the opposite side to handle placeholder synchronization
      var oppositeSide = side === 'left' ? 'right' : 'left';
      if (batch) {
        // Add to batch queue
        this._pendingOperations.push({
          type: 'updateState',
          chunkId: chunkId,
          side: side,
          elements: elements,
          firstElement: sortedElements.length > 0 ? sortedElements[0] : null,
          state: state,
          oppositeSide: oppositeSide
        });
      } else {
        // Apply immediately (for backward compatibility)
        this._applyStateToElements(elements, state);

        // Only update the icon for the first element
        if (sortedElements.length > 0) {
          Debug/* Debug */.y.log("ChunkVisualStateManager: Updating icon marker for first element of chunk ".concat(chunkId), null, 3);

          // When setting a state on one side, also update opposite side
          var firstElement = sortedElements[0];
          if (firstElement && state === 'selected') {
            // First handle the selected side
            this._updateIconMarker(firstElement, state);

            // Then handle the opposite side marker as a placeholder
            this._updateOppositeMarker(firstElement, oppositeSide);
          } else {
            // Normal case without special opposite handling
            this._updateIconMarker(firstElement, state);
          }
        } else {
          Debug/* Debug */.y.warn("ChunkVisualStateManager: No elements found to update icon for chunk ".concat(chunkId), null, 3);
        }

        // Notify about selection change
        this._notifySelectionChange();
      }
    }

    /**
     * Update the opposite side's marker when a chunk is selected
     * @private
     * @param {Element} element - The element being selected
     * @param {string} oppositeSide - The opposite side ('left' or 'right')
     */
  }, {
    key: "_updateOppositeMarker",
    value: function _updateOppositeMarker(element, oppositeSide) {
      var _element$dataset;
      if (!(element !== null && element !== void 0 && (_element$dataset = element.dataset) !== null && _element$dataset !== void 0 && _element$dataset.lineId)) return;

      // Extract line number from lineId (format: "side-number")
      var lineIdParts = element.dataset.lineId.split('-');
      if (lineIdParts.length !== 2) return;
      var lineNumber = lineIdParts[1];
      var oppositeLineId = "".concat(oppositeSide, "-").concat(lineNumber);

      // Find the opposite marker
      var oppositeMarker = ChunkUtils/* ChunkUtils */.N.getIconMarker(oppositeLineId);
      if (!oppositeMarker) {
        Debug/* Debug */.y.warn("ChunkVisualStateManager: Could not find opposite marker for ".concat(oppositeLineId), null, 3);
        return;
      }
      Debug/* Debug */.y.log("ChunkVisualStateManager: Updating opposite marker ".concat(oppositeLineId), {
        currentClasses: Array.from(oppositeMarker.classList)
      }, 3);

      // Remove selection classes
      oppositeMarker.classList.remove(Selectors/* default */.A.DIFF.CHUNK_SELECTED.name(), Selectors/* default */.A.DIFF.CHUNK_UNSELECTED.name(), Selectors/* default */.A.ICONS.SELECT.name(), Selectors/* default */.A.ICONS.SELECT_LEFT.name(), Selectors/* default */.A.ICONS.SELECT_RIGHT.name());

      // CRITICAL DECISION POINT: Determine if the opposite marker should be a placeholder
      // This is determined by whether the line only exists on one side

      // Only mark as placeholder if it was originally a placeholder
      var wasPlaceholder = oppositeMarker.classList.contains(Selectors/* default */.A.ICONS.MARKER_PLACEHOLDER.name());
      if (wasPlaceholder) {
        // If it was a placeholder, keep it as a placeholder
        oppositeMarker.classList.add(Selectors/* default */.A.ICONS.MARKER_PLACEHOLDER.name());
        Debug/* Debug */.y.log("ChunkVisualStateManager: Preserved placeholder status for ".concat(oppositeLineId), null, 3);
      } else {
        // Otherwise mark it as unselected
        oppositeMarker.classList.add(Selectors/* default */.A.DIFF.CHUNK_UNSELECTED.name());
        Debug/* Debug */.y.log("ChunkVisualStateManager: Set opposite marker ".concat(oppositeLineId, " as unselected"), null, 3);
      }
    }

    /**
     * Reset visual state for a chunk
     * @param {string} chunkId - Chunk ID
     * @param {boolean} batch - Whether to batch operations (defaults to false for backward compatibility)
     */
  }, {
    key: "resetVisualState",
    value: function resetVisualState(chunkId) {
      var batch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      Debug/* Debug */.y.log("ChunkVisualStateManager: Resetting visual state for chunk ".concat(chunkId), null, 3);

      // Get all elements for this chunk (both sides)
      var elements = ChunkUtils/* ChunkUtils */.N.getChunkElements(chunkId);
      Debug/* Debug */.y.log("ChunkVisualStateManager: Found ".concat(elements.length, " elements for chunk ").concat(chunkId), null, 3);

      // Get icon markers associated with this chunk more efficiently
      var iconMarkers = ChunkUtils/* ChunkUtils */.N.getChunkIconMarkers(chunkId);
      if (batch) {
        // Add to batch queue
        this._pendingOperations.push({
          type: 'resetState',
          chunkId: chunkId,
          elements: elements,
          iconMarkers: iconMarkers
        });
      } else {
        // Apply immediately (for backward compatibility)
        this._applyResetToElements(elements, iconMarkers);
        Debug/* Debug */.y.log("ChunkVisualStateManager: Reset ".concat(iconMarkers.length, " icon markers for chunk ").concat(chunkId), null, 3);

        // Notify about selection change
        this._notifySelectionChange();
      }
    }

    /**
     * Process all pending visual updates in a single batch
     * @param {boolean} notify - Whether to trigger notification after batch (default: true)
     */
  }, {
    key: "applyBatch",
    value: function applyBatch() {
      var _this = this;
      var notify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (this._pendingOperations.length === 0) {
        return;
      }

      // Set batching state flag
      this._isBatching = true;
      var batchSize = this._pendingOperations.length;
      this._metrics.lastBatchSize = batchSize;

      // Use a single RAF call for better performance
      requestAnimationFrame(function () {
        var startTime = performance.now();
        Debug/* Debug */.y.log("ChunkVisualStateManager: Applying batch of ".concat(batchSize, " operations"), null, 2);
        try {
          // Group operations by type for better performance
          var updateOperations = [];
          var resetOperations = [];

          // Sort operations into groups
          _this._pendingOperations.forEach(function (operation) {
            if (operation.type === 'updateState') {
              updateOperations.push(operation);
            } else if (operation.type === 'resetState') {
              resetOperations.push(operation);
            }
          });

          // Process reset operations first to ensure clean state
          if (resetOperations.length > 0) {
            _this._processBatchedResets(resetOperations);
          }

          // Then process update operations
          if (updateOperations.length > 0) {
            _this._processBatchedUpdates(updateOperations);
          }

          // Track batch processing time
          var endTime = performance.now();
          var processingTime = endTime - startTime;
          _this._metrics.lastBatchTime = processingTime;
          Debug/* Debug */.y.log("ChunkVisualStateManager: Batch processing completed in ".concat(processingTime.toFixed(2), "ms"), {
            operations: batchSize,
            resetOps: resetOperations.length,
            updateOps: updateOperations.length,
            msPerOperation: (processingTime / batchSize).toFixed(2)
          }, 2);
        } catch (error) {
          Debug/* Debug */.y.error("Error during batch processing: ".concat(error.message), error, 1);
        } finally {
          // Clear the queue
          _this._pendingOperations = [];

          // Reset batching state flag
          _this._isBatching = false;

          // Send notification if requested
          if (notify) {
            _this._notifySelectionChange();
          }
        }
      });
    }

    /**
     * Process a batch of reset operations efficiently
     * @private
     */
  }, {
    key: "_processBatchedResets",
    value: function _processBatchedResets(operations) {
      if (operations.length === 0) return;

      // Group elements and markers by class operations for fewer DOM updates
      var allElements = [];
      var allIconMarkers = [];

      // Collect all elements and markers to be reset
      operations.forEach(function (operation) {
        if (operation.elements) {
          allElements.push.apply(allElements, _toConsumableArray(operation.elements));
        }
        if (operation.iconMarkers) {
          allIconMarkers.push.apply(allIconMarkers, _toConsumableArray(operation.iconMarkers));
        }
      });

      // Apply resets in bulk
      this._applyResetToElements(allElements, allIconMarkers);
    }

    /**
     * Process a batch of update operations efficiently
     * @private
     */
  }, {
    key: "_processBatchedUpdates",
    value: function _processBatchedUpdates(operations) {
      var _this2 = this;
      if (operations.length === 0) return;

      // Group elements by state for more efficient DOM updates
      var elementsByState = {
        'selected': [],
        'unselected': []
      };

      // First elements for icon marker updates
      var firstElementsByState = {
        'selected': {},
        // chunkId -> {element, oppositeSide}
        'unselected': {} // chunkId -> {element}
      };

      // Group elements by state
      operations.forEach(function (operation) {
        var elements = operation.elements,
          firstElement = operation.firstElement,
          state = operation.state,
          chunkId = operation.chunkId,
          side = operation.side,
          oppositeSide = operation.oppositeSide;
        if (elements && elements.length > 0) {
          if (state === 'selected' || state === 'unselected') {
            var _elementsByState$stat;
            (_elementsByState$stat = elementsByState[state]).push.apply(_elementsByState$stat, _toConsumableArray(elements));
          }
        }

        // Track first element of each chunk for icon marker updates
        if (firstElement && chunkId) {
          if (state === 'selected' || state === 'unselected') {
            firstElementsByState[state][chunkId] = {
              element: firstElement,
              side: side,
              oppositeSide: oppositeSide
            };
          }
        }
      });

      // Apply updates by state
      Object.entries(elementsByState).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          state = _ref2[0],
          elements = _ref2[1];
        if (elements.length > 0) {
          _this2._applyStateToElements(elements, state);
        }
      });

      // Update icon markers
      Object.entries(firstElementsByState).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          state = _ref4[0],
          chunksMap = _ref4[1];
        Object.entries(chunksMap).forEach(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
            _chunkId = _ref6[0],
            data = _ref6[1];
          // Update the element's marker
          _this2._updateIconMarker(data.element, state);

          // For selected elements, also update the opposite marker
          if (state === 'selected' && data.oppositeSide) {
            _this2._updateOppositeMarker(data.element, data.oppositeSide);
          }
        });
      });

      // Force a DOM layout refresh to ensure styles are applied
      if (document.body) {
        document.body.getBoundingClientRect();
      }
    }

    /**
     * Apply state changes to elements using efficient operations
     * @private
     */
  }, {
    key: "_applyStateToElements",
    value: function _applyStateToElements(elements, state) {
      if (!elements || elements.length === 0) return;

      // For better performance, prepare the classes to add/remove
      var removeClasses = [Selectors/* default */.A.DIFF.CHUNK_SELECTED.name(), Selectors/* default */.A.DIFF.CHUNK_UNSELECTED.name()];
      var addClass = '';
      if (state === 'selected') {
        addClass = Selectors/* default */.A.DIFF.CHUNK_SELECTED.name();
      } else if (state === 'unselected') {
        addClass = Selectors/* default */.A.DIFF.CHUNK_UNSELECTED.name();
      } else {
        // Fallback for backward compatibility
        addClass = state;
      }

      // Collect all rows to update at once (reduces layout thrashing)
      var rows = new Set();

      // Apply to all elements efficiently
      elements.forEach(function (element) {
        var _element$classList;
        // Remove classes
        (_element$classList = element.classList).remove.apply(_element$classList, removeClasses);

        // Add class
        element.classList.add(addClass);

        // Add placeholder class if needed
        if (element.classList.contains(Selectors/* default */.A.DIFF.LINE_PLACEHOLDER.name())) {
          element.classList.add(Selectors/* default */.A.DIFF.PLACEHOLDER.name());
        }

        // Collect parent row for batch update
        var row = ChunkUtils/* ChunkUtils */.N.getParentRow(element);
        if (row) {
          rows.add(row);
        }
      });

      // Update all rows at once
      rows.forEach(function (row) {
        var _row$classList;
        (_row$classList = row.classList).remove.apply(_row$classList, removeClasses);
        row.classList.add(addClass);
      });
    }

    /**
     * Apply reset operations to elements and icon markers efficiently
     * @private
     */
  }, {
    key: "_applyResetToElements",
    value: function _applyResetToElements(elements, iconMarkers) {
      if ((!elements || elements.length === 0) && (!iconMarkers || iconMarkers.length === 0)) return;

      // Pre-compute classes to remove for better performance
      var removeClasses = [Selectors/* default */.A.DIFF.CHUNK_SELECTED.name(), Selectors/* default */.A.DIFF.CHUNK_UNSELECTED.name()];
      var iconRemoveClasses = [Selectors/* default */.A.DIFF.CHUNK_SELECTED.name(), Selectors/* default */.A.DIFF.CHUNK_UNSELECTED.name(), Selectors/* default */.A.ICONS.SELECT.name(), Selectors/* default */.A.ICONS.SELECT_LEFT.name(), Selectors/* default */.A.ICONS.SELECT_RIGHT.name()];

      // Collect all rows to update at once (reduces layout thrashing)
      var rows = new Set();

      // Remove classes from elements efficiently
      if (elements && elements.length > 0) {
        elements.forEach(function (el) {
          var _el$classList;
          // Skip null or undefined elements
          if (!el) return;

          // Reset element classes
          (_el$classList = el.classList).remove.apply(_el$classList, removeClasses);

          // Collect parent row for batch update
          var row = ChunkUtils/* ChunkUtils */.N.getParentRow(el);
          if (row) {
            rows.add(row);
          }
        });

        // Reset all rows at once
        rows.forEach(function (row) {
          var _row$classList2;
          (_row$classList2 = row.classList).remove.apply(_row$classList2, removeClasses);
        });
      }

      // Reset icon markers efficiently
      if (iconMarkers && iconMarkers.length > 0) {
        iconMarkers.forEach(function (marker) {
          if (marker) {
            var _marker$classList;
            // Store placeholder status before removing classes
            var isPlaceholder = marker.classList.contains(Selectors/* default */.A.ICONS.MARKER_PLACEHOLDER.name());

            // Remove selection-related classes
            (_marker$classList = marker.classList).remove.apply(_marker$classList, iconRemoveClasses);

            // Preserve placeholder status when resetting
            if (isPlaceholder) {
              marker.classList.add(Selectors/* default */.A.ICONS.MARKER_PLACEHOLDER.name());
            }
          }
        });
      }
    }

    /**
     * Update icon marker for the element
     * @private
     */
  }, {
    key: "_updateIconMarker",
    value: function _updateIconMarker(element, state) {
      if (!element) return;
      var lineId = element.dataset.lineId;
      if (!lineId) return;
      Debug/* Debug */.y.log("ChunkVisualStateManager: Looking for icon marker with lineId ".concat(lineId), null, 3);
      // Find and update the icon marker (use cached version if available)
      var iconMarker = ChunkUtils/* ChunkUtils */.N.getIconMarker(lineId);
      if (iconMarker) {
        Debug/* Debug */.y.log("ChunkVisualStateManager: Updating icon marker state to ".concat(state), {
          lineId: lineId,
          currentClasses: Array.from(iconMarker.classList)
        }, 3);

        // Store the placeholder status before removing classes
        var isPlaceholder = iconMarker.classList.contains(Selectors/* default */.A.ICONS.MARKER_PLACEHOLDER.name());

        // Only remove selection-related classes, preserve placeholder status
        iconMarker.classList.remove(Selectors/* default */.A.DIFF.CHUNK_SELECTED.name(), Selectors/* default */.A.DIFF.CHUNK_UNSELECTED.name(), Selectors/* default */.A.ICONS.SELECT.name(), Selectors/* default */.A.ICONS.SELECT_LEFT.name(), Selectors/* default */.A.ICONS.SELECT_RIGHT.name());

        // Add the appropriate class based on state
        if (state === 'selected') {
          iconMarker.classList.add(Selectors/* default */.A.DIFF.CHUNK_SELECTED.name());

          // Add the side-appropriate selection icon class
          if (element.dataset.side === 'left') {
            iconMarker.classList.add(Selectors/* default */.A.ICONS.SELECT_LEFT.name());
          } else {
            iconMarker.classList.add(Selectors/* default */.A.ICONS.SELECT_RIGHT.name());
          }
        } else if (state === 'unselected') {
          iconMarker.classList.add(Selectors/* default */.A.DIFF.CHUNK_UNSELECTED.name());
        } else {
          // Fallback for backward compatibility
          iconMarker.classList.add(state);
        }

        // Preserve placeholder status - don't try to infer it from the element
        if (isPlaceholder && !iconMarker.classList.contains(Selectors/* default */.A.ICONS.MARKER_PLACEHOLDER.name())) {
          iconMarker.classList.add(Selectors/* default */.A.ICONS.MARKER_PLACEHOLDER.name());
          Debug/* Debug */.y.log("ChunkVisualStateManager: Preserved placeholder marker status", null, 3);
        }
      } else {
        Debug/* Debug */.y.warn("ChunkVisualStateManager: No icon marker found for line ".concat(lineId), null, 3);
      }
    }

    /**
     * Notify about selection change
     * @private
     */
  }, {
    key: "_notifySelectionChange",
    value: function _notifySelectionChange() {
      Debug/* Debug */.y.log("ChunkVisualStateManager: Notifying about selection change", null, 3);
      if (typeof this.chunkManager.onSelectionChange === 'function') {
        this.chunkManager.onSelectionChange();
      } else {
        Debug/* Debug */.y.log("ChunkVisualStateManager: No onSelectionChange handler defined", null, 3);
      }
    }

    /**
     * Get performance metrics
     * @returns {Object} Current metrics
     */
  }, {
    key: "getMetrics",
    value: function getMetrics() {
      return _objectSpread({}, this._metrics);
    }
  }]);
}();
;// ./src/components/chunks/ChunkSelectionHandler.js
function ChunkSelectionHandler_typeof(o) { "@babel/helpers - typeof"; return ChunkSelectionHandler_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, ChunkSelectionHandler_typeof(o); }
function ChunkSelectionHandler_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function ChunkSelectionHandler_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ChunkSelectionHandler_ownKeys(Object(t), !0).forEach(function (r) { ChunkSelectionHandler_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ChunkSelectionHandler_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function ChunkSelectionHandler_defineProperty(e, r, t) { return (r = ChunkSelectionHandler_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function ChunkSelectionHandler_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function ChunkSelectionHandler_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, ChunkSelectionHandler_toPropertyKey(o.key), o); } }
function ChunkSelectionHandler_createClass(e, r, t) { return r && ChunkSelectionHandler_defineProperties(e.prototype, r), t && ChunkSelectionHandler_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function ChunkSelectionHandler_toPropertyKey(t) { var i = ChunkSelectionHandler_toPrimitive(t, "string"); return "symbol" == ChunkSelectionHandler_typeof(i) ? i : i + ""; }
function ChunkSelectionHandler_toPrimitive(t, r) { if ("object" != ChunkSelectionHandler_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != ChunkSelectionHandler_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }









/**
 * Handles chunk selection operations
 */
var ChunkSelectionHandler = /*#__PURE__*/function () {
  /**
   * @param {ChunkManager} chunkManager - Parent chunk manager
   */
  function ChunkSelectionHandler(chunkManager) {
    ChunkSelectionHandler_classCallCheck(this, ChunkSelectionHandler);
    this.chunkManager = chunkManager;
    this.selections = {}; // Store selections separately
    this.visualStateManager = new ChunkVisualStateManager(chunkManager);

    // Define selection state constants to replace hardcoded strings
    this.SELECTED = Selectors/* default */.A.DIFF.CHUNK_SELECTED.name();
    this.UNSELECTED = Selectors/* default */.A.DIFF.CHUNK_UNSELECTED.name();

    // Performance tracking metrics
    this._performanceMetrics = {
      lastOperationTime: 0,
      operationCount: 0
    };
  }

  /**
   * Setup chunk selection handlers
   */
  return ChunkSelectionHandler_createClass(ChunkSelectionHandler, [{
    key: "setupChunkSelection",
    value: function setupChunkSelection() {
      var _this = this;
      // Store the handler function with proper binding
      this._boundClickHandler = function (event) {
        return _this._handleClick(event);
      };
      this._boundCheckAllHandler = function (event) {
        return _this._handleCheckAll(event);
      };

      // Clear existing handlers and setup new ones for ALL chunk elements
      // by targeting data-chunk-id attribute instead of specific classes
      DOMUtils/* DOMUtils */.e.setupEventHandlers('[data-chunk-id]:not([data-chunk-id=""])', 'click', this._boundClickHandler, {
        removeExisting: true,
        styles: {
          cursor: 'pointer'
        }
      });

      // Add "Check All" buttons to each pane and setup handlers
      this._setupCheckAllButtons();

      // Clear ChunkUtils cache to ensure fresh state
      ChunkUtils/* ChunkUtils */.N.clearCache();
      Debug/* Debug */.y.log('ChunkSelectionHandler: Selection handlers initialized for all chunk elements', null, 2);
    }

    /**
     * Set up "Check All" buttons
     * @private
     */
  }, {
    key: "_setupCheckAllButtons",
    value: function _setupCheckAllButtons() {
      // Find panes
      var panes = this.chunkManager.diffViewer.container.querySelectorAll(Selectors/* default */.A.DIFF.PANE);
      if (panes.length !== 2) {
        Debug/* Debug */.y.log('ChunkSelectionHandler: Could not find both diff panes for "Check All" buttons', null, 2);
        return;
      }
      var leftPane = panes[0];
      var rightPane = panes[1];

      // Create and add the check all buttons to the panes
      this._createCheckAllButtonHeader(leftPane, 'left');
      this._createCheckAllButtonHeader(rightPane, 'right');
    }

    /**
     * Create a header with a "Check All" button for a pane
     * @private
     */
  }, {
    key: "_createCheckAllButtonHeader",
    value: function _createCheckAllButtonHeader(pane, side) {
      // Get translation manager instance
      var translationManager = TranslationManager/* TranslationManager */.n.getInstance();

      // Create header element
      var header = document.createElement('div');
      header.className = Selectors/* default */.A.DIFF.PANE_HEADER.name();

      // Make header a flex container
      header.classList.add('vdm-d-flex', 'vdm-justify-content-between', 'vdm-align-items-center');

      // Get language information from DiffViewer
      var language = this.chunkManager.diffViewer.runtimeProps.diffData.language || 'Text';

      // Create language badge
      var langBadge = document.createElement('span');
      langBadge.className = 'vdm-badge vdm-badge--info';
      langBadge.textContent = language;

      // Create button element
      var checkAllButton = document.createElement('button');
      checkAllButton.className = "".concat(Selectors/* default */.A.UTILITY.BUTTON.name(), " ").concat(Selectors/* default */.A.UTILITY.BUTTON_EXTRA_SMALL.name(), " ").concat(Selectors/* default */.A.UTILITY.BUTTON_SECONDARY.name(), " ").concat(Selectors/* default */.A.DIFF.CHECK_ALL_BTN.name());
      checkAllButton.setAttribute('data-side', side);
      checkAllButton.setAttribute('data-icon-state', 'unchecked');
      checkAllButton.title = "Select all changes from the ".concat(side, " pane");
      checkAllButton.style.display = 'inline-flex';
      checkAllButton.style.alignItems = 'center';
      checkAllButton.style.verticalAlign = 'middle';

      // Create icon wrapper span
      var iconWrapper = document.createElement('span');
      iconWrapper.className = 'vdm-icon-wrapper';
      iconWrapper.style.marginRight = '3px';
      iconWrapper.style.display = 'inline-flex';
      iconWrapper.style.alignItems = 'center';
      iconWrapper.style.verticalAlign = 'middle';
      iconWrapper.style.height = '14px';
      iconWrapper.style.lineHeight = '1';

      // Add checkbox-unchecked icon by default
      var uncheckIcon = IconRegistry/* IconRegistry */.X.createIcon('checkbox-unchecked', {
        width: 14,
        height: 14,
        classes: 'vdm-icon-checkbox'
      });
      iconWrapper.appendChild(uncheckIcon);

      // Create text node with a span wrapper for better alignment
      var textSpan = document.createElement('span');
      textSpan.style.display = 'inline-block';
      textSpan.style.verticalAlign = 'middle';
      textSpan.style.lineHeight = '1';
      textSpan.appendChild(document.createTextNode(translationManager.get('checkAll')));

      // Add icon and text to button
      checkAllButton.appendChild(iconWrapper);
      checkAllButton.appendChild(textSpan);

      // Add language badge and button to header
      header.appendChild(langBadge);
      header.appendChild(checkAllButton);

      // Add header as the first child of the pane
      pane.insertBefore(header, pane.firstChild);

      // Add click event handler
      checkAllButton.addEventListener('click', this._boundCheckAllHandler);
    }

    /**
     * Handle click on "Check All" button
     * @private
     */
  }, {
    key: "_handleCheckAll",
    value: function _handleCheckAll(event) {
      var _this2 = this;
      var button = event.currentTarget;
      var side = button.getAttribute('data-side');
      var iconState = button.getAttribute('data-icon-state');
      var oppositeButton = this._getOppositeButton(side);

      // Get translation manager and loader manager
      var translationManager = TranslationManager/* TranslationManager */.n.getInstance();
      var loaderManager = LoaderManager/* LoaderManager */.D.getInstance();
      if (!side) return;

      // Show loading indicator for batch operations
      var message = translationManager.get('processingChunks') || 'Processing chunks...';
      var loaderId = loaderManager.showLoader(message, {
        fullscreen: true,
        zIndex: 9999
      });

      // Also update button state for visual feedback
      this._setButtonProcessingState(button, true);

      // Track performance
      var startTime = performance.now();

      // Use a small timeout to allow the loader to be shown
      setTimeout(function () {
        // If this button is already checked, uncheck everything
        if (iconState === 'checked') {
          Debug/* Debug */.y.log('ChunkSelectionHandler: Unchecking all selections', null, 2);

          // Reset this button
          _this2._toggleButtonIconState(button, 'checked');

          // Reset opposite button if it's checked
          if (oppositeButton && oppositeButton.getAttribute('data-icon-state') === 'checked') {
            _this2._toggleButtonIconState(oppositeButton, 'checked');
          }

          // Clear all selections
          _this2.clearAllSelections(true); // Use optimized batch version
        }
        // If opposite button is checked, toggle both sides
        else if (oppositeButton && oppositeButton.getAttribute('data-icon-state') === 'checked') {
          // Uncheck the opposite side
          _this2._toggleButtonIconState(oppositeButton, 'checked');

          // Check this side
          _this2._toggleButtonIconState(button, 'unchecked');

          // Select all on this side
          _this2.selectAllOnSide(side, true); // Use optimized batch version
        }
        // Default case: check this side
        else {
          _this2._toggleButtonIconState(button, 'unchecked');
          _this2.selectAllOnSide(side, true); // Use optimized batch version
        }

        // Reset button state
        _this2._setButtonProcessingState(button, false);

        // Hide loader
        loaderManager.hideLoader(loaderId);

        // Track performance metrics
        _this2._recordPerformanceMetrics(startTime);
      }, 50);
    }

    /**
     * Set button to processing state to give visual feedback during long operations
     * @private
     */
  }, {
    key: "_setButtonProcessingState",
    value: function _setButtonProcessingState(button, isProcessing) {
      if (isProcessing) {
        button.classList.add('processing');
        button.style.opacity = '0.8';
        button.style.cursor = 'wait';
      } else {
        button.classList.remove('processing');
        button.style.opacity = '';
        button.style.cursor = '';
      }
    }

    /**
     * Record performance metrics for optimization analysis
     * @private
     */
  }, {
    key: "_recordPerformanceMetrics",
    value: function _recordPerformanceMetrics(startTime) {
      var endTime = performance.now();
      var operationTime = endTime - startTime;
      this._performanceMetrics.lastOperationTime = operationTime;
      this._performanceMetrics.operationCount++;

      // Log cache statistics to evaluate caching effectiveness
      var cacheStats = ChunkUtils/* ChunkUtils */.N.getCacheStats();
      var elementHitRatio = cacheStats.elementCacheHits / (cacheStats.elementCacheHits + cacheStats.elementCacheMisses) * 100 || 0;
      var iconHitRatio = cacheStats.iconMarkerCacheHits / (cacheStats.iconMarkerCacheHits + cacheStats.iconMarkerCacheMisses) * 100 || 0;
      Debug/* Debug */.y.log("ChunkSelectionHandler: Operation completed in ".concat(operationTime.toFixed(2), "ms"), {
        totalOperations: this._performanceMetrics.operationCount,
        cacheStats: {
          elementCacheHits: cacheStats.elementCacheHits,
          elementCacheMisses: cacheStats.elementCacheMisses,
          elementHitRatio: "".concat(elementHitRatio.toFixed(1), "%"),
          iconMarkerCacheHits: cacheStats.iconMarkerCacheHits,
          iconMarkerCacheMisses: cacheStats.iconMarkerCacheMisses,
          iconHitRatio: "".concat(iconHitRatio.toFixed(1), "%")
        }
      }, 2);
    }

    /**
     * Get the button for the opposite side
     * @private
     * @param {string} currentSide - Current side ('left' or 'right')
     * @returns {Element|null} - The opposite side button element or null if not found
     */
  }, {
    key: "_getOppositeButton",
    value: function _getOppositeButton(currentSide) {
      var oppositeSide = currentSide === 'left' ? 'right' : 'left';
      return this.chunkManager.diffViewer.container.querySelector(".".concat(Selectors/* default */.A.DIFF.CHECK_ALL_BTN.name(), "[data-side=\"").concat(oppositeSide, "\"]"));
    }

    /**
     * Toggle button icon state between checked and unchecked
     * @private
     * @param {Element} button - The button element
     * @param {string} currentState - Current icon state ('checked' or 'unchecked')
     */
  }, {
    key: "_toggleButtonIconState",
    value: function _toggleButtonIconState(button, currentState) {
      var iconWrapper = button.querySelector('.vdm-icon-wrapper');
      if (!iconWrapper) return;

      // Clear current icon
      iconWrapper.innerHTML = '';

      // Determine new state based on current state
      var newIconState;
      if (currentState === 'unchecked') {
        newIconState = 'checked';
        iconWrapper.appendChild(IconRegistry/* IconRegistry */.X.createIcon('checkbox-checked', {
          width: 14,
          height: 14,
          classes: 'vdm-icon-checkbox'
        }));
      } else {
        newIconState = 'unchecked';
        iconWrapper.appendChild(IconRegistry/* IconRegistry */.X.createIcon('checkbox-unchecked', {
          width: 14,
          height: 14,
          classes: 'vdm-icon-checkbox'
        }));
      }

      // Update icon state attribute
      button.setAttribute('data-icon-state', newIconState);
    }

    /**
     * Select all chunks on a specific side
     * @param {string} side - 'left' or 'right'
     * @param {boolean} useBatch - Whether to use batching for large files (default: false for backward compatibility)
     */
  }, {
    key: "selectAllOnSide",
    value: function selectAllOnSide(side) {
      var _this3 = this;
      var useBatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var oppositeSide = side === 'left' ? 'right' : 'left';
      Debug/* Debug */.y.log("ChunkSelectionHandler: Selecting all chunks on ".concat(side, " side").concat(useBatch ? ' (batched)' : ''), null, 2);

      // Get all chunks that need resolution
      var conflictChunks = this.chunkManager.chunks.filter(function (chunk) {
        return chunk.conflict || chunk.type === 'replace' || chunk.type === 'add' || chunk.type === 'delete';
      });

      // Check if we should use batching based on number of chunks
      var largeDiff = conflictChunks.length > 20; // Threshold for considering a diff as "large"
      useBatch = useBatch || largeDiff;

      // Show loader for large operations
      var loaderId = null;
      if (useBatch && conflictChunks.length > 50) {
        var translationManager = TranslationManager/* TranslationManager */.n.getInstance();
        var loaderManager = LoaderManager/* LoaderManager */.D.getInstance();
        var message = translationManager.get('processingChunks') || 'Processing chunks...';
        loaderId = loaderManager.showLoader(message, {
          fullscreen: true,
          zIndex: 9999
        });
      }

      // Start tracking performance
      var startTime = performance.now();
      if (useBatch) {
        // First update internal state for all chunks
        conflictChunks.forEach(function (chunk) {
          // Update selections object
          _this3.selections[chunk.id] = side;

          // Sync with diffConfig for compatibility
          _this3._syncWithDiffConfig(chunk.id, side);
        });

        // Get all chunks by side for efficient batch processing
        var chunksBySide = new Map();

        // Group all elements by chunk ID and side for batch processing
        conflictChunks.forEach(function (chunk) {
          // Toggle visual state with batching enabled
          _this3.visualStateManager.updateVisualState(chunk.id, side, _this3.SELECTED, true);
          _this3.visualStateManager.updateVisualState(chunk.id, oppositeSide, _this3.UNSELECTED, true);

          // Collect chunk elements for resolved status update
          if (!chunksBySide.has(chunk.id)) {
            var elements = ChunkUtils/* ChunkUtils */.N.getChunkElements(chunk.id);
            chunksBySide.set(chunk.id, elements);
          }
        });

        // Process visual updates in a single batch
        this.visualStateManager.applyBatch(false); // Don't notify yet

        // Apply resolved status to all chunks in a separate batch
        requestAnimationFrame(function () {
          // Ensure the icon markers are updated by forcing a redraw
          _this3._refreshIconStates(side, conflictChunks);
          chunksBySide.forEach(function (elements) {
            elements.forEach(function (element) {
              element.classList.add(Selectors/* default */.A.STATUS.RESOLVED.name());
              element.classList.remove(Selectors/* default */.A.STATUS.UNRESOLVED.name());
            });
          });

          // Update navigation counter after all visual changes
          _this3._updateNavigationCounter();

          // Now notify about selection change
          if (typeof _this3.chunkManager.onSelectionChange === 'function') {
            _this3.chunkManager.onSelectionChange();
          }

          // Hide loader if it was shown
          if (loaderId) {
            var _loaderManager = LoaderManager/* LoaderManager */.D.getInstance();
            _loaderManager.hideLoader(loaderId);
          }

          // Record performance metrics after all operations
          _this3._recordPerformanceMetrics(startTime);
        });
      } else {
        // Legacy approach - process one by one
        conflictChunks.forEach(function (chunk) {
          _this3.toggleChunkSelection(chunk.id, side, _this3.SELECTED);
          _this3.toggleChunkSelection(chunk.id, oppositeSide, _this3.UNSELECTED);
        });

        // Callback to notify of selection change
        if (typeof this.chunkManager.onSelectionChange === 'function') {
          this.chunkManager.onSelectionChange();
        }

        // Record performance metrics
        this._recordPerformanceMetrics(startTime);
      }
    }

    /**
     * Force refresh icon states for chunks
     * This ensures icon markers are correctly updated during batch operations
     * @private
     */
  }, {
    key: "_refreshIconStates",
    value: function _refreshIconStates(selectedSide, chunks) {
      var oppositeSide = selectedSide === 'left' ? 'right' : 'left';

      // Force all chunks to properly show their selection state visually
      chunks.forEach(function (chunk) {
        // Get elements for both sides
        var selectedElements = ChunkUtils/* ChunkUtils */.N.getChunkElements(chunk.id, selectedSide);
        var oppositeElements = ChunkUtils/* ChunkUtils */.N.getChunkElements(chunk.id, oppositeSide);

        // Handle selected side
        if (selectedElements.length > 0) {
          // Sort by line number to get first element for icon marker
          var sortedElements = ChunkUtils/* ChunkUtils */.N.sortElementsByLineNumber(selectedElements);
          var firstElement = sortedElements[0];
          if (firstElement) {
            var lineId = firstElement.dataset.lineId;
            if (lineId) {
              // Force direct icon marker update with the correct side
              var iconMarker = ChunkUtils/* ChunkUtils */.N.getIconMarker(lineId);
              if (iconMarker) {
                // Remove all state classes first
                iconMarker.classList.remove(Selectors/* default */.A.DIFF.CHUNK_SELECTED.name(), Selectors/* default */.A.DIFF.CHUNK_UNSELECTED.name(), Selectors/* default */.A.ICONS.SELECT.name(), Selectors/* default */.A.ICONS.SELECT_LEFT.name(), Selectors/* default */.A.ICONS.SELECT_RIGHT.name());

                // Add selected state
                iconMarker.classList.add(Selectors/* default */.A.DIFF.CHUNK_SELECTED.name());

                // Add the side-specific icon marker
                if (selectedSide === 'left') {
                  iconMarker.classList.add(Selectors/* default */.A.ICONS.SELECT_LEFT.name());
                } else {
                  iconMarker.classList.add(Selectors/* default */.A.ICONS.SELECT_RIGHT.name());
                }
              }
            }
          }

          // Apply the selected class to all elements for this chunk on the selected side
          selectedElements.forEach(function (element) {
            // Remove all selection classes first
            element.classList.remove(Selectors/* default */.A.DIFF.CHUNK_SELECTED.name(), Selectors/* default */.A.DIFF.CHUNK_UNSELECTED.name());

            // Add selected class
            element.classList.add(Selectors/* default */.A.DIFF.CHUNK_SELECTED.name());

            // Update the parent row too
            var row = ChunkUtils/* ChunkUtils */.N.getParentRow(element);
            if (row) {
              row.classList.remove(Selectors/* default */.A.DIFF.CHUNK_SELECTED.name(), Selectors/* default */.A.DIFF.CHUNK_UNSELECTED.name());
              row.classList.add(Selectors/* default */.A.DIFF.CHUNK_SELECTED.name());
            }
          });
        }

        // Handle opposite side
        if (oppositeElements.length > 0) {
          // Clear any icon markers on the opposite side
          var sortedOppositeElements = ChunkUtils/* ChunkUtils */.N.sortElementsByLineNumber(oppositeElements);
          var firstOppositeElement = sortedOppositeElements[0];
          if (firstOppositeElement) {
            var oppositeLineId = firstOppositeElement.dataset.lineId;
            if (oppositeLineId) {
              var oppositeIconMarker = ChunkUtils/* ChunkUtils */.N.getIconMarker(oppositeLineId);
              if (oppositeIconMarker) {
                // Clear all selection related classes
                oppositeIconMarker.classList.remove(Selectors/* default */.A.DIFF.CHUNK_SELECTED.name(), Selectors/* default */.A.DIFF.CHUNK_UNSELECTED.name(), Selectors/* default */.A.ICONS.SELECT.name(), Selectors/* default */.A.ICONS.SELECT_LEFT.name(), Selectors/* default */.A.ICONS.SELECT_RIGHT.name());

                // DETERMINE IF THIS SHOULD BE A PLACEHOLDER
                // Apply the same placeholder logic used in _updateOppositeMarker

                // Check if the opposite element has placeholder attributes
                var hasPlaceholder = firstOppositeElement.dataset.hasPlaceholder === 'true';
                var isPlaceholderType = firstOppositeElement.classList.contains(Selectors/* default */.A.DIFF.LINE_PLACEHOLDER.name());
                var wasPlaceholder = oppositeIconMarker.classList.contains(Selectors/* default */.A.ICONS.MARKER_PLACEHOLDER.name());

                // Find the corresponding selected element for the same line number
                var lineNumber = oppositeLineId.split('-')[1];
                var selectedLineId = "".concat(selectedSide, "-").concat(lineNumber);
                var selectedElement = document.querySelector("[data-line-id=\"".concat(selectedLineId, "\"]"));

                // Check if the selected element indicates this should be a placeholder
                var selectedHasPlaceholder = (selectedElement === null || selectedElement === void 0 ? void 0 : selectedElement.dataset.hasPlaceholder) === 'true';
                var selectedIsPlaceholderType = selectedElement === null || selectedElement === void 0 ? void 0 : selectedElement.classList.contains(Selectors/* default */.A.DIFF.LINE_PLACEHOLDER.name());

                // If any of these conditions are true, this should be a placeholder
                if (hasPlaceholder || isPlaceholderType || wasPlaceholder || selectedHasPlaceholder || selectedIsPlaceholderType) {
                  // Set as placeholder
                  oppositeIconMarker.classList.add(Selectors/* default */.A.ICONS.MARKER_PLACEHOLDER.name());
                  Debug/* Debug */.y.log("ChunkSelectionHandler: Set opposite marker ".concat(oppositeLineId, " as placeholder during batch refresh"), null, 3);
                } else {
                  // Normal unselected state
                  oppositeIconMarker.classList.add(Selectors/* default */.A.DIFF.CHUNK_UNSELECTED.name());
                }
              }
            }
          }

          // Apply the unselected class to all elements on the opposite side
          oppositeElements.forEach(function (element) {
            // Remove all selection classes first
            element.classList.remove(Selectors/* default */.A.DIFF.CHUNK_SELECTED.name(), Selectors/* default */.A.DIFF.CHUNK_UNSELECTED.name());

            // Add unselected class
            element.classList.add(Selectors/* default */.A.DIFF.CHUNK_UNSELECTED.name());

            // Update the parent row too
            var row = ChunkUtils/* ChunkUtils */.N.getParentRow(element);
            if (row) {
              row.classList.remove(Selectors/* default */.A.DIFF.CHUNK_SELECTED.name(), Selectors/* default */.A.DIFF.CHUNK_UNSELECTED.name());
              row.classList.add(Selectors/* default */.A.DIFF.CHUNK_UNSELECTED.name());
            }
          });
        }
      });
    }

    /**
     * Handle click event on chunk
     * @private
     */
  }, {
    key: "_handleClick",
    value: function _handleClick(event) {
      var element = event.currentTarget;
      var chunkId = element.getAttribute('data-chunk-id');
      var side = element.getAttribute('data-side');
      Debug/* Debug */.y.log("ChunkSelectionHandler: Click detected on side ".concat(side, " for chunk ").concat(chunkId), {
        element: element.outerHTML.substring(0, 100) + '...' // Log first 100 chars of HTML
      }, 3);
      if (chunkId && side) {
        // Check if the chunk is already selected on this side
        var isAlreadySelected = this.selections[chunkId] === side && element.classList.contains(Selectors/* default */.A.DIFF.CHUNK_SELECTED.name());
        if (isAlreadySelected) {
          var _this$chunkManager$di;
          // Unselect this chunk
          Debug/* Debug */.y.log("ChunkSelectionHandler: Unselecting chunk ".concat(chunkId, " as it was already selected"), null, 3);

          // Remove from selections
          delete this.selections[chunkId];

          // Remove from diffConfig if it exists
          if ((_this$chunkManager$di = this.chunkManager.diffViewer) !== null && _this$chunkManager$di !== void 0 && (_this$chunkManager$di = _this$chunkManager$di.diffConfig) !== null && _this$chunkManager$di !== void 0 && _this$chunkManager$di.chunkSelections) {
            delete this.chunkManager.diffViewer.diffConfig.chunkSelections[chunkId];
          }

          // Reset visual state for both sides
          this.visualStateManager.resetVisualState(chunkId);

          // Remove resolved status from all elements with this chunk ID
          var chunkElements = ChunkUtils/* ChunkUtils */.N.getChunkElements(chunkId);
          chunkElements.forEach(function (element) {
            element.classList.remove(Selectors/* default */.A.STATUS.RESOLVED.name());
            element.classList.add(Selectors/* default */.A.STATUS.UNRESOLVED.name());
          });

          // Update navigation counter
          this._updateNavigationCounter();

          // Notify about selection change
          if (typeof this.chunkManager.onSelectionChange === 'function') {
            this.chunkManager.onSelectionChange();
          }
        } else {
          // Get the opposite side
          var oppositeSide = side === 'left' ? 'right' : 'left';

          // Debug before toggling
          Debug/* Debug */.y.log("ChunkSelectionHandler: Toggling chunk ".concat(chunkId), {
            selectedSide: side,
            oppositeSide: oppositeSide
          }, 3);

          // Toggle both sides
          this.toggleChunkSelection(chunkId, side, this.SELECTED);
          this.toggleChunkSelection(chunkId, oppositeSide, this.UNSELECTED);
        }
      }
    }

    /**
     * Toggle selection state of a chunk side
     * @param {string} chunkId - Chunk ID
     * @param {string} side - 'left' or 'right'
     * @param {string} state - Selection state constant (SELECTED or UNSELECTED)
     * @param {boolean} batch - Whether to use batching (default: false for backward compatibility)
     */
  }, {
    key: "toggleChunkSelection",
    value: function toggleChunkSelection(chunkId, side, state) {
      var batch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      // Update the selections object
      if (state === this.SELECTED) {
        this.selections[chunkId] = side;

        // Sync with diffConfig for compatibility
        this._syncWithDiffConfig(chunkId, side);

        // Update the navigation counter
        this._updateNavigationCounter();
        if (!batch) {
          // Add resolved status to all elements with this chunk ID
          var chunkElements = ChunkUtils/* ChunkUtils */.N.getChunkElements(chunkId);
          chunkElements.forEach(function (element) {
            element.classList.add(Selectors/* default */.A.STATUS.RESOLVED.name());
            element.classList.remove(Selectors/* default */.A.STATUS.UNRESOLVED.name());
          });
        }
      }

      // Update visual selection using the specialized component
      this.visualStateManager.updateVisualState(chunkId, side, state, batch);
    }

    /**
     * Sync selection with diffConfig
     * @private
     */
  }, {
    key: "_syncWithDiffConfig",
    value: function _syncWithDiffConfig(chunkId, side) {
      var _this$chunkManager$di2;
      if ((_this$chunkManager$di2 = this.chunkManager.diffViewer) !== null && _this$chunkManager$di2 !== void 0 && (_this$chunkManager$di2 = _this$chunkManager$di2.diffConfig) !== null && _this$chunkManager$di2 !== void 0 && _this$chunkManager$di2.chunkSelections) {
        this.chunkManager.diffViewer.diffConfig.chunkSelections[chunkId] = side;
      }
    }

    /**
     * Update navigation counter
     * @private
     */
  }, {
    key: "_updateNavigationCounter",
    value: function _updateNavigationCounter() {
      var _this$chunkManager$di3;
      if ((_this$chunkManager$di3 = this.chunkManager.diffViewer) !== null && _this$chunkManager$di3 !== void 0 && _this$chunkManager$di3.diffNavigator) {
        this.chunkManager.diffViewer.diffNavigator.updateCounter();
      }
    }

    /**
     * Get all selections
     * @returns {Object} Map of chunkId to selected side
     */
  }, {
    key: "getSelections",
    value: function getSelections() {
      return ChunkSelectionHandler_objectSpread({}, this.selections);
    }

    /**
     * Check if a chunk is resolved (has selection)
     * @param {string} chunkId - Chunk ID to check
     * @returns {boolean} True if resolved
     */
  }, {
    key: "isChunkResolved",
    value: function isChunkResolved(chunkId) {
      return !!this.selections[chunkId];
    }

    /**
     * Get unresolved chunk count
     * @returns {number} Number of unresolved chunks
     */
  }, {
    key: "getUnresolvedCount",
    value: function getUnresolvedCount() {
      var conflictChunks = this.chunkManager.chunks.filter(function (c) {
        return c.conflict;
      });
      return conflictChunks.length - Object.keys(this.selections).length;
    }

    /**
     * Clear all selections from both sides
     * @param {boolean} useBatch - Whether to use batching for performance (default: false for backward compatibility)
     */
  }, {
    key: "clearAllSelections",
    value: function clearAllSelections() {
      var _this4 = this;
      var useBatch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      // Get all chunks that need resolution
      var conflictChunks = this.chunkManager.chunks.filter(function (chunk) {
        return chunk.conflict || chunk.type === 'replace' || chunk.type === 'add' || chunk.type === 'delete';
      });

      // Check if we should use batching based on number of chunks
      var largeDiff = conflictChunks.length > 20; // Threshold for considering a diff as "large"
      useBatch = useBatch || largeDiff;

      // Show loader for large operations
      var loaderId = null;
      if (useBatch) {
        var selectedChunks = conflictChunks.filter(function (chunk) {
          return _this4.isChunkResolved(chunk.id);
        });
        if (selectedChunks.length > 50) {
          // Only show loader for large batches
          var translationManager = TranslationManager/* TranslationManager */.n.getInstance();
          var loaderManager = LoaderManager/* LoaderManager */.D.getInstance();
          var message = translationManager.get('processingChunks') || 'Processing chunks...';
          loaderId = loaderManager.showLoader(message, {
            fullscreen: true,
            zIndex: 9999
          });
        }
      }

      // Start tracking performance
      var startTime = performance.now();
      if (useBatch) {
        Debug/* Debug */.y.log("ChunkSelectionHandler: Clearing all selections using batch operations", null, 2);

        // First update internal state
        var _selectedChunks = conflictChunks.filter(function (chunk) {
          return _this4.isChunkResolved(chunk.id);
        });

        // Use a set for faster lookups
        var selectedChunkIds = new Set(_selectedChunks.map(function (chunk) {
          return chunk.id;
        }));

        // Collect all elements that need updating
        var elementsToUpdate = new Map();

        // Remove from internal objects efficiently
        selectedChunkIds.forEach(function (chunkId) {
          var _this4$chunkManager$d;
          // Remove from selections object
          delete _this4.selections[chunkId];

          // Remove from diffConfig if it exists
          if ((_this4$chunkManager$d = _this4.chunkManager.diffViewer) !== null && _this4$chunkManager$d !== void 0 && (_this4$chunkManager$d = _this4$chunkManager$d.diffConfig) !== null && _this4$chunkManager$d !== void 0 && _this4$chunkManager$d.chunkSelections) {
            delete _this4.chunkManager.diffViewer.diffConfig.chunkSelections[chunkId];
          }

          // Queue visual state reset with batching
          _this4.visualStateManager.resetVisualState(chunkId, true);

          // Collect elements for later class updates
          var elements = ChunkUtils/* ChunkUtils */.N.getChunkElements(chunkId);
          elementsToUpdate.set(chunkId, elements);
        });

        // Apply all visual updates in a batch
        this.visualStateManager.applyBatch(false); // Don't notify yet

        // Update element status classes in a separate batch
        requestAnimationFrame(function () {
          elementsToUpdate.forEach(function (elements, _chunkId) {
            elements.forEach(function (element) {
              element.classList.remove(Selectors/* default */.A.STATUS.RESOLVED.name());
              element.classList.add(Selectors/* default */.A.STATUS.UNRESOLVED.name());
            });
          });

          // Update navigation counter after all visual changes
          _this4._updateNavigationCounter();

          // Now notify about selection change
          if (typeof _this4.chunkManager.onSelectionChange === 'function') {
            _this4.chunkManager.onSelectionChange();
          }

          // Hide loader if it was shown
          if (loaderId) {
            var _loaderManager2 = LoaderManager/* LoaderManager */.D.getInstance();
            _loaderManager2.hideLoader(loaderId);
          }

          // Record performance metrics after all operations
          _this4._recordPerformanceMetrics(startTime);
        });
      } else {
        // Legacy approach - clear selection for each chunk individually
        conflictChunks.forEach(function (chunk) {
          var _this4$chunkManager$d2;
          // Skip chunks that aren't selected
          if (!_this4.isChunkResolved(chunk.id)) return;

          // Remove resolved status from all elements with this chunk ID
          var chunkElements = ChunkUtils/* ChunkUtils */.N.getChunkElements(chunk.id);
          chunkElements.forEach(function (element) {
            element.classList.remove(Selectors/* default */.A.STATUS.RESOLVED.name());
            element.classList.add(Selectors/* default */.A.STATUS.UNRESOLVED.name());
          });

          // Remove from selections object
          delete _this4.selections[chunk.id];

          // Remove from diffConfig if it exists
          if ((_this4$chunkManager$d2 = _this4.chunkManager.diffViewer) !== null && _this4$chunkManager$d2 !== void 0 && (_this4$chunkManager$d2 = _this4$chunkManager$d2.diffConfig) !== null && _this4$chunkManager$d2 !== void 0 && _this4$chunkManager$d2.chunkSelections) {
            delete _this4.chunkManager.diffViewer.diffConfig.chunkSelections[chunk.id];
          }

          // Reset visual state for both sides
          _this4.visualStateManager.resetVisualState(chunk.id);
        });

        // Update navigation counter
        this._updateNavigationCounter();

        // Callback to notify of selection change
        if (typeof this.chunkManager.onSelectionChange === 'function') {
          this.chunkManager.onSelectionChange();
        }

        // Record performance metrics
        this._recordPerformanceMetrics(startTime);
      }
    }
  }]);
}();

/***/ })

}]);
//# sourceMappingURL=diff-viewer-b4afe919.js.map