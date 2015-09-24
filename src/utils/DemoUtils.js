var DemoUtils = {};

DemoUtils.getFilename = function(file)
{
    var filename = file;
    if (filename.indexOf("/") >= 0)
    {
        filename = filename.substring(filename.lastIndexOf("/")+1);
    }

    if (filename.indexOf(".") < 0)
        return filename;

    return filename.substring(0, filename.lastIndexOf("."));
}

DemoUtils.toScreenXY = function(position, camera, jqdiv)
{
    var pos = position.clone();
    projScreenMat = new THREE.Matrix4();
    projScreenMat.multiply(camera.projectionMatrix, camera.matrixWorldInverse);
    projScreenMat.multiplyVector3(pos);

    var x = (pos.x + 1) * jqdiv.width() / 2 + jqdiv.offset().left;
    var y = (-pos.y + 1) * jqdiv.height() / 2 + jqdiv.offset().top;

    return {x: x, y: y};
}

DemoUtils.isOnCamera = function(mesh, camera)
{
    //camera.updateMatrix();
    //camera.updateMatrixWorld();
    //camera.matrixWorldInverse.getInverse( camera.matrixWorld );

    //mesh.updateMatrix();
    //mesh.updateMatrixWorld();

    var frustum = new THREE.Frustum();
    frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));

    return frustum.intersectsObject(mesh);
};
