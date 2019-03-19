const { mergeSort } = require('./mergeSort');
const { radixSort } = require('./radixSort');
const { quickSort } = require('./quickSort');
const { countingSort } = require('./countingSort');

// Helper function to determine whether two arrays have equal elements in the same order.
const areEqual = (arr1, arr2) => arr1.filter((elem, idx) => elem !== arr2[idx]).length > 0;

let array = [2342, 529, 1923, 982, 3384, 9583, 298, 38, 29094, 4, 9482, 38, 95, 22, 13, 38];
let sorted = [4, 13, 22, 38, 38, 38, 95, 298, 529, 982, 1923, 2342, 3384, 9482, 9583, 29094];

let sortingAlgos = [
  { name: 'Merge sort', sortingFunc: mergeSort },
  { name: 'Radix sort', sortingFunc: radixSort },
  { name: 'Quick sort', sortingFunc: quickSort },
  { name: 'Counting sort', sortingFunc: countingSort }
];

// Testing all sorting algorithms with the same data set
sortingAlgos.forEach(algorithm => {
  let arrayCopy = array.slice();
  let sortedCopy = sorted.slice();
  
  // If the algorithm is not Quick Sort, then it will return a new array. 
  if (algorithm.name !== 'Quick sort') {
    let sortedUsingAlgorithm = algorithm.sortingFunc(arrayCopy);
    console.log(`${ algorithm.name } does ${ areEqual(sortedCopy, sortedUsingAlgorithm) ? 'not ' : ''}work.`)

  // If the algorithm is Quick Sort, then it will be an in-place sorting algorithm and the comparison
  // should be different. In this case, the same array should be compared to the sorted one, and not any
  // output array because there is no output array.
  } else {
    algorithm.sortingFunc(arrayCopy);
    console.log(`${ algorithm.name } does ${ areEqual(arrayCopy, sortedCopy) ? 'not ' : ''}work.`)
  }
});
