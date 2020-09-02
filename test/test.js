/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
  let ans = [];
  let m = new Map();
  for (let n of nums) {
    if (m.has(n)) {
      m.set(n, m.get(n) + 1);
    } else {
      m.set(n, 1);
    }
  }
  while (k-- > 0) {
    let max = 0,
      t = "";
    for (let key of m.keys()) {
      if (m.get(key) > max) {
        t = key;
        max = m.get(key);
      }
    }
    m.delete(t);
    ans.push(t);
  }
  return ans;
};
