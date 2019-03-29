class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

let constructFromPrePost = (pre, post) => {
  if (pre.length < 1) return null;
  if (pre.length === 1) return new TreeNode(pre[0]);

  let preIndexMap = {};
  pre.forEach((val, idx) => pre[val] = idx);
  let postIndexMap = {};
  post.forEach((val, idx) => post[val] = idx);

  let r = new TreeNode(pre[0]);
  return helper(r, pre, 0, pre.length - 1, post, 0, post.length - 1, preIndexMap, postIndexMap);
};

// Helper function takes in the root of the current tree,
// pre –> PreOrder traversal array 
// preSt and preE –> PreOrder traversal array's start and end indexes
// post —> PostOrder traversal array
// postSt and postE -> PostOrder traversal array's start and end indexes
// preIndexMap and postIndexMap –> hash maps of values to indexes in pre and post arrays
let helper = (root, pre, preSt, preE, post, postSt, postE, preIdxM, postIdxM) => {
  if (preSt >= preE && postSt >= postE) return new TreeNode(pre[preSt]);
  if (preE - preSt === 1) {
    let node = new TreeNode(pre[preSt]);
    node.left = new TreeNode(pre[preE]);
    node.right = null;
    return node;
  }
  
  let leftCh = new TreeNode(pre[preSt + 1]);
  let newPreSt = preSt + 1;
  let newPreE = preIdxM[post[postE - 1]] - 1;
  let newPostSt = postSt;
  let newPostE = postIdxM[pre[newPreSt]];
  root.left = helper(leftCh, pre, newPreSt, newPreE, post, newPostSt, newPostE, preIdxM, postIdxM);

  let rightCh = new TreeNode(post[postE - 1]);
  let newPreSt2 = newPreE + 1;
  let newPreE2 = preE;
  let newPostSt2 = newPostE + 1;
  let newPostE2 = postE - 1;
  
  if (newPreSt2 !== newPreSt && newPreE !== newPreE2) {
    root.right = helper(rightCh, pre, newPreSt2, newPreE2, post, newPostSt2, newPostE2, preIdxM, postIdxM);
  }
  
  return root;
};
