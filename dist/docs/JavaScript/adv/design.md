# 设计模式

参考 JavaScript 设计模式与开发实践

[toc]

## 单例模式

> 保证一个类仅有一个实例，并提供一个访问它的全局访问方式。

```js
// 单例类
var Singleton = function(name) {
  this.name = name;
};

Singleton.prototype.getName = function() {
  console.log(this.name);
};
Singleton.getInstance = (function() {
  var instance = null;
  return function(name) {
    if (!instance) instance = new Singleton(name);
    else {
      instance.name = name;
    }
    return instance;
  };
})();
// 创建单例对象
var a = Singleton.getInstance("s1");
a.getName(); // s1
var b = Singleton.getInstance("s2");
b.getName(); // s2
console.log(a == b); // true
```

:::warning
上面实现了一个单例类，但是还有一个问题，那就是这个类对于使用者是不透明的，不是使用常见的 `new` 来创建实例对象
:::

### 代理实现单例模式

为了解决上面的问题可以用代理来实现单例模式：

```JavaScript
class Singleton {
  constructor(name) {
    this.name = name;
    this.getName();
  }
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }
}
// 代理实现单例模式
var ProxyMode = (function() {
  var instance = null;
  return function(name) {
    if (!instance) {
      instance = new Singleton(name);
    } else instance.setName(name);
    return instance;
  };
})();
// 测试单体模式的实例
var a = new ProxyMode("aaa");
console.log(a.name); // aaa
var b = new ProxyMode("bbb");
console.log(b.name); // bbb
// 因为单体模式是只实例化一次，所以下面的实例是相等的
console.log(a === b); //true

```

### 惰性单例

:::info
指的是在需要的时候才创建对象实例。惰性单例是单例模式的重点
:::

创建唯一的浮窗:

```js
var getSingle = function(fn) {
  var result;
  return function() {
    return result || (result = fn.apply(this, arguments));
  };
};
var createLoginLayer = function() {
  var div = document.createElement("div");
  div.innerHTML = "我是登录浮窗";
  div.style.display = "none";
  document.body.appendChild(div);

  return div;
};
var createSingleLoginLayer = getSingle(createLoginLayer);
document.getElementById("loginBtn").onclick = function() {
  var loginLayer = createSingleLoginLayer();
  loginLayer.style.display = "block";
};
```

## 策略模式

> 定义一系列算法，把它们一个个封装起来，并且可以相互替换

目的就是讲算法的使用和实现分离。

一个基于策略模式的程序至少由两部分组成:

1. 策略类，封装具体的算法，并且负责具体的计算过程；
2. 环境类，接受请求然后将其委托给某个策略类。

```JavaScript
/*策略类*/
var levelOBJ = {
    "A": function(money) {
        return money * 4;
    },
    "B" : function(money) {
        return money * 3;
    },
    "C" : function(money) {
        return money * 2;
    }
};
/*环境类*/
var calculateBouns =function(level,money) {
    return levelOBJ[level](money);
};
console.log(calculateBouns('A',10000)); // 40000
```

### 应用场景-表单校验

未使用策略模式：

```js
var registerForm = document.getElementById("registerForm");
registerForm.onsubmit = function() {
  if (registerForm.userName.value === "") {
    alert("用户名不能为空");
    return false;
  }
  if (registerForm.password.value.length < 6) {
    alert("密码长度不能少于 6 位");
    return false;
  }
  if (!/(^1[3|5|8][0-9]{9}$)/.test(registerForm.phoneNumber.value)) {
    alert("手机号码格式不正确");
    return false;
  }
};
```

使用策略模式：

