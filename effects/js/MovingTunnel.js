class MovingTunnel {
    constructor(canvas) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext("2d");
        this.buffer = new ImageData(this.width * 2, this.height * 2);
        this.distanceTable = [];
        this.angleTable = [];
        this.texture;
        this.playing = false;
        this.animationID;
    };

    init(imageData) {
        this.texture = imageData;

        for (let x = 0; x < this.buffer.width; x++) {
            this.distanceTable[x] = new Int8Array(this.buffer.height);
            this.angleTable[x] = new Uint8Array(this.buffer.height);

            let sqx = Math.pow(x - this.width, 2);
            for (let y = 0; y < this.buffer.height; y++) {
                let sqy = Math.pow(y - this.height, 2);
                let ratio = 32.0;

                let distance = ~~(ratio * imageData.height / Math.sqrt(sqx + sqy)) % imageData.height;
                let angle = ~~(0.5 * imageData.width * Math.atan2(y - this.height, x - this.width)) / Math.PI;

                this.distanceTable[x][y] = distance;
                this.angleTable[x][y] = angle;
            }
        }
    }

    render(time) {
        let animation = time / 1000;

        let shiftX = ~~(this.texture.width * animation);
        let shiftY = ~~(this.texture.height * 0.25 * animation);
        let shiftLookX = this.width / 2 + ~~(this.width / 2 * Math.sin(animation));
        let shiftLookY = this.height / 2 + ~~(this.height / 2 * Math.sin(animation * 2));

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let id = (y * this.buffer.width + x) * 4;
                let d = ~~(this.distanceTable[x + shiftLookX][y + shiftLookY] + shiftX) % this.texture.width;
                let a = ~~(this.angleTable[x + shiftLookX][y + shiftLookY] + shiftY) % this.texture.height;
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