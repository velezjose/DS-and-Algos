let getNextMin = function(ar, idx) {
  while (idx < ar.length && ar[idx] >= ar[idx + 1]) idx += 1;
  
  return { idx: idx, val: ar[idx] };
};

let getNextMax = function(ar, idx) {
  while (idx < ar.length && ar[idx] <= ar[idx + 1]) idx += 1;
  
  return { idx: idx, val: ar[idx] };
}

/**
* @param {number[]} prices
* @return {number}
*/
var maxProfit = function(prices) {
  if (prices.length < 2) return 0;
  
  let sum = 0;
  
  let minObj = getNextMin(prices, 0);
  let maxObj = getNextMax(prices, minObj.idx);
  
  while (minObj.idx < prices.length && maxObj.idx < prices.length && minObj.idx < maxObj.idx) {
      sum += Math.max(maxObj.val - minObj.val, 0);
      minObj = getNextMin(prices, maxObj.idx);
      maxObj = getNextMax(prices, minObj.idx);
  }
  
  return sum;
};


let prices = [7, 1, 5, 3, 6, 4];
maxProfit(prices);