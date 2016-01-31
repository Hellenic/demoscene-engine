import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mocks } from 'mock-browser';
import LoaderUtils from '../../src/core/LoaderUtils';

describe('LoaderUtils', () => {

    before(function() {
        var mock = new mocks.MockBrowser();
        GLOBAL.window = mock.getWindow();
        GLOBAL.document = mock.getDocument();
        GLOBAL.window.location = mock.getLocation();
        GLOBAL.$ = require('jquery');
    });

    it('can figure out an empty string', () => {
        let isEmpty = LoaderUtils.isEmptyString('../src/models/Scene.js');
        expect(isEmpty).to.be.equal(false);

        isEmpty = LoaderUtils.isEmptyString('asd');
        expect(isEmpty).to.be.equal(false);

        // Should this equal to true?
        isEmpty = LoaderUtils.isEmptyString('   ');
        expect(isEmpty).to.be.equal(false);

        isEmpty = LoaderUtils.isEmptyString('');
        expect(isEmpty).to.be.equal(true);

        isEmpty = LoaderUtils.isEmptyString(null);
        expect(isEmpty).to.be.equal(true);

        isEmpty = LoaderUtils.isEmptyString(undefined);
        expect(isEmpty).to.be.equal(true);

        isEmpty = LoaderUtils.isEmptyString();
        expect(isEmpty).to.be.equal(true);
    });

    it('can parse file name', () => {
        let filename = LoaderUtils.getFilename('../src/models/Scene.js');
        expect(filename).to.be.equal('Scene');

        filename = LoaderUtils.getFilename('../src/models/Model.js');
        expect(filename).to.be.equal('Model');

        filename = LoaderUtils.getFilename('test/test/test/Test123FileScript.js');
        expect(filename).to.be.equal('Test123FileScript');
    });

    it('can parse URL parameters', () => {

        GLOBAL.window.location.href = 'http://localhost/index.html?name=test&otherParam=12345&andMore=testvalue';

        let value = LoaderUtils.getUrlParam('test');
        expect(value).to.be.equal(null);

        //let value = LoaderUtils.getUrlParam('');
        //expect(value).to.be.equal(null);

        value = LoaderUtils.getUrlParam('name');
        expect(value).to.be.equal('test');

        value = LoaderUtils.getUrlParam('otherParam');
        expect(value).to.be.equal('12345');

        value = LoaderUtils.getUrlParam('andMore');
        expect(value).to.be.equal('testvalue');
    });
});
