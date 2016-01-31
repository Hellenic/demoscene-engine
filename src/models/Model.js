"use strict";
function Model(name, files)
{
	this.name = (name) ? name : "Default Model";
	this.files = files || [];
	this.mesh = new THREE.Object3D();
	this.isOnScreen = false;
	this.actions = {};
}

Model.prototype.beforeLoad = function() {

};
Model.prototype.onLoad = function() {

};
Model.prototype.animate = function() {

};
Model.prototype.getMesh = function() {
	return this.mesh;
};
Model.prototype.unload = function() {
	this.mesh.remove();
	this.mesh = null;
	this.files = null;
};
