let helper = (r, c, A, cache) => {
  let key = r.toString() + ',' + c.toString();

  if (cache[key] !== undefined) return cache[key]; 
  if (r === A.length - 1) return A[r][c];

  let left = Infinity;
  if (c >= 1) left = helper(r + 1, c - 1, A, cache);

  let bottom = helper(r + 1, c, A, cache);

  let right = Infinity;
  if (c < A[0].length - 1) right = helper(r + 1, c + 1, A, cache); 

  cache[key] = A[r][c] + Math.min(left, bottom, right);
  return cache[key];
};

let minPathSum = A => {
  if (A.length === 0) return null;
  if (A.length === 1) return Math.min(...A[0]);

  let cache = {};
  let min = Infinity;
  for (let i = 0; i < A[0].length; i += 1) {
    min = Math.min(min, helper(0, i, A, cache));
  }

  return min;
};

console.log(minPathSum([[1,2,3], [4,5,6], [7,0,9]]));
