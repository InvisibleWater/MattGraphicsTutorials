class FireEffect {

    constructor(canvas) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext("2d");
        this.buffer = new ImageData(this.width, this.height);
        this.fire = [];
        this.palette = new Array(256);
        this.playing = false;
        this.randomizeBuffer = true;
        this.multiplier = 32;
        this.divisor = 129;
        this.animationID;
    }

    init() {
        for (let c = 0; c < this.palette.length; c++) {
            this.palette[c] = hslToRgb((c / 3) / 256, 1, Math.min(c * 2, 255) / 256);
        }

        for (let y = 0; y < this.height; y++) {
            this.fire[y] = [];

            for (let x = 0; x < this.width; x++) {
                this.fire[y][x] = 0;
            }
        }

        if (this.randomizeBuffer == false) {
            for (let i = 0; i < this.width; i++) {
                this.fire[this.height - 1][i] = Math.floor(Math.random() * 256);
            }
        }
    }

    render() {
        if (this.randomizeBuffer == true) {
            for (let i = 0; i < this.width; i++) {
                this.fire[this.height - 1][i] = Math.floor(Math.random() * 256);
            }
        }

        for (let y = 0; y < this.height - 1; y++) {
            for (let x = 0; x < this.width; x++) {
                this.fire[y][x] = ((this.fire[(y + 1) % this.height][(x - 1 + this.width) % this.width] + this.fire[(y + 1) % this.height][x % this.width] + this.fire[(y + 1) % this.height][(x + 1) % this.width] + this.fire[(y + 2) % this.height][x % this.width]) * this.multiplier) / this.divisor;
            }
        }

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let id = (y * this.width + x) * 4;
                let color = this.palette[~~(this.fire[y][x])];

                this.buffer.data[id] = color[0];
                this.buffer.data[id+1] = color[1];
                this.buffer.data[id+2] = color[2];
                this.buffer.data[id+3] = 255;
            }
        }

        this.context.putImageData(this.buffer, 0, 0);
        
        if (this.playing == true) {
            this.animationID = window.requestAnimationFrame(this.render.bind(this));
        }
    }
}