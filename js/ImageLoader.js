/**
 * Promises an image of a given width and height generated using the given function.
 * @param {Number} w The width of the image.
 * @param {Number} h The height of the image.
 * @param {() => []} func A function that generates an array of four numbers, representing the color of a given pixel in the image.
 * @returns {Promise<ImageData>} A promise containing the ImageData of the generated image.
 */
function generateImage(w, h, func) {
    return new Promise(resolve => {
        let imageData = new ImageData(w, h);

        for (y = 0; y < h; y++) {
            for (x = 0; x < w; x++) {
                let id = (y * w + x) * 4;
                let c = func(x, y);

                imageData.data[id] = c[0];
                imageData.data[id+1] = c[1];
                imageData.data[id+2] = c[2];
                imageData.data[id+3] = c[3];
            }
        }

        resolve(imageData);
    });
}

/**
 * Promises image data based on a file at a given location.
 * @param {string} path The location of the image.
 * @returns {Promise<ImageData>} A promise containing the data of the given image.
 */
function loadImage(path) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => {
            let w = img.width;
            let h = img.height;

            let canvas = new OffscreenCanvas(w, h);
            let ctx = canvas.getContext("2d");

            try {
                if (ctx != null) {
                    ctx.drawImage(img, 0, 0, w, h);
                    let pixels = ctx.getImageData(0, 0, w, h);
    
                    resolve(pixels);
                }
            } catch(e) {
                reject(e);
            }
        }
        img.src = path;
    })
}