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
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/AlertManager.js":
/*!***********************************!*\
  !*** ./src/utils/AlertManager.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlertManager: () => (/* binding */ AlertManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/Selectors */ "./src/constants/Selectors.js");
/* harmony import */ var _BaseSingleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseSingleton */ "./src/utils/BaseSingleton.js");
/* harmony import */ var _Debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Debug */ "./src/utils/Debug.js");
/* harmony import */ var _TranslationManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TranslationManager */ "./src/utils/TranslationManager.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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





/**
 * AlertManager - Centralized utility for managing alert messages
 *
 * This singleton class provides methods to display and hide alert messages
 * throughout the application in a consistent manner. It supports different types
 * of alerts including info, success, warning, and danger.
 */

// Module-level singleton instance
var instance = null;

/**
 * AlertManager class
 *
 * Provides methods to display and hide alert messages throughout the application
 */
var AlertManager = /*#__PURE__*/function (_BaseSingleton) {
  function AlertManager() {
    _classCallCheck(this, AlertManager);
    return _callSuper(this, AlertManager, arguments);
  }
  _inherits(AlertManager, _BaseSingleton);
  return _createClass(AlertManager, [{
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
      _Debug__WEBPACK_IMPORTED_MODULE_2__.Debug.log('AlertManager: Initialized', null, 2);
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
        _Debug__WEBPACK_IMPORTED_MODULE_2__.Debug.log('AlertManager: Created alert container', null, 2);
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
      _Debug__WEBPACK_IMPORTED_MODULE_2__.Debug.log('AlertManager.showAlert called with type', type, 2);
      _Debug__WEBPACK_IMPORTED_MODULE_2__.Debug.log('AlertManager.showAlert message', message, 3);

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
      var mergedOptions = _objectSpread(_objectSpread({}, defaultOptions), options);

      // Only use the container if we're not placing relative to a target element
      var useContainer = !mergedOptions.targetElement && (mergedOptions.container || this.container);
      _Debug__WEBPACK_IMPORTED_MODULE_2__.Debug.log('AlertManager placement options', {
        hasTargetElement: !!mergedOptions.targetElement,
        placement: mergedOptions.placement,
        useContainer: !!useContainer
      }, 3);

      // Create alert element
      var alertElement = document.createElement('div');

      // Get the base alert class from Selectors if available
      var baseAlertClass = _constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].UTILITY.ALERT ? _constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].UTILITY.ALERT.toString().substring(1) :
      // Remove leading '.'
      'vdm-alert';

      // Start with base class
      var alertClass = baseAlertClass;

      // Type-specific class - use the proper format with double hyphens
      if (type) {
        // Use proper format from Selectors if available
        var typeClass = type === 'info' && _constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].UTILITY.ALERT_INFO ? _constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].UTILITY.ALERT_INFO.toString().substring(1) : // Remove leading '.'
        "".concat(baseAlertClass, "--").concat(type); // Use the proper double-hyphen format

        alertClass += " ".concat(typeClass);
      }

      // Add any custom classes
      if (mergedOptions.className) {
        alertClass += " ".concat(mergedOptions.className);
      }
      alertElement.className = alertClass;
      _Debug__WEBPACK_IMPORTED_MODULE_2__.Debug.log('Alert classnames', alertElement.className, 3);
      _Debug__WEBPACK_IMPORTED_MODULE_2__.Debug.log('Alert selector values', {
        selectorBase: _constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].UTILITY.ALERT ? _constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].UTILITY.ALERT.toString() : 'vdm-alert',
        selectorType: type ? "".concat(baseAlertClass, "--").concat(type) : 'none'
      }, 3);

      // Translate message if needed
      var finalMessage = message;
      if (mergedOptions.translate && typeof _TranslationManager__WEBPACK_IMPORTED_MODULE_3__.TranslationManager !== 'undefined') {
        var translationManager = _TranslationManager__WEBPACK_IMPORTED_MODULE_3__.TranslationManager.getInstance();
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
        _Debug__WEBPACK_IMPORTED_MODULE_2__.Debug.log('Close button', closeButton ? 'found' : 'not found', 3);
      }

      // Add to container or place relative to target element
      if (mergedOptions.targetElement) {
        _Debug__WEBPACK_IMPORTED_MODULE_2__.Debug.log('AlertManager: Placing alert relative to target element', {
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
        _Debug__WEBPACK_IMPORTED_MODULE_2__.Debug.log('Alert appended to container', null, 3);
      } else {
        // Fallback to body if no container and no target element
        document.body.appendChild(alertElement);
        _Debug__WEBPACK_IMPORTED_MODULE_2__.Debug.log('Alert appended to body', null, 3);
      }

      // Store reference to the active alert
      this.activeAlert = alertElement;

      // Set up auto-dismiss
      if (mergedOptions.timeout > 0) {
        this.timeoutId = setTimeout(function () {
          _this.hideAlert(alertElement);
        }, mergedOptions.timeout);
      }
      _Debug__WEBPACK_IMPORTED_MODULE_2__.Debug.log('Returning alert element', alertElement, 3);
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
        _Debug__WEBPACK_IMPORTED_MODULE_2__.Debug.log('AlertManager: Hiding specific alert', null, 3);

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
        _Debug__WEBPACK_IMPORTED_MODULE_2__.Debug.log('AlertManager: Hiding active alert', null, 3);
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
      if (!instance) {
        instance = new AlertManager();
        instance.initialize();
      }
      return instance;
    }
  }]);
}(_BaseSingleton__WEBPACK_IMPORTED_MODULE_1__.BaseSingleton);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AlertManager);

/***/ }),

/***/ "./src/utils/BaseSingleton.js":
/*!************************************!*\
  !*** ./src/utils/BaseSingleton.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseSingleton: () => (/* binding */ BaseSingleton)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Base singleton implementation to standardize pattern across components
 */
var BaseSingleton = /*#__PURE__*/function () {
  function BaseSingleton() {
    _classCallCheck(this, BaseSingleton);
  }
  return _createClass(BaseSingleton, [{
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

/***/ }),

/***/ "./src/utils/ChunkUtils.js":
/*!*********************************!*\
  !*** ./src/utils/ChunkUtils.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChunkUtils: () => (/* binding */ ChunkUtils)
/* harmony export */ });
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/Selectors */ "./src/constants/Selectors.js");
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Debug */ "./src/utils/Debug.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



// Cache for chunk elements to avoid repeated DOM queries
var _elementCache = {};
var _iconMarkerCache = {};
var _rowCache = {};
var _chunkIndex = null;

// Cache statistics for diagnostics
var _cacheStats = {
  elementCacheHits: 0,
  elementCacheMisses: 0,
  iconMarkerCacheHits: 0,
  iconMarkerCacheMisses: 0,
  rowCacheHits: 0,
  rowCacheMisses: 0
};

/**
 * Utility functions specific to chunk operations
 */
