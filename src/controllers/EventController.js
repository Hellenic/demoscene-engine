"use strict";
var EventController = {};

/**
* EventController
*
* @class EventController
*/
(function(Controller, $) {

    // Constructor
    (function() {

    })();

    function onInteract(event, data)
    {
        console.log("Event: On interact.", event);
        // TODO Make these more generic
        applyActions(data.mesh, event.type);
    }

    function onAreaEnter(event, data)
    {
        console.log("Event: Area entered.", event);
        applyActions(data.trigger, event.type);
    }

    function onAreaLeave(event, data)
    {
        console.log("Event: Area left.", data);
        applyActions(data.trigger, event.type);
    }

    function onModelShown(event, data)
    {
        console.log("Event: Model shown.", data);
    }

    function onModelHidden(event, data)
    {
        console.log("Event: Model hidden.", data);
    }

    function onDialogShown(event, data)
    {
        console.log("Event: Dialog shown.", data);
    }

    function onDialogClosed(event, data)
    {
        console.log("Event: Dialog closed.", data);
    }

    function onSoundStart(event, data)
    {
        console.log("Event: Sound start.", data);
    }

    function onSoundEnd(event, data)
    {
        console.log("Event: Sound end.", data);
    }

    function applyActions(object, eventType)
    {
        var actions = ActionService.getActions(object, eventType);
        if (!actions)
            return;

        ActionService.applyActions(object, actions);
    }

//    $(document).on("loaderStart.DemoSystem", null);
//    $(document).on("loaderReady.DemoSystem", null);
//    $(document).on("loaderTick.DemoSystem", null);
//    $(document).on("loaderDone.DemoSystem", null);

//    $(document).on("pointerlockToggle.DemoSystem", null);

    $(document).on("interact.DemoSystem", onInteract);
    $(document).on("areaEnter.DemoSystem", onAreaEnter);
    $(document).on("areaLeave.DemoSystem", onAreaLeave);
    $(document).on("modelShown.DemoSystem", onModelShown);
    $(document).on("modelHidden.DemoSystem", onModelHidden);
    $(document).on("dialogShown.DemoSystem", onDialogShown);
    $(document).on("dialogClose.DemoSystem", onDialogClosed);
    $(document).on("soundStart.DemoSystem", onSoundStart);
    $(document).on("soundEnd.DemoSystem", onSoundEnd);

})(EventController, jQuery);