```js
var strategies = {
    isNonEmpty: function( value, errorMsg ){
        if ( value === '' ){
            return errorMsg ;
        }
    },
    minLength: function( value, length, errorMsg ){
        if ( value.length < length ){
            return errorMsg;
        }
    },
    isMobile: function( value, errorMsg ){ // 手机号码格式
        if ( !/(^1[3|5|8][0-9]{9}$)/.test( value ) ){
            return errorMsg;
        }
    }
};
var Validator = function(){
    this.cache = []; // 保存校验规则
};
Validator.prototype.add = function(dom,rule,errorMsg)
    var ary = rule.split( ':' );
    this.cache.push(function(){ //
        var strategy = ary.shift();
        ary.unshift( dom.value );
        ary.push( errorMsg ); //
        return strategies[strategy].apply(dom, ary);
    });
};
Validator.prototype.start = function(){
    for ( var i = 0, validatorFunc; validatorFunc = this.cache[ i++ ]; ){
        var msg = validatorFunc(); // 开始校验，并取得校验后的返回信息
        if ( msg ){ // 如果有确切的返回值，说明校验没有通过
              return msg;
        }
    }
};
var validataFunc = function(){
    var validator = new Validator(); // 创建一个 validator 对象
    /***************添加一些校验规则****************/
    validator.add( registerForm.userName, 'isNonEmpty', '用户名不能为空' );
    validator.add( registerForm.password, 'minLength:6', '密码长度不能少于 6位');
    validator.add( registerForm.phoneNumber, 'isMobile', '手机号码格式不正确' );
    var errorMsg = validator.start(); // 获得校验结果
    return errorMsg; // 返回校验结果
}
var registerForm = document.getElementById( 'registerForm' );
registerForm.onsubmit = function(){
    var errorMsg = validataFunc(); // 如果 errorMsg 有确切的返回值，说明未通过校验
    if ( errorMsg ){
        alert ( errorMsg );
        return false; // 阻止表单提交
    }
};

```

### 优缺点

优点：

- 利用组合、委托、多态等思想可以有效避免多重条件选择语句
- 提供了对开放-封闭原则完美支持，使得策略易于切换、理解、扩展
- 复用性

缺点：

- 会增加很多策略类或策略对象
- 必须了解所有策略

## 代理模式

:::info
为一个对象提供一个代用品或者占位符，以便控制对它的访问
:::

### 保护代理

通过代理过滤来筛选请求，这样的代理就是**保护代理**：

```js
// A
var A = {
  send: function(target, msg) {
    console.log("A 发出：" + msg);
    target.receive(msg);
  }
};

// 保护代理
var proxy = {
  receive: function(msg) {
    if (typeof msg === "number") B.receive(msg);
    else console.log("消息类型不是数字，被过滤");
  }
};

// B
var B = {
  receive: function(msg) {
    console.log("B 收到：" + msg);
  }
};

A.send(proxy, "abc");
A.send(proxy, 123);
/* 结果 */
// A 发出：abc
// 消息类型不是数字，被过滤
// A 发出：123
// B 收到：123
```

### 虚拟代理

请求传递到代理，在满足某种条件之后代理再把请求继续传递，这样就是**虚拟代理**

图片懒加载：先通过一个 `loading` 图占位，然后通过异步方式加载图片，等图片加载好了再把完成的图片加载到标签里。

```JavaScript
var imgFunc = (function() {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc: function(src) {
            imgNode.src = src;
        }
    }
})();
var proxyImage = (function() {
    var img = new Image();
    img.onload = function() {
        imgFunc.setSrc(this.src);
    }
    return {
        setSrc: function(src) {
            imgFunc.setSrc('./loading,gif');
            img.src = src;
        }
    }
})();
proxyImage.setSrc('./pic.png');
```

### 缓存代理

缓存代理可以为一些开销大的运算结果提供暂时的缓存，下次计算如果参数还是一样就可以直接使用缓存的结果

计算乘积：

```js
// 求乘积
var mult = function() {
  console.log("开始计算乘积");
  var a = 1;
  for (var i = 0; i < arguments.length; ++i) {
    a *= arguments[i];
  }
  return a;
};

mult(2, 3); // 6

// 加入缓存代理
var proxyMult = (function() {
  var cache = new Map();
  return function() {
    var args = Array.prototype.join.call(arguments, ",");

    if (cache.has(args)) {
      return cache.get(args);
    } else {
      var ans = mult.apply(this, arguments);
      cache.set(args, ans);
      return ans;
    }
  };
})();

proxyMult(1, 2, 3, 4, 5); // 120 调用 mult
proxyMult(1, 2, 3, 4, 5); // 120 不调用 mult 直接从缓存中取
```

## 迭代器模式

:::info
迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示，大部分流行语言都有内置的迭代器实现
:::

### 内部迭代器和外部迭代器

:::info
内部迭代器调用很方便，外界不需要关心内部实现，也只会在初始调用一次，缺点在于规则固定
:::

实现一个 `each` 函数接收两个参数，第一个是被迭代的数组，第二个是回调函数

