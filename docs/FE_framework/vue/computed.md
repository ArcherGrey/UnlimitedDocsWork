# 计算属性

简单的运算可以直接用模板内表达式实现，但是对于复杂运算例如：

```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

上面就不是简单的运算，这里是想要反转字符串。

**对于任何复杂逻辑，都应该使用计算属性**

## 例子

```
// HTML
<div id="example">
  <p>Original message: "{{message}}"</p>
  <p>Computed reversed message: "{{reversedMessage}}"</p>
</div>

//js
var vm = new Vue({
  el:"#example",
  data:{
    message:"Hello"
  },
  computed:{
    // 计算属性的 getter
    reversedMessage: function(){
      return this.message.split('').reverse().join()
    }
  }
})

```

`message` 发生改变的时候，`reverseMessage` 也会更新。

## 计算属性缓存 vs 方法

```
<p>Reversed message: "{{ reversedMessage() }}"</p>
// 在组件中
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

通过方法可以到达计算属性相同的效果，不同的是计算属性是基于响应式依赖进行缓存的，也就是说如果 `message` 没有改变，多次访问 `reversedMessage` 会立刻返回之前的计算结果而不是再次计算，相比之下调用方法总会再次执行函数。

## 计算属性 vs 监听属性

监听属性：

```
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```

计算属性：

```
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

- 命令式
- 重复

## 计算属性的 setter

计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：

```
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

## 监听属性

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。
