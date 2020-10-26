/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function(nums) {
  let m = new Map();
  for (let n of nums) {
    if (!m.has(n)) m.set(n, 1);
    else m.set(n, m.get(n) + 1);
  }

  let ans = [];
  for (let n of nums) {
    let t = 0;
    for (let c of m) {
      if (c[0] < n) {
        t += c[1];
      }
    }
    ans.push(t);
  }
  return ans;
};
