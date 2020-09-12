/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {
  let ans = [];
  let combine = [];
  function dfs(target, idx) {
    // 超过范围
    if (
      idx > 10 ||
      combine.length > k ||
      (k - combine.length) * idx > n - target
    )
      return;
    // 满足条件加入结果
    if (target === n && combine.length == k) {
      ans.push([...combine]);
      return;
    }
    // 两种情况
    // 选
    combine.push(idx);
    dfs(target + idx, idx + 1);
    // 不选
    combine.pop();
    dfs(target, idx + 1);
  }
  dfs(0, 1);
  return ans;
};
