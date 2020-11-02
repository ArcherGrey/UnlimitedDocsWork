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
