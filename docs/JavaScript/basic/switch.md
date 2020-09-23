# switch

[toc]

## 块级作用域

`switch` 语句中的块级作用域，是对于整个语句而不是每个 `case` 生成独立的块级作用域

```js
// 1
let n = 1;
switch (n) {
  case 1:
    let name = "gr";
  default:
    console.log(name); // 输出 gr
}

// 2
let n = 1;
switch (n) {
  case 1:
    let name = "gr";
    break;
  case 2:
    let name = "grey";
    break;
}
// 会产生错误
// Uncaught SyntaxError: Identifier 'name' has already been declared
```

`case` 中 `let` 声明的变量在 `switch` 的块级作用域中不会提升：

```js
let n = 1;
switch (n) {
  case 1:
    name = "gr";
    break;
  case 2:
    let name = "grey";
    break;
}
// 产生错误
// VM101:4 Uncaught ReferenceError: name is not defined

// var 可以正常显示
let n = 1;
switch (n) {
  case 1:
    name = "gr";
    break;
  case 2:
    var name = "grey";
    break;
}
```
