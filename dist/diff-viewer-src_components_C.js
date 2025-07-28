"use strict";
(this["webpackChunkdiff_files"] = this["webpackChunkdiff_files"] || []).push([["diff-viewer-src_components_C"],{

/***/ "./src/components/ChunkManager.js":
/*!****************************************!*\
  !*** ./src/components/ChunkManager.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChunkManager: () => (/* binding */ ChunkManager)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Debug */ "./src/utils/Debug.js");
/* harmony import */ var _utils_ChunkUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/ChunkUtils */ "./src/utils/ChunkUtils.js");
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/Selectors */ "./src/constants/Selectors.js");
/* harmony import */ var _chunks_ChunkRenderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chunks/ChunkRenderer */ "./src/components/chunks/ChunkRenderer.js");
/* harmony import */ var _chunks_ChunkSelectionHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chunks/ChunkSelectionHandler */ "./src/components/chunks/ChunkSelectionHandler.js");
/* harmony import */ var _chunks_MergeContentGenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chunks/MergeContentGenerator */ "./src/components/chunks/MergeContentGenerator.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// ChunkManager.js - Manages diff chunks and coordinates chunk components







/**
 * Manages diff chunks and coordinates chunk components
 */
var ChunkManager = /*#__PURE__*/function () {
  /**
   * @param {DiffViewer} diffViewer - Parent diff viewer
   */
  function ChunkManager(diffViewer) {
    _classCallCheck(this, ChunkManager);
    this.diffViewer = diffViewer;
    this.chunks = [];
    this.oldContent = [];
    this.newContent = [];
    this.chunkElements = [];

    // Create sub-components
    this.renderer = new _chunks_ChunkRenderer__WEBPACK_IMPORTED_MODULE_3__.ChunkRenderer(this);
    this.selectionHandler = new _chunks_ChunkSelectionHandler__WEBPACK_IMPORTED_MODULE_4__.ChunkSelectionHandler(this);
    this.contentGenerator = new _chunks_MergeContentGenerator__WEBPACK_IMPORTED_MODULE_5__.MergeContentGenerator(this);

    // Define selection state constants
    this.SELECTED_STATE = _constants_Selectors__WEBPACK_IMPORTED_MODULE_2__["default"].DIFF.CHUNK_SELECTED.name();
    this.UNSELECTED_STATE = _constants_Selectors__WEBPACK_IMPORTED_MODULE_2__["default"].DIFF.CHUNK_UNSELECTED.name();

    // Performance tracking
    this._performanceMetrics = {
      initTime: 0,
      renderTime: 0,
      chunkCount: 0
    };
    _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ChunkManager: Component initialized', null, 2);
  }

  /**
   * Initialize chunks from diff data
   * @param {Object} diffData - Diff data
   */
  return _createClass(ChunkManager, [{
    key: "initChunks",
    value: function initChunks(diffData) {
      var startTime = performance.now();
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ChunkManager: Initializing chunks from diff data', null, 2);

      // Clear previous cache state
      _utils_ChunkUtils__WEBPACK_IMPORTED_MODULE_1__.ChunkUtils.clearCache();

      // Save chunks data
      this.chunks = diffData.chunks || [];
      this.oldContent = diffData.old || [];
      this.newContent = diffData["new"] || [];

      // Track chunk count for performance metrics
      this._performanceMetrics.chunkCount = this.chunks.length;

      // Mark chunks with type 'replace' as conflicts for navigation
      this.chunks.forEach(function (chunk) {
        chunk.conflict = true;
      });
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ChunkManager: ".concat(this.chunks.length, " chunks initialized"), null, 3);

      // Update navigation counter if available
      if (this.diffViewer.diffNavigator) {
        this.diffViewer.diffNavigator.updateCounter();
      }
      var endTime = performance.now();
      this._performanceMetrics.initTime = endTime - startTime;
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ChunkManager: Initialization completed in ".concat(this._performanceMetrics.initTime.toFixed(2), "ms"), null, 2);

      // Validate chunk structure
      this.validateChunkStructure();
      return this.chunks;
    }

    /**
     * Render chunks to container
     */
  }, {
    key: "renderChunks",
    value: function renderChunks() {
      var startTime = performance.now();

      // Delegate to renderer component
      this.renderer.renderChunks();

      // Initialize the visual state manager
      if (this.selectionHandler.visualStateManager.initialize) {
        this.selectionHandler.visualStateManager.initialize();
      }

      // Setup chunk selection after rendering
      this.setupChunkSelection();

      // Initialize chunk elements for navigation
      this.initChunkElements();
      var endTime = performance.now();
      this._performanceMetrics.renderTime = endTime - startTime;
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ChunkManager: Rendering completed in ".concat(this._performanceMetrics.renderTime.toFixed(2), "ms"), {
        chunkCount: this._performanceMetrics.chunkCount,
        msPerChunk: (this._performanceMetrics.renderTime / Math.max(1, this._performanceMetrics.chunkCount)).toFixed(2)
      }, 2);
      return true;
    }

    /**
     * Setup chunk selection handlers
     */
  }, {
    key: "setupChunkSelection",
    value: function setupChunkSelection() {
      // Delegate to selection handler
      this.selectionHandler.setupChunkSelection();
    }

    /**
     * Toggle selection state of a chunk
     * @param {string} chunkId - Chunk ID
     * @param {string} side - 'left' or 'right'
     * @param {string} state - Selection state (this.SELECTED_STATE or this.UNSELECTED_STATE)
     */
  }, {
    key: "toggleChunkSelection",
    value: function toggleChunkSelection(chunkId, side, state) {
      this.selectionHandler.toggleChunkSelection(chunkId, side, state);
    }

    /**
     * Generate merged content based on selections
     * @returns {string} Merged content
     */
  }, {
    key: "generateMergedContent",
    value: function generateMergedContent() {
      var selections = this.selectionHandler.getSelections();
      return this.contentGenerator.generateMergedContent(selections);
    }

    /**
     * Generate content from lines array
     * @param {Array} lines - Array of line objects
     * @returns {string} Generated file content
     */
  }, {
    key: "generateFileFromLines",
    value: function generateFileFromLines(lines) {
      return this.contentGenerator.generateFileFromLines(lines);
    }

    /**
     * Initialize chunk elements array for navigation
     */
  }, {
    key: "initChunkElements",
    value: function initChunkElements() {
      var _this = this;
      // Create array to hold chunk elements
      this.chunkElements = [];

      // Debug total available chunks
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ChunkManager: Looking for ".concat(this.chunks.length, " chunks in DOM"), null, 2);
      this.chunks.forEach(function (chunk, index) {
        // Find elements for this chunk ID (using optimized cache query)
        var elements = _utils_ChunkUtils__WEBPACK_IMPORTED_MODULE_1__.ChunkUtils.getChunkElements(chunk.id);
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ChunkManager: Chunk ID ".concat(chunk.id, ": Found ").concat(elements.length, " elements"), null, 3);
        if (elements.length > 0) {
          // Sort by line number to get the first element
          var sortedElements = _utils_ChunkUtils__WEBPACK_IMPORTED_MODULE_1__.ChunkUtils.sortElementsByLineNumber(elements);

          // Store the first element for this chunk
          _this.chunkElements[index] = sortedElements[0];
        } else {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn("ChunkManager: No DOM elements found for chunk ID: ".concat(chunk.id), null, 2);
        }
      });
      var initializedCount = this.chunkElements.filter(Boolean).length;
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ChunkManager: Initialized ".concat(initializedCount, "/").concat(this.chunks.length, " chunk elements for navigation"), null, 2);

      // Log warning if no elements were found
      if (initializedCount === 0 && this.chunks.length > 0) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('ChunkManager: No chunk elements found in DOM. Navigation will not work properly.', null, 1);

        // Check if elements with the expected selector exist at all
        var anyChunkElements = document.querySelectorAll(_constants_Selectors__WEBPACK_IMPORTED_MODULE_2__["default"].DIFF.CHUNK);
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn("ChunkManager: ".concat(anyChunkElements.length, " elements match the chunk selector ").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_2__["default"].DIFF.CHUNK), null, 2);

        // Check if any elements have data-chunk-id attribute
        var anyChunkIdElements = document.querySelectorAll('[data-chunk-id]');
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn("ChunkManager: ".concat(anyChunkIdElements.length, " elements have data-chunk-id attribute"), null, 2);
      }
    }

    /**
     * Validate chunk data structure for proper merge operations
     */
  }, {
    key: "validateChunkStructure",
    value: function validateChunkStructure() {
      var validChunks = 0;
      var invalidChunks = 0;
      this.chunks.forEach(function (chunk) {
        // Check if chunk has proper old/new content arrays
        if (!chunk.old && !chunk["new"]) {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn("ChunkManager: Chunk ".concat(chunk.id, " missing content arrays"), chunk, 2);
          invalidChunks++;
        } else if (chunk.type === 'replace' && (!chunk.old || !chunk["new"])) {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn("ChunkManager: Replace chunk ".concat(chunk.id, " missing old or new content"), chunk, 2);
          invalidChunks++;
        } else {
          validChunks++;
        }
      });
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ChunkManager: Chunk validation complete", {
        valid: validChunks,
        invalid: invalidChunks,
        total: this.chunks.length
      }, 2);
      return invalidChunks === 0;
    }

    /**
     * Get performance metrics for this component
     * @returns {Object} Performance metrics
     */
  }, {
    key: "getPerformanceMetrics",
    value: function getPerformanceMetrics() {
      var metrics = _objectSpread({}, this._performanceMetrics);

      // Add metrics from subcomponents
      if (this.selectionHandler.visualStateManager.getMetrics) {
        metrics.visualStateManager = this.selectionHandler.visualStateManager.getMetrics();
      }

      // Add cache stats
      metrics.cacheStats = _utils_ChunkUtils__WEBPACK_IMPORTED_MODULE_1__.ChunkUtils.getCacheStats();
      return metrics;
    }

    /**
     * Get selections
     * @returns {Object} Current selections
     */
  }, {
    key: "selections",
    get: function get() {
      return this.selectionHandler.getSelections();
    }

    /**
     * Handle selection change callback
     * This maintains compatibility with external code expecting this function
     */
  }, {
    key: "onSelectionChange",
    value: function onSelectionChange() {
      // This can be overridden by DiffViewer
    }
  }]);
}();

/***/ }),

/***/ "./src/components/DiffNavigator.js":
/*!*****************************************!*\
  !*** ./src/components/DiffNavigator.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiffNavigator: () => (/* binding */ DiffNavigator)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Debug */ "./src/utils/Debug.js");
/* harmony import */ var _navigator_NavigationCounter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navigator/NavigationCounter */ "./src/components/navigator/NavigationCounter.js");
/* harmony import */ var _navigator_NavigationUIBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./navigator/NavigationUIBuilder */ "./src/components/navigator/NavigationUIBuilder.js");
/* harmony import */ var _navigator_ConflictNavigator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./navigator/ConflictNavigator */ "./src/components/navigator/ConflictNavigator.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





/**
 * DiffNavigator handles navigation between conflicting chunks
 */
