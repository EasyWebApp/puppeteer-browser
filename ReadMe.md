# Puppeteer browser

Multiple **Web browser** controller based on [Puppeteer API](https://github.com/GoogleChrome/puppeteer/blob/v1.4.0/docs/api.md), wraps [`puppeteer`](https://github.com/GoogleChrome/puppeteer), [`puppeteer-fx`](https://github.com/autonome/puppeteer-fx) & [`puppeteer-ie`](https://techquery.github.io/Puppeteer-IE/) in one package.

[![NPM Dependency](https://david-dm.org/EasyWebApp/puppeteer-browser.svg)](https://david-dm.org/EasyWebApp/puppeteer-browser)

[![NPM](https://nodei.co/npm/puppeteer-browser.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/puppeteer-browser/)



## Usage

Create `your_script.js`

```JavaScript
const PuppeteerBrowser = require('puppeteer-browser');

(async () => {

    const page = await PuppeteerBrowser.getPage(
        'path/to/start/server', 'path/to/open/page'
    );

    console.log( page.title() );
})();
```

then run one command below in your terminal

```Shell
# Chrome
node your_script

# Firefox
set PUPPETEER_BROWSER=firefox  &&  node your_script

# Internet Explorer
set PUPPETEER_BROWSER=IE  &&  node your_script    
```
