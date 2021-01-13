# 浏览器

[toc]

## block:mixed-content 错误

错误：https 页面去发送 http 请求报错(浏览器阻止 https 发送 http 请求)

原来是由于项目改成了 https 协议的缘故，出现了请求被拦截；

其实是浏览器不允许在 https 页面里嵌入 http 的请求，现在高版本的浏览器为了用户体验，都不会弹窗报错，只会在控制台上打印一条错误信息。

解决：

1.  在主页面的 head 中加入下面代码（将调用的 http 请求升级成 https 请求并调用）：

```html
<meta
  http-equiv="Content-Security-Policy"
  content="upgrade-insecure-requests"
/>
```

2. 走一下本地后端（将本地后端当成 service 中间层），从后端再去调用其他服务器的 http 请求