var DiffNavigator = /*#__PURE__*/function () {
  /**
   * @param {DiffViewer} diffViewer - Parent diff viewer component
   * @param {boolean} initializeImmediately - Whether to initialize navigation immediately
   */
  function DiffNavigator(diffViewer) {
    var initializeImmediately = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    _classCallCheck(this, DiffNavigator);
    this.diffViewer = diffViewer;
    this.currentChunkIndex = -1;

    // Validate that the diffViewer has a valid configuration
    if (!this.diffViewer || !this.diffViewer.chunkManager) {
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('DiffNavigator: Failed to initialize - diffViewer or chunkManager is missing', null, 1);
      return;
    }

    // Create subcomponents
    this.navigationCounter = new _navigator_NavigationCounter__WEBPACK_IMPORTED_MODULE_1__.NavigationCounter(this);
    this.uiBuilder = new _navigator_NavigationUIBuilder__WEBPACK_IMPORTED_MODULE_2__.NavigationUIBuilder(this);
    this.conflictNavigator = new _navigator_ConflictNavigator__WEBPACK_IMPORTED_MODULE_3__.ConflictNavigator(this);

    // Initialize navigation only if requested
    if (initializeImmediately) {
      this.initNavigation();
    }
    _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffNavigator: Component created', null, 2);
  }

  /**
   * Initialize navigation
   */
  return _createClass(DiffNavigator, [{
    key: "initNavigation",
    value: function initNavigation() {
      var _this$diffViewer$chun;
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffNavigator: Initializing', null, 2);

      // Validate that we have chunks before proceeding
      if (!this.diffViewer.chunkManager.chunks || this.diffViewer.chunkManager.chunks.length === 0) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn('DiffNavigator: No diff chunks found in configuration', {
          configChunks: this.diffViewer.chunkManager.chunks,
          diffConfig: this.diffViewer.diffConfig
        }, 1);

        // Add navigation UI anyway for better UX, but disable buttons
        this.addNavigationButtons(true);
        return;
      }

      // Add navigation UI
      this.addNavigationButtons();

      // Add keyboard shortcuts
      this.setupKeyboardShortcuts();

      // Navigate to first conflict if any
      this.navigateToFirstConflict();
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffNavigator: Initialized with chunk navigation', {
        chunks: ((_this$diffViewer$chun = this.diffViewer.chunkManager.chunks) === null || _this$diffViewer$chun === void 0 ? void 0 : _this$diffViewer$chun.length) || 0
      }, 2);
    }

    /**
     * Add navigation buttons to the interface
     * @param {boolean} disableButtons - Whether to disable navigation buttons
     */
  }, {
    key: "addNavigationButtons",
    value: function addNavigationButtons() {
      var disableButtons = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      // Create UI elements
      var ui = this.uiBuilder.createNavigationUI();
      if (!ui) return;

      // Save references to counter and buttons
      this.navigationCounter.setCounterElement(ui.counter);
      this.navigationCounter.setButtons(ui.prevButton, ui.nextButton);

      // Disable buttons if requested
      if (disableButtons) {
        ui.prevButton.disabled = true;
        ui.nextButton.disabled = true;
        ui.counter.textContent = 'No diff data';
      } else {
        // Update counter with current count
        this.updateCounter();
      }
    }

    /**
     * Set up keyboard shortcuts for navigation
     */
  }, {
    key: "setupKeyboardShortcuts",
    value: function setupKeyboardShortcuts() {
      var _this = this;
      document.addEventListener('keydown', function (event) {
        // Only handle if not in input or textarea
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
          return;
        }

        // Check for navigation keys
        switch (event.key) {
          case 'ArrowDown':
            if (event.ctrlKey || event.metaKey) {
              event.preventDefault();
              _this.navigateToNextConflict();
            }
            break;
          case 'ArrowUp':
            if (event.ctrlKey || event.metaKey) {
              event.preventDefault();
              _this.navigateToPrevConflict();
            }
            break;
        }
      });
    }

    /**
     * Update navigation counter
     * @returns {Array} Active conflicts
     */
  }, {
    key: "updateCounter",
    value: function updateCounter() {
      return this.navigationCounter.updateCounter();
    }

    /**
     * Navigate to the first conflict
     */
  }, {
    key: "navigateToFirstConflict",
    value: function navigateToFirstConflict() {
      // Verify chunks exist before attempting navigation
      if (!this.diffViewer.chunkManager.chunks || this.diffViewer.chunkManager.chunks.length === 0) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn('DiffNavigator: Cannot navigate - no chunks available', null, 2);
        return false;
      }
      return this.conflictNavigator.navigateToFirstConflict();
    }

    /**
     * Navigate to the next conflict
     */
  }, {
    key: "navigateToNextConflict",
    value: function navigateToNextConflict() {
      // Verify chunks exist before attempting navigation
      if (!this.diffViewer.chunkManager.chunks || this.diffViewer.chunkManager.chunks.length === 0) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn('DiffNavigator: Cannot navigate - no chunks available', null, 2);
        return false;
      }
      return this.conflictNavigator.navigateToNextConflict();
    }

    /**
     * Navigate to the previous conflict
     */
  }, {
    key: "navigateToPrevConflict",
    value: function navigateToPrevConflict() {
      // Verify chunks exist before attempting navigation
      if (!this.diffViewer.chunkManager.chunks || this.diffViewer.chunkManager.chunks.length === 0) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn('DiffNavigator: Cannot navigate - no chunks available', null, 2);
        return false;
      }
      return this.conflictNavigator.navigateToPrevConflict();
    }

    /**
     * Navigate to a specific chunk
     * @param {number} index - Chunk index
     * @returns {boolean} Success status
     */
  }, {
    key: "navigateToChunk",
    value: function navigateToChunk(index) {
      // Verify chunks exist before attempting navigation
      if (!this.diffViewer.chunkManager.chunks || this.diffViewer.chunkManager.chunks.length === 0) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn('DiffNavigator: Cannot navigate - no chunks available', null, 2);
        return false;
      }
      return this.conflictNavigator.navigateToChunk(index);
    }

    /**
     * Destroy component and clean up event handlers
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this.uiBuilder.destroy();
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffNavigator: Destroyed', null, 2);
    }
  }]);
}();

/***/ }),

/***/ "./src/components/DiffViewer.js":
/*!**************************************!*\
  !*** ./src/components/DiffViewer.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiffViewer: () => (/* binding */ DiffViewer)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Debug */ "./src/utils/Debug.js");
/* harmony import */ var _utils_ResourceLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/ResourceLoader */ "./src/utils/ResourceLoader.js");
/* harmony import */ var _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/DOMUtils */ "./src/utils/DOMUtils.js");
/* harmony import */ var _utils_ConfigUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/ConfigUtils */ "./src/utils/ConfigUtils.js");
/* harmony import */ var _utils_EndpointDiscovery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/EndpointDiscovery */ "./src/utils/EndpointDiscovery.js");
/* harmony import */ var _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/TranslationManager */ "./src/utils/TranslationManager.js");
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constants/Selectors */ "./src/constants/Selectors.js");
/* harmony import */ var _ThemeManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ThemeManager */ "./src/components/ThemeManager.js");
/* harmony import */ var _ThemeSelector__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ThemeSelector */ "./src/components/ThemeSelector.js");
/* harmony import */ var _SyntaxHighlighter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SyntaxHighlighter */ "./src/components/SyntaxHighlighter.js");
/* harmony import */ var _ChunkManager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ChunkManager */ "./src/components/ChunkManager.js");
/* harmony import */ var _ThemeToggle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ThemeToggle */ "./src/components/ThemeToggle.js");
/* harmony import */ var _MergeHandler__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./MergeHandler */ "./src/components/MergeHandler.js");
/* harmony import */ var _DiffNavigator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./DiffNavigator */ "./src/components/DiffNavigator.js");
/* harmony import */ var _viewer_ScrollSynchronizer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./viewer/ScrollSynchronizer */ "./src/components/viewer/ScrollSynchronizer.js");
/* harmony import */ var _viewer_IconMarkerManager__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./viewer/IconMarkerManager */ "./src/components/viewer/IconMarkerManager.js");
/* harmony import */ var _viewer_LayoutManager__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./viewer/LayoutManager */ "./src/components/viewer/LayoutManager.js");
/* harmony import */ var _modal_ModalManager__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./modal/ModalManager */ "./src/components/modal/ModalManager.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



















/**
 * Main diff viewer component
 */
