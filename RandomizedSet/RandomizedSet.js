/**
 * Initialize your data structure here.
 */
let RandomizedSet = function() {
  this._storage = [];
  this._hashMap = new Map();
};

/**
* Inserts a value to the set. Returns true if the set did not already contain the specified element. 
* @param {number} val
* @return {boolean}
*/
RandomizedSet.prototype.insert = function(val) {
  let hashKey = val;
  
  if (this._hashMap.get(hashKey) !== undefined) return false;
  
  let newIndex = this._storage.length;
  this._hashMap.set(hashKey, newIndex);
  this._storage.push(hashKey);
  return true;
};

/**
* Removes a value from the set. Returns true if the set contained the specified element. 
* @param {number} val
* @return {boolean}
*/
RandomizedSet.prototype.remove = function(val) {
  if (this._hashMap.get(val) === undefined) return false;
  
  let idx = this._hashMap.get(val);
  
  if (idx !== this._storage.length - 1) {
      let lastIdx = this._storage.length - 1;
      let lastVal = this._storage[lastIdx];
      this.swap(idx, lastIdx);
      this._hashMap.set(lastVal, idx);
  }
          
  this._storage.pop();
  this._hashMap.delete(val);
  return true;
};

RandomizedSet.prototype.swap = function(idx1, idx2) {
  let temp = this._storage[idx1];
  this._storage[idx1] = this._storage[idx2];
  this._storage[idx2] = temp;
};

/**
* Get a random element from the set.
* @return {number}
*/
RandomizedSet.prototype.getRandom = function() {
  let rand = Math.floor(Math.random() * this._storage.length);
  return this._storage[rand];
};

module.exports = {
  RandomizedSet,
};
