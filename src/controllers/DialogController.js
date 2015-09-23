"use strict";
var DialogController = {};

/**
* DialogController
*
* @class DialogController
*/
(function(Controller, $) {

    var $notification = $("#notification");
    $notification.hide();

    function onShown(event) {
        $(document).trigger("dialogShown.DemoSystem");
    }
    function onClose(event) {
        $(document).trigger("dialogClose.DemoSystem");
    }

    Controller.showText = function(textData)
    {
        if (!textData)
            return;

        if (textData.hasOwnProperty("title"))
            $notification.find("h2").text(textData.title);

        if (textData.hasOwnProperty("content"))
            $notification.find("p").html(textData.content);

        $notification.fadeIn(onShown).delay(textData.timeout).fadeOut(onClose);
    };

})(DialogController, jQuery);
