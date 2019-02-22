let helper = (op, nums) => {
  let s = nums.pop();
  let f = nums.pop();

  let result;
  if (op === '+') {
    result = f + s;
  } else if (op === '-') {
    result = f - s;
  } else if (op === '*') {
    result = f * s;
  } else if (op === '/') {
    result = f / s;
  } else if (op === '%') {
    result = f % s;
  } else if (op === '^') {
    result = Math.pow(f, s);
  }

  return result;
};


// Evaluate array given in RPN
let evaluate = rpn => {
  let s = [];

  while (rpn.length !== 0) {
    let curr = rpn.shift();

    if (typeof curr !== 'number') {
      let val = helper(curr, s);
      s.push(val);
    } else if (typeof curr === 'number') {
      s.push(curr);
    }
  }

  return s[0];
};


console.log(`${evaluate([5, 3, 2, '*', '+'])} should be 11.`);
console.log(`${evaluate([12, 3, '-', 3, '/'])} should be 3.`);

module.exports = {
  evaluate,
};
