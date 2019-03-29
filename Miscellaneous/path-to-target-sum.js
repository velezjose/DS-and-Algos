// --------------- Binary Search Tree Class --------------- //

const BinarySearchTree = function(value) {
  let obj = Object.create(BinarySearchTree.prototype);
  obj.value = value;
  obj.left = null;
  obj.right = null;
  return obj;
};

BinarySearchTree.prototype.insert = function(value) {
  if (this.value === undefined) {
    this.value = value;
    return;

  } else if (this.contains(value)) {
    return;

  } else {
    let insertNode = BinarySearchTree(value);
    let node = this;

  
    while (node) {
      if (node.value > value) {
        if (node.left) {
          node = node.left;
        } else {
          node.left = insertNode;
          break;
        }
      } else if (node.value < value) {
        if (node.right) {
          node = node.right;
        } else {
          node.right = insertNode;
          break;
        }
      }
    }

  }

};

BinarySearchTree.prototype.contains = function(value) {
  if (this.value === undefined) {
    return false;
  }

  let node = this;

  while (node !== null) {
    if (node.value === value) {
      return true;
    } else if (node.value > value) {
      node = node.left;
    } else if (node.value < value) {
      node = node.right;
    }
  }

  return false;

};

BinarySearchTree.prototype.depthFirstLog = function(cb) {
  
  let runCallBack = function(node) {
    if (node === null) {
      return;
    } 
    if (node.value) {
      cb(node.value);
    }
    if (node.left) {
      runCallBack(node.left);
    } 
    if (node.right) {
      runCallBack(node.right);
    }

  };

  runCallBack(this);
};

BinarySearchTree.prototype.breadthFirstLog = function(cb) {
  
  let array = [];
  array.push(this);

  while(array.length > 0) {
    let node = array.shift();
    cb(node.value);
    if (node.left) {
      array.push(node.left);
    }
    if (node.right) {
      array.push(node.right);
    }
  }
  
};


// --------------------------------------------------------- //




const hasPathToSum = (node, targetSum, currentSum = 0) => {
  const isLeaf = (node) => {
    return node.left === null && node.right === null;
  };

  let hasPath;
  currentSum = currentSum + node.value;

  if (isLeaf(node)) {
    return targetSum === currentSum;
    
  } else {
    if (node.left) {
      hasPath = hasPathToSum(node.left, targetSum, currentSum);
    }
  
    if (hasPath !== true) {
      if (node.right) {
        hasPath = hasPathToSum(node.right, targetSum, currentSum);
      }
    }
  }

  return hasPath;
};


// Constructing Binary Search Tree using helper class
let tree = new BinarySearchTree(7);
tree.insert(4);  //                  7
tree.insert(10); //               /     \
tree.insert(2);  //            4           10
tree.insert(5);  //         /     \      /     \
tree.insert(9);  //       2       5    9        13
tree.insert(13); //    /    \                 /
tree.insert(1);  //   1     3                11
tree.insert(3);  // 
tree.insert(11); //   Only possible sums in this Binary Tree: 14, 16, 26 and 41. 

// Tests should all give expected results:
console.log('Expect', hasPathToSum(tree, 0), 'to be false.');
console.log('Expect', hasPathToSum(tree, 1), 'to be false.');
console.log('Expect', hasPathToSum(tree, 2), 'to be false.');
console.log('Expect', hasPathToSum(tree, 3), 'to be false.');
console.log('Expect', hasPathToSum(tree, 4), 'to be false.');
console.log('Expect', hasPathToSum(tree, 5), 'to be false.');
console.log('Expect', hasPathToSum(tree, 6), 'to be false.');
console.log('Expect', hasPathToSum(tree, 7), 'to be false.');
console.log('Expect', hasPathToSum(tree, 8), 'to be false.');
console.log('Expect', hasPathToSum(tree, 9), 'to be false.');
console.log('Expect', hasPathToSum(tree, 10), 'to be false.');
console.log('Expect', hasPathToSum(tree, 11), 'to be false.');
console.log('Expect', hasPathToSum(tree, 12), 'to be false.');
console.log('Expect', hasPathToSum(tree, 13), 'to be false.');
console.log('Expect', hasPathToSum(tree, 14), 'to be true.');
console.log('Expect', hasPathToSum(tree, 15), 'to be false.');
console.log('Expect', hasPathToSum(tree, 16), 'to be true.');
console.log('Expect', hasPathToSum(tree, 17), 'to be false.');
console.log('Expect', hasPathToSum(tree, 18), 'to be false.');
console.log('Expect', hasPathToSum(tree, 19), 'to be false.');
console.log('Expect', hasPathToSum(tree, 20), 'to be false.');
console.log('Expect', hasPathToSum(tree, 21), 'to be false.');
console.log('Expect', hasPathToSum(tree, 22), 'to be false.');
console.log('Expect', hasPathToSum(tree, 23), 'to be false.');
console.log('Expect', hasPathToSum(tree, 24), 'to be false.');
console.log('Expect', hasPathToSum(tree, 25), 'to be false.');
console.log('Expect', hasPathToSum(tree, 26), 'to be true.');
console.log('Expect', hasPathToSum(tree, 27), 'to be false.');
console.log('Expect', hasPathToSum(tree, 28), 'to be false.');
console.log('Expect', hasPathToSum(tree, 29), 'to be false.');
console.log('Expect', hasPathToSum(tree, 30), 'to be false.');
console.log('Expect', hasPathToSum(tree, 31), 'to be false.');
console.log('Expect', hasPathToSum(tree, 32), 'to be false.');
console.log('Expect', hasPathToSum(tree, 33), 'to be false.');
console.log('Expect', hasPathToSum(tree, 34), 'to be false.');
console.log('Expect', hasPathToSum(tree, 35), 'to be false.');
console.log('Expect', hasPathToSum(tree, 36), 'to be false.');
console.log('Expect', hasPathToSum(tree, 37), 'to be false.');
console.log('Expect', hasPathToSum(tree, 38), 'to be false.');
console.log('Expect', hasPathToSum(tree, 39), 'to be false.');
console.log('Expect', hasPathToSum(tree, 40), 'to be false.');
console.log('Expect', hasPathToSum(tree, 41), 'to be true.');