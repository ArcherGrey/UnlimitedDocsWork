# 纯 Css 实现关闭按钮

使用 `span` 标签

```html
<span class="close"></span>
```

通过伪类 `before after` 添加两个左右倾斜 45 度的长条构成关闭按钮

通过 `hover` 实现鼠标移动上去变色

```css
.close {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  overflow: hidden;
}
.close:hover::before,
.close:hover::after {
  background: #1ebcc5;
}
.close::before,
.close::after {
  content: "";
  position: absolute;
  height: 2px;
  width: 100%;
  top: 50%;
  left: 0;
  margin-top: -1px;
  background: #000;
}
.close::before {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}
.close::after {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
```
