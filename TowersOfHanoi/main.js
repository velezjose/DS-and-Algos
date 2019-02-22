// Name of each tower: A, B, and C
const options = ['A', 'B', 'C'];

// Helper to get the third tower that's not *to* or *from*.
let getOther = (from, to) => {
  let copy = options.slice();
  copy.splice(copy.indexOf(to), 1);
  copy.splice(copy.indexOf(from), 1);
  return copy[0];  
};

// Helper function that takes in:
//  - num: number of disks
//  - from: tower where they are coming from
//  - to: is where they are all going
let helper = (num, from, to) => {
  // If *num* is 1, move *from* to *to* and return.
  if (num === 1) {
    return console.log(`Move ${from} to ${to}.`);
  }
  
  // The subproblem is, thus, moving *(num - 1)* from to other, then moving the biggest disk from
  // from to to, and finally moving (num - 1) disks from other to to.
  let other = getOther(from, to);
  helper(num - 1, from, other);
  console.log(`Move ${from} to ${to}.`);
  helper(num - 1, other, to);
};

let towersOfHanoi = n => {
  if (n < 1) return;

  helper(n, 'A', 'C');
};

console.log('Towers of Hanoi for 3:');
towersOfHanoi(3);

console.log('\nTowers of Hanoi for 4:');
towersOfHanoi(4);

console.log('\nTowers of Hanoi for 10:');
towersOfHanoi(10);
