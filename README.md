## Cellular automata!

1. Open up a new [JSFiddle](https://jsfiddle.net).
2. Copy the contents of
   [index.html](https://raw.githubusercontent.com/talos/conway/gh-pages/index.html)
   into the "HTML" section of the Fiddle.
3. For each of the sections below, copy the appropriate code in as we review it
   to build up the pieces of the simulation.

## The components

### [Canvas](https://raw.githubusercontent.com/talos/conway/gh-pages/canvas.js)

Get the objects that give us access to our canvas drawing space, as well as
functions that make it easier for us to draw to it.

### [Data](https://raw.githubusercontent.com/talos/conway/gh-pages/data.js)

Initialize objects that store the data necessary for game state, as well as
functions that alter that game state through time.

#### Depends on

 - Canvas

### [Logic](https://raw.githubusercontent.com/talos/conway/gh-pages/logic.js)

Code for the rules of the game (whether cells live or die) and what happens
when they do live or die.

#### Depends on

 - Data
 - Canvas

### [Tick](https://raw.githubusercontent.com/talos/conway/gh-pages/tick.js)

Interface & logic which advances the simulation by one step ("tick").

#### Depends on

 - Logic
 - Data
 - Canvas

### [Timer](https://raw.githubusercontent.com/talos/conway/gh-pages/timer.js)

Provides a start/stop button that automatically advances the game.

#### Depends on

 - Tick

### [Death](https://raw.githubusercontent.com/talos/conway/gh-pages/death.js)

When you click this button, everything dies.

#### Depends on

 - Data
 - Tick

### [Download](https://raw.githubusercontent.com/talos/conway/gh-pages/download.js)

When you click this link, you get a window with a saveable image of the
current canvas

#### Depends on:

 - Canvas

### [ClickToPopulate](https://raw.githubusercontent.com/talos/conway/gh-pages/clicktopopulate.js)

When you click (and/or drag) on the canvas, your action should:
 - Populate new cells wherever the mouse goes
 - Pause the game as long as you're populating new cells

#### Depends on:

 - Timer
 - Data
 - Canvas

### [Menagerie](https://raw.githubusercontent.com/talos/conway/gh-pages/menagerie.js)

Functions to build creatures and examples of creatures to populate the world.

#### Depends on:
 - Logic

### [TextInput](https://raw.githubusercontent.com/talos/conway/gh-pages/textinput.js)

Function to convert the text input area into creatures on screen.

#### Depends on:

 - Data
 - Menagerie
