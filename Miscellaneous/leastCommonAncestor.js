function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

let root = new TreeNode(6);
root.left = new TreeNode(2);
root.right = new TreeNode(8);
root.left.left = new TreeNode(0);
root.left.right = new TreeNode(4);
root.left.right.left = new TreeNode(3);
root.left.right.right = new TreeNode(5);

root.right.left = new TreeNode(7);
root.right.right = new TreeNode(9);

let getPath = function(node, val, ar) {
  ar.push(node.val);
  if (node.val === val) {
      return ar;
  } else if (val < node.val) {
      return getPath(node.left, val, ar);
  } else if (node.val < val) {
      return getPath(node.right, val, ar);
  }
};

let lowestCommonAncestor = function(root, p, q) {
  let pPath = getPath(root, p, []);
  let qPath = getPath(root, q, []);
  
  let idx = 0;
  
  while (pPath[idx] === qPath[idx] && idx < pPath.length && idx < qPath.length) idx += 1;
  
  return pPath[idx - 1];
};


lowestCommonAncestor(root, 2, 8);