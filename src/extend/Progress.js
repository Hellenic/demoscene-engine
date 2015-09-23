"use strict";
DemoLoader.Progress = {};

/**
* Progress
*
* @class Progress
*/
(function(Progress, $) {

    var element = null;
    var barElement = null;
    var currentState = null;
    var currentProgress = 0;

    var fileCount = 0;
    var currentCount = 0;

    // Constructor
    function initialize()
    {
        element = $("#progress");
        barElement = $("#progressbar");

        if (element.length == 0)
        {
            console.warn("Element not defined, not initializing Progress...");
            return;
        }

        // Change state to initial "loading"
        changeState("before");
        setBar(null, 0);
    }

    function start(event, data)
    {
        fileCount = data.fileCount;

        changeState("loading");
        setBar(null, 0);
    }

    function done(event)
    {
        changeState("done");
        setBar(null, 100);
    }

    function incrementProgress(event, data)
    {
        if (currentState == null)
            return;

        currentCount = currentCount+1;
        var newProgress = Math.floor((currentCount / fileCount) * 100);

        setBar(data.file, newProgress);
    }

    function setBar(file, progress)
    {
        var fileElem = barElement.find(".progress-file");
        var progressElem = barElement.find(".progress-percent");
        var barElem = barElement.find(".progress-width");

        if (file)
            fileElem.text(file).show();
        else
            fileElem.text("").hide();

        if (!isNaN(progress))
        {
            currentProgress = progress;
            progressElem.text(progress);

            barElem.css("width", progress+"%");
        }
    }

    function changeState(nextState)
    {
        currentState = nextState;

        // Hide everything but the progressbar within the element
        element.children().hide();
        barElement.show();

        // Get the element for current state and show it
        var stateElem = element.children("[data-state='"+ currentState +"']");
        var hideElemSelect = stateElem.data("hide");
        var showElemSelect = stateElem.data("show");

        stateElem.show();

        if (hideElemSelect != "")
        {
            $(hideElemSelect).hide();
        }

        if (showElemSelect != "")
        {
            $(showElemSelect).show();
        }
    }

    $(document).on("initialize.DemoSystem", initialize);
    $(document).on("loaderStart.DemoSystem", start);
    $(document).on("loaderTick.DemoSystem", incrementProgress);
    $(document).on("loaderDone.DemoSystem", done);

})(DemoLoader.Progress, jQuery);
