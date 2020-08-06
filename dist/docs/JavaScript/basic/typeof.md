# 类型判断

其实常规方法主要有四种

- `typeof`
- `instanceof`
- `Object.prototype.toString`
- `constructor`

其实这四种方式归根结底就是两种思路：

- 根据数据类型判断（1，2）
- 根据构造函数判断（3，4）`

## typeof

`typeof` 是一元运算符，基本上只能判断出来使用字面量方式赋值的基本数据类型，无法具体区分`object`类型，它可以做的事情有：

- 检查一个变量是否存在，是否有值：`typeof` 只有在两种情况下返回 `undefined`
  - 变量没有声明
  - 变量没有初始化
- 判断一个值不等于 `undefined` 也不等于 `null`：`typeof null=object`（`javascript` 遗留`bug`）
- 区别对象和原始值
- 原始值的类型
- 判断是否是函数

## instanceof

`instanceof` 用来判断对象实例的具体类型（包括继承关系），也就是后面的变量在前面的变量的原型链上即可。

`instanceof` 的原理可以认为是如下：

```JavaScript
function instance_of(L, R) {    //L 表示左表达式，R 表示右表达式
 var O = R.prototype;           // 取 R 的显示原型
 L = L.__proto__;               // 取 L 的隐式原型
 while (true) {
   if (L === null)
     return false;
   if (O === L)                 // 这里重点：当 O 严格等于 L 时，返回 true
     return true;
   L = L.__proto__;
 }
}
```

`instanceof` 的局限性就是不能检测基本数据类型。通过对 `instanceof` 的原理进行分析，我们可以得知，只要左边的对象的对象能够通过原型链 `__proto__` 是指向右边的构造函数就可以
`instanceof` 右边必须是对象或构造函数，否则会抛出 `TypeError` 的错误。

![关系图](./images/instanceof.jpg)

## Object.prototype.toString

所有的数据类型都可以用 `Object.prototype.toString` 来检测,而且非常的精准。

`ECMAScript 5`中，`Object.prototype.toString()` 被调用时，会进行如下步骤：

1. 如果 `this` 是 `undefined` ，返回 `[object Undefined]`
2. 如果 `this` 是 `null`， 返回 `[object Null]`
3. 令 `Object` 为以 `this` 作为参数调用 `ToObject` 的结果
4. 令 `class` 为 `Object` 的内部属性 `[[Class]]` 的值
5. 返回三个字符串 `[object, class]` 拼接而成的字符串

注：本规范的每种内置对象都定义了 `[[Class]]` 内部属性的值。宿主对象的 `[[Class]]` 内部属性的值可以是除了 `"Arguments", "Array", "Boolean", "Date", "Error", "Function", "JSON", "Math", "Number", "Object", "RegExp", "String"` 的任何字符串。`[[Class]]` 内部属性的值用于内部区分对象的种类。本规范中除了通过 `Object.prototype.toString` 没有提供任何手段使程序访问此值。

## construtor

`constructor` 属性返回对创建此对象的数组函数的引用。

无论是通过字面量或者构造函数创建的基本类型，都可以检测出。并且也可以检测出 `Array、Object、Function`引用类型，但是不能检测出 `Null` 和 `Undefined`
