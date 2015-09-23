"use strict";
var ShaderBox = new Model("Example Shader box");

ShaderBox.onLoad = function()
{
    var geometry = new THREE.BoxGeometry(20.0, 20.0, 20.0);
    var material = ShaderBox.getShaderMaterial();

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 15, -50);

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = false;

    ModelService.addModel(this);
    ActionService.registerAction(this.mesh, "ShaderBox.json");
};

ShaderBox.getShaderMaterial = function()
{
    var shaderMaterial = new THREE.ShaderMaterial({
        vertexShader: Shaders["basic.vs"],
        fragmentShader: Shaders["basic.fs"]
    });

    return shaderMaterial;
};
