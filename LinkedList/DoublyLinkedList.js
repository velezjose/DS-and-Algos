// Every node in the doubly-linked list has a storage, a previous and a next.
class Node {
  constructor(storage) {
    this.storage = storage;
    this.next = null;
    this.prev = null;
  }
}

// DoublyLinkedList class implementation
class DoublyLinkedList {
  // DoublyLinkedList object has a head and a tail
  constructor() {
    this.head = null;
    this.tail = null;
  }

  moveToHead(node) {
    // If node is itself the head, return it.
    if (node === this.head) {
      return node;
    }

    // If node is the tail, AND not the head (that is, the linked list has more than
    // one node), then the tail will have a previous, so assign it to be the new tail.
    if (node === this.tail && node !== this.head) {
      this.tail = this.tail.prev;
    }

    // Rewiring the reference of node's previous' next to be node's next.
    if (node.prev !== null) {
      node.prev.next = node.next;
    }

    // Rewiring the reference of node's next's previous to be node's previous
    if (node.next !== null) {
      node.next.prev = node.prev;
    }
    
    // Reassigning old head's references and assigning head to be node
    this.head.prev = node;
    node.prev = null;
    node.next = this.head;
    this.head = node;
  }

  addToHead(storage) {
    let newNode = new Node(storage);

    // If creating first node, assign it to be the head and tail
    if (this.head === null && this.tail === null) {
      this.head = newNode;
      this.tail = newNode;

    // Else change old head's previous reference and assign new head to be new node
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;    
    }
    
    return newNode;
  }

  deleteTail() {
    // If head === tail, make both null
    if (this.tail === this.head) {
      this.head = this.tail = null;

    // Delete old tail and return it's key so the hash map can delete it
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
