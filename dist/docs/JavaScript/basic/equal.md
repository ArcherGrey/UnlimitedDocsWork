# `==` 和 `===`

## 基本概念

> `===`

首先计算计算操作数的值，然后比较两个值，比较过程中没有任何类型转换：

- 如果类型不一样，则不相等
- 如果都是 `null` 或者 `undefined`，则不相等
- 如果都是 `bool` 类型 `true` 或者 `false`，则相等
- 如果其中一个值是 `NaN` 或者两个值都是 `NaN` 则不相等，（通过 `x!==x` 可以判断 `x` 是否是 `NaN`，只有 `x` 为 `NaN` 的时候结果才是真）
- 如果两个值是数字且数值相等，则相等（如果一个为 `0` ，另一个为 `-0` 同样相等）
- 如果两个值为字符串，且所含的对应位上的 16 位数完全相等（每个字符 2 字节，一个字节 8 位，每个字符 16 位），则相等，如果长度或者内容不同则不等
- 如果两个引用同一个对象数组或者函数，则相等，如果指向不同的对象，则不等，尽管两个对象有完全一样的属性

---

> `==`

如果两个操作数不是同一类型，那么相等运算符会尝试做类型转换然后进行比较：

- 如果一个是 `NULL` ，另一个是 `undefined` ，则相等
- 如果一个值是数字，另一个是字符串，先将字符串转换为数字，然后使用转换后的值进行比较
- 如果其中一个值为 `true`，则会将其转换为 `1` 再进行比较（`false` 为 `0`）
- 如果一个值是对象，另一个值是数字或者字符串，则将对象转换为原始值，然后在进行比较。对象通过 `toString()` 或者 `valueOf()` 转换为原始值（内置会先使用 `valueOf` 再使用 `toString`），日期类只会使用 `toString` 转换
- 其他不同类型之间的比较均不相等

## 具体情况

- 知道比较值的具体类型：使用 `typeof` 确保类型一致，然后可以放心使用 `==`
- `===` 是最简单的操作符，因为它不进行类型转换，在大部分浏览器中 `===` 比 `==` 速度更快（`chrome` 实际测试在发生类型转换的情况下 `==` 耗时是 `===` 的 `8` 倍左右，如果不进行类型转换性能相当）
- 在使用 `==` 时，`undefined` 和 `null` 结果上相等，但没有意义（包括所有能被转换为 `false` 的值）如果想检测 `x` 是否为 `null`：

```JavaScript
if(x == null)
```

实际上同时也在检测 `undefined`，容易使人误解

## 一句话

`==` 越少代码越容易理解
