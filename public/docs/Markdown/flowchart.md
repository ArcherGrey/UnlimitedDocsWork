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

| 节点类型      | 说明                                | 例                                      |
| ------------- | ----------------------------------- | --------------------------------------- |
| `start`       | 流程图的开始节点，默认文本是`Start` | `st=>start: start`                      |
| `end`         | 流程图的结束节点，默认文本是`End`   | `e=>end: end`                           |
| `operation`   | 流程图中的操作                      | `op1=>operation: operation`             |
| `inputoutput` | 流程图中 `IO` 操作                  | `io=>inputoutput: inputoutput`          |
| `subroutine`  | 子流程                              | `sub1=>subroutine: subroutine`          |
| `condition`   | 条件判断                            | `cond=>condition: condition Yes or No?` |
| `parallel`    | 并行                                | `para=>parallel: parallel`              |

连接

```auto
node1(direction)->node2

// direction
// left right top bottom

<!-- 条件 -->
conditionalVar(yes, <direction>)->nextNode1
conditionalVar(no,  <direction>)->nextNode2

<!-- 并行 -->
parallelVar(path1, <direction>)->nextNode1
parallelVar(path2, <direction>)->nextNode2
parallelVar(path3, <direction>)->nextNode3
```
