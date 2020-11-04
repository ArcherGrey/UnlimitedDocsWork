# 防抖和节流

在前端开发中会遇到一些频繁的事件触发，例如：

- `window` 的 `resize` `scroll`
- 鼠标点击、移动事件
- 键盘输入事件
  ...

为了避免在短时间内频繁触发事件导致性能问题，一般有两种解决方案：

- 防抖 `debounce`
- 节流 `throttle`

## 防抖

原理类似放技能，释放技能之前需要读条等待固定的时间，如果在读条的时候再次释放技能就会重新读条

一般有两种，一个是第一次是等待后执行，另一种是先执行再等待，代码：

```js
// 普通版
function debounce(func, wait) {
  var timer;
  return function() {
    // 需要保存上下文环境是因为后面的 setTimeout 调用的时候这两个值会改变
    // 如果使用箭头函数这里可以不保存，因为箭头函数的作用域是外层作用域
    var context = this;
    var args = arguments;

    clearTimeout(timer);
    timer = setTimeout(function() {
      func.apply(context, args);
    }, wait);
  };
}

// 立即执行
function debounce(func, wait, imme) {
  var timer;
  return function() {
    // 需要保存上下文环境是因为后面的 setTimeout 调用的时候这两个值会改变
    // 如果使用箭头函数这里可以不保存，因为箭头函数的作用域是外层作用域
    var context = this;
    var args = arguments;

    if (timer) clearTimeout(timer);
    // imme 为真时立即执行
    if (imme) {
      var call = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (call) func.apply(context, args);
    } else {
      timer = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    }
  };
}
```

## 节流

原理就是每次执行事件都是固定间隔，类似技能 cd 的时候不能释放技能。

主要也有两种实现：

- 时间戳：

```js
function throttle(func, wait) {
  // 初始化起始时间
  var previous = 0;

  return function() {
    // 更新当前时间
    var now = +new Date();
    // 如果时间差大于等待时间旧执行
    if (now - previous > wait) {
      func.apply(this, arguments);
      // 使用当前时间更新下一次起始时间
      previous = now;
    }
  };
}
```

- 定时器：

```js
function throttle(func, wait) {
  var timeout;

  return function() {
    // 需要保存上下文环境是因为后面的 setTimeout 调用的时候这两个值会改变
    // 如果使用箭头函数这里可以不保存，因为箭头函数的作用域是外层作用域
    context = this;
    args = arguments;
    if (!timeout) {
      timeout = setTimeout(function() {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}
```
