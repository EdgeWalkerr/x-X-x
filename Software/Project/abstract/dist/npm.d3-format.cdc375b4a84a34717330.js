(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.d3-format"],{

/***/ "2TPD":
/*!*******************************************************!*\
  !*** ./node_modules/d3-format/src/precisionPrefix.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _exponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exponent.js */ \"p/1U\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(step, value) {\n  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Object(_exponent_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(value) / 3))) * 3 - Object(_exponent_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Math.abs(step)));\n});\n\n\n//# sourceURL=webpack:///./node_modules/d3-format/src/precisionPrefix.js?");

/***/ }),

/***/ "2Ynt":
/*!******************************************************!*\
  !*** ./node_modules/d3-format/src/precisionRound.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _exponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exponent.js */ \"p/1U\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(step, max) {\n  step = Math.abs(step), max = Math.abs(max) - step;\n  return Math.max(0, Object(_exponent_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(max) - Object(_exponent_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(step)) + 1;\n});\n\n\n//# sourceURL=webpack:///./node_modules/d3-format/src/precisionRound.js?");

/***/ }),

/***/ "2tFh":
/*!******************************************************!*\
  !*** ./node_modules/d3-format/src/precisionFixed.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _exponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exponent.js */ \"p/1U\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(step) {\n  return Math.max(0, -Object(_exponent_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Math.abs(step)));\n});\n\n\n//# sourceURL=webpack:///./node_modules/d3-format/src/precisionFixed.js?");

/***/ }),

/***/ "AUoe":
/*!******************************************************!*\
  !*** ./node_modules/d3-format/src/formatNumerals.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(numerals) {\n  return function(value) {\n    return value.replace(/[0-9]/g, function(i) {\n      return numerals[+i];\n    });\n  };\n});\n\n\n//# sourceURL=webpack:///./node_modules/d3-format/src/formatNumerals.js?");

/***/ }),

/***/ "CbjS":
/*!*******************************************************!*\
  !*** ./node_modules/d3-format/src/formatSpecifier.js ***!
  \*******************************************************/
/*! exports provided: default, FormatSpecifier */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return formatSpecifier; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FormatSpecifier\", function() { return FormatSpecifier; });\n// [[fill]align][sign][symbol][0][width][,][.precision][~][type]\nvar re = /^(?:(.)?([<>=^]))?([+\\-( ])?([$#])?(0)?(\\d+)?(,)?(\\.\\d+)?(~)?([a-z%])?$/i;\n\nfunction formatSpecifier(specifier) {\n  if (!(match = re.exec(specifier))) throw new Error(\"invalid format: \" + specifier);\n  var match;\n  return new FormatSpecifier({\n    fill: match[1],\n    align: match[2],\n    sign: match[3],\n    symbol: match[4],\n    zero: match[5],\n    width: match[6],\n    comma: match[7],\n    precision: match[8] && match[8].slice(1),\n    trim: match[9],\n    type: match[10]\n  });\n}\n\nformatSpecifier.prototype = FormatSpecifier.prototype; // instanceof\n\nfunction FormatSpecifier(specifier) {\n  this.fill = specifier.fill === undefined ? \" \" : specifier.fill + \"\";\n  this.align = specifier.align === undefined ? \">\" : specifier.align + \"\";\n  this.sign = specifier.sign === undefined ? \"-\" : specifier.sign + \"\";\n  this.symbol = specifier.symbol === undefined ? \"\" : specifier.symbol + \"\";\n  this.zero = !!specifier.zero;\n  this.width = specifier.width === undefined ? undefined : +specifier.width;\n  this.comma = !!specifier.comma;\n  this.precision = specifier.precision === undefined ? undefined : +specifier.precision;\n  this.trim = !!specifier.trim;\n  this.type = specifier.type === undefined ? \"\" : specifier.type + \"\";\n}\n\nFormatSpecifier.prototype.toString = function() {\n  return this.fill\n      + this.align\n      + this.sign\n      + this.symbol\n      + (this.zero ? \"0\" : \"\")\n      + (this.width === undefined ? \"\" : Math.max(1, this.width | 0))\n      + (this.comma ? \",\" : \"\")\n      + (this.precision === undefined ? \"\" : \".\" + Math.max(0, this.precision | 0))\n      + (this.trim ? \"~\" : \"\")\n      + this.type;\n};\n\n\n//# sourceURL=webpack:///./node_modules/d3-format/src/formatSpecifier.js?");

