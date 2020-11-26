# 变量声明

[toc]

## 非声明变量

- 非声明变量总是全局的

```js
function x() {
  y = 1;
}
x();
console.log(y); // 1
```

- 非声明变量只有在执行赋值操作才会被创建

```js
y = 1;
console.log(y); // 1
console.log(yy); // 抛出ReferenceError
```

- 声明变量的上下文环境不可配置属性，非声明变量可以配置

```js
var a = 1;
b = 2;

delete this.a; // 在严格模式（strict mode）下抛出TypeError，其他情况下执行失败并无任何提示。
delete this.b;

console.log(a, b); // 抛出ReferenceError。
// 'b'属性已经被删除。
```

## var

语法:`var varname = value`

- `varname` 变量名
- `value` 变量初始化值，默认为 `undefined`

特点：

- 声明的时候就会默认初始化
- 只有函数级作用域
- 浏览器环境下全局变量声明会变为 `window` 对象属性
- 作用域是当前的执行上下文
- 变量提升 代码中任意位置声明变量总是等于在代码开头声明

```js
bla = 2;
var bla;
// ...

// 可以隐式地（implicitly）将以上代码理解为：

var bla;
bla = 2;
```

## let

语法：`let var = value`

- `var` 变量名
- `value` 变量的初始值

特点：

- 拥有块级作用域
- 编译时才会初始化，变量也会提升但是在初始化完成之前一直在暂存死区中，这个时候访问变量会导致 `ReferenceError`
- 浏览器环境下，全局变量声明不会在 `window` 对象创建属性

## const

基本上和 `let` 一样（包括暂存死区），只是不能修改
