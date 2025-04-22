"use strict";
(this["webpackChunkdiff_files"] = this["webpackChunkdiff_files"] || []).push([["diff-viewer-src_c"],{

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

/***/ "./src/data/highlightjs-languages.json":
/*!*********************************************!*\
  !*** ./src/data/highlightjs-languages.json ***!
  \*********************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"1c":"1c","abnf":"abnf","accesslog":"accesslog","actionscript-file":"actionscript","adb":"ada","ads":"ada","angelscript":"angelscript","as":"angelscript","apacheconf":"apache","htaccess":"apache","applescript":"applescript","arcade":"arcade","ino":"arduino","arm":"armasm","adoc":"asciidoc","aspectj":"aspectj","ahk":"autohotkey","au3":"autoit","asm":"x86asm","awk":"awk","ax":"axapta","sh":"bash","bash":"bash","zsh":"bash","bas":"basic","bnf":"bnf","bf":"brainfuck","c":"c","h":"c","cal":"cal","capnp":"capnproto","ceylon":"ceylon","icl":"clean","dcl":"clean","clj":"clojure","cljs":"clojure","cmake":"cmake","cmakein":"cmake","coffee":"coffeescript","coq":"coq","cos":"cos","cls":"cos","cpp":"cpp","cc":"cpp","cplus":"cpp","hplus":"cpp","hpp":"cpp","hh":"cpp","hxx":"cpp","cxx":"cpp","crm":"crmsh","cr":"crystal","cs":"csharp","csx":"csharp","csp":"csp","css":"css","d":"d","dart":"dart","dpr":"delphi","dfm":"delphi","pas":"delphi","pascal":"delphi","diff":"diff","patch":"diff","django":"django","jinja":"django","dns":"dns","zone":"dns","bind":"dns","dockerfile":"dockerfile","docker":"dockerfile","bat":"dos","cmd":"dos","dts":"dts","dust":"dust","dst":"dust","ebnf":"ebnf","ex":"elixir","exs":"elixir","elm":"elm","erb":"erb","erl":"erlang","hrl":"erlang","xlsx":"excel","xls":"excel","fix":"fix","flix":"flix","f":"fortran","for":"fortran","f90":"fortran","f95":"fortran","fs":"fsharp","fsi":"fsharp","fsx":"fsharp","gms":"gams","gss":"gauss","gcode":"gcode","nc":"gcode","feature":"gherkin","glsl":"glsl","vert":"glsl","frag":"glsl","gml":"gml","go":"go","golo":"golo","gradle":"gradle","graphql":"graphql","gql":"graphql","groovy":"groovy","haml":"haml","handlebars":"handlebars","hbs":"handlebars","hs":"haskell","hx":"haxe","hsp":"hsp","http":"http","https":"http","hy":"hy","i7":"inform7","ini":"ini","toml":"ini","editorconfig":"ini","gitconfig":"ini","irpf90":"irpf90","isbl":"isbl","java":"java","js":"javascript","mjs":"javascript","cli":"jboss-cli","json":"json","jl":"julia","kt":"kotlin","kts":"kotlin","lasso":"lasso","lassoscript":"lasso","tex":"latex","latex":"latex","ldif":"ldif","leaf":"leaf","less":"less","lisp":"lisp","cl":"lisp","el":"lisp","lc":"livecodeserver","ls":"livescript","ll":"llvm","lsl":"lsl","lua":"lua","mk":"makefile","mak":"makefile","make":"makefile","md":"markdown","mkdown":"markdown","mkd":"markdown","mathematica":"mathematica","mma":"mathematica","wl":"mathematica","matlab":"matlab","m":"matlab","maxima":"maxima","mel":"mel","mercury":"mercury","mips":"mipsasm","mizar":"mizar","mojolicious":"mojolicious","monkey":"monkey","moon":"moonscript","n1ql":"n1ql","nt":"nestedtext","nginx":"nginx","nginxconf":"nginx","nim":"nim","nix":"nix","nsi":"nsis","nsh":"nsis","mm":"objectivec","ml":"ocaml","scad":"openscad","oxygene":"oxygene","parser3":"parser3","pl":"perl","pm":"perl","perl":"perl","pf":"pf","pfconf":"pf","pgsql":"pgsql","postgres":"pgsql","postgresql":"pgsql","php":"php","php3":"php","php4":"php","php5":"php","php7":"php","phps":"php","phtml":"php-template","txt":"plaintext","text":"plaintext","pony":"pony","ps1":"powershell","psm1":"powershell","psd1":"powershell","pde":"processing","profile":"profile","prolog":"prolog","plg":"prolog","properties":"properties","prop":"properties","proto":"protobuf","pp":"puppet","pb":"purebasic","pbi":"purebasic","py":"python","pyw":"python","pyc":"python","pyd":"python","pyo":"python","q":"q","qml":"qml","r":"r","rsource":"r","re":"reasonml","rei":"reasonml","rib":"rib","roboconf":"roboconf","routeros":"routeros","mikrotik":"routeros","rsl":"rsl","rb":"ruby","ruby":"ruby","gemspec":"ruby","podspec":"ruby","thor":"ruby","irb":"ruby","rs":"rust","rust":"rust","sas":"sas","scala":"scala","sc":"scala","scm":"scheme","ss":"scheme","sci":"scilab","sce":"scilab","scss":"scss","shellscript":"shell","fish":"shell","smali":"smali","st":"smalltalk","sml":"sml","sqf":"sqf","sql":"sql","stan":"stan","ado":"stata","do":"stata","p21":"step21","step":"step21","stp":"step21","styl":"stylus","subunit":"subunit","swift":"swift","taggerscript":"taggerscript","tap":"tap","tcl":"tcl","tk":"tcl","thrift":"thrift","tp":"tp","twig":"twig","ts":"typescript","tsx":"typescript","vala":"vala","vb":"vbnet","vbs":"vbscript","v":"verilog","sv":"verilog","svh":"verilog","vhd":"vhdl","vhdl":"vhdl","vim":"vim","wasm":"wasm","wren":"wren","nasm":"x86asm","xl":"xl","tao":"xl","xml":"xml","xhtml":"xml","rss":"xml","atom":"xml","xjb":"xml","xsd":"xml","xsl":"xml","plist":"xml","svg":"xml","html":"xml","htm":"xml","xq":"xquery","xquery":"xquery","yml":"yaml","yaml":"yaml"}');

/***/ }),

/***/ "./src/data/highlightjs-themes.json":
/*!******************************************!*\
  !*** ./src/data/highlightjs-themes.json ***!
  \******************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"a11y":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/a11y-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/a11y-light.min.css"},"atom-one":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/atom-one-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/atom-one-light.min.css"},"gradient":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/gradient-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/gradient-light.min.css"},"isbl-editor":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/isbl-editor-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/isbl-editor-light.min.css"},"kimbie":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/kimbie-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/kimbie-light.min.css"},"nnfx":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/nnfx-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/nnfx-light.min.css"},"panda-syntax":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/panda-syntax-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/panda-syntax-light.min.css"},"paraiso":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/paraiso-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/paraiso-light.min.css"},"qtcreator":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/qtcreator-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/qtcreator-light.min.css"},"stackoverflow":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/stackoverflow-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/stackoverflow-light.min.css"},"tokyo-night":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/tokyo-night-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/tokyo-night-light.min.css"},"rose-pine":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/rose-pine-moon.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/rose-pine-dawn.min.css"},"atelier-cave":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/atelier-cave.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/atelier-cave-light.min.css"},"atelier-dune":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/atelier-dune.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/atelier-dune-light.min.css"},"atelier-estuary":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/atelier-estuary.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/atelier-estuary-light.min.css"},"atelier-forest":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/atelier-forest.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/atelier-forest-light.min.css"},"atelier-heath":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/atelier-heath.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/atelier-heath-light.min.css"},"atelier-lakeside":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/atelier-lakeside.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/atelier-lakeside-light.min.css"},"atelier-plateau":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/atelier-plateau.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/atelier-plateau-light.min.css"},"atelier-savanna":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/atelier-savanna.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/atelier-savanna-light.min.css"},"atelier-seaside":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/atelier-seaside.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/atelier-seaside-light.min.css"},"atelier-sulphurpool":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/atelier-sulphurpool.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/atelier-sulphurpool-light.min.css"},"brush-trees":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/brush-trees-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/brush-trees.min.css"},"classic":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/classic-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/classic-light.min.css"},"default-base16":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/default-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/default-light.min.css"},"edge":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/edge-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/edge-light.min.css"},"equilibrium":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/equilibrium-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/equilibrium-light.min.css"},"equilibrium-gray":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/equilibrium-gray-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/equilibrium-gray-light.min.css"},"eva":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/eva-dim.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/eva.min.css"},"google":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/google-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/google-light.min.css"},"grayscale-base16":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/grayscale-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/grayscale-light.min.css"},"gruvbox-hard":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/gruvbox-dark-hard.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/gruvbox-light-hard.min.css"},"gruvbox-medium":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/gruvbox-dark-medium.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/gruvbox-light-medium.min.css"},"gruvbox-soft":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/gruvbox-dark-soft.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/gruvbox-light-soft.min.css"},"harmonic16":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/harmonic16-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/harmonic16-light.min.css"},"heetch":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/heetch-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/heetch-light.min.css"},"horizon":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/horizon-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/horizon-light.min.css"},"humanoid":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/humanoid-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/humanoid-light.min.css"},"ia":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/ia-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/ia-light.min.css"},"material":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/material-darker.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/material-lighter.min.css"},"one":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/onedark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/one-light.min.css"},"papercolor":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/papercolor-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/papercolor-light.min.css"},"solar-flare":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/solar-flare.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/solar-flare-light.min.css"},"solarized":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/solarized-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/solarized-light.min.css"},"summerfruit":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/summerfruit-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/summerfruit-light.min.css"},"synth-midnight-terminal":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/synth-midnight-terminal-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/synth-midnight-terminal-light.min.css"},"tomorrow":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/tomorrow-night.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/tomorrow.min.css"},"unikitty":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/unikitty-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/unikitty-light.min.css"},"windows-10":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/windows-10.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/windows-10-light.min.css"},"windows-95":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/windows-95.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/windows-95-light.min.css"},"windows-high-contrast":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/windows-high-contrast.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/windows-high-contrast-light.min.css"},"windows-nt":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/windows-nt.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/windows-nt-light.min.css"},"ros-pine-base16":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/ros-pine-moon.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/ros-pine-dawn.min.css"},"silk":{"dark":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/silk-dark.min.css","light":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/silk-light.min.css"}}');

/***/ })

}]);
//# sourceMappingURL=diff-viewer-src_c.js.map