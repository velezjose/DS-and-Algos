let getI = (a, b) => ((a + b) / 2);
let getJ = (half, i) => half - i;

let findMedianSortedArrays = (A, B) => {    
  if (A.length < B.length) {
    let temp = A;
    A = B;
    B = temp;
  }
  
  let n = A.length, m = B.length;
  let imin = 0, imax = n;
  let half = Math.floor((m + n + 1) / 2);
  let i = getI(imin, imax);
  let j = getJ(half, i);
    
  while (imin <= imax) {
    i = getI(imin, imax);
    j = getJ(half, i);
      
    if (i > imin && A[i - 1] > B[j]) {
      imax = i - 1;
        
    } else if (i < imax && B[j - 1] > A[i]) {
      imin = i + 1;
        
    } else {
      let maxLeft = 0;
      if (i === 0) { 
        maxLeft = B[j - 1]; 
      } else if (j === 0) { 
        maxLeft = A[i - 1]; 
      } else { 
        maxLeft = Math.max(A[i - 1], B[j - 1]); 
      }
      
      if ((m + n) % 2 === 1) { 
        return maxLeft; 
      }
      
      let minRight = 0;
      if (i === m) { 
        minRight = B[j];
      } else if (j === n) {
        minRight = A[i]; 
      } else { 
        minRight = Math.min(B[j], A[i]);
      }
  
      return (maxLeft + minRight) / 2;
    }
    
  }
};

console.log(findMedianSortedArrays([1,3], [2]));