/***/ }),

/***/ "EUnC":
/*!************************************************!*\
  !*** ./node_modules/d3-format/src/identity.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(x) {\n  return x;\n});\n\n\n//# sourceURL=webpack:///./node_modules/d3-format/src/identity.js?");

/***/ }),

/***/ "EjHT":
/*!*****************************************************!*\
  !*** ./node_modules/d3-format/src/defaultLocale.js ***!
  \*****************************************************/
/*! exports provided: format, formatPrefix, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"format\", function() { return format; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formatPrefix\", function() { return formatPrefix; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return defaultLocale; });\n/* harmony import */ var _locale_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./locale.js */ \"sXBl\");\n\n\nvar locale;\nvar format;\nvar formatPrefix;\n\ndefaultLocale({\n  decimal: \".\",\n  thousands: \",\",\n  grouping: [3],\n  currency: [\"$\", \"\"],\n  minus: \"-\"\n});\n\nfunction defaultLocale(definition) {\n  locale = Object(_locale_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(definition);\n  format = locale.format;\n  formatPrefix = locale.formatPrefix;\n  return locale;\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-format/src/defaultLocale.js?");

/***/ }),

/***/ "P3jZ":
/*!*****************************************************!*\
  !*** ./node_modules/d3-format/src/formatRounded.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _formatDecimal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatDecimal.js */ \"qnQu\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(x, p) {\n  var d = Object(_formatDecimal_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(x, p);\n  if (!d) return x + \"\";\n  var coefficient = d[0],\n      exponent = d[1];\n  return exponent < 0 ? \"0.\" + new Array(-exponent).join(\"0\") + coefficient\n      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + \".\" + coefficient.slice(exponent + 1)\n      : coefficient + new Array(exponent - coefficient.length + 2).join(\"0\");\n});\n\n\n//# sourceURL=webpack:///./node_modules/d3-format/src/formatRounded.js?");

/***/ }),

/***/ "kds9":
/*!**************************************************!*\
  !*** ./node_modules/d3-format/src/formatTrim.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(s) {\n  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {\n    switch (s[i]) {\n      case \".\": i0 = i1 = i; break;\n      case \"0\": if (i0 === 0) i0 = i; i1 = i; break;\n      default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;\n    }\n  }\n  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;\n});\n\n\n//# sourceURL=webpack:///./node_modules/d3-format/src/formatTrim.js?");

/***/ }),

/***/ "mHFb":
/*!***************************************************!*\
  !*** ./node_modules/d3-format/src/formatGroup.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(grouping, thousands) {\n  return function(value, width) {\n    var i = value.length,\n        t = [],\n        j = 0,\n        g = grouping[0],\n        length = 0;\n\n    while (i > 0 && g > 0) {\n      if (length + g + 1 > width) g = Math.max(1, width - length);\n      t.push(value.substring(i -= g, i + g));\n      if ((length += g + 1) > width) break;\n      g = grouping[j = (j + 1) % grouping.length];\n    }\n\n    return t.reverse().join(thousands);\n  };\n});\n\n\n//# sourceURL=webpack:///./node_modules/d3-format/src/formatGroup.js?");

/***/ }),

/***/ "p/1U":
/*!************************************************!*\
  !*** ./node_modules/d3-format/src/exponent.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _formatDecimal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatDecimal.js */ \"qnQu\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(x) {\n  return x = Object(_formatDecimal_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Math.abs(x)), x ? x[1] : NaN;\n});\n\n\n//# sourceURL=webpack:///./node_modules/d3-format/src/exponent.js?");

