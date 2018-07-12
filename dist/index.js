'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fs = require('fs');

var _url = require('url');

var _koapache = require('koapache');

var _koapache2 = _interopRequireDefault(_koapache);

var _chokidar = require('chokidar');

var _qrcode = require('qrcode');

var _promisifyNode = require('promisify-node');

var _promisifyNode2 = _interopRequireDefault(_promisifyNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QRCode = (0, _promisifyNode2.default)(_qrcode.toString);

var Env = process.env,
    config = JSON.parse((0, _fs.readFileSync)('./package.json'));

var NPM_command = Env.npm_lifecycle_script;

var server, browser, page;

/**
 * Wrapper of `Puppeteer` class
 */

var PuppeteerBrowser = function () {
    function PuppeteerBrowser() {
        (0, _classCallCheck3.default)(this, PuppeteerBrowser);
    }

    (0, _createClass3.default)(PuppeteerBrowser, null, [{
        key: 'getServer',

        /**
         * @protected
         *
         * @param {string} [root] - Root path of the static site
         *
         * @return {Object} Server information
         */
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
                                return new _koapache2.default(root || '.').workerHost();

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

        /**
         * @type {string}
         */

    }, {
        key: 'launch',


        /**
         * @param {Object} [options]
         *
         * @return {Browser}
         *
         * @see https://github.com/GoogleChrome/puppeteer/blob/v1.5.0/docs/api.md#puppeteerlaunchoptions
         */
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(options) {
                var Puppeteer;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return Promise.resolve().then(function () {
                                    return require('' + PuppeteerBrowser.moduleName);
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

        /**
         * @return {string}
         *
         * @see https://github.com/GoogleChrome/puppeteer/blob/v1.5.0/docs/api.md#puppeteerexecutablepath
         */

    }, {
        key: 'executablePath',
        value: function executablePath() {

            return Env['npm_config_' + PuppeteerBrowser.browserName];
        }

        /**
         * @protected
         *
         * @param {boolean} [visible] - Browser visibility
         *                              (Visible mode will run slowly for seeing clearly)
         * @return {Browser}
         */

    }, {
        key: 'getBrowser',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(visible) {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!browser) {
                                    _context3.next = 2;
                                    break;
                                }

                                return _context3.abrupt('return', browser);

                            case 2:

                                visible = visible != null ? visible : NPM_command.includes('--inspect');

                                _context3.next = 5;
                                return PuppeteerBrowser.launch({
                                    executablePath: PuppeteerBrowser.executablePath(),
                                    headless: !visible,
                                    slowMo: visible ? 500 : 0
                                });

                            case 5:
                                browser = _context3.sent;
                                return _context3.abrupt('return', browser.on('disconnected', function () {
                                    return browser = page = null;
                                }));

                            case 7:
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

        /**
         * After files changed, the page will be focused & reloaded
         *
         * @param {string}   path     - Directory to watch recursively
         * @param {function} onChange - Call on files changed
         *
         * @return {FSWatcher}
         */

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
                                    if (!page) {
                                        _context4.next = 8;
                                        break;
                                    }

                                    _context4.next = 5;
                                    return page.bringToFront();

                                case 5:
                                    _context4.next = 7;
                                    return page.reload();

                                case 7:

                                    console.info('[ Reload ]  ' + page.url());

                                case 8:

                                    listen = false;

                                case 9:
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
         * @return {Page} Resolve after `DOMContentLoaded` event fired
         */

    }, {
        key: 'getPage',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(root, path, fileChange) {
                var server, URI;
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

                                path = path || '.';

                                fileChange = fileChange instanceof Function ? fileChange : null;

                                _context5.t0 = path.indexOf('http');

                                if (!_context5.t0) {
                                    _context5.next = 9;
                                    break;
                                }

                                _context5.next = 8;
                                return PuppeteerBrowser.getServer(root);

                            case 8:
                                _context5.t0 = _context5.sent;

                            case 9:
                                server = _context5.t0;
                                URI = (0, _url.resolve)('http://' + server.address + ':' + server.port + '/', path);

                                if (!fileChange) {
                                    _context5.next = 17;
                                    break;
                                }

                                _context5.t1 = console;
                                _context5.next = 15;
                                return QRCode(URI);

                            case 15:
                                _context5.t2 = _context5.sent;

                                _context5.t1.info.call(_context5.t1, _context5.t2);

                            case 17:
                                _context5.next = 19;
                                return PuppeteerBrowser.getBrowser(fileChange);

                            case 19:
                                _context5.next = 21;
                                return _context5.sent.newPage();

                            case 21:
                                page = _context5.sent;
                                _context5.next = 24;
                                return page.on('close', function () {
                                    return page = null;
                                }).goto(server ? URI : path, {
                                    waitUntil: 'domcontentloaded'
                                });

                            case 24:

                                if (fileChange) PuppeteerBrowser.watch(config.directories.lib || root, fileChange);

                                return _context5.abrupt('return', page);

                            case 26:
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
    }, {
        key: 'browserName',
        get: function get() {

            return (Env.npm_config_PUPPETEER_BROWSER || 'chrome').trim();
        }

        /**
         * @type {string}
         */

    }, {
        key: 'moduleName',
        get: function get() {

            return 'puppeteer' + function (map) {

                for (var name in map) {
                    if (name === PuppeteerBrowser.browserName) return map[name];
                }return '';
            }({
                chrome: '',
                firefox: '-fx',
                IE: '-ie'
            });
        }
    }]);
    return PuppeteerBrowser;
}();

exports.default = PuppeteerBrowser;