"use strict";
(this["webpackChunkdiff_files"] = this["webpackChunkdiff_files"] || []).push([["diff-viewer-src_index_js-2dec6e20"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BrowserUIManager: () => (/* reexport safe */ _components_viewer_BrowserUIManager__WEBPACK_IMPORTED_MODULE_8__.BrowserUIManager),
/* harmony export */   DiffConfigManager: () => (/* reexport safe */ _utils_DiffConfigManager__WEBPACK_IMPORTED_MODULE_13__.DiffConfigManager),
/* harmony export */   DiffViewer: () => (/* reexport safe */ _components_DiffViewer__WEBPACK_IMPORTED_MODULE_0__.DiffViewer),
/* harmony export */   EndpointDiscovery: () => (/* reexport safe */ _utils_EndpointDiscovery__WEBPACK_IMPORTED_MODULE_9__.EndpointDiscovery),
/* harmony export */   LoaderManager: () => (/* reexport safe */ _utils_LoaderManager__WEBPACK_IMPORTED_MODULE_10__.LoaderManager)
/* harmony export */ });
/* harmony import */ var _components_DiffViewer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/DiffViewer */ "./src/components/DiffViewer.js");
/* harmony import */ var _utils_ResourceLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/ResourceLoader */ "./src/utils/ResourceLoader.js");
/* harmony import */ var _data_highlightjs_themes_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/highlightjs-themes.json */ "./src/data/highlightjs-themes.json");
/* harmony import */ var _components_ThemeManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/ThemeManager */ "./src/components/ThemeManager.js");
/* harmony import */ var _utils_Debug__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/Debug */ "./src/utils/Debug.js");
/* harmony import */ var _utils_ConfigUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/ConfigUtils */ "./src/utils/ConfigUtils.js");
/* harmony import */ var _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/DOMUtils */ "./src/utils/DOMUtils.js");
/* harmony import */ var _constants_Selectors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./constants/Selectors */ "./src/constants/Selectors.js");
/* harmony import */ var _components_viewer_BrowserUIManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/viewer/BrowserUIManager */ "./src/components/viewer/BrowserUIManager.js");
/* harmony import */ var _utils_EndpointDiscovery__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/EndpointDiscovery */ "./src/utils/EndpointDiscovery.js");
/* harmony import */ var _utils_LoaderManager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/LoaderManager */ "./src/utils/LoaderManager.js");
/* harmony import */ var _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/TranslationManager */ "./src/utils/TranslationManager.js");
/* harmony import */ var _utils_AlertManager__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/AlertManager */ "./src/utils/AlertManager.js");
/* harmony import */ var _utils_DiffConfigManager__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/DiffConfigManager */ "./src/utils/DiffConfigManager.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }















// Module-level singleton instance
var browserUIManagerInstance = null;

// Initialize endpoint discovery early
var endpointDiscovery = _utils_EndpointDiscovery__WEBPACK_IMPORTED_MODULE_9__.EndpointDiscovery.getInstance();

// Add copyright link to forms with vdm-form class
function addCopyrightLink() {
  // Find all forms with the vdm-form class
  var forms = document.querySelectorAll('.vdm-form');
  forms.forEach(function (form) {
    // Check if the copyright link already exists to prevent duplicates
    var existingLink = form.parentNode.querySelector('.vdm-copyright-link');
    if (existingLink) return;

    // Create the copyright link element
    var linkContainer = document.createElement('div');
    linkContainer.className = 'vdm-copyright-link';
    linkContainer.style.cssText = 'text-align: right; font-size: 11px; margin-top: 4px; opacity: 0.7;';

    // Create the actual link
    linkContainer.innerHTML = '<a href="https://visual-diff-merge.miglisoft.com/" rel="noopener" target="_blank" style="text-decoration: none; color: inherit;">Powered by Visual-Diff-Merge</a>';

    // Insert the link after the form
    form.parentNode.insertBefore(linkContainer, form.nextSibling);
  });
}

// Run the function when DOM is loaded
document.addEventListener('DOMContentLoaded', addCopyrightLink);

