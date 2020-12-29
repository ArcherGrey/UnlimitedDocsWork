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
 */
export interface Action<T = any> {
  type: T;
}

/* action creators */

/**
 * *action creator* , 创建 action.
 *
 * 只会生成 action, 不会触发 dispatch.
 *
 * 如果 action creator 需要获取当前 state, 执行 API 请求,
 * 或者产生其他副作用, 例如路由跳转, 那么应该返回一个异步 action.
 *
 */
export interface ActionCreator<A, P extends any[] = any[]> {
  (...args: P): A;
}
```

### reducers.ts

```ts
import { Action, AnyAction } from "./actions";

/* reducers */

/**
 * (也可以称为 *reducing function*) 是一个函数接收一个累加器和一个值返回新的累加器.
 * 就像 `Array.prototype.reduce()` 一样把一组数字计算为一个值
 *
 * 在 Redux 里面, 累加器的值是 state 对象, 累加执行 actions.
 * Reducers 根据之前的 state 和 action 计算新的 state.
 * 必须是 *pure functions*.
 * 能够提供一些特性例如 hot reloading 和 time travel.
 *
 * Reducers 是 Redux 里面最重要的概念.
 *
 * *不要在 reducers 里面调用 API.*
 *
 */
export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;
```

### middleware.ts

```ts
/**
 * middleware 是一个更高阶的函数组成 dispatch 返回新的 dispatch.
 * 常常用来把异步 actions 转换为 actions.
 *
 * 可以用来记录 actions, 执行一些会有副作用的操作例如 routing, 或者把异步 API 转换为同步 actions.
 *
 */
export interface Middleware<
  _DispatchExt = {}, // TODO: remove unused component (breaking change)
  S = any,
  D extends Dispatch = Dispatch
> {
  (api: MiddlewareAPI<D, S>): (
    next: D
  ) => (action: D extends Dispatch<infer A> ? A : never) => any;
}
```

## createStore.ts

```ts
/**
 * 创建一个 Redux store 来保存 state tree.
 * 修改 store 的唯一方法是调用 `dispatch()`.
 *
 * 应该只有唯一的 store 在 app 中.
 * 为了区分不同部分的 state tree 对应的 actions,
 * 应该把一类 reducers 通过使用 `combineReducers` 合并到一个 reducer function.
 *
 * @param reducer 返回下一个状态的 state tree, 参数是当前状态 state tree 和 action.
 *
 * @param preloadedState 初始 state.
 *
 * @param enhancer The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns 返回 store 能够获取 state, dispatch actions
 * and subscribe to changes.
 */
export default function createStore<
  S,
  A extends Action,
  Ext = {},
  StateExt = never
>(
  reducer: Reducer<S, A>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext;
export default function createStore<
  S,
  A extends Action,
  Ext = {},
  StateExt = never
>(
  reducer: Reducer<S, A>,
  preloadedState?: PreloadedState<S>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext;
export default function createStore<
  S,
  A extends Action,
  Ext = {},
  StateExt = never
>(
  reducer: Reducer<S, A>,
  preloadedState?: PreloadedState<S> | StoreEnhancer<Ext, StateExt>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext {
  if (
    (typeof preloadedState === "function" && typeof enhancer === "function") ||
    (typeof enhancer === "function" && typeof arguments[3] === "function")
  ) {
    throw new Error(
      "It looks like you are passing several store enhancers to " +
        "createStore(). This is not supported. Instead, compose them " +
        "together to a single function."
    );
  }

  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState as StoreEnhancer<Ext, StateExt>;
    preloadedState = undefined;
  }

  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error("Expected the enhancer to be a function.");
    }

    return enhancer(createStore)(
      reducer,
      preloadedState as PreloadedState<S>
    ) as Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext;
  }

  if (typeof reducer !== "function") {
    throw new Error("Expected the reducer to be a function.");
  }

  let currentReducer = reducer;
  let currentState = preloadedState as S;
  let currentListeners: (() => void)[] | null = [];
  let nextListeners = currentListeners;
  let isDispatching = false;

  /**
   * 浅拷贝 currentListeners 让我们可以把 nextListeners 在 dispatching 的时候作为一个临时列表.
   *
   * 可以避免很多 bugs 在模拟调用 dispatch 里面 subscribe/unsubscribe .
   */
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * 获取  store 管理的 state tree .
   */
  function getState(): S {
    if (isDispatching) {
      throw new Error(
        "You may not call store.getState() while the reducer is executing. " +
          "The reducer has already received the state as an argument. " +
          "Pass it down from the top reducer instead of reading it from the store."
      );
    }

    return currentState as S;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param listener A callback to be invoked on every dispatch.
   * @returns A function to remove this change listener.
   */
  function subscribe(listener: () => void) {
    if (typeof listener !== "function") {
      throw new Error("Expected the listener to be a function.");
    }

    if (isDispatching) {
      throw new Error(
        "You may not call store.subscribe() while the reducer is executing. " +
          "If you would like to be notified after the store has been updated, subscribe from a " +
          "component and invoke store.getState() in the callback to access the latest state. " +
          "See https://redux.js.org/api/store#subscribelistener for more details."
      );
    }

    let isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error(
          "You may not unsubscribe from a store listener while the reducer is executing. " +
            "See https://redux.js.org/api/store#subscribelistener for more details."
        );
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action: A) {
    if (!isPlainObject(action)) {
      throw new Error(
        "Actions must be plain objects. " +
          "Use custom middleware for async actions."
      );
    }

    if (typeof action.type === "undefined") {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
          "Have you misspelled a constant?"
      );
    }

    if (isDispatching) {
      throw new Error("Reducers may not dispatch actions.");
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    const listeners = (currentListeners = nextListeners);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param nextReducer The reducer for the store to use instead.
   * @returns The same store instance with a new reducer in place.
   */
  function replaceReducer<NewState, NewActions extends A>(
    nextReducer: Reducer<NewState, NewActions>
  ): Store<ExtendState<NewState, StateExt>, NewActions, StateExt, Ext> & Ext {
    if (typeof nextReducer !== "function") {
      throw new Error("Expected the nextReducer to be a function.");
    }

    // TODO: do this more elegantly
    ((currentReducer as unknown) as Reducer<
      NewState,
      NewActions
    >) = nextReducer;

    // This action has a similar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.
    dispatch({ type: ActionTypes.REPLACE } as A);
    // change the type of the store by casting it to the new store
    return (store as unknown) as Store<
      ExtendState<NewState, StateExt>,
      NewActions,
      StateExt,
      Ext
    > &
      Ext;
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    const outerSubscribe = subscribe;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(observer: unknown) {
        if (typeof observer !== "object" || observer === null) {
          throw new TypeError("Expected the observer to be an object.");
        }

        function observeState() {
          const observerAsObserver = observer as Observer<S>;
          if (observerAsObserver.next) {
            observerAsObserver.next(getState());
          }
        }

        observeState();
        const unsubscribe = outerSubscribe(observeState);
        return { unsubscribe };
      },

      [$$observable]() {
        return this;
      }
    };
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT } as A);

  const store = ({
    dispatch: dispatch as Dispatch<A>,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  } as unknown) as Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext;
  return store;
}
```

## combineReducers.ts

## applyMiddleware.ts
