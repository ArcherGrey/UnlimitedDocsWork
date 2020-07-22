# vue 调试工具 vue-devtools 安装及使用

1. git 下载 `git clone https://github.com/vuejs/vue-devtools`
2. `npm install` 安装依赖
3. 修改 manifest.json 文件 把"persistent":false 改成 true
4. 打包 `npm run build`

- 这里可能报错 `Cannot find module '@vue-devtools/build-tools'` 是应为 clone 下来默认是 dev 分支切换回 正式版本 即可 `git checkout x.x.x`

5. 扩展 Chrome 插件

Chrome 浏览器 > 更多程序 > 拓展程序

点击加载已解压程序按钮, 选择 vue-devtools > shells > chrome 放入

6.  vue-devtools 使用

vue 项目, 打开 f12, 选择 vue 就可以使用了.

---

还是直接下载打包好的插件方便
