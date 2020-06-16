# element ui 常见问题

- form
  - 校验不生效
    - prop 必须和 model 名称对应
    - 使用 validator 每种情况必须有 callback
    - 校验数字需要 model 后面加 number
- input
  - 内容过长会导致浏览器内存异常增加而卡住
  - 非 textarea 类型无法读取换行符
- tree 树状控件
  - 索引数据里面多写了一个逗号（代码检测没报错）导致搜索报错
  - children 是空导致搜索报错
- upload

  - 如果要只能上传一个(不上传只获取图片信息)，而且上传后只显示图片不再显示上传

            - limit = 1
            - 设置 穿透类来隐藏 `>>>` 需要隐藏的部分，在事件处理里面修改隐藏状态
            - action = ""
            - 在上传事件中读取图片信息保存到文件列表中

    参考样式：

```css
.upload-demo {
    display: flex;
}
> > > .el-list-enter-active,
> > > .el-list-leave-active {
> > > transition: none;
> > > }
> > > .el-list-enter,
> > > .el-list-leave-active {
> > > opacity: 0;
> > > }
> > > .el-upload-list {
> > > height: 40px;
> > > }

```

- select
  - 点击空白区域不收起
    - 手动绑定事件，点击空白执行收起操作
