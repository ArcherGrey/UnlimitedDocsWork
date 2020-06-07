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
- pre 会保留空格和换行符
- 透明度
  - 在设置 div 的透明度的时候发现设置了父 div 的透明度（opacity=0.5），子 div 的透明度也随着改变了，并且设置子 div 的透明度不起作用，这种情况下可以使用 rgba 来设置父 div 的透明度：例如设置 div 黑色半透明，可以设置 div 的 background:rgba(0,0,0,0.5)
