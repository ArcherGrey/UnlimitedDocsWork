# PostCSS 插件 rem 适配布局

自动将 `px` 转换 `rem`

下面三种都可以，这里以第一种为例

- postcss-plugin-px2rem
- postcss-pxtorem
- postcss-px2rem

**安装**

```shell
npm i postcss-plugin-px2rem -D
# or
yarn add postcss-plugin-px2rem -D
```

**配置**

在根目录下创建 `.postcssrc.js` 或者 `postcss.config.js`:

```js
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "autoprefixer": {},
    // 新增
    /**
     * postcss-plugin-px2rem 配置
     * 详见官方文档
    */
    'postcss-plugin-px2rem': {
        // rootValue: 100, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
        // unitPrecision: 5, //允许REM单位增长到的十进制数字。
        //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
        // propBlackList: [], //黑名单
        exclude: /(node_module)/,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
        // selectorBlackList: [], //要忽略并保留为px的选择器
        // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
        // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
        mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
        minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
    }

    /**
     * postcss-pxtorem 配置
     * 详见官方文档
    */
    'postcss-pxtorem': {
      rootValue: 37.5,    // 换算的基数 默认100，作用 设计稿上元素宽375px,最终页面会换算成 10rem
      selectorBlackList  : ['weui','mu'], // 忽略转换正则匹配项（选择器）
      propList: ['*']
    }

    /**
     * postcss-px2rem配置
     * 详见官方文档
    */
    'postcss-px2rem': {
      remUnit: 30   // 换算的基数
    }

  }
}
```

`vue.config.js` 配置：

```js
module.exports = {
  /**
   * 反向代理的配置
   */
  lintOnSave: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          /**
           * postcss-plugin-px2rem 配置
           * 详见官方文档
           */
          require("postcss-plugin-px2rem")({
            // rootValue: 100,
            // unitPrecision: 5,
            //propWhiteList: [],
            // propBlackList: [],
            exclude: /(node_module)/,
            // selectorBlackList: [],
            // ignoreIdentifier: false,
            // replace: true,
            mediaQuery: false,
            minPixelValue: 3
          }),
          /**
           * postcss-pxtorem 配置
           * 详见官方文档
           */
          require("postcss-pxtorem")({
            rootValue: 1,
            selectorBlackList: ["weui", "mu"],
            propList: ["*"]
          }),
          /**
           * postcss-pxtorem 配置
           * 详见官方文档
           */
          require("postcss-px2rem")({
            remUnit: 30
          }) // 换算的基数
        ]
      }
    }
  }
};
```

新建 `utils/rem.js`:

```js
// 基准大小对应 rootValue
const baseSize = 32;
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 1080 宽的缩放比例，可根据自己需要修改。
  // 这个宽度就是实际设置 px 按照的分辨率
  // documentElement 就是 html 元素，也就是根元素
  const scale = document.documentElement.clientWidth / 1080;
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize =
    baseSize * Math.min(scale, 2) + "px";
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function() {
  setRem();
};
```

或者

```js
// 设置 rem 函数
function setRem() {
  // 320 默认大小16px; 320px = 20rem ;每个元素px基础上/16
  let htmlWidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  //得到html的Dom元素
  let htmlDom = document.getElementsByTagName("html")[0];
  //设置根元素字体大小
  htmlDom.style.fontSize = htmlWidth / 20 + "px";
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function() {
  setRem();
};
```

最后在 `main.js` 中引入 `rem.js`
