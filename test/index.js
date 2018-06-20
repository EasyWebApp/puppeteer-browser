import PuppeteerBrowser from '../source/index';

import should from 'should';

import sinon from 'sinon';

import desktopEnv from 'desktop-env';

import activeWin from 'active-win';

import processOf from 'find-process';

import promisify from 'promisify-node';

const {mkdir, writeFile, appendFileSync, unlink, rmdir} = promisify('fs');


function wait(second, func) {

    return  new Promise(resolve => setTimeout(
        ()  =>  resolve( func() ),  second * 1000
    ));
}

async function isActiveWindow(page,  yes = true) {

    const equal = yes ? should.equal : should.notEqual;

    const window = await activeWin(), path = PuppeteerBrowser.executablePath();

    if ( window.owner.path )
        equal(path, window.owner.path);
    else
        equal(path.match( /([^/]+)(\.\w+)?$/ )[1],  window.owner.name);
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

        const onChange = sinon.spy();

        await writeFile(file, '');

        PuppeteerBrowser.watch('test/example/', onChange);

        await wait(1,  ()  =>  appendFileSync(file, 'test'));

        await wait(1,  () => onChange.should.be.calledOnce());
    });

    /**
     * @test {PuppeteerBrowser.getBrowser}
     * @test {PuppeteerBrowser.getPage}
     */
    it('Open a background page',  async () => {

        const page = await PuppeteerBrowser.getPage('docs/');

        const browser = await PuppeteerBrowser.getBrowser();

        const process = await processOf('pid', browser.process().pid);

        process[0].cmd.should.containEql('--headless');

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
