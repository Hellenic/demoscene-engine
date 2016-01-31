import { describe, it } from 'mocha';
import { expect } from 'chai';
import DemoLoader from '../src/DemoLoader';

describe('DemoLoader', () => {

  it('Can load a script file', () => {
    const loader = new DemoLoader();

    var filesLoaded = 0;
    loader.addScript("../src/models/Scene.js", true, function(cb) { filesLoaded++; cb(); });
    loader.addScript("../src/models/Model.js", true, function(cb) { filesLoaded++; cb(); });

    loader.doLoad();
    expect(filesLoaded).to.be.equal(2);
  });

});
