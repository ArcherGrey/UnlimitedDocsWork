# 观察者和发布订阅模式

[toc]

[参考](https://juejin.im/post/5bb1bb616fb9a05d2b6dccfa)
[参考](https://juejin.im/post/5b125ad3e51d450688133f22#comment)

## 观察者模式

:::info
使用一个 `subject` 对象维持一系列依赖于它的 `oberver` 观察者对象，将有关状态的任何变更自动通知给这一系列观察者对象。当 `subject` 目标对象需要告诉观察者发生了什么事情时，它会向观察者对象们广播一个通知
:::

![观察者模式](./images/observer.jpg)

如上图所示：

- 一个或多个观察者对目标对象感兴趣时，可以在目标对象上注册
- 在目标对象状态变化的时候就会对每个注册过的观察者发送通知，调用每个观察者自己的方法
- 如果观察者不需要再观察目标对象也可以取消注册

```js
function Subject() {
  this.observers = [];
}

Subject.prototype = {
  add: function(observer) {
    // 添加
    this.observers.push(observer);
  },
  remove: function(observer) {
    // 删除
    var observers = this.observers;
    for (var i = 0; i < observers.length; i++) {
      if (observers[i] === observer) {
        observers.splice(i, 1);
      }
    }
  },
  notify: function() {
    // 通知
    var observers = this.observers;
    for (var i = 0; i < observers.length; i++) {
      observers[i].update();
    }
  }
};

function Observer(name) {
  this.name = name;
}

Observer.prototype = {
  update: function() {
    // 更新
    console.log("my name is " + this.name);
  }
};

var sub = new Subject();

var obs1 = new Observer("ttsy1");
var obs2 = new Observer("ttsy2");

sub.add(obs1);
sub.add(obs2);
sub.notify(); //my name is ttsy1、my name is ttsy2
```

## 发布/订阅模式

:::info
使用一个事件通道，这个通道介于订阅者和发布者之间，该设计模式允许代码定义应用程序的特定事件，这些事件可以传递自定义参数，自定义参数包含订阅者需要的信息，采用事件通道可以避免发布者和订阅者之间产生依赖关系。
:::

![发布订阅模式](./images/publisher.jpg)

```js
let pubSub = {
  list: {},
  subscribe: function(key, fn) {
    // 订阅
    if (!this.list[key]) {
      this.list[key] = [];
    }
    this.list[key].push(fn);
  },
  publish: function() {
    // 发布
    let arg = arguments;
    let key = [].shift.call(arg);
    let fns = this.list[key];

    if (!fns || fns.length <= 0) return false;

    for (var i = 0, len = fns.length; i < len; i++) {
      fns[i].apply(this, arg);
    }
  },
  unSubscribe(key) {
    // 取消订阅
    delete this.list[key];
  }
};

pubSub.subscribe("name", name => {
  console.log("your name is " + name);
});
pubSub.subscribe("sex", sex => {
  console.log("your sex is " + sex);
});
pubSub.publish("name", "ttsy1"); // your name is ttsy1
pubSub.publish("sex", "male"); // your sex is male
```

## 区别

观察者模式：允许观察者实例对象(订阅者)执行适当的事件处理程序来注册和接收目标实例对象(发布者)发出的通知（即在观察者实例对象上注册 update 方法），使订阅者和发布者之间产生了依赖关系，且没有事件通道。不存在封装约束的单一对象，目标对象和观察者对象必须合作才能维持约束。 观察者对象向订阅它们的对象发布其感兴趣的事件。通信只能是单向的。

发布/订阅模式：单一目标通常有很多观察者，有时一个目标的观察者是另一个观察者的目标。通信可以实现双向。该模式存在不稳定性，发布者无法感知订阅者的状态。
