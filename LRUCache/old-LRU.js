// Node class for Doubly LL
var Node = function(storage) {
    this.storage = storage; 
    this.next = null;
    this.prev = null;
};

// DoublyLinkedList functional-based class
var DoublyLinkedList = function() {
    this.head = null;
    this.tail = null;
};

DoublyLinkedList.prototype.moveToHead = function(node) {
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
};

DoublyLinkedList.prototype.addToHead = function(storage) {
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
};

DoublyLinkedList.prototype.deleteTail = function() {
    if (this.tail === this.head) {
        this.head = this.tail = null;
    } else {
        let oldTail = this.tail;
        this.tail = this.tail.prev;
        this.tail.next = null;
        oldTail.prev = null;
        return oldTail.storage.key;
    }
};


// LRUCache functional-based class
var LRUCache = function(capacity) {
    this.ll = new DoublyLinkedList();
    this.hM = new Map();
    this.c = capacity;
};

LRUCache.prototype.get = function(key) {
    if (this.hM.get(key) !== undefined) {
        let node = this.hM.get(key);
        let storage = node.storage;
        let val = storage.val;
        this.ll.moveToHead(node);
        return val;
    } else {
        return -1;
    }
};

LRUCache.prototype.put = function(key, value) {
    if (this.hM.get(key) === undefined) {
        let node = this.ll.addToHead({ key: key, val: value });
        this.hM.set(key, node);
        this.checkLLCapacity();
    } else {
        node = this.hM.get(key);
        node.storage.val = value;
        this.ll.moveToHead(node);
    }
};

LRUCache.prototype.checkLLCapacity = function() {
    if (this.hM.size > this.c) {
        let key = this.ll.deleteTail();
        this.hM.delete(key);
    }
};
