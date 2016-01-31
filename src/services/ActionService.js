"use strict";
var ActionService = {};

/**
* ActionService
*
* @class ActionService
*/
(function(Service) {

    var textFileFolder = "actions/";
    var interactiveObjects = [];

    Service.registerAction = function(object, actionFile)
    {
        if (!(object instanceof THREE.Mesh || object instanceof Model || object instanceof AreaTrigger))
        {
            return;
        }

        if (actionFile)
        {
            $.getJSON(textFileFolder + actionFile, function(fileContent) {
                var actions = ActionManager.buildActions(fileContent);
                interactiveObjects.push({object: object, actions: actions});
            });
        }
    };

    Service.getInteractiveObjects = function(type)
    {
        var objects = []
        for (var i=0; i<interactiveObjects.length; i++)
        {
            var obj = interactiveObjects[i].object;
            if (obj instanceof type)
            {
                objects.push(obj);
            }
        }
        return objects;
    };

    Service.getActions = function(object, event)
    {
        var eventActions = [];
        for (var i=0; i<interactiveObjects.length; i++)
        {
            var activeObject = interactiveObjects[i].object;
            if (activeObject == object)
            {
                var actions = interactiveObjects[i].actions;
                for (var j=0; j<actions.length; j++)
                {
                    var action = actions[j];
                    if (action.event == event)
                    {
                        eventActions.push(action);
                    }
                }
            }
        }

        return eventActions;
    };

    Service.applyActions = function(object, actions)
    {
        if (!object)
            return;

        for (var i=0; i<actions.length; i++)
        {
            var action = actions[i];

            if (!canTrigger(action))
            {
                continue;
            }

            var targetMesh = resolveTargetMesh(action, object);

            if (action.linearForce)
            {
                PhysicsService.applyLinearForce(targetMesh, action.linearForce);
            }
            if (action.angularForce)
            {
                PhysicsService.applyAngularForce(targetMesh, action.angularForce);
            }
            if (action.text)
            {
                DialogController.showText(action.text);
            }
            if (action.sound)
            {
                SoundPlayer.setSource(action.sound);
                SoundPlayer.play();
            }
        }

        return true;
    };

    function resolveTargetMesh(action, object)
    {
        if (!action.targetModel)
        {
            if (object instanceof THREE.Mesh)
                return object;
            else if (object instanceof AreaTrigger || object instanceof Model)
                return object.getMesh();
        }

        var model = ModelService.getModelByName(action.targetModel);
        return model.getMesh();
    }

    function canTrigger(action)
    {
        if (!action.triggerTimes)
            return true;

        if (!action.timesTriggered)
            action.timesTriggered = 0;

        if (action.timesTriggered < action.triggerTimes)
        {
            action.timesTriggered++;
            return true;
        }

        return false;
    }

})(ActionService);
