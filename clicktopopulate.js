/**************** *
 * ClickToPopulate:
 *
 * Depends on:
 *  - Timer
 *  - Data
 *  - Canvas
 *
 * When you click (and/or drag) on the canvas, your action should:
 *  - Populate new cells wherever the mouse goes
 *  - Pause the game as long as you're populating new cells
 * ****************/

/**
 * When the mouse is pressed down, draw new live cells and update the game
 * board.  We also stop the timer so the simulation is paused while the mouse
 * is pressed down.
 */
var pause = false;
var mouseDown = false;
function handleMouseDown(evt) {
  mouseDown = true;
  if (evt.target !== canvas) {
    return;
  }
  if (timer) {
    stopTimer();
    pause = true;
  }
  var canvasWidth = Number(getComputedStyle(canvas).width.slice(0, -2));
  var canvasHeight = Number(getComputedStyle(canvas).width.slice(0, -2));
  var xscale = canvasWidth / width;
  var yscale = canvasHeight / height;
  var x = Math.floor(evt.offsetX / xscale);
  var y = Math.floor(evt.offsetY / yscale);
  live(xy2n(x, y));
  draw();
}
document.addEventListener('mousedown', handleMouseDown);

/**
 * Call the function to draw live cells whenever the mouse moves
 * around, if it is pressed.
 */
canvas.addEventListener('mousemove', function (evt) {
  if (mouseDown) {
    handleMouseDown(evt);
  }
});

/**
 * Additionally to keeping track of when the mouse is up, we want to restart
 * the timer if it was paused for our drawing.
 */
document.addEventListener('mouseup', function () {
  mouseDown = false;
  if (pause === true) {
    pause = false;
    startTimer();
  }
});
