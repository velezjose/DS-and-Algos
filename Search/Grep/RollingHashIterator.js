class RollingHashIterator {
  constructor(str, length, base) {
    if (str.length < length) throw 'Error: Cannot have string\'s length less than the input length.';

    this.str = str;
    this.len = length;
    this.idx = 0;
    this.rollingHash = null;
    this.base = this.base || 255;
  }

  next() {
    if (this.rollingHash === null) {
      let h = 0;
      for (let i = this.len - 1; i >= 0; i -= 1) {
        h += this.charCode(this.str.charAt(i)) * Math.pow(this.base, this.len - i - 1);
        this.idx += 1;
      }
      this.rollingHash = h;
      return this.rollingHash;
    }

    this.rollingHash = (this.rollingHash - this.charCode(this.str.charAt(this.idx - this.len)) * Math.pow(this.base, this.len - 1)) * this.base + this.charCode(this.str.charAt(this.idx));
    this.idx += 1;
    return this.rollingHash;
  }

  hasNext() {
    return this.idx < this.str.length;
  }

  getIndex() {
    let idx = this.idx - this.len;
    return idx < 0 ? 0 : idx;
  }

  charCode(str) {
    return str.charCodeAt(0);
  }
}

module.exports = {
  RollingHashIterator,
};
