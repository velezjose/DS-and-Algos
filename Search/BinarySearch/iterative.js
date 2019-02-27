let getMid = (l, r) => Math.floor((l + r) / 2);

let binarySearch = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;
  let mid = getMid(left, right);

  while (left <= right) {
    if (nums[mid] === target) {
      return true;
    } else if (target < nums[mid]) {
      right = mid - 1;
      mid = getMid(left, right);
    } else if (nums[mid] < target) {
      left = mid + 1;
      mid = getMid(left, right);
    }
  }

  return false;
};

module.exports = {
  iterativeBS: binarySearch,
};
