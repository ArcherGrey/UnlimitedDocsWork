# 在页面上画一个 map

下面是一个完整的例子。创建一个新文件，复制下面的内容，然后打开浏览器：

```HTML
<!doctype html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.1.1/css/ol.css" type="text/css">
    <style>
      .map {
        height: 400px;
        width: 100%;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.1.1/build/ol.js"></script>
    <title>OpenLayers example</title>
  </head>
  <body>
    <h2>My Map</h2>
    <div id="map" class="map"></div>
    <script type="text/javascript">
      var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([37.41, 8.82]),
          zoom: 4
        })
      });
    </script>
  </body>
</html>
```

# 理解上面的例子到底发生了什么

为了在浏览器中添加一个 map 你需要三个东西：

- 加载 OpenLayers
- `<div>` 地图容器
- 使用 JavaScript 创建一个简单的地图

## 加载 OpenLayers

```html
<script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.1.1/build/ol.js"></script>
```

第一件事情就是加载库。为了简单我们直接加载了整个库，而在生产环境中我们只需要按需加载

注：如果需要兼容低版本的浏览器，还需要在前面加载一个脚本：

```html
<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList"></script>
```

## `<div>` 地图容器

```html
<div id="map" class="map"></div>
```

地图包含在一个 `<div>` 标签中。地图的属性例如宽高边框等通过 `CSS` 来控制：

```html
<style>
  .map {
    height: 400px;
    width: 100%;
  }
</style>
```

## 使用 JavaScript 创建一个简单的地图

```JavaScript
  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([37.41, 8.82]),
      zoom: 4
    })
  });
```

通过 JavaScript 代码，一个带有 OSM layer 并且定位在非洲东海岸的地图对象就生成了。

下面分步来看：

1. 创建 map 对象：

```JavaScript
 var map = new ol.Map({ ... });
```

2. 通过设置 target 属性，把对象和 `<div>` 关联，值是 `<div>` 的 `id`：

```JavaScript
target: 'map'
```

3. `layers:[...]` 数组用来定义 map 对象上可用的 `layers` 列表：

```JavaScript
  layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ]
```

layers 定义的类型确定包含哪种资源（image,tile 或者 vector）。

map 对象的另一个部分就是 `View` 。简单的通过定位中间点和缩放级别来设置：

```JavaScript
 view: new ol.View({
      center: ol.proj.fromLonLat([37.41, 8.82]),
      zoom: 4
    })
```

中间点通过经纬度来设置
