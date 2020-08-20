# 水平垂直居中

## 水平居中

- 行内元素：给父元素设置 `text-align:center`
- 块级元素：该元素设置 `margin:0 auto`
- 使用`flex 2012`年版本布局, 可以轻松的实现水平居中, 子元素设置:

```css
.son {
  display: flex;
  justify-content: center;
}
```

- 使用`CSS3`中新增的`transform`属性, 子元素设置如下:

```css
.son {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
```

- 使用绝对定位方式, 以及负值的`margin-left`, 子元素设置如下:

```css
.son {
  position: absolute;
  width: 固定;
  left: 50%;
  margin-left: -0.5宽度;
}
```

- 使用绝对定位方式, 以及`left:0;right:0;margin:0 auto`; 子元素设置如下:

```css
.son {
  position: absolute;
  width: 固定;
  left: 0;
  right: 0;
  margin: 0 auto;
}
```

## 垂直居中

- 单行文本：设置 `line-height` 等于父元素高度
- 行内块级元素，基本思想是使用`display: inline-block, vertical-align: middle`和一个伪元素让内容块处于容器中央:

```css
.parent::after,
.son {
  display: inline-block;
  vertical-align: middle;
}
.parent::after {
  content: "";
  height: 100%;
}
```

- 元素高度不定
  - 可用 `vertical-align` 属性, 而`vertical-align`只有在父层为 `td` 或者 `th`时, 才会生效, 对于其他块级元素, 例如 `div、p` 等, 默认情况是不支持的. 为了使用`vertical-align`, 我们需要设置父元素`display:table`, 子元素 `display:table-cell;vertical-align:middle;`
  - `Flex 2012版` 父元素做如下设置即可保证子元素垂直居中:
  ```css
  .parent {
    display: flex;
    align-items: center;
  }
  ```
  - 可用 `transform` , 设置父元素相对定位 (`position:relative`), 子元素如下 `css` 样式:
  ```css
  .son {
    position: absolute;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  ```
- 元素高度固定
  - 设置父元素相对定位(`position:relative`), 子元素如下`css`样式:

```css
.son {
  position: absolute;
  top: 50%;
  height: 固定;
  margin-top: -0.5高度;
}
```

## 总结

水平居中较为简单, 一般情况下 `text-align:center,marin:0 auto`足矣:

- `text-align:center`;
- `margin:0 auto`;
- `width:fit-content`;
- `flex`
- 盒模型
- `transform`
- 两种不同的绝对定位方法

垂直居中:

- 单行文本:`line-height`
- 行内块级元素, 使用 `display: inline-block, vertical-align: middle;` 加上伪元素辅助实现
- `vertical-align`
- `flex`
- 盒模型
- `transform`
- 两种不同的绝对定位方法

`flex`, 盒模型, `transform`, 绝对定位, 这几种方法同时适用于水平居中和垂直居中.
