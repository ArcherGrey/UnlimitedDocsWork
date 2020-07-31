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

```JavaScript
// 普通版
function debounce(func,wait){
    var timer;
    return function(){
        var context = this; // 因为在setTimeout中执行，所以this指向会是window，为了保持实际的上下文这里要先保存
        var args = arguments; // 保存参数

        clearTimeout(timer);
        timer = setTimeout(()=>{
            func.apply(context,args);
        },wait);
    }
}

// 立即执行
function debounce(func,wait,imme){
    var timer;
    return function(){
        var context = this;
        var args = arguments;

        if(timer) clearTimeout(timer);
        // imme 为真时立即执行
        if(imme){
            var call = !timer;
            setTimeout(()=>{
                timer = null;
            },wait);
            if(call) func.apply(context,args);
        }else{
            timer = setTimeout(()=>{
                func.apply(context,args);
            },wait);
        }
    }
}
```

## 节流

原理就是每次执行事件都是固定间隔，类似技能 cd 的时候不能释放技能。

主要也有两种实现：

- 时间戳：

```JavaScript
function throttle(func, wait) {
    var context, args;
    var previous = 0;

    return function() {
        var now = +new Date();
        context = this;
        args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}
```

- 定时器：

```JavaScript
function throttle(func, wait) {
    var timeout;

    return function() {
        context = this;
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(function(){
                timeout = null;
                func.apply(context, args)
            }, wait)
        }

    }
}
```
