/* jshint esnext: true */
/* globals document, Uint8ClampedArray, width, height, map, nextMap, imageData, scale */

/***************** *
 * Logic
 *
 * Depends on:
 *  - Data
 *  - Canvas
 *
 * Code for the rules of the game (whether cells live or die) and what happens
 * when they do live or die.
 * *****************/

/**
 * Return the index N for position x and y
 */
function xy2n(x, y) {
  return (y * width) + x;
}

/*
 * Return the number of cells adjacent to n that are alive.
 */
function liveNeighbors(n) {
  var t = n - width;
  var b = n + width;
  var val = (map[t - 1] || 0) + (map[t] || 0) + (map[t + 1] || 0) +
            (map[n - 1] || 0) +                 (map[n + 1] || 0) +
            (map[b - 1] || 0) + (map[b] || 0) + (map[b + 1] || 0);
   return val;
}

/**
 * Return true if this cell should be alive in the next tick, false if it
 * should not be alive in the next tick.
 *
 * The standard rules of life say that:
 * 1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
 * 2. Any live cell with two or three live neighbours lives on to the next generation.
 * 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
 * 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 */
function shouldLive(liveNeighbors, isAlive) {
  if (isAlive && (liveNeighbors === 2 || liveNeighbors === 3)) {
    return true;
  } else if (!isAlive && liveNeighbors === 3) {
    return true;
  } else {
    return false;
  }
}
