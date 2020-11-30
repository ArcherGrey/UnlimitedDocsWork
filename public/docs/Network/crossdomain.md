# 跨域

[toc]

## 概念

浏览器的同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。

同源指：协议、域名、端口号必须一致，跨域也就是非同源请求。

浏览器并不是拒绝所有跨域请求：

- 允许跨域写操作 `cross-origin writes`
  - 链接 `links`
  - 重定向
  - 表单提交
  - 特定少数的 HTTP 请求需要添加 preflight。
- 允许跨域资源嵌入 `Cross-origin embedding`
  - `<script src="..."></script>`标签嵌入跨域脚本。语法错误信息只能在同源脚本中捕捉到。
  - `<link rel="stylesheet" href="...">` 标签嵌入 `CSS`。由于 `CSS` 的松散的语法规则，`CSS` 的跨域需要一个设置正确的 `Content-Type` 消息头，不同浏览器有不同的限制
  - `<img>` 嵌入图片。支持的图片格式包括 `PNG,JPEG,GIF,BMP,SVG`
  - `<video>` 和 `<audio>` 嵌入多媒体资源。
  - `<object>, <embed>` 和 `<applet>` 的插件。
  - `@font-face` 引入的字体。一些浏览器允许跨域字体（ `cross-origin fonts`），一些需要同源字体（`same-origin fonts`）。
  - `<frame>` 和 `<iframe>` 载入的任何资源。站点可以使用 `X-Frame-Options` 消息头来阻止这种形式的跨域交互。
- 不允许跨域读操作（`Cross-origin reads`）。但常可以通过内嵌资源来巧妙的进行读取访问。例如可以读取嵌入图片的高度和宽度，调用内嵌脚本的方法，或 `availability of an embedded resource`.

场景：工程服务化后，不同职责的服务分散在不同的工程中，往往这些工程的域名是不同的，但一个需求可能需要对应到多个服务，这时便需要调用不同服务的接口，因此会出现跨域。

## 解决方案

### JSONP

**原理**
虽然因为同源策略的影响，不能通过 `XMLHttpRequest` 请求不同域上的数据（`Cross-origin reads`）。但是，在页面上引入不同域上的 `js` 脚本文件却是可以的（`Cross-origin embedding`）。因此在 `js` 文件载入完毕之后，触发回调，可以将需要的 `data` 作为参数传入。

代码：

```js
// 前端
// index.html
function jsonp({ url, param, cb }) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    window[cb] = function(data) {
      resolve(data);
      document.body.removeChild(script);
    };
    params = { ...params, cb };
    let arrs = [];
    for (let key in params) {
      arrs.push(`${key}=${params[key]}`);
    }
    script.src = `${url}?${arrs.join("&")}`;
    document.body.appendChild(script);
  });
}
jsonp({
  url: "http://localhost:3000/say",
  params: { wd: "haoxl" },
  cb: "show"
}).then(data => {
  console.log(data);
});

// 后端
//server.js
let express = require("express");
let app = express();
app.get("/say", function(req, res) {
  let { wd, cb } = req.query;
  console.log(wd);
  res.end(`${cb}('hello')`);
});
app.listen(3000);
```

优点：

- 兼容性好

缺点：

- 只支持 `GET`
- 不安全，容易受 `xss` 攻击
- 没有对应的错误处理机制

### CORS

`CORS` 是 `W3C` 推荐的一种新的官方方案，能使服务器支持 `XMLHttpRequest` 的跨域请求。`CORS` 实现起来非常方便，只需要增加一些 `HTTP` 头，让服务器能声明允许的访问来源。

通常使用 `CORS` 时，异步请求会被分为简单请求和非简单请求，非简单请求的区别是会先发一次预检请求。

- 简单请求
  - `GET`
  - `HEAD`
  - `POST Content-Type` 为下面情况
    - `text/plain`
    - `multipart/form-data`
    - `application/x-www-form-urlencoded`
- 非简单请求
  - 使用了下面任一 `HTTP` 方法
    - `PUT`
    - `DELETE`
    - `CONNECT`
    - `OPTIONS`
    - `TRACE`
    - `PATCH`
  - 设置了对 `CORS` 安全的首部字段集合之外的其他首部字段
    - `Accept`
    - `Accept-Language`
    - `Content-Language`
    - `Content-Type (but note the additional requirements below)`
    - `DPR`
    - `Downlink`
    - `Save-Data`
    - `Viewport-Width`
    - `Width`
  - `POST` 不含简单请求的 `Content-Type`

### postMessage
