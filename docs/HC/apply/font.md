# 字体问题汇总

[toc]

## fontsize

- 设计图 设计字体小于 12px 实际浏览器最小显示 12px
  - 可以使用 `transform: scale(n)` 缩放
    - 问题：会把整个块都缩放，造成留白
  - 让设计师修改

## 过长省略号显示

```css
.hidden {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
```
