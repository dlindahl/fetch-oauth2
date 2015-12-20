"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = preventRaceCondition;

function preventRaceCondition(fn) {
    var pending = null;

    return function () {
        if (pending) {
            return pending.then(function (result) {
                return Promise.resolve(result);
            });
        }

        pending = fn.apply(undefined, arguments).then(function (result) {
            pending = null;

            return result;
        })["catch"](function (error) {
            pending = null;

            throw error;
        });

        return pending;
    };
}

module.exports = exports["default"];