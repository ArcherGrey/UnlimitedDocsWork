(翻译自[You Don't Know JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch4.md))

# 先有鸡还是先有蛋

来看看下面的代码：

```js
a = 2;
var a;
console.log(a);
```

大多数人或许会认为最后显示 `undefined` ，因为 `var a` 在赋值之后，所以就会觉得变量被重新定义为默认值 `undefined` ，不过结果应该是显示 `2`。

下一个例子：

```js
console.log(a);
var a = 2;
```

有的人可能认为会输出 `2`，还有的人可能会认为在初始化之前调用，会抛出引用错误。都错了，这里会输出 `undefined`。

这到底是为什么？到底是先有鸡（赋值）还是先有蛋（声明）？

## 看看编译器做了什么

为了从原理上说明问题，我们需要了解编译器做了什么。

当你看到 `var a=2;` 时，你可能觉得它是一个语句，但是实际上是被作为两句话来处理：`var a`和`a=2`。第一句是声明，会在编译阶段被处理；第二句是赋值，会在执行阶段放到合适的位置。

所以上面第一个例子实际上会变成：

```js
var a;
a = 2;
console.log(a);
```

同样的第二个例子实际上会变成：

```js
var a;
console.log(a);
a = 2;
```

简而言之就是蛋（声明）在鸡（赋值）之前。

注意：只有声明本身被提前，而任何赋值或其他可执行逻辑都保留在适当的位置。变量提升不会改变原有代码的执行逻辑。

再看一个例子：

```js
foo();

function foo() {
  console.log(a); // undefined

  var a = 2;
}
```

`foo` 的声明被提升了，所以最前面的函数调用可以执行。

还有个很重要的点需要注意，提升的范围是作用域，`foo` 里面的`var a`会被提升到函数内部的最前面，而不是全局作用域的最顶部，上面的代码会转换成：

```js
function foo() {
  var a;

  console.log(a); // undefined

  a = 2;
}

foo();
```

函数声明会被提升，但是函数表达式则不会：

```js
foo(); // not ReferenceError, but TypeError!

var foo = function bar() {
  // ...
};
```

因为变量 `foo` 会被提升所以不会产生引用错误，但是函数表达式不会，所以变量的值是 `undefined` ，也就会产生类型错误。

而且就算是命名的函数表达式也不会提升：

```js
foo(); // TypeError
bar(); // ReferenceError

var foo = function bar() {
  // ...
};
```

## 函数优先

函数和变量声明都会被提升，到底哪个会更优先呢，看个例子：

```js
foo(); // 1

var foo;

function foo() {
  console.log(1);
}

foo = function() {
  console.log(2);
};
```

会被转换成：

```js
function foo() {
  console.log(1);
}

foo(); // 1

foo = function() {
  console.log(2);
};
```

可以看到变量声明在函数之前，但是函数声明被提升到普通变量之前，当多个重复`var`声明，多余的会被忽略，多个函数声明，后面的会覆盖前面的：

```js
foo(); // 3

function foo() {
  console.log(1);
}

var foo = function() {
  console.log(2);
};

function foo() {
  console.log(3);
}
```

## let

也和 `var` 一样会被提升，不过在初始化之前会被提升到 `TDZ`，在这时访问变量会报引用错误，所以看起来好像没提升一样。