var DiffViewer = /*#__PURE__*/function () {
  /**
   * @param {Object} options - Configuration options
   */
  function DiffViewer() {
    var _window$diffConfig, _window$diffConfig2, _window$diffConfig3, _window$diffConfig4, _window$diffConfig5, _window$diffConfig6, _window$diffConfig7, _window$diffConfig8, _window$diffConfig9;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, DiffViewer);
    // Default configuration matching PHP javascript section structure
    var defaultOptions = {
      // Basic configuration
      lang: 'en',
      debug: false,
      logLevel: 2,
      // Theme settings
      theme: {
        defaultFamily: 'atom-one',
        defaultMode: 'dark',
        showSelector: true
      },
      // API endpoint
      apiEndpoint: null

      // We've removed default translations from here as they'll be handled by TranslationManager
    };

    // Merge options in priority order
    // Configuration comes from: defaults < window.diffConfig < constructor options
    this.config = _utils_ConfigUtils__WEBPACK_IMPORTED_MODULE_3__.ConfigUtils.mergeConfigurations(defaultOptions, window.diffConfig || {}, options);

    // Create separate internal runtime properties
    this.runtimeProps = {
      diffData: options.diffData || ((_window$diffConfig = window.diffConfig) === null || _window$diffConfig === void 0 ? void 0 : _window$diffConfig.diffData) || null,
      serverSaveEnabled: options.serverSaveEnabled || ((_window$diffConfig2 = window.diffConfig) === null || _window$diffConfig2 === void 0 ? void 0 : _window$diffConfig2.serverSaveEnabled) || false,
      // SECURITY: Remove server paths and use only secure fileRefIds
      fileRefId: options.fileRefId || ((_window$diffConfig3 = window.diffConfig) === null || _window$diffConfig3 === void 0 ? void 0 : _window$diffConfig3.fileRefId) || '',
      oldFileRefId: options.oldFileRefId || ((_window$diffConfig4 = window.diffConfig) === null || _window$diffConfig4 === void 0 ? void 0 : _window$diffConfig4.oldFileRefId) || '',
      // Keep safe filename properties (not paths)
      newFileName: options.newFileName || ((_window$diffConfig5 = window.diffConfig) === null || _window$diffConfig5 === void 0 ? void 0 : _window$diffConfig5.newFileName) || '',
      oldFileName: options.oldFileName || ((_window$diffConfig6 = window.diffConfig) === null || _window$diffConfig6 === void 0 ? void 0 : _window$diffConfig6.oldFileName) || '',
      isIdentical: options.isIdentical || ((_window$diffConfig7 = window.diffConfig) === null || _window$diffConfig7 === void 0 ? void 0 : _window$diffConfig7.isIdentical) || false,
      filepath: options.filepath || ((_window$diffConfig8 = window.diffConfig) === null || _window$diffConfig8 === void 0 ? void 0 : _window$diffConfig8.filepath) || null,
      demoEnabled: options.demoEnabled || ((_window$diffConfig9 = window.diffConfig) === null || _window$diffConfig9 === void 0 ? void 0 : _window$diffConfig9.demoEnabled) || false
    };

    // Store the main loader ID if provided from window.enableDiffViewer
    this.mainLoaderId = options.mainLoaderId || null;

    // Set debug values early
    _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.initialize(this.config.debug, '[DiffViewer]', this.config.logLevel || 2);

    // Initialize TranslationManager with the translations from the config
    var translationManager = _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_5__.TranslationManager.getInstance();
    if (!translationManager.isInitialized() && this.config.translations) {
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffViewer: Initializing TranslationManager', {
        lang: this.config.lang || 'en',
        translations: this.config.translations
      }, 2);
      translationManager.initialize(this.config.lang || 'en', this.config.translations);
    } else {
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffViewer: TranslationManager already initialized', null, 2);
    }

    // Get container element - now always using Selectors.DIFF.VIEWER
    this.container = document.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_6__["default"].DIFF.VIEWER);
    if (!this.container) {
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('DiffViewer: Container element not found', null, 2);
      throw new Error('Container element not found');
    }

    // Verify diff data
    if (!this.runtimeProps.diffData) {
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('DiffViewer: No diff data provided', null, 2);
      throw new Error('No diff data provided');
    }
    _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffViewer: Initializing component', null, 2);

    // Initialize services (singletons)
    this._initializeServices();

    // Create components
    this._createComponents();
    _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffViewer: Component created', null, 2);
  }

  /**
   * Initialize service singletons
   * @private
   */
  return _createClass(DiffViewer, [{
    key: "_initializeServices",
    value: function _initializeServices() {
      // Get service singletons
      this.resourceLoader = _utils_ResourceLoader__WEBPACK_IMPORTED_MODULE_1__.ResourceLoader.getInstance();
      this.themeManager = _ThemeManager__WEBPACK_IMPORTED_MODULE_7__.ThemeManager.getInstance();
      this.themeSelector = _ThemeSelector__WEBPACK_IMPORTED_MODULE_8__.ThemeSelector.getInstance(this);
      this.modalManager = _modal_ModalManager__WEBPACK_IMPORTED_MODULE_17__.ModalManager.getInstance({
        debug: this.config.debug,
        translations: this.config.translations
      });

      // Initialize ThemeManager with config and ResourceLoader
      this.themeManager.initialize({
        theme: this.config.theme
      }, this.resourceLoader);
    }

    /**
     * Create component instances
     * @private
     */
  }, {
    key: "_createComponents",
    value: function _createComponents() {
      // Create core components
      this.syntaxHighlighter = new _SyntaxHighlighter__WEBPACK_IMPORTED_MODULE_9__.SyntaxHighlighter(this);
      this.chunkManager = new _ChunkManager__WEBPACK_IMPORTED_MODULE_10__.ChunkManager(this);

      // Create UI components - pass browserUIManager to ThemeToggle if available
      this.themeToggle = new _ThemeToggle__WEBPACK_IMPORTED_MODULE_11__.ThemeToggle(this.browserUIManager, _constants_Selectors__WEBPACK_IMPORTED_MODULE_6__["default"].THEME.TOGGLE.name(), _constants_Selectors__WEBPACK_IMPORTED_MODULE_6__["default"].CONTAINER.WRAPPER.name());
      this.mergeHandler = new _MergeHandler__WEBPACK_IMPORTED_MODULE_12__.MergeHandler(this);

      // Create DiffNavigator but don't initialize it yet - it will be initialized after chunks are loaded
      this.diffNavigator = new _DiffNavigator__WEBPACK_IMPORTED_MODULE_13__.DiffNavigator(this, false);

      // Create layout components
      this.scrollSynchronizer = new _viewer_ScrollSynchronizer__WEBPACK_IMPORTED_MODULE_14__.ScrollSynchronizer(this);
      this.iconMarkerManager = new _viewer_IconMarkerManager__WEBPACK_IMPORTED_MODULE_15__.IconMarkerManager(this);
      this.layoutManager = new _viewer_LayoutManager__WEBPACK_IMPORTED_MODULE_16__.LayoutManager(this);
    }

    /**
     * Initialize the diff viewer and render content
     */
  }, {
    key: "initialize",
    value: (function () {
      var _initialize = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffViewer: Beginning initialization', null, 2);
              _context.prev = 1;
              _context.next = 4;
              return this._initializeData();
            case 4:
              _context.next = 6;
              return this._loadResources();
            case 6:
              _context.next = 8;
              return this._renderUI();
            case 8:
              _context.next = 10;
              return this._setupUIFeatures();
            case 10:
              // Display demo mode warning if enabled
              if (this.runtimeProps.demoEnabled) {
                this._showDemoModeWarning();
              }

              // Initialize ModalManager early
              this.modalManager.initModals();
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffViewer: Initialization complete', null, 2);
              return _context.abrupt("return", true);
            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](1);
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('DiffViewer: Error during initialization:', _context.t0, 2);
              this._handleInitializationError(_context.t0);
              throw _context.t0;
            case 21:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[1, 16]]);
      }));
      function initialize() {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }()
    /**
     * Handle initialization error
     * @private
     */
    )
  }, {
    key: "_handleInitializationError",
    value: function _handleInitializationError(error) {
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('DiffViewer: Error handling initialization failure', error, 2);

      // Get translation manager for error display
      var translationManager = _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_5__.TranslationManager.getInstance();
      var errorText = translationManager.get('errorLoadingDiff') || 'Error Loading Diff Viewer';

      // Display error message in container
      var errorMessage = document.createElement('div');
      errorMessage.className = "".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_6__["default"].UTILITY.ALERT_DANGER.name(), " vdm-m-3");
      errorMessage.innerHTML = "\n            <h4>".concat(errorText, "</h4>\n            <p>").concat(error.message || 'An unexpected error occurred.', "</p>\n        ");

      // Add error to container
      if (this.container) {
        // Keep existing content, just append the error
        this.container.appendChild(errorMessage);

        // Make sure container is visible
        this.container.style.display = 'flex';
      }
    }

    /**
     * Initialize data structures
     * @private
     */
  }, {
    key: "_initializeData",
    value: (function () {
      var _initializeData2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _this$runtimeProps$di, _this$runtimeProps$di2, _this$runtimeProps$di3;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              // Initialize chunks from diff data
              this.chunkManager.initChunks(this.runtimeProps.diffData);
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("DiffViewer: Loaded ".concat(((_this$runtimeProps$di = this.runtimeProps.diffData.chunks) === null || _this$runtimeProps$di === void 0 ? void 0 : _this$runtimeProps$di.length) || 0, " chunks and content arrays: old=").concat(((_this$runtimeProps$di2 = this.runtimeProps.diffData.old) === null || _this$runtimeProps$di2 === void 0 ? void 0 : _this$runtimeProps$di2.length) || 0, ", new=").concat(((_this$runtimeProps$di3 = this.runtimeProps.diffData["new"]) === null || _this$runtimeProps$di3 === void 0 ? void 0 : _this$runtimeProps$di3.length) || 0), null, 2);
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function _initializeData() {
        return _initializeData2.apply(this, arguments);
      }
      return _initializeData;
    }()
    /**
     * Load required resources
     * @private
     */
    )
  }, {
    key: "_loadResources",
    value: (function () {
      var _loadResources2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var currentTheme;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (this.syntaxHighlighter.highlightJsLoaded) {
                _context3.next = 5;
                break;
              }
              _context3.next = 3;
              return this.syntaxHighlighter.initialize();
            case 3:
              _context3.next = 5;
              return this.syntaxHighlighter.loadHighlightJs();
            case 5:
              // Load theme through ThemeManager
              currentTheme = this.themeManager.getCurrentTheme();
              _context3.next = 8;
              return this.themeManager.applyTheme(currentTheme.family, currentTheme.mode);
            case 8:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function _loadResources() {
        return _loadResources2.apply(this, arguments);
      }
      return _loadResources;
    }()
    /**
     * Render UI components
     * @private
     */
    )
  }, {
    key: "_renderUI",
    value: (function () {
      var _renderUI2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var _this$runtimeProps$di4, _diffContainer$parent, _diffContainer$parent2;
        var containerWrapper, themeSwitcher, diffContainer;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              // Make sure container is visible
              if (this.container) {
                this.container.style.display = 'flex';
              }

              // Render the diff chunks
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("DiffViewer: Rendering ".concat(((_this$runtimeProps$di4 = this.runtimeProps.diffData.chunks) === null || _this$runtimeProps$di4 === void 0 ? void 0 : _this$runtimeProps$di4.length) || 0, " chunks"), null, 2);
              this.chunkManager.renderChunks();

              // Apply syntax highlighting
              this.syntaxHighlighter.highlightAll(this.container);

              // Initialize theme based on preference
              this.themeToggle.initialize();

              // Initialize theme selector if enabled
              if (this.config.theme.showSelector) {
                this.themeSelector.initialize();
              }

              // Mark container as loaded using DOMUtils
              _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__.DOMUtils.toggleClass(_constants_Selectors__WEBPACK_IMPORTED_MODULE_6__["default"].DIFF.CONTAINER.name(), 'loaded', true);

              // Show the content wrapper if needed
              containerWrapper = document.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_6__["default"].CONTAINER.WRAPPER);
              if (containerWrapper !== null && containerWrapper !== void 0 && containerWrapper.classList.contains('vdm-d-none')) {
                containerWrapper.classList.remove('vdm-d-none');
              }

              // Fix theme switcher position - move it above the diff container
              themeSwitcher = document.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_6__["default"].THEME.SWITCHER);
              diffContainer = document.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_6__["default"].DIFF.CONTAINER);
              diffContainer === null || diffContainer === void 0 || (_diffContainer$parent = diffContainer.parentNode) === null || _diffContainer$parent === void 0 || (_diffContainer$parent2 = _diffContainer$parent.insertBefore) === null || _diffContainer$parent2 === void 0 || _diffContainer$parent2.call(_diffContainer$parent, themeSwitcher, diffContainer);
              if (themeSwitcher && diffContainer) {
                _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffViewer: Repositioned theme switcher above diff container', null, 2);
              }
            case 13:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function _renderUI() {
        return _renderUI2.apply(this, arguments);
      }
      return _renderUI;
    }()
    /**
     * Set up UI features and enhancements
     * @private
     */
    )
  }, {
    key: "_setupUIFeatures",
    value: (function () {
      var _setupUIFeatures2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var diffLoadedEvent;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              // Set up scroll synchronization
              this.scrollSynchronizer.setupSynchronizedScrolling();

              // Initialize layout manager
              this.layoutManager.initialize();

              // Set up icon markers
              this.iconMarkerManager.initializeIconMarkers();

              // Initialize the DiffNavigator AFTER chunks are loaded and rendered
              if (this.diffNavigator) {
                _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffViewer: Initializing navigation with loaded chunks', null, 2);
                this.diffNavigator.initNavigation();
              }

              // Dispatch a custom event to notify that the diff viewer has finished loading
              // This allows other components to know when the diff viewer is ready
              diffLoadedEvent = new CustomEvent('vdm-diff-loaded', {
                detail: {
                  timestamp: new Date(),
                  viewer: this
                }
              });
              document.dispatchEvent(diffLoadedEvent);
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffViewer: Dispatched vdm-diff-loaded event', null, 2);
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffViewer: UI features and enhancements set up', null, 2);
            case 8:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function _setupUIFeatures() {
        return _setupUIFeatures2.apply(this, arguments);
      }
      return _setupUIFeatures;
    }()
    /**
     * Display a warning message for demo mode
     * @private
     */
    )
  }, {
    key: "_showDemoModeWarning",
    value: function _showDemoModeWarning() {
      var _this$browserUIManage;
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffViewer: Showing demo mode warning', null, 2);

      // Use the AlertManager to show the warning
      var AlertManager = window.AlertManager || ((_this$browserUIManage = this.browserUIManager) === null || _this$browserUIManage === void 0 ? void 0 : _this$browserUIManage.AlertManager);
      if (AlertManager) {
        var alertManager = AlertManager.getInstance();

        // Find the form element to place the alert before
        var comparisonForm = document.querySelector('#vdm-file-comparison-form');

        // Show warning about demo mode
        alertManager.showAlert("<strong>Demo Mode Active</strong> - Merging is disabled on this server and will be simulated.\n                To use the file browser with actual file modifications, please install Visual Diff Merge on your own server.", 'warning', {
          dismissable: true,
          className: 'vdm-mb-3',
          translate: false,
          // Disable translation
          targetElement: comparisonForm,
          // Place before the form
          placement: 'before',
          timeout: 0 // Prevent auto-dismiss
        });
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffViewer: Demo mode warning displayed via AlertManager', null, 2);
      }
    }

    /**
     * Updates configuration with new values
     * @param {Object} newConfig - New configuration values to apply
     */
  }, {
    key: "updateConfig",
    value: function updateConfig(newConfig) {
      if (!newConfig) return;

      // Merge new config with current config
      this.config = _utils_ConfigUtils__WEBPACK_IMPORTED_MODULE_3__.ConfigUtils.mergeConfigurations(this.config, newConfig);
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffViewer: Configuration updated', newConfig, 3);
    }

    /**
     * Updates runtime properties
     * @param {Object} props - New runtime properties to apply
     */
  }, {
    key: "updateRuntimeProps",
    value: function updateRuntimeProps(props) {
      if (!props) return;

      // Merge new runtime properties with current ones
      this.runtimeProps = _objectSpread(_objectSpread({}, this.runtimeProps), props);
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffViewer: Runtime properties updated', props, 3);
    }

    /**
     * Get the current configuration
     * @returns {Object} Current configuration
     */
  }, {
    key: "getConfig",
    value: function getConfig() {
      return _objectSpread({}, this.config);
    }

    /**
     * Get the current runtime properties
     * @returns {Object} Current runtime properties
     */
  }, {
    key: "getRuntimeProps",
    value: function getRuntimeProps() {
      var _window$diffConfig10, _window$diffConfig11, _window$diffConfig12, _window$diffConfig13;
      // DEBUG: Add logging to identify when this method is called and what it returns
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffViewer.getRuntimeProps called', {
        fileRefId: this.runtimeProps.fileRefId || '(none)',
        oldFileRefId: this.runtimeProps.oldFileRefId || '(none)',
        newFileName: this.runtimeProps.newFileName || '(none)',
        oldFileName: this.runtimeProps.oldFileName || '(none)',
        // Also check if these properties are in window.diffConfig
        windowDiffConfig: {
          hasFileRefId: window.diffConfig && 'fileRefId' in window.diffConfig,
          fileRefId: ((_window$diffConfig10 = window.diffConfig) === null || _window$diffConfig10 === void 0 ? void 0 : _window$diffConfig10.fileRefId) || '(none)',
          hasOldFileRefId: window.diffConfig && 'oldFileRefId' in window.diffConfig,
          oldFileRefId: ((_window$diffConfig11 = window.diffConfig) === null || _window$diffConfig11 === void 0 ? void 0 : _window$diffConfig11.oldFileRefId) || '(none)',
          hasNewFileName: window.diffConfig && 'newFileName' in window.diffConfig,
          newFileName: ((_window$diffConfig12 = window.diffConfig) === null || _window$diffConfig12 === void 0 ? void 0 : _window$diffConfig12.newFileName) || '(none)',
          hasOldFileName: window.diffConfig && 'oldFileName' in window.diffConfig,
          oldFileName: ((_window$diffConfig13 = window.diffConfig) === null || _window$diffConfig13 === void 0 ? void 0 : _window$diffConfig13.oldFileName) || '(none)'
        }
      }, 3);
      return _objectSpread({}, this.runtimeProps);
    }

    /**
     * Clean up event handlers and resources
     */
  }, {
    key: "destroy",
    value: function destroy() {
      // Destroy layout manager
      if (this.layoutManager) {
        this.layoutManager.destroy();
      }

      // Clean up diffNavigator
      if (this.diffNavigator) {
        this.diffNavigator.destroy();
      }

      // Remove loaded class from container
      _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__.DOMUtils.toggleClass(_constants_Selectors__WEBPACK_IMPORTED_MODULE_6__["default"].DIFF.CONTAINER.name(), 'loaded', false);

      // Additional cleanup as needed
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffViewer: Component destroyed', null, 2);
    }

    /**
     * Initialize runtime properties
     */
  }, {
    key: "initializeRuntimeProps",
    value: function initializeRuntimeProps() {
      var _window$diffConfig14, _window$diffConfig15, _window$diffConfig16, _window$diffConfig17, _window$diffConfig18, _window$diffConfig19;
      // Common runtime properties
      this.runtimeProps = {
        diffData: this.options.diffData || {},
        serverSaveEnabled: this.options.serverSaveEnabled || false,
        // SECURITY: Use only secure fileRefIds and filenames, not server paths
        fileRefId: this.options.fileRefId || ((_window$diffConfig14 = window.diffConfig) === null || _window$diffConfig14 === void 0 ? void 0 : _window$diffConfig14.fileRefId) || '',
        oldFileRefId: this.options.oldFileRefId || ((_window$diffConfig15 = window.diffConfig) === null || _window$diffConfig15 === void 0 ? void 0 : _window$diffConfig15.oldFileRefId) || '',
        newFileName: this.options.newFileName || ((_window$diffConfig16 = window.diffConfig) === null || _window$diffConfig16 === void 0 ? void 0 : _window$diffConfig16.newFileName) || '',
        oldFileName: this.options.oldFileName || ((_window$diffConfig17 = window.diffConfig) === null || _window$diffConfig17 === void 0 ? void 0 : _window$diffConfig17.oldFileName) || '',
        isIdentical: this.options.isIdentical || ((_window$diffConfig18 = window.diffConfig) === null || _window$diffConfig18 === void 0 ? void 0 : _window$diffConfig18.isIdentical) || false,
        filepath: this.options.filepath || ((_window$diffConfig19 = window.diffConfig) === null || _window$diffConfig19 === void 0 ? void 0 : _window$diffConfig19.filepath) || ''
      };
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffViewer: Runtime properties initialized', this.runtimeProps, 3);
    }

    /**
     * Check if the content has been beautified
     * @returns {boolean} True if content has been beautified
     */
  }, {
    key: "isContentBeautified",
    value: function isContentBeautified() {
      // Check if the beautified flag exists in runtime properties
      // If not defined, default to false
      return this.runtimeProps.isBeautified || false;
    }

    /**
     * Get API endpoint by name
     * @param {string} endpointName - Name of the endpoint to get
     * @returns {Promise<string>} The endpoint URL
     */
  }, {
    key: "getEndpoint",
    value: (function () {
      var _getEndpoint = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(endpointName) {
        var endpointDiscovery, endpoint, _this$config, defaultEndpoints;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("DiffViewer: Getting endpoint for ".concat(endpointName), null, 2);
              _context6.prev = 1;
              // Use EndpointDiscovery if available
              endpointDiscovery = _utils_EndpointDiscovery__WEBPACK_IMPORTED_MODULE_4__.EndpointDiscovery.getInstance();
              _context6.next = 5;
              return endpointDiscovery.getEndpoint(endpointName);
            case 5:
              endpoint = _context6.sent;
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("DiffViewer: Found endpoint for ".concat(endpointName), endpoint, 2);
              return _context6.abrupt("return", endpoint);
            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](1);
              // Fall back to config or default endpoints
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn("DiffViewer: Error getting endpoint for ".concat(endpointName, ", using fallback"), _context6.t0, 1);

              // Check if we have endpoints in the config
              if (!((_this$config = this.config) !== null && _this$config !== void 0 && _this$config.apiEndpoints[endpointName])) {
                _context6.next = 15;
                break;
              }
              return _context6.abrupt("return", this.config.apiEndpoints[endpointName]);
            case 15:
              // Default endpoints as a last resort
              defaultEndpoints = {
                'ajaxDiffMerge': '../api/ajax-diff-merge.php',
                'diffProcessor': '../api/diff-processor.php'
              };
              return _context6.abrupt("return", defaultEndpoints[endpointName] || '../api/' + endpointName + '.php');
            case 17:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this, [[1, 10]]);
      }));
      function getEndpoint(_x) {
        return _getEndpoint.apply(this, arguments);
      }
      return getEndpoint;
    }()
    /**
     * Set the BrowserUIManager instance
     * @param {Object} browserUIManager - BrowserUIManager instance
     * @returns {DiffViewer} This instance for method chaining
     */
    )
  }, {
    key: "setBrowserUIManager",
    value: function setBrowserUIManager(browserUIManager) {
      this.browserUIManager = browserUIManager;

      // Update references in components that need the BrowserUIManager
      if (this.themeToggle) {
        this.themeToggle.setBrowserUIManager(browserUIManager);
      }
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffViewer: BrowserUIManager reference set', null, 2);
      return this;
    }
  }]);
}();

