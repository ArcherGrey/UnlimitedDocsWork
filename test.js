/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  let str = "";
  if (!root) str += "null,";
  else {
    str += root.val + ",";
    str += serialize(root.left, str);
    str += serialize(root.right, str);
  }
  return str;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  let arr = data.split(",");
  arr.pop();
  return rd(arr);
};

var rd = function (arr) {
  if (arr[0] == "null") {
    arr.shift();
    return null;
  }
  let root = new TreeNode(arr.shift());
  root.left = rd(arr);
  root.right = rd(arr);
  return root;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
