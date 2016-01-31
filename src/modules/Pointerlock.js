"use strict";
var Pointerlock = {};

/**
* Pointerlock API handler
*
* @class Pointerlock
*/
(function(Lock, $) {

    var locked = false;
    var element = null;
    var lockChangeCallback = null;

    Lock.isSupported = function()
    {
        return ('pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document);
    };

    Lock.isLocked = function()
    {
        return locked;
    };

    function initialize()
    {
        element = DemoController.getContainer();

        // Hook pointer lock state change events
        $(document).on("pointerlockchange", onPointerlockChange);
        $(document).on("mozpointerlockchange", onPointerlockChange);
        $(document).on("webkitpointerlockchange", onPointerlockChange);

        $(document).on("pointerlockerror", onPointerlockError);
        $(document).on("mozpointerlockerror", onPointerlockError);
        $(document).on("webkitpointerlockerror", onPointerlockError);

        element.on("click", requestPointerlock);
    }

    function requestPointerlock(event)
    {
        // Save element as jQuery object for later
        element = $(event.currentTarget);
        var domElement = element.context;

        // Bundle the lock request for browser support
        domElement.requestPointerLock = domElement.requestPointerLock || domElement.mozRequestPointerLock || domElement.webkitRequestPointerLock;

        // Request browser to lock the pointer
        domElement.requestPointerLock();
    }

    function exitPointerlock()
    {
        // Ask the browser to release the pointer
        //document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
        //document.exitPointerLock();
    }

    function onPointerlockChange(event)
    {
        var pointerLockElement = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement;
        locked = (pointerLockElement != null);

        if (locked)
        {
            // Unbind the click listener
            element.off("click");
        }
        else
        {
            // If lock was removed, re-listen to click event
            element.on("click", requestPointerlock);
        }

        $(document).trigger("pointerlockToggle.DemoSystem", {isLocked: locked});
    }

    function onPointerlockError(event)
    {
        console.warn("Pointerlock error", event);
    }

    $(document).on("loaderReady.DemoSystem", initialize)

})(Pointerlock, jQuery);
