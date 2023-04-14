class NoiseAnimation {
    constructor(canvas) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.depth = 64;
        this.context = canvas.getContext("2d");
        this.noise = [];
        this.buffer = new ImageData(this.width, this.height);
        this.playing = false;
        this.animationID = null;
    }

    init() {
        for (let z = 0; z < this.depth; z++) {
            this.noise[z] = [];
            for (let y = 0; y < this.height; y++) {
                this.noise[z][y] = [];
                for (let x = 0; x < this.width; x++) {
                    this.noise[z][y][x] = Math.random();
                }
            }
        }
    }

    smoothNoise(x, y, z) {
        let fractX = x - ~~x;
        let fractY = y - ~~y;
        let fractZ = z - ~~z;

        let x1 = (~~x + this.width) % this.width;
        let y1 = (~~y + this.height) % this.height;
        let z1 = (~~z + this.depth) % this.depth;

        let x2 = (~~x + this.width - 1) % this.width;
        let y2 = (~~y + this.height - 1) % this.height;
        let z2 = (~~z + this.depth - 1) % this.depth;

        let value = 0.0;
        value += fractX * fractY * fractZ * this.noise[z1][y1][x1];
        value += fractX * (1 - fractY) * fractZ * this.noise[z1][y2][x1];
        value += (1 - fractX) * fractY * fractZ * this.noise[z1][y1][x2];
        value += (1 - fractX) * (1 - fractY) * fractZ * this.noise[z1][y2][x2];

        value += fractX * fractY * (1 - fractZ) * this.noise[z2][y1][x1];
        value += fractX * (1 - fractY) * (1 - fractZ) * this.noise[z2][y2][x1];
        value += (1 - fractX) * fractY * (1 - fractZ) * this.noise[z2][y1][x2];
        value += (1 - fractX) * (1 - fractY) * (1 - fractZ) * this.noise[z2][y2][x2];

        return value;
    } 

    turbulence(x, y, z, size) {
        let value = 0.0;
        let initialSize = size;

        while (size >= 1) {
            value += this.smoothNoise(x / size, y / size, z / size) * size;
            size /= 2.0;
        }

        return (128.0 * value / initialSize)
    }

    render(time) {
        let animTime = time / 40;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let id = (y * this.width + x) * 4;
                let l = 192 + Math.floor(this.turbulence(x, y, animTime, 32) % 256) / 4;
                let c = hslToRgb(169 / 255, 1, l / 255);

                this.buffer.data[id] = c[0];
                this.buffer.data[id+1] = c[1];
                this.buffer.data[id+2] = c[2];
                this.buffer.data[id+3] = 255;
            }
        }

        this.context.putImageData(this.buffer, 0, 0);

        if (this.playing == true) {
            this.animationID = window.requestAnimationFrame(this.render.bind(this))
        }
    }
}