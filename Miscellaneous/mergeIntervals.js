let merge = function(ints) {
  ints.sort((a, b) => {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    if (a[1] < b[1]) return -1;
    return 1;
  });
    
  let results = [];
  let i = 0; 
  while (i < ints.length) {
    let merged = [ints[i][0]];
    
    let max = ints[i][1];
    for (let j = i + 1; j < ints.length; j += 1) {
      let nextMin = ints[j][0]; 
      let nextMax = ints[j][1];
      i += 1;
      if (nextMin > max) {
        i -= 1;
        break;
      } else if (max >= nextMin) {
        max = nextMax;
      }
    }
    i += 1;
    merged.push(max);
    results.push(merged);
  }
  
  return results;
};

// console.log(merge([[1, 4], [2, 6]]));
// console.log(merge([[1, 6], [8, 10], [15, 18]]));
