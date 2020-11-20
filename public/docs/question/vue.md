# vue

- 初次加载显示 {{xxx}}
  原因：由于加载 `html` 顺序是 解析 html 结构 `->` 加载外部脚本和样式 `->` 解析并执行脚本代码 `->` 构造 dom `->` 加载图片，`{{}}`只有在 vue 实例初始化完成后才会解析，所以在此之前就会显示 `{{}}`
  - v-cloak 可以隐藏未编译的 Mustache 标签直到实例准备完毕（初始化实例的标签要加）
    有时候可能不起作用，可能原因：
    - display 样式被层级更高的覆盖了，可以提高层级解决：
      `[v-cloak] { display: none !important;}`
    - 放在了 `@import` 引入的 `css` 中不起作用，可以放在 `link` 或者内联样式
- eventBus
  - 在一个组件里面订阅了某件事件,在另一个组件里面触发
    - 如果只订阅不取消那么重复触发订阅会导致事件重复触发
    - 订阅事件的组件被销毁会触发会报错
    - 需要再销毁周期取消订阅
- key 相同的组件不会重复渲染
- `v-if v-show`
  - `v-if` 是真正的条件渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当的被销毁和重建
  - `v-if` 是惰性的，只有在条件为真的时候才会开始渲染条件块
  - `v-show` 总是会被渲染，只是简单的切换样式
  - 一般情况 `v-if` 有更高的切换开销，`v-show` 有更高的初始渲染开销，因此如果需要非常频繁的切换 `v-show` 比较好，反之 `v-if` 较好
  - `v-if v-for` 一起使用的时候， `v-for` 有更高的优先级
- `nextTick`
  - 需要在视图更新之后，基于新的视图进行操作。
  - 需要注意的是，在 created 和 mounted 阶段，如果需要操作渲染后的试图，也要使用 nextTick 方法。
- data 是对象类型时更新不刷新视图
  - set
  - Object.assign 创建新对象
- 强制组件刷新（重新渲染）
  - `forceUpdate`
  - `v-if`
  - 修改`key`
- `$emit` 无法触发

  - 传入的事件名称只能使用小写，不能使用大写的驼峰规则命名

- 报 $attrs is readonly和$listeners is readonly
  - mixed 引入了 vue 实例和组件中引入的 vue 实例版本不一致
  - vue 与 vue-tempalte-compiler 的版本不一致造成
  - 使用 element 和 element 版本也有关，都升级到最新
  - 子组件使用的 vue 和父组件版本不一致
- props 双向绑定 特殊写法
  - 父组件 v-model
    - v-model 实际上是 :value 和 @input=changeValue 的语法糖
  - 子组件 props value
    - 创建 value 副本，修改触发 emit input
- 图片 src 使用变量来赋值，图片加载失败
  - 原因是图片打包在挂载之前，动态绑定生效在挂载之后，导致无法访问除了 static/public 里面的内容
  - 解决
    - 将图片放在 public 里面 见 vue-cli 文档 public

# vuex

- state 重置
  - 不能直接修改 state 对象 ，这样无法触发 getter
  - 需要保存一个初始值 origin，然后 object.assign(state,origin)
- store 简单模式 多个文件引用相同的 store 文件就可以共享状态，因为所有组件内引用的都是同一个对象实例

# vue-route

- 3.0.1 版本后点击重复路由会报错

```js
// 防止点击重复路由报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};
```
