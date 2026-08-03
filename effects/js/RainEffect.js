class RainEffect {
  constructor(canvas) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = canvas.getContext("2d");
    this.buffer = new ImageData(this.width, this.height);
    this.source = new Int16Array(this.width * this.height);
    this.dest = new Int16Array(this.width * this.height);
    this.playing = false;
    this.texture;
    this.widthMask = 0;
    this.heightMask = 0;
    this.rippleSize = 0x3000;
    this.animationID;
    this.lastTicks = 0;
    this.spawnInterval = 0.5;
  }

  init(imageData) {
    this.texture = imageData;
    this.widthMask = imageData.width - 1;
    this.heightMask = imageData.height - 1;
  }

  render(t) {
    const end = (this.height - 1) * this.width;
    const currentTicks = (t / 1000);

    if (currentTicks - this.lastTicks > this.spawnInterval) {
      const ry = Math.floor(Math.random() * this.height);
      const rx = Math.floor(Math.random() * this.width);
      this.source[ry * this.width + rx] = Math.round(Math.random() * this.rippleSize)
      this.lastTicks = currentTicks;
    }

    for (i = this.width; i < end; i++) {
      this.dest[i] = ((this.source[i - 1] + this.source[i + 1] + this.source[i - this.width] + this.source[i + this.width]) >> 1) - this.dest[i]
      this.dest[i] -= (this.dest[i] >> 5)
    }
    const tmp = this.dest;
    this.dest = this.source;
    this.source = tmp;

    for (let y = 1; y < this.height - 1; y++) {
      const ofs = y * this.width;
      for (let x = 1; x < this.width - 1; x++) {
        const dx = this.source[ofs + x - 1] - this.source[ofs + x + 1];
        const dy = this.source[ofs + x - this.width] - this.source[ofs + x + this.width];
        const tx = ((y + dy) & this.heightMask) * this.texture.width * 4 + ((x + dx) & this.widthMask) * 4;

        let r = this.texture.data[tx];
        let g = this.texture.data[tx + 1];
        let b = this.texture.data[tx + 2];

        let idx = (ofs + x) * 4;

        this.buffer.data[idx] = Math.min(Math.max(r - dx, 0), 255);
        this.buffer.data[idx + 1] = Math.min(Math.max(g - dx, 0), 255);
        this.buffer.data[idx + 2] = Math.min(Math.max(b - dx, 0), 255);
        this.buffer.data[idx + 3] = 255;
      }
    }
    
    this.context.putImageData(this.buffer, 0, 0);
    
    if (this.playing == true) {
      this.animationID = window.requestAnimationFrame(this.render.bind(this));
    }
  }
}