var ChunkUtils = /*#__PURE__*/function () {
  function ChunkUtils() {
    _classCallCheck(this, ChunkUtils);
  }
  return _createClass(ChunkUtils, null, [{
    key: "clearCache",
    value:
    /**
     * Clear the element cache
     * Should be called when the DOM structure changes significantly
     */
    function clearCache() {
      Object.keys(_elementCache).forEach(function (key) {
        return delete _elementCache[key];
      });
      Object.keys(_iconMarkerCache).forEach(function (key) {
        return delete _iconMarkerCache[key];
      });
      Object.keys(_rowCache).forEach(function (key) {
        return delete _rowCache[key];
      });
      _chunkIndex = null;
      _utils_Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('ChunkUtils: Cache cleared', null, 2);
    }

    /**
     * Get cache statistics
     * @returns {Object} Current cache statistics
     */
  }, {
    key: "getCacheStats",
    value: function getCacheStats() {
      return _objectSpread({}, _cacheStats);
    }

    /**
     * Preload all chunk elements into cache
     * This dramatically improves performance when working with large files
     * @returns {Object} Index of all chunks and their elements
     */
  }, {
    key: "preloadChunks",
    value: function preloadChunks() {
      var startTime = performance.now();

      // Clear existing cache first
      ChunkUtils.clearCache();

      // Initialize chunk index
      _chunkIndex = {
        byId: {},
        byLineId: {},
        allChunkIds: new Set()
      };

      // Get all chunk elements in one query
      var allChunkElements = document.querySelectorAll("".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].DIFF.CHUNK, "[data-chunk-id]"));
      _utils_Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log("ChunkUtils: Preloading ".concat(allChunkElements.length, " chunk elements"), null, 2);

      // Process all chunk elements
      allChunkElements.forEach(function (element) {
        var chunkId = element.getAttribute('data-chunk-id');
        var side = element.getAttribute('data-side');
        var lineId = element.getAttribute('data-line-id');
        if (!chunkId) return;

        // Add to chunk index
        _chunkIndex.allChunkIds.add(chunkId);

        // Initialize chunk in index if needed
        if (!_chunkIndex.byId[chunkId]) {
          _chunkIndex.byId[chunkId] = {
            elements: {
              all: [],
              left: [],
              right: []
            },
            lineIds: new Set()
          };
        }

        // Add element to appropriate collections
        _chunkIndex.byId[chunkId].elements.all.push(element);
        if (side === 'left') {
          _chunkIndex.byId[chunkId].elements.left.push(element);
        } else if (side === 'right') {
          _chunkIndex.byId[chunkId].elements.right.push(element);
        }

        // Track line ID and add to line index
        if (lineId) {
          _chunkIndex.byId[chunkId].lineIds.add(lineId);

          // Add to line index for quick lookup
          _chunkIndex.byLineId[lineId] = {
            chunkId: chunkId,
            element: element
          };

          // Also cache the element's parent row
          var row = element.closest('tr');
          if (row) {
            _rowCache[element.dataset.lineId] = row;
          }
        }

        // Add to element cache directly to avoid later queries
        // 1. All elements for chunk
        var allCacheKey = "".concat(chunkId, ":both");
        if (!_elementCache[allCacheKey]) {
          _elementCache[allCacheKey] = [];
        }
        _elementCache[allCacheKey].push(element);

        // 2. Side-specific elements
        if (side) {
          var sideCacheKey = "".concat(chunkId, ":").concat(side);
          if (!_elementCache[sideCacheKey]) {
            _elementCache[sideCacheKey] = [];
          }
          _elementCache[sideCacheKey].push(element);
        }
      });

      // Preload all icon markers
      var allIconMarkers = document.querySelectorAll("".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].ICONS.MARKER, "[data-line-id]"));
      _utils_Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log("ChunkUtils: Preloading ".concat(allIconMarkers.length, " icon markers"), null, 2);
      allIconMarkers.forEach(function (marker) {
        var lineId = marker.getAttribute('data-line-id');
        if (lineId) {
          _iconMarkerCache[lineId] = marker;

          // Also associate with chunk if possible
          if (_chunkIndex.byLineId[lineId]) {
            var chunkId = _chunkIndex.byLineId[lineId].chunkId;
            if (!_chunkIndex.byId[chunkId].iconMarkers) {
              _chunkIndex.byId[chunkId].iconMarkers = [];
            }
            _chunkIndex.byId[chunkId].iconMarkers.push(marker);
          }
        }
      });
      var duration = performance.now() - startTime;
      _utils_Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log("ChunkUtils: Preloaded ".concat(Object.keys(_chunkIndex.byId).length, " chunks in ").concat(duration.toFixed(2), "ms"), null, 2);
      return _chunkIndex;
    }

    /**
     * Get all chunk IDs in the document
     * @returns {Array} Array of chunk IDs
     */
  }, {
    key: "getAllChunkIds",
    value: function getAllChunkIds() {
      // Ensure index is built
      if (!_chunkIndex) {
        ChunkUtils.preloadChunks();
      }
      return Array.from(_chunkIndex.allChunkIds);
    }

    /**
     * Sort elements by line number
     * @param {Array|NodeList} elements - Elements to sort
     * @returns {Array} Sorted elements
     */
  }, {
    key: "sortElementsByLineNumber",
    value: function sortElementsByLineNumber(elements) {
      return Array.from(elements).sort(function (a, b) {
        var _a$dataset$lineId, _b$dataset$lineId;
        var aLineNum = parseInt(((_a$dataset$lineId = a.dataset.lineId) === null || _a$dataset$lineId === void 0 ? void 0 : _a$dataset$lineId.split('-').pop()) || '0', 10);
        var bLineNum = parseInt(((_b$dataset$lineId = b.dataset.lineId) === null || _b$dataset$lineId === void 0 ? void 0 : _b$dataset$lineId.split('-').pop()) || '0', 10);
        return aLineNum - bLineNum;
      });
    }

    /**
     * Find elements by chunk ID
     * @param {string} chunkId - The chunk ID to find
     * @param {string} side - Optional side ('left' or 'right')
     * @returns {Array} Matching elements
     */
  }, {
    key: "getChunkElements",
    value: function getChunkElements(chunkId) {
      var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (!chunkId) return [];

      // Create cache key
      var cacheKey = "".concat(chunkId, ":").concat(side || 'both');

      // Use cached elements if available
      if (_elementCache[cacheKey]) {
        _cacheStats.elementCacheHits++;
        return _elementCache[cacheKey];
      }
      _cacheStats.elementCacheMisses++;

      // Check if we have the chunk index built
      if (_chunkIndex && _chunkIndex.byId[chunkId]) {
        var _elements;
        if (side === 'left') {
          _elements = _chunkIndex.byId[chunkId].elements.left;
        } else if (side === 'right') {
          _elements = _chunkIndex.byId[chunkId].elements.right;
        } else {
          _elements = _chunkIndex.byId[chunkId].elements.all;
        }

        // Cache the result
        _elementCache[cacheKey] = _elements;
        return _elements;
      }

      // Fall back to DOM queries if index not available
      var elements;
      if (side) {
        elements = Array.from(document.querySelectorAll("".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].DIFF.CHUNK, "[data-chunk-id=\"").concat(chunkId, "\"][data-side=\"").concat(side, "\"]")));
      } else {
        elements = Array.from(document.querySelectorAll("".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].DIFF.CHUNK, "[data-chunk-id=\"").concat(chunkId, "\"]")));
      }

      // Cache the result
      _elementCache[cacheKey] = elements;
      return elements;
    }

    /**
     * Get all icon markers for a chunk ID
     * @param {string} chunkId - The chunk ID
     * @returns {Array} Array of icon marker elements
     */
  }, {
    key: "getChunkIconMarkers",
    value: function getChunkIconMarkers(chunkId) {
      if (!chunkId) return [];

      // Check if we have the chunk index built
      if (_chunkIndex && _chunkIndex.byId[chunkId]) {
        return _chunkIndex.byId[chunkId].iconMarkers || [];
      }

      // If not in index, collect markers by getting line IDs from chunk elements
      var elements = ChunkUtils.getChunkElements(chunkId);
      var markers = [];
      elements.forEach(function (element) {
        var lineId = element.dataset.lineId;
        if (lineId) {
          var marker = ChunkUtils.getIconMarker(lineId);
          if (marker) {
            markers.push(marker);
          }
        }
      });
      return markers;
    }

    /**
     * Get icon markers by chunk ID and line ID
     * @param {string} lineId - The line ID
     * @returns {Element|null} Icon marker element or null
     */
  }, {
    key: "getIconMarker",
    value: function getIconMarker(lineId) {
      if (!lineId) return null;

      // Use cached marker if available
      if (_iconMarkerCache[lineId]) {
        _cacheStats.iconMarkerCacheHits++;
        return _iconMarkerCache[lineId];
      }
      _cacheStats.iconMarkerCacheMisses++;

      // If we have the index, check there first
      if (_chunkIndex && _chunkIndex.byLineId[lineId]) {
        // Get associated chunk and find marker
        var chunkId = _chunkIndex.byLineId[lineId].chunkId;
        if (_chunkIndex.byId[chunkId].iconMarkers) {
          // Find marker with matching line ID
          var marker = _chunkIndex.byId[chunkId].iconMarkers.find(function (m) {
            return m.getAttribute('data-line-id') === lineId;
          });
          if (marker) {
            _iconMarkerCache[lineId] = marker;
            return marker;
          }
        }
      }

      // Fall back to DOM query
      var iconMarker = document.querySelector("".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].ICONS.MARKER, "[data-line-id=\"").concat(lineId, "\"]"));

      // Cache the result
      if (iconMarker) {
        _iconMarkerCache[lineId] = iconMarker;
      }
      return iconMarker;
    }

    /**
     * Get parent row of an element
     * @param {Element} element - The element
     * @returns {Element|null} Parent row element or null
     */
  }, {
    key: "getParentRow",
    value: function getParentRow(element) {
      if (!element) return null;
      var lineId = element.dataset.lineId;

      // Use cached row if available
      if (lineId && _rowCache[lineId]) {
        _cacheStats.rowCacheHits++;
        return _rowCache[lineId];
      }
      _cacheStats.rowCacheMisses++;
      var row = element.closest('tr');

      // Cache the result if line ID is available
      if (lineId && row) {
        _rowCache[lineId] = row;
      }
      return row;
    }

    /**
     * Generate file content from line objects
     * @param {Array} lines - Array of line objects
     * @returns {string} Generated file content
     */
  }, {
    key: "generateFileContent",
    value: function generateFileContent(lines) {
      return lines.filter(function (line) {
        return line.type === 'content';
      }).map(function (line) {
        return line.line;
      }).join('\n');
    }
  }]);
}();

