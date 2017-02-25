/* jshint esnext: true */
/* globals */

/***************** *
 * Image
 *
 * Add an element to accept an image from anywhere on the web!
 *
 * Requires:
 *
 * - Canvas
 *
 * *****************/

var image = new Image();
var otherImageData;
image.crossOrigin = "Anonymous";
otherImageData = imageData;

image.addEventListener('load', function() {
  context.drawImage(image, 0, 0, width, height)
  imageData = context.getImageData(0, 0, width, height);
  otherImageData = context.getImageData(0, 0, width, height);
  populateFromImage(otherImageData.data);
  draw();
}, false);

imageBtn.addEventListener('click', function (evt) {
  image.src = imageUrl.value;
});

/**
 * Populate the game from image data
 */
function populateFromImage(data) {
  for (var n = 0; n < data.length / 4; n += 1) {
    if (data[n * 4] > 200) {
      live(Math.floor(n));
    }
  }
}

/**
 * Update our canvas to set cell n to the given red, green, and blue values
 * when it is drawn.
 */
function updateCell(n, callback) {
  n = n * 4;
  var rgba = callback(imageData.data[n], imageData.data[n + 1],
                      imageData.data[n + 2], imageData.data[n + 3],
                      otherImageData.data[n], otherImageData.data[n + 1],
                      otherImageData.data[n + 2], otherImageData.data[n + 3]
                     );
  imageData.data[n] = rgba[0];
  imageData.data[n + 1] = rgba[1];
  imageData.data[n + 2] = rgba[2];
  imageData.data[n + 3] = rgba[3];
}

/*
 * Update image data to make cell N alive.  0, 0, 0 is black.
 */
function updateLiveCell(n) {
  updateCell(n, (r, g, b, a, ir, ig, ib, ia) =>
              [r * 3, g * 2, b * 1.25, a]
            );
}

/*
 * Update image data to make cell N dead. 255, 255, 255 is white.
 */
function updateDeadCell(n) {
  updateCell(n, (r, g, b, a, ir, ig, ib, ia) =>
              //[r * 0.75, g * 0.75, b * 0.75, a]
              [(r + ir) / 2, (g + ig) / 2, (b + ig) / 2, 255]
            );
}
