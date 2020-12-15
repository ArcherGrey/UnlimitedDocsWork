# Redux 源码解析

[toc]

## 名词注释

- `plain Object` 纯对象：可以通过 `{}` 或 `new Object` 创建
- `state` 状态
- `action` 描述修改 `state` 的操作
- `dispatch` 分发 `action` 执行 `state` 修改
- `reducer` 统一处理各种 `action`
- 序列化：结构化数据转换成字符串

## 目录结构

```auto
.
|-- applyMiddleware.ts
|-- bindActionCreators.ts
|-- combineReducers.ts
|-- compose.ts
|-- createStore.ts
|-- index.ts
|-- types
|   |-- actions.ts
|   |-- middleware.ts
|   |-- reducers.ts
|   `-- store.ts
`-- utils
    |-- actionTypes.ts
    |-- isPlainObject.ts
    |-- symbol-observable.ts
    `-- warning.ts

```

## 数据结构

```auto
|-- types
|   |-- actions.ts
|   |-- middleware.ts
|   |-- reducers.ts
|   `-- store.ts
```

### store.ts

```ts
/**
 * *dispatch function* 是一个接收 （同步/异步）action 作为参数的函数
 * 它可能 dispatch 一个或者多个 actions 给 store
 *
 * 基本的 *dispatch function* 总是同步发送一个 action 给 reducer,
 * 同时返回之前的 state 给 store,用来计算新的 state.
 * 期望的 actions 是一个plain object 能够直接被 reducer 处理.
 *
 * 中间件包装了基本的 *dispatch function*.
 * 同时使得 *dispatch function* 还能处理异步/扩展的 actions.
 *
 * 在把 action 传递到下一个中间件之前,
 * 中间件可以转换, 延迟, 忽略, 或者其他方式处理 actions.
 *
 */
export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T, ...extraArgs: any[]): T;
}

/**
 * 移除 `Store.subscribe()` 绑定的监听器.
 */
export interface Unsubscribe {
  (): void;
}

/**
 * 观察器记录 state 变化.
 */
export type Observable<T> = {
  subscribe: (observer: Observer<T>) => { unsubscribe: Unsubscribe };
  [Symbol.observable](): Observable<T>;
};

/**
 * 观察者
 * 接收 Observable 得到的数据,
 * 作为 subscribe 的参数.
 */
export type Observer<T> = {
  next?(value: T): void;
};

/**
 * store 对象是用来保存应用的 state tree.
 * 一个 Redux app 应该只有一个 store,
 * 组合通过 reducer 来实现.
 *
 * @template S state 的类型.
 * @template A 可以被 dispatch 的 actions 的类型.
 * @template StateExt 扩展 state
 * @template Ext 扩展 store
 */
export interface Store<
  S = any,
  A extends Action = AnyAction,
  StateExt = never,
  Ext = {}
> {
  /**
   * Dispatches 一个 action. 这是修改一个 state 的唯一方式.
   *
   * `reducer`, 用来创建 store,
   * 参数是当前 state tree 和 `action`.
   * 返回新的 state tree, 而且变化会触发监听器.
   *
   * 基本的实现只支持简单 actions 对象.
   * 如果你想 dispatch (Promise, Observable,thunk,或者其他),
   * 你需要用对应的中间件来包装你的 store 构造函数.
   * 例如, `redux-thunk`.
   * 即是是中间件最后也会 dispatch plain object.
   *
   * @param action 一个 plain object 说明 “哪个 state 变化”.
   * 保持 actions 格式化可以让你记录和重播用户操作,
   * 或者使用 `redux-devtools`.
   *
   * 一个 action 必须有 `type` 属性而且不能是 `undefined`.
   * 最好用字符串来记录 action 的 `type`.
   *
   * 注意, 如果你使用了中间件, 它可能包装了 `dispatch()` 返回类型可能不一样
   * (例如, 返回 Promise 可以 await).
   */
  dispatch: Dispatch<A>;

  /**
   * 读取 state tree.
   *
   * @returns 返回当前 state tree.
   */
  getState(): S;

  /**
   * 添加一个监听器.
   * 在每次 action 被 dispatch 的时候都会调用,
   * state tree 可能被修改,
   * 然后你可以在回调里面调用 `getState()` 获取当前 state tree.
   *
   * 从监听器调用 `dispatch()`,注意下面的情况:
   *
   * 1. 订阅会在每次 `dispatch()` 被调用的时候生成快照.
   * 如果你在监听器调用的时候订阅或者取消订阅,
   * 不会对正在进行的 `dispatch()` 产生任何影响.
   * 但是, 下一次 `dispatch()` 调用,
   * 将会使用订阅列表的最新快照.
   *
   * 2. 监听器无法监测所有 state 的变化,
   * 但是在 `dispatch()` 启动之前注册的所有订阅服务在退出时都应该是最新的 state
   *
   * @param listener 每次 dispatch 的回调.
   * @returns 返回一个移除当前监听器的函数.
   */
  subscribe(listener: () => void): Unsubscribe;
}

/**
 * 创建 Redux store.
 * `createStore(reducer, preloadedState)` 是基础功能,可能还有其他扩展.
 *
 * @template S state 类型.
 * @template A 可以分发的 actions 类型.
 * @template Ext store 扩展.
 * @template StateExt State 扩展.
 */
export interface StoreCreator {
  <S, A extends Action, Ext = {}, StateExt = never>(
    reducer: Reducer<S, A>,
    enhancer?: StoreEnhancer<Ext, StateExt>
  ): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext;
  <S, A extends Action, Ext = {}, StateExt = never>(
    reducer: Reducer<S, A>,
    preloadedState?: PreloadedState<S>,
    enhancer?: StoreEnhancer<Ext>
  ): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext;
}
```

