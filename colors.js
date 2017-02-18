/* jshint esnext: true */
/* globals document, Uint8ClampedArray, width, scale, imageData */

/***************** *
 * Colors
 *
 * Functions to override Canvas and provide control over cell color
 * *****************/

/*
 * Update image data to make cell N alive with complex color modifications.
 */
function updateLiveCell(n) {
  var x = n % width;
  var y = (n - x) / width;
  var scalen = (x * scale) + (y * scale * scale * width);
  var n_;

  for (x = 0 ; x < scale ; x += 1) {
    for (y = 0 ; y < scale ; y += 1) {
      n_ = scalen + x + (y * width * scale);
      imageData.data[n_ * 4] += 255;
      imageData.data[n_ * 4 + 3] = 255;
    }
  }
}

/*
 * Update image data to make cell N dead with complex color modifications.
 */
function updateDeadCell(n) {
  var x = n % width;
  var y = (n - x) / width;
  var scalen = (x * scale) + (y * scale * scale * width);
  var n_;
  for (x = 0 ; x < scale ; x += 1) {
    for (y = 0 ; y < scale ; y += 1) {
      n_ = scalen + x + (y * width * scale);
      var r = imageData.data[n_ * 4];
      var g = imageData.data[n_ * 4 + 1];
      var b = imageData.data[n_ * 4 + 2];
      var r_ = r * 0.75;
      var g_ = (r + g - b * 0.5) * 0.5;
      var b_ = (g - r) * 0.9;
      imageData.data[n_ * 4] = r_;
      imageData.data[n_ * 4 + 1] = g_;
      imageData.data[n_ * 4 + 2] = b_;
    }
  }
}
