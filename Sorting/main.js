const { mergeSort } = require('./mergeSort.js');
const { radixSort } = require('./radixSort.js');
const { quickSort } = require('./quickSort.js');

// Helper function to determine whether two arrays have equal elements in the same order.
const areEqual = (arr1, arr2) => arr1.filter((elem, idx) => elem !== arr2[idx]).length > 0;

let array = [2342, 529, 1923, 982, 3384, 9583, 298, 38, 290948, 4, 9482, 38, 95, 22, 13, 38];
let sorted = [4, 13, 22, 38, 38, 38, 95, 298, 529, 982, 1923, 2342, 3384, 9482, 9583, 290948];


// Sorted array using merge sort
let sortedMS = mergeSort(array);
console.log(`Merge sort does ${ areEqual(sorted, sortedMS) ? 'not ' : ''}work.`);


// Sorted array using radix sort
let sortedRS = radixSort(array, 10);
console.log(`Radix sort does ${ areEqual(sorted, sortedRS) ? 'not ' : ''}work.`);


// Creating new array to sort with radix sort
let quickSortArray = array.slice();
quickSort(quickSortArray);
console.log(`Quick sort does ${ areEqual(sorted, quickSortArray) ? 'not ' : ''}work and it's in place.`);
