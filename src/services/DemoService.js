"use strict";

/**
* DemoService
*
* @class DemoService
*/
var DemoService = {};

(function(Service, $) {

    var currentScene = null;
    var initialScene = null;
    var scenes = [];

    var settings = null;
    var paused = false;

    Service.initialize = function()
    {
        if (initialScene !== null)
        {
            scenes.push(initialScene);
            Service.doSceneChange();
            Service.animate();
        }
    };

    Service.start = function()
    {
        // Once everything is loaded, check if there is scene
        // If there is not, initial scene was not defined, then start running actual scenes
        if (currentScene == null)
        {
            Service.doSceneChange();
            Service.animate();
        }
    };

    Service.doSceneChange = function()
    {
        // TODO There is now cross dependency, fixit
        var container = DemoController.getContainer();

        if (currentScene !== null)
        {
            console.debug("Unloading "+ currentScene.name);
            currentScene.unload();

            container.empty();
            container.hide();
        }

        // If no more scenes to run, end.
        if (scenes.length == 0)
        {
            currentScene = null;
            container.remove();
            console.log("The end.");
            return;
        }

        currentScene = scenes.shift();
        console.info("Initializing scene "+ currentScene.name);
        currentScene.init();

        container.append(currentScene.renderer.domElement);
        container.fadeIn("fast");

        window.addEventListener("resize", function() { currentScene.resize(); }, false);
    };

    Service.animate = function(data)
    {
        if (currentScene !== null)
        {
            try {
                requestAnimationFrame(Service.animate);

                InteractionController.update(currentScene.camera);
                TriggerController.update(currentScene.camera);
                ModelService.animateAll();

                var sceneState = currentScene.render();
                if (sceneState == 0)
                    Service.doSceneChange();
            }
            catch(error) {
                console.error("Error occurred during render loop. Ending the scene.", error);
                console.trace();
                sceneState = 0;
                Service.doSceneChange();
            }
        }
    };

    Service.registerInitialScene = function(scene)
    {
        if (!(scene instanceof Scene))
        {
            return;
        }

        console.info("Registering initial scene", scene.name);
        initialScene = scene;
    };

    Service.registerScene = function(scene)
    {
        if (!(scene instanceof Scene))
        {
            return;
        }

        console.info("Registering scene", scene.name);
        scenes.push(scene);
    };

    Service.getCurrentScene = function()
    {
        return currentScene;
    };

    Service.pause = function(bPause)
    {
        currentScene.pause(bPause);
        paused = bPause;
    };

})(DemoService, jQuery);
