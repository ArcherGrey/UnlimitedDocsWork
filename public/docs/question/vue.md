# vue 相关问题汇总

[toc]

## vue

### 初次加载显示 {{xxx}}

原因：

由于加载 `html` 顺序是

1. 解析 html 结构
2. 加载外部脚本和样式
3. 解析并执行脚本代码
4. 构造 dom
5. 加载图片

`{{}}`只有在 vue 实例初始化完成后才会解析，所以在此之前就会显示 `{{}}`

解决：
v-cloak 可以隐藏未编译的 Mustache 标签直到实例准备完毕（初始化实例的标签要加）有时候可能不起作用，可能原因：

- display 样式被层级更高的覆盖了，可以提高层级解决：`[v-cloak] { display: none !important;}`
- 放在了 `@import` 引入的 `css` 中不起作用，可以放在 `link` 或者内联样式

### data 是对象类型时更新不刷新视图

原因：引用类型，修改内部属性不触发刷新
解决：

- set
- Object.assign 创建新对象

### `$emit` 无法触发

原因：传入的事件名称只能使用小写，不能使用大写的驼峰规则命名
解决：修改事件名称

### 报 $attrs is readonly 和 $listeners is readonly

原因：

- mixed 引入了 vue 实例和组件中引入的 vue 实例版本不一致
- vue 与 vue-tempalte-compiler 的版本不一致造成
- 子组件使用的 vue 和父组件版本不一致

解决：

- 使用 element 和 element 版本也有关，都升级到最新

### 图片 src 使用变量来赋值，图片加载失败

原因：图片打包在挂载之前，动态绑定生效在挂载之后，导致无法访问除了 static/public 里面的内容
解决：将图片放在 public 里面 见 vue-cli 文档 public

## vuex

### state 重置

- 不能直接修改 state 对象 ，这样无法触发 getter
- 需要保存一个初始值 origin，然后 object.assign(state,origin)

### store 简单模式

多个文件引用相同的 store 文件就可以共享状态，因为所有组件内引用的都是同一个对象实例

## vue-route

### 3.0.1 版本后点击重复路由会报错

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
