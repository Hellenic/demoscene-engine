"use strict";
var TriggerService = {};

/**
* TriggerService
*
* @class TriggerService
*/
(function(Service) {

    var triggers = [];

    var raycaster = new THREE.Raycaster();
    raycaster.far = 20.0;

    Service.registerAreaTrigger = function(trigger)
    {
        if (!(trigger instanceof AreaTrigger))
        {
            return false;
        }

        triggers.push(trigger);
    };

    Service.getTriggers = function()
    {
        return triggers;
    };

    Service.getTriggerResult = function(trigger, origin, direction)
    {
        var meshList = [ trigger.getMesh() ];

        raycaster.set(origin, direction);

        var intersects = raycaster.intersectObjects(meshList, true);
        if (intersects.length > 0 && !trigger.isActive())
        {
            trigger.setActive(true);
            return 1;
        }
        else if (intersects.length == 0 && trigger.isActive())
        {
            trigger.setActive(false);
            return -1;
        }
    };

})(TriggerService);
