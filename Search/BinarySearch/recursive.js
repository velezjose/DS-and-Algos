let binarySearch = (nums, target, left = 0, right = nums.length - 1) => {
  if (nums === null && nums === undefined) return;
  
  let mid = Math.floor((left + right) / 2);

  if (nums[mid] === target) {
    return true;
  } else if (left > right) {
    return false;
  } else if (target < nums[mid]) {
    return binarySearch(nums, target, left, mid - 1);
  } else if (nums[mid] < target) {
    return binarySearch(nums, target, mid + 1, right);
  }

};

module.exports = {
  recursiveBS: binarySearch,
};