/***/ }),

/***/ "./src/utils/ConfigUtils.js":
/*!**********************************!*\
  !*** ./src/utils/ConfigUtils.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfigUtils: () => (/* binding */ ConfigUtils)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Configuration management utilities
 */
var ConfigUtils = /*#__PURE__*/function () {
  function ConfigUtils() {
    _classCallCheck(this, ConfigUtils);
  }
  return _createClass(ConfigUtils, null, [{
    key: "mergeConfigurations",
    value:
    /**
     * Recursively merge multiple configurations
     * @param {...Object} configs - Configurations to merge in order of increasing precedence
     * @returns {Object} Merged configuration
     */
    function mergeConfigurations() {
      // Start with an empty object
      var result = {};

      // Process each config in order
      for (var _len = arguments.length, configs = new Array(_len), _key = 0; _key < _len; _key++) {
        configs[_key] = arguments[_key];
      }
      for (var _i = 0, _configs = configs; _i < _configs.length; _i++) {
        var config = _configs[_i];
        if (!config || _typeof(config) !== 'object') {
          continue;
        }

        // Merge properties
        for (var key in config) {
          if (Object.prototype.hasOwnProperty.call(config, key)) {
            // If both values are objects, merge recursively
            if (_typeof(result[key]) === 'object' && result[key] !== null && !Array.isArray(result[key]) && _typeof(config[key]) === 'object' && config[key] !== null && !Array.isArray(config[key])) {
              result[key] = this.mergeConfigurations(result[key], config[key]);
            } else {
              // Otherwise just override
              result[key] = config[key];
            }
          }
        }
      }
      return result;
    }

    /**
     * Validate required configuration
     * @param {Object} config - Configuration to validate
     * @returns {Object} Validation result with isValid and error properties
     */
  }, {
    key: "validateConfig",
    value: function validateConfig(config) {
      var result = {
        isValid: true,
        error: null
      };
      if (!config) {
        result.isValid = false;
        result.error = 'No configuration found - window.diffConfig is not defined';
        return result;
      }
      if (!config.diffData) {
        result.isValid = false;
        result.error = 'No diff data in configuration';

        // Create empty diff data structure to prevent errors
        config.diffData = {
          old: [],
          "new": [],
          chunks: []
        };

        // Log additional information to help diagnose the issue
        console.warn('ConfigUtils: Missing diffData in configuration', {
          configKeys: Object.keys(config),
          oldData: config.old ? 'present' : 'missing',
          newData: config["new"] ? 'present' : 'missing'
        });
      } else if (!config.diffData.chunks) {
        result.isValid = false;
        result.error = 'Missing chunks in diff data';

        // Initialize empty chunks array to prevent errors
        config.diffData.chunks = [];
        console.warn('ConfigUtils: Missing chunks in diffData', {
          diffDataKeys: Object.keys(config.diffData)
        });
      }
      return result;
    }

    /**
     * Get configuration summary for logging
     * @param {Object} config - Configuration object
     * @returns {Object} Summary of key configuration properties
     */
  }, {
    key: "getConfigSummary",
    value: function getConfigSummary(config) {
      var _config$diffData;
      return {
        debug: !!(config !== null && config !== void 0 && config.debug),
        chunks: Array.isArray(config === null || config === void 0 || (_config$diffData = config.diffData) === null || _config$diffData === void 0 ? void 0 : _config$diffData.chunks) ? config.diffData.chunks.length : 0
      };
    }

    /**
     * Extract file extension from filepath
     * @param {string} filepath - Path to extract extension from
     * @param {string} defaultExtension - Default extension if not found
     * @returns {string} The extracted extension or default
     */
  }, {
    key: "getFileExtension",
    value: function getFileExtension(filepath) {
      var defaultExtension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'php';
      if (!filepath) return defaultExtension;
      return filepath.split('.').pop() || defaultExtension;
    }

    /**
     * Get stored theme preferences
     * @param {Object} config - Configuration with default theme settings
     * @returns {Object} Theme settings object
     */
  }, {
    key: "getThemePreferences",
    value: function getThemePreferences(config) {
      var _config$theme, _config$theme2;
      return {
        mode: localStorage.getItem('diffViewerTheme') || (config === null || config === void 0 || (_config$theme = config.theme) === null || _config$theme === void 0 ? void 0 : _config$theme.defaultMode) || 'light',
        family: localStorage.getItem('diffViewerThemeFamily') || (config === null || config === void 0 || (_config$theme2 = config.theme) === null || _config$theme2 === void 0 ? void 0 : _config$theme2.defaultFamily) || 'atom-one'
      };
    }
  }]);
}();

/***/ }),

/***/ "./src/utils/DOMUtils.js":
/*!*******************************!*\
  !*** ./src/utils/DOMUtils.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DOMUtils: () => (/* binding */ DOMUtils)
/* harmony export */ });
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/Selectors */ "./src/constants/Selectors.js");
/* harmony import */ var _Debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Debug */ "./src/utils/Debug.js");
/* harmony import */ var _IconRegistry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IconRegistry */ "./src/utils/IconRegistry.js");
/* harmony import */ var _AlertManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AlertManager */ "./src/utils/AlertManager.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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





// Cache for DOM queries
var elementCache = new Map();

/**
 * Reusable DOM manipulation utilities
 */
var DOMUtils = /*#__PURE__*/function () {
  function DOMUtils() {
    _classCallCheck(this, DOMUtils);
  }
  return _createClass(DOMUtils, null, [{
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
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.warn("DOMUtils: Button ".concat(buttonId, " not found"), null, 2);
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
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log("DOMUtils: Cleaned up previous handler for ".concat(logName || buttonId), null, 2);
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
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.error('DOMUtils.getElement: Empty ID provided', null, 1);
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
          _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.error("DOMUtils.getElement: Error with selector: ".concat(e.message), null, 1);
        }
      }
      if (!element) {
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.error("DOMUtils.getElement: Element with ID '".concat(id, "' not found"), null, 1);
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
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.warn('DOMUtils: Missing elements for toggle button update');
        return;
      }
      _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log("DOMUtils: Updating toggle button to ".concat(currentValue), null, 2);

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
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.warn("DOMUtils: Invalid toggle value: ".concat(currentValue));
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
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.warn("DOMUtils: Container #".concat(containerId, " not found for message"), null, 2);
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
      var alertManager = _AlertManager__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance();

      // Clear existing content unless we're keeping it
      if (!keepExisting) {
        container.innerHTML = '';
      }

      // Check if HAS_ICON exists in UTILITY and provide a fallback if it doesn't
      var iconClass = '';
      try {
        if (_constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].UTILITY && _constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].UTILITY.HAS_ICON) {
          iconClass = _constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].UTILITY.HAS_ICON.name();
        } else {
          // Fallback if HAS_ICON is not defined
          iconClass = 'vdm-has-icon';
          _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('DOMUtils: Using fallback icon class because Selectors.UTILITY.HAS_ICON is undefined', null, 2);
        }
      } catch (e) {
        // Fallback if any error occurs
        iconClass = 'vdm-has-icon';
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.warn('DOMUtils: Error getting icon class, using fallback', e, 2);
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
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.warn("DOMUtils: Element #".concat(elementId, " not found for visibility toggle"), null, 2);
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
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.warn("DOMUtils: Element #".concat(elementId, " not found for class toggle"), null, 2);
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
          (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(classList));
        }
      }

      // Set attributes
      Object.entries(attributes).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
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
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.warn("DOMUtils: Container not found for createAndAppendElement", null, 2);
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
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.warn("DOMUtils: Element #".concat(elementId, " not found for content update"), null, 2);
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
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.warn("DOMUtils: Context not found for selector: ".concat(selector), null, 2);
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
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.warn("DOMUtils: Element #".concat(elementId, " not found for content append"), null, 2);
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
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.warn("DOMUtils: Element not found or has no parent for removal", null, 2);
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
            var _ref4 = _slicedToArray(_ref3, 2),
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
      return _IconRegistry__WEBPACK_IMPORTED_MODULE_2__.IconRegistry.createIcon(iconName, options);
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
      return _IconRegistry__WEBPACK_IMPORTED_MODULE_2__.IconRegistry.getIcon(iconName, options);
    }
  }]);
}();

