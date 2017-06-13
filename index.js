const prompt = require('prompt');

prompt.start();

const board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
const players = ['Player One', 'Player Two'];
let currPlayer = 0;

const generateSchemaPerTurn = (playerIdx) => {
  return [{
    description: `${players[playerIdx]}, enter a row`,
    name: 'row',
    type: 'number'
  }, {
    description: `${players[playerIdx]}, enter a column`,
    name: 'column',
    type: 'number'
  }]
}

const checkRow = (board) => {
  return board.reduce(function(won, row) {
    won[0] = row[0];
    if (won[1] || row[0] === ' ') return won;
    return row.reduce(function(won, col, i) {
      if (!won[1] && i > 0) {
        return won;
      }
      return [won[0], won[0] === col];
    }, won)
  }, [' ', false])
}

const checkCol = () => {
  const cols = board.map((_, i) => board.map((row) => row[i]));
  return checkRow(cols);
}

const checkDiag = () => {
  let left = 0;
  let right = 2;
  const diags = board.reduce((diags, row) => {
    diags[0].push(row[left++]);
    diags[1].push(row[right--]);
    return diags;
  }, [[], []]);
  return checkRow(diags);
}

const checkIfWon = () => {
  let winArr = [checkCol(), checkRow(board), checkDiag()];
  console.log(winArr);
  return winArr.some(winTuple => winTuple[1] === true);
}

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
  board[result.row][result.column] = currPlayer === 0 ? 'X' : 'O';
  const winner = checkIfWon();
  printBoard();
  if (winner) {
    console.log(`${players[currPlayer]} wins!`)
    return;
  } else {
    currPlayer = currPlayer === 0 ? 1 : 0;
    turn(generateSchemaPerTurn(currPlayer));
  }
});

turn();