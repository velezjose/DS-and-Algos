// Open standard input from command line
let stdin = process.openStdin();

// Declare constants that will be used during board creation and validation
// Order of input is num_rows num_cols num_mines
const ROWS = Number(process.argv[2]) || 9;
const COLUMNS = Number(process.argv[3]) || 9
const NUM_MINES = Number(process.argv[4]) || 5
const MINE = '*';


// ----------------------------  Game UI  ------------------------------ //

// Create a fresh new board.
let makeBoard = () => {
  let board = [];
  for (let r = 0; r < ROWS; r += 1) board.push(new Array(COLUMNS).fill(false));
  return board;
};


// Generate NUM_MINES number of (x, y)-coordinates representing where the mines
// will be placed at. The coordinates are in random positions.
let generateCoordinates = () => {
  let cache = {}, count = 0;

  // While the current count is not equal to the total number of mine coordinates 
  // we want to create, continue execution
  while (count !== NUM_MINES) {
    let xCoord = Math.floor(Math.random() * ROWS);
    let yCoord = Math.floor(Math.random() * COLUMNS);
    let coords = [xCoord, yCoord];
    
    // Our cache checks whether our newly created coordinate pair is unique.
    // If it is, add it to the cache and increment count by 1.
    if (cache[coords.toString()] === undefined) {
      cache[coords.toString()] = coords;
      count += 1;
    }
  }

  return Object.values(cache);
};


// Fill board with mines
let fillBoard = (board, mineCoords) => mineCoords.forEach(coord => (board[coord[0]][coord[1]] = MINE));


// Return number of adjacent mines for a given (row, column) pair
// Mines are adjacent if they are on the top-left, top, top-right, right, ..., of a (row, column) pair
let getNumAdjacentMines = (board, r, c) => {
  let count = 0;

  if (board[r][c - 1] === MINE) count += 1; /* check left */
  if (board[r][c + 1] === MINE) count += 1; /* check right */
  if (board[r - 1] && board[r - 1][c] === MINE) count += 1; /* check top */
  if (board[r - 1] && board[r - 1][c - 1] === MINE) count += 1; /* check top left */
  if (board[r - 1] && board[r - 1][c + 1] === MINE) count += 1; /* check top right */
  if (board[r + 1] && board[r + 1][c] === MINE) count += 1; /* check bottom */
  if (board[r + 1] && board[r + 1][c + 1] === MINE) count += 1; /* check bottom right */
  if (board[r + 1] && board[r + 1][c - 1] === MINE) count += 1; /* check bottom left */

  return count;
};


// Fill board with nums of adjacent mines
let fillBoardWithNums = board => {
  for (let r = 0; r < board.length; r += 1) {
    for (let c = 0; c < board[r].length; c += 1) {
      if (board[r][c] === MINE) continue;
      board[r][c] = getNumAdjacentMines(board, r, c);
    }
  }
};


// Helper function to know what character to display in command line
let getCharToPrint = (board, trackerBoard, r, c, playerJustLost) => {
  if (playerJustLost) return board[r][c] === 0 ? ' ' : board[r][c];

  // The element itself on the board. Can be either a number from 0 to 8, 
  // or an asterisk '*' representing a mine in that spot.
  let elem = board[r][c];

  // If it's been revealed before, trackerBoard[r][c] will be true.
  // Trackerboard keeps track of previously seen elements of our board.
  let seen = trackerBoard[r][c];

  if (seen === false || elem === MINE) return '#';

  // If element has been seen, display it. It should be a number...
  // If it's 0, return an empty space so the board can seem cleaner and emptier.
  if (seen) return elem === 0 ? ' ' : elem;
};


// Helper function for printing the current minesweeper board state.
let printBoard = (board, trackerBoard, playerJustLost) => {
  // Creating an x-axis string to indicate what index we're at.
  let x_coord_array = new Array(COLUMNS).fill('');
  let x_coords = ['  ']; 
  x_coord_array.forEach((elem, idx) => x_coords.push(`  ${idx} `));
  console.log('\n' + x_coords.join(''));

  // Row divider is a bunch of ---- 's dividing one row from the next
  let rowDivider = '  ' + (new Array(COLUMNS + 2 + (3 * COLUMNS)).join('–'));
  console.log(rowDivider);

  // Print out the rest of the board
  for (let r = 0; r < ROWS; r += 1) {
    let row = [`${ r } | `];
    for (let c = 0; c < COLUMNS; c += 1) {
      let char = getCharToPrint(board, trackerBoard, r, c, playerJustLost);
      row.push(char + ' | ');
    }
    console.log(row.join(''));
    console.log(rowDivider);
  }
};


