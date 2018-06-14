'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

require('babel-polyfill');

var _fs = require('fs');

var _url = require('url');

var _koapache = require('koapache');

var _koapache2 = _interopRequireDefault(_koapache);

var _chokidar = require('chokidar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Env = process.env,
    config = JSON.parse((0, _fs.readFileSync)('./package.json'));

var browser_name = (Env.npm_config_PUPPETEER_BROWSER || 'chrome').trim(),
    NPM_command = Env.npm_lifecycle_script;

var module_name = 'puppeteer' + function (map) {

    for (var name in map) {
        if (browser_name === name) return map[name];
    }return '';
}({
    chrome: '',
    firefox: '-fx',
    IE: '-ie'
});

var server, browser, page;

var PuppeteerBrowser = function () {
    function PuppeteerBrowser() {
        (0, _classCallCheck3.default)(this, PuppeteerBrowser);
    }

    (0, _createClass3.default)(PuppeteerBrowser, null, [{
        key: 'getServer',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(root) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.t0 = server;

                                if (_context.t0) {
                                    _context.next = 5;
                                    break;
                                }

                                _context.next = 4;
                                return (0, _koapache2.default)(root || '.');

                            case 4:
                                _context.t0 = server = _context.sent;

                            case 5:
                                return _context.abrupt('return', _context.t0);

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getServer(_x) {
                return _ref.apply(this, arguments);
            }

            return getServer;
        }()
    }, {
        key: 'launch',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(options) {
                var Puppeteer;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return _promise2.default.resolve().then(function () {
                                    return require('' + module_name);
                                });

                            case 2:
                                Puppeteer = _context2.sent;
                                _context2.next = 5;
                                return Puppeteer.launch(options);

                            case 5:
                                return _context2.abrupt('return', _context2.sent);

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function launch(_x2) {
                return _ref2.apply(this, arguments);
            }

            return launch;
        }()
    }, {
        key: 'getBrowser',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(visible) {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.t0 = browser;

                                if (_context3.t0) {
                                    _context3.next = 5;
                                    break;
                                }

                                _context3.next = 4;
                                return PuppeteerBrowser.launch({
                                    executablePath: Env['npm_config_' + browser_name],
                                    headless: visible != null ? !visible : !NPM_command.includes('--inspect')
                                });

                            case 4:
                                _context3.t0 = browser = _context3.sent;

                            case 5:
                                return _context3.abrupt('return', _context3.t0);

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getBrowser(_x3) {
                return _ref3.apply(this, arguments);
            }

            return getBrowser;
        }()
    }, {
        key: 'watch',
        value: function watch(path, onChange) {
            var refresh = function () {
                var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
                    return _regenerator2.default.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    _context4.next = 2;
                                    return onChange();

                                case 2:
                                    _context4.next = 4;
                                    return page.bringToFront();

                                case 4:
                                    _context4.next = 6;
                                    return page.reload();

                                case 6:

                                    console.info('[ Reload ]  ' + page.url());

                                    listen = false;

                                case 8:
                                case 'end':
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, this);
                }));

                return function refresh() {
                    return _ref4.apply(this, arguments);
                };
            }();

            var listen;

            return (0, _chokidar.watch)(path).on('change', function () {

                if (!listen) {

                    listen = true;

                    process.nextTick(refresh);
                }
            });
        }

        /**
         * @param {?string}  root         - Root path to start Web server, default to be `process.cwd()`
         * @param {?string}  path         - Path to open Web page
         * @param {function} [fileChange] - Do something between files changed & page reload
         *                                  (Browser will be visible)
         * @return {Page}
         */

    }, {
        key: 'getPage',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(root, path, fileChange) {
                var server;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                if (!page) {
                                    _context5.next = 2;
                                    break;
                                }

                                return _context5.abrupt('return', page);

                            case 2:

                                fileChange = fileChange instanceof Function && fileChange;

                                _context5.next = 5;
                                return PuppeteerBrowser.getBrowser(fileChange);

                            case 5:
                                _context5.next = 7;
                                return _context5.sent.newPage();

                            case 7:
                                page = _context5.sent;
                                _context5.t0 = path.indexOf('http');

                                if (!_context5.t0) {
                                    _context5.next = 13;
                                    break;
                                }

                                _context5.next = 12;
                                return PuppeteerBrowser.getServer(root);

                            case 12:
                                _context5.t0 = _context5.sent;

                            case 13:
                                server = _context5.t0;
                                _context5.next = 16;
                                return page.goto(server ? (0, _url.resolve)('http://' + server.address + ':' + server.port + '/', path || '.') : path);

                            case 16:

                                if (fileChange) PuppeteerBrowser.watch(config.directories.lib || root, fileChange);

                                return _context5.abrupt('return', page);

                            case 18:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function getPage(_x4, _x5, _x6) {
                return _ref5.apply(this, arguments);
            }

            return getPage;
        }()
    }]);
    return PuppeteerBrowser;
}();

exports.default = PuppeteerBrowser;