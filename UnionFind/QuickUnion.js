class QuickUnion {
  constructor(size) {
    if (size < 1) throw 'Can\'t initialize QuickFind instance with size less than 1.';

    this._arr = [];
    for (let i = 0; i < size; i += 1) this._arr.push(i);
  }

  union(idx1, idx2) {
    this.validate(idx1, idx2);
    this._arr[idx1] = this._arr[idx2];
  }

  connected(idx1, idx2) {
    this.validate(idx1, idx2);
    return this.root(idx1) === this.root(idx2);
  }

  find(idx) {
    this.validate(idx);
    return this.root(idx);
  }

  root(idx) {
    while (idx !== this._arr[idx]) idx = this._arr[idx];
    return idx;
  }

  validate(idx1, idx2 = 0) {
    if (idx1 < 0 || idx2 < 0 || idx1 > this._arr.length - 1 || idx2 > this._arr.length - 1) {
      throw 'Invalid indexes.';
    }
  }
}

module.exports = {
  QuickUnion,
};
