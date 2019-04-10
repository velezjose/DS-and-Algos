// Optional argument that can be passed to make AI play
const AI_PLAYING = process.argv[2] === 'withAI' ? true : false;


// Standard Input
let stdin = process.openStdin();


// Helper sleep function for when AI plays.
let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


// Helper to make the AI play
let makeAIPlay = board => {
  let options = [];
  board.forEach((row, rowIdx) => {
    row.forEach((elem, colIdx) => {
      if (board[rowIdx][colIdx] === ' ') options.push([rowIdx, colIdx]);
    });
  });

  let rand = options[Math.floor(Math.random() * options.length)];
  board[rand[0]][rand[1]] = '0';
  return [rand[0], rand[1]];
};


// Construct a brand new board.
let makeBoard = () => {
  let board = [];
  for (let i = 0; i < 3; i += 1) board.push(new Array(3).fill(' '));
  return board;
};


// Helper to print whoever's turn it is.
let printTurn = player1sTurn => {
  if (AI_PLAYING) {
    console.log(player1sTurn ? 'x\'s turn' : 'AI\'s turn');
    process.stdout.write(player1sTurn ? 'Type coordinates: ' : '');
  } else {
    console.log(player1sTurn ? 'x\'s turn' : '0\'s turn');
    process.stdout.write('Type coordinates: ');
  }
}


// Helper to print current state of Tic-Tac-Toe board.
let printBoard = board => {
  console.log('-------------');
  for (let r = 0; r < board.length; r += 1) {
    let row = ['| '];
    for (let c = 0; c < board[r].length; c += 1) {
      row.push(board[r][c] + ' | ');
    }
    console.log(row.join(''));
    console.log('-------------');
  }
};


// Validate the input passed in from command line.
let invalidCoordinates = coords => {
  if (Array.isArray(coords) === false) return true;
  if (coords.length !== 2) return true;
  if (Number.isNaN(coords[0]) === true || Number.isNaN(coords[1]) === true) return true;
  if (coords[0] > 3 || coords[1] > 3 || coords[0] < 1 || coords[1] < 1) return true;

  return false;
};


// Check whether there's 3 of `char` in the row `r`
let checkRow = (board, char, r) => {
  let count = 0;
  for (let c = 0; c < board[r].length; c += 1) {
    if (board[r][c] === char) count += 1;
  }
  
  if (count === 3) return true;
  return false;
};

// Check whether there's 3 of `char` in the column `c`
let checkCol = (board, char, c) => {
  let count = 0;
  for (let r = 0; r < board.length; r += 1) {
    if (board[r][c] === char) count += 1;
  }

  if (count === 3) return true;
  return false;
};

// Check whether there's 3 of `char` in both major and minor diagonals
let checkDiags = (board, char) => {
  // check major diagonal
  let count = 0;
  for (let i = 0; i < board.length; i += 1) {
    if (board[i][i] === char) count += 1;
  }

  if (count === 3) return true;
  
  // check minor diagonal
  count = 0;
  for (let r = 0; r < board.length; r += 1) {
    if (board[r][board.length - r - 1] === char) count += 1;
    if (count === 3) return true;
  }

  return false;
};

// Check whether a player has won and returns true if player has won
let checkWinningConditions = (board, player1sTurn, r, c) => {
  let charToCheck = player1sTurn ? 'x' : '0';
  return checkRow(board, charToCheck, r) || checkCol(board, charToCheck, c) || checkDiags(board, charToCheck);
};


// ------------------------------------------------------------------- //

// Game Start - where the real magic happens :)

let board = makeBoard();
let capacity = 0;
let player1sTurn = true;


// Initializing game.
console.log('Welcome to Tic-Tac-Toe!\n');
printBoard(board);
printTurn(player1sTurn);


// Command Line Input handler
const handleCommandLineInput = async input => {
  // Get coordinates from input
  let coords = input.toString().trim().split(',').map(Number);

  // Validate coordinates from input
  if (invalidCoordinates(coords)) {
    console.log('Please try again.\n');
    printBoard(board);
    return process.stdout.write('Type coordinates: ');
  }

  // Get row and column
  let [r, c] = coords;
  r -= 1;
  c -= 1;

  // If the board at that row and column is not empty, try again.
  if (board[r][c] !== ' ') {
    console.log('Already taken. Try again.\n');
    printBoard(board);
    return process.stdout.write(player1sTurn ? 'Type coordinates: ' : '');
  }


  // If it's player 1's turn, board[r][c] gets an 'x', else a '0'
  board[r][c] = player1sTurn ? 'x' : '0';

  // Change whoever's turn it is to the one that didn't just go
  player1sTurn = !player1sTurn;

  // Increase current capacity
  capacity += 1;

  // Let user know that the move was successfully played
  printBoard(board);
  console.log('Successfully played!\n')


  // Check winning conditions and if someone won, reset all state variables
  // Note: !player1sTurn is passed in bcz we want the player that previously played
  //       to be accounted for the win, not the one that will play right now/
  if (checkWinningConditions(board, !player1sTurn, r, c)) {
    // Get whoever played previously to make the console print who won
    // (which was the client that played previously)
    player1sTurn = !player1sTurn;

    // Print win
    console.log('Player ' + (player1sTurn ? 'x' : '0') + ' won!');
    console.log('Restarting game...\n');

    // Reset state variables and return
    board = makeBoard();
    printBoard(board);
    capacity = 0;
    player1sTurn = true;
    return printTurn(player1sTurn);
  }
  

  // If the AI is playing, let's make it play.
  if (AI_PLAYING && capacity !== 9) {
    // Print AI's turn and some more stuff for cool UI
    printTurn(player1sTurn);
    console.log('Making computations...');

    // Make AI play a move in the board
    [r, c] = makeAIPlay(board);
    await sleep(2000);

    // Print the board and that AI just played
    printBoard(board);
    console.log('Computer just played.\n');

    // It's player 1's turn again
    player1sTurn = !player1sTurn;

    // Increase number of moves played
    capacity += 1;
  }


  // Check the winning conditions again if the AI is playing
  if (checkWinningConditions(board, !player1sTurn, r, c) && AI_PLAYING) {
    player1sTurn = !player1sTurn;
    console.log(player1sTurn ? 'Player x won!' : 'The computer won!');
    console.log('Restarting game...\n');

    // Reset all variables and return if AI won
    board = makeBoard();
    printBoard(board);
    capacity = 0;
    player1sTurn = true;
    return printTurn(player1sTurn);
  }

  
  // Reset game if no more moves left.
  if (capacity === 9) {
    console.log('No more moves left! Restarting game...\n');
    player1sTurn = true;
    board = makeBoard();
  }


  // Print whoever's turn it is.
  printTurn(player1sTurn);
};


// Adding data event listener to the standard input.
stdin.addListener('data', handleCommandLineInput);