// Helper function to validate input
let invalidInput = input => {
  // If it's not a string, or falsy, or when split by ',' not of length 2, return true.
  if (typeof input !== 'string') return true;
  if (!input) return true;
  if (input.split(',').length !== 2) return true;

  // If array arr doesn't have numbers, or if numbers are out of bounds, return true.
  let arr = input.split(',').map(Number);
  if (Number.isNaN(arr[0]) || Number.isNaN(arr[1])) return true;
  if (arr[0] < 0 || arr[1] < 0 || arr[0] > ROWS - 1 || arr[1] > COLUMNS - 1) return true;

  return false;
};


// Get all neighbors that are 0's
let get0Neighbors = (board, trackerBoard, r, c) => {
  let neigh = [];

  // These if statements make trackerBoard[x][y] = true even if that spot is not true. The reason
  // for this is that we still want to display one more layer of numbers that are not 0 to the 
  // user. This allows for them to know how many mines (a non-zero number) are adjacent to the squares. 
  //  ** For more information, check out the comma operator in JavaScript.

  if (board[r][c - 1] !== undefined && (trackerBoard[r][c - 1] = true, true) && board[r][c - 1] === 0) neigh.push([r, c - 1]);
  if (board[r][c + 1] !== undefined && (trackerBoard[r][c + 1] = true, true) && board[r][c + 1] === 0) neigh.push([r, c + 1]);


  // All of these if statements check whether board[x] is not falsy (i.e. there is an array there),
  // if so, then if board[x][y] is not a MINE, then make trackerBoard[x][y] be true, return true in that parenthesis,
  // and finally if board[x][y] is 0, add it to the neighbors array that is returned at the end.
  if (board[r - 1] && board[r - 1][c] !== undefined && board[r - 1][c] !== MINE && (trackerBoard[r - 1][c] = true, true) && board[r - 1][c] === 0) neigh.push([r - 1, c]);
  if (board[r - 1] && board[r - 1][c - 1] !== undefined && board[r - 1][c - 1] !== MINE && (trackerBoard[r - 1][c - 1] = true, true) && board[r - 1][c - 1] === 0) neigh.push([r - 1, c - 1]);
  if (board[r - 1] && board[r - 1][c + 1] !== undefined && board[r - 1][c + 1] !== MINE && (trackerBoard[r - 1][c + 1] = true, true) && board[r - 1][c + 1] === 0) neigh.push([r - 1, c + 1]);
  if (board[r + 1] && board[r + 1][c] !== undefined && board[r + 1][c] !== MINE && (trackerBoard[r + 1][c] = true, true) && board[r + 1][c] === 0) neigh.push([r + 1, c]);
  if (board[r + 1] && board[r + 1][c + 1] !== undefined && board[r + 1][c + 1] !== MINE && (trackerBoard[r + 1][c + 1] = true, true) && board[r + 1][c + 1] === 0) neigh.push([r + 1, c + 1]);
  if (board[r + 1] && board[r + 1][c - 1] !== undefined && board[r + 1][c - 1] !== MINE && (trackerBoard[r + 1][c - 1] = true, true) && board[r + 1][c - 1] === 0) neigh.push([r + 1, c - 1]);

  return neigh;
};


// Expand the tracker board to more seen areas (i.e. make more elements in trackerBoard to true)
let expandTrackerBoard = (board, trackerBoard, r, c) => {
  trackerBoard[r][c] = true;

  // If we hit a number (not a mine) that's not 0, then we can't expand
  if (board[r][c] !== 0) return;

  // If board[r][c] is 0, then we can begin to find all adjacent zeros and make them all true
  // in our trackerBoard in a BFS manner until we hit non-zero numbers or the boundary.

  // Initializing our queue and seen object
  let q = [[r, c]];
  let seen = {};
  seen[q[0].toString()] = true;

  while (q.length !== 0) {
    let arr = q.shift();
    seen[arr.toString()] = true;

    let [r, c] = arr;
    trackerBoard[r][c] = true;

    let neighbors = get0Neighbors(board, trackerBoard, r, c);
    neighbors.forEach(neigh => seen[neigh.toString()] === undefined ? q.push(neigh) : null);
  }
};


