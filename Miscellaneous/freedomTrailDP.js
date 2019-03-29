let findRotateSteps = (ring, key) => {

  // We'll be making a memo (named dp) of the following size: 
  //  width = ring.length
  //  height = key.length + 1
  let width = ring.length, height = key.length + 1;

  // We'll initialize every entry in dp with Infinity, except for the [0][0]
  // position, which starts out as 0
  let dp = [];
  for (let i = 0; i < height; i += 1) dp.push(new Array(width).fill(Infinity));
  dp[0][0] = 0;

  // We're looping over this entire memo starting at the second row (r = 1), from
  // top to bottom, left to right. Starting at this second row represents the first 
  // character in the key (named keyChar).
  for (let r = 1; r < height; r +=1) {
    let keyChar = key.charAt(r - 1);

    // Now we check if the ring character (named rChar) is equal to the keyChar. 
    for (let col = 0; col < width; col += 1) {
      let rChar = ring.charAt(col);

      if (keyChar !== rChar) continue;
      // If they aren't equal^^, we continue.


      // Else, if they are equal we need to examine all of the previous rows numbers that
      // are not infinity, calculate the distance to get from there to the current column
      // index where we're at, and do this for all of the previous rows numbers. We'll assign
      // the minimum of these numbers to our dp[r][col]. This will now become the minimum 
      // number of steps needed to get to this specific character in the ring that matches
      // the character in the key.

      // The minArr stores all of the distances from the previous character in the key and ring,
      // to the current character in the key and ring. And we assign, as said previously, the
      // minimum of all of these distances to dp[r][col] below the for-loop.
      let minArr = [];
      for (let prevColIdx = 0; prevColIdx < width; prevColIdx += 1) {
        let val = dp[r - 1][prevColIdx];
        if (val === Infinity) continue;

        minArr.push(val + Math.min(Math.abs(prevColIdx - col), Math.abs(width - Math.abs(prevColIdx - col))));
      }

      // Assigning the minima of all of these distances to dp[r][col]
      dp[r][col] = Math.min(...minArr);
    }
  }

  // Finally, once we exit these loops, we'll take the minimum number out of all of 
  // the numbers in the last row (i.e. row at index height - 1).
  // We add key.length to account for button presses.
  let min = Math.min(...dp[height - 1]);
  min += key.length;

  // We return this minimum.
  return min;
};


console.log(findRotateSteps('godding', 'gd'));
