# Promise

[toc]

## 解决问题

多个异步请求存在依赖关系,需要按照一定顺序来执行,之前的解决是回调函数,会导致回调地狱:

```js
http(function() {
  http(function() {
    http(function() {
      // 回调地狱
    });
  });
});
```

`Promise` 将嵌套调用改为链式调用,增加了可读性和可维护性:

```js
const fs = require("fs");
function read(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

// 链式调用
read("./test.txt")
  .then(data => {
    return read(data);
  })
  .then(
    data => {
      console.log(data);
    },
    err => {
      console.log(err);
    }
  );
```

## 业界实现

- bluebird
- es6 promise
- Q

## 实现

基于 [Promise/A+] 规范

### 基础版

`Promise` 基本特征:

- 三种状态 [规范 Promise/A+ 2.1]
  - `pending`
  - `fulfilled`
  - `rejected`
  - 初始状态是 `pending`
- `new Promise` 执行构造函数的时候 `executor` 立即执行
  - `executor` 有两个参数 `resolve reject`
- 一个 `value` 保存成功状态的值 可能是 `undefined thenable promise` [规范 Promise/A+ 1.3]
- 一个 `reason` 保存失败状态的值 [规范 Promise/A+ 1.5]
- 状态只能是 `pending -> rejected` 或者 `pending -> fulfilled`
- 必须有一个 `then` 方法,接收两个参数 `onFulfilled`(成功回调) `onRejected`(失败回调) [规范 Promise/A+ 2.2]
- 调用 `then` 时
  - 成功 执行 `onFulfilled` 参数是 `value`
  - 失败 执行 `onRejected` 参数是 `reason`
  - 异常 将异常作为 `reason` 传递给下一个 `then` 的失败回调

```js
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    // 存放成功的回调
    this.onResolvedCallbacks = [];
    // 存放失败的回调
    this.onRejectedCallbacks = [];

    let resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 依次将对应的函数执行
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };

    let reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 依次将对应的函数执行
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }

    if (this.status === REJECTED) {
      onRejected(this.reason);
    }

    if (this.status === PENDING) {
      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value);
      });

      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}

// 测试
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功");
  }, 1000);
}).then(
  data => {
    console.log("success", data);
  },
  err => {
    console.log("faild", err);
  }
);

// 输出
// "success 成功"
```

### 链式调用和值穿透性

- `then` 的参数 `onFulfilled onRejected` 可以缺省,如果不是函数类型可以忽略,然后在下一次调用 `then` 可以获取之前返回的值 [规范 Promise/A+ 2.2.1、2.2.1.1、2.2.1.2]
- `then` 可以多次调用,每次返回都是 `Promise` 对象 [规范 Promise/A+ 2.2.7]
- `then` 执行
  - 返回普通值作为参数传递到下次 `then` 的成功回调
  - 抛出异常将异常作为参数传递到下次 `then` 的失败回调 [规范 Promise/A+ 2.2.7.2]
  - 返回一个 `Promise` 对象,就会等待执行完成,后序和 `Promise` 逻辑一致 [规范 Promise/A+ 2.2.7.3、2.2.7.4]
  - 如果出现循环引用,抛出异常将异常作为参数传递到下次 `then` 的失败回调 [规范 Promise/A+ 2.3.1]
  - 如果 `then` 的返回值 `x` 是一个 `promise`，且 `x` 同时调用 `resolve` 函数和 `reject` 函数，则第一次调用优先，其他所有调用被忽略 [规范 Promise/A+ 2.3.3.3.3]

```js
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

const resolvePromise = (promise2, x, resolve, reject) => {
  // 自己等待自己完成是错误的实现，用一个类型错误，结束掉 promise  Promise/A+ 2.3.1
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  // Promise/A+ 2.3.3.3.3 只能调用一次
  let called;
  // 后续的条件要严格判断 保证代码能和别的库一起使用
  if ((typeof x === "object" && x != null) || typeof x === "function") {
    try {
      // 为了判断 resolve 过的就不用再 reject 了（比如 reject 和 resolve 同时调用的时候）  Promise/A+ 2.3.3.1
      let then = x.then;
      if (typeof then === "function") {
        // 不要写成 x.then，直接 then.call 就可以了 因为 x.then 会再次取值，Object.defineProperty  Promise/A+ 2.3.3.3
        then.call(
          x,
          y => {
            // 根据 promise 的状态决定是成功还是失败
            if (called) return;
            called = true;
            // 递归解析的过程（因为可能 promise 中还有 promise） Promise/A+ 2.3.3.3.1
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            // 只要失败就失败 Promise/A+ 2.3.3.3.2
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // 如果 x.then 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.3.4
        resolve(x);
      }
    } catch (e) {
      // Promise/A+ 2.3.3.2
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 如果 x 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.4
    resolve(x);
  }
};

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };

    let reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    //解决 onFufilled，onRejected 没有传值的问题
    //Promise/A+ 2.2.1 / Promise/A+ 2.2.5 / Promise/A+ 2.2.7.3 / Promise/A+ 2.2.7.4
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
    //因为错误的值要让后面访问到，所以这里也要跑出个错误，不然会在之后 then 的 resolve 中捕获
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : err => {
            throw err;
          };
    // 每次调用 then 都返回一个新的 promise  Promise/A+ 2.2.7
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        //Promise/A+ 2.2.2
        //Promise/A+ 2.2.4 --- setTimeout
        setTimeout(() => {
          try {
            //Promise/A+ 2.2.7.1
            let x = onFulfilled(this.value);
            // x可能是一个proimise
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            //Promise/A+ 2.2.7.2
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        //Promise/A+ 2.2.3
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }
}

// 测试
const promise = new Promise((resolve, reject) => {
  reject("失败");
})
  .then()
  .then()
  .then(
    data => {
      console.log(data);
    },
    err => {
      console.log("err", err);
    }
  );

// 输出
// "失败 err"
```

