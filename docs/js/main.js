'use strict';

import 'babel/polyfill';

/**
Example configuration how to use the DemoScene engine
*/
// For development purposes
import DemoScene from '../../src/DemoScene';
// For release
//import DemoScene from '../lib/DemoScene';

// You can give properties in a constructor
var exampleDemo = new DemoScene({width: 400, height: 300}, '../lib/');

// Or you can give them via method, they will be merged
exampleDemo.setProperties({
    // These will switch on the modules we want to use
    controls: false, // TODO Controls
    pointerlock: true,
    audio: true
});

// TODO Add module somehow like this:
// DemoScene.enableModule('progress', {config: data});

// Load some generic scripts. Could be custom physics engine, for example.
exampleDemo.addGenericScript("Triggers", "js/triggers.js", false);

// Add scene
exampleDemo.addScene({
    shaders: [
        {name: "basic.vs", file: "shaders/basic.vs.glsl"},
        {name: "basic.fs", file: "shaders/basic.fs.glsl"}
    ],
    models: [
        {name: "Character",     file: "models/Character.js"},
        {name: "ShaderBox",     file: "models/ShaderBox.js"}
    ],
    scene: {name: "Example", file: "scenes/Example.js"},
    initial: false
});

$(document).ready(function() {
    exampleDemo.start();
});
