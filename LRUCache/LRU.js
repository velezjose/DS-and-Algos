const { DoublyLinkedList } = require('../LinkedList/DoublyLinkedList.js');

class LRUCache {
  // LRUCache needs a hash map, a doubly linked list, and capacity data fields
  constructor(capacity) {
    this.doublyLinkedList = new DoublyLinkedList();
    this.hashMap = new Map();
    this.capacity = capacity;
  }

  // HashMap ensure O(1) get(key) operation
  get(key) {
    if (this.hashMap.get(key) !== undefined) {
      let node = this.hashMap.get(key);
      let storage = node.storage;
      let val = storage.val;
      this.doublyLinkedList.moveToHead(node);
      return val;
    } else {
      return -1;
    }
  }

  // Both together ensure O(1) put(key, value). More specifically, DoublyLinkedList
  // ensures O(1) evict operation when max capacity is reached. It needs to be
  // doubly so that the tail's previous can be referenced in O(1) and a linear
  // search for the tail won't have to be conducted.
  put(key, value) {
    if (this.hashMap.get(key) === undefined) {
      let node = this.doublyLinkedList.addToHead({ key: key, val: value });
      this.hashMap.set(key, node);
      this.checkLLCapacity();
    } else {
      let node = this.hashMap.get(key);
      node.storage.val = value;
      this.doublyLinkedList.moveToHead(node);
    }
  }

  checkLLCapacity() {
    if (this.hashMap.size > this.capacity) {
      let key = this.doublyLinkedList.deleteTail();
      this.hashMap.delete(key);
    }
  }
}

module.exports = {
  LRUCache,
};
