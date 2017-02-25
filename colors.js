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
  updateCell(n, (r, g, b, a) => [255, 255, 255, 255]);
}

/*
 * Update image data to make cell N dead with complex color modifications.
 */
function updateDeadCell(n) {
  updateCell(n, (r, g, b, a) =>
    [r * 0.75,
      (r + g - b * 0.5) * 0.5,
      (g - r) * 0.9, a]
  );
}