### actions.ts

```ts
/**
 * *action* 是一个 plain object 表示如何修改 state 的操作.
 * Actions 是唯一的方法修改 state.
 * 任何数据,不管是 UI 事件, 请求回调,
 * 还是其他例如 WebSockets.
 *
 * Actions 必须有 `type` 属性.
 * Types 可以定义为常量从其他模块导入.
 * 使用 strings 来描述 `type` 比 Symbols 好
 * 因为 strings 可以序列化.
 *
 * Other than `type`, the structure of an action object is really up to you.
 * If you're interested, check out Flux Standard Action for recommendations on
 * how actions should be constructed.
 *
 * @template T the type of the action's `type` tag.
 */
export interface Action<T = any> {
  type: T;
}

/**
 * An Action type which accepts any other properties.
 * This is mainly for the use of the `Reducer` type.
 * This is not part of `Action` itself to prevent types that extend `Action` from
 * having an index signature.
 */
export interface AnyAction extends Action {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any;
}

/* action creators */

/**
 * An *action creator* is, quite simply, a function that creates an action. Do
 * not confuse the two terms—again, an action is a payload of information, and
 * an action creator is a factory that creates an action.
 *
 * Calling an action creator only produces an action, but does not dispatch
 * it. You need to call the store's `dispatch` function to actually cause the
 * mutation. Sometimes we say *bound action creators* to mean functions that
 * call an action creator and immediately dispatch its result to a specific
 * store instance.
 *
 * If an action creator needs to read the current state, perform an API call,
 * or cause a side effect, like a routing transition, it should return an
 * async action instead of an action.
 *
 * @template A Returned action type.
 */
export interface ActionCreator<A, P extends any[] = any[]> {
  (...args: P): A;
}

/**
 * Object whose values are action creator functions.
 */
export interface ActionCreatorsMapObject<A = any, P extends any[] = any[]> {
  [key: string]: ActionCreator<A, P>;
}
```

### reducers.ts

### middleware.ts

## createStore.ts

## combineReducers.ts

## applyMiddleware.ts
