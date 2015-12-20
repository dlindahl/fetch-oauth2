/*global Promise */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = tokenStorage;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsPreventRaceConditionJs = require('./utils/preventRaceCondition.js');

var _utilsPreventRaceConditionJs2 = _interopRequireDefault(_utilsPreventRaceConditionJs);

function tokenStorage(_ref) {
    var initialToken = _ref.initialToken;
    var fetchToken = _ref.fetchToken;
    var generateToken = _ref.generateToken;

    var _tokenPromise = initialToken;
    if (!_tokenPromise) {
        _tokenPromise = Promise.resolve();
    } else if (!(_tokenPromise instanceof Promise)) {
        _tokenPromise = Promise.resolve(initialToken);
    }

    var _fetchToken = fetchToken ? (0, _utilsPreventRaceConditionJs2['default'])(fetchToken) : function () {
        return Promise.reject(new Error('Getting a token from the server is not supported'));
    };
    var _generateToken = generateToken ? (0, _utilsPreventRaceConditionJs2['default'])(generateToken) : function () {
        return Promise.reject(new Error('Generating a token on the server is not supported'));
    };

    var getToken = function getToken() {
        return _tokenPromise = new Promise(function (resolve, reject) {
            _tokenPromise.then(function (tokens) {
                if (!tokens) {
                    reject();
                }
                return resolve(tokens);
            })['catch'](function (err) {
                if (err) {
                    throw err;
                }
                return _fetchToken().then(resolve)['catch'](function (err) {
                    return _generateToken(err).then(resolve, reject);
                });
            });
        });
    };

    var refreshToken = function refreshToken() {
        return _tokenPromise = new Promise(function (resolve, reject) {
            _generateToken().then(resolve, reject);
        });
    };

    return {
        getToken: getToken,
        refreshToken: refreshToken
    };
}

module.exports = exports['default'];