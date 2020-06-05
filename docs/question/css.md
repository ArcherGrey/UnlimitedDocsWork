# css

- font
  - chrome 支持最小字体 12px
- position
  - fixed 一般情况下相对视窗是屏幕，当元素祖先的 transform, perspective 或 filter 属性非 none 时，容器由视口改为该祖先。
- calc
  - 无效
    - height:calc(100vh-60); 无效
    - height:calc(100vh-60px); 无效
    - height:calc(100vh - 60px); 终于起效
    - 必须加单位 中间有空格
- padding margin 所有带四个属性的都是顺时针 上右下左
- div
  - width 如果不指定会被内部撑开
  - % 依赖父元素宽度
  - `flex 1 1 auto` 自动延申的时候指定一个最大宽度 `calc(100% - xxx px)`
