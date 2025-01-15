"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@emotion+weak-memoize@0.4.0";
exports.ids = ["vendor-chunks/@emotion+weak-memoize@0.4.0"];
exports.modules = {

/***/ "(ssr)/../node_modules/.pnpm/@emotion+weak-memoize@0.4.0/node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js":
/*!*****************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@emotion+weak-memoize@0.4.0/node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ weakMemoize)\n/* harmony export */ });\nvar weakMemoize = function weakMemoize(func) {\n  var cache = new WeakMap();\n  return function (arg) {\n    if (cache.has(arg)) {\n      // Use non-null assertion because we just checked that the cache `has` it\n      // This allows us to remove `undefined` from the return value\n      return cache.get(arg);\n    }\n\n    var ret = func(arg);\n    cache.set(arg, ret);\n    return ret;\n  };\n};\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BlbW90aW9uK3dlYWstbWVtb2l6ZUAwLjQuMC9ub2RlX21vZHVsZXMvQGVtb3Rpb24vd2Vhay1tZW1vaXplL2Rpc3QvZW1vdGlvbi13ZWFrLW1lbW9pemUuZXNtLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWtDIiwic291cmNlcyI6WyIvaG9tZS9wYXVsL3Byb2plY3RzL3BheWxvYWQvcGx1Z2luLWRldmVsb3BtZW50L2JldHRlci1maWVsZHMvZ2l0cm9vdC9ub2RlX21vZHVsZXMvLnBucG0vQGVtb3Rpb24rd2Vhay1tZW1vaXplQDAuNC4wL25vZGVfbW9kdWxlcy9AZW1vdGlvbi93ZWFrLW1lbW9pemUvZGlzdC9lbW90aW9uLXdlYWstbWVtb2l6ZS5lc20uanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIHdlYWtNZW1vaXplID0gZnVuY3Rpb24gd2Vha01lbW9pemUoZnVuYykge1xuICB2YXIgY2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuICByZXR1cm4gZnVuY3Rpb24gKGFyZykge1xuICAgIGlmIChjYWNoZS5oYXMoYXJnKSkge1xuICAgICAgLy8gVXNlIG5vbi1udWxsIGFzc2VydGlvbiBiZWNhdXNlIHdlIGp1c3QgY2hlY2tlZCB0aGF0IHRoZSBjYWNoZSBgaGFzYCBpdFxuICAgICAgLy8gVGhpcyBhbGxvd3MgdXMgdG8gcmVtb3ZlIGB1bmRlZmluZWRgIGZyb20gdGhlIHJldHVybiB2YWx1ZVxuICAgICAgcmV0dXJuIGNhY2hlLmdldChhcmcpO1xuICAgIH1cblxuICAgIHZhciByZXQgPSBmdW5jKGFyZyk7XG4gICAgY2FjaGUuc2V0KGFyZywgcmV0KTtcbiAgICByZXR1cm4gcmV0O1xuICB9O1xufTtcblxuZXhwb3J0IHsgd2Vha01lbW9pemUgYXMgZGVmYXVsdCB9O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/../node_modules/.pnpm/@emotion+weak-memoize@0.4.0/node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js\n");

/***/ })

};
;