/***/ }),

/***/ "./src/components/MergeHandler.js":
/*!****************************************!*\
  !*** ./src/components/MergeHandler.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MergeHandler: () => (/* binding */ MergeHandler)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Debug */ "./src/utils/Debug.js");
/* harmony import */ var _utils_AlertManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/AlertManager */ "./src/utils/AlertManager.js");
/* harmony import */ var _merge_MergePreviewManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./merge/MergePreviewManager */ "./src/components/merge/MergePreviewManager.js");
/* harmony import */ var _merge_MergeUIController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./merge/MergeUIController */ "./src/components/merge/MergeUIController.js");
/* harmony import */ var _merge_MergeOperationHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./merge/MergeOperationHandler */ "./src/components/merge/MergeOperationHandler.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// MergeHandler.js - Handles merging of selected lines






/**
 * Main coordinator for merge operations
 */
var MergeHandler = /*#__PURE__*/function () {
  /**
   * Initialize merge handler
   * @param {DiffViewer} diffViewer - Parent diff viewer
   */
  function MergeHandler(diffViewer) {
    _classCallCheck(this, MergeHandler);
    this.diffViewer = diffViewer;

    // Use the shared modalManager instance
    this.modalManager = this.diffViewer.modalManager;

    // Create subcomponents using composition
    this.previewManager = new _merge_MergePreviewManager__WEBPACK_IMPORTED_MODULE_2__.MergePreviewManager(this);
    this.uiController = new _merge_MergeUIController__WEBPACK_IMPORTED_MODULE_3__.MergeUIController(this);
    this.operationHandler = new _merge_MergeOperationHandler__WEBPACK_IMPORTED_MODULE_4__.MergeOperationHandler(this);

    // Initialize components
    this.initialize();
    _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('MergeHandler: Component initialized', null, 2);
  }

  /**
   * Initialize all subcomponents
   */
  return _createClass(MergeHandler, [{
    key: "initialize",
    value: function initialize() {
      // Check if we should use server or local controls
      var runtimeProps = this.diffViewer.getRuntimeProps();
      var serverSaveEnabled = runtimeProps && runtimeProps.serverSaveEnabled;
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("MergeHandler: Initializing with serverSaveEnabled=".concat(serverSaveEnabled), null, 2);

      // Initialize UI controller first
      this.uiController.initialize();

      // If server save is disabled, set up local-only controls
      if (serverSaveEnabled === false) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('MergeHandler: Server save is disabled, using local-only controls', null, 2);
        this.uiController.setupLocalOnlyControls();
      }

      // Then initialize preview manager
      this.previewManager.initialize();
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('MergeHandler: All subcomponents initialized', null, 2);
    }

    /**
     * Preview the merged file
     * Delegates to preview manager
     */
  }, {
    key: "previewMerge",
    value: function previewMerge() {
      this.previewManager.handlePreviewClick();
    }

    /**
     * Generate merged content based on selections
     * @returns {string} Merged content
     */
  }, {
    key: "getMergedContent",
    value: function getMergedContent() {
      return this.diffViewer.chunkManager.generateMergedContent();
    }

    /**
     * Proceed with merge operation
     * Delegates to operation handler
     * @param {string} mergeType - Type of merge ('original' or 'new')
     * @returns {Promise} Promise resolving when merge completes
     */
  }, {
    key: "proceedWithMerge",
    value: function proceedWithMerge(mergeType) {
      return this.operationHandler.proceedWithMerge(mergeType);
    }

    /**
     * Count unresolved conflicts
     * Delegates to UI controller
     * @returns {number} Number of unresolved conflicts
     */
  }, {
    key: "countUnresolvedConflicts",
    value: function countUnresolvedConflicts() {
      return this.uiController.countUnresolvedConflicts();
    }

    /**
     * Show conflict resolution modal
     * Delegates to UI controller
     * @param {number} unresolvedCount - Number of unresolved conflicts
     */
  }, {
    key: "showConflictModal",
    value: function showConflictModal(unresolvedCount) {
      this.uiController.showConflictModal(unresolvedCount);
    }

    /**
     * Highlight unresolved chunks
     * Delegates to UI controller
     */
  }, {
    key: "highlightUnresolvedChunks",
    value: function highlightUnresolvedChunks() {
      return this.uiController.highlightUnresolvedChunks();
    }

    /**
     * Create alert element with proper BEM classes
     * @param {boolean} resolved - Whether the conflict is resolved
     * @param {string} success_message - Success message to display
     * @param {string} message - Warning message to display
     * @returns {HTMLElement} Alert element
     */
  }, {
    key: "createAlertElement",
    value: function createAlertElement(resolved, success_message, message) {
      var alertManager = _utils_AlertManager__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance();
      if (resolved) {
        return alertManager.showSuccess(success_message, {
          timeout: 0,
          // Don't auto-dismiss
          translate: false // Message is already provided
        });
      } else {
        return alertManager.showWarning(message, {
          timeout: 0,
          // Don't auto-dismiss
          translate: false // Message is already provided
        });
      }
    }
  }]);
}();

