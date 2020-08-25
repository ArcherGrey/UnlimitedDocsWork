/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function(s) {
  return kmp(s + s, s);
};

/**
 * @description: kmp 算法
 * @param {string} q 主串
 * @param {string} p 模式串
 * @return {type}
 */
function kmp(q, p) {
  let n = q.length,
    m = p.length;

  // 求 next 数组
  let next = new Array(m).fill(-1);
  for (let i = 1; i < m; ++i) {
    // 前面子串有几个重复的
    let j = next[i - 1];
    // 不相等就缩小范围
    while (j != -1 && p[j + 1] != p[i]) {
      j = next[j];
    }
    // 相等就加1
    if (p[j + 1] == p[i]) {
      next[i] = j + 1;
    }
  }

  // 模式串中的位置
  let match = -1;

  // 遍历主串
  for (let i = 1; i < n - 1; ++i) {
    while (match != -1 && p[match + 1] != q[i]) {
      match = next[match];
    }
    if (p[match + 1] == q[i]) {
      ++match;
      if (match == m - 1) {
        return true;
      }
    }
  }
  return false;
}
