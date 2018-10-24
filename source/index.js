import {packageOf} from '@tech_query/node-toolkit';

import {resolve} from 'url';

import WebServer from 'koapache';

import {watch} from 'chokidar';

import {toString} from 'qrcode';

import promisify from 'promisify-node';

const QRCode = promisify( toString );



const Env = process.env, config = (packageOf('./test') || '').meta;

const NPM_command = Env.npm_lifecycle_script;

var server, browser, page;


/**
 * Wrapper of `Puppeteer` class
 */
export default  class PuppeteerBrowser {
    /**
     * @protected
     *
     * @param {string} [root] - Root path of the static site
     *
     * @return {Object} Server information
     */
    static async getServer(root) {

        return  server || (
            server = await (new WebServer(root || '.')).workerHost()
        );
    }

    /**
     * @type {string}
     */
    static get browserName() {

        return  (Env.npm_config_PUPPETEER_BROWSER || 'chrome').trim();
    }

    /**
     * @type {string}
     */
    static get moduleName() {

        return  'puppeteer' + (map => {

            for (let name in map)
                if (name === this.browserName)  return map[name];

            return '';
        })({
            chrome:   '',
            firefox:  '-fx',
            IE:       '-ie'
        });
    }

    /**
     * @param {Object} [options]
     *
     * @return {Browser}
     *
     * @see https://github.com/GoogleChrome/puppeteer/blob/v1.5.0/docs/api.md#puppeteerlaunchoptions
     */
    static async launch(options) {

        const Puppeteer = (await import( this.moduleName )).default;

        return  await Puppeteer.launch( options );
    }

    /**
     * @return {string}
     *
     * @see https://github.com/GoogleChrome/puppeteer/blob/v1.5.0/docs/api.md#puppeteerexecutablepath
     */
    static executablePath() {

        return  Env['npm_config_' + this.browserName];
    }

    /**
     * @protected
     *
     * @param {boolean} [visible] - Browser visibility
     *                              (Visible mode will run slowly for seeing clearly)
     * @return {Browser}
     */
    static async getBrowser(visible) {

        if ( browser )  return browser;

        visible = (visible != null)  ?
            visible  :  NPM_command.includes('--inspect');

        browser = await this.launch({
            executablePath:  this.executablePath(),
            headless:        ! visible,
            slowMo:          visible ? 100 : 0
        });

        return  browser.on('disconnected',  () => browser = page = null);
    }

    /**
     * After files changed, the page will be focused & reloaded
     *
     * @param {string}   path     - Directory to watch recursively
     * @param {function} onChange - Call on files changed
     *
     * @return {FSWatcher}
     */
    static watch(path, onChange) {

        var listen;

        async function refresh() {

            await onChange();

            if ( page ) {

                await page.bringToFront();

                await page.reload();

                console.info(`[ Reload ]  ${page.url()}`);
            }

            listen = false;
        }

        return  watch( path ).on('change',  () => {

            if (! listen) {

                listen = true;

                process.nextTick( refresh );
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
    static async getPage(root, path, fileChange) {

        if ( page )  return page;

        path = path || '.';

        fileChange = (fileChange instanceof Function)  ?  fileChange  :  null;

        const server = path.indexOf('http')  &&  await this.getServer( root );

        const URI = resolve(`http://${server.address}:${server.port}/`, path);

        if ( fileChange )  console.info(await QRCode( URI ));

        page = await (await this.getBrowser( fileChange )).newPage();

        await page.on('close',  () => page = null).goto(server ? URI : path,  {
            waitUntil:  'domcontentloaded'
        });

        if ( fileChange )
            this.watch(config.directories.lib || root,  fileChange);

        return page;
    }
}
