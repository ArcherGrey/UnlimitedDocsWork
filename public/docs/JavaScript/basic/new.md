# `new`

`new` 运算符创建一个用户定义的对象类型的实例或者具有构造函数的内置对象的实例，会进行如下操作：

1. 创建一个空对象 `{}`
2. 链接该对象到另一个对象（设置对象的构造函数）
3. 将创建的对象作为 `this` 的上下文
4. 如果函数没有返回对象，则返回 `this`

例：

```
var a = new b();

// 相当于
var a = {}; // 创建空对象
a.__proto__ = Object.create(b.prototype); // 设置对象的构造函数
b.call(a); // 将创建的对象作为 this 的上下文
```

例 2：

```
function create(Con, ...args) {
  let obj = {}
  Object.setPrototypeOf(obj, Con.prototype)
  let result = Con.apply(obj, args)
  return result instanceof Object ? result : obj
}
```
