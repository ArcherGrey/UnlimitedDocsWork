# element ui 常见问题

- form
  - 校验不生效
    - prop 必须和 model 名称对应
    - 使用 validator 每种情况必须有 callback
    - 校验数字需要 model 后面加 number
  - form-item 为 input 的时候 设置 key 为随机数，输入会丢失焦点
    - 原因：input 输入会修改 form 导致 form 重绘，新生成的 input key 是随机数肯定不一样导致 input 也会重绘
    - 解决：设置 key 为固定值，vue 就不会重绘
    - 为 datepicker 的时候会出现类似的问题，修改时间会导致重绘，使得 poper 自动销毁
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

- bread
  - 点击重复路由报错

```js
// 防止点击重复路由报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};
```

- messagebox
  - 按需引用 `Vue.use(MessageBox);` 这样写会造成刷新自动弹框 改成 `Vue.component(MessageBox.name, MessageBox);` 即可解决
- icon

  - 打包后显示乱码
    - 可能使用了 sass ,element 使用的 node-sass,替换即可
    - `yarn remove sass`
    - `yarn add node-sass`

- table
  - 宽度设置 100% 还是显示横向滚动条
    - bodyminWidth = 每列宽度之和（不设置就是 80）
    - 如果实际宽度小于 bodyminWidth 就会显示横向滚动条
    - 可以通过设置 Min-width 使得 bodyminWidth 变小来解决
