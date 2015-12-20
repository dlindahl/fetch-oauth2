/*global Promise */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports.setOAuth2Authorization = setOAuth2Authorization;
exports.authorisationChallengeHandler = authorisationChallengeHandler;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsFetchWithConfigJs = require('./utils/fetchWithConfig.js');

var _utilsFetchWithConfigJs2 = _interopRequireDefault(_utilsFetchWithConfigJs);

function setOAuth2Authorization(_ref) {
    var getToken = _ref.getToken;

    return function (next) {
        return function (config) {
            return next(config.then(function (config) {
                return getToken().then(function (token) {
                    return config.setAccessToken(token);
                });
            }));
        };
    };
}

function authorisationChallengeHandler(_ref2) {
    var refreshToken = _ref2.refreshToken;
    var test = arguments.length <= 1 || arguments[1] === undefined ? testResponseAuthorisationChallange : arguments[1];

    return function (next) {
        return function (config) {
            return next(config).then(function (response) {
                return test(response).then(function (isAuthorisationChallenge) {
                    if (isAuthorisationChallenge) {
                        return Promise.all([refreshToken(), config]).then(function (_ref3) {
                            var _ref32 = _slicedToArray(_ref3, 2);

                            var token = _ref32[0];
                            var config = _ref32[1];
                            return config.setAccessToken(token);
                        }).then(_utilsFetchWithConfigJs2['default']);
                    }

                    return response;
                });
            });
        };
    };
}

function testResponseAuthorisationChallange(response) {
    if (response.status == 401) {
        return Promise.resolve(true);
    }

    return Promise.resolve(false);
}