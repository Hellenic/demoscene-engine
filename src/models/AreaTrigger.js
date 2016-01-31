"use strict";
function AreaTrigger(width, depth, positionVector)
{
	var geometry = new THREE.BoxGeometry(width, 1.0, depth);
	var material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, visible: true });
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.copy(positionVector);

	this.mesh = mesh;
	this.active = false;
}
AreaTrigger.prototype.isActive = function() {
	return this.active;
};
AreaTrigger.prototype.setActive = function(bool) {
	this.active = bool;
};
AreaTrigger.prototype.getMesh = function() {
	return this.mesh;
};
