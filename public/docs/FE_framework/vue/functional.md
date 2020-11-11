# 函数式组件

如果一个组件满足：

- 没有管理任何状态
- 没有监听任何状态
- 没有生命周期方法
- 只接收 `prop`

这样的组件就是无状态组件（没有响应式数据），也没有实例，可以写成**函数式组件**

```js
Vue.component("my-component", {
  functional: true,
  // Props 是可选的
  props: {
    // ...
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function(createElement, context) {
    // ...
  }
});
```

如果使用单文件组件，基于模板：

```html
<template functional> </template>
```

函数式组件只是函数，所以渲染开销也低很多
