'use strict';

import Game from './Game.js';

const init = () => {
    const theField = document.getElementById("field");
    const theGame = new Game(theField);
    document.getElementById('start').addEventListener("click", () => startGame(theGame));

    window.addEventListener('keydown', theGame.KeydownactionHandler.bind(theGame));
    window.addEventListener('keyup', theGame.keyUpActionHandler.bind(theGame));

}


window.addEventListener("load", init);


// true iff game is started
let started = false;
let played = false;
/** start and stop a game
 * @param {Game} theGame - the game to start and stop
 */
const startGame = theGame => {
    if (!started) {
        theGame.start();
        document.getElementById('start').value = 'disconnect';
    } else {

        document.getElementById('start').value = 'connect';
        theGame.stop();
    }
    started = !started;
}