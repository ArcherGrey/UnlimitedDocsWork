# this

在面向对象语言中，代表了当前对象的一个引用，但是在 `javascript` 中会随着它的执行环境的改变而改变。

`javascript` 中 `this` 总是指向调用它所在方法的对象，因为 `this` 是在函数运行时自动生成的一个内部对象，只能在函数内部使用。

分下面几种情况具体分析：

> 全局的函数调用

```js
var name = "test";
function a() {
  console.log(this == window);
  console.log(this.name);
}
a(); // true test
```

在全局函数中的 `this` 就代表全局对象 `window` ，也就是说 `this` 指向的是调用方法所在的对象

---

> 对象方法的调用

```js
function showname() {
  console.log(this.name);
}
var obj = {};
obj.name = "test";
obj.show = showname;
obj.show(); // test
```

如果函数作为对象的方法调用，`this` 指向的还是调用方法的对象

---

> 构造函数的调用

```js
function showname() {
  this.name = "test";
}
var obj = new showname();
console.log(obj.name); // test
```

构造函数中的 `this` 指向的是通过该构造函数创建的对象的实例

---

> apply/call

apply 和 call 都是为了改变函数体内部的 this 指向。 其具体的定义如下：
call 方法:
语法：call(thisObj，Object)
定义：调用一个对象的一个方法，以另一个对象替换当前对象。
说明：
call 方法可以用来代替另一个对象调用一个方法。call 方法可将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象。
如果没有提供 thisObj 参数，那么 Global 对象被用作 thisObj。

apply 方法:
语法：apply(thisObj，[argArray])
定义：应用某一对象的一个方法，用另一个对象替换当前对象。
说明：
如果 argArray 不是一个有效的数组或者不是 arguments 对象，那么将导致一个 TypeError。
如果没有提供 argArray 和 thisObj 任何一个参数，那么 Global 对象将被用作 thisObj， 并且无法被传递任何参数。

```js
var value = "Global value";

function FunA() {
  this.value = "AAA";
}

function FunB() {
  console.log(this.value);
}
FunB(); //Global value 因为是在全局中调用的FunB(),this.value指向全局的value
FunB.call(window); //Global value,this指向window对象，因此this.value指向全局的value
FunB.call(new FunA()); //AAA, this指向参数new FunA()，即FunA对象

FunB.apply(window); //Global value
FunB.apply(new FunA()); //AAA
```

在上述代码中，this 的指向在 call 和 apply 中是一致的，只不过是调用参数的形式不一样。call 是一个一个调用参数，而 apply 是调用一个数组。

---

> setTimeout setInterval

如果使用常规函数：

```js
setTimeout(fn, 1000);
// 此时 fn 中 this 的指向是全局环境，如果是浏览器环境就是 window
```

---

> 箭头函数

箭头函数自身不绑定 `this`，会将定义位置的上下文作为自己的 `this`:

```js
function t() {
  this.x = 1;

  setTimeout(() => {
    // 这里虽然是 setTimeout,但是使用箭头函数
    // this 指向的是 定义位置的 this
    // 输出 1
    console.log(this.x);
  }, 1000);
}
```
