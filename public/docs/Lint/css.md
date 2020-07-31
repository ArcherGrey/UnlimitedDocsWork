# css 规范

## 命名规范

标签命名规则：

- 所有命名最好都小写
- 属性值都使用双引号 `class="css"`
- 每个标签都要有开始结束，且层次正确，排版规律工整
- 表现和结构分离，代码中不涉及任何表现元素 `style,font,border` 等
- 定义应遵循从大到小，体现文档结构
- 每个表格加上唯一标记
- 每个图片加上 `alt`
- 尽量不缩写，常用缩写除外

常用结构类命名：

- 最外层 `wrap`
  - 头部 `header`
  - 主体内容 `main`
    - 左侧布局 `main-left`
    - 右侧布局 `main-right`
      - 导航栏 `nav`
      - 内容区域 `content`
  - 底部 `footer`

区域类：

- `container` 容器用于最外层
- `wrapper` 页面外围
- `layout` 布局
- `header` 头部
- `footer` 底部
- `content` 内容
- `main` 主要区域
- `aside` 两边

组件类：

- `nav` 导航
- `menu` 菜单
- `card` 卡片
- `list` 列表
