# 地图服务

- WMS web map service 动态地图服务 优点时动态缺点时慢
- WMTS web map tile service 栅格瓦片服务 优点时分布式缓存增强伸缩性缺点时不灵活静态
- WFS web feature service 要素服务 提供要素增加修改编辑空间
- WPS webprocessing server 空间运算处理服务 裁切合并

# 前端可视化基础框架

- provider 模型 负载数据解析 构建数据
  模型

  - 矢量数据模型（站点 落区等点线面模型）
  - 栅格数据 （模式数据 雷达卫星 格点数据、地形数据、影像数据）

- layer+Render 模块 利用浏览器绘图技术

  - 像素绘制 canvas
  - 矢量绘制 svg vml
  - 插件 flex

- Map 提供地图容器定义基本地图属性和事件
  - 响应地图缩放拖拽点击
  - 定义地图范围比例尺等基本属性
- Plugin 模块
  - 空间分析扩展 渲染效果扩展 地图工具箱

# 主流解决方案 boundless

- 服务端
  - geo server
    arcgis

# 地图服务发展

- WMS GIS + 互联网首个地图服务
  - 后端渲染压力大
  - 交互不流畅
- 栅格瓦片 2005 google
  - 流程交互体验
- MB Tiles 移动互联网选择
  - sqlite 存储
  - 存储效率提升 60%
  - 用于移动设备离线地图

# 矢量瓦片

矢量数据 + 瓦片切割

- 继承了栅格瓦片所有优点
- 样式前端渲染 灵活可配
- 减少服务端存储空间

矢量地图优势

- 编辑快速标注和计算距离
- 可以实时缩放和漫游
- 可以分层显示和控制
- 可以交互式编辑
- 传递速度块 保密性强

# 发展阶段

- 图片叠加
  - 变形
  - 模糊
  - 无法交互
- 瓦片服务
  - 交互差
  - 无法流畅播放
- 浏览器渲染
  - 播放流畅
  - 交互性好
  - 瓶颈 数据传输

# 矢量切片方案