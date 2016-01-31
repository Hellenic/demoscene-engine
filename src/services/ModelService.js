'use strict';

var ModelService = {};

/**
* ModelService
*
* @class ModelService
*/
(function(Service) {

    var models = [];
    var loader = new THREE.JSONLoader();

    Service.load = function(model, callback)
    {
        var fileCount = model.files.length;
        var currentCount = 0;

        model.beforeLoad();

        if (fileCount > 0)
        {
            $.each(model.files, function(key, file) {
                loader.load(file, function(mesh, materials) {
                    currentCount++;

                    var fileName = DemoUtils.getFilename(file);

                    // Optional callback to "onFileLoaded" where File is the name of the file
                    // e.g. file: BirdModel.json => callback: onBirdModelLoaded
                    var callbackName = "on"+fileName+"Loaded";
                    if (model.hasOwnProperty(callbackName))
                    {
                        model[callbackName](mesh, materials);
                    }

                    // Notify DemoLoader that model once the final file has been loaded
                    if (currentCount == fileCount)
                    {
                        // Notify onLoad that whole model has been loaded
                        model.onLoad();
                        callback(model);
                    }
                });
            });
        }
        else
        {
            model.onLoad();
            callback(model);
        }
    };

    Service.addModel = function(model)
    {
        if (!(model instanceof Model))
        {
            return;
        }

        models.push(model);
    };

    Service.getModels = function()
    {
        return models;
    };

    Service.getModelByMesh = function(mesh)
    {
        if (!(mesh instanceof THREE.Mesh))
        {
            return null;
        }

        for (var i=0; i<models.length; i++)
        {
            var model = models[i];
            if (model.getMesh() == mesh)
            {
                return model;
            }
        }

        return null;
    };

    Service.getModelByName = function(name)
    {
        for (var i=0; i<models.length; i++)
        {
            var model = models[i];
            if (model.name == name)
            {
                return model;
            }
        }

        return null;
    };

    Service.animateAll = function()
    {
        for (var i=0; i<models.length; i++)
        {
            var model = models[i];
            model.animate();
        }
    };

})(ModelService);
