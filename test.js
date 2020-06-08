/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  let m = new Map();
  for (let i = 0; i < nums.length; ++i) {
    const cur = nums[i];
    if (m.has(cur)) {
      if (i - m.get(cur) <= k) {
        return true;
      }
    }
    m.set(cur, i);
  }
  return false;
};
