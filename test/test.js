/**
 * @param {string[]} A
 * @return {string[]}
 */
var commonChars = function(A) {
  if (A.length == 0) return [];

  let a = countAlpha(A[0].split(""));
  for (let j = 1; j < A.length; ++j) {
    let b = countAlpha(A[j].split(""));
    // 每次比较相同的取更小的
    for (let i = 0; i < 26; ++i) {
      a[i] = Math.min(a[i], b[i]);
    }
  }

  let ans = [];
  for (let i = 0; i < 26; ++i) {
    let c = a[i];
    while (c) {
      ans.push(String.fromCharCode(i + 97));
      c--;
    }
  }
  return ans;
};

// 统计每个字符串字母个数
function countAlpha(t) {
  let c = new Array(26).fill(0);
  for (let i = 0; i < t.length; ++i) {
    let index = t[i].charCodeAt() - 97;
    c[index]++;
  }
  return c;
}
