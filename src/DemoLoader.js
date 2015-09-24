'use strict';

import Utils from './core/LoaderUtils';
import Progress from './core/Progress';

/**
* DemoLoader is a loader for DemoScene system. Loader will load the actual DemoScene system
* but also every other script it's given. Once the loading is completed, it will initialize
* the DemoScene system.
*
* TODO Finish ES6 transform
* TODO Use https://babeljs.io/docs/learn-es2015/#module-loaders or some other system to dynamically load modules
*/
class DemoLoader {

    constructor()
    {
        this.initialScripts = [];
        this.scripts = [];
        this.initialsLoaded = false;

        this.progress = new Progress();
    }

    addScripts(scripts, initial, callback)
    {
        for (var i=0; i<scripts.length; i++)
        {
            var script = scripts[i];
            this.addScript(script, initial, callback);
        }
    }

    addScript(scriptData, initial, callback)
    {
        var scriptObj = this.getScriptObject(scriptData, callback);
        if (initial)
        {
            this.initialScripts.push(scriptObj);
        }
        else
        {
            this.scripts.push(scriptObj);
        }
    }

    doLoad()
    {
        // Get next script to load
        var scriptObject = this.getNextScript();

        // If nothing to load, broadcast and quit
        if (!scriptObject)
        {
            // Broadcast event that everything was loaded
            $(document).trigger("loaderDone.DemoSystem");
            return;
        }

        $(document).trigger("loaderTick.DemoSystem", {name: scriptObject.name, file: scriptObject.file});

        var $loader = Utils.getLoader(scriptObject.file);
        var thisRef = this;

        // Load the script
        $loader(scriptObject.file).done(function(script, textStatus)
        {
            // After loading, execute callback
            if (typeof(scriptObject.callback) === "function")
            {
                // That script callback, will get secondary callback, which should
                // continue this loading when ready.
                return scriptObject.callback(scriptObject.name, scriptObject.file, script, function() {
                    thisRef.doLoad();
                });
            }

            // When done with this file, load more
            thisRef.doLoad();
        })
        .fail(function(jqxhr, settings, exception)
        {
            console.error("Loading failed! File: "+ scriptObject.file +" // Status: "+ jqxhr.status, exception);
        });
    }

    getNextScript()
    {
        // Get the prioritized non-empty array
        var scriptArray = this.getScriptArray();
        if (scriptArray == null)
            return null;

        // Return the next script object fromt he list
        return scriptArray.shift();
    }

    getScriptArray()
    {
        if (this.initialScripts.length > 0)
            return this.initialScripts;

        if (!this.initialsLoaded)
        {
            this.initialsLoaded = true;
            $(document).trigger("loaderReady.DemoSystem")
        }

        if (this.scripts.length > 0)
            return this.scripts;

        return null;
    }

    getScriptObject(scriptData, callback)
    {
        var name = "";
        var file = "";

        if (typeof(scriptData) === "object")
        {
            name = scriptData.name;
            file = scriptData.file;
        }
        else
        {
            name = Utils.getFilename(scriptData);
            file = scriptData;
        }

        return {name: name, file: file, callback: callback};
    }

    getFilename(file)
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

    start()
    {
        // Count scripts
        var scriptCount = this.initialScripts.length + this.scripts.length +1;

        // Broadcast event that loading is about to start
        $(document).trigger("loaderStart.DemoSystem", {fileCount: scriptCount});

        // Start loading from the initial scripts
        this.doLoad();
    }
}

export default DemoLoader;
