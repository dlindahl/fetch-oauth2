/*global Promise */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = fetchWithMiddleware;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsApplyMiddlewareJs = require('./utils/applyMiddleware.js');

var _utilsApplyMiddlewareJs2 = _interopRequireDefault(_utilsApplyMiddlewareJs);

var _utilsConfigJs = require('./utils/config.js');

var _utilsConfigJs2 = _interopRequireDefault(_utilsConfigJs);

var _utilsFetchWithConfigJs = require('./utils/fetchWithConfig.js');

var _utilsFetchWithConfigJs2 = _interopRequireDefault(_utilsFetchWithConfigJs);

function fetchWithMiddleware() {
    for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
        middlewares[_key] = arguments[_key];
    }

    return function (uri, opts) {
        return _utilsApplyMiddlewareJs2['default'].apply(undefined, middlewares)(function (config) {
            return config.then(_utilsFetchWithConfigJs2['default']);
        })(Promise.resolve(new _utilsConfigJs2['default']({ uri: uri, opts: opts })));
    };
}

module.exports = exports['default'];