const { recursiveBS } = require('./recursive.js');
const { iterativeBS } = require('./iterative.js');

// Tests for Recursive Binary Search implementation
console.log('Recursive Binary Search tests:')

// For an odd length array:
// Test 1: Should return true
let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let target = 7;
console.log(recursiveBS(nums, target), 'should return true.');


// Test 2: Should return false
target = 3.5;
console.log(recursiveBS(nums, target), 'should return false.');


// For an even length array:
// Test 3: 
nums = [1, 2, 3, 4, 5, 6, 7, 8];
target = 4;
console.log(recursiveBS(nums, target), 'should return true.');


// Test 4: 
target = 2.5;
console.log(recursiveBS(nums, target), 'should return false.');


console.log('\n');

// Tests for Iterative Binary Search implementation
console.log('Iterative Binary Search tests:')

// For an odd length array:
// Test 1: Should return true
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8];
target = 7;
console.log(iterativeBS(nums, target), 'should return true.');


// Test 2: Should return false
target = 3.5;
console.log(iterativeBS(nums, target), 'should return false.');


// For an even length array:
// Test 3: 
nums = [1, 2, 3, 4, 5, 6, 7, 8];
target = 4;
console.log(iterativeBS(nums, target), 'should return true.');


// Test 4: 
target = 2.5;
console.log(iterativeBS(nums, target), 'should return false.');
