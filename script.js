/* jshint esnext: true */
/* globals document, Uint8ClampedArray */

/*
 *
 * Simplification ideas:
 * - no cross-edge wrapping
 * - color comes later
 * x most interfaces come later (no fps for example)
 * - modularize _all the things_: should be possible to copy one segment, then
 *   another, then another, and get functional code each step o the way
 * - comment pretty much everything, readable variable names, fewer fancy
 *   techniques
 */



