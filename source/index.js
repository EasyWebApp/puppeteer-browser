import 'babel-polyfill';

import {readFileSync} from 'fs';

import {resolve} from 'url';

import WebServer from 'koapache';

import {watch} from 'chokidar';


const Env = process.env, config = JSON.parse( readFileSync('./package.json') );

const browser_name = (Env.npm_config_PUPPETEER_BROWSER || 'chrome').trim(),
    NPM_command = Env.npm_lifecycle_script;

const module_name = 'puppeteer' + (map => {

    for (let name in map)  if (browser_name === name)  return map[name];

    return '';
})({
    chrome:   '',
    firefox:  '-fx',
    IE:       '-ie'
});

var server, browser, page;



export default  class PuppeteerBrowser {

    static async getServer(root) {

        return  server  ||  (server = await WebServer(root || '.'));
    }

    static async launch(options) {

        const Puppeteer = await import( module_name );

        return  await Puppeteer.launch( options );
    }

    static async getBrowser(visible) {

        return  browser || (
            browser = await PuppeteerBrowser.launch({
                executablePath:  Env['npm_config_' + browser_name],
                headless:        (visible != null)  ?
                    (! visible)  :  (! NPM_command.includes('--inspect'))
            })
        );
    }

    static watch(path, onChange) {

        var listen;

        async function refresh() {

            await onChange();

            await page.bringToFront();

            await page.reload();

            console.info(`[ Reload ]  ${page.url()}`);

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
     * @return {Page}
     */
    static async getPage(root, path, fileChange) {

        if ( page )  return page;

        fileChange = (fileChange instanceof Function)  &&  fileChange;

        page = await (await PuppeteerBrowser.getBrowser( fileChange )).newPage();

        const server = path.indexOf('http') &&
            await PuppeteerBrowser.getServer( root );

        await page.goto(
            server ?
                resolve(`http://${server.address}:${server.port}/`,  path || '.')  :
                path
        );

        if ( fileChange )
            PuppeteerBrowser.watch(config.directories.lib || root,  fileChange);

        return page;
    }
}