/***/ }),

/***/ "./src/utils/Debug.js":
/*!****************************!*\
  !*** ./src/utils/Debug.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Debug: () => (/* binding */ Debug)
/* harmony export */ });
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
      this.enabled = enabled;
      this.prefix = prefix;
      this.logLevel = enabled ? logLevel : 1;
      console.error('Debug initialized', {
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
      return (((_window$diffConfig = window.diffConfig) === null || _window$diffConfig === void 0 ? void 0 : _window$diffConfig.debug) || this.enabled) && level <= this.logLevel;
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


/***/ }),

/***/ "./src/utils/DiffConfigManager.js":
/*!****************************************!*\
  !*** ./src/utils/DiffConfigManager.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiffConfigManager: () => (/* binding */ DiffConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Debug */ "./src/utils/Debug.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
    _classCallCheck(this, DiffConfigManager);
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
      _Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffConfigManager: Initializing with existing window.diffConfig', window.diffConfig, 2);
      _classPrivateFieldSet(_diffConfig, this, _objectSpread({}, window.diffConfig));
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
  return _createClass(DiffConfigManager, [{
    key: "initialize",
    value:
    /**
     * Initialize with configuration
     * @param {Object} config - The initial configuration
     */
    function initialize() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffConfigManager: Initializing with config', config, 2);
      _classPrivateFieldSet(_diffConfig, this, _objectSpread(_objectSpread({}, _classPrivateFieldGet(_diffConfig, this)), config));
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
      _Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffConfigManager: Setting new diffConfig', config, 2);
      _classPrivateFieldSet(_diffConfig, this, _objectSpread({}, config));
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
      _Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffConfigManager: Resetting diffConfig with overrides', overrides, 2);
      _classPrivateFieldSet(_diffConfig, this, _objectSpread({
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
      _Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffConfigManager: Updating diffConfig with', partialConfig, 3);

      // Check if the partialConfig has a nested 'config' property
      if (partialConfig && partialConfig.config && _typeof(partialConfig.config) === 'object') {
        _Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('DiffConfigManager: Extracting nested config property', partialConfig.config, 3);
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
      _Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("DiffConfigManager: Setting ".concat(key), value, 3);
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
        _Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("DiffConfigManager: Removing ".concat(key), null, 3);
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
    window.diffConfig = _objectSpread({}, _classPrivateFieldGet(_diffConfig, this));
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
  var output = _objectSpread({}, target);
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
  return item && _typeof(item) === 'object' && !Array.isArray(item);
}
/**
 * Private instance - follows singleton pattern
 * @type {DiffConfigManager}
 * @private
 */
var _instance = {
  _: null
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DiffConfigManager);

/***/ }),

/***/ "./src/utils/EndpointDiscovery.js":
/*!****************************************!*\
  !*** ./src/utils/EndpointDiscovery.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EndpointDiscovery: () => (/* binding */ EndpointDiscovery)
/* harmony export */ });
/* harmony import */ var _Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Debug */ "./src/utils/Debug.js");
/* harmony import */ var _BaseSingleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseSingleton */ "./src/utils/BaseSingleton.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }



/**
 * Utility for discovering API endpoints
 * Provides centralized access to API endpoints
 */
