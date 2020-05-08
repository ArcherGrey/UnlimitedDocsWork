# element ui 常见问题

- form
  - 校验不生效
    - prop 必须和 model 名称对应
    - 使用 validator 每种情况必须有 callback
    - 校验数字需要 model 后面加 number
- input
  - 内容过长会导致浏览器内存异常增加而卡住
- tree 树状控件
  - 索引数据里面多写了一个逗号（代码检测没报错）导致搜索报错
  - children 是空导致搜索报错
