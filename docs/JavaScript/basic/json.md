# JSONP 和 JSON

## 跨域访问

什么是跨域访问：

- `协议` | `域名` | `端口号` 有一个不一样就是跨域
- 简单来说就是 A 网站的 `javascript` 代码试图访问 B 网站，包括提交内容和获取内容。由于安全原因，跨域访问是被各大浏览器所默认禁止的，`XmlHttpRequest` 也不例外
- 如果两个页面拥有相同的协议（`protocol`），端口（如果指定），和主机，那么这两个页面就属于同一个源（`origin`），`JavaScript` 允许这种同源页面的数据互相通信
- 端口和协议，一般生产项目中 WEB 页面是`「看不见」`端口号的，其实是缺省端口 `80`，目前网络劫持盛行，因此流行使用安全协议 `HTTPS` 来避免劫持
- 我们使用域名来指定一台主机，当然你也可以直接使用 `IP` 地址，重点在于不要以为 `jandou.com` 与 `www.jandou.com` 是同一域名，实际上 `www.jandou.com` 是一个二级域名，而 `jandou.com` 俗称为裸域，

## JSON

`JSON(JavaScript Object Notation)` 是一种轻量级的数据交换格式，它使得人们很容易的进行阅读和编写，同时也方便了机器进行解析和生成。它是基于 `JavaScript Programming Language , Standard ECMA-262 3rd Edition - December 1999` 的一个子集。 `JSON` 采用完全独立于程序语言的文本格式，但是也使用了类 `C` 语言的习惯（包括 C, C++, C#, Java, JavaScript, Perl, Python 等）。这些特性使 JSON 成为理想的数据交换语言。

JSON 基于两种结构：

- `key:value` 的集合（`A collection of name/value pairs`）。不同的编程语言中，它被理解为对象（`object`），纪录（`record`），结构（`struct`），字典（`dictionary`），哈希表（`hash table`），有键列表（`keyed list`），或者关联数组 （`associative array`）
- 值的有序列表（`An ordered list of values`）。在大部分语言中，它被实现为数组（`array`），矢量（`vector`），列表（`list`），序列（`sequence`）

JSON 具有以下这些形式：

- 对象（`object`） 是一个无序的 `key/value` 集合。一个对象以 `{`（左括号）开始，`}`（右括号）结束。每个 `key` 后跟一个 `:`（冒号）；`键值对` 之间使用 `,`（逗号）分隔
- 数组（`array`） 是值（`value`）的有序集合。一个数组以 `[`（左中括号）开始，`]`（右中括号）结束。值之间使用 `,`（逗号）分隔
- 值（`value`） 可以是双引号括起来的字符串（`string`）、数值(`number`)、`true`、`false`、 `null`、对象（`object`）或者数组（`array`）。这些结构可以嵌套
- 字符串（`string`） 是由双引号包围的任意数量 `Unicode` 字符的集合，使用反斜线转义。一个字符（`character`）即一个单独的字符串（`character string`）
  `JSON`的字符串（`string`）与`C`或者`Java`的字符串非常相似
- 数值（`number`） 也与`C`或者`Java`的数值非常相似。只是`JSON`的数值没有使用八进制与十六进制格式

## JSONP

用于解决主流浏览器的跨域数据访问的问题：

- 利用 `<script>` 下载脚本文件可以跨域访问
- `src` 中添加需要访问的地址，相当于立即执行访问的服务，得到的结果通过回调函数的参数包裹
- 因为是标签所以只能是 `get` 方式
- 只能使用异步
