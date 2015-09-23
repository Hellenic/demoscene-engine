"use strict";
function Scene(name)
{
	this.state = 0;
	this.name = (name) ? name : "Default scene";
	this.renderer = null;
	this.scene = null;
	this.camera = null;
}
Scene.prototype.init = function() {

};
Scene.prototype.render = function() {

};
Scene.prototype.unload = function() {

};
Scene.prototype.resize = function() {
	this.camera.aspect = window.innerWidth / window.innerHeight;
	this.camera.updateProjectionMatrix();
	this.renderer.setSize(window.innerWidth, window.innerHeight);
};
Scene.prototype.pause = function(boolean) {

}
Scene.prototype.reset = function() {
	this.state = 0;
	this.renderer.clear();
	this.renderer = null;
	this.scene = null;
	this.camera = null;
};
