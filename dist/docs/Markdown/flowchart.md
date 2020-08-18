# flowchart

[toc]

## 语法

> nodeName=>nodeType: nodeText[|flowstate][:>urllink]

- `[]` 里面是可选属性
- `nodeName` 定义节点变量名称
- `nodeType` 定义节点类型
- `nodeText` 定义插入到节点中显示的文字内容
- `flowstate` 为节点指定额外样式用 `|` 分隔
- `urllink` 使用 `:>` 指定要链接到的 `url`

## 节点类型

- `start` 流程图的开始节点，默认文本是 `Start`

```flow
st=>start: start
```
