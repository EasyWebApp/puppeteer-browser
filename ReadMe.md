# Puppeteer browser

Multiple **Web browser** controller based on [Puppeteer API](https://github.com/GoogleChrome/puppeteer/blob/v1.5.0/docs/api.md), wraps [`puppeteer`](https://pptr.dev/), [`puppeteer-fx`](https://github.com/autonome/puppeteer-fx) & [`puppeteer-ie`](https://techquery.github.io/Puppeteer-IE/) in one package.

[![NPM Dependency](https://david-dm.org/EasyWebApp/puppeteer-browser.svg)](https://david-dm.org/EasyWebApp/puppeteer-browser)

[![NPM](https://nodei.co/npm/puppeteer-browser.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/puppeteer-browser/)

([Windows users please note](https://github.com/TechQuery/Puppeteer-IE#installation))



## Use as a Test runner

Create `your_script.js`

```JavaScript
import PuppeteerBrowser from 'puppeteer-browser';

(async () => {

    const page = await PuppeteerBrowser.getPage(
        'path/to/start/server', 'path/to/open/page'
    );

    console.log(await page.title());
})();
```

then run one command below in your terminal

```Shell
# Chrome
node your_script

# Firefox
npm set PUPPETEER_BROWSER firefox  &&  node your_script

# Internet Explorer
npm set PUPPETEER_BROWSER IE  &&  node your_script
```
[ Notice ]  Option started with `--inspect` in the command-line will disable Headless mode.



## Use as a developing viewer

`directories.lib` field of `package.json` or `process.cwd()` will be watched.

[Example from WebCell DevCLI](https://github.com/EasyWebApp/DevCLI/blob/master/source/index.js#L68)



## API Document

 - Online: [URL](https://easywebapp.github.io/puppeteer-browser) or `npm docs`

 - Offline: `npm start`
