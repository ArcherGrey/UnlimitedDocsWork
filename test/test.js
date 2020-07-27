/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  let min = ~~(Math.pow(-2, 31) / 10),
    max = ~~((Math.pow(2, 31) - 1) / 10),
    maxmod = (Math.pow(2, 31) - 1) % 10,
    minmod = Math.pow(-2, 31) % 10;
  let r = 0;
  while (x) {
    // pop
    let pop = x % 10;
    x = ~~(x / 10);
    if (r > max || (r == max && pop > maxmod)) return 0;
    if (r < min || (r == min && pop < minmod)) return 0;

    // push
    r = r * 10 + pop;
  }
  return r;
};
