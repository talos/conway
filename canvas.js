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

// Keep track of how big our drawing space is.  Since a pixel is very small, we
// "scale" by a factor where each pixel of data we keep is rendered as a square
// this number of pixels on each side.  We then only have to store data for
// that much smaller number of pixels
var scale = 5;
var width = canvas.width / scale;
var height = canvas.height / scale;

// Every pixel on a canvas is represented in its "ImageData", which we can then
// modify pixel-by-pixel to change what's drawn on the canvas.
var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

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
function updateCell(n, r, g, b) {
  // Update image data, which is scaled differently than our underlying data

  // First, obtain x and y values from n
  var x = n % width;
  var y = (n - x) / width;

  // Figure out the equivalent "scaled" n on our canvas.  To do so we need to
  // scale the x coordinate once, but the y coordinate twice.
  var scalen = (x * scale) + (y * scale * scale * width);

  // Fill the square of dimension (scale x scale) with the rgb value we've
  // specified.  We iterate over every x,y value in the square, calculate its
  // location (n_), and then adjust the r, g, b bands individually.  r is in
  // the same position as n_, g is one further, and b is two further.
  var n_;
  for (x = 0 ; x < scale ; x += 1) {
    for (y = 0 ; y < scale ; y += 1) {
      n_ = scalen + x + (y * width * scale);
      imageData.data[n_ * 4] = r;
      imageData.data[n_ * 4 + 1] = g;
      imageData.data[n_ * 4 + 2] = b;
    }
  }
}

/*
 * Update image data to make cell N alive.  0, 0, 0 is black.
 */
function updateLiveCell(n) {
  updateCell(n, 0, 0, 0);
}

/*
 * Update image data to make cell N dead. 255, 255, 255 is white.
 */
function updateDeadCell(n) {
  updateCell(n, 255, 255, 255);
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
