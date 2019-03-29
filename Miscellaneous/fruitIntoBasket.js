
let totalFruit = tree => {

  // If tree array's length is < 1, return 0
  if (tree.length < 1) return 0;
  // If tree array's length is <= 2, return its length
  if (tree.length <= 2) return tree.length;
  
  // We'll start a globalMax variable that we'll update as we loop through the array
  let globalMax = 1;
  // We'll set a previous object with what is the number and what's it's streak so far
  // which we'll be updating as we loop through the array
  let prev = { num: tree[0], streak: 1 };

  // The current max amount of fruits that we have collected is 1
  let currCount = 1;

  // Other starts as undefined
  let other;
  
  // Loop through the array
  for (let i = 1; i < tree.length; i += 1) {
    let curr = tree[i];
    
    // If the current fruit type is the same as the previous', increase the previous'
    // streak and increate current count (i.e. the current total streak by 2 numbers) by 1
    if (curr === prev.num) {
      prev.streak += 1;
      currCount += 1;

    // Else if current is the other number, set previous to other, and it's streak to 1,
    // set other to the previous.num (which is now not the previous). Most importantly, 
    // still increase the current count.
    } else if (curr === other) {
      currCount += 1;
      let tempPrev = prev.num;
      prev.num = other;
      prev.streak = 1;
      other = tempPrev;

    // If the current is not the previous nor the other number, reset the current count to 
    // the previous' streak + 1 (to include this new number), set the previous.num to be current,
    // and set the other to the previous.num (since it's now the other and not the previous.num).
    } else if (curr !== other && curr !== prev.num) {
      currCount = prev.streak + 1;
      let tempPrev = prev.num;
      prev.num = curr;
      prev.streak = 1;
      other = tempPrev;
    }
    
    // Update the global max on every iteration
    globalMax = Math.max(globalMax, currCount);
  }
  
  // Return global max
  return globalMax;
};
