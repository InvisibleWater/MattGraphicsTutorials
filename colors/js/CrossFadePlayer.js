class CrossFadePlayer {
    constructor(canvas) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext("2d");
        this.buffer = new ImageData(this.width, this.height);
        this.weight = 0;
        this.playing = false;
        this.animationID;
        this.image1;
        this.image2;
    }

    init(promisedImages) {
        this.image1 = promisedImages[0];
        this.image2 = promisedImages[1];
    }

    render(time) {
        this.weight = (1.0 + Math.cos(time / 1000)) / 2;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let id = (y * this.width + x) * 4;

                this.buffer.data[id] = Math.floor(this.image1.data[id] * this.weight + this.image2.data[id] * (1 - this.weight));
                this.buffer.data[id + 1] = Math.floor(this.image1.data[id + 1] * this.weight + this.image2.data[id + 1] * (1 - this.weight));
                this.buffer.data[id + 2] = Math.floor(this.image1.data[id + 2] * this.weight + this.image2.data[id + 2] * (1 - this.weight));
                this.buffer.data[id + 3] = 255;
            }
        }

        this.context.putImageData(this.buffer, 0, 0);

        if (this.playing == true) {
            this.animationID = window.requestAnimationFrame(this.render.bind(this))
        }
    }
}