/***/ }),

/***/ "qnQu":
/*!*****************************************************!*\
  !*** ./node_modules/d3-format/src/formatDecimal.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// Computes the decimal coefficient and exponent of the specified number x with\n// significant digits p, where x is positive and p is in [1, 21] or undefined.\n// For example, formatDecimal(1.23) returns [\"123\", 0].\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(x, p) {\n  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf(\"e\")) < 0) return null; // NaN, ±Infinity\n  var i, coefficient = x.slice(0, i);\n\n  // The string returned by toExponential either has the form \\d\\.\\d+e[-+]\\d+\n  // (e.g., 1.2e+3) or the form \\de[-+]\\d+ (e.g., 1e+3).\n  return [\n    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,\n    +x.slice(i + 1)\n  ];\n});\n\n\n//# sourceURL=webpack:///./node_modules/d3-format/src/formatDecimal.js?");

/***/ }),

/***/ "rWgG":
/*!*********************************************!*\
  !*** ./node_modules/d3-format/src/index.js ***!
  \*********************************************/
/*! exports provided: formatDefaultLocale, format, formatPrefix, formatLocale, formatSpecifier, FormatSpecifier, precisionFixed, precisionPrefix, precisionRound */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _defaultLocale_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultLocale.js */ \"EjHT\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"formatDefaultLocale\", function() { return _defaultLocale_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"format\", function() { return _defaultLocale_js__WEBPACK_IMPORTED_MODULE_0__[\"format\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"formatPrefix\", function() { return _defaultLocale_js__WEBPACK_IMPORTED_MODULE_0__[\"formatPrefix\"]; });\n\n/* harmony import */ var _locale_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./locale.js */ \"sXBl\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"formatLocale\", function() { return _locale_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _formatSpecifier_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formatSpecifier.js */ \"CbjS\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"formatSpecifier\", function() { return _formatSpecifier_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"FormatSpecifier\", function() { return _formatSpecifier_js__WEBPACK_IMPORTED_MODULE_2__[\"FormatSpecifier\"]; });\n\n/* harmony import */ var _precisionFixed_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./precisionFixed.js */ \"2tFh\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"precisionFixed\", function() { return _precisionFixed_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _precisionPrefix_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./precisionPrefix.js */ \"2TPD\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"precisionPrefix\", function() { return _precisionPrefix_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/* harmony import */ var _precisionRound_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./precisionRound.js */ \"2Ynt\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"precisionRound\", function() { return _precisionRound_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]; });\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./node_modules/d3-format/src/index.js?");

/***/ }),

