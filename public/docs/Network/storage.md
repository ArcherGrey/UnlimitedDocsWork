# sessionStorage 和 localStorage

HTML5 提供了两种在客户端存储数据的新方法：

- `localStorage` - 没有时间限制的数据存储
- `sessionStorage` - 针对一个 `session` 的数据存储

之前，这些都是由 `cookie` 完成的。但是 `cookie` 不适合大量数据的存储，因为它们由每个对服务器的请求来传递，这使得 `cookie` 速度很慢而且效率也不高。

在 `HTML5` 中，数据不是由每个服务器请求传递的，而是只有在请求时使用数据。它使在不影响网站性能的情况下存储大量数据成为可能。

对于不同的网站，数据存储于不同的区域，并且一个网站只能访问其自身的数据。

## localStorage

`localStorage` 方法存储的数据没有时间限制。第二天、第二周或下一年之后，数据依然可用。

如何创建和访问 `localStorage`：

```
<script type="text/javascript">
localStorage.lastname="Smith";
document.write(localStorage.lastname);
</script>
```

# sessionStorage

`sessionStorage` 方法针对一个 `session` 进行数据存储。在页面会话结束时会被清除。页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。在新标签或窗口打开一个页面时会在顶级浏览上下文中初始化一个新的会话。

如何创建并访问一个 `sessionStorage`：

```
<script type="text/javascript">
sessionStorage.lastname="Smith";
document.write(sessionStorage.lastname);
</script>
```

# 注

- 键值对总是以字符串的形式存储。 (需要注意, 和 js 对象相比, 键值对总是以字符串的形式存储意味着数值类型会自动转化为字符串类型)
- 无论数据存储在 `localStorage` 还是 `sessionStorage` ，它们都特定于页面的协议。
