# 页面布局

圣杯布局和双飞翼布局是前端工程师需要日常掌握的重要布局方式。两者的功能相同，都是为了实现一个两侧宽度固定，中间宽度自适应的三栏布局。

圣杯布局来源于文章 `In Search of the Holy Grail`，而双飞翼布局来源于淘宝`UED`。虽然两者的实现方法略有差异，不过都遵循了以下要点：

- 两侧宽度固定，中间宽度自适应
- 中间部分在 DOM 结构上优先，以便先行渲染
- 允许三列中的任意一列成为最高列
- 只需要使用一个额外的 `<div>`标签

## 圣杯布局

`DOM` 结构：

```html
<div id="header"></div>
<div id="container">
  <div id="center" class="column"></div>
  <div id="left" class="column"></div>
  <div id="right" class="column"></div>
</div>
<div id="footer"></div>
```

`CSS` 代码：

```css
body {
  min-width: 550px;
}

#container {
  padding-left: 200px;
  padding-right: 150px;
}

#container .column {
  float: left;
}

#center {
  width: 100%;
}

#left {
  width: 200px;
  margin-left: -100%;
  position: relative;
  right: 200px;
}

#right {
  width: 150px;
  margin-right: -150px;
}

#footer {
  clear: both;
}
```

## 双飞翼布局

`DOM` 结构：

```html
<body>
  <div id="header"></div>
  <div id="container" class="column">
    <div id="center"></div>
  </div>
  <div id="left" class="column"></div>
  <div id="right" class="column"></div>
  <div id="footer"></div>
  <body></body>
</body>
```

> 注：双飞翼布局的`DOM`结构与圣杯布局的区别是用`container`仅包裹住`center`，另外将`.column`类从`center`移至`container`上。

`CSS` 代码：

```css
body {
  min-width: 500px;
}

#container {
  width: 100%;
}

.column {
  float: left;
}

#center {
  margin-left: 200px;
  margin-right: 150px;
}

#left {
  width: 200px;
  margin-left: -100%;
}

#right {
  width: 150px;
  margin-left: -150px;
}

#footer {
  clear: both;
}
```

## 总结

通过对圣杯布局和双飞翼布局的介绍可以看出，圣杯布局在`DOM`结构上显得更加直观和自然，且在日常开发过程中，更容易形成这样的`DOM`结构，而双飞翼布局在实现上由于不需要使用定位，所以更加简洁，且允许的页面最小宽度通常比圣杯布局更小。

其实通过思考不难发现，两者在代码实现上都额外引入了一个`<div>`标签，其目的都是为了既能保证中间栏产生浮动（浮动后还必须显式设置宽度），又能限制自身宽度为两侧栏留出空间。

这里使用`flex`还是需要与圣杯布局相同的`DOM`结构，不过在实现上将更加简单：

```html
<!-- DOM结构 -->
<div id="container">
  <div id="center"></div>
  <div id="left"></div>
  <div id="right"></div>
</div>
```

`CSS` 代码：

```css
#container {
  display: flex;
}

#center {
  flex: 1;
}

#left {
  flex: 0 0 200px;
  order: -1;
}

#right {
  flex: 0 0 150px;
}
```
