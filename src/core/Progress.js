'use strict';

class Progress
{
    constructor()
    {
        this.element = $("#progress");
        this.barElement = $("#progressbar");

        if (this.element.length == 0)
        {
            console.warn("Progress module not initialized since #progress element is not defined.");
            return;
        }

        this.currentState = null;
        this.currentProgress = 0;

        this.fileCount = 0;
        this.currentCount = 0;

        var thisRef = this;
        // Bind jQuery events to monitor progress changes
        $(document).on("loaderStart.DemoSystem", function(event, data) { thisRef.start(event, data); });
        $(document).on("loaderTick.DemoSystem", function(event, data) { thisRef.incrementProgress(event, data); });
        $(document).on("loaderDone.DemoSystem", function(event) { thisRef.done(event); });

        // Change state to initial "preparing to download"
        this.changeState("before");
        this.setBar(null, 0);
    }

    start(event, data)
    {
        this.fileCount = data.fileCount;

        this.changeState("loading");
        this.setBar(null, 0);
    }

    done(event)
    {
        this.changeState("done");
        this.setBar(null, 100);
    }

    incrementProgress(event, data)
    {
        if (this.currentState == null)
            return;

        this.currentCount = this.currentCount+1;
        var newProgress = Math.floor((this.currentCount / this.fileCount) * 100);

        this.setBar(data.file, newProgress);
    }

    setBar(file, progress)
    {
        var fileElem = this.barElement.find(".progress-file");
        var progressElem = this.barElement.find(".progress-percent");
        var barElem = this.barElement.find(".progress-width");

        if (file)
            fileElem.text(file).show();
        else
            fileElem.text("").hide();

        if (!isNaN(progress))
        {
            this.currentProgress = progress;
            progressElem.text(progress);

            barElem.css("width", progress+"%");
        }
    }

    changeState(nextState)
    {
        this.currentState = nextState;

        // Hide everything but the progressbar within the element
        this.element.children().hide();
        this.barElement.show();

        // Get the element for current state and show it
        var stateElem = this.element.children("[data-state='"+ this.currentState +"']");
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
}

export default Progress;
