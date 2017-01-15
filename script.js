/* jshint esnext: true */
/* globals document, Uint8ClampedArray */

/*
 *
 * Simplification ideas:
 * - no cross-edge wrapping
 * - color comes later
 * - most interfaces come later (no fps for example)
 * - modularize _all the things_: should be possible to copy one segment, then
 *   another, then another, and get functional code each step o the way
 * - comment pretty much everything, readable variable names, fewer fancy
 *   techniques
 */



var framerate = 24;
var fps = document.getElementById('fps');

/***************** *
 * Canvas
 *
 * Objects that give us access to a drawing space.
 * *****************/

var canvas = document.getElementById('canv');
var ctx = canvas.getContext('2d');
var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
imageData.data.fill(255);

/***************** *
 * End Canvas
 * *****************/

/***************** *
 * Data
 *
 * Depends on:
 *  - Canvas
 *
 * Objects that store the data necessary for game state.
 * *****************/

var scale = 5;
var width = canvas.width / scale;
var height = canvas.height / scale;
var map = new Uint8ClampedArray(imageData.data.length / (4 * scale * scale));
var nextMap = new Uint8ClampedArray(map.length);

/**************** *
 * End Data
 * ***************/

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

function liveNeighbors(n) {
  var tl = n - width - 1;
  var t = n - width;
  var tr = n - width + 1;
  var l = n - 1;
  var r = n + 1;
  var bl = n + width - 1;
  var b = n + width;
  var br = n + width + 1;

  // bonus: edge calc code is complicated!
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

function shouldLive(liveNeighbors, isAlive) {
  if (isAlive) {
    if (liveNeighbors < 2) {
      return false;
    } else if (liveNeighbors > 3) {
      return false;
    } else {
      return true;
    }
  } else {
     if (liveNeighbors === 3) {
       return true;
     } else {
       return false;
     }
  }
}

function live(n) {
  nextMap[n] = 1;
  var x = n % width;
  var y = (n - x) / width;
  //var n_ = (x * 5) + (y * width * 5);
  var scalen = (x * scale) + (y * scale * scale * width);
  var n_;

  // Update image data, which is scaled differently than our underlying data
  for (x = 0 ; x < scale ; x += 1) {
    for (y = 0 ; y < scale ; y += 1) {
      n_ = scalen + x + (y * width * scale);
      imageData.data[n_ * 4] += 255;
      imageData.data[n_ * 4 + 3] = 255;
    }
  }
}

function kill(n) {
  nextMap[n] = 0;
  //imageData.data[n * 4 + 1] += imageData.data[n * 4] /= 1.3;
  //imageData.data[n * 4 + 2] += imageData.data[n * 4 + 1] /= 1.6; 
  //imageData.data[n * 4 + 2] /= 1.9;

  var x = n % width;
  var y = (n - x) / width;
  var scalen = (x * scale) + (y * scale * scale * width);
  var n_;
  for (x = 0 ; x < scale ; x += 1) {
    for (y = 0 ; y < scale ; y += 1) {
      n_ = scalen + x + (y * width * scale);
      //imageData.data[n_ * 4 + 1] += (imageData.data[n_ * 4] /= 1.2) * 1.5;
      //imageData.data[n_ * 4 + 2] += (imageData.data[n_ * 4 + 1] /= 1.2) / 2;
      //imageData.data[n_ * 4 + 2] /= 1.5;
      var r = imageData.data[n_ * 4];
      var g = imageData.data[n_ * 4 + 1];
      var b = imageData.data[n_ * 4 + 2];
      //var r_ = r * 0.75;
      //var r_ = 0;
      var r_ = r * 0.75;
      //var g_ = (r + g - b);
      //var b_ = (g - r);
      var g_ = (r + g - b * 0.5) * 0.5;
      var b_ = (g - r) * 0.9;
      imageData.data[n_ * 4] = r_;
      imageData.data[n_ * 4 + 1] = g_;
      imageData.data[n_ * 4 + 2] = b_;
    }
  }
}

/**
 * Determine the index N for data at x & y
 */
function xy2n(x, y) {
  return (y * width) + x;
}

/************** *
 * End Logic
 * *************/

/************** *
 * Tick
 *
 * Depends on:
 *  - Data
 *  - Canvas
 *
 * Interface & logic which advances the simulation by one step ("tick").
 * *************/

var lastTick = new Date();

function tick() {
  map.set(nextMap); // advance to next map 
  map.forEach((val, n) => {
    if (shouldLive(liveNeighbors(n), val === 1)) {
      live(n);
    } else {
      kill(n);
    }
  });
  ctx.putImageData(imageData, 0, 0);
  var nextTick = new Date();
  fps.innerText = String((1000 / (nextTick - lastTick)).toFixed(1));
  lastTick = nextTick;
}

document.getElementById('tick')
        .addEventListener('click', tick);

/*********** *
 * End Tick
 * ***********/


/************** *
 * Timer
 *
 * Depends on:
 *  - Tick
 *
 * Provides a start/stop button that automatically advances the game.
 * *************/

var timer = null;
var pause = false;
function startTimer() {
  timer = setInterval(() => requestAnimationFrame(tick), 1000 / framerate);
}
function stopTimer() {
  clearInterval(timer);
  timer = null;
}
document.getElementById('startstop')
        .addEventListener('click', function () {
          if (!timer) {
            startTimer();
          } else {
            stopTimer();
          }
        });

var mouseDown = false;
document.addEventListener('mousedown', function () {
  mouseDown = true;
});
document.addEventListener('mouseup', function () {
  mouseDown = false;
  if (pause === true) {
    pause = false;
    startTimer();
  }
});
/************** *
 * End Timer
 * *************/

/************* *
 * Death
 *
 * Depends on:
 *  - Data
 *  - Tick
 *
 * When you click this button, everything dies.
 * ************/

document.getElementById('death')
        .addEventListener('click', function () {
            nextMap.fill(0);
            tick();
          });

/************* *
 * End Death
 * ************/


/************* *
 * Download
 *
 * Depends on:
 *  - Canvas
 *
 * When you click this link, you get a window with a saveable image of the
 * current canvas
 * *************/

var downloadLink = document.getElementById('imageLink');
downloadLink.addEventListener('click', function () {
  downloadLink.href = canvas.toDataURL('image/png');
});

/************* *
 * End Download
 **************/

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

function handleMouseDown(evt) {
    if (timer) {
      stopTimer();
      pause = true;
    }
    var y = Math.floor(evt.offsetY / scale);
    var x = Math.floor(evt.offsetX / scale);
    live(xy2n(x, y));
    ctx.putImageData(imageData, 0, 0);
}

canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', function (evt) {
  if (mouseDown) {
    handleMouseDown(evt);
  }
});

/***************** *
 * End ClickToPopulate
 * *****************/


/**************** *
 * Menagerie
 *
 * Depends on:
 *  - Logic
 *
 * Function to build creatures and examples of creatures to populate the world.
 * ****************/

// Make a creature at X and Y
function makeCreature(form, x, y, rotation) {
  var a, b, val;
  rotation = rotation || 0;
  form.reverse();
  form.forEach(function(row, rownum) {
    row.split('').forEach(function(_, charnum) {
      a = rotation % 2 === 0 ? charnum : rownum;
      b = rotation % 2 === 0 ? rownum : charnum;
      val = form[b][a];
      if (val !== ' ') {
        live(xy2n(x + a, y + b));
      }
    });
  });
}

var blinker = [
  ' x ',
  ' x ',
  ' x '
];

var glider = [
  '  x',
  'x x',
  ' xx'
];

var rPentomino = [
  ' xx',
  'xx ',
  ' x '
];

makeCreature(glider, width/2, height/2, 1);

/**************** *
 * End Menagerie
 * ***************/
