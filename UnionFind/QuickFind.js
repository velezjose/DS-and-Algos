class QuickFind {
  constructor(size) {
    if (size < 1) throw 'Can\'t initialize QuickFind instance with size less than 1.';

    this._arr = [];
    for (let i = 0; i < size; i += 1) this._arr.push(i);
  }

  union(idx1, idx2) {
    this.validate(idx1, idx2);

    let p1 = this._arr[idx1];
    let p2 = this._arr[idx2];

    for (let i = 0; i < this._arr.length; i += 1) {
      if (this._arr[i] === p1) this._arr[i] = p2;
    }
  }

  find(idx) {
    this.validate(idx);
    return this._arr[idx];
  }

  connected(idx1, idx2) {
    this.validate(idx1, idx2);
    return this._arr[idx1] === this._arr[idx2];
  }

  validate(idx1, idx2 = 0) {
    if (idx1 < 0 || idx2 < 0 || idx1 > this._arr.length - 1 || idx2 > this._arr.length - 1) {
      throw 'Invalid indexes.';
    }
  }
}

module.exports = {
  QuickFind,
};
