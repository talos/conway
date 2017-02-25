/* jshint esnext: true */
/* globals */

/***************** *
 * Shared
 *
 * Share data between different users
 *
 * Requires:
 *
 * - Data
 * - Tick
 * - Firebase library
 *
 * *****************/


var config = {
  apiKey: "AIzaSyCSjGR5IQljkW-DKq4iIm3YdS0Gs9NMODw",
  authDomain: "visual-code.firebaseapp.com",
  databaseURL: "https://visual-code.firebaseio.com",
  storageBucket: "visual-code.appspot.com",
  messagingSenderId: "500364430480"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

function writeUserData(updates) {
  return firebase.database().ref().update(updates);
}

function tick() {
  map.set(nextMap); // advance to next map
  var updates = {};
  map.forEach((val, n) => {
    if (shouldLive(liveNeighbors(n), val === 1)) {
      live(n);
    } else {
      kill(n);
    }
    if (nextMap[n] !== map[n]) {
      updates[dbName.value + '/' + n] = nextMap[n] === 1 ? true : null;
    }
  });
  writeUserData(updates);
  draw();
}

var board = firebase.database().ref(dbName.value);
board.on('value', function(snapshot) {
  var val = snapshot.val();
  for (var n in val) {
    updateLiveCell(Number(n));
  }
});

tickBtn.addEventListener('click', tick);
