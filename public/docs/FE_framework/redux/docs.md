# Redux 文档

:::info
Redux 是 JavaScript 状态容器，提供可预测化的状态管理
:::

[toc]

## 介绍

### 动机

`JavaScript` 项目越来越复杂,需要管理更多的状态 `state`,这些状态可能是

- 服务器响应
- 缓存数据
- 本地数据
- ui 状态
- 等待

状态在什么时候,什么原因变化很难控制,这是由于异步和变化导致的.

`Redux` 就是为了让状态变化可以追踪控制

### 三大原则

**单一数据源**
整个应用的 `state` 被储存在一棵 `object tree` 中，并且这个 `object tree` 只存在于唯一一个 `store` 中

**State 是只读的**
唯一改变 `state` 的方法就是触发 `action`，`action` 是一个用于描述已发生事件的普通对象。

**使用纯函数来执行修改**
为了描述 `action` 如何改变 `state tree` ，你需要编写 `reducers`,`Reducer` 只是一些纯函数，它接收先前的 `state` 和 `action`，并返回新的 `state`

## 基础

### Action

:::info
Action 是把数据从应用传到 store 的有效载荷,是 store 数据的唯一来源
:::

`Action` 本质上是 `JavaScript` 普通对象:

```js
const action = {
  type: ADD_TODO, // 将要执行的动作
  // 下面都是传递的数据
  text: "Build my first Redux app"
};
```

尽量减少在 `action` 中传递的数据

### Reducer

:::info
Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的
:::

:::error
注: `actions` 只是描述了有事情发生了这一事实，并没有描述应用如何更新 `state`。
:::
