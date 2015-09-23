var Support = {};

// TODO Refactor and merge with Detector + Modernizr
Support.checkSupport = function(settings)
{
    var supportContainer = $("#support");
    var supported = true;

    if (Detector.webgl)
    {
        supportContainer.find("[data-api='webgl']").remove();
    }
    else
    {
        supported = false;
        console.warn("WebGL not supported.");
    }

    if (Boolean(settings) && settings.pointerlock)
    {
        if (DemoScene.Pointerlock.isSupported())
        {
            supportContainer.find("[data-api='pointerlock']").remove();
        }
        else
        {
            supported = false;
            console.warn("Pointerlock Control not supported.");
        }
    }

    if (supported)
        supportContainer.remove();
    else
        supportContainer.show();

    return supported;
}
