const prompt = require('prompt');

prompt.start();

const board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
const players = ['Player One', 'Player Two'];
let currPlayer = 0;

const generateSchemaPerTurn = (playerIdx) => {
  return [{
    description: `${players[playerIdx]}, enter a column`,
    name: 'column',
    type: 'number'
  }, {
    description: `${players[playerIdx]}, enter a row`,
    name: 'row',
    type: 'number'
  }]
}

let gameOn = true;

const printBoard = () => {
  board.forEach(function(row, i) {
    console.log(`${row[0]}|${row[1]}|${row[2]}`);
    if (i < 2) {
      console.log('- - -');
    }
  });
}

console.log('Welcome');
printBoard();

const turn = () => prompt.get(generateSchemaPerTurn(currPlayer), function(err, result) {
  if (err) return err;
  currPlayer = currPlayer === 0 ? 1 : 0;
  board[result.row][result.column] = 'X';
  printBoard();
  turn(generateSchemaPerTurn(currPlayer));
});

turn();