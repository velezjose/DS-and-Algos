// Helper function that swaps two elements in array –> keeping code DRY
const swap = (arr, i, j) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

// Quick sort implementation
// Has some default values when first called. None thereafter.
const quickSort = (arr, piv = 0, left = 1, right = arr.length - 1) => {
  if (left >= right) {
    return;
  }

  let start = piv;
  let end = right;

  // While the left and right pointers haven't met, keep going
  while (left < right) {
    if (arr[left] < arr[piv]) {
      left += 1;
    } else if (arr[right] >= arr[piv]) {
      right -= 1;
    } else {
      swap(arr, left, right);
    }
  }

  // Swap the pivot point's element with the corresponding lower value
  // and assign the pivot variable to that index.
  if (arr[left] < arr[piv]) {
    swap(arr, piv, left);
    piv = left;
  } else {
    swap(arr, piv, left - 1);
    piv = left - 1;
  }

  // Call quickSort on first half
  quickSort(arr, start, start + 1, piv - 1);
  // Call quickSort on second half
  quickSort(arr, piv + 1, piv + 2, end);
};


module.exports = {
  quickSort,
};
