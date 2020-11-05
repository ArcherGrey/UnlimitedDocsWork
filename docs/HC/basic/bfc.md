# BFC (块级格式化上下文)

[toc]

## 概念

**视觉格式化模型** 定义了盒的生成，盒主要包括块盒、行内盒、匿名盒以及一些实验性的盒，类型由 `display` 决定。

**块盒** `block box`:

- `display:block | list-item | table`
- 视觉上为块，垂直排列
- 参与生成 `BFC`
- 每个块级元素至少生成一个块级盒，称为主要块级盒，`li` 会生成额外的盒来放置符号

**行内盒** `inline box`:

- `display: inline | inline-block | inline-table`
- 视觉上水平排列，典型的如段落，或图片

**匿名盒**

- 有行内也有块级
- 没有名字 不能用选择器来选择

## 三种定位

**常规流** `normal flow`

- 盒一个接着一个排列
- 块级 垂直排列
- 行内 水平排列
- `position: static | relative` 且 `float:none`
- `position:static` 盒的位置是常规流布局里的位置
- `position:relative` 盒的位置由 `top left bottom right` 来决定，即是即使有偏移还会保留原有位置，其他常规流不能占用这个位置

**浮动** `float`

- 位于当前行的开头或结尾
- 会导致常规流环绕在周围，除非设置 `clear`

**绝对定位** `absolute`

- 会从常规流中移除，不影响常规流布局
- 定位由 `top bottom left right` 决定
- 定位相对于最近的一个非 `static` 父元素，如果没有相对于 `body`
- `position: fixed | absolute`

## BFC 创建方法

- 根元素 `<html>`
- 浮动 `float` 不为 `none`
- 绝对定位元素 `position` 为 `absolute | fixed`
- 行内块级 `display: inline-block`
- 表格单元格 `display: table-cell`
- 表格标题 `display: table-caption`
- `overflow` 不为 `visable`
- 弹性 `display:flex | inline-flex` 的直接子元素
- 网格 `display:grid | inline-grid` 的直接子元素
- 多列容器

常见创建的属性：

- `overflow:hidden`
- `float: left | right`
- `position: absolute`

## BFC 作用

- 内部盒会垂直排列
- 处于同一 BFC 中元素可能会发生 `margin collapse`
- 独立容器，内部元素不会影像外部
- 计算高度包含浮动元素
- 外部浮动不会叠加到 BFC 上
