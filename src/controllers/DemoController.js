"use strict";

/**
* DemoController
*
* @class DemoController
*/
var DemoController = {};

(function(Controller, $) {

    var container = ($("#demoscreen").length == 1) ? $("#demoscreen") : $("body");
    var infoContainer = $("#demo-info");

    function onInitialsLoaded(event, data)
    {
        console.info("Initializing DemoScene...");

        if (!Support.checkSupport())
        {
            console.error("Unable to start DemoSystem. Essential functionalities are not supported by the browser.");
            return;
        }

        DemoService.initialize();

        console.info(" .// ... ///       ...    //.");
        console.info(" .//  DemoScene started!  ./.");
        console.info(" .// ...      ... ///     //.");
    }

    function onEverythingLoaded(event, data)
    {
        DemoService.start();
    }

    function onPointerlockCallback(event, data)
    {
        if (data.isLocked)
        {
            infoContainer.hide();
            DemoService.pause(false);
        }
        else
        {
            infoContainer.show();
            DemoService.pause(true);
        }
    }

    Controller.getContainer = function() {
        return container;
    };
    Controller.getInfoContainer = function() {
        return infoContainer;
    };

    $(document).on("loaderReady.DemoSystem", onInitialsLoaded);
    $(document).on("loaderDone.DemoSystem", onEverythingLoaded);

    $(document).on("pointerlockToggle.DemoSystem", onPointerlockCallback);

})(DemoController, jQuery);
