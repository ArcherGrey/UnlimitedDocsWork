/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  let stack = [];
  let res = 0;
  while (tokens.length > 0) {
    let x = tokens.shift();
    if (!isNaN(x)) {
      stack.push(Number(x));
    } else {
      let a = stack.pop();
      let b = stack.pop();
      switch (x) {
        case "+":
          res = b + a;
          break;
        case "-":
          res = b - a;
          break;
        case "*":
          res = b * a;
          break;
        case "/":
          res = Math.floor(b / a);
          break;
      }
      stack.push(res);
    }
  }
  return res;
};