var _apiEndpoint = /*#__PURE__*/new WeakMap();
var _discoveryPromise = /*#__PURE__*/new WeakMap();
var _EndpointDiscovery_brand = /*#__PURE__*/new WeakSet();
var EndpointDiscovery = /*#__PURE__*/function (_BaseSingleton) {
  function EndpointDiscovery() {
    var _this;
    _classCallCheck(this, EndpointDiscovery);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, EndpointDiscovery, [].concat(args));
    /**
     * Attempt to determine API endpoint based on script location
     * @private
     * @returns {string|null} Determined endpoint or null
     */
    _classPrivateMethodInitSpec(_this, _EndpointDiscovery_brand);
    // Cached endpoint URL
    _classPrivateFieldInitSpec(_this, _apiEndpoint, null);
    // Promise for ongoing discovery
    _classPrivateFieldInitSpec(_this, _discoveryPromise, null);
    return _this;
  }
  _inherits(EndpointDiscovery, _BaseSingleton);
  return _createClass(EndpointDiscovery, [{
    key: "discoverEndpoint",
    value: (
    /**
     * Discover the API endpoint URL
     * @returns {Promise<string>} Base API endpoint URL
     */
    function () {
      var _discoverEndpoint = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _window$diffConfig, scriptEndpoint, configUrl, response, data;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!_classPrivateFieldGet(_apiEndpoint, this)) {
                _context.next = 3;
                break;
              }
              _Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('EndpointDiscovery: Using cached API endpoint', _classPrivateFieldGet(_apiEndpoint, this), 2);
              return _context.abrupt("return", _classPrivateFieldGet(_apiEndpoint, this));
            case 3:
              _context.prev = 3;
              if (!((_window$diffConfig = window.diffConfig) !== null && _window$diffConfig !== void 0 && _window$diffConfig.apiEndpoint)) {
                _context.next = 8;
                break;
              }
              _Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('EndpointDiscovery: Using configured API endpoint', window.diffConfig.apiEndpoint, 2);
              _classPrivateFieldSet(_apiEndpoint, this, window.diffConfig.apiEndpoint);
              return _context.abrupt("return", _classPrivateFieldGet(_apiEndpoint, this));
            case 8:
              // Try to determine endpoint based on script location
              scriptEndpoint = _assertClassBrand(_EndpointDiscovery_brand, this, _determineEndpointFromScript).call(this);
              if (!scriptEndpoint) {
                _context.next = 13;
                break;
              }
              _Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('EndpointDiscovery: Determined API endpoint from script location', scriptEndpoint, 2);
              _classPrivateFieldSet(_apiEndpoint, this, scriptEndpoint);
              return _context.abrupt("return", _classPrivateFieldGet(_apiEndpoint, this));
            case 13:
              // Fall back to endpoint-config.php discovery
              _Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('EndpointDiscovery: Discovering API endpoint from endpoint-config.php', null, 2);

              // Generate URL to endpoint-config.php
              configUrl = _assertClassBrand(_EndpointDiscovery_brand, this, _getEndpointConfigUrl).call(this);
              _Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('EndpointDiscovery: Fetching from', configUrl, 2);

              // Fetch endpoint configuration
              _context.next = 18;
              return fetch(configUrl);
            case 18:
              response = _context.sent;
              if (response.ok) {
                _context.next = 21;
                break;
              }
              throw new Error("Failed to fetch endpoint config: ".concat(response.statusText));
            case 21:
              _context.next = 23;
              return response.json();
            case 23:
              data = _context.sent;
              _Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('EndpointDiscovery: Endpoint discovery response', data, 2);

              // Check if we have a valid apiEndpoint in the response
              if (!((data === null || data === void 0 ? void 0 : data.apiEndpoint) !== undefined)) {
                _context.next = 31;
                break;
              }
              _classPrivateFieldSet(_apiEndpoint, this, data.apiEndpoint);
              _Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('EndpointDiscovery: Successfully discovered API endpoint', _classPrivateFieldGet(_apiEndpoint, this), 1);
              return _context.abrupt("return", _classPrivateFieldGet(_apiEndpoint, this));
            case 31:
              throw new Error('Invalid endpoint config response: apiEndpoint not found');
            case 32:
              _context.next = 40;
              break;
            case 34:
              _context.prev = 34;
              _context.t0 = _context["catch"](3);
              _Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('EndpointDiscovery: Error discovering endpoint', _context.t0, 1);

              // Fall back to relative endpoint as a last resort
              _classPrivateFieldSet(_apiEndpoint, this, './api/');
              _Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('EndpointDiscovery: Using fallback endpoint', _classPrivateFieldGet(_apiEndpoint, this), 1);
              return _context.abrupt("return", _classPrivateFieldGet(_apiEndpoint, this));
            case 40:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[3, 34]]);
      }));
      function discoverEndpoint() {
        return _discoverEndpoint.apply(this, arguments);
      }
      return discoverEndpoint;
    }()
    /**
     * Get endpoint URL with efficient caching
     * @param {string} [endpointName] Optional specific endpoint name (e.g., 'ajaxDiffMerge')
     * @returns {Promise<string>} API endpoint URL
     */
    )
  }, {
    key: "getEndpoint",
    value: (function () {
      var _getEndpoint = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(endpointName) {
        var endpointMap, fileName, baseUrl;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (_classPrivateFieldGet(_apiEndpoint, this)) {
                _context2.next = 13;
                break;
              }
              if (!_classPrivateFieldGet(_discoveryPromise, this)) {
                _context2.next = 6;
                break;
              }
              _context2.next = 4;
              return _classPrivateFieldGet(_discoveryPromise, this);
            case 4:
              _context2.next = 13;
              break;
            case 6:
              // Start a new discovery and cache the promise
              _classPrivateFieldSet(_discoveryPromise, this, this.discoverEndpoint());
              _context2.prev = 7;
              _context2.next = 10;
              return _classPrivateFieldGet(_discoveryPromise, this);
            case 10:
              _context2.prev = 10;
              // Clear the discovery promise regardless of outcome
              _classPrivateFieldSet(_discoveryPromise, this, null);
              return _context2.finish(10);
            case 13:
              if (endpointName) {
                _context2.next = 15;
                break;
              }
              return _context2.abrupt("return", _classPrivateFieldGet(_apiEndpoint, this));
            case 15:
              // For specific endpoints, map the name to the appropriate file
              endpointMap = {
                'ajaxDiffMerge': 'ajax-diff-merge.php',
                'diffProcessor': 'diff-processor.php',
                'getFileContent': 'get-file-content.php',
                'endpointsConfig': 'endpoint-config.php',
                // <-- Changed to endpoint-config.php (singular)
                'endpoints': 'endpoints-config.php' // <-- Keep original endpoints-config.php mapping
              }; // Get the file name for the requested endpoint
              fileName = endpointMap[endpointName]; // If no mapping exists, use a default pattern
              if (!fileName) {
                // Convert camelCase to kebab-case with .php extension
                fileName = endpointName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + '.php';
              }

              // Ensure the base URL ends with a slash
              baseUrl = _classPrivateFieldGet(_apiEndpoint, this).endsWith('/') ? _classPrivateFieldGet(_apiEndpoint, this) : _classPrivateFieldGet(_apiEndpoint, this) + '/';
              _Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("EndpointDiscovery: Resolved ".concat(endpointName, " to endpoint"), baseUrl + fileName, 2);
              return _context2.abrupt("return", baseUrl + fileName);
            case 21:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[7,, 10, 13]]);
      }));
      function getEndpoint(_x) {
        return _getEndpoint.apply(this, arguments);
      }
      return getEndpoint;
    }()
    /**
     * Get a complete API URL for a specific endpoint file
     * @param {string} endpointFile Filename to append to the base URL
     * @returns {Promise<string>} Full API URL
     */
    )
  }, {
    key: "getApiUrl",
    value: (function () {
      var _getApiUrl = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(endpointFile) {
        var baseUrl;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.getEndpoint();
            case 2:
              baseUrl = _context3.sent;
              return _context3.abrupt("return", "".concat(baseUrl).concat(endpointFile));
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function getApiUrl(_x2) {
        return _getApiUrl.apply(this, arguments);
      }
      return getApiUrl;
    }())
  }], [{
    key: "getInstance",
    value:
    /**
     * Get the singleton instance
     * @returns {EndpointDiscovery} The singleton instance
     */
    function getInstance() {
      if (!_instance._) {
        _instance._ = new EndpointDiscovery();
      }
      return _instance._;
    }
  }]);
}(_BaseSingleton__WEBPACK_IMPORTED_MODULE_1__.BaseSingleton);
function _determineEndpointFromScript() {
  try {
    // Find our script tag
    var scripts = document.querySelectorAll('script');
    var scriptUrl = null;
    var _iterator = _createForOfIteratorHelper(scripts),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var script = _step.value;
        if (script.src && (script.src.includes('diff-viewer.js') || script.src.includes('diff-viewer.min.js'))) {
          scriptUrl = script.src;
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (!scriptUrl) {
      return null;
    }

    // Get the directory path by removing the filename
    var basePath = scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1);

    // If it's in a /dist/ directory, adjust to parent
    if (basePath.endsWith('/dist/')) {
      basePath = basePath.substring(0, basePath.length - 5);
    }

    // Append 'api/' to the base path
    return "".concat(basePath, "api/");
  } catch (error) {
    _Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('EndpointDiscovery: Error determining endpoint from script', error, 2);
    return null;
  }
}
/**
 * Generate URL to endpoint-config.php
 * @private
 * @returns {string} URL to endpoint-config.php
 */
function _getEndpointConfigUrl() {
  // Try to use the base URL of the current page
  var baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);

  // Assume endpoint-config.php is in the /api/ directory
  if (baseUrl.includes('/diff-viewer/')) {
    // If we're in diff-viewer, go up one level
    return "".concat(baseUrl.substring(0, baseUrl.lastIndexOf('/diff-viewer/')), "api/endpoint-config.php");
  } else {
    // Default case - look for api in the current directory
    return "".concat(baseUrl, "api/endpoint-config.php");
  }
}
// Singleton instance
var _instance = {
  _: null
};

/***/ }),

/***/ "./src/utils/IconRegistry.js":
/*!***********************************!*\
  !*** ./src/utils/IconRegistry.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconRegistry: () => (/* binding */ IconRegistry)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Central registry for SVG icons
 * This eliminates the need for external icon libraries
 */
