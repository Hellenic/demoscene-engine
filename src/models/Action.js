"use strict";
function Action(linearForce, angularForce, text, sound, event, triggerTimes, targetModel)
{
	this.linearForce = linearForce;
	this.angularForce = angularForce;
	this.text = text;
	this.sound = sound;
	this.event = event;
	this.triggerTimes = triggerTimes;
	this.timesTriggered = 0;
	this.targetModel = targetModel;

	// TODO Animation, like constant rotation
}
Action.prototype.fromJSON = function(jsonObject)
{
	this.linearForce = jsonObject.linearForce;
	this.angularForce = jsonObject.angularForce;
	this.text = jsonObject.text;
	this.sound = jsonObject.sound;
	this.event = jsonObject.event;
	this.triggerTimes = jsonObject.triggerTimes;
	this.timesTriggered = 0;
	this.targetModel = jsonObject.targetModel;

	return this;
};
