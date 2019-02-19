const { DoublyLinkedList } = require('./DoublyLinkedList.js');

class LRUCache {
  constructor(capacity) {
    this.dLList = new DoublyLinkedList();
    this.hashMap = new Map();
    this.c = capacity;
  }

  get(key) {
    if (this.hashMap.get(key) !== undefined) {
      let node = this.hashMap.get(key);
      let storage = node.storage;
      let val = storage.val;
      this.dLList.moveToHead(node);
      return val;
    } else {
        return -1;
    }
  }

  put(key, value) {
    if (this.hashMap.get(key) === undefined) {
      let node = this.dLList.addToHead({ key: key, val: value });
      this.hashMap.set(key, node);
      this.checkLLCapacity();
    } else {
      node = this.hashMap.get(key);
      node.storage.val = value;
      this.ll.moveToHead(node);
    }
  }

  checkLLCapacity() {
    if (this.hashMap.size > this.c) {
      let key = this.dLList.deleteTail();
      this.hashMap.delete(key);
    }
  }
}

module.exports = {
  LRUCache,
};