/***/ "sXBl":
/*!**********************************************!*\
  !*** ./node_modules/d3-format/src/locale.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _exponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exponent.js */ \"p/1U\");\n/* harmony import */ var _formatGroup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formatGroup.js */ \"mHFb\");\n/* harmony import */ var _formatNumerals_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formatNumerals.js */ \"AUoe\");\n/* harmony import */ var _formatSpecifier_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./formatSpecifier.js */ \"CbjS\");\n/* harmony import */ var _formatTrim_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./formatTrim.js */ \"kds9\");\n/* harmony import */ var _formatTypes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./formatTypes.js */ \"tO8Z\");\n/* harmony import */ var _formatPrefixAuto_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./formatPrefixAuto.js */ \"ze3m\");\n/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./identity.js */ \"EUnC\");\n\n\n\n\n\n\n\n\n\nvar map = Array.prototype.map,\n    prefixes = [\"y\",\"z\",\"a\",\"f\",\"p\",\"n\",\"µ\",\"m\",\"\",\"k\",\"M\",\"G\",\"T\",\"P\",\"E\",\"Z\",\"Y\"];\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(locale) {\n  var group = locale.grouping === undefined || locale.thousands === undefined ? _identity_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"] : Object(_formatGroup_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(map.call(locale.grouping, Number), locale.thousands + \"\"),\n      currencyPrefix = locale.currency === undefined ? \"\" : locale.currency[0] + \"\",\n      currencySuffix = locale.currency === undefined ? \"\" : locale.currency[1] + \"\",\n      decimal = locale.decimal === undefined ? \".\" : locale.decimal + \"\",\n      numerals = locale.numerals === undefined ? _identity_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"] : Object(_formatNumerals_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(map.call(locale.numerals, String)),\n      percent = locale.percent === undefined ? \"%\" : locale.percent + \"\",\n      minus = locale.minus === undefined ? \"-\" : locale.minus + \"\",\n      nan = locale.nan === undefined ? \"NaN\" : locale.nan + \"\";\n\n  function newFormat(specifier) {\n    specifier = Object(_formatSpecifier_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(specifier);\n\n    var fill = specifier.fill,\n        align = specifier.align,\n        sign = specifier.sign,\n        symbol = specifier.symbol,\n        zero = specifier.zero,\n        width = specifier.width,\n        comma = specifier.comma,\n        precision = specifier.precision,\n        trim = specifier.trim,\n        type = specifier.type;\n\n    // The \"n\" type is an alias for \",g\".\n    if (type === \"n\") comma = true, type = \"g\";\n\n    // The \"\" type, and any invalid type, is an alias for \".12~g\".\n    else if (!_formatTypes_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"][type]) precision === undefined && (precision = 12), trim = true, type = \"g\";\n\n    // If zero fill is specified, padding goes after sign and before digits.\n    if (zero || (fill === \"0\" && align === \"=\")) zero = true, fill = \"0\", align = \"=\";\n\n    // Compute the prefix and suffix.\n    // For SI-prefix, the suffix is lazily computed.\n    var prefix = symbol === \"$\" ? currencyPrefix : symbol === \"#\" && /[boxX]/.test(type) ? \"0\" + type.toLowerCase() : \"\",\n        suffix = symbol === \"$\" ? currencySuffix : /[%p]/.test(type) ? percent : \"\";\n\n    // What format function should we use?\n    // Is this an integer type?\n    // Can this type generate exponential notation?\n    var formatType = _formatTypes_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"][type],\n        maybeSuffix = /[defgprs%]/.test(type);\n\n    // Set the default precision if not specified,\n    // or clamp the specified precision to the supported range.\n    // For significant precision, it must be in [1, 21].\n    // For fixed precision, it must be in [0, 20].\n    precision = precision === undefined ? 6\n        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))\n        : Math.max(0, Math.min(20, precision));\n\n    function format(value) {\n      var valuePrefix = prefix,\n          valueSuffix = suffix,\n          i, n, c;\n\n      if (type === \"c\") {\n        valueSuffix = formatType(value) + valueSuffix;\n        value = \"\";\n      } else {\n        value = +value;\n\n        // Determine the sign. -0 is not less than 0, but 1 / -0 is!\n        var valueNegative = value < 0 || 1 / value < 0;\n\n        // Perform the initial formatting.\n        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);\n\n        // Trim insignificant zeros.\n        if (trim) value = Object(_formatTrim_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(value);\n\n        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.\n        if (valueNegative && +value === 0 && sign !== \"+\") valueNegative = false;\n\n        // Compute the prefix and suffix.\n        valuePrefix = (valueNegative ? (sign === \"(\" ? sign : minus) : sign === \"-\" || sign === \"(\" ? \"\" : sign) + valuePrefix;\n        valueSuffix = (type === \"s\" ? prefixes[8 + _formatPrefixAuto_js__WEBPACK_IMPORTED_MODULE_6__[\"prefixExponent\"] / 3] : \"\") + valueSuffix + (valueNegative && sign === \"(\" ? \")\" : \"\");\n\n        // Break the formatted value into the integer “value” part that can be\n        // grouped, and fractional or exponential “suffix” part that is not.\n        if (maybeSuffix) {\n          i = -1, n = value.length;\n          while (++i < n) {\n            if (c = value.charCodeAt(i), 48 > c || c > 57) {\n              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;\n              value = value.slice(0, i);\n              break;\n            }\n          }\n        }\n      }\n\n      // If the fill character is not \"0\", grouping is applied before padding.\n      if (comma && !zero) value = group(value, Infinity);\n\n      // Compute the padding.\n      var length = valuePrefix.length + value.length + valueSuffix.length,\n          padding = length < width ? new Array(width - length + 1).join(fill) : \"\";\n\n      // If the fill character is \"0\", grouping is applied after padding.\n      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = \"\";\n\n      // Reconstruct the final output based on the desired alignment.\n      switch (align) {\n        case \"<\": value = valuePrefix + value + valueSuffix + padding; break;\n        case \"=\": value = valuePrefix + padding + value + valueSuffix; break;\n        case \"^\": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;\n        default: value = padding + valuePrefix + value + valueSuffix; break;\n      }\n\n      return numerals(value);\n    }\n\n    format.toString = function() {\n      return specifier + \"\";\n    };\n\n    return format;\n  }\n\n  function formatPrefix(specifier, value) {\n    var f = newFormat((specifier = Object(_formatSpecifier_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(specifier), specifier.type = \"f\", specifier)),\n        e = Math.max(-8, Math.min(8, Math.floor(Object(_exponent_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(value) / 3))) * 3,\n        k = Math.pow(10, -e),\n        prefix = prefixes[8 + e / 3];\n    return function(value) {\n      return f(k * value) + prefix;\n    };\n  }\n\n  return {\n    format: newFormat,\n    formatPrefix: formatPrefix\n  };\n});\n\n\n//# sourceURL=webpack:///./node_modules/d3-format/src/locale.js?");

