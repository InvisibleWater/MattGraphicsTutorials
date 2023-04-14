class EffectPlayer {
    constructor(effect, width, height) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.display = "block";
        this.canvas.style.border = "1px solid white";
        this.canvas.style.backgroundColor = "black";
        this.fx = new effect(this.canvas);
        this.fxLoadedPromise;
        this.playButton = document.createElement("button");
        this.playButton.innerHTML = "Play";
        this.playButton.style.marginLeft = "2.5%";
        this.playButton.onclick = () => {
            if (this.fx.playing != true) {
                this.fx.playing = true;
                this.playButton.innerHTML = "Stop";
                this.fx.animationID = window.requestAnimationFrame(this.fx.render.bind(this.fx));
            } else {
                window.cancelAnimationFrame(this.fx.animationID);
                this.fx.playing = false;
                this.playButton.innerHTML = "Play";
            }
        }
    }

    async load(imagePromise) {
        this.fxLoadedPromise = imagePromise.then(this.fx.init.bind(this.fx));
    }

    render(container) {
        container.appendChild(this.canvas);
        container.appendChild(this.playButton);
    }
}