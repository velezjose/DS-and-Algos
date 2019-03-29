let TreeNode = (val) => {
  let obj = {};
  obj.val = val;
  return obj;
};


let helper = (tracker, minB, maxB, pre) => {
  if (tracker.idx > pre.length - 1) return null;
  
  let root = null;
  
  if (minB < pre[tracker.idx] && pre[tracker.idx] < maxB) {
    root = TreeNode(pre[tracker.idx]);
    tracker.idx += 1;
    
    root.left = helper(tracker, minB, root.val, pre);
    root.right = helper(tracker, root.val, maxB, pre);
  }
  
  return root;
};


let constructFromPre = pre => {
  if (pre.length < 1) return null;
  if (pre.length === 1) return TreeNode(pre[0]);

  return helper({ idx: 0 }, -Infinity, Infinity, pre);
};


let treeFromPre = constructFromPre([10, 5, 1, 7, 40, 50]);
