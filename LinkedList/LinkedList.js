class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}


// Simplest possible LinkedList class
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(val) {
    let node = new ListNode(val);

    if (this.head === null && this.tail === null) {
      this.head = node;
      this.tail = node;
      return;
    }

    let oldTail = this.tail;
    oldTail.next = node;
    this.tail = node;
  }

  toString() {
    if (this.head === null) {
      return '';
    }

    let sb = [];
    let current = this.head;
    while (current !== null) {
      sb.push(current.val);
      sb.push('->')
      current = current.next;
    }

    sb.pop();
    return sb.join(' ');
  }
}

module.exports = {
  LinkedList,
};
