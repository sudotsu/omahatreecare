/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _vercel_analytics_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vercel/analytics/react */ \"@vercel/analytics/react\");\n/* harmony import */ var _vercel_speed_insights_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vercel/speed-insights/next */ \"@vercel/speed-insights/next\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _src_index_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../src/index.css */ \"./src/index.css\");\n/* harmony import */ var _src_index_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_src_index_css__WEBPACK_IMPORTED_MODULE_5__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_vercel_analytics_react__WEBPACK_IMPORTED_MODULE_1__, _vercel_speed_insights_next__WEBPACK_IMPORTED_MODULE_2__]);\n([_vercel_analytics_react__WEBPACK_IMPORTED_MODULE_1__, _vercel_speed_insights_next__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n/**\r\n * Next.js App Component\r\n * Adapted from src/main.jsx.backup (Vite React SSG setup)\r\n *\r\n * Key migrations:\r\n * - Vercel Analytics: @vercel/analytics/react (same as Vite)\r\n * - Speed Insights: @vercel/speed-insights/next (Next.js specific)\r\n * - Global styles: imported from src/index.css\r\n * - Dark mode script: moved to _document.tsx\r\n */ function App({ Component, pageProps }) {\n    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{\n        // Dark mode initialization (client-side)\n        // This runs after hydration to prevent flash\n        try {\n            const savedMode = localStorage.getItem(\"darkMode\");\n            const prefersDark = window.matchMedia(\"(prefers-color-scheme: dark)\").matches;\n            if (savedMode === \"true\" || savedMode === null && prefersDark) {\n                document.documentElement.classList.add(\"dark\");\n            } else {\n                document.documentElement.classList.remove(\"dark\");\n            }\n        } catch (e) {\n            console.error(\"Dark mode initialization failed:\", e);\n        }\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_3___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"viewport\",\n                        content: \"width=device-width, initial-scale=1.0\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\MSi\\\\.claude-worktrees\\\\omahatreecare\\\\condescending-brattain\\\\pages\\\\_app.tsx\",\n                        lineNumber: 40,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        href: \"/images/favicon.ico\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\MSi\\\\.claude-worktrees\\\\omahatreecare\\\\condescending-brattain\\\\pages\\\\_app.tsx\",\n                        lineNumber: 41,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\MSi\\\\.claude-worktrees\\\\omahatreecare\\\\condescending-brattain\\\\pages\\\\_app.tsx\",\n                lineNumber: 38,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\MSi\\\\.claude-worktrees\\\\omahatreecare\\\\condescending-brattain\\\\pages\\\\_app.tsx\",\n                lineNumber: 44,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_vercel_analytics_react__WEBPACK_IMPORTED_MODULE_1__.Analytics, {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\MSi\\\\.claude-worktrees\\\\omahatreecare\\\\condescending-brattain\\\\pages\\\\_app.tsx\",\n                lineNumber: 47,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_vercel_speed_insights_next__WEBPACK_IMPORTED_MODULE_2__.SpeedInsights, {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\MSi\\\\.claude-worktrees\\\\omahatreecare\\\\condescending-brattain\\\\pages\\\\_app.tsx\",\n                lineNumber: 50,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7QUFDUTtBQUUvQjtBQUNLO0FBQ1I7QUFFekI7Ozs7Ozs7OztDQVNDLEdBRWMsU0FBU0ksSUFBSSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBWTtJQUM1REgsZ0RBQVNBLENBQUM7UUFDUix5Q0FBeUM7UUFDekMsNkNBQTZDO1FBQzdDLElBQUk7WUFDRixNQUFNSSxZQUFZQyxhQUFhQyxPQUFPLENBQUM7WUFDdkMsTUFBTUMsY0FBY0MsT0FBT0MsVUFBVSxDQUFDLGdDQUFnQ0MsT0FBTztZQUM3RSxJQUFJTixjQUFjLFVBQVdBLGNBQWMsUUFBUUcsYUFBYztnQkFDL0RJLFNBQVNDLGVBQWUsQ0FBQ0MsU0FBUyxDQUFDQyxHQUFHLENBQUM7WUFDekMsT0FBTztnQkFDTEgsU0FBU0MsZUFBZSxDQUFDQyxTQUFTLENBQUNFLE1BQU0sQ0FBQztZQUM1QztRQUNGLEVBQUUsT0FBT0MsR0FBRztZQUNWQyxRQUFRQyxLQUFLLENBQUMsb0NBQW9DRjtRQUNwRDtJQUNGLEdBQUcsRUFBRTtJQUVMLHFCQUNFOzswQkFDRSw4REFBQ2pCLGtEQUFJQTs7a0NBRUgsOERBQUNvQjt3QkFBS0MsTUFBSzt3QkFBV0MsU0FBUTs7Ozs7O2tDQUM5Qiw4REFBQ0M7d0JBQUtDLEtBQUk7d0JBQU9DLE1BQUs7Ozs7Ozs7Ozs7OzswQkFHeEIsOERBQUN0QjtnQkFBVyxHQUFHQyxTQUFTOzs7Ozs7MEJBR3hCLDhEQUFDTiw4REFBU0E7Ozs7OzBCQUdWLDhEQUFDQyxzRUFBYUE7Ozs7Ozs7QUFHcEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vbWFoYXRyZWVjYXJlLy4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmFseXRpY3MgfSBmcm9tICdAdmVyY2VsL2FuYWx5dGljcy9yZWFjdCdcclxuaW1wb3J0IHsgU3BlZWRJbnNpZ2h0cyB9IGZyb20gJ0B2ZXJjZWwvc3BlZWQtaW5zaWdodHMvbmV4dCdcclxuaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJ1xyXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXHJcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgJy4uL3NyYy9pbmRleC5jc3MnXHJcblxyXG4vKipcclxuICogTmV4dC5qcyBBcHAgQ29tcG9uZW50XHJcbiAqIEFkYXB0ZWQgZnJvbSBzcmMvbWFpbi5qc3guYmFja3VwIChWaXRlIFJlYWN0IFNTRyBzZXR1cClcclxuICpcclxuICogS2V5IG1pZ3JhdGlvbnM6XHJcbiAqIC0gVmVyY2VsIEFuYWx5dGljczogQHZlcmNlbC9hbmFseXRpY3MvcmVhY3QgKHNhbWUgYXMgVml0ZSlcclxuICogLSBTcGVlZCBJbnNpZ2h0czogQHZlcmNlbC9zcGVlZC1pbnNpZ2h0cy9uZXh0IChOZXh0LmpzIHNwZWNpZmljKVxyXG4gKiAtIEdsb2JhbCBzdHlsZXM6IGltcG9ydGVkIGZyb20gc3JjL2luZGV4LmNzc1xyXG4gKiAtIERhcmsgbW9kZSBzY3JpcHQ6IG1vdmVkIHRvIF9kb2N1bWVudC50c3hcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAvLyBEYXJrIG1vZGUgaW5pdGlhbGl6YXRpb24gKGNsaWVudC1zaWRlKVxyXG4gICAgLy8gVGhpcyBydW5zIGFmdGVyIGh5ZHJhdGlvbiB0byBwcmV2ZW50IGZsYXNoXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBzYXZlZE1vZGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGFya01vZGUnKVxyXG4gICAgICBjb25zdCBwcmVmZXJzRGFyayA9IHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlc1xyXG4gICAgICBpZiAoc2F2ZWRNb2RlID09PSAndHJ1ZScgfHwgKHNhdmVkTW9kZSA9PT0gbnVsbCAmJiBwcmVmZXJzRGFyaykpIHtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGFyaycpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RhcmsnKVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhcmsgbW9kZSBpbml0aWFsaXphdGlvbiBmYWlsZWQ6JywgZSlcclxuICAgIH1cclxuICB9LCBbXSlcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxIZWFkPlxyXG4gICAgICAgIHsvKiBEZWZhdWx0IG1ldGEgdGFncyAtIGNhbiBiZSBvdmVycmlkZGVuIHBlciBwYWdlICovfVxyXG4gICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wXCIgLz5cclxuICAgICAgICA8bGluayByZWw9XCJpY29uXCIgaHJlZj1cIi9pbWFnZXMvZmF2aWNvbi5pY29cIiAvPlxyXG4gICAgICA8L0hlYWQ+XHJcblxyXG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcblxyXG4gICAgICB7LyogVmVyY2VsIEFuYWx5dGljcyAtIHNhbWUgYXMgVml0ZSBzZXR1cCAqL31cclxuICAgICAgPEFuYWx5dGljcyAvPlxyXG5cclxuICAgICAgey8qIFNwZWVkIEluc2lnaHRzIC0gTmV4dC5qcyBzcGVjaWZpYyBwYWNrYWdlICovfVxyXG4gICAgICA8U3BlZWRJbnNpZ2h0cyAvPlxyXG4gICAgPC8+XHJcbiAgKVxyXG59XHJcbiJdLCJuYW1lcyI6WyJBbmFseXRpY3MiLCJTcGVlZEluc2lnaHRzIiwiSGVhZCIsInVzZUVmZmVjdCIsIkFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInNhdmVkTW9kZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwcmVmZXJzRGFyayIsIndpbmRvdyIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJlIiwiY29uc29sZSIsImVycm9yIiwibWV0YSIsIm5hbWUiLCJjb250ZW50IiwibGluayIsInJlbCIsImhyZWYiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ (() => {



/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "@vercel/analytics/react":
/*!******************************************!*\
  !*** external "@vercel/analytics/react" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@vercel/analytics/react");;

/***/ }),

/***/ "@vercel/speed-insights/next":
/*!**********************************************!*\
  !*** external "@vercel/speed-insights/next" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@vercel/speed-insights/next");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();