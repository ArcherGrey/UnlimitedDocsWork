# 翻转字符串

```js
// 1. 转换成数组反转再合成字符串
const solution = str =>
  str
    .split("")
    .reverse()
    .join("");

// 2. es6方法替换 split 转换数组
const solution = s => [...s].reverse().join("");

// 3. 递归 每次把首个字符移动到最后
function solution(str) {
  return str.length > 0 ? solution(str.substring(1)) + str.charAt(0) : "";
}

// 4. 中间值 逆序遍历保存
function solution(s) {
  var o = "";
  for (var i = s.length - 1; i >= 0; i--) o += s[i];
  return o;
}
```
