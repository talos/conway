/* jshint esnext: true */
/* globals document, Uint8ClampedArray, width, height, map, nextMap, imageData, scale */

/***************** *
 * Logic
 *
 * Depends on:
 *  - Data
 *  - Canvas
 *
 * Code for more advanced rules of the game, in particular edge-wrapping!
 * *****************/

function liveNeighbors(n) {
  var tl = n - width - 1;
  var t = n - width;
  var tr = n - width + 1;
  var l = n - 1;
  var r = n + 1;
  var bl = n + width - 1;
  var b = n + width;
  var br = n + width + 1;

  bl = bl > width * height ? bl - (width * height) : bl;
  b = b > width * height ? b - (width * height) : b;
  br = br > width * height ? br - (width * height) : br;
  tl = tl < 0 ? tl + (width * height) : tl;
  t = t < 0 ? t + (width * height) : t;
  tr = tr < 0 ? tr + (width * height) : tr;
  var val = (map[tl] || 0) + (map[t] || 0) + (map[tr] || 0) +
            (map[l]  || 0) +                 (map[r]  || 0) +
            (map[bl] || 0) + (map[b] || 0) + (map[br] || 0);
   return val;
}