var IconRegistry = /*#__PURE__*/function () {
  function IconRegistry() {
    _classCallCheck(this, IconRegistry);
  }
  return _createClass(IconRegistry, null, [{
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

/***/ }),

/***/ "./src/utils/LoaderManager.js":
/*!************************************!*\
  !*** ./src/utils/LoaderManager.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoaderManager: () => (/* binding */ LoaderManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/Selectors */ "./src/constants/Selectors.js");
/* harmony import */ var _Debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Debug */ "./src/utils/Debug.js");
/* harmony import */ var _BaseSingleton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseSingleton */ "./src/utils/BaseSingleton.js");
/* harmony import */ var _TranslationManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TranslationManager */ "./src/utils/TranslationManager.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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
    _classCallCheck(this, LoaderManager);
    return _callSuper(this, LoaderManager, arguments);
  }
  _inherits(LoaderManager, _BaseSingleton);
  return _createClass(LoaderManager, [{
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
      this.verboseLogging = _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.isInitialized ? _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.logLevel > 2 : false;

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
      if (message && typeof message === 'string' && message.startsWith('$') && _TranslationManager__WEBPACK_IMPORTED_MODULE_3__.TranslationManager.getInstance().isInitialized()) {
        var translationKey = message.substring(1);
        var translatedMessage = _TranslationManager__WEBPACK_IMPORTED_MODULE_3__.TranslationManager.getInstance().get(translationKey);
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
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: Reusing main loader for fullscreen request', {
          message: message
        }, 3);
        this.updateLoaderMessage(this.mainLoaderId, message);
        return this.mainLoaderId;
      }
      _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: Showing loader', {
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
      _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: Showing main loader', {
        message: message
      }, 2);

      // If main loader is already active, just update the message and return the existing ID
      if (this.isMainLoaderActive && this.mainLoaderId && this.activeLoaders.has(this.mainLoaderId)) {
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: Main loader already active, updating message', {
          currentId: this.mainLoaderId,
          message: message
        }, 2);
        this.updateLoaderMessage(this.mainLoaderId, message);
        return this.mainLoaderId;
      }

      // Hide all other loaders when showing the main one
      this._hideAllInlineLoaders();

      // Get the main loader element if it exists in the DOM
      var mainLoaderElement = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].LOADER.MAIN.name());
      if (mainLoaderElement) {
        // If the element already exists in the DOM, just show it
        mainLoaderElement.style.display = 'flex';
        mainLoaderElement.classList.add(_constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].LOADER.ACTIVE.name());

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
        var _loaderId = this.showLoader(message, _objectSpread({
          fullscreen: true,
          className: _constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].LOADER.MAIN.name(),
          zIndex: 9999
        }, options));

        // Mark this as the main loader
        var loaderInfo = this.activeLoaders.get(_loaderId);
        if (loaderInfo) {
          loaderInfo.isMainLoader = true;
          loaderInfo.element.id = _constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].LOADER.MAIN.name();
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
      if (_Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.isInitialized) {
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: Showing early loader', {
          message: message
        }, 2);
      }

      // Create a loader that will become the main loader
      var loaderId = this.showLoader(message, _objectSpread({
        fullscreen: true,
        className: _constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].LOADER.MAIN.name(),
        zIndex: 9999
      }, options));

      // Mark this as the main loader
      var loaderInfo = this.activeLoaders.get(loaderId);
      if (loaderInfo) {
        loaderInfo.isMainLoader = true;
        loaderInfo.isEarlyLoader = true; // Mark as an early loader
        loaderInfo.element.id = _constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].LOADER.MAIN.name();
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
        if (_Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.isInitialized) {
          _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: No early loader to adopt, creating new main loader', null, 2);
        }
        return this.showMainLoader(message);
      }

      // Update the message if provided
      if (message) {
        this.updateLoaderMessage(this.mainLoaderId, message);
      }
      if (_Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.isInitialized) {
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: Adopted early loader as main loader', {
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
      _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: Hiding main loader', {
        loaderId: loaderId
      }, 2);

      // Special handling: If this was recently removed, just return success
      if (loaderId && this.recentlyRemovedLoaders.has(loaderId)) {
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: Main loader was recently removed', {
          loaderId: loaderId
        }, 2);
        return true;
      }

      // If main loader isn't active, silently succeed
      if (!this.isMainLoaderActive) {
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: Main loader not active, nothing to hide', null, 2);
        return true;
      }

      // If loaderId is provided but doesn't match the main loader ID, verify it
      if (loaderId && loaderId !== this.mainLoaderId) {
        var loaderInfo = this.activeLoaders.get(loaderId);
        // If it's not found or not a main loader, use the stored main loader ID
        if (!(loaderInfo !== null && loaderInfo !== void 0 && loaderInfo.isMainLoader)) {
          _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: Using stored main loader ID', {
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
        var mainLoaderElement = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].LOADER.MAIN.name());
        if (mainLoaderElement) {
          mainLoaderElement.style.display = 'none';
          if (mainLoaderElement.parentNode) {
            mainLoaderElement.parentNode.removeChild(mainLoaderElement);
          }
          _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: Removed main loader by element ID', null, 2);
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
      _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: Hiding all inline loaders', null, 3);

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
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: Hiding all loaders', null, 3);
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
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: Loader was recently removed', {
          loaderId: loaderId
        }, 2);
        return true;
      }

      // Case: this is the main loader
      if (loaderId === this.mainLoaderId) {
        return this.hideMainLoader(loaderId);
      }

      // Hide a specific loader
      _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: Hiding loader', {
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
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: Loader was recently removed (in _hideSpecificLoader)', {
          loaderId: loaderId
        }, 3);
        return true;
      }
      var loader = this.activeLoaders.get(loaderId);
      if (!loader) {
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: No loader found to hide', {
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
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: Loader element was already removed from DOM', {
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
      var loaderId = this.showLoader(message, _objectSpread({
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
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: Using main loader ID for message update', {
          mainLoaderId: loaderId
        }, 3);
      }
      var loader = this.activeLoaders.get(loaderId);
      if (!loader) {
        // Only log at level 2 if we're in verbose mode (reduces noise)
        if (this.verboseLogging) {
          _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: No loader found to update message', {
            loaderId: loaderId
          }, 2);
        }
        return false;
      }

      // Check if element still exists in DOM
      if (!((_loader$element2 = loader.element) !== null && _loader$element2 !== void 0 && _loader$element2.parentNode)) {
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('LoaderManager: Loader element was removed from DOM', {
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
        operations: _toConsumableArray(this.operationLog),
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
}(_BaseSingleton__WEBPACK_IMPORTED_MODULE_2__.BaseSingleton);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoaderManager);

/***/ }),

/***/ "./src/utils/MergeContentFormatter.js":
/*!********************************************!*\
  !*** ./src/utils/MergeContentFormatter.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MergeContentFormatter: () => (/* binding */ MergeContentFormatter)
/* harmony export */ });
/* harmony import */ var _StringUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StringUtils */ "./src/utils/StringUtils.js");
/* harmony import */ var _Debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Debug */ "./src/utils/Debug.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/**
 * Formats merge content for various displays
 */
var MergeContentFormatter = /*#__PURE__*/function () {
  function MergeContentFormatter() {
    _classCallCheck(this, MergeContentFormatter);
  }
  return _createClass(MergeContentFormatter, null, [{
    key: "formatPreview",
    value:
    /**
     * Format merged content for preview
     * @param {string} content - Raw content to format
     * @param {string} extension - File extension
     * @param {boolean} withLineNumbers - Whether to add line numbers
     * @returns {string} Formatted HTML
     */
    function formatPreview(content) {
      var extension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var withLineNumbers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      // Ensure we have valid content
      if (!content) {
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.warn('MergeContentFormatter: Empty content for preview formatting', null, 2);
        return '<pre><code>No content available</code></pre>';
      }

      // Store original content for copy operations
      var originalContent = content;

      // Safely escape content
      var escapedContent = _StringUtils__WEBPACK_IMPORTED_MODULE_0__.StringUtils.escapeHtml(content);

      // Map extension to language class for highlight.js
      var languageClass = MergeContentFormatter.getLanguageClass(extension);

      // Add data attribute for line numbers if requested
      var lineNumberAttr = withLineNumbers ? 'data-line-numbers="true"' : '';

      // Store original content in a data attribute for reliable copying
      var result = "<pre ".concat(lineNumberAttr, "><code class=\"").concat(languageClass, "\" data-original-code=\"").concat(_StringUtils__WEBPACK_IMPORTED_MODULE_0__.StringUtils.escapeAttribute(originalContent), "\">").concat(escapedContent, "</code></pre>");

      // Replace console.log with Debug utility
      _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('MergeContentFormatter: Preview HTML generated', {
        preview: result.substring(0, 150) + '...'
      }, 2);
      return result;
    }

    /**
     * Get language class from file extension
     * @param {string} extension - File extension
     * @returns {string} Language class for syntax highlighting
     */
  }, {
    key: "getLanguageClass",
    value: function getLanguageClass() {
      var extension = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      if (!extension) {
        return '';
      }

      // Map common extensions to highlight.js language classes
      var extensionMap = {
        'js': 'javascript',
        'ts': 'typescript',
        'py': 'python',
        'rb': 'ruby',
        'java': 'java',
        'cs': 'csharp',
        'php': 'php',
        'html': 'html',
        'css': 'css',
        'json': 'json',
        'xml': 'xml',
        'yml': 'yaml',
        'yaml': 'yaml',
        'md': 'markdown',
        'sql': 'sql'
      };
      return extensionMap[extension.toLowerCase()] || extension.toLowerCase();
    }

    /**
     * Format count of unresolved conflicts
     * @param {number} count - Number of unresolved conflicts
     * @param {Object} translations - Translation strings
     * @returns {string} Formatted message
     */
  }, {
    key: "formatUnresolvedCount",
    value: function formatUnresolvedCount(count) {
      var translations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (count === 1) {
        return (translations.unresolvedChunkSingular || 'There is %COUNT% unresolved chunk remaining.').replace('%COUNT%', count);
      } else {
        return (translations.unresolvedChunksPlural || 'There are %COUNT% unresolved chunks remaining.').replace('%COUNT%', count);
      }
    }

    /**
     * Prepare code for highlighting
     * @param {string} code - Code to prepare
     * @returns {string} Prepared code
     */
  }, {
    key: "prepareCode",
    value: function prepareCode(code) {
      // Clean up line endings
      var cleanCode = code.replace(/\r\n/g, '\n');
      return cleanCode;
    }

    /**
     * Reset element highlighting state
     * @param {Element} element - Element to reset
     * @returns {string|null} Original text content or null
     */
  }, {
    key: "resetHighlighting",
    value: function resetHighlighting(element) {
      if (!element) return null;

      // Remove data-highlighted attribute
      if (element.hasAttribute('data-highlighted')) {
        element.removeAttribute('data-highlighted');
      }

      // Store the original content
      var originalText = element.textContent;

      // Reset element content
      element.textContent = originalText;
      return originalText;
    }
  }]);
}();