/***/ }),

/***/ "tO8Z":
/*!***************************************************!*\
  !*** ./node_modules/d3-format/src/formatTypes.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _formatPrefixAuto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatPrefixAuto.js */ \"ze3m\");\n/* harmony import */ var _formatRounded_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formatRounded.js */ \"P3jZ\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  \"%\": function(x, p) { return (x * 100).toFixed(p); },\n  \"b\": function(x) { return Math.round(x).toString(2); },\n  \"c\": function(x) { return x + \"\"; },\n  \"d\": function(x) { return Math.round(x).toString(10); },\n  \"e\": function(x, p) { return x.toExponential(p); },\n  \"f\": function(x, p) { return x.toFixed(p); },\n  \"g\": function(x, p) { return x.toPrecision(p); },\n  \"o\": function(x) { return Math.round(x).toString(8); },\n  \"p\": function(x, p) { return Object(_formatRounded_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(x * 100, p); },\n  \"r\": _formatRounded_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  \"s\": _formatPrefixAuto_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  \"X\": function(x) { return Math.round(x).toString(16).toUpperCase(); },\n  \"x\": function(x) { return Math.round(x).toString(16); }\n});\n\n\n//# sourceURL=webpack:///./node_modules/d3-format/src/formatTypes.js?");

/***/ }),

/***/ "ze3m":
/*!********************************************************!*\
  !*** ./node_modules/d3-format/src/formatPrefixAuto.js ***!
  \********************************************************/
/*! exports provided: prefixExponent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"prefixExponent\", function() { return prefixExponent; });\n/* harmony import */ var _formatDecimal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatDecimal.js */ \"qnQu\");\n\n\nvar prefixExponent;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(x, p) {\n  var d = Object(_formatDecimal_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(x, p);\n  if (!d) return x + \"\";\n  var coefficient = d[0],\n      exponent = d[1],\n      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,\n      n = coefficient.length;\n  return i === n ? coefficient\n      : i > n ? coefficient + new Array(i - n + 1).join(\"0\")\n      : i > 0 ? coefficient.slice(0, i) + \".\" + coefficient.slice(i)\n      : \"0.\" + new Array(1 - i).join(\"0\") + Object(_formatDecimal_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(x, Math.max(0, p + i - 1))[0]; // less than 1y!\n});\n\n\n//# sourceURL=webpack:///./node_modules/d3-format/src/formatPrefixAuto.js?");

/***/ })

}]);