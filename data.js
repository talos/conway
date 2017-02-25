/* jshint esnext: true */
/* globals document, Uint8ClampedArray, width, imageData, drawLiveCell, drawDeadCell */

/***************** *
 * Data
 *
 * Depends on:
 *  - Canvas
 *
 * Objects that store the data necessary for game state.
 * *****************/

var map = new Uint8ClampedArray(imageData.data.length / 4);
var nextMap = new Uint8ClampedArray(map.length);

/**
 * Change cell n to be alive in the next tick.
 *
 * We should never change current data, as that will mess up our ability to
 * determine what's alive now.
 */
function live(n) {
  nextMap[n] = 1;
  updateLiveCell(n);
}

/**
 * Change cell n to be dead in the next tick.
 *
 * We should never change current data, as that will mess up our ability to
 * determine what's alive now.
 */
function kill(n) {
  nextMap[n] = 0;
  updateDeadCell(n);
}

/**
 * Example code below!  Uncomment to make a few cells "live".
 */

//live(100);
//live(101);
//live(102);
//live(103);
//live(200);
//live(201);
//live(202);
//live(203);
//
//draw();
