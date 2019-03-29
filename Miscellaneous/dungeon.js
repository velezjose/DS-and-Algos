let calculateMinimumHP = dun => {
  let dp = [];
  let height = dun.length;
  let width = dun[0].length;

  let row = new Array(width + 1);
  row[width] = Infinity;
  for (let r = 0; r < height; r += 1) dp.push(row.slice());

  let newRow = new Array(width + 1).fill(Infinity);
  newRow[width - 1] = 1;
  dp.push(newRow);

  for (let c = width - 1; c >= 0; c -= 1) {
    for (let r = height - 1; r >= 0; r -= 1) {
      dp[r][c] = Math.min(dp[r + 1][c] - dun[r][c], dp[r][c + 1] - dun[r][c]);

      if (dp[r][c] <= 0) dp[r][c] = 1;
    }
  }

  return dp[0][0];
};
