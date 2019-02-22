const { InfixIterator } = require('./InfixIterator.js');

let peek = ar => ar[ar.length - 1];

let getRank = op => {
  if (op === '^') return 3;
  if (op === '*' || op === '/') return 2;
  if (op === '+' || op === '-') return 1;
  if (op === '=') return 0;
};

let hasHigherPrec = (a, b) => getRank(a) > getRank(b);

let handleOperator = (s, op, res) => {
  if (op === ')') {
    while (peek(s) !== '(') {
      res.push(s.pop());
    }
    return s.pop();
  }

  if (s.length === 0) {
    return s.push(op);
  }

  if (hasHigherPrec(op, peek(s)) || peek(s) === '(') {
    return s.push(op);
  }

  res.push(s.pop());

  while (hasHigherPrec(op, peek(s))) {
    res.push(s.pop());
  }

  return s.push(op);
};


let infixToRPN = infix => {
  let it = new InfixIterator(infix);
  let res = [];
  let s = [];

  while (it.hasNext()) {
    let curr = it.next();

    if (Number(curr) || Number(curr) === 0) {
      res.push(Number(curr));
    } else {
      handleOperator(s, curr, res);
    }
  }

  while (s.length !== 0) {
    res.push(s.pop());
  }

  return res;
};


// Tests
let str = '3+3';
console.log(infixToRPN(str));

str = '(3*5)+59-3/3';
console.log(infixToRPN(str));
