# Object 标签

:::info
`<object>`标签是一个 `HTML` 标签，用于在网页中显示音频，视频，图像，`PDF` 和 `Flash` 等多媒体；它通常用于嵌入由浏览器插件处理的 `Flash` 页面元素，如 `Flash` 和 `Java` 项目。它还可以用于在 `HTML` 页面内显示另一个网页。
:::

`<object>`标签可以和`<param>`标签一起使用以定义各种参数。当浏览器不支持指定的数据时，写入`<object>`和`<object>`标签中的任何文本都被视为备用文本。

`<Object>`标签支持 `HTML` 的所有全局和事件属性。

`type` 属性告诉浏览器加载哪个插件来显示内容，但是您只需要指定类型或数据，而不必同时指定这两种类型。如果插件不可用，则会显示包含在 `<object>` 和 `</object>` 标记之间的任何文本。

|  参数  |                                          说明                                           |
| :----: | :-------------------------------------------------------------------------------------: |
|  data  |          一个合法的 URL 作为资源的地址，需要为 data 和 type 中至少一个设置值。          |
|  type  |           data 指定的资源的 MIME 类型，需要为 data 和 type 中至少一个设置值。           |
|  form  | 对象元素关联的 form 元素（属于的 form）。 取值必须是同一文档下的一个 <form> 元素的 ID。 |
| height |                            资源显示的高度，单位是 CSS 像素。                            |
| width  |                            资源显示的宽度，单位是 CSS 像素。                            |
|  name  |                    浏览上下文名称（HTML5），或者控件名称（HTML 4）。                    |

```html
<!-- Embed a flash movie -->
<object data="move.swf" type="application/x-shockwave-flash"></object>

<!-- Embed a flash movie with parameters -->
<object data="move.swf" type="application/x-shockwave-flash">
  <param name="foo" value="bar" />
</object>
```

:::warning
在大多数情况下，`object` 用于嵌入浏览器插件支持的内容。理论上，它可以用于显示图像，但 `<img>` 元素更适合于此目的。
:::
