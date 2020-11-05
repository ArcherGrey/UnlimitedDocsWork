# 水平垂直居中

[toc]

- `#parent` 代表父元素样式
- `#son` 代表想要对齐的元素样式

## 水平居中

### 文本/行内元素/行内块级

原理：`text-align` 控制行内内容相对父级块元素对齐方式

实现：

```css
#parent {
  text-align: center;
}
```

优点：

- 简单
- 兼容性好

缺点：

- 属性会继承，影像后代行内内容
- 宽度必须小于父元素

### 单个块级元素

原理：`margin` 有空余的时候设置 `auto` 将会均分剩余空间

实现：

```css
#son {
  width: 100px; /* 必须设置定宽 */
  margin: 0 auto;
}
```

优点：

- 简单
- 兼容性好

缺点：

- 必须等宽
- 宽度必须小于父元素

### 多个块级元素

原理：还是 `text-align`

实现：

```css
#parent {
  text-align: center;
}

#son {
  display: inline-block;
}
```

优点：

- 简单
- 兼容性好

缺点：

- 属性会继承，影像后代行内内容
- 换行 空格会产生元素间隔

### 绝对定位

原理：子元素绝对定位，父元素相对定位，组合使用 `left transform margin`

实现：

```css
#parent {
  height: 200px;
  width: 200px; /* 定宽 */
  position: relative;
}

#son {
  position: absolute;
  left: 50%; /* 父元素宽度一半 */
  transform: translateX(-50%); /* 子元素宽度一半，等同于 margin-left: -50px */
  width: 100px; /* 定宽 */
  height: 100px;
}
```

优点：

- `margin-left` 兼容性好

缺点：

- 代码多
- 脱离文档流
- 如果使用 `margin` 需要知道子元素宽度
- 如果使用 `transform` 兼容性不好 （`IE9+`）

### 弹性布局

原理：利用弹性布局

实现：

```css
#parent {
  display: flex;
  justify-content: center;
}
```

优点：

- 简单

缺点：

- 兼容性不好

## 垂直居中

### 文本/行内元素

原理：`line-height`

实现：

```css
#parent {
  height: 150px;
  line-height: 150px; /* 值 = 高度 除以 行数 */
}
```

优点：

- 简单
- 兼容性好

缺点：

- 需要知道高度
- 需要知道总行数

### 单个块级元素

和水平居中一样

- 子元素绝对定位 父元素相对定位
- 弹性布局

## 水平垂直居中

### 行内/行内块级/图片

原理：`text-align line-height`

实现：

```css
#parent {
  height: 100px;
  line-height: 100px;
  text-align: center;
}

#son {
  vertical-align: middle;
}
```

优点：

- 简单
- 兼容性好

### 块级

**子绝父相**

实现 1：

```css
#parent {
  position: relative;
}

#son {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); /* 或者margin */
}
```

实现 2：

```css
#parent {
  position: relative;
}

#son {
  position: absolute;
  margin: auto;
  width: 100px;
  height: 100px;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
```

**弹性布局**

实现：

```css
#parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```
