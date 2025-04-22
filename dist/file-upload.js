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

/***/ "./src/components/browser/FileUploadManager.js":
/*!*****************************************************!*\
  !*** ./src/components/browser/FileUploadManager.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileUploadManager: () => (/* binding */ FileUploadManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Debug */ "./src/utils/Debug.js");
/* harmony import */ var _utils_EndpointDiscovery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/EndpointDiscovery */ "./src/utils/EndpointDiscovery.js");
/* harmony import */ var _utils_LoaderManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/LoaderManager */ "./src/utils/LoaderManager.js");
/* harmony import */ var _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/TranslationManager */ "./src/utils/TranslationManager.js");
/* harmony import */ var _utils_AlertManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/AlertManager */ "./src/utils/AlertManager.js");
/* harmony import */ var _utils_DiffConfigManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/DiffConfigManager */ "./src/utils/DiffConfigManager.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * File Upload Manager
 * Handles file uploads and diff comparison for Visual-Diff-Merge
 *
 * This component is responsible for the file upload UI in diff-viewer/file-upload.html
 */








/**
 * Manages the file upload UI and functionality
 */
var FileUploadManager = /*#__PURE__*/function () {
  /**
   * @param {Object} options - Configuration options
   */
  function FileUploadManager() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, FileUploadManager);
    // DOM Elements
    this.form = document.getElementById('file-upload-form');
    this.oldFileInput = document.getElementById('old-file-upload');
    this.newFileInput = document.getElementById('new-file-upload');
    this.diffLoading = document.getElementById('vdm-diff-loading');
    this.diffContainer = document.getElementById('diff-container');
    this.containerWrapper = document.getElementById('vdm-container__wrapper');

    // Initialize loader manager
    this.loaderManager = _utils_LoaderManager__WEBPACK_IMPORTED_MODULE_2__.LoaderManager.getInstance();

    // Initialize the DiffConfigManager with options
    var configManager = _utils_DiffConfigManager__WEBPACK_IMPORTED_MODULE_5__.DiffConfigManager.getInstance();
    configManager.initialize(_objectSpread({
      debug: true,
      logLevel: 3
    }, options));

    // Initialize endpoint discovery
    this.endpointDiscovery = _utils_EndpointDiscovery__WEBPACK_IMPORTED_MODULE_1__.EndpointDiscovery.getInstance();

    // Initialize
    this.init();
  }

  /**
   * Initialize event listeners
   */
  return _createClass(FileUploadManager, [{
    key: "init",
    value: function init() {
      var _this = this;
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('FileUploadManager: Initializing', null, 2);
      if (this.form) {
        this.form.addEventListener('submit', function (event) {
          return _this.handleFormSubmit(event);
        });
      } else {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn('FileUploadManager: Form element not found', null, 1);
      }
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('FileUploadManager: Initialization complete', null, 2);
    }

    /**
     * Handle form submission
     * @param {Event} event - Form submit event
     */
  }, {
    key: "handleFormSubmit",
    value: (function () {
      var _handleFormSubmit = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {
        var loaderManager, translationManager, alertManager, loaderId, fileData, fileContents, result;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              // Prevent default form submission
              event.preventDefault();
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('FileUploadManager: Handling file upload submission', null, 2);

              // Get the LoaderManager instance
              loaderManager = _utils_LoaderManager__WEBPACK_IMPORTED_MODULE_2__.LoaderManager.getInstance(); // Get the TranslationManager instance
              translationManager = _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_3__.TranslationManager.getInstance(); // Get the AlertManager instance
              alertManager = _utils_AlertManager__WEBPACK_IMPORTED_MODULE_4__["default"].getInstance(); // Clear any existing alerts
              alertManager.hideAlert();

              // Show an early loader before starting the process
              loaderId = loaderManager.showEarlyLoader(translationManager.get('loadingContent', 'Loading files...'));
              _context.prev = 7;
              // Reset diffConfig
              this.resetConfig();

              // Get file data
              fileData = this.getFileData(); // Read file contents
              loaderManager.updateLoaderMessage(loaderId, translationManager.get('loadingContent', 'Reading file contents...'));
              _context.next = 13;
              return this.readFileContents(fileData);
            case 13:
              fileContents = _context.sent;
              // Configure diff parameters
              this.configureDiff(fileData, fileContents);

              // Process diff with API
              loaderManager.updateLoaderMessage(loaderId, translationManager.get('loadingContent', 'Processing diff...'));
              _context.next = 18;
              return this.processDiff();
            case 18:
              result = _context.sent;
              if (!result._identicalContent) {
                _context.next = 23;
                break;
              }
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('FileUploadManager: Skipping diff viewer for identical content', null, 2);
              // Hide the loader since we're not continuing
              loaderManager.hideMainLoader(loaderId);
              return _context.abrupt("return");
            case 23:
              // Update diffConfig with API response using the central manager
              _utils_DiffConfigManager__WEBPACK_IMPORTED_MODULE_5__.DiffConfigManager.getInstance().setDiffConfig(result);

              // Initialize diff viewer
              loaderManager.updateLoaderMessage(loaderId, translationManager.get('renderingDiff', 'Initializing diff viewer...'));
              _context.next = 27;
              return this.initializeDiffViewer();
            case 27:
              _context.next = 34;
              break;
            case 29:
              _context.prev = 29;
              _context.t0 = _context["catch"](7);
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('FileUploadManager: Error processing diff', _context.t0, 1);
              this.handleError(_context.t0);

              // Hide the loader if there's an error
              loaderManager.hideMainLoader(loaderId);
            case 34:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[7, 29]]);
      }));
      function handleFormSubmit(_x) {
        return _handleFormSubmit.apply(this, arguments);
      }
      return handleFormSubmit;
    }()
    /**
     * Show loading indicators
     */
    )
  }, {
    key: "showLoading",
    value: function showLoading() {
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('FileUploadManager: Showing loading indicators', null, 3);

      // Make the container wrapper visible
      if (this.containerWrapper) {
        this.containerWrapper.classList.remove('vdm-d-none');
      }

      // Use the LoaderManager to show the main loader - this ensures only one is active at a time
      this.loaderManager.showMainLoader('Loading files...');

      // Clear any previous content from the diff container
      if (this.diffContainer) {
        this.diffContainer.innerHTML = '';
      }
    }

    /**
     * Reset configuration
     */
  }, {
    key: "resetConfig",
    value: function resetConfig() {
      var _window$diffConfig, _window$diffConfig2;
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('FileUploadManager: Resetting configuration', null, 3);

      // Get the current language settings before reset
      var lang = (_window$diffConfig = window.diffConfig) === null || _window$diffConfig === void 0 ? void 0 : _window$diffConfig.lang;
      var translations = (_window$diffConfig2 = window.diffConfig) === null || _window$diffConfig2 === void 0 ? void 0 : _window$diffConfig2.translations;

      // Reset the configuration with DiffConfigManager
      var configManager = _utils_DiffConfigManager__WEBPACK_IMPORTED_MODULE_5__.DiffConfigManager.getInstance();
      configManager.reset({
        debug: true,
        logLevel: 3,
        old: {},
        "new": {},
        lang: lang,
        translations: translations
      });

      // Clean up previous instances
      this.cleanupPreviousInstance();
    }

    /**
     * Clean up previous instances
     */
  }, {
    key: "cleanupPreviousInstance",
    value: function cleanupPreviousInstance() {
      // Clean up previous instances if they exist
      if (window.diffViewer) {
        try {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('FileUploadManager: Cleaning up previous DiffViewer instance', null, 2);
          window.diffViewer.destroy();
          window.diffViewer = null;
        } catch (e) {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn('FileUploadManager: Error destroying previous diffViewer', e, 1);
        }
      }
      if (window.vdmBrowserUIManager) {
        try {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('FileUploadManager: Cleaning up previous BrowserUIManager instance', null, 2);
          window.vdmBrowserUIManager.destroy();
          window.vdmBrowserUIManager = null;
        } catch (e) {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn('FileUploadManager: Error destroying previous BrowserUIManager', e, 1);
        }
      }
    }

    /**
     * Get file data from inputs
     * @returns {Object} File data object
     */
  }, {
    key: "getFileData",
    value: function getFileData() {
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('FileUploadManager: Getting file data from inputs', null, 3);
      var oldFile = this.oldFileInput.files[0];
      var newFile = this.newFileInput.files[0];
      if (!oldFile || !newFile) {
        throw new Error('Please select both old and new files');
      }
      return {
        old: oldFile,
        "new": newFile
      };
    }

    /**
     * Read file contents
     * @param {Object} fileData - File data object
     * @returns {Promise<Object>} File contents
     */
  }, {
    key: "readFileContents",
    value: (function () {
      var _readFileContents = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(fileData) {
        var oldContent, newContent;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('FileUploadManager: Reading file contents', fileData, 3);
              _context2.prev = 1;
              _context2.next = 4;
              return this.readFileAsText(fileData.old);
            case 4:
              oldContent = _context2.sent;
              _context2.next = 7;
              return this.readFileAsText(fileData["new"]);
            case 7:
              newContent = _context2.sent;
              return _context2.abrupt("return", {
                old: oldContent,
                "new": newContent
              });
            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](1);
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('FileUploadManager: Failed to read files', _context2.t0, 1);
              throw new Error("Failed to read files: ".concat(_context2.t0.message));
            case 15:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[1, 11]]);
      }));
      function readFileContents(_x2) {
        return _readFileContents.apply(this, arguments);
      }
      return readFileContents;
    }()
    /**
     * Read a file as text
     * @param {File} file - File object
     * @returns {Promise<string>} File content as text
     */
    )
  }, {
    key: "readFileAsText",
    value: function readFileAsText(file) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function (event) {
          return resolve(event.target.result);
        };
        reader.onerror = function (error) {
          return reject(error);
        };
        reader.readAsText(file);
      });
    }

    /**
     * Configure diff parameters
     * @param {Object} fileData - File data object
     * @param {Object} fileContents - File contents
     */
  }, {
    key: "configureDiff",
    value: function configureDiff(fileData, fileContents) {
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('FileUploadManager: Configuring diff parameters', fileData, 3);
      var configManager = _utils_DiffConfigManager__WEBPACK_IMPORTED_MODULE_5__.DiffConfigManager.getInstance();

      // Update the configuration with file data
      configManager.update({
        old: {
          type: 'upload',
          content: fileContents.old,
          filename: fileData.old.name
        },
        "new": {
          type: 'upload',
          content: fileContents["new"],
          filename: fileData["new"].name
        },
        // Use the old filename as the filepath for syntax detection
        filepath: fileData.old.name
      });
    }

    /**
     * Process diff with API
     * @returns {Promise<Object>} API response
     */
  }, {
    key: "processDiff",
    value: (function () {
      var _processDiff = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _document$querySelect, apiEndpoint, _window$diffConfig3, csrfToken, headers, response, result, importantProps, _i, _importantProps, prop;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('FileUploadManager: Processing diff with API', null, 2);
              _context3.prev = 1;
              // Get API endpoint with endpoint discovery or fallback
              apiEndpoint = null; // Try to get endpoint from discovery service
              _context3.prev = 3;
              _context3.next = 6;
              return this.endpointDiscovery.getEndpoint('diffProcessor');
            case 6:
              apiEndpoint = _context3.sent;
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('FileUploadManager: Using discovered endpoint', apiEndpoint, 2);
              _context3.next = 13;
              break;
            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](3);
              // We'll handle this with the fallback below
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn('FileUploadManager: Endpoint discovery failed', _context3.t0, 1);
            case 13:
              // Use fallback if endpoint discovery failed
              if (!apiEndpoint) {
                apiEndpoint = ((_window$diffConfig3 = window.diffConfig) === null || _window$diffConfig3 === void 0 ? void 0 : _window$diffConfig3.apiEndpoint) || '../api/diff-processor.php';
                _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn('FileUploadManager: Using fallback endpoint', apiEndpoint, 1);
              }

              // Get CSRF token if present in the page
              csrfToken = (_document$querySelect = document.querySelector('meta[name="csrf-token"]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.getAttribute('content'); // Prepare request headers
              headers = {
                'Content-Type': 'application/json'
              }; // Add CSRF token if available
              if (csrfToken) {
                headers['X-CSRF-Token'] = csrfToken;
                _utils_DiffConfigManager__WEBPACK_IMPORTED_MODULE_5__.DiffConfigManager.getInstance().set('csrfToken', csrfToken);
              }

              // Send data to API
              _context3.next = 19;
              return fetch(apiEndpoint, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(window.diffConfig)
              });
            case 19:
              response = _context3.sent;
              if (response.ok) {
                _context3.next = 22;
                break;
              }
              throw new Error("API request failed: ".concat(response.status, " ").concat(response.statusText));
            case 22:
              _context3.next = 24;
              return response.json();
            case 24:
              result = _context3.sent;
              if (!result.error) {
                _context3.next = 27;
                break;
              }
              throw new Error(result.error);
            case 27:
              if (!(result.identical === true)) {
                _context3.next = 31;
                break;
              }
              // Handle identical content case
              this.handleIdenticalContent(result.message || "The files are identical.");
              // Mark the result with a special flag to indicate identical content
              result._identicalContent = true;
              return _context3.abrupt("return", result);
            case 31:
              // Comprehensive Fix: Move all important properties from config to root level
              if (result.config) {
                importantProps = ['diffData', 'serverSaveEnabled', 'fileRefId', 'oldFileRefId', 'newFileName', 'oldFileName', 'filepath', 'demoEnabled'];
                for (_i = 0, _importantProps = importantProps; _i < _importantProps.length; _i++) {
                  prop = _importantProps[_i];
                  if (result.config[prop] !== undefined && (result[prop] === undefined || prop === 'diffData' && (!result[prop].chunks || result[prop].chunks.length === 0))) {
                    _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log("FileUploadManager: Moving ".concat(prop, " from config to root level"), null, 2);
                    result[prop] = result.config[prop];
                  }
                }
              }
              return _context3.abrupt("return", result);
            case 35:
              _context3.prev = 35;
              _context3.t1 = _context3["catch"](1);
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('FileUploadManager: API processing failed', _context3.t1, 1);
              throw new Error("Failed to process diff: ".concat(_context3.t1.message));
            case 39:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[1, 35], [3, 10]]);
      }));
      function processDiff() {
        return _processDiff.apply(this, arguments);
      }
      return processDiff;
    }()
    /**
     * Initialize diff viewer
     * @returns {Promise<boolean>} Success status
     */
    )
  }, {
    key: "initializeDiffViewer",
    value: (function () {
      var _initializeDiffViewer = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('FileUploadManager: Initializing diff viewer', null, 2);
              _context4.prev = 1;
              if (!(typeof DiffViewer !== 'undefined')) {
                _context4.next = 7;
                break;
              }
              // Create a new DiffViewer instance using the global window.diffConfig
              window.diffViewer = new DiffViewer(window.diffConfig);

              // Initialize the viewer
              return _context4.abrupt("return", window.diffViewer.initialize());
            case 7:
              if (!(typeof window.enableDiffViewer === 'function')) {
                _context4.next = 12;
                break;
              }
              // Fall back to the global enableDiffViewer function if available
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('FileUploadManager: DiffViewer not available, falling back to enableDiffViewer', null, 2);
              return _context4.abrupt("return", window.enableDiffViewer());
            case 12:
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('FileUploadManager: DiffViewer not available', null, 1);
              throw new Error('DiffViewer not available');
            case 14:
              _context4.next = 20;
              break;
            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4["catch"](1);
              _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('FileUploadManager: Error initializing diff viewer', _context4.t0, 1);
              throw _context4.t0;
            case 20:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[1, 16]]);
      }));
      function initializeDiffViewer() {
        return _initializeDiffViewer.apply(this, arguments);
      }
      return initializeDiffViewer;
    }()
    /**
     * Handle identical content case
     * @param {string} message - Message to display
     */
    )
  }, {
    key: "handleIdenticalContent",
    value: function handleIdenticalContent(message) {
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('FileUploadManager: Files are identical', message, 2);

      // Hide the loading indicator using the LoaderManager
      this.loaderManager.hideMainLoader();

      // Hide the diff container wrapper since we won't show a diff
      if (this.containerWrapper) {
        this.containerWrapper.classList.add('vdm-d-none');
      }

      // Get the result container
      var resultContainer = document.getElementById('vdm-merge__result');
      if (resultContainer) {
        // Show the result container
        resultContainer.classList.remove('vdm-d-none');
        resultContainer.innerHTML = '';

        // Use AlertManager to show the identical content message
        var alertManager = _utils_AlertManager__WEBPACK_IMPORTED_MODULE_4__["default"].getInstance();
        var alertElement = alertManager.showInfo(message, {
          timeout: 0,
          // Don't auto-dismiss
          translate: false // Message is already translated
        });

        // Add the alert to the result container
        resultContainer.appendChild(alertElement);
      }
    }

    /**
     * Handle error
     * @param {Error} error - Error object
     */
  }, {
    key: "handleError",
    value: function handleError(error) {
      // If this is our special "identical content" marker, do nothing
      // as we've already displayed the message
      if (error.message === 'IDENTICAL_CONTENT') {
        _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('FileUploadManager: Handling identical content (expected)', null, 2);
        return;
      }
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('FileUploadManager: Error processing diff', error, 1);

      // Hide loading indicator using LoaderManager
      this.loaderManager.hideMainLoader();

      // Show error in container using AlertManager
      if (this.diffContainer) {
        this.diffContainer.innerHTML = '';
        var alertManager = _utils_AlertManager__WEBPACK_IMPORTED_MODULE_4__["default"].getInstance();
        var errorMessage = "\n                <h4>Error Processing Files</h4>\n                <p>".concat(error.message || 'An unknown error occurred', "</p>\n            ");
        var alertElement = alertManager.showError(errorMessage, {
          timeout: 0,
          // Don't auto-dismiss
          translate: false,
          // Error message doesn't need translation
          className: 'vdm-p-3' // Add padding for better appearance
        });
        this.diffContainer.appendChild(alertElement);
      }
    }
  }]);
}();

