# 设计模式

- [单例模式](#单例模式)
- [策略模式](#策略模式)
- [代理模式](#代理模式)
- [中介者模式](#中介者模式)
- [装饰者模式](#装饰者模式)

> 设计模式：在面向对象软件设计过程中针对特定问题的简洁而优雅的解决方案

## 单例模式

> 保证一个类仅有一个实例，并提供一个访问它的全局访问方式。实现的方法为先判断实例是否存在，如果存在直接返回，不存在就创建了后再返回，这样就确保了一个类只有一个实例对象。

适用场景：一个单一对象，比如：弹窗，无论点击多少次都只应该创建一次。

```JavaScript
class CreateUser {
    constructor(name) {
        this.name = name;
        this.getName();
    }
    getName() {
         return this.name;
    }
}
// 代理实现单例模式
var ProxyMode = (function() {
    var instance = null;
    return function(name) {
        if(!instance) {
            instance = new CreateUser(name);
        }
        return instance;
    }
})();
// 测试单体模式的实例
var a = new ProxyMode("aaa");
var b = new ProxyMode("bbb");
// 因为单体模式是只实例化一次，所以下面的实例是相等的
console.log(a === b);    //true

```

## 策略模式

> 定义一系列算法，把它们一个个封装起来，并且可以相互替换

目的就是讲算法的使用和实现分离。

一个基于策略模式的程序至少由两部分组成，第一部分是策略类，封装具体的算法，并且负责具体的计算过程；第二部分是环境类，接受请求然后将其委托给某个策略类。

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

## 代理模式

> 为一个对象提供一个代用品或者占位符，以便控制对它的访问

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
