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
    this.rippleSize = 10000;
    this.animationID;
    this.lastTicks = 0;
    this.spawnInterval = 0.5;
  }

  init(imageData) {
    this.texture = imageData;
  }

  render(t) {
    let end = (this.height - 1) * this.width;
    let currentTicks = (t / 1000);

    if (currentTicks - this.lastTicks > this.spawnInterval) {
      const ry = Math.floor(Math.random() * this.height);
      const rx = Math.floor(Math.random() * this.width);
      this.source[ry * this.width + rx] = Math.round(Math.random() * this.rippleSize)
      this.lastTicks = currentTicks;
    }

    //Rendering
    
    this.context.putImageData(this.buffer, 0, 0);
    
    if (this.playing == true) {
      this.animationID = window.requestAnimationFrame(this.render.bind(this));
    }
  }
}
