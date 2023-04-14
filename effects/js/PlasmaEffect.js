class PlasmaEffect {
    constructor(canvas) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext("2d");
        this.palette = new Array(256);
        this.plasma = [];
        this.buffer = new ImageData(this.width, this.height);
        this.playing = false;
        this.animationID;
    }

    init(plasmaGen) {
        for (let c = 0; c < this.palette.length; c++) {
            this.palette[c] = hsvToRgb(c / 256, 1, 1);
        }

        for (let y = 0; y < this.height; y++) {
            this.plasma[y] = [];

            for (let x = 0; x < this.width; x++) {
                this.plasma[y][x] = ~~plasmaGen(x, y);
            }
        }
    }

    render(time) {
        let paletteShift = Math.floor(time / 10);

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let id = (y * this.width + x) * 4;
                let color = this.palette[(this.plasma[y][x] + paletteShift) % this.palette.length];

                this.buffer.data[id] = color[0];
                this.buffer.data[id+1] = color[1];
                this.buffer.data[id+2] = color[2];
                this.buffer.data[id+3] = 255;
            }
        }

        this.context.putImageData(this.buffer, 0, 0);
        
        if (this.playing == true) {
            this.animationID = window.requestAnimationFrame(this.render.bind(this))
        }
    }
}