/***/ }),

/***/ "./src/components/SyntaxHighlighter.js":
/*!*********************************************!*\
  !*** ./src/components/SyntaxHighlighter.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SyntaxHighlighter: () => (/* binding */ SyntaxHighlighter)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Debug */ "./src/utils/Debug.js");
/* harmony import */ var _utils_ResourceLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/ResourceLoader */ "./src/utils/ResourceLoader.js");
/* harmony import */ var _utils_MergeContentFormatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/MergeContentFormatter */ "./src/utils/MergeContentFormatter.js");
/* harmony import */ var _data_highlightjs_languages_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data/highlightjs-languages.json */ "./src/data/highlightjs-languages.json");
/* harmony import */ var _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/DOMUtils */ "./src/utils/DOMUtils.js");
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants/Selectors */ "./src/constants/Selectors.js");
/* harmony import */ var _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/TranslationManager */ "./src/utils/TranslationManager.js");
/* harmony import */ var _utils_LoaderManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/LoaderManager */ "./src/utils/LoaderManager.js");
/* harmony import */ var _ThemeManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ThemeManager */ "./src/components/ThemeManager.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// SyntaxHighlighter.js - Handles syntax highlighting for code










/**
 * Manages syntax highlighting functionality
 */
var SyntaxHighlighter = /*#__PURE__*/function () {
  /**
   * @param {DiffViewer} diffViewer - Parent DiffViewer component
   */
  function SyntaxHighlighter(diffViewer) {
    _classCallCheck(this, SyntaxHighlighter);
    this.diffViewer = diffViewer;
    this.highlightJsLoaded = false;
    this.resourceLoader = _utils_ResourceLoader__WEBPACK_IMPORTED_MODULE_1__.ResourceLoader.getInstance();
    this.themeManager = _ThemeManager__WEBPACK_IMPORTED_MODULE_8__.ThemeManager.getInstance();
    this.language = 'plaintext'; // Default language

    // Get theme from ThemeManager instead of localStorage directly
    var currentTheme = this.themeManager.getCurrentTheme();
    this.theme = currentTheme.mode || 'light';
    _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('SyntaxHighlighter: Initialized', null, 2);
  }

  /**
   * Initialize the highlighter with the language
   */
  return _createClass(SyntaxHighlighter, [{
    key: "initialize",
    value: (function () {
      var _initialize = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var filepath;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.loadHighlightJs();
            case 2:
              if (!this.highlightJsLoaded) {
                _context.next = 9;
                break;
              }
              // Get filepath from runtimeProps
              filepath = this.diffViewer.getRuntimeProps().filepath || ''; // Set initial language using the prioritized logic
              _context.next = 6;
              return this.setLanguage(filepath);
            case 6:
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('SyntaxHighlighter: Initialized with language:', this.language, 2);
              _context.next = 10;
              break;
            case 9:
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn('SyntaxHighlighter: Initialization incomplete - highlight.js failed to load', null, 2);
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function initialize() {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }()
    /**
     * Load highlightjs and required language components
     */
    )
  }, {
    key: "loadHighlightJs",
    value: (function () {
      var _loadHighlightJs = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('SyntaxHighlighter: Loading highlight.js core', null, 2);

              // Use resource loader to load syntax highlighter core
              _context2.next = 4;
              return this.diffViewer.resourceLoader.loadSyntaxHighlighterCore();
            case 4:
              this.highlightJsLoaded = true;
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('SyntaxHighlighter: highlight.js loaded successfully', null, 2);
              return _context2.abrupt("return", true);
            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('SyntaxHighlighter: Failed to load highlight.js:', _context2.t0, 2);
              return _context2.abrupt("return", false);
            case 13:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 9]]);
      }));
      function loadHighlightJs() {
        return _loadHighlightJs.apply(this, arguments);
      }
      return loadHighlightJs;
    }()
    /**
     * Highlight all code elements in batches
     * @param {Element|Document} container - Container with code elements
     */
    )
  }, {
    key: "highlightAll",
    value: function highlightAll() {
      var _this = this;
      var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
      if (!this.highlightJsLoaded || !window.hljs) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn('SyntaxHighlighter: Cannot highlight code - highlight.js not loaded', null, 2);
        return;
      }

      // Use DOMUtils.getElements for consistent element selection with error handling
      var elements = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_4__.DOMUtils.getElements("".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__["default"].DIFF.LINE_CONTENT, ":not(").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__["default"].DIFF.LINE_CONTENT_EMPTY, "):not(").concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_5__["default"].DIFF.LINE_PLACEHOLDER, ")"), container);
      if (!elements) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('SyntaxHighlighter: No code elements found to highlight', null, 2);
        return;
      }
      var codeElements = Array.from(elements).filter(function (el) {
        return el.textContent.trim();
      });
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("SyntaxHighlighter: Found ".concat(codeElements.length, " code elements to highlight"), null, 2);

      // Only show loader for large files (more than 100 elements)
      var loaderId = null;
      if (codeElements.length > 100) {
        // Get translation manager for loading message
        var translationManager = _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_6__.TranslationManager.getInstance();
        var loaderManager = _utils_LoaderManager__WEBPACK_IMPORTED_MODULE_7__.LoaderManager.getInstance();
        var loadingMessage = translationManager.get('applyingSyntaxHighlighting', 'Applying syntax highlighting...');

        // Show loading indicator
        loaderId = loaderManager.showLoader(loadingMessage, {
          fullscreen: true,
          zIndex: 1000
        });
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('SyntaxHighlighter: Showing loader for large file highlighting', null, 2);
      }

      // Small batch size for smoother UI updates
      var batchSize = 30;
      var index = 0;

      // Performance tracking
      var startTime = performance.now();

      // Function to process a batch
      var _processBatch = function processBatch() {
        if (index >= codeElements.length) {
          // Hide loader if shown
          if (loaderId) {
            var _loaderManager = _utils_LoaderManager__WEBPACK_IMPORTED_MODULE_7__.LoaderManager.getInstance();
            _loaderManager.hideLoader(loaderId);

            // Log performance metrics
            var endTime = performance.now();
            var duration = endTime - startTime;
            _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("SyntaxHighlighter: Highlighting complete for ".concat(codeElements.length, " elements in ").concat(duration.toFixed(2), "ms"), null, 2);
          } else {
            _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('SyntaxHighlighter: Highlighting complete', null, 2);
          }
          return;
        }

        // Process next batch
        var end = Math.min(index + batchSize, codeElements.length);
        for (var i = index; i < end; i++) {
          _this.highlightElement(codeElements[i]);
        }

        // Update loader message with progress if shown
        if (loaderId && index % (batchSize * 5) === 0) {
          // Update every 5 batches
          var _loaderManager2 = _utils_LoaderManager__WEBPACK_IMPORTED_MODULE_7__.LoaderManager.getInstance();
          var _translationManager = _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_6__.TranslationManager.getInstance();
          var progress = Math.round(index / codeElements.length * 100);
          var progressMessage = _translationManager.get('applyingSyntaxHighlightingProgress', 'Applying syntax highlighting ({0}%)').replace('{0}', progress);
          _loaderManager2.updateLoaderMessage(loaderId, progressMessage);
        }

        // Move to next batch
        index = end;

        // Schedule next batch - use requestAnimationFrame for better performance
        requestAnimationFrame(function () {
          setTimeout(_processBatch, 0);
        });
      };

      // Start batch processing
      _processBatch();
    }

    /**
     * Apply syntax highlighting to a single element
     * @param {Element} element - Element to highlight
     * @param {boolean} withLineNumbers - Whether to add line numbers
     */
  }, {
    key: "highlightElement",
    value: function highlightElement(element) {
      var withLineNumbers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!this.highlightJsLoaded || !window.hljs || !element) return;
      try {
        // Use DOMUtils.toggleClass for consistent class manipulation
        if (!element.classList.contains(this.language)) {
          // Remove existing language classes first
          var languageClasses = element.className.split(' ').filter(function (cls) {
            return cls.startsWith('language-');
          });
          languageClasses.forEach(function (cls) {
            element.classList.remove(cls);
          });

          // Add the correct language class
          element.classList.add(this.language);
        }

        // Use the MergeContentFormatter utility
        _utils_MergeContentFormatter__WEBPACK_IMPORTED_MODULE_2__.MergeContentFormatter.resetHighlighting(element);

        // Apply highlighting
        window.hljs.highlightElement(element);

        // Add line numbers if needed
        if (withLineNumbers && window.hljs.lineNumbersBlock) {
          window.hljs.lineNumbersBlock(element);
        }
      } catch (error) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('SyntaxHighlighter: Error highlighting element:', error, 2);
      }
    }

    /**
     * Set the language for syntax highlighting
     * @param {string} filepath - File path to derive language from
     */
  }, {
    key: "setLanguage",
    value: (function () {
      var _setLanguage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(filepath) {
        var _runtimeProps$diffDat;
        var runtimeProps, newLanguage, sourceUsed, extension, translationManager, loaderManager, loadingMessage, mainLoaderId;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              // Get runtime properties
              runtimeProps = this.diffViewer.getRuntimeProps(); // Try to determine language using the prioritized logic
              newLanguage = 'plaintext';
              sourceUsed = 'default'; // 1. Try to guess language from filepath if provided
              if (filepath && typeof filepath === 'string' && filepath.includes('.')) {
                extension = filepath.split('.').pop().toLowerCase();
                if (extension) {
                  newLanguage = _data_highlightjs_languages_json__WEBPACK_IMPORTED_MODULE_3__[extension] || extension;
                  sourceUsed = 'filepath';
                  _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("SyntaxHighlighter: Language determined from filepath extension: ".concat(extension), null, 2);
                }
              }

              // 2. If no language determined from filepath, try diffData.language
              if (newLanguage === 'plaintext' && sourceUsed === 'default' && (_runtimeProps$diffDat = runtimeProps.diffData) !== null && _runtimeProps$diffDat !== void 0 && _runtimeProps$diffDat.language) {
                newLanguage = runtimeProps.diffData.language;
                sourceUsed = 'diffData';
                _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("SyntaxHighlighter: Language determined from diffData: ".concat(newLanguage), null, 2);
              }

              // 3. If still no language, use plaintext as fallback
              if (newLanguage === 'plaintext' && sourceUsed === 'default') {
                _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('SyntaxHighlighter: No language could be determined, using plaintext as fallback', null, 2);
              }

              // Only load if different from current language
              if (!(this.language !== newLanguage)) {
                _context3.next = 31;
                break;
              }
              this.language = newLanguage;
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("SyntaxHighlighter: Setting language to ".concat(newLanguage, " (source: ").concat(sourceUsed, ")"), null, 2);

              // Only load if needed and not already loaded
              if (!(this.highlightJsLoaded && !this.resourceLoader.loadedLanguages.has(newLanguage))) {
                _context3.next = 27;
                break;
              }
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("SyntaxHighlighter: Loading language ".concat(newLanguage), null, 2);

              // Get translation manager for loading message
              translationManager = _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_6__.TranslationManager.getInstance();
              loaderManager = _utils_LoaderManager__WEBPACK_IMPORTED_MODULE_7__.LoaderManager.getInstance();
              loadingMessage = translationManager.get('loadingLanguage', 'Loading language: {0}').replace('{0}', newLanguage); // Try to use the main loader ID from diffViewer
              mainLoaderId = this.diffViewer.mainLoaderId;
              if (!mainLoaderId) {
                _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn('SyntaxHighlighter: No main loader ID available from DiffViewer for language loading', null, 2);
              }
              _context3.prev = 16;
              // Update the main loader message if available
              if (mainLoaderId) {
                loaderManager.updateLoaderMessage(mainLoaderId, loadingMessage);
              }

              // Use dynamic import to load the language on demand
              _context3.next = 20;
              return this.resourceLoader.loadLanguage(newLanguage);
            case 20:
              _context3.next = 25;
              break;
            case 22:
              _context3.prev = 22;
              _context3.t0 = _context3["catch"](16);
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error("SyntaxHighlighter: Error loading language ".concat(newLanguage, ":"), _context3.t0, 2);
            case 25:
              _context3.next = 28;
              break;
            case 27:
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("SyntaxHighlighter: Language ".concat(newLanguage, " already loaded"), null, 3);
            case 28:
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("SyntaxHighlighter: Language set to ".concat(this.language), null, 2);
              _context3.next = 32;
              break;
            case 31:
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("SyntaxHighlighter: Language already set to ".concat(this.language), null, 3);
            case 32:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[16, 22]]);
      }));
      function setLanguage(_x) {
        return _setLanguage.apply(this, arguments);
      }
      return setLanguage;
    }())
  }]);
}();

