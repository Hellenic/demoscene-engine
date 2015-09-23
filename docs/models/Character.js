"use strict";
var Character = new Model("Character");

Character.onLoad = function()
{
    var height = 15.0;
    var radius = 3.0;

    var model = new THREE.CylinderGeometry(radius, radius, height, 8, 1, false);
    var material = new THREE.MeshLambertMaterial({ color: 0xAAAAFF, shading: THREE.FlatShading });
    this.mesh = new THREE.Mesh(model, material);
    this.mesh.position.set(-15, height/2, 80);

    this.mesh.castShadow = true;
};
