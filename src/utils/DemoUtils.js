'use strict';

/**
* TODO Finish ES6 transform, DemoUtils
*/
class DemoUtils {

    constructor() {

    }

    /**
    * Checks if given string parameter is empty or null.
    *
    * @param {string} string - String to be checked if it's an empty string
    * @public
    */
    static isEmptyString(param)
    {
        if (typeof(param) !== "string" || param == null || param.length <= 0)
            return true;

        return false;
    }


    static getFilename(file)
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

    static getUrlParam(name)
    {
        var results = new RegExp('[\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
        if (results == null)
            return 0;

        return results[1]
    }

    static toScreenXY(position, camera, jqdiv)
    {
        var pos = position.clone();
        projScreenMat = new THREE.Matrix4();
        projScreenMat.multiply(camera.projectionMatrix, camera.matrixWorldInverse);
        projScreenMat.multiplyVector3(pos);

        var x = (pos.x + 1) * jqdiv.width() / 2 + jqdiv.offset().left;
        var y = (-pos.y + 1) * jqdiv.height() / 2 + jqdiv.offset().top;

        return {x: x, y: y};
    }

    static isOnCamera(mesh, camera)
    {
        //camera.updateMatrix();
        //camera.updateMatrixWorld();
        //camera.matrixWorldInverse.getInverse( camera.matrixWorld );

        //mesh.updateMatrix();
        //mesh.updateMatrixWorld();

        var frustum = new THREE.Frustum();
        frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));

        return frustum.intersectsObject(mesh);
    }

    /**
    * Get jQuery loader based on the file extension.
    */
    static getLoader(file)
    {
        // Use $.get for shaders
        if (file.indexOf(".glsl") > 0)
        {
            return $.get;
        }

        // Otherwise just loading scripts
        return $.getScript;
    }
}

export default DemoUtils;
