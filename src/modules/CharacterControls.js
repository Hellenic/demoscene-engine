"use strict";
/**
* Demo controls for player
* CharacterControls :: PointerLockControls with PhysiJS
* @author hannuk
*
* Based on PointerLockControls.js by mrdoob / http://mrdoob.com/
*/
var CharacterControls = function(camera, character, scene)
{
	var scope = this;

	// Uncomment to set "3rd person fake"
	//camera.position.copy(character.position);
	//camera.rotation.copy(character.rotation);

	// Pitch object for mouse movement (w/ camera attached to it)
	var pitchObject = new THREE.Object3D();
	pitchObject.position.y = character.position.y;
	pitchObject.add(camera);

	// Character (move & yaw), with pitch object attached
	character.add(pitchObject);
	character.setAngularFactor(new THREE.Vector3(0, 0, 0));
	character.setLinearFactor(new THREE.Vector3(0, 0, 0));

	var KEYS = {
		FORWARD : false,
		BACKWARD : false,
		LEFT : false,
		RIGHT : false,
		SPACE : false
	}

	var mass = 100.0;
	var sensitivity = 0.002;
	var movementSpeed = 400.0;
	var yawLimit = 1.3; // Math.PI / 2;
	var clock = new THREE.Clock();
	var velocity = new THREE.Vector3();
	var rotation = new THREE.Vector3();
	var mouse = new THREE.Vector2();

	var callbacks = {onInteract: function(){}, onMove: function(){}};

	this.enabled = false;

	var onMouseMove = function(event)
	{
		if (scope.enabled === false)
			return;

		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		// Save the rotation to variable and set it to objects later
		// so that we don't change rotations in two different places
		rotation.x -= movementY * sensitivity;
		rotation.x = Math.max(-yawLimit, Math.min(yawLimit, rotation.x));;
		rotation.y -= movementX * sensitivity;

		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	};

	var onKeyDown = function(event)
	{
		switch (event.keyCode)
		{
			case 38: // up
			case 87: // w
			KEYS.FORWARD = true;
			break;
			case 37: // left
			case 65: // a
			KEYS.LEFT = true;
			break;
			case 40: // down
			case 83: // s
			KEYS.BACKWARD = true;
			break;
			case 39: // right
			case 68: // d
			KEYS.RIGHT = true;
			break;
			case 32: // Space
			KEYS.SPACE = true;
			callbacks.onInteract();
			break;
		}
	};

	var onKeyUp = function(event)
	{
		switch(event.keyCode)
		{
			case 38: // up
			case 87: // w
			KEYS.FORWARD = false;
			break;
			case 37: // left
			case 65: // a
			KEYS.LEFT = false;
			break;
			case 40: // down
			case 83: // s
			KEYS.BACKWARD = false;
			break;
			case 39: // right
			case 68: // d
			KEYS.RIGHT = false;
			break;
			case 32: // Space
			KEYS.SPACE = false;
			break;
		}
	};

	document.addEventListener("mousemove", onMouseMove, false);
	document.addEventListener("keydown", onKeyDown, false);
	document.addEventListener("keyup", onKeyUp, false);

	this.getObject = function()
	{
		return character;
	};

	this.onMove = function(callback)
	{
		callbacks.onMove = callback;
	};

	this.onInteract = function(callback)
	{
		callbacks.onInteract = callback;
	};

	this.update = function()
	{
		if (scope.enabled === false)
		{
			this.preventFallingRotation();
			return;
		}

		var delta = clock.getDelta();
		var movementForce = character.getLinearVelocity();
		var rotationMatrix = new THREE.Matrix4().extractRotation(character.matrix);
		var speedMultiplier = 3;
		var ySpeed = movementForce.y;
		var zSpeed = 0.0;

		if (!this.isFalling(character))
		{
			if (KEYS.FORWARD)
			{
				zSpeed = -(movementSpeed * delta) * speedMultiplier;
				movementForce = new THREE.Vector3(0.0, ySpeed, zSpeed).applyMatrix4(rotationMatrix);
			}
			else if (KEYS.BACKWARD)
			{
				zSpeed = (movementSpeed * delta) * speedMultiplier;
				movementForce = new THREE.Vector3(0.0, ySpeed, zSpeed).applyMatrix4(rotationMatrix);
			}
			if (KEYS.LEFT)
			{
				// TODO Reduce speed if zSpeed > 0
				var xSpeed = -(movementSpeed * delta) * speedMultiplier;
				movementForce = new THREE.Vector3(xSpeed, ySpeed, zSpeed).applyMatrix4(rotationMatrix);
			}
			else if (KEYS.RIGHT)
			{
				var xSpeed = (movementSpeed * delta) * speedMultiplier;
				movementForce = new THREE.Vector3(xSpeed, ySpeed, zSpeed).applyMatrix4(rotationMatrix);
			}

			// Apply movement speed based on keys
			character.setLinearVelocity(movementForce);
		}

		// Apply rotation from mouse movement
		pitchObject.rotation.x = rotation.x;
		character.rotation.y = rotation.y;
		this.preventFallingRotation();
	};

	this.isFalling = function(object)
	{
		var movementForce = character.getLinearVelocity();
		if (movementForce.y < -1)
		{
			return true;
		}

		return false;
	};

	this.preventFallingRotation = function()
	{
		character.rotation.x = 0;
		character.rotation.z = 0;
		character.__dirtyRotation = true;
		character.setAngularVelocity(new THREE.Vector3(0.0, 0.0, 0.0));
	};
};
