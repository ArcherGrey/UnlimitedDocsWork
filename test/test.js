/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
var backspaceCompare = function(S, T) {
  let a = [],
    b = [];
  for (let s of S) {
    if (s == "#") a.pop();
    else a.push(s);
  }
  for (let t of T) {
    if (t == "#") b.pop();
    else b.push(t);
  }
  if (a.length != b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] != b[i]) return false;
  }
  return true;
};
