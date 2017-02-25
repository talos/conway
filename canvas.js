/* jshint esnext: true */
/* globals document, Uint8ClampedArray */

/***************** *
 * Canvas
 *
 * Get the objects that give us access to our canvas drawing space, as well as
 * functions that make it easier for us to draw to it.
 *
 * *****************/

// We can modify and access any of our HTML in JavaScript by its "id".

// To draw to a canvas, we have to get its  "context".
var context = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

// Every pixel on a canvas is represented in its "ImageData", which we can then
// modify pixel-by-pixel to change what's drawn on the canvas.
var imageData = context.getImageData(0, 0, width, height);

// We start by filling the canvas with our starting data (pure white, no
// transparency).
imageData.data.fill(255);

/**
 * This function draws our image data to canvas.
 */
function draw() {
  context.putImageData(imageData, 0, 0);
}

/**
 * Update our canvas to set cell n to the given red, green, and blue values
 * when it is drawn.
 */
function updateCell(n, callback) {
  n = n * 4;
  var rgba = callback(imageData.data[n], imageData.data[n + 1],
                      imageData.data[n + 2], imageData.data[n + 3]);
  imageData.data[n] = rgba[0];
  imageData.data[n + 1] = rgba[1];
  imageData.data[n + 2] = rgba[2];
  imageData.data[n + 3] = rgba[3];
}

/*
 * Update image data to make cell N alive.  0, 0, 0 is black.
 */
function updateLiveCell(n) {
  updateCell(n, (r, g, b, a) => [0, 0, 0, 255]);
}

/*
 * Update image data to make cell N dead. 255, 255, 255 is white.
 */
function updateDeadCell(n) {
  updateCell(n, (r, g, b, a) => [255, 255, 255, 255]);
}

/**
 * Example code below! Uncomment to draw a black, red, green, and blue pixels
 * in one row, and black pixels below them.
 */

//updateCell(100, 0, 0, 0);
//updateCell(101, 255, 0, 0);
//updateCell(102, 0, 255, 0);
//updateCell(103, 0, 0, 255);

//updateCell(200, 0, 0, 0);
//updateCell(201, 0, 0, 0);
//updateCell(202, 0, 0, 0);
//updateCell(203, 0, 0, 0);

//draw();
