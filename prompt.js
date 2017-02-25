
function respondToValue(x, y, val) {

  if (val === 0) {
    makeCreature(blinker, x, y);
  } else if (val === 1) {
    makeCreature(glider, x, y);
  }
}

document.addEventListener('click', function (evt) {
  if (evt.target === canvas) {
    var val = prompt('Enter value!');
    var canvasWidth = Number(getComputedStyle(canvas).width.slice(0, -2));
    var canvasHeight = Number(getComputedStyle(canvas).width.slice(0, -2));
    var xscale = canvasWidth / width;
    var yscale = canvasHeight / height;
    var x = Math.floor(evt.offsetX / xscale);
    var y = Math.floor(evt.offsetY / yscale);
    respondToValue(x, y, Number(val));
  }
});
