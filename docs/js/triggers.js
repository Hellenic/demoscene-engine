(function() {

    // Add triggers
    var testAreaTrigger = new AreaTrigger(50, 20, new THREE.Vector3(-50, 5, 120));
    TriggerService.registerAreaTrigger(testAreaTrigger);

    ActionService.registerAction(testAreaTrigger, "TestAction.json");

})();
