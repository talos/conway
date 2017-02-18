/************* *
 * Download
 *
 * Depends on:
 *  - Canvas
 *
 * When you click this link, you get a window with a saveable image of the
 * current canvas
 * *************/

downloadLink.addEventListener('click', function () {
  downloadLink.href = canvas.toDataURL('image/png');
});
