/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function(arr) {
  let m = new Array(2000).fill(0);
  for (let i of arr) {
    m[1000 + i]++;
  }

  let s = new Array(1000).fill(0);
  for (let x of m) {
    if (s[x]) return false;
    if (x) s[x]++;
  }
  return true;
};
