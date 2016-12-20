'use strict';

var prompt = require('prompt');

var currentPlayer = 0;
var board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


/**
 * Prints the game's board
 *
 */
function printBoard() {
  board.forEach(function (row) {
    var rowOutput = '|';

    row.forEach(function (columnValue) {
      if (!columnValue) {
        rowOutput += ' ';
      } else {
        rowOutput += columnValue;
      }

      rowOutput += '|';
    });
    console.log(rowOutput);
  });
}

/**
 * Turns the player ID into a "resolved" name
 *
 * @param {Number} playerID - player ID (0 or 1)
 * @return {string} O for 0, X for 1
 */
function getPlayer(playerID) {
  return playerID ? 'O' : 'X'
}

function changePlayer() {
  currentPlayer = currentPlayer ? 0 : 1;
}

function endGame() {
  process.exit();
}

/**
 * Plays a turn.
 *
 * Prints the current player and asks for input.
 * Prints the board after the input has been received.
 */
function playTurn() {

  function takeInput() {
    prompt.get(['row', 'column'], function (err, input) {
      if (input.row < 0 || input.column < 0
        || input.row > board.length - 1 || input.column > board.length - 1) {
        console.log('Invalid input');
        takeInput();

        return;
      }

      var field = board[+input.row][+input.column];
      if (!field) {
        board[+input.row][+input.column] = getPlayer(currentPlayer);
        endTurn();
      } else {
        console.log('field already taken');
        takeInput();
      }
    });
  }

  function endTurn() {
    printBoard();
    changePlayer();
    playTurn();
  }

  console.log('Player: ', getPlayer(currentPlayer));
  takeInput();
}

// start game
prompt.start();
printBoard();
playTurn();
