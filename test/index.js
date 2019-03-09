import PuppeteerBrowser from '../source/index';

import { equal, notEqual } from 'should';

import { spy } from 'sinon';

import desktopEnv from 'desktop-env';

import activeWin from 'active-win';

import processOf from 'find-process';

import promisify from 'promisify-node';

const { mkdir, writeFile, appendFile, unlink, rmdir } = promisify('fs');


function wait(second) {

    return  new Promise(resolve => setTimeout(resolve,  second * 1000));
}

async function isActiveWindow(page,  yes = true) {

    const assert = yes ? equal : notEqual;

    const window = await activeWin(), path = PuppeteerBrowser.executablePath();

    if ( window.owner.path )
        assert(path, window.owner.path);
    else
        assert(path.match( /([^/]+)(\.\w+)?$/ )[1],  window.owner.name);
}


describe('Static methods',  () => {

    const file = 'test/example/test.js';  var GUI;

    before(async () => {

        await mkdir('test/example');

        GUI = ('N/A'  !==  await desktopEnv());
    });

    /**
     * @test {PuppeteerBrowser.watch}
     */
    it('Watch files changing',  async () => {

        const onChange = spy();

        await writeFile(file, '');

        PuppeteerBrowser.watch('test/example/', onChange);

        await wait( 1 );

        await appendFile(file, 'test');

        await wait( 1 );

        onChange.should.be.calledOnce();
    });

    /**
     * @test {PuppeteerBrowser.getBrowser}
     * @test {PuppeteerBrowser.getPage}
     */
    it('Open a background page',  async () => {

        const page = await PuppeteerBrowser.getPage('docs/');

        const browser = await PuppeteerBrowser.getBrowser();

        const task = await processOf('pid', browser.process().pid);

        if (! process.env.npm_lifecycle_script.includes('--inspect'))
            task[0].cmd.should.containEql('--headless');

        if ( GUI )  await isActiveWindow(page, false);

        await browser.close();
    });

    /**
     * @test {PuppeteerBrowser.getPage}
     */
    it('Open a preview page',  async () => {

        if (! GUI)
            return console.info(
                'Can\'t test Browser window without Desktop environment'
            );

        const page = await PuppeteerBrowser.getPage('docs/',  null,  () => { });

        await isActiveWindow( page );

        await page.browser().close();
    });


    after(async () => {

        await unlink( file );

        await rmdir('test/example');
    });
});