/***/ }),

/***/ "./src/components/ThemeManager.js":
/*!****************************************!*\
  !*** ./src/components/ThemeManager.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeManager: () => (/* binding */ ThemeManager)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Debug */ "./src/utils/Debug.js");
/* harmony import */ var _utils_BaseSingleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/BaseSingleton */ "./src/utils/BaseSingleton.js");
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/Selectors */ "./src/constants/Selectors.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var ThemeManager = /*#__PURE__*/function (_BaseSingleton) {
  /**
   * Constructor - protected from direct instantiation
   */
  function ThemeManager() {
    var _this;
    _classCallCheck(this, ThemeManager);
    _this = _callSuper(this, ThemeManager);
    // Skip initialization if instance already exists
    if (!_this._isFirstInstance(instance)) {
      return _possibleConstructorReturn(_this);
    }

    // Initialize instance
    _this.initialized = false;
    _this.availableThemes = null;
    _this.currentTheme = {
      family: null,
      mode: null
    };
    _this.defaultTheme = {
      family: 'atom-one',
      mode: 'dark'
    };
    _this.listeners = [];
    _this.resourceLoader = null;

    // Store instance
    instance = _this;
    return _this;
  }

  /**
   * Initialize with config and ResourceLoader
   * @param {Object} config - Configuration object with theme settings
   * @param {ResourceLoader} resourceLoader - ResourceLoader instance
   * @returns {boolean} Success status
   */
  _inherits(ThemeManager, _BaseSingleton);
  return _createClass(ThemeManager, [{
    key: "initialize",
    value: function initialize(config, resourceLoader) {
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ThemeManager: Initializing', {
        config: config
      }, 2);
      if (this.initialized) return true;

      // Get theme configuration (accepts both legacy and new format)
      this.config = (config === null || config === void 0 ? void 0 : config.theme) || {};
      this.resourceLoader = resourceLoader;

      // Get the availableThemes from ResourceLoader
      this.availableThemes = resourceLoader.config.availableThemes;

      // Set defaults from config or use hardcoded defaults
      this.defaultTheme.family = this.config.defaultFamily || this.defaultTheme.family;
      this.defaultTheme.mode = this.config.defaultMode || this.defaultTheme.mode;

      // Get saved preferences
      var savedFamily = localStorage.getItem('diffViewerThemeFamily') || this.defaultTheme.family;
      var savedMode = localStorage.getItem('diffViewerTheme') || this.defaultTheme.mode;
      this.currentTheme = {
        family: savedFamily,
        mode: savedMode
      };
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ThemeManager: Initialized with ".concat(savedFamily, " (").concat(savedMode, ")"), null, 2);
      this.initialized = true;
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ThemeManager: Successfully initialized', null, 2);
      return true;
    }

    /**
     * Get theme URL for a specific family and mode
     * @param {string} family - The theme family (e.g., 'atom-one')
     * @param {string} mode - The theme mode ('light' or 'dark')
     * @param {boolean} fallbackToDefaults - Whether to fall back to defaults if not found
     * @returns {string} The theme URL
     */
  }, {
    key: "getThemeUrl",
    value: function getThemeUrl(family, mode) {
      var _this$availableThemes, _this$availableThemes2;
      var fallbackToDefaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      // First check if the requested theme exists
      if ((_this$availableThemes = this.availableThemes) !== null && _this$availableThemes !== void 0 && (_this$availableThemes = _this$availableThemes[family]) !== null && _this$availableThemes !== void 0 && _this$availableThemes[mode]) {
        return this.availableThemes[family][mode];
      }

      // Don't proceed with fallbacks if requested
      if (!fallbackToDefaults) {
        return null;
      }

      // Check if the opposite mode exists for this family
      var alternateMode = mode === 'dark' ? 'light' : 'dark';
      if ((_this$availableThemes2 = this.availableThemes) !== null && _this$availableThemes2 !== void 0 && (_this$availableThemes2 = _this$availableThemes2[family]) !== null && _this$availableThemes2 !== void 0 && _this$availableThemes2[alternateMode]) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ThemeManager: Theme ".concat(family, " doesn't have ").concat(mode, " mode, using ").concat(alternateMode, " instead"), null, 2);
        return this.availableThemes[family][alternateMode];
      }

      // Fall back to default theme
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ThemeManager: Falling back to default theme: ".concat(this.defaultTheme.family, " (").concat(mode, ")"), null, 2);
      return this.availableThemes[this.defaultTheme.family][mode] || this.availableThemes[this.defaultTheme.family][alternateMode];
    }

    /**
     * Check if a theme exists
     * @param {string} family - The theme family
     * @param {string} mode - The theme mode
     * @returns {boolean} Whether the theme exists
     */
  }, {
    key: "themeExists",
    value: function themeExists(family, mode) {
      var _this$availableThemes3;
      return !!((_this$availableThemes3 = this.availableThemes) !== null && _this$availableThemes3 !== void 0 && (_this$availableThemes3 = _this$availableThemes3[family]) !== null && _this$availableThemes3 !== void 0 && _this$availableThemes3[mode]);
    }

    /**
     * Get all available theme families
     * @returns {string[]} Array of theme family names
     */
  }, {
    key: "getAvailableThemeFamilies",
    value: function getAvailableThemeFamilies() {
      return Object.keys(this.availableThemes || {});
    }

    /**
     * Get available modes for a theme family
     * @param {string} family - The theme family
     * @returns {string[]} Available modes ('light', 'dark', or both)
     */
  }, {
    key: "getAvailableModesForFamily",
    value: function getAvailableModesForFamily(family) {
      var _this$availableThemes4;
      if (!((_this$availableThemes4 = this.availableThemes) !== null && _this$availableThemes4 !== void 0 && _this$availableThemes4[family])) {
        return [];
      }
      return Object.keys(this.availableThemes[family]);
    }

    /**
     * Get theme CDN version - useful for consistent versioning
     * @returns {string} The CDN version
     */
  }, {
    key: "getThemeCdnVersion",
    value: function getThemeCdnVersion() {
      return '11.11.1'; // Could be made configurable in the future
    }

    /**
     * Get theme CDN base URL
     * @returns {string} The CDN base URL
     */
  }, {
    key: "getThemeCdnBase",
    value: function getThemeCdnBase() {
      return 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js';
    }

    /**
     * Get standard theme URL pattern (for direct generation)
     * @param {string} family - Theme family
     * @param {string} mode - Theme mode
     * @returns {string} Standard theme URL
     */
  }, {
    key: "getStandardThemeUrl",
    value: function getStandardThemeUrl(family, mode) {
      return "".concat(this.getThemeCdnBase(), "/").concat(this.getThemeCdnVersion(), "/styles/base16/").concat(family, "-").concat(mode, ".min.css");
    }

    /**
     * Apply theme (load CSS and update UI)
     * @param {string} family - Theme family
     * @param {string} mode - Theme mode
     * @returns {Promise<boolean>} Success status
     */
  }, {
    key: "applyTheme",
    value: (function () {
      var _applyTheme = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(family, mode) {
        var themeUrl, activeTheme, themeLink;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(!this.initialized || !this.resourceLoader)) {
                _context.next = 3;
                break;
              }
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn('ThemeManager: Not properly initialized', null, 2);
              return _context.abrupt("return", false);
            case 3:
              // Use our centralized method to get the URL
              themeUrl = this.getThemeUrl(family, mode);
              if (themeUrl) {
                _context.next = 7;
                break;
              }
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error("ThemeManager: Could not resolve URL for theme ".concat(family, "/").concat(mode), null, 2);
              return _context.abrupt("return", false);
            case 7:
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ThemeManager: Applying theme ".concat(family, "/").concat(mode), null, 2);

              // Skip if theme is already active
              activeTheme = document.querySelector('link[href*="highlight.js"][href*="/styles/"][rel="stylesheet"]:not([disabled])');
              if (!(activeTheme && activeTheme.getAttribute('href') === themeUrl)) {
                _context.next = 12;
                break;
              }
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ThemeManager: Theme ".concat(family, "/").concat(mode, " already active"), null, 2);
              return _context.abrupt("return", true);
            case 12:
              _context.prev = 12;
              if (document.querySelector("link[href=\"".concat(themeUrl, "\"]"))) {
                _context.next = 16;
                break;
              }
              _context.next = 16;
              return this.resourceLoader.loadCSS(themeUrl);
            case 16:
              // Disable all current theme stylesheets
              document.querySelectorAll('link[href*="highlight.js"][href*="/styles/"][rel="stylesheet"]:not([disabled])').forEach(function (link) {
                link.disabled = true;
              });

              // Enable the new theme
              themeLink = document.querySelector("link[href=\"".concat(themeUrl, "\"]"));
              if (themeLink) {
                themeLink.disabled = false;
                _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ThemeManager: Theme applied: ".concat(family, " (").concat(mode, ")"), null, 2);
              }

              // Update container class for dark/light mode
              this.updateContainerThemeClass(mode);

              // Update current theme and save to localStorage
              this.currentTheme = {
                family: family,
                mode: mode
              };
              localStorage.setItem('diffViewerThemeFamily', family);
              localStorage.setItem('diffViewerTheme', mode);

              // Notify all listeners
              this.notifyListeners();
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ThemeManager: Theme applied successfully: ".concat(family, "/").concat(mode), null, 2);
              return _context.abrupt("return", true);
            case 28:
              _context.prev = 28;
              _context.t0 = _context["catch"](12);
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('ThemeManager: Error during theme operation:', _context.t0, 2);
              return _context.abrupt("return", false);
            case 32:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[12, 28]]);
      }));
      function applyTheme(_x, _x2) {
        return _applyTheme.apply(this, arguments);
      }
      return applyTheme;
    }()
    /**
     * Update container theme class based on mode
     * @param {string} mode - Theme mode ('light' or 'dark')
     */
    )
  }, {
    key: "updateContainerThemeClass",
    value: function updateContainerThemeClass(mode) {
      var container = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_2__["default"].CONTAINER.WRAPPER.name());
      if (container) {
        container.classList.remove(_constants_Selectors__WEBPACK_IMPORTED_MODULE_2__["default"].THEME.DARK.name(), _constants_Selectors__WEBPACK_IMPORTED_MODULE_2__["default"].THEME.LIGHT.name());
        container.classList.add(_constants_Selectors__WEBPACK_IMPORTED_MODULE_2__["default"].THEME.MODE_PREFIX.name() + '--' + mode);
      }
    }

    /**
     * Set theme mode only (light/dark)
     * @param {string} mode - Theme mode ('light' or 'dark')
     * @returns {Promise<boolean>} Success status
     */
  }, {
    key: "setThemeMode",
    value: (function () {
      var _setThemeMode = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(mode) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ThemeManager: Setting theme mode to ".concat(mode), null, 2);
              return _context2.abrupt("return", this.applyTheme(this.currentTheme.family, mode));
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function setThemeMode(_x3) {
        return _setThemeMode.apply(this, arguments);
      }
      return setThemeMode;
    }()
    /**
     * Set theme family only (keeps current mode)
     * @param {string} family - Theme family
     * @returns {Promise<boolean>} Success status
     */
    )
  }, {
    key: "setThemeFamily",
    value: (function () {
      var _setThemeFamily = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(family) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ThemeManager: Setting theme family to ".concat(family), null, 2);
              return _context3.abrupt("return", this.applyTheme(family, this.currentTheme.mode));
            case 2:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function setThemeFamily(_x4) {
        return _setThemeFamily.apply(this, arguments);
      }
      return setThemeFamily;
    }()
    /**
     * Add a listener to be notified of theme changes
     * @param {Function} listener - Listener function
     */
    )
  }, {
    key: "addListener",
    value: function addListener(listener) {
      if (typeof listener === 'function') {
        this.listeners.push(listener);
      }
    }

    /**
     * Notify all listeners of theme changes
     */
  }, {
    key: "notifyListeners",
    value: function notifyListeners() {
      var _this2 = this;
      this.listeners.forEach(function (listener) {
        try {
          listener(_this2.currentTheme);
        } catch (error) {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('ThemeManager: Error in theme listener:', error, 2);
        }
      });
    }

    /**
     * Get current theme information
     * @returns {Object} Current theme information
     */
  }, {
    key: "getCurrentTheme",
    value: function getCurrentTheme() {
      return _objectSpread({}, this.currentTheme);
    }

    /**
     * Load initial theme based on current settings
     * @returns {Promise<boolean>} Success status
     */
  }, {
    key: "loadInitialTheme",
    value: (function () {
      var _loadInitialTheme = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var family, mode, themeUrl, themeLink;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!(!this.initialized || !this.resourceLoader)) {
                _context4.next = 3;
                break;
              }
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn('ThemeManager: Not properly initialized', null, 2);
              return _context4.abrupt("return", false);
            case 3:
              // Get theme from current settings
              family = this.currentTheme.family || this.defaultTheme.family;
              mode = this.currentTheme.mode || this.defaultTheme.mode;
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ThemeManager: Loading initial theme ".concat(family, "/").concat(mode), null, 2);
              _context4.prev = 6;
              // Apply the theme
              themeUrl = this.getThemeUrl(family, mode);
              if (themeUrl) {
                _context4.next = 11;
                break;
              }
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error("ThemeManager: Could not resolve URL for theme ".concat(family, "/").concat(mode), null, 2);
              return _context4.abrupt("return", false);
            case 11:
              if (document.querySelector("link[href=\"".concat(themeUrl, "\"]"))) {
                _context4.next = 14;
                break;
              }
              _context4.next = 14;
              return this.resourceLoader.loadCSS(themeUrl);
            case 14:
              // Disable all current theme stylesheets
              document.querySelectorAll('link[href*="highlight.js"][href*="/styles/"][rel="stylesheet"]:not([disabled])').forEach(function (link) {
                link.disabled = true;
              });

              // Enable the new theme
              themeLink = document.querySelector("link[href=\"".concat(themeUrl, "\"]"));
              if (themeLink) {
                themeLink.disabled = false;
                _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ThemeManager: Theme applied: ".concat(family, " (").concat(mode, ")"), null, 2);
              }

              // Update container class for dark/light mode
              this.updateContainerThemeClass(mode);

              // Update current theme and save to localStorage
              this.currentTheme = {
                family: family,
                mode: mode
              };
              localStorage.setItem('diffViewerThemeFamily', family);
              localStorage.setItem('diffViewerTheme', mode);

              // Notify all listeners
              this.notifyListeners();
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ThemeManager: Initial theme applied successfully: ".concat(family, "/").concat(mode), null, 2);
              return _context4.abrupt("return", true);
            case 26:
              _context4.prev = 26;
              _context4.t0 = _context4["catch"](6);
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('ThemeManager: Error during initial theme loading:', _context4.t0, 2);
              return _context4.abrupt("return", false);
            case 30:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[6, 26]]);
      }));
      function loadInitialTheme() {
        return _loadInitialTheme.apply(this, arguments);
      }
      return loadInitialTheme;
    }())
  }], [{
    key: "getInstance",
    value:
    /**
     * Get the singleton instance
     * @returns {ThemeManager} The singleton instance
     */
    function getInstance() {
      if (!instance) {
        instance = new ThemeManager();
      }
      return instance;
    }
  }]);
}(_utils_BaseSingleton__WEBPACK_IMPORTED_MODULE_1__.BaseSingleton);

