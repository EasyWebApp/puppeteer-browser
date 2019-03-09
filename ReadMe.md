# Puppeteer browser

Multiple **Web browser** controller based on [Puppeteer API][1], wraps [`puppeteer`][2], [`puppeteer-fx`][3] & [`puppeteer-ie`][4] in one package.

[![NPM Dependency](https://david-dm.org/EasyWebApp/puppeteer-browser.svg)](https://david-dm.org/EasyWebApp/puppeteer-browser)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FEasyWebApp%2Fpuppeteer-browser.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FEasyWebApp%2Fpuppeteer-browser?ref=badge_shield)
[![Build Status](https://travis-ci.com/EasyWebApp/puppeteer-browser.svg?branch=master)](https://travis-ci.com/EasyWebApp/puppeteer-browser)

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

[Example from WebCell DevCLI](https://github.com/EasyWebApp/DevCLI/blob/master/source/index.js#L60)



## API Document

 - Online: [URL](https://web-cell.tk/puppeteer-browser) or `npm docs`

 - Offline: `npm start`



## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FEasyWebApp%2Fpuppeteer-browser.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FEasyWebApp%2Fpuppeteer-browser?ref=badge_large)



 [1]: https://pptr.dev/#?product=Puppeteer&version=v1.5.0
 [2]: https://pptr.dev/
 [3]: https://github.com/autonome/puppeteer-fx
 [4]: https://tech-query.me/Puppeteer-IE/
