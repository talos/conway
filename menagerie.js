/**************** *
 * Menagerie
 *
 * Depends on:
 *  - Logic
 *
 * Function to build creatures and examples of creatures to populate the world.
 * ****************/

/**
 * Exhaustive list of patterns/creatures can be found on the LifeWiki
 * (http://conwaylife.com/wiki/Main_Page)
 */

/* A "still-life" pattern. It will not move on its own. */
var loaf = [
  '  x ',
  ' x x',
  'x  x',
  ' xx '
];

/* A simple "oscillator". It will move back and forth between two positions
* forever. */
var blinker = [
  ' x ',
  ' x ',
  ' x '
];

/* A very simple "spaceship", which will traverse space in one direction
 * forever if left uninterrputed. */
var glider = [
  '  x',
  'x x',
  ' xx'
];

/* A very simple "methusaleh", which will go through a large number of
 * different configurations before eventually stabilizing. */
var rPentomino = [
  ' xx',
  'xx ',
  ' x '
];

/*
 * Make one of the creatures, defined as above.
 *
 * Set the left and top corner, in addition to any desired mirroring.
 */
function makeCreature(rows, left, top, mirrorVertical, mirrorHorizontal) {
  if (mirrorVertical) {
    rows = rows.slice(0, rows.length).reverse();
  }
  rows.forEach(function(row, rownum) {
    row = row.split('');
    if (mirrorHorizontal) {
      row = row.slice(0, row.length).reverse();
    }
    row.forEach(function(val, charnum) {
      if (val !== ' ') {
        live(xy2n(left - rownum, top - charnum));
      }
    });
  });
  draw();
}