/***/ }),

/***/ "./src/components/ThemeSelector.js":
/*!*****************************************!*\
  !*** ./src/components/ThemeSelector.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeSelector: () => (/* binding */ ThemeSelector)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Debug */ "./src/utils/Debug.js");
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/Selectors */ "./src/constants/Selectors.js");
/* harmony import */ var _utils_BaseSingleton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/BaseSingleton */ "./src/utils/BaseSingleton.js");
/* harmony import */ var _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/DOMUtils */ "./src/utils/DOMUtils.js");
/* harmony import */ var _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/TranslationManager */ "./src/utils/TranslationManager.js");
/* harmony import */ var _ThemeManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeManager */ "./src/components/ThemeManager.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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







// Module-level variables
var instance = null;

/**
 * Manages theme family selection dropdown
 */
var ThemeSelector = /*#__PURE__*/function (_BaseSingleton) {
  /**
   * Constructor - protected from direct instantiation
   * @param {DiffViewer} diffViewer - The DiffViewer instance
   */
  function ThemeSelector(diffViewer) {
    var _this;
    _classCallCheck(this, ThemeSelector);
    _this = _callSuper(this, ThemeSelector);
    // Skip initialization if instance already exists
    if (!_this._isFirstInstance(instance)) {
      return _possibleConstructorReturn(_this);
    }
    _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ThemeSelector: Instance created', null, 3);

    // Initialize instance
    _this.diffViewer = diffViewer;
    _this.container = null;
    _this.selectElement = null;
    _this.themeManager = _ThemeManager__WEBPACK_IMPORTED_MODULE_5__.ThemeManager.getInstance();
    _this.translationManager = _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_4__.TranslationManager.getInstance();
    _this.browserUIManager = null;

    // Store instance
    instance = _this;
    return _this;
  }

  /**
   * Initialize the theme selector
   */
  _inherits(ThemeSelector, _BaseSingleton);
  return _createClass(ThemeSelector, [{
    key: "initialize",
    value: function initialize() {
      // Check if theme selector should be enabled using the new config structure
      if (!this._isThemeSelectorEnabled()) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ThemeSelector: Theme selector disabled in configuration', null, 2);
        return false;
      }
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ThemeSelector: Initializing', null, 2);

      // Create container for the theme selector
      this.createSelectorElement();

      // Add the selector to the DOM
      this.addSelectorToDOM();

      // Update selector to reflect current theme
      this.updateSelector();

      // Add listener to ThemeManager to update selector when theme changes
      this.themeManager.addListener(this.updateSelector.bind(this));
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ThemeSelector: Initialized successfully', null, 2);
      return true;
    }

    /**
     * Check if theme selector should be enabled
     * @private
     * @returns {boolean} Whether the theme selector should be enabled
     */
  }, {
    key: "_isThemeSelectorEnabled",
    value: function _isThemeSelectorEnabled() {
      var _this$diffViewer, _this$diffViewer2, _window$diffConfig;
      // First try the new config structure
      if (((_this$diffViewer = this.diffViewer) === null || _this$diffViewer === void 0 || (_this$diffViewer = _this$diffViewer.getConfig()) === null || _this$diffViewer === void 0 || (_this$diffViewer = _this$diffViewer.theme) === null || _this$diffViewer === void 0 ? void 0 : _this$diffViewer.selector) !== undefined) {
        return !!this.diffViewer.getConfig().theme.selector;
      }

      // Then try the old options structure
      if (((_this$diffViewer2 = this.diffViewer) === null || _this$diffViewer2 === void 0 || (_this$diffViewer2 = _this$diffViewer2.options) === null || _this$diffViewer2 === void 0 ? void 0 : _this$diffViewer2.themeSelector) !== undefined) {
        return !!this.diffViewer.options.themeSelector;
      }

      // Finally try the global diffConfig
      if (((_window$diffConfig = window.diffConfig) === null || _window$diffConfig === void 0 || (_window$diffConfig = _window$diffConfig.theme) === null || _window$diffConfig === void 0 ? void 0 : _window$diffConfig.selector) !== undefined) {
        return !!window.diffConfig.theme.selector;
      }

      // Default to true - always show selector unless explicitly disabled
      return true;
    }

    /**
     * Create the theme selector dropdown
     */
  }, {
    key: "createSelectorElement",
    value: function createSelectorElement() {
      var _this2 = this;
      var currentTheme = this.themeManager.getCurrentTheme();

      // Create the container using DOMUtils with proper array of classes
      this.container = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_3__.DOMUtils.createElement('div', null, [_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].THEME_SELECTOR.WRAPPER.name(), _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.MARGIN_END_3.name()]);

      // Create select element using DOMUtils
      this.selectElement = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_3__.DOMUtils.createAndAppendElement('select', this.container, {
        id: _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].THEME.SELECTOR.name(),
        classes: [_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.FORM_SELECT.name(), _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].UTILITY.FORM_SELECT.name()]
      });

      // Add options from available themes
      var availableThemes = this.themeManager.getAvailableThemeFamilies();
      if (!availableThemes || availableThemes.length === 0) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn('ThemeSelector: No available themes found', null, 2);
        return;
      }
      availableThemes.forEach(function (themeKey) {
        _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_3__.DOMUtils.createAndAppendElement('option', _this2.selectElement, {
          attributes: {
            value: themeKey,
            selected: themeKey === currentTheme.family
          },
          content: _this2.formatThemeName(themeKey)
        });
      });
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ThemeSelector: Created selector with options', {
        count: availableThemes.length
      }, 2);

      // Add change event handler
      this.selectElement.addEventListener('change', this.handleThemeChange.bind(this));
    }

    /**
     * Format theme name for display (e.g., "atom-one" to "Atom One")
     * @param {string} themeName - Theme name in kebab-case
     * @returns {string} Formatted theme name
     */
  }, {
    key: "formatThemeName",
    value: function formatThemeName(themeName) {
      return themeName.split('-').map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
    }

    /**
     * Add the selector to the DOM
     */
  }, {
    key: "addSelectorToDOM",
    value: function addSelectorToDOM() {
      // Find theme switcher container using DOMUtils
      var themeSwitcherContainer = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_3__.DOMUtils.getElement(_constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].THEME.SWITCHER.name());
      if (!themeSwitcherContainer) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn('ThemeSelector: No theme switcher container found', null, 2);
        return false;
      }

      // Insert the selector before any existing elements
      themeSwitcherContainer.insertBefore(this.container, themeSwitcherContainer.firstChild);
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ThemeSelector: Selector added to DOM', null, 2);
      return true;
    }

    /**
     * Update selector to match current theme
     * @param {Object} theme - Theme object
     */
  }, {
    key: "updateSelector",
    value: function updateSelector(theme) {
      if (!this.selectElement) return;
      var currentTheme = theme || this.themeManager.getCurrentTheme();
      this.selectElement.value = currentTheme.family;
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ThemeSelector: Selector updated to ".concat((theme === null || theme === void 0 ? void 0 : theme.family) || currentTheme.family), null, 3);
    }

    /**
     * Handle theme change event
     * @param {Event} event - Change event
     */
  }, {
    key: "handleThemeChange",
    value: function handleThemeChange(event) {
      var _this$diffViewer3,
        _this3 = this;
      var selectedTheme = event.target.value;

      // Try to get the BrowserUIManager instance if not already set
      if (!this.browserUIManager && (_this$diffViewer3 = this.diffViewer) !== null && _this$diffViewer3 !== void 0 && _this$diffViewer3.browserUIManager) {
        this.browserUIManager = this.diffViewer.browserUIManager;
      }

      // Show the theme loading indicator
      if (this.browserUIManager) {
        this.browserUIManager.showThemeLoading();
      }
      try {
        // Apply the theme and then hide the loader when complete
        this.themeManager.setThemeFamily(selectedTheme).then(function () {
          // Hide the loader after theme is loaded
          if (_this3.browserUIManager) {
            _this3.browserUIManager.hideThemeLoading();
          }
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ThemeSelector: Theme changed to ".concat(selectedTheme), null, 2);
        })["catch"](function (error) {
          // Hide loader on error
          if (_this3.browserUIManager) {
            _this3.browserUIManager.hideThemeLoading();
          }
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('ThemeSelector: Error changing theme:', error, 2);
        });
      } catch (error) {
        // Hide loader on immediate error
        if (this.browserUIManager) {
          this.browserUIManager.hideThemeLoading();
        }
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('ThemeSelector: Error changing theme:', error, 2);
      }
    }
  }], [{
    key: "getInstance",
    value:
    /**
     * Get the singleton instance
     * @param {DiffViewer} diffViewer - The DiffViewer instance (only used during first initialization)
     * @returns {ThemeSelector} The singleton instance
     */
    function getInstance() {
      var diffViewer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ThemeSelector: Retrieving or creating instance', null, 3);
      if (!instance) {
        instance = new ThemeSelector(diffViewer);
      } else if (diffViewer && !instance.diffViewer) {
        // Update diffViewer if it was null previously
        instance.diffViewer = diffViewer;
      }
      return instance;
    }
  }]);
}(_utils_BaseSingleton__WEBPACK_IMPORTED_MODULE_2__.BaseSingleton);

