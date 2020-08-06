# 基本概念

## Map

OpenLayers 的核心组件就是 map `(ol/Map)`，它被渲染到一个 `target` 容器中（例如之前例子中的 `div`）。所有的地图属性既可以在创建时设置，也可以通过 `setter` 方法设置，例如 `setTarget()`。

下面的标签用来创建一个 `div` 来包含地图：

```html
<div id="map" style="width: 100%, height: 400px"></div>
```

下面的代码构造了一个 map 对象，target 是容器的 `id`：

```JavaScript
import Map from 'ol/Map';

var map = new Map({target: 'map'});
```

## View

map 不能用来居中、缩放或者其他操作。这些属性通过 `ol/View` 实例来设置：

```JavaScript
import View from 'ol/View';

map.setView(new View({
  center: [0, 0],
  zoom: 2
}));
```

一个 `View` 对象还有一个 `projection` （投影），投影决定了中心的坐标系和地图分辨率计算的单位。如果未指定（如以上代码片段中所示），则默认投影为 Spherical Mercator（EPSG:3857），以米为贴图单位。

`zoom` 选项是快速配置地图分辨率的方式。可用的缩放等级通过 `maxZoom zoomFactor maxResolution`来确定。从分辨率为每像素最大分辨率单位的缩放级别 0 开始，通过将上一个缩放级别的分辨率除以 zoomFactor 来计算后续缩放级别，直到达到缩放级别 maxZoom。

## Source

OpenLayers 使用 `ol/source/Source` 子类来为 layer 获取远程数据。这些服务可用于 OpenStreetMap 或 Bing 等免费和商业地图平铺服务、WMS 或 WMTS 等 OGC 源以及 GeoJSON 或 KML 等格式的矢量数据：

```JavaScript
import OSM from 'ol/source/OSM';

var osmSource = OSM();
```

## Layer

layer 是 source 的数据可视化。OpenLayers 有四种基本 layers：

- `ol/layer/Tile` - 渲染按特定分辨率的缩放级别组织的网格中提供平铺图像的源
- `ol/layer/Image` - 渲染以任意范围和分辨率提供地图图像的源
- `ol/layer/Vector` - 客户端渲染矢量数据
- `ol/layer/VectorTile` - 渲染矢量平铺形式的数据

```JavaScript
import TileLayer from 'ol/layer/Tile';

var osmLayer = new TileLayer({source: osmSource});
map.addLayer(osmLayer);
```

## 总结

```JavaScript
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';

new Map({
  layers: [
    new TileLayer({source: new OSM()})
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  }),
  target: 'map'
});
```
