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

:::warning
注: `actions` 只是描述了有事情发生了这一事实，并没有描述应用如何更新 `state`。
:::

流程

1. 设计 `State` 结构
2. `Action` 处理

`reducer` 就是一个纯函数,接收 `state` 和 `action`,返回新的 `state`

永远不要在 `reducer` 里面做这些操作:

- 修改传入参数
- 执行有副作用的操作,例如 `API` 请求和路由跳转
- 调用非纯函数, 如 `Date.now() Math.random()`

将以指定 `state` 的初始状态作为开始。`Redux` 首次执行时，`state` 为 `undefined`，此时我们可借机设置并返回应用的初始 `state`:

```js
import { VisibilityFilters } from "./actions";

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
};

function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      });
    default:
      return state;
  }
}
```

注意:

1. 不要修改 `state`
2. 默认的情况下返回旧的 `state`

注意每个 `reducer` 只负责管理全局 `state` 中它负责的一部分。每个 `reducer` 的 `state` 参数都不同，分别对应它管理的那部分 `state` 数据。

### Store

:::info
Store 就是把 action 和 reducers 联系到一起的对象
:::

需要有下面的功能:

- 维持应用的 `state`
- 提供 `getState` 方法获取 `state`
- 提供 `dispatch` 方法更新 `state`
- 通过 `subscribe(listener)` 注册监听器
- 通过 `subscribe(listener)` 返回的函数注销监听器

`Redux` 应用只有一个单一的 `store`,需要拆分数据处理逻辑的时候,应该使用 `reducer` 组合而不是创建多个 `store`

### 数据流

:::info
严格的单向数据流是 Redux 架构的设计核心
:::

`Redux` 应用中数据的生命周期遵循下面步骤:

1. 调用 `store.dispatch(action)`: 可以在任何地方调用,包括组件中、`xhr` 回调中、甚至定时器中
2. `store` 调用传入的 `reducer`
3. 根 `reducer` 把多个子 `reducer` 输出合并成一个单一的 `state` 树
4. `store` 保存 `reducer` 返回的完整 `state` 树
