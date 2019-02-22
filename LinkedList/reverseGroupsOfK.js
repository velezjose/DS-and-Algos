const { LinkedList } = require('./LinkedList.js');

// Gets next new head in the sequence
let getNextHead = (current, k) => {
  for (let i = 1; i < k; i += 1) {
    if (current === null) return null;
    current = current.next;
  }
  return current;
};

// Helper to reverse the linked list
let reverseHelper = (newTail, newHead) => {
  let current = newTail;

  while (current !== newHead) {
    let next = current.next;
    current.next = newHead.next;
    newHead.next = current;
    current = next;
  }

  return newTail.next;
};


// Reverse groups of k in the LinkedList
// If LinkedList has length < k, return it without modification.
let reverseGroupsOfK = (head, k) => {
  let returnHead = getNextHead(head, k);

  if (returnHead === null) return head;

  let oldHead = head;
  let newHead = returnHead;

  reverseHelper(oldHead, newHead);
  oldHead.next = reverseGroupsOfK(oldHead.next, k);

  return returnHead;
};


// Tests
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

// LinkedLists that    head                       tail
// will be created      |                          |
// have the following   |                          |
// form:                V                          V
//                      a -> b -> c -> ... -> y -> z

// LinkedList for Test 1:  k = 3
let ll1 = new LinkedList();
alphabet.split('').forEach(char => ll1.append(char));

// Before reversing by groups of 3
console.log('\nFor k = 3')
console.log(ll1.toString());

// After reversing by groups of 3
ll1.head = reverseGroupsOfK(ll1.head, 3);
console.log(ll1.toString());



// LinkedList for Test 2:  k = 5
let ll2 = new LinkedList();
alphabet.split('').forEach(char => ll2.append(char));

// Before reversing by groups of 5
console.log('\nFor k = 5')
console.log(ll2.toString());

// After reversing by groups of 5
ll2.head = reverseGroupsOfK(ll2.head, 5);
console.log(ll2.toString());



// LinkedList for Test 3:  k = 1
let ll3 = new LinkedList();
alphabet.split('').forEach(char => ll3.append(char));

// Before reversing by groups of 1
console.log('\nFor k = 1')
console.log(ll3.toString());

// After reversing by groups of 1
ll3.head = reverseGroupsOfK(ll3.head, 1);
console.log(ll3.toString());



// LinkedList for Test 4:  k = 20
let ll4 = new LinkedList();
alphabet.split('').forEach(char => ll4.append(char));

// Before reversing by groups of 20
console.log('\nFor k = 20')
console.log(ll4.toString());

// After reversing by groups of 20
ll4.head = reverseGroupsOfK(ll4.head, 20);
console.log(ll4.toString());
