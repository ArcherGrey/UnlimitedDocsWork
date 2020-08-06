# 原生 `JavaScript` 模块化

## 反模式

反模式指没有使用任何模块系统，把不同的函数放到一起就算是一个模块：

```js
function f1() {
  //...
}
function f2() {
  //...
}
```

缺点：

- 污染了全局变量，无法保证不和其他模块发生变量命名冲突
- 模块成员之间看不出直接关系

## 字面量

为了解决上面的缺点，可以把模块写成一个字面量，所有模块成员都放到这个对象中：

```js
var module1 = new Object({
  _count : 0,
  f1 : function(){
    //...
  },
  f2 : function(){
    //...
  }
})
```

但是这种写法会暴露所有模块成员，内部状态可以被外部改写。

## `IIFE`

使用立即执行函数可以解决上面的问题：

```js
var module1 = (function(){
  var _count = 0;
  var f1 = function(){
    //...
  };
  var f2 = function(){
    //...
  };
  return {
    f1:f1,
    f2:f2
  };
})();
```

这样外部就无法读取内部状态。

### 传参

如果一个模块需要继承另一个模块，则需要传参：

```js
var module1 = (function(mod){
  mod.m3 = function (){
    //...
  };
  return mod;
})(window.module1 || {});
```

## 命名空间

```js
//math.js
namespace('math', [], function(){
  function add(a, b) { return a + b; }
  function sub(a, b) { return a - b; }
  return {
    add: add,
    sub: sub
  }
})
//calculator.js
namespace('calculator', ['math'], function(m){
  var action = 'add';
  function compute(a,b) {
    return m[action](a, b);
  }
  return {
    compute: compute
  }
})
var namespace = (function(){
    //缓存所有模块
    var cache = {};
    function createModule(name/*模块名*/,deps/*依赖列表*/,definition/*定义*/){
        //如果只有模块名，则直接输出
        if(arguments.length === 1){
            return cache[name];
        }
        //取得所有模块的依赖
        deps = deps.map(function(depName){
            return namespace(depName);
        })
        //初始化模块并返回
        cache[name] = definition.apply(null,deps);
        return cache[name];
    }
    return createModule;
})()
```

## 总结

模块依赖还是需要 amd cmd es6 moudlue 解决
