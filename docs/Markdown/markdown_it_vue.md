# markdown-it-vue 支持语法

## github Table of Contents

[toc]

::: warning
只会显示 2 级和 3 级目录
:::

## alter

::: success
success
:::

::: info
info
:::

::: warning
warning
:::

::: error
error
:::

## memaid charts

[语法](http://knsv.github.io/mermaid/#flowcharts-basic-syntax)

```mermaid
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
```

```
sequenceDiagram
  participant Alice
  participant Bob
  Alice->John: Hello John, how are you?
  loop Healthcheck
    John->John: Fight against hypochondria
  end
  Note right of John: Rational thoughts <br/>prevail...
  John->Alice: Great!
  John->Bob: How about you?
  Bob->John: Jolly good!
```

## Definition list

Term 1
~ Definition 1

[语法](http://pandoc.org/README.html#definition-lists)

## AsciiMath

[文档](http://asciimath.org)

## 上标

<!-- `$H_2O$` -->

## 下标

<!-- `$29^{th}$` -->

## Emoji :panda_face:

## Fontawesome :fa-cab:

[详见](http://fontawesome.io/icons/)

## Echarts

```echarts
{
  "width":500,
  "height":400,
  "series":[{
    "name": "访问来源",
    "type": "pie",
    "radius": "55%",
    "data": [{
      "value":235,
      "name":"视频广告"
    },{
      "value":250,
      "name":"联盟广告"
    },{
      "value":220,
      "name":"邮件广告"
    },{
      "value":290,
      "name":"直接访问"
    },{
      "value":310,
      "name":"搜索引擎"
    }]
  }]
}
```

## code

```bash
npm install markdown-it-vue
```

## 表格

| 测试 | 测试 |
| ---- | ---- |
| 1    | 2    |

## flowchart.js

```flowchart.js
st=>start: Start:>http://www.google.com[blank]
e=>end:>http://www.google.com
op1=>operation: My Operation
sub1=>subroutine: My Subroutine
cond=>condition: Yes
or No?:>http://www.google.com
io=>inputoutput: catch something...
para=>parallel: parallel tasks

st->op1->cond
cond(yes)->io->e
cond(no)->para
para(path1, bottom)->sub1(right)->op1
para(path2, top)->op1
```
