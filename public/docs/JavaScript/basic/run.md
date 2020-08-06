# `JavaScript` 的执行机制

## 引擎

`Google` 的 `V8` 引擎作为示例，该引擎主要包含两个组件：

- `Memory Heap` 内存堆，这是内存分配发生的地方
- `Call Stack` 调用堆栈，这是在代码执行时栈帧存放的位置

---

## `javascript` 的单线程

`JavaScript`语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。

`JavaScript`的单线程，与它的用途有关。作为浏览器脚本语言，`JavaScript`的主要用途是与用户互动，以及操作`DOM`。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定`JavaScript`同时有两个线程，一个线程在某个`DOM`节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

所以，为了避免复杂性，从一诞生，`JavaScript`就是单线程，这已经成了这门语言的核心特征，将来也不会改变。

为了利用多核`CPU`的计算能力，`HTML5`提出`Web Worker`标准，允许`JavaScript`脚本创建多个线程，但是子线程完全受主线程控制，且不得操作`DOM`。所以，这个新标准并没有改变`JavaScript`单线程的本质。

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。

如果排队是因为计算量大，`CPU`忙不过来，倒也算了，但是很多时候`CPU`是闲着的，因为`IO`设备（输入输出设备）很慢（比如`Ajax`操作从网络读取数据），不得不等着结果出来，再往下执行。

`JavaScript`语言的设计者意识到，这时主线程完全可以不管`IO`设备，挂起处于等待中的任务，先运行排在后面的任务。等到`IO`设备返回了结果，再回过头，把挂起的任务继续执行下去。

于是，所有任务可以分成两种:

- 同步任务（`synchronous`）在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务
- 异步任务（`asynchronous`）不进入主线程、而进入"任务队列"（`task queue`）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

常见的异步任务有`Ajax`操作、定时器（`setTimeout/setInterval`）、`UI`事件（`load`(图片`js`文件的加载等)、`resize`、`scroll`、`click`等）。

### `Event-Loop`（事件循环）

![事件循环流程图](./images/run.jpg)

上面的图具体来说，运行机制如下:

- 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入`Event Table` 并注册函数。
- 当指定的事情完成时，`Event Table` 会将这个函数移入 `Event Queue`。
- 主线程内的任务执行完毕为空，会去 `Event Queue` 读取对应的函数，进入主线程执行。
- 上述过程会不断重复，也就是常说的 `Event Loop`(事件循环)。

怎么判断栈空：引擎存在 `monitoring process` 进程，会持续不断的检查主线程执行栈是否为空，一旦为空，就会去 `Event Queue` 那里检查是否有等待被调用的函数。

例子：

```JavaScript
let data = [];
$.ajax({
    url:www.javascript.com,
    data:data,
    success:() => {
        console.log('发送成功!');
    }
})
console.log('代码执行结束');
```

上面是一段简易的 `ajax` 请求代码：

- `ajax` 进入 `Event Table`，注册回调函数 `success`。
- 执行 `console.log('代码执行结束')`。
- `ajax` 事件完成，回调函数 `success` 进入`Event Queue`。
- 主线程从 `Event Queue` 读取回调函数 `success` 并执行。

### 调用栈

所有任务都在主线程上执行，形成一个执行栈（`execution context stack`）

执行栈是一种数据结构，如果执行一个函数就会把该函数放到栈顶，当函数返回的时候，就会将这个函数从栈顶弹出：

```JavaScript
function m(x,y){
    return x*y;
}
function p(x){
    var s = m(x,x);
    console.log(s);
}
p(5);
```

当程序开始执行的时候，栈是空的，然后步骤如下：

1. p 入栈
2. m 入栈
3. m 执行完出栈
4. p 执行完出栈
5. 栈空

每一个进入栈的过程都称为调用帧

当你达到调用栈最大的大小的时候就会发生 **栈溢出**，而且这相当容易发生，特别是在你写递归的时候却没有全方位的测试它，这个时候浏览器会抛出异常。

### 宏任务和微任务

除了广义的同步任务和异步任务，我们对任务有更精细的定义：

- `macro-task(宏任务)`：包括整体代码，`setTimeout`，`setInterval`
- `micro-task(微任务)`：`Promise`，`process.nextTick`

不同类型的任务会进入对应的 `Event Queue`，比如 `setTimeout` 和 `setInterval` 会进入相同的 `Event Queue`。
事件循环的顺序，决定代码的执行顺序。进入整体代码(宏任务)后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。听起来有点绕，用一段代码说明：

```JavaScript
setTimeout(function() {
    console.log('setTimeout');
})

new Promise(function(resolve) {
    console.log('promise');
}).then(function() {
    console.log('then');
})

console.log('console');
```

1. 这段代码作为宏任务，进入主线程。
2. 先遇到 `setTimeout`，那么将其回调函数注册后分发到宏任务 `Event Queue`。
3. 接下来遇到了 `Promise，new Promise` 立即执行，`then` 函数分发到微任务 `Event Queue`。
4. 遇到 `console.log()`，立即执行。
5. 好啦，整体代码作为第一个宏任务执行结束，看看有哪些微任务？我们发现了 `then` 在微任务 `Event Queue` 里面，执行。
6. 第一轮事件循环结束了，我们开始第二轮循环，当然要从宏任务 `Event Queue` 开始。我们发现了宏任务 `Event Queue` 中 `setTimeout` 对应的回调函数，立即执行。
7. 结束。

![宏任务微任务流程图](./images/run2.jpg)
