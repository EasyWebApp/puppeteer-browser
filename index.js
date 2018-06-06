'use strict';

const browser_name = process.env.PUPPETEER_BROWSER.trim(),
    NPM_command = process.env.npm_lifecycle_script;

const Puppeteer = require('puppeteer' + (map => {
        
        for (let name in map)  if (browser_name === name)  return map[name];
        
        return '';
    })({
        chrome:   '',
        firefox:  '-fx',
        IE:       '-ie'
    })),
    WebServer = require('koapache'), URL_utility = require('url');

var server, browser, page;


module.exports = class PuppeteerBrowser {

    static async getServer(root) {

        return  server  ||  (server = await WebServer( root ));
    }

    static async getBrowser() {

        return  browser || (
            browser = await Puppeteer.launch({
                headless:  (! NPM_command.includes('--inspect'))
            })
        );
    }

    /**
     * @param {?string} root       - Root path to start Web server, default to be `process.cwd()`
     * @param {string}  [path='.'] - Path to open Web page
     * 
     * @return {Page}
     */
    static async getPage(root, path) {

        if ( page )  return page;

        page = await (await PuppeteerBrowser.getBrowser()).newPage();

        const server = path.indexOf('http') &&
            await PuppeteerBrowser.getServer( root );

        await page.goto(
            server ?
                URL_utility.resolve(
                    `http://${server.address}:${server.port}/`,  path || '.'
                ) :
                path
        );

        return page;
    }
};
