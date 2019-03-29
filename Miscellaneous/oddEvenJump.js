/**
 * @param {number[]} A
 * @return {number}
 */
var oddEvenJumps = A => {
  if (A.length < 1) return 0;
  if (A.length === 1) return 1;
  if (A.length === 2 && A[0] <= A[1]) return 2;
  if (A.length === 2) return 1;
  
  let dp = [new Array(A.length), new Array(A.length)];
  dp[0][A.length - 1] = true;
  dp[1][A.length - 1] = true;
  
  let count = 1;
  for (let i = A.length - 2; i >= 0; i -= 1) {
    let smallLOrEq, smIdx, largeSmOrEq, largeIdx;
    for (let j = i + 1; j < A.length; j += 1) {
      if ((smallLOrEq === undefined && A[i] <= A[j]) || (smallLOrEq > A[j] && A[i] <= A[j])) (smallLOrEq = A[j], smIdx = j);
      if ((largeSmOrEq === undefined && A[i] >= A[j]) || (largeSmOrEq < A[j] && A[i] >= A[j])) (largeSmOrEq = A[j], largeIdx = j);
    }
    
    dp[0][i] = smallLOrEq === undefined || dp[1][smIdx] === false ? false : true;
    dp[1][i] = largeSmOrEq === undefined || dp[0][largeIdx] === false ? false : true;
    count = dp[0][i] ? (count + 1) : count;
  }
  
  return count;
};

oddEvenJumps([10,13,12,14,15]);
