const mergeSort = array => {
  if (array === null || array === undefined) {
    return null;
  } else if (array.length === 1) {
    return array;
  }

  let half = Math.floor(array.length / 2);
  let firstHalf = array.slice(0, half);
  let secondHalf = array.slice(half);
  let sortedFirstHalf = mergeSort(firstHalf);
  let sortedSecondHalf = mergeSort(secondHalf);

  return merge(sortedFirstHalf, sortedSecondHalf);
};

const merge = (array1, array2) => {
  let mergedArray = [];
  let a1Idx = 0;
  let a2Idx = 0;

  while (a1Idx < array1.length && a2Idx < array2.length) {
    if (array1[a1Idx] < array2[a2Idx]) {
      let val = array1[a1Idx];
      a1Idx += 1;
      mergedArray.push(val);
    } else {
      let val = array2[a2Idx];
      a2Idx += 1;
      mergedArray.push(val);
    }
  }

  // If a1Idx was not the reason why the while loop ended, then push the remaining
  // contents to the mergedArray.
  if (a1Idx !== array1.length) {
    for (let i = a1Idx; i < array1.length; i += 1) {
      mergedArray.push(array1[i]);
    }
  }

  if (a2Idx !== array2.length) {
    for (let i = a2Idx; i < array2.length; i += 1) {
      mergedArray.push(array2[i]);
    }
  }

  return mergedArray;
};


module.exports = {
  mergeSort,
};
