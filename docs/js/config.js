"use strict";
/**
    Example configuration how to use the DemoScene engine
*/
// For development purposes
import DemoScene from '../../src/DemoScene';
// For release
//import DemoScene from '../lib/DemoScene';

var ExampleDemo = new DemoScene({}, '../lib/');

// Switch on the required modules
ExampleDemo.setProperties({
    controls: false,
    pointerlock: false,
    audio: false,
    stats: false,
    debug: false
});

// TODO Add module somehow like this:
// DemoScene.enableModule('progress', {config: data});

// Load some generic scripts. Could be custom physics engine, for example.
ExampleDemo.addGenericScript("Triggers", "js/triggers.js", false);

// Add scene
ExampleDemo.addScene({
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
    ExampleDemo.start();
});
