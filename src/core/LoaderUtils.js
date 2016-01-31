'use strict';

/**
* TODO Finish ES6 transform, DemoUtils
*/
class LoaderUtils {

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
            return null;

        return results[1];
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

export default LoaderUtils;
