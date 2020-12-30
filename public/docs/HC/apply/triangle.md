# 绘制三角

:::info
原理：盒模型
:::

绘制一个边框分别为四种颜色的正方形：

```html
<div class="triangle"></div>
```

```css
.triangle {
  border: 50px solid;
  border-left-color: #f66;
  border-right-color: #66f;
  border-top-color: #f90;
  border-bottom-color: #09f;
  width: 200px;
  height: 200px;
}
```

然后将 `width height` 变成 0，就会变成四个等腰三角性组成的正方形：

```css
.triangle {
  border: 50px solid;
  border-left-color: #f66;
  border-right-color: #66f;
  border-top-color: #f90;
  border-bottom-color: #09f;
  width: 0;
  height: 0;
}
```

然后把其他的颜色设置为透明就会得到一个三角：

```css
.triangle {
  border: 50px solid transparent;
  border-left-color: #f66;
  width: 0;
  height: 0;
}
```

这样绘制的三角底是高的两倍，高正好是 `border-width`，这个方法可以用来绘制方向为上下左右的三角

如果需要绘制 左上左下 右上右下的三角，上面的方法就不能直接得到了

可以发现左上角的三角，实际上可以通过 左边和上边拼接组成，同理其他的三角也可以如此：

```css
.triangle {
  border: 50px solid transparent;
  border-left-color: #f66;
  border-top-color: #f66;
  width: 0;
  height: 0;
}
```

最后结合 `postion margin transform` 调整位置即可
