"use strict";
var ActionManager = {};

/**
* ActionManager
*
* @class ActionManager
*/
(function(Manager) {

    Manager.buildActions = function(jsonObjects)
    {
        if (!(jsonObjects instanceof Array))
        {
            return [];
        }

        var actions = [];
        for (var i=0; i<jsonObjects.length; i++)
        {
            var jsonObject = jsonObjects[i];
            actions.push(new Action().fromJSON(jsonObject));
        }

        return actions;
    };

})(ActionManager);
