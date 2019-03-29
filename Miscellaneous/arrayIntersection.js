var intersection = (nums1, nums2) => {
  let set1 = new Set();
  nums1.forEach(num => set1.add(num));
  
  let resultsSet = new Set();
  for (let i = 0; i < nums2.length; i += 1)  {
      if (set1.has(nums2[i])) resultsSet.add(nums2[i]);
  }
  
  let results = [];
  let setIt = resultsSet.entries();
  let nextObj = setIt.next();

  while(nextObj.done === false) {
    results.push(nextObj.value[0]);
    nextObj = setIt.next();
  }

  return results;
};

console.log(intersection([1,2,2,1], [2, 2]));
