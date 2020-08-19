# 手写代码

- [面试参考](https://juejin.im/post/5d8989296fb9a06b1f147070#heading-10)
- [面试参考](https://juejin.im/post/5d87985d6fb9a06add4e6ac3#heading-13)

- [call apply bind](#1)
- [防抖](#2)
- [节流](#3)
- [浅拷贝](#4)
- [深拷贝](#5)
- [Object.create](#6)
- [promise](#7)
- [instanceOf](#8)
- [双向数据绑定](#9)
- [观察者](#10)
- [发布订阅](#11)
- [遍历子节点](#12)

## call apply bind

<a name='1'></a>

`bind`:

```
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          // this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
          return fToBind.apply(this instanceof fBound
                 ? this
                 : oThis,
                 // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    // 维护原型关系
    if (this.prototype) {
      // 当执行Function.prototype.bind()时, this为Function.prototype
      // this.prototype(即Function.prototype.prototype)为undefined
      fNOP.prototype = this.prototype;
    }
    // 下行的代码使fBound.prototype是fNOP的实例,因此
    // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
    fBound.prototype = new fNOP();

    return fBound;
  };
}
```

---

`call`:

```
Function.prototype.call = function(ctx){
    // 非严格模式下
    // 如果第一个参数为null或者undefined，则指向全局对象
    // ---
    // 严格模式下
    // 如果是null则this为null，如果是undefined则this为undefined
    let context = ctx||window;
    context.fn = this; // 待执行函数

    // 参数是类数组对象没有slice方法
    // 需要先转换成数组
    let args = [...arguments].slice(1);
    context.fn(...args);
    delete context.fn;
}
```

---

`apply`:

```
Function.prototype.apply = function(ctx){
    // 非严格模式下
    // 如果第一个参数为null或者undefined，则指向全局对象
    // ---
    // 严格模式下
    // 如果是null则this为null，如果是undefined则this为undefined
    let context = ctx||window;
    context.fn = this; // 待执行函数

    let args = [...arguments][1];
    if(args)
        context.fn(...args);
    else
        context.fn();
    delete context.fn;
}
```

## 防抖

<a name='2'></a>

```
// 箭头函数
const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

// 普通版
// 思路:在规定时间内未触发第二次，则执行
function debounce (fn, delay) {
  // 利用闭包保存定时器
  let timer = null
  return function () {
    let context = this
    let arg = arguments
    // 在规定时间内再次触发会先清除定时器后再重设定时器
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, arg)
    }, delay)
  }
}

```

## 节流

<a name='3'></a>

```
// 时间戳
function throttle(func, wait) {
    var context, args;
    var previous = 0;

    return function() {
        var now = +new Date();
        context = this;
        args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}

// 定时器
function throttle(func, wait) {
    var timeout;

    return function() {
        context = this;
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(function(){
                timeout = null;
                func.apply(context, args)
            }, wait)
        }

    }
}
```

## 浅拷贝

<a name='4'></a>

```
var shallowCopy = function(obj) {
    // 只拷贝对象
    if (typeof obj !== 'object') return;
    // 根据obj的类型判断是新建一个数组还是对象
    var newObj = obj instanceof Array ? [] : {};
    // 遍历obj，并且判断是obj的属性才拷贝
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
```

## 深拷贝

<a name='5'></a>

```
// 最简版 只能拷贝普通对象和数组
// 方法1
let obj = {a: 1, b: {x: 3}}
JSON.parse(JSON.stringify(obj))

// 方法2
var deepCopy = function(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}


// 稍复杂
/**
 * deep clone
 * @param  {[type]} parent object 需要进行克隆的对象
 * @return {[type]}        深克隆后的对象
 */
const clone = parent => {
  // 判断类型
  const isType = (obj, type) => {
    if (typeof obj !== "object") return false;
    const typeString = Object.prototype.toString.call(obj);
    let flag;
    switch (type) {
      case "Array":
        flag = typeString === "[object Array]";
        break;
      case "Date":
        flag = typeString === "[object Date]";
        break;
      case "RegExp":
        flag = typeString === "[object RegExp]";
        break;
      default:
        flag = false;
    }
    return flag;
  };

  // 处理正则
  const getRegExp = re => {
    var flags = "";
    if (re.global) flags += "g";
    if (re.ignoreCase) flags += "i";
    if (re.multiline) flags += "m";
    return flags;
  };
  // 维护两个储存循环引用的数组
  const parents = [];
  const children = [];

  const _clone = parent => {
    if (parent === null) return null;
    if (typeof parent !== "object") return parent;

    let child, proto;

    if (isType(parent, "Array")) {
      // 对数组做特殊处理
      child = [];
    } else if (isType(parent, "RegExp")) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (isType(parent, "Date")) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime());
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent);
      // 利用Object.create切断原型链
      child = Object.create(proto);
    }

    // 处理循环引用
    const index = parents.indexOf(parent);

    if (index != -1) {
      // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
      return children[index];
    }
    parents.push(parent);
    children.push(child);

    for (let i in parent) {
      // 递归
      child[i] = _clone(parent[i]);
    }

    return child;
  };
  return _clone(parent);
};

```

## Object.create

<a name='6'></a>

```
// 也就是原型式继承
function create(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}
```

## promise

<a name='7'></a>

```
// 未添加异步处理等其他边界情况
// ①自动执行函数，②三个状态，③then
class Promise {
  constructor (fn) {
    // 三个状态
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
      }
    }
    let reject = value => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = value
      }
    }
    // 自动执行函数
    try {
      fn(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  // then
  then(onFulfilled, onRejected) {
    switch (this.state) {
      case 'fulfilled':
        onFulfilled()
        break
      case 'rejected':
        onRejected()
        break
      default:
    }
  }
}

```

## instanceOf

<a name='8'></a>

```
// 思路：右边变量的原型存在于左边变量的原型链上
function instanceOf(left, right) {
  let leftValue = left.__proto__
  let rightValue = right.prototype
  while (true) {
    if (leftValue === null) {
      return false
    }
    if (leftValue === rightValue) {
      return true
    }
    leftValue = leftValue.__proto__
  }
}

```

## 数据绑定

<a name='9'></a>

```
// 极简第一种
const obj = {};
Object.defineProperty(obj, 'text', {
  get: function() {
    console.log('get val');
  },
  set: function(newVal) {
    console.log('set val:' + newVal);
    document.getElementById('input').value = newVal;
    document.getElementById('span').innerHTML = newVal;
  }
});

const input = document.getElementById('input');
input.addEventListener('keyup', function(e){
  obj.text = e.target.value;
})


// -----------------

// 极简第二种
const input = document.getElementById('input');
const p = document.getElementById('p');
const obj = {};

const newObj = new Proxy(obj, {
  get: function(target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function(target, key, value, receiver) {
    console.log(target, key, value, receiver);
    if (key === 'text') {
      input.value = value;
      p.innerHTML = value;
    }
    return Reflect.set(target, key, value, receiver);
  },
});

input.addEventListener('keyup', function(e) {
  newObj.text = e.target.value;
});
```

## 观察者

<a name='10'></a>

```
function Subject() {
    this.observers = [];
}

Subject.prototype = {
    add: function (observer) {  // 添加
        this.observers.push(observer);
    },
    remove: function (observer) {  // 删除
        var observers = this.observers;
        for (var i = 0; i < observers.length; i++) {
            if (observers[i] === observer) {
                observers.splice(i, 1);
            }
        }
    },
    notify: function () {  // 通知
        var observers = this.observers;
        for (var i = 0; i < observers.length; i++) {
            observers[i].update();
        }
    }
}

function Observer(name) {
    this.name = name;
}

Observer.prototype = {
    update: function () {  // 更新
        console.log('my name is ' + this.name);
    }
}

var sub = new Subject();

var obs1 = new Observer('ttsy1');
var obs2 = new Observer('ttsy2');

sub.add(obs1);
sub.add(obs2);
sub.notify();  //my name is ttsy1、my name is ttsy2

```

## 发布订阅

<a name='11'></a>

```
let pubSub = {
    list: {},
    subscribe: function (key, fn) {  // 订阅
        if (!this.list[key]) {
            this.list[key] = [];
        }
        this.list[key].push(fn);
    },
    publish: function () {  // 发布
        let arg = arguments;
        let key = [].shift.call(arg);
        let fns = this.list[key];

        if (!fns || fns.length <= 0) return false;

        for (var i = 0, len = fns.length; i < len; i++) {
            fns[i].apply(this, arg);
        }

    },
    unSubscribe(key) {  // 取消订阅
        delete this.list[key];
    }
};

pubSub.subscribe('name', (name) => {
    console.log('your name is ' + name);
});
pubSub.subscribe('sex', (sex) => {
    console.log('your sex is ' + sex);
});
pubSub.publish('name', 'ttsy1');  // your name is ttsy1
pubSub.publish('sex', 'male');  // your sex is male

```
