# vm.\$nextTick( [callback] )

用法：

将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。

示例：

```JavaScript
new Vue({
  // ...
  methods: {
    // ...
    example: function () {
      // 修改数据
      this.message = 'changed'
      // DOM 还没有更新
      this.$nextTick(function () {
        // DOM 现在更新了
        // `this` 绑定到当前实例
        this.doSomethingElse()
      })
    }
  }
})
```

## 原理

vue 是异步执行 dom 更新

同步代码执行 ->
查找异步队列，推入执行栈，执行 Vue.nextTick[事件循环 1] ->
查找异步队列，推入执行栈，执行 Vue.nextTick[事件循环 2]...

总之，异步是单独的一个 tick，不会和同步在一个 tick 里发生，也是 DOM 不会马上改变的原因。

## 用途

应用场景：需要在视图更新之后，基于新的视图进行操作。

需要注意的是，在 created 和 mounted 阶段，如果需要操作渲染后的试图，也要使用 nextTick 方法。
