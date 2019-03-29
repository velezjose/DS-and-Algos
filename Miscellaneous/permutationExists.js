let stringIt = (str, len = str.length) => {

  let idx = null;
  let hash = 0;
  
  return {
    hasNext: () => {
      if (idx === null) return true;
      return idx < str.length;
    },
    next: function() {
      if (!this.hasNext()) throw 'Err: No next';
      
      if (idx === null) {
          idx = 0;
          while (idx < len) {
              hash += str.charCodeAt(idx);
              idx += 1;
          }
          return hash;
      }

      let firstCharVal = str.charCodeAt(idx - len);
      hash -= firstCharVal;
      let newCharVal = str.charCodeAt(idx);
      hash += newCharVal;

      idx += 1;
      return hash;
    },

    isPermutationOfCurrent: (input) => {
      let frequencies = {}
      for (let i = 0; i < input.length; i += 1) {
        frequencies[input.charAt(i)] = frequencies[input.charAt(i)] || 0;
        frequencies[input.charAt(i)] += 1;
      }

      let currStr = str.substring(idx - len, idx);

      for (let i = 0; i < currStr.length; i += 1) frequencies[currStr.charAt(i)] -= 1;
      
      return Object.keys(frequencies).every(val => {
        return frequencies[val] === 0;
      });
    }
  }
}

let checkInclusion = function(s1, s2) {
  if (s1.length > s2.length) return false;
  
  let s1Hash = stringIt(s1).next();
  let s2It = stringIt(s2, s1.length);
  
  while (s2It.hasNext()) {
    let s2Hash = s2It.next();
    if (s1Hash === s2Hash && s2It.isPermutationOfCurrent(s1)) return true;
  }

  return false;
};

console.log(checkInclusion('ab', 'eidbaooo'));
console.log(checkInclusion('adc', 'dcda'));
console.log(checkInclusion('abc', 'ccccbbbbaaaa'));