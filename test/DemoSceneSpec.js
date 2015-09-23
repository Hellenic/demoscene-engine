import { describe, it } from 'mocha';
import { expect } from 'chai';
import DemoScene from '../src/DemoScene';

describe('DemoScene', () => {

  it('Can say hello', () => {
    const demo = new DemoScene();
    const message = demo.hello();
    expect(message).to.be.equal('Welcome, Guest!');
  });

});