/***/ }),

/***/ "./src/components/ThemeToggle.js":
/*!***************************************!*\
  !*** ./src/components/ThemeToggle.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeToggle: () => (/* binding */ ThemeToggle)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Debug */ "./src/utils/Debug.js");
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/Selectors */ "./src/constants/Selectors.js");
/* harmony import */ var _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/DOMUtils */ "./src/utils/DOMUtils.js");
/* harmony import */ var _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/TranslationManager */ "./src/utils/TranslationManager.js");
/* harmony import */ var _ThemeManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeManager */ "./src/components/ThemeManager.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






/**
 * Handles theme light/dark toggle functionality
 */
var ThemeToggle = /*#__PURE__*/function () {
  /**
   * @param {Object} browserUIManager - BrowserUIManager instance
   * @param {string} toggleElementId - Toggle element ID
   * @param {string} containerId - Container element ID
   */
  function ThemeToggle() {
    var browserUIManager = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var toggleElementId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].THEME.TOGGLE.name();
    var containerId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants_Selectors__WEBPACK_IMPORTED_MODULE_1__["default"].CONTAINER.WRAPPER.name();
    _classCallCheck(this, ThemeToggle);
    this.toggleElementId = toggleElementId;
    this.containerId = containerId;

    // Use DOMUtils for element retrieval with consistent error handling
    this.toggleElement = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__.DOMUtils.getElement(toggleElementId);
    this.container = _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_2__.DOMUtils.getElement(containerId);
    this.themeManager = _ThemeManager__WEBPACK_IMPORTED_MODULE_4__.ThemeManager.getInstance();
    this.translationManager = _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_3__.TranslationManager.getInstance();
    this.browserUIManager = browserUIManager;
    _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ThemeToggle: Component created', null, 2);
  }

  /**
   * Initialize toggle with event handlers
   */
  return _createClass(ThemeToggle, [{
    key: "initialize",
    value: function initialize() {
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ThemeToggle: Initializing', null, 2);
      if (!this.toggleElement || !this.container) {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn("ThemeToggle: Elements not found for initialization - toggle: ".concat(!!this.toggleElement, ", container: ").concat(!!this.container), null, 2);
        return false;
      }

      // Get current theme from ThemeManager
      var currentTheme = this.themeManager.getCurrentTheme();
      this.toggleElement.checked = currentTheme.mode === 'dark';

      // Apply initial theme class to container using ThemeManager's method
      this.themeManager.updateContainerThemeClass(currentTheme.mode);

      // Add event listener to toggle element
      this.toggleElement.addEventListener('change', this.handleToggle.bind(this));

      // Add listener to ThemeManager to update toggle when theme changes from elsewhere
      this.themeManager.addListener(this.updateToggle.bind(this));

      // Log whether we have a BrowserUIManager instance
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ThemeToggle: BrowserUIManager reference ".concat(this.browserUIManager ? 'is available' : 'is not available'), null, 2);
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ThemeToggle: Initialized successfully', null, 2);
      return true;
    }

    /**
     * Set the BrowserUIManager instance
     * @param {Object} browserUIManager - BrowserUIManager instance
     * @returns {ThemeToggle} - This instance for chaining
     */
  }, {
    key: "setBrowserUIManager",
    value: function setBrowserUIManager(browserUIManager) {
      this.browserUIManager = browserUIManager;
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ThemeToggle: BrowserUIManager reference set', null, 2);
      return this;
    }

    /**
     * Handle toggle event
     * @param {Event} event - Change event
     */
  }, {
    key: "handleToggle",
    value: function handleToggle(event) {
      var _this = this;
      var isDark = event.target.checked;
      var newMode = isDark ? 'dark' : 'light';

      // Show the theme loading indicator
      if (this.browserUIManager) {
        this.browserUIManager.showThemeLoading();
      } else {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ThemeToggle: BrowserUIManager not available, no loading indicator will be shown', null, 2);
      }
      try {
        // Apply the theme and then hide the loader when complete
        this.themeManager.setThemeMode(newMode).then(function () {
          // Hide the loader after theme is loaded
          if (_this.browserUIManager) {
            _this.browserUIManager.hideThemeLoading();
          }
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ThemeToggle: Theme toggled to ".concat(newMode, " mode"), null, 2);
        })["catch"](function (error) {
          // Hide loader on error
          if (_this.browserUIManager) {
            _this.browserUIManager.hideThemeLoading();
          }
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('ThemeToggle: Error toggling theme:', error, 2);
        });
      } catch (error) {
        // Hide loader on immediate error
        if (this.browserUIManager) {
          this.browserUIManager.hideThemeLoading();
        }
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('ThemeToggle: Error toggling theme:', error, 2);
      }
    }

    /**
     * Update toggle state based on theme
     * @param {Object} theme - Theme object
     */
  }, {
    key: "updateToggle",
    value: function updateToggle(theme) {
      if (!this.toggleElement) return;
      var currentTheme = theme || this.themeManager.getCurrentTheme();
      this.toggleElement.checked = currentTheme.mode === 'dark';

      // Instead of using our own updateContainerClass method,
      // leverage the centralized method from ThemeManager
      if (this.container) {
        this.themeManager.updateContainerThemeClass(currentTheme.mode);
      }
    }
  }]);
}();

/***/ })

}]);
//# sourceMappingURL=diff-viewer-src_components_C.js.map