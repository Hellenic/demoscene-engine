"use strict";
var InteractionController = {};

/**
* InteractionController
*
* @class InteractionController
*/
(function(Controller, $) {

    var raycaster = new THREE.Raycaster();
    raycaster.far = 10.0;

    // Intersection hover object
    var geometry = new THREE.PlaneGeometry(5.0, 5.0);
    var material = new THREE.MeshLambertMaterial({ color: 0xAAAAFF });
    material.map = THREE.ImageUtils.loadTexture("textures/magnifier.png");
    material.transparent = true;
    var hoverMesh = new THREE.Mesh(geometry, material);
    hoverMesh.visible = false;

    var intersected = null;

    Controller.setScene = function(scene)
    {
        scene.add(hoverMesh);
    };

    Controller.update = function(camera)
    {
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld();

        // Origin to cast the ray from (camera)
        var origin = new THREE.Vector3(0.0, 0.0, 0.0).applyMatrix4(camera.matrixWorld);

        // Direction to send the ray to
        var direction = new THREE.Vector3(0.0, 0.0, 1.0);
        direction = direction.unproject(camera).sub(origin).normalize();
        raycaster.set(origin, direction);

        // Note! Raycaster.setFromCamera assumes that camera is not a child, so it's not gonna work in this case
        //raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);

        var interactiveObjects = ActionService.getInteractiveObjects(THREE.Mesh);
        var intersects = raycaster.intersectObjects(interactiveObjects, true);

        if (intersects.length > 0)
        {
            intersected = intersects[0];
            setIntersectionHover(camera, true, origin);
        }
        else
        {
            intersected = null;
            setIntersectionHover(camera, false, origin);
        }
    };

    Controller.onInteract = function()
    {
        if (intersected == null)
        {
            return;
        }

        $(document).trigger("interact.DemoSystem", {mesh: intersected.object});
    };

    var setIntersectionHover = function(camera, bool, origin)
    {
        if (bool)
        {
            var from = origin;
            var to = intersected.point;

            // Get a vector between from (A) and to (B), at 75% (X)
            // e.g.: A=======x==B
            var position = to.sub(from).multiplyScalar(0.75).add(from);
            hoverMesh.position.copy(position);

            // TODO Get proper rotation along the camera
            var rotationX = camera.parent.rotation.x;
            var rotationY = camera.parent.parent.rotation.y;
            hoverMesh.rotation.set(rotationX, rotationY, 0.0);

            hoverMesh.visible = true;
        }
        else
        {
            hoverMesh.position.set(0, 0, 0);
            hoverMesh.rotation.set(0, 0, 0);
            hoverMesh.visible = false;
        }
    }

})(InteractionController, jQuery);
