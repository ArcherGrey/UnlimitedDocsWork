# 条件渲染

## `v-if`

表达式为真的时候被渲染：

```html
<h1 v-if="awesome">Vue is awesome!</h1>
```

### 用法

在 `<template>` 元素上使用 `v-if` 条件渲染分组（最终的渲染结果不包括 `<template>`）:

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

`v-else v-else-if` :

```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

## `v-show`

带有 `v-show` 的元素会被渲染，只是根据 `v-show` 的值切换 `display` 属性

```html
<h1 v-show="ok">Hello!</h1>
```

## 总结

- `v-if` 是真正的条件渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当的被销毁和重建
- `v-if` 是惰性的，只有在条件为真的时候才会开始渲染条件块
- `v-show` 总是会被渲染，只是简单的切换样式
- 一般情况 `v-if` 有更高的切换开销，`v-show` 有更高的初始渲染开销，因此如果需要非常频繁的切换 `v-show` 比较好，反之 `v-if` 较好
- `v-if v-for` 一起使用的时候， `v-for` 有更高的优先级
