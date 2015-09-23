"use strict";

/**
* AudioPlayer
*
* @class AudioPlayer
*/
function AudioPlayer(id, autoplay, volume)
{
    this.element = null;
    this.media = null;

    this.element = $("<audio />");
    this.element.attr("id", id);

    if (autoplay)
        this.element.attr("autoplay", "autoplay");

    this.media = this.element.get(0);
    this.media.volume = volume;

    this.media.addEventListener("durationchange", this.onDurationChange, false);
    this.media.addEventListener("loadedmetadata", this.onLoadedMetadata, false);
    this.media.addEventListener("timeupdate", this.onTimeUpdate, false);
    this.media.addEventListener("playing", this.onStart, false);
    this.media.addEventListener("ended", this.onEnd, false);

    $("body").append(this.element);
}

AudioPlayer.prototype.setSource = function(url)
{
    this.media.pause();
    this.media.setAttribute("src", url);
    this.media.load();
};
AudioPlayer.prototype.play = function()
{
    this.media.play();
};
AudioPlayer.prototype.pause = function()
{
    this.media.pause();
};
AudioPlayer.prototype.stop = function()
{
    this.media.pause();
    this.media.currentTime = 0;
};

AudioPlayer.prototype.onDurationChange = function(event)
{
};
AudioPlayer.prototype.onLoadedMetadata = function(event)
{
};
AudioPlayer.prototype.onTimeUpdate = function(event)
{
};
AudioPlayer.prototype.onStart = function(event)
{
    $(document).trigger("soundStart.DemoSystem");
};
AudioPlayer.prototype.onEnd = function(event)
{
    $(document).trigger("soundEnd.DemoSystem");
};
