let generator = string => {
  let idx = -1;
  return {
    hasNext: () => idx <= string.length - 2,
    next: () => {
      if (idx > string.length - 1) throw 'No next exception.';
      idx += 1;
      return string.charAt(idx);
    }
  };
};

// Tests
let iterator = generator('abcde');
while (iterator.hasNext()) {
  console.log(iterator.next());
}

let iterator2 = generator('abcdefghi');
while (iterator2.hasNext()) {
  console.log(iterator2.next());
}
