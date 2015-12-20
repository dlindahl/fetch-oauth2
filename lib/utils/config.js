'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Config = (function () {
    function Config() {
        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var _ref$uri = _ref.uri;
        var uri = _ref$uri === undefined ? '' : _ref$uri;
        var _ref$opts = _ref.opts;
        var opts = _ref$opts === undefined ? {} : _ref$opts;

        _classCallCheck(this, Config);

        this.uri = uri;
        this.opts = opts;
    }

    _createClass(Config, [{
        key: 'setHeader',
        value: function setHeader(name, value) {
            var _opts = this.opts;
            var headers = _opts.headers;

            var opts = _objectWithoutProperties(_opts, ['headers']);

            return new Config({ uri: this.uri, opts: _extends({}, opts, { headers: _extends({}, headers, _defineProperty({}, name, value)) }) });
        }
    }, {
        key: 'setAccessToken',
        value: function setAccessToken(_ref2) {
            var token_type = _ref2.token_type;
            var access_token = _ref2.access_token;

            return this.setHeader('Authorization', token_type + ' ' + access_token);
        }
    }, {
        key: 'updateUri',
        value: function updateUri(fn) {
            return new Config({ opts: this.opts, uri: fn(this.uri) });
        }
    }]);

    return Config;
})();

exports['default'] = Config;
module.exports = exports['default'];