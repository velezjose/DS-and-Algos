class InfixIterator {
  constructor(infixStr) {
    this.infixStr = infixStr;
    this.idx = 0;
  }

  next() {
    let c = this.infixStr.charAt(this.idx);
    this.idx += 1;

    if (!Number(c) && Number(c) !== 0) return c;

    let nextChar = this.infixStr.charAt(this.idx);
    while ((Number(nextChar) || Number(nextChar) === 0) && this.hasNext()) {
      c += this.infixStr.charAt(this.idx);
      this.idx += 1;
      nextChar = this.infixStr.charAt(this.idx);
    }

    return c;
  }

  hasNext() {
    return this.idx < this.infixStr.length;
  }
}

module.exports = {
  InfixIterator,
};
