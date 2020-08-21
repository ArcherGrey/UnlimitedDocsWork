/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  // 哈希集合1保存数组1去重后的结果
  // 哈希集合2保存哈希集合1和数组2去重后的结果
  // 哈希集合2 转换为数组返回
  let s1 = new Set(),
    s2 = new Set(),
  ans = [];
  for (let i = 0; i < nums1.length; ++i) {
    s1.add(nums1[i]);
  }
  for (let i = 0; i < nums2.length; ++i) {
    if (s1.has(nums2[i])) s2.add(nums2[i])
  }
  for(let e of)
};
