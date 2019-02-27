const { RollingHashIterator } = require('./RollingHashIterator.js');

// grep = find the needle in a haystack in O(n), and not O(nk)
//   - haystack has length |n|
//   - needle has length |k|

let grep = (haystack, needle) => {
  let res = [];

  let rollingHashIt = new RollingHashIterator(haystack, needle.length);
  let needleHash = (new RollingHashIterator(needle, needle.length)).next();

  while (rollingHashIt.hasNext()) {
    let nextHash = rollingHashIt.next();

    if (nextHash === needleHash) {
      res.push(rollingHashIt.getIndex());
    }
  }

  return res;
};


// Tests

// Test 1: grep(h, n) should be [0, 15, 34]
let haystack = 'abcabasdfasdfaaabcabasdfaaadbbbaddabc';
let needle = 'abc';
console.log(grep(haystack, needle), 'should be [0, 15, 34]');

// Test 2: grep(h, n) should be [0, 1, ... , 10]
haystack = 'bbbbbbbbbbbb';
needle = 'bb';
console.log(grep(haystack, needle), 'should be [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]');
