"use strict";
var Example = new Scene("Example Scene #1");
DemoService.registerScene(Example);

Example.init = function()
{
	this.createScene();

	// Make the controls and add the object (character) to scene
	// this.camera = new THREE.PerspectiveCamera(80, Statics.SCREEN_WIDTH / Statics.SCREEN_HEIGHT, 1, 1000);
	this.camera = new THREE.PerspectiveCamera(80, 400 / 300, 1, 1000);

	//this.controls = new CharacterControls(this.camera, Character.getMesh(), this.scene);
	//this.scene.add(this.controls.getObject());

	// Add models to the scene
	var models = ModelService.getModels();
	for (var i=0; i<models.length; i++)
	{
		var model = models[i];
		this.scene.add(model.getMesh());
	}

	// Add triggers to the scene
	// TODO Refactor these that this wouldn't need to be done
	var triggers = TriggerService.getTriggers();
	for (var i=0; i<triggers.length; i++)
	{
		var trigger = triggers[i];
		this.scene.add(trigger.getMesh());
	}

	// Setup interactions
	InteractionController.setScene(this.scene);
	//this.controls.onInteract(InteractionController.onInteract);

	// Setup renderer
	this.renderer = new THREE.WebGLRenderer({ antialias: true, clearAlpha: 1 });
	this.renderer.setClearColor(this.scene.fog.color);
	this.renderer.setPixelRatio(window.devicePixelRatio);
	this.renderer.autoClear = true;
	this.renderer.sortObjects = false;
	//this.renderer.setSize(Statics.SCREEN_WIDTH, Statics.SCREEN_HEIGHT);
	this.renderer.setSize(400, 300);
	this.renderer.shadowMapEnabled = true;
	this.renderer.shadowMapType = THREE.PCFSoftShadowMap;

	this.start = new Date();
	this.state++;
};

// Create scene and atmosphere
Example.createScene = function()
{
	// Scene
	this.scene = new THREE.Scene();
	this.scene.fog = new THREE.Fog(0x353355, 0, 750);

	// Lights
	this.scene.add(new THREE.AmbientLight(0xAABBBB, 0.75));

	var light = new THREE.DirectionalLight(0x4444CC, 0.2);
	light.position.set(-30.0, 200.0, 0.0);
	light.target.position.set(0.0, 10.0, 0.0);
	light.castShadow = true;

	light.shadowCameraVisible = false;
	light.shadowBias = 0.1;
	light.shadowDarkness = 0.7;
	light.shadowMapWidth = 512;
	light.shadowMapHeight = 512;

	this.scene.add(light);
};

// Render loop
Example.render = function()
{
	//this.controls.update();

	this.renderer.render(this.scene, this.camera);

	return this.state;
};

Example.pause = function(paused)
{
	this.paused = paused;
	//this.controls.enabled = !paused;
}

Example.unload = function()
{
	this.state = 0;
	this.reset();
};
