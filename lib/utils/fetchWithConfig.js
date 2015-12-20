/*global fetch */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = fetchWithConfig;

function fetchWithConfig(config) {
    return fetch(config.uri, config.opts);
}

module.exports = exports["default"];