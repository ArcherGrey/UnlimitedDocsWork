# html2canvas

- [文档地址](http://html2canvas.hertzen.com/documentation)
- [github](https://github.com/niklasvh/html2canvas)

这个脚本可以直接在浏览器上截图网页或者其中的一部分。这个截图是基于 `DOM` 的而且不能保证 100% 实际显示的一样，因为它并不是真的截屏，而是基于可识别网页信息进行重建。

## 原理

脚本通过识别 `DOM` 把不同的样式应用到元素上，来把当前页面渲染成一个 `canvas` 图片。

它不需要任何服务器渲染，所有的工作都是在客户端完成。

完全依赖浏览器，这个库不适合用于 `nodejs` ，也不能绕过浏览器自身的安全设置，所以需要跨域访问的内容，需要一个同源代理。

## 兼容

- Firefox 3.5+
- Google Chrome
- Opera 12+
- IE9+
- Safari 6+

还有很多 css 属性不支持
