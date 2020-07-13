/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  // 排序
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);
  // 双指针
  let i = (j = 0);
  let ans = [];
  while (i < nums1.length && j < nums2.length) {
    const a = nums1[i];
    const b = nums2[j];
    if (a === b) {
      ans.push(a);
      i++;
      j++;
    } else {
      if (a > b) j++;
      else i++;
    }
  }
  return ans;
};
