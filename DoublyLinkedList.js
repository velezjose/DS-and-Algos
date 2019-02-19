class Node {
  constructor(storage) {
    this.storage = storage;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  moveToHead(node) {
    if (node === this.tail && node !== this.head) {
      this.tail = this.tail.prev;
    }

    if (node === this.head) {
      return node;
    }

    if (node.prev !== null) {
      node.prev.next = node.next;
    }

    if (node.next !== null) {
      node.next.prev = node.prev;
    }
    
    this.head.prev = node;
    node.prev = null;
    node.next = this.head;
    this.head = node;
  }

  addToHead(storage) {
    let newNode = new Node(storage);

    if (this.head === null && this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;    
    }
    
    return newNode;
  }

  deleteTail() {
    if (this.tail === this.head) {
      this.head = this.tail = null;
    } else {
      let oldTail = this.tail;
      this.tail = this.tail.prev;
      this.tail.next = null;
      oldTail.prev = null;
      return oldTail.storage.key;
    }
  }
}

module.exports = {
  DoublyLinkedList,
};
