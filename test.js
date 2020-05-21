/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (!s || s.length == 0) return "";
  let start = 0,
    end = 0;
  for (let i = 0; i < s.length; ++i) {
    let l1 = expandAroundCenter(s, i, i); // 中心为一个字符的情况
    let l2 = expandAroundCenter(s, i, i + 1); // 中心为两个相同字符的情况
    let l = Math.max(l1, l2);
    if (l > end - start) {
      start = i - Math.floor((l - 1) / 2);
      end = i + Math.floor(l / 2);
    }
  }
  return s.substring(start, end + 1);
};

function expandAroundCenter(s, l, r) {
  while (l >= 0 && r < s.length && s[l] == s[r]) {
    l--;
    r++;
  }
  return r - l - 1;
}
