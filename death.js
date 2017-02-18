/************* *
 * Death
 *
 * Depends on:
 *  - Data
 *  - Tick
 *
 * When you click this button, everything dies.
 * ************/

deathBtn.addEventListener('click', function () {
  nextMap.fill(0);
  tick();
});
