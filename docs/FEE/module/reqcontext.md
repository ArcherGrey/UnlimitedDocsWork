# 自动化导入模块

`require.context` 是一个 `webpack` 提供的 `Api`,通过执行 `require.context` 函数获取一个特定的上下文,主要是用于实现自动化导入模块。

使用场景：

- 当路由页面比较多的时候，可能会将路由文件拆分成多个，然后再通过 `import` 引入到 `index.js` 路由主入口文件中
- 当使用 `svg symbol` 的时候，需要将所有的 `svg` 图片导入到系统中（`建议使用 svg-sprite-loader`）
- 开发了一系列基础组件，需要把所有组件到导入到 `index.js`，然后再放入一个数组中，通过遍历数组将所有组件进行安装（常用场景）

以最后一种常用场景为例

基础组件目录：

```auto
custom-dialog.vue
custom-grid.vue
custom-input.vue
custom-select.vue
index.js
```

常规方法安装：

```js
// index.js
import CustomDialog from "./custom-dialog.vue";
import CustomGrid from "./custom-grid.vue";
import CustomInput from "./custom-input.vue";
import CustomSelect from "./custom-select.vue";

const components = {
  CustomDialog,
  CustomGrid,
  CustomInput,
  CustomSelect
};

components.forEach(component => {
  Vue.component(component.name, component);
});
```

使用 `require.context`:

```js
/**
 * @description: 自动导入指定目录下所有组件
 * @param {string} dir 要导入的目录
 * @param {string} useSubDir 是否包括子目录
 * @param {string} regExp 匹配组件文件的正则表达式
 */
const context = require.context(
  (dir = "./"),
  (useSubDir = false),
  (regExp = /\w+\.vue$/)
);

context.keys().forEach(key => {
  // context(key) 可以获取对应的文件，default 表示 export default 导出的内容
  component = context(key).default;
  Vue.component(component.name, component);
});
```
