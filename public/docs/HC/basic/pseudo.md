# 伪类和伪元素

[toc]

## 链接

链接有四种状态可以使用四种伪类装饰

- `a:link` 尚未点击的普通链接
- `a:visited` 根据浏览器历史判断已经点击过的链接（只能为已访问的链接设定 `color background-color border-color`，而且仅当链接的普通状态设定了颜色、背景色或者边框颜色才生效）
- `a:hover` 鼠标悬停在链接上
- `a:active` 访客点击时链接的外观，按下鼠标到松开之前的时间

## 段落

为了实现书籍和报刊那样的排版提供了两种伪元素：

- `:first-letter` 可以实现首字下沉就像书中某一章开头那样，段落的第一个字母脱离段落力的其他内容，单独以大字号或者粗体显示
- `:first:line` 让段落第一行以不同的颜色显示能吸引读者的眼球，让文字变得醒目

::: warning
css 3 为了区分伪类和伪元素，在伪元素前面加了一个冒号，所以最新的用法是 :first-line，但是可以兼容之前单冒号的写法
:::

## 子代选择

- `:first-child | :last-child` 一个标签的子代的第一个（最后一个）元素
- `:only-child` 一个标签是另一个标签唯一子代
- `:nth-child(an+b)` 子代元素按照 `an+b` 进行匹配（`an+b=0` 不匹配任何元素）`a` 表示每个 `a` 个元素，`b` 表示从第 `b` 个元素开始
- `:nth-of-type(an+b)` 同上但是匹配指定类型
- `:nth-last-child(an+b) | :nth-last-type`从后往前匹配
- `:first-of-type | :last-of-type` 子代元素中指定类型的第一个（最后一个）元素

## 其他

- 伪类

  - `:focus` 在元素获得焦点时起作用
  - `:not` 匹配不符合选择器的元素
  - `:target` 类似目录带有 `id` 的锚点被点击后生效

* 伪元素
  - `:before` 在指定元素前添加内容
  - `:after` 在指定元素后面添加内容
  - `::selection` 用于指代访客在网页中选中的内容，只能设置 `color background-color`，`IE8 firefox safari` 不支持，可以加上厂商前缀来支持这些浏览器

::: warning
css 3 新出的伪元素不能单冒号兼容
:::
