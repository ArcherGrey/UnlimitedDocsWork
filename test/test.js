/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  let [x, y] = [a, b];
  let ans, carry;
  while (y) {
    ans = x ^ y;
    carry = (x & y) << 1;
    [x, y] = [ans, carry];
  }
  return x.toString(2);
};