`Promise/A+` 规范提供了一个专门的测试脚本，可以测试所编写的代码是否符合 `Promise/A+` 的规范

```shell
npm install -g promises-aplus-tests
```

那么在对应的目录执行以下命令:

```shell
promises-aplus-tests promise.js
```

在实现代码中增加:

```js
Promise.defer = Promise.deferred = function() {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
```

由于原生的 `Promise` 是 `V8` 引擎提供的微任务，我们无法还原 `V8` 引擎的实现，所以这里使用 `setTimeout` 模拟异步，所以原生的是微任务，这里是宏任务。

如果你想实现 promise 的微任务，可以 `mutationObserver` 替代 `seiTimeout` 来实现微任务。

### API

上述的 `promise` 源码已经符合 `Promise/A+` 的规范，但是原生的 `Promise` 还提供了一些其他方法，如:

- Promise.resolve()
- Promise.reject()
- Promise.prototype.catch()
- Promise.prototype.finally()
- Promise.all()
- Promise.race(）

**Promise.resolve**

默认产生一个成功的 `promise`

```js
static resolve(data){
  return new Promise((resolve,reject)=>{
    resolve(data);
  })
}

let resolve = value => {
  // ======新增逻辑======
  // 如果 value 是一个promise，那我们的库中应该也要实现一个递归解析
  if (value instanceof Promise) {
    // 递归解析
    return value.then(resolve, reject);
  }
  // ===================
  if (this.status === PENDING) {
    this.status = FULFILLED;
    this.value = value;
    this.onResolvedCallbacks.forEach(fn => fn());
  }
};

// 测试
Promise.resolve(
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("ok");
    }, 3000);
  })
)
  .then(data => {
    console.log(data, "success");
  })
  .catch(err => {
    console.log(err, "error");
  });

// 输出
// "ok success"
```

**Promise.reject**

默认产生一个失败的 `promise`，`Promise.reject`是直接将值变成错误结果

```js
static reject(reason){
  return new Promise((resolve,reject)=>{
    reject(reason);
  })
}
```

**Promise.prototype.catch**

`Promise.prototype.catch` 用来捕获 `promise` 的异常，就相当于一个没有成功的 `then`

```js
Promise.prototype.catch = function(errCallback) {
  return this.then(null, errCallback);
};
```

**Promise.prototype.finally**

`finally` 表示不是最终的意思，而是无论如何都会执行的意思。 如果返回一个 `promise` 会等待这个 `promise` 也执行完毕。如果返回的是成功的 `promise`，会采用上一次的结果；如果返回的是失败的 `promise`，会用这个失败的结果，传到 `catch` 中。

```js
romise.prototype.finally = function(callback) {
  return this.then(
    value => {
      return Promise.resolve(callback()).then(() => value);
    },
    reason => {
      return Promise.resolve(callback()).then(() => {
        throw reason;
      });
    }
  );
};
```

**Promise.all**

`promise.all` 是解决并发问题的，多个异步并发获取最终的结果（如果有一个失败则失败）

```js
Promise.all = function(values) {
  if (!Array.isArray(values)) {
    const type = typeof values;
    return new TypeError(`TypeError: ${type} ${values} is not iterable`);
  }
  return new Promise((resolve, reject) => {
    let resultArr = [];
    let orderIndex = 0;
    const processResultByKey = (value, index) => {
      resultArr[index] = value;
      if (++orderIndex === values.length) {
        resolve(resultArr);
      }
    };
    for (let i = 0; i < values.length; i++) {
      let value = values[i];
      if (value && typeof value.then === "function") {
        value.then(value => {
          processResultByKey(value, i);
        }, reject);
      } else {
        processResultByKey(value, i);
      }
    }
  });
};
```

**Promise.race**

`Promise.race` 用来处理多个请求，采用最快的（谁先完成用谁的）。

```js
Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    // 一起执行就是for循环
    for (let i = 0; i < promises.length; i++) {
      let val = promises[i];
      if (val && typeof val.then === "function") {
        val.then(resolve, reject);
      } else {
        // 普通值
        resolve(val);
      }
    }
  });
};
```
