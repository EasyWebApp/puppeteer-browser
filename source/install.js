#! /usr/bin/env node

const {execSync} = require('child_process'), {which} = require('fs-match');


function NPM_set(key,  value = true) {

    console.info(`${key} = ${value}`);

    return  execSync(`npm set ${key} ${JSON.stringify( value )}`) + '';
}


(async () => {

    console.time('Configuration');

    NPM_set('puppeteer_skip_chromium_download');

    NPM_set('chrome',  await which('chrome'));

    NPM_set('firefox',  await which('firefox'));

    console.info('-------------------------');

    console.timeEnd('Configuration');
})();
