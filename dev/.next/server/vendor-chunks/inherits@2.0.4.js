/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/inherits@2.0.4";
exports.ids = ["vendor-chunks/inherits@2.0.4"];
exports.modules = {

/***/ "(rsc)/../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits.js":
/*!******************************************************************************!*\
  !*** ../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("try {\n  var util = __webpack_require__(/*! util */ \"util\");\n  /* istanbul ignore next */\n  if (typeof util.inherits !== 'function') throw '';\n  module.exports = util.inherits;\n} catch (e) {\n  /* istanbul ignore next */\n  module.exports = __webpack_require__(/*! ./inherits_browser.js */ \"(rsc)/../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js\");\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2luaGVyaXRzQDIuMC40L25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0cy5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBLGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFLHlKQUFpRDtBQUNuRCIsInNvdXJjZXMiOlsiL2hvbWUvcGF1bC9wcm9qZWN0cy9wYXlsb2FkL3BsdWdpbi1kZXZlbG9wbWVudC9iZXR0ZXItZmllbGRzL2dpdHJvb3Qvbm9kZV9tb2R1bGVzLy5wbnBtL2luaGVyaXRzQDIuMC40L25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ0cnkge1xuICB2YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKHR5cGVvZiB1dGlsLmluaGVyaXRzICE9PSAnZnVuY3Rpb24nKSB0aHJvdyAnJztcbiAgbW9kdWxlLmV4cG9ydHMgPSB1dGlsLmluaGVyaXRzO1xufSBjYXRjaCAoZSkge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaW5oZXJpdHNfYnJvd3Nlci5qcycpO1xufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits.js\n");

/***/ }),

/***/ "(rsc)/../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js":
/*!**************************************************************************************!*\
  !*** ../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js ***!
  \**************************************************************************************/
/***/ ((module) => {

eval("if (typeof Object.create === 'function') {\n  // implementation from standard node.js 'util' module\n  module.exports = function inherits(ctor, superCtor) {\n    if (superCtor) {\n      ctor.super_ = superCtor\n      ctor.prototype = Object.create(superCtor.prototype, {\n        constructor: {\n          value: ctor,\n          enumerable: false,\n          writable: true,\n          configurable: true\n        }\n      })\n    }\n  };\n} else {\n  // old school shim for old browsers\n  module.exports = function inherits(ctor, superCtor) {\n    if (superCtor) {\n      ctor.super_ = superCtor\n      var TempCtor = function () {}\n      TempCtor.prototype = superCtor.prototype\n      ctor.prototype = new TempCtor()\n      ctor.prototype.constructor = ctor\n    }\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2luaGVyaXRzQDIuMC40L25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIi9ob21lL3BhdWwvcHJvamVjdHMvcGF5bG9hZC9wbHVnaW4tZGV2ZWxvcG1lbnQvYmV0dGVyLWZpZWxkcy9naXRyb290L25vZGVfbW9kdWxlcy8ucG5wbS9pbmhlcml0c0AyLjAuNC9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBpZiAoc3VwZXJDdG9yKSB7XG4gICAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGlmIChzdXBlckN0b3IpIHtcbiAgICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js\n");

/***/ })

};
;