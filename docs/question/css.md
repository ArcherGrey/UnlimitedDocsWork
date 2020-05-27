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
