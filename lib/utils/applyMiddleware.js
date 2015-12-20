"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = applyMiddleware;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function applyMiddleware() {
    for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
        middlewares[_key] = arguments[_key];
    }

    return function (baseRequest) {
        var chain = middlewares.concat();

        return compose.apply(undefined, _toConsumableArray(chain))(baseRequest);
    };
}

function compose() {
    for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        funcs[_key2] = arguments[_key2];
    }

    return function (arg) {
        return funcs.reduceRight(function (composed, f) {
            return f(composed);
        }, arg);
    };
}
module.exports = exports["default"];