"use strict";
var PhysicsService = {};

/**
* PhysicsService
*
* @class PhysicsService
*/
(function(Service) {

    function isPhysijs(mesh)
    {
        return (mesh instanceof Physijs.Mesh);
    };

    Service.applyAngularForce = function(mesh, force)
    {
        if (!isPhysijs(mesh))
            return;

        var angularForce = new THREE.Vector3(force.x, force.y, force.z);
        mesh.setAngularVelocity(angularForce);
    };

    Service.applyLinearForce = function(mesh, force)
    {
        if (!isPhysijs(mesh))
            return;

        //var movementForce = mesh.getLinearVelocity();
        var rotationMatrix = new THREE.Matrix4().extractRotation(mesh.matrix);
        var movementForce = new THREE.Vector3(force.x, force.y, force.z).applyMatrix4(rotationMatrix);

        mesh.setLinearVelocity(movementForce);
    };

})(PhysicsService);
