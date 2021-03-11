# unicode

:::info
在伪元素的 content 属性经常看到一些 \25B2 的值，但是能够显示图标，实际上是一种 webfont 类似 iconfont,值是对应矢量图标的编码
:::

- 这些字符属于 `unicode` 字符集，文档需要声明为 `UTF-8`
- 编号用在 `HTML` 中时，需要在前面加上 `&#` 符号
- 用于 `CSS` 文件中，但是需要用反斜杠 `\` 转义
- 用于 `JavaScript`，和 `CSS` 用法一样，不过要用 `\u` 来转义

常用的直接转换就行