// Also run it when the window loads (for dynamically created forms)
window.addEventListener('load', addCopyrightLink);
window.enableDiffViewer = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var _window$diffConfig, _window$diffConfig2, _window$diffConfig3;
  var debug, logLevel, loaderManager, translationManager, configLang, initialMessage, mainLoaderId, _window$diffConfig4, _window$diffConfig5, message, apiEndpoint, _message, validationResult, themePrefs, resourceLoader, themeManager, containerWrapper, diffContainer, isFileBrowser, tempUIManager, container, attempts, maxAttempts, loadingElement, diffConfigManager, serverSaveEnabled, diffViewer, diffContainerElement, viewerElement, alertManager, errorTitle, errorMessage, alertElement;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        // Enhanced config extraction with proper nested structure handling
        debug = false;
        logLevel = 1; // Check multiple possible config structures
        if (window.diffConfig) {
          // Direct config properties (most common)
          if (typeof window.diffConfig.debug !== 'undefined') {
            debug = window.diffConfig.debug;
            logLevel = window.diffConfig.logLevel || 1;
          }
          // Nested config structure (from DiffConfigManager)
          else if (window.diffConfig.config && typeof window.diffConfig.config.debug !== 'undefined') {
            debug = window.diffConfig.config.debug;
            logLevel = window.diffConfig.config.logLevel || 1;
          }
          // Success response structure (from API calls)
          else if (window.diffConfig.success && window.diffConfig.config) {
            debug = window.diffConfig.config.debug || false;
            logLevel = window.diffConfig.config.logLevel || 1;
          }
        }

        // Add debug trace to identify the exact structure being used
        console.log('=== DEBUG CONFIG EXTRACTION ===', {
          windowDiffConfigExists: !!window.diffConfig,
          configStructure: window.diffConfig ? Object.keys(window.diffConfig) : 'none',
          directDebug: (_window$diffConfig = window.diffConfig) === null || _window$diffConfig === void 0 ? void 0 : _window$diffConfig.debug,
          nestedDebug: (_window$diffConfig2 = window.diffConfig) === null || _window$diffConfig2 === void 0 || (_window$diffConfig2 = _window$diffConfig2.config) === null || _window$diffConfig2 === void 0 ? void 0 : _window$diffConfig2.debug,
          finalDebug: debug,
          finalLogLevel: logLevel
        });
        _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.initialize(debug, '[DiffViewer]', logLevel);

        // Initialize centralized loader management
        loaderManager = _utils_LoaderManager__WEBPACK_IMPORTED_MODULE_10__.LoaderManager.getInstance();
        translationManager = _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_11__.TranslationManager.getInstance(); // Run the copyright link function again to catch any dynamically added forms
        addCopyrightLink();

        // Initialize translation manager if needed and if config contains translations
        if ((_window$diffConfig3 = window.diffConfig) !== null && _window$diffConfig3 !== void 0 && _window$diffConfig3.translations && !translationManager.isInitialized()) {
          configLang = window.diffConfig.lang || 'en';
          _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.log("Initializing TranslationManager with language: ".concat(configLang), null, 2);
          translationManager.initialize(configLang, window.diffConfig.translations);
        }

        // Get loading message from translations or use default
        initialMessage = translationManager.get('loadingDiff', 'Loading diff...'); // Try to adopt any early loader that might exist from URL/file components
        // This ensures a smooth transition from early loading to main app loading
        mainLoaderId = loaderManager.adoptEarlyLoader(initialMessage);
        _context.prev = 11;
        // PHASE 1: PREPARATION - level 1 log (phase boundary)
        _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.log('INITIALIZATION - PHASE 1: PREPARATION', null, 1);
        loaderManager.updateLoaderMessage(mainLoaderId, translationManager.get('loadingContent', 'Loading content...'));

        // Check for identical files first
        if (!((_window$diffConfig4 = window.diffConfig) !== null && _window$diffConfig4 !== void 0 && _window$diffConfig4.isIdentical)) {
          _context.next = 19;
          break;
        }
        // Get message from translations
        message = translationManager.get('filesIdenticalMessage', 'The files are identical. No differences found.');
        _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_6__.DOMUtils.showMessage(_constants_Selectors__WEBPACK_IMPORTED_MODULE_7__["default"].DIFF.CONTENT_WRAPPER.name(), message, 'info');

        // Hide the loader since we're done
        loaderManager.hideMainLoader(mainLoaderId);
        return _context.abrupt("return");
      case 19:
        _context.prev = 19;
        loaderManager.updateLoaderMessage(mainLoaderId, translationManager.get('discoveringEndpoints', 'Discovering API endpoints...'));
        _context.next = 23;
        return endpointDiscovery.getEndpoint();
      case 23:
        apiEndpoint = _context.sent;
        _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.log('API endpoint discovered', apiEndpoint, 2);

        // Update diffConfig with discovered endpoint
        if (window.diffConfig && !window.diffConfig.apiEndpoint) {
          window.diffConfig.apiEndpoint = apiEndpoint;
        }
        _context.next = 31;
        break;
      case 28:
        _context.prev = 28;
        _context.t0 = _context["catch"](19);
        _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.warn('API endpoint discovery failed, using fallbacks', _context.t0, 1);
      case 31:
        if (!((_window$diffConfig5 = window.diffConfig) !== null && _window$diffConfig5 !== void 0 && _window$diffConfig5.isIdentical)) {
          _context.next = 36;
          break;
        }
        // Get message from translations
        _message = translationManager.get('filesIdenticalMessage', 'The files are identical. No differences found.');
        _utils_DOMUtils__WEBPACK_IMPORTED_MODULE_6__.DOMUtils.showMessage(_constants_Selectors__WEBPACK_IMPORTED_MODULE_7__["default"].DIFF.CONTENT_WRAPPER.name(), _message, 'info');

        // Hide the loader since we're done
        loaderManager.hideMainLoader(mainLoaderId);
        return _context.abrupt("return");
      case 36:
        if (!window.diffViewer) {
          _context.next = 43;
          break;
        }
        _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.log('Cleaning up previous instance', null, 1);
        loaderManager.updateLoaderMessage(mainLoaderId, translationManager.get('cleaningUpPrevious', 'Cleaning up previous instance...'));
        if (!(typeof window.diffViewer.destroy === 'function')) {
          _context.next = 42;
          break;
        }
        _context.next = 42;
        return window.diffViewer.destroy();
      case 42:
        window.diffViewer = null;
      case 43:
        // Clean up UI manager if it exists
        if (window.vdmBrowserUIManager) {
          _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.log('Cleaning up browser UI manager', null, 1);
          if (typeof window.vdmBrowserUIManager.destroy === 'function') {
            window.vdmBrowserUIManager.destroy();
          }
          window.vdmBrowserUIManager = null;
        }

        // Level 1 log - overall initialization started
        _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.log('INITIALIZATION - STARTING', null, 1);

        // Validate configuration
        loaderManager.updateLoaderMessage(mainLoaderId, translationManager.get('validatingConfig', 'Validating configuration...'));
        validationResult = _utils_ConfigUtils__WEBPACK_IMPORTED_MODULE_5__.ConfigUtils.validateConfig(window.diffConfig);
        if (validationResult.isValid) {
          _context.next = 51;
          break;
        }
        _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.error(validationResult.error);
        loaderManager.hideMainLoader(mainLoaderId);
        return _context.abrupt("return");
      case 51:
        // High-level summary of what we're loading
        _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.log('CONFIGURATION SUMMARY', _utils_ConfigUtils__WEBPACK_IMPORTED_MODULE_5__.ConfigUtils.getConfigSummary(window.diffConfig), 1);

        // PHASE 2: SERVICES INITIALIZATION - level 1 log
        _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.log('INITIALIZATION - PHASE 2: SERVICES', null, 1);
        loaderManager.updateLoaderMessage(mainLoaderId, translationManager.get('initializingServices', 'Initializing services...'));

        // Get saved theme preferences
        themePrefs = _utils_ConfigUtils__WEBPACK_IMPORTED_MODULE_5__.ConfigUtils.getThemePreferences(window.diffConfig); // 1. Configure ResourceLoader WITHOUT theme loading
        resourceLoader = _utils_ResourceLoader__WEBPACK_IMPORTED_MODULE_1__.ResourceLoader.getInstance();
        resourceLoader.configure({
          availableThemes: _data_highlightjs_themes_json__WEBPACK_IMPORTED_MODULE_2__,
          currentTheme: themePrefs.mode,
          currentThemeFamily: themePrefs.family,
          language: _utils_ConfigUtils__WEBPACK_IMPORTED_MODULE_5__.ConfigUtils.getFileExtension(window.diffConfig.filepath, 'php')
        });

        // 2. Initialize ThemeManager as the ONLY theme loader
        themeManager = _components_ThemeManager__WEBPACK_IMPORTED_MODULE_3__.ThemeManager.getInstance();
        themeManager.initialize({
          theme: window.diffConfig.theme
        }, resourceLoader);

        // PHASE 2.5: UI PREPARATION - Generate required DOM elements first
        _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.log('INITIALIZATION - PHASE 2.5: UI PREPARATION', null, 1);
        loaderManager.updateLoaderMessage(mainLoaderId, translationManager.get('preparingUI', 'Preparing UI elements...'));

        // Detect if we're in file browser mode - container wrapper exists but diff container doesn't
        containerWrapper = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_7__["default"].CONTAINER.WRAPPER.name());
        diffContainer = document.getElementById(_constants_Selectors__WEBPACK_IMPORTED_MODULE_7__["default"].DIFF.CONTAINER.name());
        isFileBrowser = containerWrapper && !diffContainer; // If in file browser mode, create UI elements BEFORE initializing DiffViewer
        if (!isFileBrowser) {
          _context.next = 72;
          break;
        }
        _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.log('Creating browser UI elements before DiffViewer initialization', null, 1);

        // Create a temporary BrowserUIManager with config options
        tempUIManager = new _components_viewer_BrowserUIManager__WEBPACK_IMPORTED_MODULE_8__.BrowserUIManager({
          options: window.diffConfig || {}
        }); // Generate UI elements - container wrapper already exists from the PHP template
        tempUIManager.initialize();

        // Store reference and clean up later
        browserUIManagerInstance = tempUIManager;
        window.vdmBrowserUIManager = tempUIManager;

        // Wait a short time to ensure DOM elements are fully created (important!)
        _context.next = 72;
        return new Promise(function (resolve) {
          return setTimeout(resolve, 50);
        });
      case 72:
        // PHASE 3: COMPONENT INITIALIZATION - level 1 log
        _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.log('INITIALIZATION - PHASE 3: COMPONENTS', null, 1);
        loaderManager.updateLoaderMessage(mainLoaderId, translationManager.get('initializingComponents', 'Initializing components...'));

        // Now that DOM elements should exist, get the container - checking several times if needed
        container = document.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_7__["default"].DIFF.VIEWER);
        attempts = 0;
        maxAttempts = 5; // If we're in file browser mode and container isn't found immediately, try a few times
        if (!isFileBrowser) {
          _context.next = 86;
          break;
        }
      case 78:
        if (!(!container && attempts < maxAttempts)) {
          _context.next = 86;
          break;
        }
        _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.log("Container element ".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_7__["default"].DIFF.VIEWER, " not found, attempt ").concat(attempts + 1, "/").concat(maxAttempts), null, 2);
        _context.next = 82;
        return new Promise(function (resolve) {
          return setTimeout(resolve, 100);
        });
      case 82:
        // Wait 100ms between attempts
        container = document.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_7__["default"].DIFF.VIEWER);
        attempts++;
        _context.next = 78;
        break;
      case 86:
        if (container) {
          _context.next = 90;
          break;
        }
        _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.error("Container element ".concat(_constants_Selectors__WEBPACK_IMPORTED_MODULE_7__["default"].DIFF.VIEWER, " not found after ").concat(attempts, " attempts"));
        loaderManager.hideMainLoader(mainLoaderId);
        return _context.abrupt("return");
      case 90:
        // Show the container (hide loading indicator if it exists)
        loadingElement = document.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_7__["default"].LOADER.MAIN);
        if (loadingElement) {
          loadingElement.style.display = 'none';
          _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.log('Loading element hidden', null, 2);
        }
        if (container) {
          container.style.display = 'flex'; // Changed from 'block' to 'flex'
          _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.log('Container element shown', null, 2);
        }

        // Make sure serverSaveEnabled is properly set NOW (after UI preparation)
        // This allows FileBrowserManager to configure it first via DiffConfigManager
        diffConfigManager = _utils_DiffConfigManager__WEBPACK_IMPORTED_MODULE_13__.DiffConfigManager.getInstance(); // Read serverSaveEnabled from window.diffConfig (via DiffConfigManager interface)
        serverSaveEnabled = diffConfigManager.get('serverSaveEnabled', false);
        _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.log("Using serverSaveEnabled=".concat(serverSaveEnabled, " from DiffConfigManager"), null, 2);

        // 3. Create DiffViewer with runtime properties and pass the mainLoaderId
        diffViewer = new _components_DiffViewer__WEBPACK_IMPORTED_MODULE_0__.DiffViewer({
          // Runtime properties - read directly from DiffConfigManager (which uses window.diffConfig)
          diffData: diffConfigManager.get('diffData'),
          serverSaveEnabled: serverSaveEnabled,
          // SECURITY: Use only fileRefId and filenames, not server paths
          fileRefId: diffConfigManager.get('fileRefId', ''),
          oldFileRefId: diffConfigManager.get('oldFileRefId', ''),
          newFileName: diffConfigManager.get('newFileName', ''),
          oldFileName: diffConfigManager.get('oldFileName', ''),
          isIdentical: diffConfigManager.get('isIdentical', false),
          filepath: diffConfigManager.get('filepath'),
          // Dependencies (not config values)
          resourceLoader: resourceLoader,
          themeManager: themeManager,
          endpointDiscovery: endpointDiscovery,
          // Pass the centralized loader management ID
          mainLoaderId: mainLoaderId
        }); // Store reference
        window.diffViewer = diffViewer;

        // If we created a temporary UI manager, update it with the actual diffViewer instance
        if (isFileBrowser && browserUIManagerInstance) {
          browserUIManagerInstance.setDiffViewer(diffViewer);
          // Set the browserUIManager on the diffViewer to ensure proper bidirectional reference
          diffViewer.setBrowserUIManager(browserUIManagerInstance);
        }

        // PHASE 4: RESOURCE LOADING - level 1 log
        _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.log('INITIALIZATION - PHASE 4: RESOURCES', null, 1);
        loaderManager.updateLoaderMessage(mainLoaderId, translationManager.get('loadingResources', 'Loading resources...'));

        // 4. Load core dependencies - syntax highlighter ONLY, no theme
        _context.next = 103;
        return resourceLoader.loadSyntaxHighlighterCore();
      case 103:
        // 5. Load theme ONCE through ThemeManager
        loaderManager.updateLoaderMessage(mainLoaderId, translationManager.get('loadingTheme', 'Loading theme...'));
        _context.next = 106;
        return themeManager.loadInitialTheme();
      case 106:
        // PHASE 5: UI INITIALIZATION - level 1 log
        _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.log('INITIALIZATION - PHASE 5: UI', null, 1);
        loaderManager.updateLoaderMessage(mainLoaderId, translationManager.get('initializingUI', 'Initializing UI...'));

        // 7. Initialize UI after all resources are loaded
        _context.next = 110;
        return diffViewer.initialize();
      case 110:
        // Mark as loaded using DOMUtils
        diffContainerElement = document.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_7__["default"].DIFF.CONTAINER);
        if (diffContainerElement) {
          diffContainerElement.classList.add(_constants_Selectors__WEBPACK_IMPORTED_MODULE_7__["default"].STATUS.LOADED.name());
        }

        // PHASE 6: COMPLETION - level 1 log
        _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.log('INITIALIZATION - COMPLETE', null, 1);

        // Hide the loader now that initialization is complete
        loaderManager.hideMainLoader(mainLoaderId);
        return _context.abrupt("return", diffViewer);
      case 117:
        _context.prev = 117;
        _context.t1 = _context["catch"](11);
        _utils_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.error('Error initializing diff viewer:', _context.t1);
        viewerElement = document.querySelector(_constants_Selectors__WEBPACK_IMPORTED_MODULE_7__["default"].DIFF.VIEWER);
        if (viewerElement) {
          // Use AlertManager for error display
          alertManager = _utils_AlertManager__WEBPACK_IMPORTED_MODULE_12__["default"].getInstance(); // Get error message from translations if possible
          errorTitle = translationManager.get('errorLoadingDiff', 'Error loading diff');
          errorMessage = "\n                <h4>".concat(errorTitle, "</h4>\n                <p>").concat(_context.t1 instanceof Error ? _context.t1.message : String(_context.t1), "</p>\n            ");
          alertElement = alertManager.showError(errorMessage, {
            timeout: 0,
            // Don't auto-dismiss
            translate: false,
            // Message is already prepared with translations
            className: 'vdm-w-100' // Make alert fill the container width
          }); // Clear the viewer and add the alert

          viewerElement.innerHTML = '';
          viewerElement.appendChild(alertElement);
          viewerElement.style.display = 'flex';
        }

        // Always hide the loader on error
        loaderManager.hideMainLoader(mainLoaderId);
      case 123:
      case "end":
        return _context.stop();
    }
  }, _callee, null, [[11, 117], [19, 28]]);
}));

// Explicitly export the BrowserUIManager to the global window object
// This ensures it's available to external scripts like file-browser.js
window.BrowserUIManager = _components_viewer_BrowserUIManager__WEBPACK_IMPORTED_MODULE_8__.BrowserUIManager;

// Export the LoaderManager to the global window object so it can be used
// by components before the main app initializes
window.LoaderManager = _utils_LoaderManager__WEBPACK_IMPORTED_MODULE_10__.LoaderManager;

// Make TranslationManager available globally
window.TranslationManager = _utils_TranslationManager__WEBPACK_IMPORTED_MODULE_11__.TranslationManager;

// Make AlertManager available globally
window.AlertManager = _utils_AlertManager__WEBPACK_IMPORTED_MODULE_12__["default"];

// Make DiffConfigManager available globally
window.DiffConfigManager = _utils_DiffConfigManager__WEBPACK_IMPORTED_MODULE_13__.DiffConfigManager;

// Export components for module bundlers


/***/ })

}]);
//# sourceMappingURL=diff-viewer-src_index_js-2dec6e20.js.map