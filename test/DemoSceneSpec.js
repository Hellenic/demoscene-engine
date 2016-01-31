import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mocks } from 'mock-browser';
import DemoScene from '../src/DemoScene';

describe('DemoScene', () => {

    before(function() {
        var mock = new mocks.MockBrowser();
        GLOBAL.window = mock.getWindow();
        GLOBAL.document = mock.getDocument();
        GLOBAL.$ = require('jquery');
    });

    it('Can start a demo scene', () => {
        const demoscene = new DemoScene({}, '../src/');
        const started = demoscene.start();
        expect(started).to.be.equal(true);
    });

    it('Supports configurations', () => {

        global.document = {};
        global.document.currentScript = {src: '../src/DemoScene'};

        const demoscene = new DemoScene({});
        const started = demoscene.start();
        expect(started).to.be.equal(true);
    });
});
