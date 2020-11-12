/**
 * @param {string} S
 * @return {string}
 */
var removeDuplicates = function(S) {
  let stack = [];
  for (let s of S) {
    // 如果栈不空，栈顶元素等于下一个元素就出栈
    if (stack.length) {
      let top = stack[stack.length - 1];
      if (s === top) {
        stack.pop();
        continue;
      }
    }
    stack.push(s);
  }
  return stack.join("");
};