// Calculate how many true's Ǝ in our trackerBoard (initially tried a one-liner using nested reduces but failes)
// Might try again at some other point to use double reduce LOL
let calculateCapacity = (trackerBoard, board) => {
  let count = 0;
  for (let r = 0; r < trackerBoard.length; r += 1) {
    for (let c = 0; c < trackerBoard[r].length; c += 1) {
      if (trackerBoard[r][c] === true && board[r][c] !== MINE) count += 1; 
    }
  }
  return count;
};


// ----------------------------- Game Initialization ---------------------------- //



// Create board and a tracker board
let board = makeBoard();
let trackerBoard = makeBoard();
let mineCoords = generateCoordinates();
let TOTAL_CAPACITY = COLUMNS * ROWS - NUM_MINES;
let current_capacity = 0;



// Fill board with random mine coordinates
fillBoard(board, mineCoords);

// For each board element, if it's not a mine, make it be equal to number of adjacent mines it has
fillBoardWithNums(board);


// Greet player
console.log('\n         Welcome to Minesweeper!');
printBoard(board, trackerBoard, false);
process.stdout.write('\nType coordinates: ');



// Command Line Input handler –> HUGE function
const handleCommandLineInput = input => {
  // Have to trim the newline from the input
  input = input.toString().trim();

  /* 
  // // This was used for debugging purposes
  // if (input === 'p') {
  //   return printBoard(board, trackerBoard, true);
  // }

  // if (input === 't') {
  //   return console.log(trackerBoard);
  // }
  */


  // Validate input
  if (invalidInput(input)) {
    console.log('Invalid input. Try again.');
    printBoard(board, trackerBoard, false);
    return process.stdout.write('\nType coordinates: ');
  }


  // Get row and column from the input by splitting by ','
  let [r, c] = input.split(',').map(Number);

  
  // If we haven't explored here yet (and we know because trackerBoard[r][c] === false),
  // and if we just didn't hit a mine... 
  // then explore and do BFS search from that spot in the board and outward.
  if (trackerBoard[r][c] === false && board[r][c] !== MINE) {
    console.log('Great job! No mines were hit.');

    // Expand our tracking board means to make more elements of it be true. 
    // More specifically, we try to make as many as we can to be true.
    expandTrackerBoard(board, trackerBoard, r, c);

    // Recalculate the capacity
    current_capacity = calculateCapacity(trackerBoard, board);
  }
  
  // If we didn't just hit a mine, print the board. This is on its own if statement because
  // the player could have input an already played coordinate, in which case we don't really
  // want to do BFS again, rather just display the board again.
  if (board[r][c] !== MINE) {
    printBoard(board, trackerBoard, false);
  }


  // If the player just hit a mine, he just lost. Reset the game state to initial conditions.
  if (board[r][c] === MINE) {
    printBoard(board, trackerBoard, true);
    console.log('There was a mine there! You lost :(');
    console.log('Restarting game...\n');

    board = makeBoard();
    trackerBoard = makeBoard();
    mineCoords = generateCoordinates();
    fillBoard(board, mineCoords);
    fillBoardWithNums(board);
    printBoard(board, trackerBoard, false);
  }


  // If the player has finished out all possible moves, then he just won. Let the player celebrate!
  // Reset the game state afterward.
  if (current_capacity === TOTAL_CAPACITY) {
    printBoard(board, trackerBoard, true);
    console.log('You won the game! Congrats!');
    console.log('Starting a new game...\n');

    board = makeBoard();
    trackerBoard = makeBoard();
    mineCoords = generateCoordinates();
    fillBoard(board, mineCoords);
    fillBoardWithNums(board);
    printBoard(board, trackerBoard, false);
  }


  process.stdout.write('\nType coordinates: ');
};


// Adding data event listener to the standard input.
stdin.addListener('data', handleCommandLineInput);
