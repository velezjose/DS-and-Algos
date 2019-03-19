let countingSort = nums => {
  let max = Math.max(...nums);
  let fM = new Array(max + 1).fill(0);

  nums.forEach(n => {
    fM[n] = fM[n] || 0;
    fM[n] += 1;
  });

  fM.reduce((acc, val, idx) => (fM[idx] = acc + val, fM[idx]));
  fM.unshift(0);
  fM.pop();

  let res = new Array(nums.length);

  nums.forEach(n => {
    let idx = fM[n];
    res[idx] = n;
    fM[n] += 1;
  });

  return res;
};

module.exports = {
  countingSort,
};
