'use strict';

import DemoLoader from './DemoLoader';

/**
* DemoScene system with Three.js
* DemoScene handles the initialization for scenes, possible errors,
* the actual demo loop, etc.
*
* TODO Finish ES6 transform
*/
class DemoScene {

    constructor(config, path)
    {
        this.loader = new DemoLoader();

        this.started = false;
        this.settings = {};

        // Root path of the DemoSystem
        this.ROOT_PATH = path;
        if (!path)
        {
            var currentPath = document.currentScript.src;
            this.ROOT_PATH = currentPath.substring(0, currentPath.lastIndexOf("/")+1);
        }

        // TODO Refactor
        // Give all the internal engine scripts to the loader
        this.loader.addScript(this.ROOT_PATH + "lib/Detector.js", true);
        this.loader.addScript(this.ROOT_PATH + "models/Scene.js", true);
        this.loader.addScript(this.ROOT_PATH + "models/Model.js", true);
        this.loader.addScript(this.ROOT_PATH + "models/Action.js", true);
        this.loader.addScript(this.ROOT_PATH + "models/AreaTrigger.js", true);
        this.loader.addScript(this.ROOT_PATH + "services/DemoService.js", true);
        this.loader.addScript(this.ROOT_PATH + "services/ActionService.js", true);
        this.loader.addScript(this.ROOT_PATH + "services/ModelService.js", true);
        this.loader.addScript(this.ROOT_PATH + "services/PhysicsService.js", true);
        this.loader.addScript(this.ROOT_PATH + "services/TriggerService.js", true);
        this.loader.addScript(this.ROOT_PATH + "managers/ActionManager.js", true);
        this.loader.addScript(this.ROOT_PATH + "controllers/DemoController.js", true);
        this.loader.addScript(this.ROOT_PATH + "controllers/InteractionController.js", true);
        this.loader.addScript(this.ROOT_PATH + "controllers/TriggerController.js", true);
        this.loader.addScript(this.ROOT_PATH + "controllers/DialogController.js", true);
        this.loader.addScript(this.ROOT_PATH + "controllers/EventController.js", true);
        this.loader.addScript(this.ROOT_PATH + "utils/Statics.js", true);
        this.loader.addScript(this.ROOT_PATH + "utils/Support.js", true);

        if (config)
        {
            this.setProperties(config);
        }
    }

    /**
        Private methods
    */
    shaderCallback(name, file, content, callback)
    {
        Shaders[name] = content;
        callback();
    };
    modelCallback(name, file, content, callback)
    {
        var modelClass = eval(name);
        if (modelClass instanceof Model)
        {
            ModelService.load(modelClass, callback);
        }
    };

    /**
        Public methods
    */
    setProperties(config)
    {
        if (this.started)
        {
            console.warn("You cannot set properties anymore after the DemoScene engine has been started.");
            return;
        }
        this.settings = config;

        if (this.settings.stats)
        {
            this.loader.addScript(this.ROOT_PATH + "lib/Stats.js", true);
        }
        if (this.settings.controls)
        {
            this.loader.addScript(this.ROOT_PATH + "extend/Controls.js", true);
        }
        if (this.settings.pointerlock)
        {
            this.loader.addScript(this.ROOT_PATH + "extend/Pointerlock.js",true);
        }
        if (this.settings.audio)
        {
            this.loader.addScript(this.ROOT_PATH + "soundsystem/AudioPlayer.js", true);
            this.loader.addScript(this.ROOT_PATH + "soundsystem/MusicPlayer.js", true);
            this.loader.addScript(this.ROOT_PATH + "soundsystem/SoundPlayer.js", true);
        }
    }

    addGenericScript(name, scriptFile, initial, callback)
    {
        this.loader.addScript({name: name, file: scriptFile}, initial, callback);
    }

    addScene(sceneConfig)
    {
        this.loader.addScripts(sceneConfig.shaders, sceneConfig.initial, this.shaderCallback);
        this.loader.addScripts(sceneConfig.models, sceneConfig.initial, this.modelCallback);
        this.loader.addScript(sceneConfig.scene, sceneConfig.initial);
    }

    start()
    {
        $(document).trigger("initialize.DemoSystem");
        this.started = true;
        this.loader.start();
    }
}

export default DemoScene;
