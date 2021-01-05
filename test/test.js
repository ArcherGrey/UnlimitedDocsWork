/**
 * @param {string} s
 * @return {number[][]}
 */
var largeGroupPositions = function (s) {
  let l = s.length;
  if (l < 3) return [];
  let res = [];
  let a = 0;
  for (let i = 1; i < l; ++i) {
    if (s[i] !== s[a]) {
      if (i - 1 - a > 1) {
        res.push([a, i - 1]);
      }
      a = i;
    }
  }
  if (l - 1 - a > 1) {
    res.push([a, l - 1]);
  }
  return res;
};
