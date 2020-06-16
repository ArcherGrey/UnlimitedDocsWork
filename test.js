/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  function helper(l, r) {
    if (l > r) return null;
    let mid = ~~((l + r) / 2);
    if ((l + r) % 2) {
      mid++;
    }

    // 中序遍历
    const root = new TreeNode(nums[mid]);
    root.left = helper(l, mid - 1);
    root.right = helper(mid + 1, r);
    return root;
  }
  return helper(0, nums.length - 1);
};
