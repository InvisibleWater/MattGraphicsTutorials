class RGBPlasmaEffect {
    constructor(canvas) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext("2d");
        this.buffer = new ImageData(this.width, this.height);
        this.playing = false;
        this.animationID;
    }

    getDist(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }

    render(time) {
        let plasmaTime = time / 50;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let value = Math.sin(this.getDist(x + plasmaTime, y, 128, 128) / 8) + Math.sin(this.getDist(x, y, 64, 64) / 8) + Math.sin(this.getDist(x, y + plasmaTime / 7, 192, 64) / 7) + Math.sin(this.getDist(x, y, 192, 100) / 8.0);
                let color = Math.floor(4 + value) * 32;
                let id = (y * this.width + x) * 4;

                this.buffer.data[id] = color;
                this.buffer.data[id+1] = color * 2;
                this.buffer.data[id+2] = 255 - color;
                this.buffer.data[id+3] = 255;
            }
        }
        this.context.putImageData(this.buffer, 0, 0);

        if (this.playing == true) {
            window.requestAnimationFrame(this.render.bind(this))
        }
    }
}