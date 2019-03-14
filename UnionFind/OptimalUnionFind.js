class CompressedAndWeightedUnionFind {
  constructor(size) {
    if (size < 1) throw 'Can\'t initialize QuickFind instance with size less than 1.';

    this._arr = [];
    for (let i = 0; i < size; i += 1) this._arr.push(i);
    this.sz = new Array(size).fill(1);
  }

  find(idx) {
    this.validate(idx);
    return this.root(idx);
  }

  connected(idx1, idx2) {
    this.validate(idx1, idx2);
    return this.root(idx1) === this.root(idx2);
  }

  union(idx1, idx2) {
    if (this.sz[idx1] > this.sz[idx2]) {
      this._arr[idx1] = this._arr[idx2];
    } else {
      this._arr[idx2] = this._arr[idx1];
    }

    this.sz[idx1] += this.sz[idx2];
    this.sz[idx2] = this.sz[idx1];
  }

  root(idx) {
    while (this._arr[idx] !== idx) {
      this._arr[idx] = this._arr[this._arr[idx]];
      idx = this._arr[idx];
    }
    return idx;
  }

  validate(idx1, idx2 = 0) {
    if (idx1 < 0 || idx2 < 0 || idx1 > this._arr.length - 1 || idx2 > this._arr.length - 1) {
      throw 'Invalid indexes.';
    }
  }
}

module.exports = {
  CompressedAndWeightedUnionFind,
};
