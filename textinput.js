/* jshint esnext: true */
/* globals document, textarea, makeCreature, width, glider */

/**************** *
 * TextInput
 *
 * Depends on:
 *  - Data
 *  - Menagerie
 *
 * Function to convert the text you've inputted into objects on screen
 * ****************/

/**
 * A very simple method of converting our text input to creatures.  Each
 * character of input results in one creature.  Characters that we don't have
 * linked to a creature will result in no creature for that position.
 */
function drawCreaturePerCharacter(text) {
  var length = text.length;
  text.split('').forEach((char, pos) => {
    var x = Math.floor(width / 3) + (pos % width);
    var y = Math.floor(height/ 3) + (Math.floor(pos / width));

    if (char === 'a') {
      makeCreature(glider, x, y, false, false);
    } else if (char === 'A') {
      makeCreature(glider, x, y, true, false);
    } else if (char === 'b') {
      makeCreature(glider, x, y, false, true);
    } else if (char === 'B') {
      makeCreature(glider, x, y, true, true);
    }

    if (char === 'y') {
      makeCreature(rPentomino, x, y, false, false);
    } else if (char === 'Y') {
      makeCreature(rPentomino, x, y, true, false);
    } else if (char === 'z') {
      makeCreature(rPentomino, x, y, false, true);
    } else if (char === 'Z') {
      makeCreature(rPentomino, x, y, true, true);
    }
  });
}

/**
 * Choose how we want to interpret the text input.
 */
function drawCanvasFromInput(evt) {
  var text = textarea.value;
  drawCreaturePerCharacter(text);
}

/**
 * Draw the canvas whenever we click the draw button.
 */
drawBtn.addEventListener('click', drawCanvasFromInput);
