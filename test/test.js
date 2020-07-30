/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function(n) {
  if (n < 4) return n - 1;
  let q = ~~(n / 3),
    r = n % 3;
  if (!r) {
    return Math.pow(3, q);
  } else if (r == 1) {
    return Math.pow(3, q - 1) * 4;
  } else {
    return Math.pow(3, q) * 2;
  }
};
