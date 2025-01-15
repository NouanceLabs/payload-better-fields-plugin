/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/wrappy@1.0.2";
exports.ids = ["vendor-chunks/wrappy@1.0.2"];
exports.modules = {

/***/ "(rsc)/../node_modules/.pnpm/wrappy@1.0.2/node_modules/wrappy/wrappy.js":
/*!************************************************************************!*\
  !*** ../node_modules/.pnpm/wrappy@1.0.2/node_modules/wrappy/wrappy.js ***!
  \************************************************************************/
/***/ ((module) => {

eval("// Returns a wrapper function that returns a wrapped callback\n// The wrapper function should do some stuff, and return a\n// presumably different callback function.\n// This makes sure that own properties are retained, so that\n// decorations and such are not lost along the way.\nmodule.exports = wrappy\nfunction wrappy (fn, cb) {\n  if (fn && cb) return wrappy(fn)(cb)\n\n  if (typeof fn !== 'function')\n    throw new TypeError('need wrapper function')\n\n  Object.keys(fn).forEach(function (k) {\n    wrapper[k] = fn[k]\n  })\n\n  return wrapper\n\n  function wrapper() {\n    var args = new Array(arguments.length)\n    for (var i = 0; i < args.length; i++) {\n      args[i] = arguments[i]\n    }\n    var ret = fn.apply(this, args)\n    var cb = args[args.length-1]\n    if (typeof ret === 'function' && ret !== cb) {\n      Object.keys(cb).forEach(function (k) {\n        ret[k] = cb[k]\n      })\n    }\n    return ret\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3dyYXBweUAxLjAuMi9ub2RlX21vZHVsZXMvd3JhcHB5L3dyYXBweS5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixpQkFBaUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIi9ob21lL3BhdWwvcHJvamVjdHMvcGF5bG9hZC9wbHVnaW4tZGV2ZWxvcG1lbnQvYmV0dGVyLWZpZWxkcy9naXRyb290L25vZGVfbW9kdWxlcy8ucG5wbS93cmFwcHlAMS4wLjIvbm9kZV9tb2R1bGVzL3dyYXBweS93cmFwcHkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gUmV0dXJucyBhIHdyYXBwZXIgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgd3JhcHBlZCBjYWxsYmFja1xuLy8gVGhlIHdyYXBwZXIgZnVuY3Rpb24gc2hvdWxkIGRvIHNvbWUgc3R1ZmYsIGFuZCByZXR1cm4gYVxuLy8gcHJlc3VtYWJseSBkaWZmZXJlbnQgY2FsbGJhY2sgZnVuY3Rpb24uXG4vLyBUaGlzIG1ha2VzIHN1cmUgdGhhdCBvd24gcHJvcGVydGllcyBhcmUgcmV0YWluZWQsIHNvIHRoYXRcbi8vIGRlY29yYXRpb25zIGFuZCBzdWNoIGFyZSBub3QgbG9zdCBhbG9uZyB0aGUgd2F5LlxubW9kdWxlLmV4cG9ydHMgPSB3cmFwcHlcbmZ1bmN0aW9uIHdyYXBweSAoZm4sIGNiKSB7XG4gIGlmIChmbiAmJiBjYikgcmV0dXJuIHdyYXBweShmbikoY2IpXG5cbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJylcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCduZWVkIHdyYXBwZXIgZnVuY3Rpb24nKVxuXG4gIE9iamVjdC5rZXlzKGZuKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgd3JhcHBlcltrXSA9IGZuW2tdXG4gIH0pXG5cbiAgcmV0dXJuIHdyYXBwZXJcblxuICBmdW5jdGlvbiB3cmFwcGVyKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldXG4gICAgfVxuICAgIHZhciByZXQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKVxuICAgIHZhciBjYiA9IGFyZ3NbYXJncy5sZW5ndGgtMV1cbiAgICBpZiAodHlwZW9mIHJldCA9PT0gJ2Z1bmN0aW9uJyAmJiByZXQgIT09IGNiKSB7XG4gICAgICBPYmplY3Qua2V5cyhjYikuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICByZXRba10gPSBjYltrXVxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHJldFxuICB9XG59XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/../node_modules/.pnpm/wrappy@1.0.2/node_modules/wrappy/wrappy.js\n");

/***/ })

};
;