```js
/**
 * @description: 迭代器函数
 * @param {Array} arr 被迭代数组
 * @param {Function} callback 回调函数
 * @return {type}
 */
function each(arr, callback) {
  for (let i = 0; i < arr.length; ++i) {
    callback.call(arr, i, arr[i]);
  }
}

each([1, 2, 3], (i, n) => {
  console.log(i, n);
});

const compare = (o1, o2) => {
  if (o1.length != o2.length) {
    console.log("不相等");
    return;
  }
  let equal = true;
  each(o1, (i, n) => {
    if (o2[i] != n) {
      equal = false;
      console.log("不相等");
    }
  });
  if (equal) {
    console.log("相等");
  }
};

let a1 = [1, 2, 3];
let a2 = [1, 2, 3];
let a3 = [1, 2, 3, 4, 5];

compare(a1, a2); // 相等
compare(a1, a3); // 不相等
```

:::info
外部迭代器必须显式请求迭代下一个元素，更加灵活
:::

```js
/**
 * @description: 外部迭代器
 * @param {Array} obj 迭代对象
 * @return {type}
 */
function Iterator(obj) {
  let cur = 0;
  const next = () => {
    cur++;
  };
  const isDone = () => {
    return cur >= obj.length;
  };
  const getCur = () => {
    return obj[cur];
  };
  return {
    next,
    isDone,
    getCur
  };
}

const compare = (o1, o2) => {
  debugger;
  while (!o1.isDone() && !o2.isDone()) {
    if (o1.getCur() != o2.getCur()) {
      console.log("不相等");
      return;
    }
    o1.next();
    o2.next();
  }
  if (!o1.isDone() || !o2.isDone()) {
    console.log("不相等");
    return;
  }
  console.log("相等");
};

var a1 = Iterator([1, 2, 3]);
var a2 = Iterator([1, 2, 3]);
var a3 = Iterator([1, 2, 3, 4, 5]);

compare(a1, a2); // 相等
compare(a1, a3); // 不相等
```

## 发布-订阅模式

详见 `JavaScript 进阶 观察者模式和发布订阅模式`

## 中介者模式

> 通过一个中介者对象，其他所有的相关对象都通过该中介者对象来通信，而不是相互引用，当其中的一个对象发生改变时，只需要通知中介者对象即可。通过中介者模式可以解除对象与对象之间的紧耦合关系

中介者模式适用的场景：例如购物车需求，存在商品选择表单、颜色选择表单、购买数量表单等等，都会触发 change 事件，那么可以通过中介者来转发处理这些事件，实现各个事件间的解耦，仅仅维护中介者对象即可。

```JavaScript
var goods = {   //手机库存
    'red|32G': 3,
    'red|64G': 1,
    'blue|32G': 7,
    'blue|32G': 6,
};
//中介者
var mediator = (function() {
    var colorSelect = document.getElementById('colorSelect');
    var memorySelect = document.getElementById('memorySelect');
    var numSelect = document.getElementById('numSelect');
    return {
        changed: function(obj) {
            switch(obj){
                case colorSelect:
                    //TODO
                    break;
                case memorySelect:
                    //TODO
                    break;
                case numSelect:
                    //TODO
                    break;
            }
        }
    }
})();
colorSelect.onchange = function() {
    mediator.changed(this);
};
memorySelect.onchange = function() {
    mediator.changed(this);
};
numSelect.onchange = function() {
    mediator.changed(this);
};
```

## 装饰者模式

> 在不改变对象自身的基础上，在程序运行期间给对象动态地添加方法。

装饰者模式适用的场景：原有方法维持不变，在原有方法上再挂载其他方法来满足现有需求；函数的解耦，将函数拆分成多个可复用的函数，再将拆分出来的函数挂载到某个函数上，实现相同的效果但增强了复用性。

例：用 AOP 装饰函数实现装饰者模式

```JavaScript
Function.prototype.before = function(beforefn) {
    var self = this;    //保存原函数引用
    return function(){  //返回包含了原函数和新函数的 '代理函数'
        beforefn.apply(this, arguments);    //执行新函数，修正this
        return self.apply(this,arguments);  //执行原函数
    }
}
Function.prototype.after = function(afterfn) {
    var self = this;
    return function(){
        var ret = self.apply(this,arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
}
var func = function() {
    console.log('2');
}
//func1和func3为挂载函数
var func1 = function() {
    console.log('1');
}
var func3 = function() {
    console.log('3');
}
func = func.before(func1).after(func3);
func();
```