/***/ }),

/***/ "./src/utils/NavigationUtils.js":
/*!**************************************!*\
  !*** ./src/utils/NavigationUtils.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavigationUtils: () => (/* binding */ NavigationUtils)
/* harmony export */ });
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/Selectors */ "./src/constants/Selectors.js");
/* harmony import */ var _Debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Debug */ "./src/utils/Debug.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/**
 * Navigation-related utility functions
 */
var NavigationUtils = /*#__PURE__*/function () {
  function NavigationUtils() {
    _classCallCheck(this, NavigationUtils);
  }
  return _createClass(NavigationUtils, null, [{
    key: "scrollElementIntoView",
    value:
    /**
     * Scroll element into view with smooth behavior
     * @param {Element} element - Element to scroll to
     * @param {Element} container - Scrollable container
     * @returns {boolean} Success status
     */
    function scrollElementIntoView(element, container) {
      if (!element || !container) {
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.warn('NavigationUtils: Missing element or container for scrolling', null, 2);
        return false;
      }

      // Calculate the target scroll position (center element in container)
      var elementTop = element.offsetTop;
      var containerHeight = container.clientHeight;
      var scrollTarget = elementTop - containerHeight / 2 + element.offsetHeight / 2;

      // Apply scroll with smooth behavior
      container.scrollTo({
        top: scrollTarget,
        behavior: 'smooth'
      });
      return true;
    }

    /**
     * Add highlight effect to an element
     * @param {Element} element - Element to highlight
     * @param {number} duration - Duration in ms
     */
  }, {
    key: "addHighlightEffect",
    value: function addHighlightEffect(element) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
      if (!element) return;
      element.classList.add(_constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].NAVIGATION.HIGHLIGHT.name());
      setTimeout(function () {
        element.classList.remove(_constants_Selectors__WEBPACK_IMPORTED_MODULE_0__["default"].NAVIGATION.HIGHLIGHT.name());
      }, duration);
    }

    /**
     * Make an element draggable
     * @param {Element} element - Element to make draggable
     * @param {Object} options - Configuration options
     * @returns {Object} Clean-up functions
     */
  }, {
    key: "makeDraggable",
    value: function makeDraggable(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!element) return;
      var defaults = {
        handleSelector: null,
        // Selector for drag handle (null = entire element)
        ignoreSelector: '.nav-button, .nav-counter',
        // Elements that shouldn't trigger drag
        positionStyle: 'fixed',
        // 'fixed' or 'absolute'
        dragClass: 'dragging' // Class to add while dragging
      };
      var config = _objectSpread(_objectSpread({}, defaults), options);
      var isDragging = false;
      var offsetX, offsetY;

      // Mouse down handler
      var mouseDownHandler = function mouseDownHandler(e) {
        // Skip if clicking on ignored elements
        if (config.ignoreSelector && e.target.matches(config.ignoreSelector)) {
          return;
        }

        // Skip if using handle and not clicking on it
        if (config.handleSelector && !e.target.matches(config.handleSelector)) {
          return;
        }
        isDragging = true;
        element.classList.add(config.dragClass);

        // Calculate offsets differently depending on position style
        var rect = element.getBoundingClientRect();
        offsetX = rect.right - e.clientX;
        offsetY = rect.bottom - e.clientY;

        // Prevent text selection during drag
        e.preventDefault();
      };

      // Mouse move handler
      var mouseMoveHandler = function mouseMoveHandler(e) {
        if (!isDragging) return;

        // Calculate new position from right and bottom edges
        var containerRect = element.parentElement.getBoundingClientRect();
        var newRight = containerRect.right - e.clientX - offsetX;
        var newBottom = containerRect.bottom - e.clientY - offsetY;

        // Ensure the element stays within the container
        newRight = Math.max(0, Math.min(newRight, containerRect.width - element.offsetWidth));
        newBottom = Math.max(0, Math.min(newBottom, containerRect.height - element.offsetHeight));

        // Apply new position using right and bottom
        element.style.right = "".concat(newRight, "px");
        element.style.bottom = "".concat(newBottom, "px");
        element.style.left = 'auto'; // Remove left positioning
        element.style.top = 'auto'; // Remove top positioning
      };

      // Mouse up handler
      var mouseUpHandler = function mouseUpHandler() {
        if (isDragging) {
          isDragging = false;
          element.classList.remove(config.dragClass);
        }
      };

      // Add event listeners
      element.addEventListener('mousedown', mouseDownHandler);
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);

      // Return clean-up function
      return {
        destroy: function destroy() {
          element.removeEventListener('mousedown', mouseDownHandler);
          document.removeEventListener('mousemove', mouseMoveHandler);
          document.removeEventListener('mouseup', mouseUpHandler);
        }
      };
    }
  }]);
}();

/***/ }),

/***/ "./src/utils/ResourceLoader.js":
/*!*************************************!*\
  !*** ./src/utils/ResourceLoader.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResourceLoader: () => (/* binding */ ResourceLoader)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Debug */ "./src/utils/Debug.js");
