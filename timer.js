/************** *
 * Timer
 *
 * Depends on:
 *  - Tick
 *
 * Provides a start/stop button that automatically advances the game.
 * *************/

// This variable will control how many times per second we will redraw.  If
// this number is too low, the animation will be very jumpy and not seem
// smooth.  If this number is too high, the computer will struggle to keep up.
// 24 is the number used in film, but we'll start with a slower number to see
// what's happening.
//
// Simply setting a variable called "framerate" will not control the framerate.
// What matters is when we use this variable to set up our timer.
var framerate = 6;
var timer = null;

/**
 * Start our timer object and assign it to `timer` above.
 * requestAnimationFrame will ensure that we don't ever try to draw our canvas
 * so quickly that the previous draw hasn't finished yet.
 *
 * requestAnimationFrame calls `tick` after a specified number of milliseconds.
 *
 * Since we think in "frames per second", we need to divide 1000 milliseconds
 * (1 second) by the framerate to tell requestAnimationFrame how long to wait
 * between ticks.
 */
function startTimer() {
  timer = setInterval(() => requestAnimationFrame(tick), 1000 / framerate);
}

/*
 * Stop our timer object and clear it.  This will make the canvas stop
 * updating.
 */
function stopTimer() {
  clearInterval(timer);
  timer = null;
}

/**
 * Connect the start/stop button so pressing it stops and starts the timer.
 */
startstopBtn.addEventListener('click', function () {
  if (!timer) {
    startTimer();
  } else {
    stopTimer();
  }
});
