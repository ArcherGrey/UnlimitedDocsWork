# 响应式 & 自适应

- [响应式](#响应式)
  - [媒体查询](#媒体查询)
  - [百分比布局](#百分比布局)
  - [rem](#rem)
  - [视口单位](#视口单位)
  - [图片响应式](#图片响应式)
- [自适应](#自适应)
- [总结](#总结)

## 响应式

`Responsice design` 响应式设计

> 建立一个网页通过 css 媒体查询、基于内容的断点等技术来改变网页大小来适应不同分辨率

### 媒体查询

媒体查询可以针对不同的媒体类型定义不同样式

关键在于选择屏幕大小的分割点，常见分割点：

- `600px,900px,1200px,1800px`
- `480px,800px,1400px,1400px`

移动端优先使用 `min-width`
pc 端优先使用 `max-width`

例子：

```css
/* 移动端 */
/* iphone6 7 8 */
body {
  background-color: yellow;
}
/* iphone 5 */
@media screen and (max-width: 320px) {
  body {
    background-color: red;
  }
}
/* iphoneX */
@media screen and (min-width: 375px) and (-webkit-device-pixel-ratio: 3) {
  body {
    background-color: #0ff000;
  }
}
/* iphone6 7 8 plus */
@media screen and (min-width: 414px) {
  body {
    background-color: blue;
  }
}
/* ipad */
@media screen and (min-width: 768px) {
  body {
    background-color: green;
  }
}
/* ipad pro */
@media screen and (min-width: 1024px) {
  body {
    background-color: #ff00ff;
  }
}
/* pc */
@media screen and (min-width: 1100px) {
  body {
    background-color: black;
  }
}

/* PC端 */
/* pc width > 1024px */
body {
  background-color: yellow;
}
/* ipad pro */
@media screen and (max-width: 1024px) {
  body {
    background-color: #ff00ff;
  }
}
/* ipad */
@media screen and (max-width: 768px) {
  body {
    background-color: green;
  }
}
/* iphone6 7 8 plus */
@media screen and (max-width: 414px) {
  body {
    background-color: blue;
  }
}
/* iphoneX */
@media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 3) {
  body {
    background-color: #0ff000;
  }
}
/* iphone6 7 8 */
@media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 2) {
  body {
    background-color: #0ff000;
  }
}
/* iphone5 */
@media screen and (max-width: 320px) {
  body {
    background-color: #0ff000;
  }
}
```

### 百分比布局

通过百分比布局可以使得浏览器组件宽高随着浏览器变化而变化，从而实现响应式效果，一般都是结合 `max(min)` 来定义元素宽高

例子:

```css
/* pc width > 1100px */
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
aside {
  width: 10%;
  height: 100%;
  background-color: red;
  float: left;
}
main {
  height: 100%;
  background-color: blue;
  overflow: hidden;
}
/* ipad pro */
@media screen and (max-width: 1024px) {
  aside {
    width: 8%;
    background-color: yellow;
  }
}
/* ipad */
@media screen and (max-width: 768px) {
  aside {
    float: none;
    width: 100%;
    height: 10%;
    background-color: green;
  }
  main {
    height: calc(100vh - 10%);
    background-color: red;
  }
}
/* iphone6 7 8 plus */
@media screen and (max-width: 414px) {
  aside {
    float: none;
    width: 100%;
    height: 5%;
    background-color: yellow;
  }
  main {
    height: calc(100vh - 5%);
    background-color: red;
  }
}
/* iphoneX */
@media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 3) {
  aside {
    float: none;
    width: 100%;
    height: 10%;
    background-color: blue;
  }
  main {
    height: calc(100vh - 10%);
    background-color: red;
  }
}
/* iphone6 7 8 */
@media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 2) {
  aside {
    float: none;
    width: 100%;
    height: 3%;
    background-color: black;
  }
  main {
    height: calc(100vh - 3%);
    background-color: red;
  }
}
/* iphone5 */
@media screen and (max-width: 320px) {
  aside {
    float: none;
    width: 100%;
    height: 7%;
    background-color: green;
  }
  main {
    height: calc(100vh - 7%);
    background-color: red;
  }
}
```

设置百分比要清楚是针对谁的百分比:

- 子元素的 `height|width` 中使用百分比，是相对于子元素的直接父元素
- 子元素的 `top|bottom|left|right` 设置百分比，则相对于直接非 `static` 定位(默认定位)的父元素的高度
- 子元素的 `padding|marigin` 如果设置百分比，不论是垂直方向或者是水平方向，都相对于直接父亲元素的 `width`
- `border-radius|translate|background-size` 不一样，是相对于自身的宽度

如果全部使用百分比来布局,有两个明显的缺点:

- 计算困难:如果要定义一个元素的宽高,按照设计稿必须换算成百分比单位
- 不同属性的百分比相对元素不一样,容易让问题变得复杂

### rem

`rem` 是 `css3` 新增的单位,对移动端支持度很高,是相对于根元素 `html` 的 `font-size` 来决定大小,页面变化的时候只需要改变根元素,那么 `rem` 为单位的元素也会响应变化.

思想：

- 一般不要给元素设置具体的宽度，除了小图标
- 高度设置固定，按照设计稿
- 所有设置的固定值都使用 `rem` 作为单位
- `js` 获取屏幕真实宽度，按照设计稿宽度算出比例

缺点：

- 需要通过 `js` 来动态修改根元素 `font-size` 大小

### 视口单位

`css3` 引入了新的单位 `vw/vh`

- `vw` 视图窗口的宽度
- `vh` 视图窗口的高度

|  单位  |                               含义                                |
| :----: | :---------------------------------------------------------------: |
|  `vw`  | 相对于视窗的宽度，`1vw` 等于视窗宽度的 `1%`，即视窗宽度是 `100vw  |
|  `vh`  | 相对于视窗的高度，`1vh` 等于视窗高度的 `1%`，即视窗高度是 `100vh` |
| `vmin` |                         `vw vh` 中较小值                          |
| `vmax` |                         `vw vh` 中较大值                          |

相当于百分比单位，这里更像是理想的百分比单位

一般有两种做法：

1. 只使用 `vw` 作为单位

对于设计稿的尺寸转换为单位，使用 `sass` 函数编辑：

```css
//iPhone 6尺寸作为设计稿基准
$vm_base: 375;
@function vw($px) {
  @return ($px / 375) * 100vw;
}
```

所有单位都是 `vw`:

```css
.mod_nav {
  background-color: #fff;
  &_list {
    display: flex;
    padding: vm(15) vm(10) vm(10); // 内间距
    &_item {
      flex: 1;
      text-align: center;
      font-size: vm(10); // 字体大小
      &_logo {
        display: block;
        margin: 0 auto;
        width: vm(40); // 宽度
        height: vm(40); // 高度
        img {
          display: block;
          margin: 0 auto;
          max-width: 100%;
        }
      }
      &_name {
        margin-top: vm(2);
      }
    }
  }
}
```

1 物理像素线（也就是普通屏幕下 1px,高清屏幕下 0.5px 的情况）采用 `transform` 属性 `scale` 实现:

```css
.mod_grid {
  position: relative;
  &::after {
    // 实现1物理像素的下边框线
    content: "";
    position: absolute;
    z-index: 1;
    pointer-events: none;
    background-color: #ddd;
    height: 1px;
    left: 0;
    right: 0;
    top: 0;
    @media only screen and (-webkit-min-device-pixel-ratio: 2) {
      -webkit-transform: scaleY(0.5);
      -webkit-transform-origin: 50% 0%;
    }
  }
}
```

对于需要保持宽高比的图，应该用 `padding-top` 实现:

```css
.mod_banner {
  position: relative;
  padding-top: percentage(100/700); // 使用padding-top
  height: 0;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    top: 0;
  }
}
```

2. 搭配 `vw` 和 `rem`

虽然采用 `vw` 适配后的页面效果很好，但是它是利用视口单位实现的布局，依赖视口大小而自动缩放，无论视口过大还是过小，它也随着时候过大或者过小，失去了最大最小宽度的限制，此时我们可以结合 `rem` 来实现布局

- 给根元素大小设置随着视口变化而变化的 `vw` 单位，这样就可以实现动态改变其大小
- 限制根元素字体大小的最大最小值，配合 `body` 加上最大宽度和最小宽度

```css
// rem 单位换算：定为 75px 只是方便运算，750px-75px、640-64px、1080px-108px，如此类推
$vm_fontsize: 75; // iPhone 6尺寸的根元素大小基准值
@function rem($px) {
  @return ($px / $vm_fontsize) * 1rem;
}
// 根元素大小使用 vw 单位
$vm_design: 750;
html {
  font-size: ($vm_fontsize / ($vm_design / 2)) * 100vw;
  // 同时，通过Media Queries 限制根元素最大最小值
  @media screen and (max-width: 320px) {
    font-size: 64px;
  }
  @media screen and (min-width: 540px) {
    font-size: 108px;
  }
}
// body 也增加最大最小宽度限制，避免默认100%宽度的 block 元素跟随 body 而过大过小
body {
  max-width: 540px;
  min-width: 320px;
}
```

### 图片响应式

- 大小自适应
- 针对分辨率尽可能选择高分辨率的图片，在不需要高清图的地方，用小图代替，减少网络带宽

1. 使用 `max-width`

```css
img {
  display: inline-block;
  max-width: 100%;
  height: auto;
}
```

- `inline-block` 元素相对于它周围的内容以内联形式呈现，但与内联不同的是，这种情况下我们可以设置宽度和高度
- `max-width` 保证了图片能够随着容器的进行等宽扩充（即保证所有图片最大显示为其自身的 100%。此时，如果包含图片的元素比图片固有宽度小，图片会缩放占满最大可用空间）
- `height` 为 `auto` 可以保证图片进行等比缩放而不至于失真。如果是背景图片的话要灵活运用`background-size` 属性。

那么为什么不能用 `width：100%` 呢？因为这条规则会导致它显示得跟它的容器一样宽。在容器比图片宽得多的情况下，图片会被无谓地拉伸。

2. 使用 `srcset`

```html
<img
  srcset="photo_w350.jpg 1x, photo_w640.jpg 2x"
  src="photo_w350.jpg"
  alt=""
/>
```

如果屏幕的 `dpi = 1` 的话则加载 1 倍图，而 `dpi = 2` 则加载 2 倍图，手机和 mac 基本上 `dpi` 都达到了 2 以上，这样子对于普通屏幕来说不会浪费流量，而对于视网膜屏来说又有高清的体验。

如果浏览器不支持 `srcset`，则默认加载 `src` 里面的图片。

但是你会发现实际情况并不是如此，在 Mac 上的 `Chrome` 它会同时加载 `srcset` 里面的那张 2x 的，还会再去加载 `src` 里面的那张，加载两张图片。顺序是先把所有 `srcset` 里面的加载完了，再去加载 `src` 的。这个策略比较奇怪，它居然会加载两张图片，如果不写 `src`，则不会加载两张，但是兼容性就没那么好。这个可能是因为浏览器认为，既然有 `srcset` 就不用写 `src` 了，如果写了 `src`，用户可能是有用的。而使用 `picture` 就不会加载两张

3. 使用 `background-image`

```css
.banner {
  background-image: url(/static/large.jpg);
}

@media screen and (max-width: 767px) {
  background-image: url(/static/small.jpg);
}
```

4. 使用 `picture` 标签

`picturefill.min.js` ：解决 IE 等浏览器不支持 的问题

```html
<picture>
  <source srcset="banner_w1000.jpg" media="(min-width: 801px)" />
  <source srcset="banner_w800.jpg" media="(max-width: 800px)" />
  <img src="banner_w800.jpg" alt="" />
</picture>

<!-- picturefill.min.js 解决IE等浏览器不支持 <picture> 的问题 -->
<script type="text/javascript" src="js/vendor/picturefill.min.js"></script>
```

`picture` 必须要写 `img` 标签，否则无法显示，对 `picture` 的操作最后都是在 `img` 上面，例如 `onload` 事件是在 `img` 标签触发的， `picture` 和 `source` 是不会进行 `layout` 的，它们的宽和高都是 0

## 自适应

`Adaptive design` 自适应设置

> 为不同类别的设备建立不同的网页，检测到设备分辨率大小调整使用相应的网页

## 总结

|  类别  |       网页和分辨率       |
| :----: | :----------------------: |
| 响应式 |  一个网页适应多个分辨率  |
| 自适应 | 每个分辨率都有对应的网页 |

响应式布局的实现可以通过`媒体查询+px`,`媒体查询+百分比`，`媒体查询+rem+js`,`vm/vh`,`vm/vh +rem` 这几种方式来实现。但每一种方式都是有缺点的:

- 媒体查询需要选取主流设备宽度尺寸作为断点针对性写额外的样式进行适配，但这样做会比较麻烦，只能在选取的几个主流设备尺寸下呈现完美适配，另外用户体验也不友好，布局在响应断点范围内的分辨率下维持不变，而在响应断点切换的瞬间，布局带来断层式的切换变化，如同卡带的唱机般“咔咔咔”地一下又一下。
- 通过百分比来适配首先是计算麻烦，第二各个属性中如果使用百分比，其相对的元素的属性并不是唯一的，这样就造成我们使用百分比单位容易使布局问题变得复杂。
- 通过采用 rem 单位的动态计算的弹性布局，则是需要在头部内嵌一段脚本来进行监听分辨率的变化来动态改变根元素字体大小，使得 CSS 与 JS 耦合了在一起。
- 通过利用纯 css 视口单位实现适配的页面，是既能解决响应式断层问题，又能解决脚本依赖的问题的，但是兼容性还没有完全能结构接受。

响应式布局的成型方案:

- 利用上面的方法自己来实现，比如 `CSS3 Media Query`,`rem`，`vw`等
- `Flex` 弹性布局，兼容性较差
- `Grid` 网格布局，兼容性较差
- `Columns` 栅格系统，往往需要依赖某个 `UI` 库，如 `Bootstrap`

响应式布局的要点:
在实际项目中，我们可能需要综合上面的方案，比如用 `rem` 来做字体的适配，用 `srcset` 来做图片的响应式，宽度可以用 `rem，flex`，栅格系统等来实现响应式，然后可能还需要利用媒体查询来作为响应式布局的基础，因此综合上面的实现方案，项目中实现响应式布局需要注意下面几点：

- 设置 `viewport`
- 媒体查询
- 字体的适配（字体单位）
- 百分比布局
- 图片的适配（图片的响应式）
- 结合 `flex，grid，BFC`，栅格系统等已经成型的方案
