'use strict';

var TriggerController = {};

/**
* TriggerController
*
* TODO Now it's possible to check area triggers only with the camera. This wouldn't work on 3rd person.
*
* @class TriggerController
*/
(function(Controller, $) {

    /**
     * Check camera against all the models and triggers.
     * In case of contant, launch events.
     */
    Controller.update = function(camera)
    {
        // Go through all the models
        var models = ModelService.getModels();
        for (var i=0; i<models.length; i++)
        {
            // Check if the model is now visible on the screen
            var model = models[i];
            var isOnScreen = DemoUtils.isOnCamera(model.getMesh(), camera);

            // Model was hidden but is now shown
            if (isOnScreen && !model.isOnScreen)
            {
                $(document).trigger("modelShown.DemoSystem", {model: model});
            }
            // Model was on screen but is now hidden
            else if (!isOnScreen && model.isOnScreen)
            {
                $(document).trigger("modelHidden.DemoSystem", {model: model});
            }

            model.isOnScreen = isOnScreen;
        }

        // Check the triggers
        var triggers = TriggerService.getTriggers();
        for (var i=0; i<triggers.length; i++)
        {
            var trigger = triggers[i];

            // Extract camera position
            var origin = new THREE.Vector3().applyMatrix4(camera.matrixWorld);
            //var origin = new THREE.Vector3().setFromMatrixPosition(camera.matrixWorldInverse);

            // Direction to send the ray to
            var direction = new THREE.Vector3(0.0, -1.0, 0.0);
            direction = direction.unproject(camera).sub(origin).normalize();

            // Check if trigger has been triggered
            var result = TriggerService.getTriggerResult(trigger, origin, direction);

            if (result == -1) {
                $(document).trigger("areaLeave.DemoSystem", {trigger: trigger, position: origin});
            }
            else if (result == 1) {
                $(document).trigger("areaEnter.DemoSystem", {trigger: trigger, position: origin});
            }
        }
    };

})(TriggerController, jQuery);
