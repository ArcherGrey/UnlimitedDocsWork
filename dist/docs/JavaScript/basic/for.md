# 各种 for

## 普通 for

### 语法

```js
for ([initialization]; [condition]; [final - expression]) statement;
```

**头部圆括号中的所有三个表达式都是可选的**

|        名称        |                           说明                           |
| :----------------: | :------------------------------------------------------: |
|  `initialization`  |                    表达式或者变量声明                    |
|    `condition`     | 条件表达式来决定是否继续下一次循环，可以忽略代表永远为真 |
| `final-expression` |                 每次循环最后执行的表达式                 |
|    `statement`     |                `condition` 为真就会被执行                |

### 示例

```js
// 常用
for (var i = 0; i < 9; i++) {
  console.log(i);
  // more statements
}

// initialization 为空
var i = 0;
for (; i < 9; i++) {
  console.log(i);
  // more statements
}

// condition 为空
for (var i = 0; ; i++) {
  console.log(i);
  if (i > 3) break;
  // more statements
}

// 所有都忽略
var i = 0;

for (;;) {
  if (i > 3) break;
  console.log(i);
  i++;
}

// statement 为空
for (var i = 0; i < 9; i++);
```

`statement` 为空的时候，后面的分号是强制性的，如果没有分号后面的语句会被视为 `statement`

### 兼容性

全部

---

## for await...of

会在异步或者同步可迭代对象上创建一个迭代循环，包括 `String Array Array-like Map Set` 和自定义的异步或同步可迭代对象

### 语法

```js
for await (variable of iterable) {
  statement;
}
```

|    名称    |                                说明                                |
| :--------: | :----------------------------------------------------------------: |
| `variable` |                   每次迭代中将属性的值分配给变量                   |
| `iterable` | 被迭代枚举其属性的对象，和 `for of` 相比这里对象可以返回 `promise` |

### 示例

```js
async function* asyncGenerator() {
  var i = 0;
  while (i < 3) {
    yield i++;
  }
}

(async function() {
  for await (num of asyncGenerator()) {
    console.log(num);
  }
})();
// 0
// 1
// 2
```

### 兼容性

IE 不兼容

---

## for in

以任意顺序遍历一个对象的除 `Symbol` 以外的可枚举属性

为遍历对象属性而构建的，最常用的地方应该是调试，可以更方便的去检查对象属性

### 语法

```js
for (variable in object) statement;
```

|    名称    |              说明              |
| :--------: | :----------------------------: |
| `variable` | 每次迭代会被赋值为不同的属性名 |

注意：遍历顺序不固定，扩展后的数组顺序不一定，最好不要和数组一起使用，数组可以用 `Array.prototype.forEach()` 和 `for ... of`

### 示例

```js
var obj = { a: 1, b: 2, c: 3 };

for (var prop in obj) {
  console.log("obj." + prop + " = " + obj[prop]);
}

// Output:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"

// 顺序不一致

var obj = {
  "1": "first",
  two: "zoo",
  "3": "2",
  three: "34",
  "4": "1",
  "2": "second"
};
for (var i in obj) {
  console.log(i + ":" + obj[i]);
}

// Output:
// 1:first
// 2:second
// 3:2
// 4:1
// two:zoo
// three:34
```

### 兼容性

全部

---

## for ... of

在可迭代对象（`Array Map Set String ...`）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句

### 语法

```js
for (variable of iterable) {
  //statements
}

// variable 每次迭代中，将不容的值分配给变量
// iterable 被迭代枚举其属性的对象
```

### 示例

```js
// 迭代 Array
let iterable = [10, 20, 30];

for (let value of iterable) {
  value += 1;
  console.log(value);
}
// 11
// 21
// 31

// 迭代 String
let iterable = "boo";

for (let value of iterable) {
  console.log(value);
}
// "b"
// "o"
// "o"
```

### 和 `for ... in` 的区别

- `for in` 以任意顺序迭代对象的可枚举属性
- `for of` 遍历可迭代对象定义要迭代的数据

### 兼容性

IE 不兼容
