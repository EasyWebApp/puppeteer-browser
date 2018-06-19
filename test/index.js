import PuppeteerBrowser from '../source/index';

import sinon from 'sinon';

import promisify from 'promisify-node';

const {mkdir, writeFile, appendFileSync, unlink, rmdir} = promisify('fs');


function wait(second, func) {

    return  new Promise(resolve => setTimeout(
        ()  =>  resolve( func() ),  second * 1000
    ));
}


describe('Static methods',  () => {

    before(() => mkdir('test/example'));

    const file = 'test/example/test.js';

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


    after(async () => {

        await unlink( file );

        await rmdir('test/example');
    });
});