// Export the class
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FileUploadManager);

/***/ }),

/***/ "./src/constants/Selectors.js":
/*!************************************!*\
  !*** ./src/constants/Selectors.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Debug */ "./src/utils/Debug.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
          _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.warn("Selector '".concat(target, "' doesn't start with '.' or '#' but name() was called on it"));
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
    if (_typeof(obj[key]) === 'object' && obj[key] !== null) {
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
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.log('Overriding UI selectors with config values', window.diffConfig.ui, 2);
    } catch (e) {
      _utils_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error('Error applying UI selector overrides from config', e, 1);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Selectors);

/***/ }),

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
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/file-upload.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_browser_FileUploadManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/browser/FileUploadManager */ "./src/components/browser/FileUploadManager.js");
/* harmony import */ var _utils_EndpointDiscovery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/EndpointDiscovery */ "./src/utils/EndpointDiscovery.js");
/**
 * File Upload Entry Point
 * Entry point for file-upload.html example
 */




// Initialize endpoint discovery as a global instance for reuse
window.vdmEndpointDiscovery = _utils_EndpointDiscovery__WEBPACK_IMPORTED_MODULE_1__.EndpointDiscovery.getInstance();

// Export FileUploadManager to global scope
window.FileUploadManager = _components_browser_FileUploadManager__WEBPACK_IMPORTED_MODULE_0__.FileUploadManager;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  window.fileUploadManager = new _components_browser_FileUploadManager__WEBPACK_IMPORTED_MODULE_0__.FileUploadManager();
});
})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=file-upload.js.map