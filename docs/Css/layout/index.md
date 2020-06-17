# 盒模型

所有文档元素都生成要给矩形框（`element box`），描述了一个元素在文档布局中所占的空间大小，而且每个框也影响其他框的位置和大小。

![模型图](./images/box.png)

## 宽高

- 宽度：左内边界到右内边界的距离
- 高度：上内边界到下内边界的距离

`auto`：
对于块级元素来说，设置为 `auto`

- 宽度会尽可能宽
  - `元素宽度 = content宽度 - margin - border - padding`
- 高度会尽可能窄
  - `元素高度 = content高度`

注：如果没有显式声明 `height`，则百分数高度会重置为 `auto`

## 怪异盒

`IE` 的宽高设定是可见元素框的尺寸，而不是元素框的内容区尺寸

## 最大最小宽高

`IE6` 不支持最大最小宽高

最小大于最大宽高时，以最小为准

## 内边距

`padding`

- 没什么兼容性问题
- 不能为负值
- 设置 50% 可以实现正方形效果，常用于移动端头图
- 所有浏览器 `input textarea button` 都内置 `padding`
- 部分浏览器 `select` 下拉内置 `padding`，`firefox IE8+` 可以设置 `padding`
- 除 `IE10` 以外其他浏览器的 `radio checkbox` 单选复选框没有内置 `padding`，且无法设置 `padding`，`IE10`可以设置
- `firefox` 设置 `padding:0`，按钮左右两侧依然有 `padding`，需要使用自有样式：`button::-moz-focus-inner{padding:0;}`
- `IE7` 文字越多左右 `padding` 逐渐变大，设置 `overflow:visible` 可解决该问题
- 按钮的 `padding` 和高度计算不兼容：

```
button{
    line-height:20px;
    padding:10px;
    border:none;
}
//结果为：
IE7: 45px
firefox:42px
chrome/IE8+:40px

---
// 可以使用label来实现类似效果，然后把按钮进行可访问性隐藏即可
<button id="btn"></button>
<label for="btn">按钮</label>
label{
    display:inline-block;
    line-height:20px;
    padding:10px;
    border:none;
}
//结果为：
IE7: 40px
firefox:40px
IE8+:40px
chrome:40px

```

- `firefox` 和 `IE8+` 浏览器在`overflow:scroll` 或 `auto` 时，存在`padding-bottom` 缺失现象

## 外边距

设置外边距会在元素外创建额外的空白，空白通常指不能放其他元素的区域，而且在这个区域中可以看到父元素的背景。

外边距可以应用到行内元素，上下外边距对行高没有任何影响，左右外边距作用在元素开始和结束的位置。

（负值很重要，应用广泛）
