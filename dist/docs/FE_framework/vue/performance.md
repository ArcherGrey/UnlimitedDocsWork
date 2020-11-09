# 性能优化

[toc]

## vue

### 长列表性能优化

`vue` 会通过 `Object.defineProperty` 来对数据进行劫持，来实现视图响应数据变化，但是有些时候只是展示数据，数据不会变化，这个时候就不需要劫持数据，在大量数据展示的情况下，能够明显减少组件初始化时间：

```js
export default {
  data: () => ({
    users: {}
  }),
  async created() {
    const users = await axios.get("/api/users");
    // 这里使用 Object.freeze 来冻结对象
    this.users = Object.freeze(users);
  }
};
```
