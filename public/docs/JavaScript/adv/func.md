# 函数式编程

- [柯里化](#柯里化)
- [代码组合](#代码组合)
  - [pointfree](#pointfree)
  - [debug](#debug)
  - [范畴学](#范畴学)
- [声明式代码](#声明式代码)
- [类型签名](#类型签名)
- [](#)

## 柯里化

只传给函数一部分参数来调用，返回一个函数来处理剩余的参数

```JavaScript
var add = function(x) {
  return function(y) {
    return x + y;
  };
};

var increment = add(1);
var addTen = add(10);

increment(2);
// 3

addTen(2);
// 12
```

## 代码组合（`compose`）

例：

```JavaScript
var compose = function(f,g) {
  return function(x) {
    return f(g(x));
  };
};
```

不管是先调用 `f` 还是 `g` 结果都是一样的，符合结合律，可以让我们以任意方式组合起来

### `pointfree`

`pointfree` 模式指的是函数无须提及将要操作的数据是什么样的。一等公民的函数、柯里化（`curry`）以及组合协作起来非常有助于实现这种模式:

```JavaScript
// 非 pointfree，因为提到了数据：word
var snakeCase = function (word) {
  return word.toLowerCase().replace(/\s+/ig, '_');
};

// pointfree
var snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);
```

`pointfree` 模式能够帮助我们减少不必要的命名，让代码保持简洁和通用。

对函数式代码来说，`pointfree` 是非常好的石蕊试验，因为它能告诉我们一个函数是否是接受输入返回输出的小函数。比如，`while` 循环是不能组合的。不过你也要警惕，`pointfree` 就像是一把双刃剑，有时候也能混淆视听。并非所有的函数式代码都是 `pointfree` 的，不过这没关系。可以使用它的时候就使用，不能使用的时候就用普通函数。

### `debug`

可以通过加入 `trace` 函数来追踪代码执行情况

```JavaScript
var trace = curry(function(tag, x){
  console.log(tag, x);
  return x;
});

var dasherize = compose(join('-'), toLower, split(' '), replace(/\s{2,}/ig, ' '));

dasherize('The world is a vampire');
// TypeError: Cannot read property 'apply' of undefined

// 加入 trace
var dasherize = compose(join('-'), toLower, trace("after split"), split(' '), replace(/\s{2,}/ig, ' '));
// after split [ 'The', 'world', 'is', 'a', 'vampire' ]
```

可以让我们在某个特定的点观察数据以便 `debug`

### 范畴学

范畴学（`category theory`）是数学中的一个抽象分支，能够形式化诸如集合论（`set theory`）、类型论（`type theory`）、群论（`group theory`）以及逻辑学（`logic`）等数学分支中的一些概念。范畴学主要处理对象（`object`）、态射（`morphism`）和变化式（`transformation`）

## 声明式代码

例子：

```JavaScript
// 命令式
var makes = [];
for (i = 0; i < cars.length; i++) {
  makes.push(cars[i].make);
}


// 声明式
var makes = cars.map(function(car){ return car.make; });
```

命令式编程需要先实例化数组，然后按照命令一步步执行

而声明式对执行顺序没有要求，只是指明需要做什么

## 类型签名

```JavaScript
//  strLength :: String -> Number
var strLength = function(s){
  return s.length;
}

//  join :: String -> [String] -> String
var join = curry(function(what, xs){
  return xs.join(what);
});

//  match :: Regex -> String -> [String]
var match = curry(function(reg, s){
  return s.match(reg);
});

//  replace :: Regex -> String -> String -> String
var replace = curry(function(reg, sub, s){
  return s.replace(reg, sub);
});
```

简单的说明，可以让我们快速了解函数的功能，类型变化
