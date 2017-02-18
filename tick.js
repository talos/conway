/************** *
 * Tick
 *
 * Depends on:
 *  - Data
 *  - Canvas
 *
 * Interface & logic which advances the simulation by one step ("tick").
 * *************/

function tick() {
  map.set(nextMap); // advance to next map
  map.forEach((val, n) => {
    if (shouldLive(liveNeighbors(n), val === 1)) {
      live(n);
    } else {
      kill(n);
    }
  });
  draw();
}

tickBtn.addEventListener('click', tick);
