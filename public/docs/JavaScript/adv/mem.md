# 记忆化

函数可以把先前的操作结果记录再某个对象中，从而避免无谓的重复运算，这种技巧被称为记忆化，`JavaScript` 的对象和数组实现这种优化是非常方便的

例如：使用递归计算斐波拉其数列：

```js
var fibonacci = function(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};
```

当 `n=10` 的时候，函数被调用了 453 次，其中有 442 次去计算已经计算过的值，如果让函数有记忆功能就能显著减少运算量。

使用一个 `mem` 数组来保存计算结果，结果可以隐藏在闭包中，当函数调用时先检查是否存在，如果已经存在就直接返回结果

```js
var fibonacci = (function(n) {
  var mem = [0, 1];
  var fib = n => {
    var res = mem[n];
    if (typeof res !== "number") {
      res = fib(n - 1) + fib(n - 2);
      mem[n] = res;
    }
  };
  return fib;
})();
```

上面 `fibonacci` 是立即执行函数，用来构成闭包，调用 `fibonacci`其实等于调用 `fib`，如果已经计算过 `res` 就会是 `number` 类型直接返回结果，如果没计算过就再计算，里面的 `fib(n-1) fib(n-2)` 如果计算过也会直接返回结果

可以把这个代码写的更加通用，提取一个 `memoizer` 函数:

```js
var memoizer = (mem, formula) => {
  var recur = n => {
    var res = mem[n];
    if (typeof res !== "number") {
      res = formula(recur, n);
      mem[n] = res;
    }
    return res;
  };
  return recur;
};
```

所有递归的都能直接使用：

- 斐波拉其：

```js
var fibonacci = memoizer([0, 1], (recur, n) => {
  return recur(n - 1) + recur(n - 2);
});
```

- 阶乘：

```js
var factorial = memoizer([1, 1], (recur, n) => {
  return recur(n - 1) * n;
});
```