/* harmony import */ var _BaseSingleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseSingleton */ "./src/utils/BaseSingleton.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var ResourceLoader = /*#__PURE__*/function (_BaseSingleton) {
  /**
   * Constructor - protected from direct instantiation
   */
  function ResourceLoader() {
    var _this;
    _classCallCheck(this, ResourceLoader);
    _this = _callSuper(this, ResourceLoader);
    // Skip initialization if instance already exists
    if (!_this._isFirstInstance(instance)) {
      return _possibleConstructorReturn(_this);
    }

    // Initialize instance
    _this.config = null;
    _this.loadedResources = new Set();
    _this.loadedLanguages = new Set();
    _this.loadedThemes = new Set(); // ADD THIS LINE
    _this.CDN_BASE = 'https://cdnjs.cloudflare.com/ajax/libs';
    _this.HLJS_VERSION = '11.11.1';
    _this.LINE_NUMBERS_VERSION = '2.8.0';

    // Store instance
    instance = _this;
    return _this;
  }

  /**
   * Configure the ResourceLoader
   * @param {Object} config - Configuration object
   */
  _inherits(ResourceLoader, _BaseSingleton);
  return _createClass(ResourceLoader, [{
    key: "configure",
    value: function configure(config) {
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ResourceLoader: Configuring', {
        config: config
      }, 2);
      this.config = config;
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ResourceLoader configured');
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ResourceLoader: Configuration complete', null, 2);
      return this;
    }

    /**
     * Load all dependencies required for the diff viewer
     */
  }, {
    key: "loadDependencies",
    value: (function () {
      var _loadDependencies = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.loadSyntaxHighlighterCore();
            case 2:
              _context.next = 4;
              return this.loadLanguage(this.config.language || 'php');
            case 4:
              return _context.abrupt("return", true);
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function loadDependencies() {
        return _loadDependencies.apply(this, arguments);
      }
      return loadDependencies;
    }() // Split theme loading from core highlighter loading
    /**
     * Load syntax highlighter core without theme
     */
    )
  }, {
    key: "loadSyntaxHighlighterCore",
    value: function () {
      var _loadSyntaxHighlighterCore = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (this.config) {
                _context2.next = 3;
                break;
              }
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('ResourceLoader: Must be configured before loading dependencies', null, 2);
              throw new Error('ResourceLoader must be configured before loading dependencies');
            case 3:
              _context2.prev = 3;
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ResourceLoader: Loading syntax highlighter core (NO THEME)', null, 2);

              // Check if hljs is already loaded
              if (!window.hljs) {
                _context2.next = 9;
                break;
              }
              // Changed from level 3 to level 2 - more consistent with other logs
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ResourceLoader: highlight.js already loaded', null, 2);
              _context2.next = 15;
              break;
            case 9:
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ResourceLoader: Loading highlight.js from CDN', null, 2);
              _context2.next = 12;
              return this.loadScript("".concat(this.CDN_BASE, "/highlight.js/").concat(this.HLJS_VERSION, "/highlight.min.js"));
            case 12:
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ResourceLoader: Loading line numbers plugin', null, 2);
              _context2.next = 15;
              return this.loadScript("".concat(this.CDN_BASE, "/highlightjs-line-numbers.js/").concat(this.LINE_NUMBERS_VERSION, "/highlightjs-line-numbers.min.js"));
            case 15:
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('ResourceLoader: Syntax highlighter core loaded successfully', null, 2);
              return _context2.abrupt("return", true);
            case 19:
              _context2.prev = 19;
              _context2.t0 = _context2["catch"](3);
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('ResourceLoader: Failed to load syntax highlighter core:', _context2.t0, 2);
              return _context2.abrupt("return", false);
            case 23:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[3, 19]]);
      }));
      function loadSyntaxHighlighterCore() {
        return _loadSyntaxHighlighterCore.apply(this, arguments);
      }
      return loadSyntaxHighlighterCore;
    }()
    /**
     * Load a specific language for syntax highlighting
     * @param {string} language - The language to load
     * @returns {Promise} - Resolves when language is loaded
     */
  }, {
    key: "loadLanguage",
    value: (function () {
      var _loadLanguage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(language) {
        var langMap, normalizedLang;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              // Normalize language name
              langMap = {
                'markup': 'xml',
                'html': 'xml',
                'htm': 'xml',
                'javascript': 'javascript',
                'js': 'javascript',
                'typescript': 'typescript',
                'ts': 'typescript',
                'jsx': 'javascript',
                'tsx': 'typescript'
              }; // Get the normalized language name
              normalizedLang = langMap[language.toLowerCase()] || language.toLowerCase(); // Check if already loaded
              if (!this.loadedLanguages.has(normalizedLang)) {
                _context3.next = 4;
                break;
              }
              return _context3.abrupt("return", true);
            case 4:
              // Load the language
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ResourceLoader: Loading language ".concat(normalizedLang), null, 2);
              _context3.prev = 5;
              _context3.next = 8;
              return this.loadScript("".concat(this.CDN_BASE, "/highlight.js/").concat(this.HLJS_VERSION, "/languages/").concat(normalizedLang, ".min.js"));
            case 8:
              this.loadedLanguages.add(normalizedLang);
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ResourceLoader: Language ".concat(normalizedLang, " loaded from CDN successfully"), null, 2);
              return _context3.abrupt("return", true);
            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](5);
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn("ResourceLoader: Failed to load language ".concat(normalizedLang, ", falling back to built-in languages"), {
                error: _context3.t0
              }, 2);
              // Don't throw - highlight.js will use its built-in detection
              return _context3.abrupt("return", false);
            case 17:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[5, 13]]);
      }));
      function loadLanguage(_x) {
        return _loadLanguage.apply(this, arguments);
      }
      return loadLanguage;
    }()
    /**
     * Cache loaded resources to prevent duplicate requests
     * @private
     */
    )
  }, {
    key: "_cacheResource",
    value: function _cacheResource(url, loadPromise) {
      if (!this.resourceCache) {
        this.resourceCache = new Map();
      }
      if (!this.resourceCache.has(url)) {
        this.resourceCache.set(url, loadPromise);
      }
      return this.resourceCache.get(url);
    }

    /**
     * Load a script with caching
     * @param {string} url - Script URL
     * @returns {Promise} Loading promise
     */
  }, {
    key: "loadScript",
    value: function loadScript(url) {
      var _this2 = this;
      return this._cacheResource(url, new Promise(function (resolve, reject) {
        if (_this2.loadedResources.has(url)) {
          // Removed level 3 debug log - too verbose
          resolve();
          return;
        }
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ResourceLoader: Loading script: ".concat(url), null, 2);
        var script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = function () {
          _this2.loadedResources.add(url);
          // Removed level 3 debug log - covered by level 2 logs
          resolve();
        };
        script.onerror = function () {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error("ResourceLoader: Failed to load script: ".concat(url), null, 2);
          reject(new Error("Failed to load script: ".concat(url)));
        };
        document.head.appendChild(script);
      }));
    }

    /**
     * Load a CSS file with Promise support
     */
  }, {
    key: "loadCSS",
    value: function loadCSS(href) {
      var _this3 = this;
      if (this.loadedThemes.has(href)) {
        // Removed level 3 debug log - too verbose
        return Promise.resolve();
      }
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("ResourceLoader: Loading CSS: ".concat(href), null, 2);
      return new Promise(function (resolve, reject) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = function () {
          _this3.loadedThemes.add(href);
          // Removed level 3 debug log - covered by level 2 logs
          resolve();
        };
        link.onerror = function () {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error("ResourceLoader: Failed to load CSS: ".concat(href), null, 2);
          reject(new Error("Failed to load CSS: ".concat(href)));
        };
        document.head.appendChild(link);
      });
    }
  }], [{
    key: "getInstance",
    value:
    /**
     * Get the singleton instance
     * @returns {ResourceLoader} The singleton instance
     */
    function getInstance() {
      if (!instance) {
        instance = new ResourceLoader();
      }
      return instance;
    }
  }]);
}(_BaseSingleton__WEBPACK_IMPORTED_MODULE_1__.BaseSingleton);

/***/ }),

/***/ "./src/utils/StringUtils.js":
/*!**********************************!*\
  !*** ./src/utils/StringUtils.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StringUtils: () => (/* binding */ StringUtils)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * String utility functions for the diff viewer
 */
var StringUtils = /*#__PURE__*/function () {
  function StringUtils() {
    _classCallCheck(this, StringUtils);
  }
  return _createClass(StringUtils, null, [{
    key: "escapeHtml",
    value:
    /**
     * Escape HTML special characters to prevent XSS
     * @param {string} unsafe - The potentially unsafe string to escape
     * @returns {string} - HTML escaped string
     */
    function escapeHtml(unsafe) {
      if (!unsafe || typeof unsafe !== 'string') return '';
      return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/\//g, "&#x2F;").replace(/\\/g, "&#x5C;").replace(/`/g, "&#x60;");
    }

    /**
     * Escape a string for use in an HTML attribute
     * @param {string} str - String to escape
     * @returns {string} Escaped string
     */
  }, {
    key: "escapeAttribute",
    value: function escapeAttribute(str) {
      if (!str) return '';
      return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
  }]);
}();

/***/ }),

/***/ "./src/utils/TranslationManager.js":
/*!*****************************************!*\
  !*** ./src/utils/TranslationManager.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TranslationManager: () => (/* binding */ TranslationManager)
/* harmony export */ });
/* harmony import */ var _BaseSingleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseSingleton */ "./src/utils/BaseSingleton.js");
/* harmony import */ var _Debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Debug */ "./src/utils/Debug.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
    _classCallCheck(this, TranslationManager);
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
  return _createClass(TranslationManager, [{
    key: "_initializeFromGlobalConfig",
    value: function _initializeFromGlobalConfig() {
      if (window.diffConfig && window.diffConfig.translations) {
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('TranslationManager: Auto-initializing from window.diffConfig', window.diffConfig.translations, 2);
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
      _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log("TranslationManager: Initialized with \"".concat(lang, "\" language"), this.translations, 2);
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
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log("TranslationManager: Key \"".concat(key, "\" not found in \"").concat(this.lang, "\", using English fallback"), null, 2);
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
        _Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.log('TranslationManager: Instance created', null, 2);
      }
      return TranslationManager._instance;
    }
  }]);
}(_BaseSingleton__WEBPACK_IMPORTED_MODULE_0__.BaseSingleton);
/**
 * @private
 * Singleton instance
 */
_defineProperty(TranslationManager, "_instance", null);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"diff-viewer-src_utils_A": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = this["webpackChunkdiff_files"] = this["webpackChunkdiff_files"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["diff-viewer-src_components_C","diff-viewer-src_components_ch","diff-viewer-src_components_s","diff-viewer-src_c","diff-viewer-src_index_js-2dec6e20"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=diff-viewer-src_utils_A.js.map