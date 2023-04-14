class StaticTunnel {
    constructor(canvas) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext("2d");
        this.buffer = new ImageData(this.width, this.height);
        this.distanceTable = [];
        this.angleTable = [];
        this.texture;
        this.playing = false;
        this.animationID;
    };

    init(imageData) {
        this.texture = imageData;

        for (let y = 0; y < this.height; y++) {
            this.distanceTable[y] = new Int8Array(this.width);
            this.angleTable[y] = new Uint8Array(this.width);

            let sqy = Math.pow(y - this.height / 2, 2);
            for (let x = 0; x < this.width; x++) {
                let sqx = Math.pow(x - this.width / 2, 2);
                let ratio = 32.0;

                let distance = ~~(ratio * imageData.height / Math.sqrt(sqx + sqy)) % imageData.height;
                let angle = ~~(0.5 * imageData.width * Math.atan2(y - this.height / 2, x - this.width / 2)) / Math.PI;

                this.distanceTable[y][x] = distance;
                this.angleTable[y][x] = angle;
            }
        }
    }

    render(time) {
        let animation = time / 1000;

        let shiftX = ~~(this.texture.width * animation);
        let shiftY = ~~(this.texture.height * 0.25 * animation);

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let id = (y * this.width + x) * 4;
                let d = ~~(this.distanceTable[y][x] + shiftX) % this.texture.width;
                let a = ~~(this.angleTable[y][x] + shiftY) % this.texture.height;
                let tex = (a * this.texture.width + d) * 4;

                this.buffer.data[id] = this.texture.data[tex];
                this.buffer.data[id+1] = this.texture.data[tex+1];
                this.buffer.data[id+2] = this.texture.data[tex+2];
                this.buffer.data[id+3] = this.texture.data[tex+3];
            }
        }

        this.context.putImageData(this.buffer, 0, 0);

        if (this.playing == true) {
            this.animationID = window.requestAnimationFrame(this.render.bind(this));
        }
    }
}