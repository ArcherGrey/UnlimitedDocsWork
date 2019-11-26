# :closed_book: 无限文档

目录

- [HTML]()
- [CSS]()
  - [常用]()
    - [纯 CSS 自定义关闭按钮](https://github.com/ArcherGrey/UnlimitedDocsWork/blob/master/docs/Css/normal/closebutton.md)
- [JS]()
  - [模块化]()
    - [原生 js 实现模块化](https://github.com/ArcherGrey/UnlimitedDocsWork/blob/master/docs/JavaScript/module/%E5%8E%9F%E7%94%9Fjs%E6%A8%A1%E5%9D%97%E5%8C%96.md)
  - [ECMAScript]()
  - [ES6]()
    - [类型扩展]()
      - [模板字面量](https://github.com/ArcherGrey/UnlimitedDocsWork/blob/master/docs/JavaScript/es6/type/%E6%A8%A1%E6%9D%BF%E5%AD%97%E9%9D%A2%E9%87%8F.md)
      - [set 和 map](https://github.com/ArcherGrey/UnlimitedDocsWork/blob/master/docs/JavaScript/es6/type/set_map.md)
  - [DOM]()
  - [特殊技巧]()
- [HTTP]()
- [WebGis]()
  - [OpenLayers]()
    - [官方文档]()
      - [Quick Start](https://github.com/ArcherGrey/UnlimitedDocsWork/blob/master/docs/WebGis/OpenLayers/%E5%AE%98%E6%96%B9%E6%96%87%E6%A1%A3/QuickStart.md)
      - [Tutorials]()
        - [Building an OpenLayers Application]()
        - [Basic Concepts](https://github.com/ArcherGrey/UnlimitedDocsWork/blob/master/docs/WebGis/OpenLayers/%E5%AE%98%E6%96%B9%E6%96%87%E6%A1%A3/Tutorials/BasicConcepts.md)
        - [Some Background on OpenLayers]()
        - [Raster Reprojection]()
- [前端框架]()
- [后端相关]()
- [前端工具]()
- [参考资料]()

---

## :books: 书籍

- 前端
  - [JS 函数式编程指南 pdf](https://github.com/ArcherGrey/UnlimitedDocsWork/blob/master/book/mostly-adequate-guide-chinese.pdf)
    - [gitbook 版本](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)

---

## :secret: 一些有意思的网站

- [你不需要 jquery](https://blog.garstasio.com/you-dont-need-jquery/)
- [nodejs 文档](https://nodejs.org/download/release/v8.9.1/docs/api/)
- [codepen-前端各种特效，在线实时渲染](https://codepen.io/)
- [codewars-在线刷题升级](https://www.codewars.com/)
- [git](https://git-scm.com/docs)
- [经济指标](https://zh.tradingeconomics.com/)
- [svg 编辑器](https://editor.method.ac/)
- [npm 中文文档](https://www.npmjs.com.cn/)
- [Cloud 9 是一个非常强大的在线代码编辑器，它包含了一个完整的 Ubuntu 环境，所有的一切都是运行在云端](http://c9.io)
- [前端资源教程](https://cnodejs.org/topic/56ef3edd532839c33a99d00e)
- [pagespeed 前端性能测试](http://developers.google.cn/speed/pagespeed/insights/)
- [算法练习](https://leetcode-cn.com/)
- [javascript 比赛](https://2019.js13kgames.com/)
- [语雀](https://www.yuque.com/)
- [ScriptOJ 是首个 Web 前端开发评测系统](http://scriptoj.mangojuice.top/)
- [张鑫旭 网站 css 前端](https://www.zhangxinxu.com/)

---

## :triangular_ruler: 常用库、框架、工具

- jQuery
- Vue [文档](https://cn.vuejs.org/index.html)
  - [chrome devtools](https://github.com/ArcherGrey/UnlimitedDocsWork/issues/5)
- React
  - [react 小书（入门）](http://huziketang.mangojuice.top/books/react/)
  - [react 小书配套练习](http://scriptoj.mangojuice.top/problemsGroups/593a2e29b3838c385539fa4f)
  - [redux 文档](https://www.redux.org.cn/)
- 模拟操作
  - Puppeteer [文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#/)
- nodejs
  - express [文档](https://expressjs.com/en/4x/api.html)
- JavaScript 函数式编程
  - `Ramda` 支持 curry 化
- 网页模板
  - pug 模板引擎 [文档](https://pug.bootcss.com/api/getting-started.html)
- 打包工具
  - webpack [官网](https://www.webpackjs.com/)
- 开发工具
  - sublime : 最轻便
  - atom：有点厚重
  - vscode：综合最好
- github
  - shields.io ：说明文档中各种小图标 [网址](https://shields.io/)
  - [github emoji](https://github.com/caiyongji/emoji-list)
- 图标
  - [阿里巴巴矢量图标库](https://www.iconfont.cn/)
- git
  - [国内镜像](https://github.com/waylau/git-for-win)
  - [Git 的奇技淫巧](https://github.com/521xueweihan/git-tips)
- 切图工具
  - [pxcook](https://www.fancynode.com.cn/pxcook)
  - phototshop

---

## :recycle: vscode 插件

注：部分插件需要命令打开 `F1` 例如 json 编辑器 命令搜索 json 开启

- Json Editor ： Json 可视化编辑器
- ESLint
- Markdown Preview Enhanced 流程图可视化
- prettier 自动格式化

---

## :question: 问题和解决

### 前端

#### Vue

|            名称            |                               错误信息                               |                         原因                         |                          解决                          |
| :------------------------: | :------------------------------------------------------------------: | :--------------------------------------------------: | :----------------------------------------------------: |
| 排序后数组导致渲染无限循环 | You may have an infinite update loop in a component render function. | array.sort()改变了数组自身，导致了过滤器又一次被触发 | 确保在副本上对数组排序：return value.slice().sort(...) |

## 注意

- css
  - chrome 中文最小有效字体是 12px
