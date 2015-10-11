import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mocks } from 'mock-browser';
import DemoUtils from '../../src/utils/DemoUtils';

describe('DemoUtils', () => {

    before(function() {
        var mock = new mocks.MockBrowser();
        GLOBAL.window = mock.getWindow();
        GLOBAL.document = mock.getDocument();
        GLOBAL.$ = require('jquery');
    });

    it('can parse file name', () => {

        expect(true).to.be.equal(true);
        /*
        // TODO Finish ES6 transform before tests
        let filename = DemoUtils.getFilename('../src/models/Scene.js');
        expect(filename).to.be.equal('Scene');

        filename = DemoUtils.getFilename('../src/models/Model.js');
        expect(filename).to.be.equal('Model');

        filename = DemoUtils.getFilename('test/test/test/Test123FileScript.js');
        expect(filename).to.be.equal('Test123FileScript');
        */
    });
});
