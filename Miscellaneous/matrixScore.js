const flipRowBits = row => {
  row.forEach((elem, idx) => {
    if (elem === 0) row[idx] = 1;
    if (elem === 1) row[idx] = 0;
  });
};

const flipColBits = (arr, colIdx) => {
  for (let r = 0; r < arr.length; r += 1) {
    if (arr[r][colIdx] === 0) arr[r][colIdx] = 1;
    if (arr[r][colIdx] === 1) arr[r][colIdx] = 0;
  }
};

/**
* @param {number[][]} A
* @return {number}
*/
const matrixScore = arr => {
  if (arr.length < 1) return 0;
  if (arr.length === 1 && arr[0].length < 1) return 0;
  if (arr.length === 1) return parseInt(arr[0].map(() => '1').join(''), 2);
  
  for (let r = 0; r < arr.length; r += 1) {
    if (arr[r][0] !== 1) flipRowBits(arr[r]);
  }
  
  for (let c = 0; c < arr[0].length; c += 1) {
    let numZeros = 0, numOnes = arr.length;
    
    for (let r = 0; r < arr.length; r += 1) {
      if (arr[r][c] === 0) (numZeros += 1, numOnes -= 1);
    }
    
    if (numZeros > numOnes) flipColBits(arr, c);
  }
  
  return arr.reduce((acc, row) => (acc + parseInt(row.reduce((rowAcc, elem) => (rowAcc.push(elem), rowAcc), []).join(''), 2)), 0);
};