# 组件通信

[toc]

## 父组件 -> 子组件

### props

:::info
通过 `props` 父组件可以向子组件传递数据
:::

**大小写**

`HTML` 中的属性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符，在使用 `DOM` 模板的时候，`camelCase`(驼峰命名法)的名称需要使用等价的 `kebab-case` (短横线分隔)来命名：

```js
Vue.component("blog-post", {
  // 在 JavaScript 中是 camelCase 的
  props: ["postTitle"],
  template: "<h3>{{ postTitle }}</h3>"
});
```

```html
<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-post>
```

如果是使用字符串模板，那么这个限制就不存在了。

**类型**

可以以对象形式列出每个 `prop` 的类型：

```js
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise
  // or any other constructor
}
```

**静态或动态 prop**

静态：

```html
<blog-post title="My journey with Vue"></blog-post>
```

动态：

```html
<!-- 动态赋予一个变量的值 -->
<blog-post v-bind:title="post.title"></blog-post>

<!-- 动态赋予一个复杂表达式的值 -->
<blog-post v-bind:title="post.title + ' by ' + post.author.name"></blog-post>
```

任何类型的值都可以传给一个 `prop`。

**单向数据流**

父级更新 `prop` 会流动到子组件中，而反之不行

:::warning
注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身将会影响到父组件的状态。
:::

### attrs 和 listeners

2.4.0 新增 这两个是不常用属性,但是高级用法很常见

`attrs`：

1. 父组件有很多值传入子组件，没有定义 `props`：

```js
// 父组件
<home title="这是标题" width="80" height="80" imgUrl="imgUrl"/>

// 子组件
mounted() {
  console.log(this.$attrs) //{title: "这是标题", width: "80", height: "80", imgUrl: "imgUrl"}
},

```

2. 获取子组件中未定义 `props`，但是父组件中传递的属性：

```js
props: {
  width: {
    type: String,
    default: ''
  }
},
mounted() {
  console.log(this.$attrs) //{title: "这是标题", height: "80", imgUrl: "imgUrl"}
},

```

`listeners` 获取父组件方法：

```js
// 父组件
<home @change="change"/>

// 子组件
mounted() {
  console.log(this.$listeners) //即可拿到 change 事件
}
```

### provide / inject

:::info
provide 和 inject 主要在开发高阶插件/组件库时使用。并不推荐用于普通应用程序代码中。
:::

:::warning
provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。
:::

这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效。

```js
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: "bar"
  }
  // ...
};

// 子组件注入 'foo'
var Child = {
  inject: ["foo"],
  created() {
    console.log(this.foo); // => "bar"
  }
  // ...
};
```

## 子组件 -> 父组件

### `$emit`

子组件触发，父组件绑定在子组件上的事件。

子组件:

```js
Vue.component("welcome-button", {
  template: `
    <button v-on:click="$emit('welcome')">
      Click me to be welcomed
    </button>
  `
});
```

父组件:

```html
<div id="emit-example-simple">
  <welcome-button v-on:welcome="sayHi"></welcome-button>
</div>
```

```js
new Vue({
  el: "#emit-example-simple",
  methods: {
    sayHi: function() {
      alert("Hi!");
    }
  }
});
```

### `$refs`

```js
// 父组件
<home ref="home"/>

mounted(){
  console.log(this.$refs.home) //即可拿到子组件的实例,就可以直接操作 data 和 methods
}
```

## 全局

### vuex

集中式存储管理应用的所有组件的状态

### parent 和 children

`children` 和 `parent` 并不保证顺序，也不是响应式的 只能拿到一级父组件和子组件:

```js
//父组件
mounted(){
  console.log(this.$children)
  //可以拿到 一级子组件的属性和方法
  //所以就可以直接改变 data,或者调用 methods 方法
}

//子组件
mounted(){
  console.log(this.$parent) //可以拿到 parent 的属性和方法
}

```

### EventBus

1. 就是声明一个全局 `Vue` 实例变量 `EventBus` , 把所有的通信数据，事件监听都存储到这个变量上;
2. 类似于 `Vuex`。但这种方式只适用于极小的项目
3. 原理就是利用 `on` 和 `on` 和 `emit` 并实例化一个全局 `vue` 实现数据共享
4. 可以实现平级,嵌套组件传值,但是对应的事件名 `eventTarget` 必须是全局唯一的

### 路由传参

1. 直接在 `url` 上面加：

```js
this.$router.push({
  path: `/describe/${id}`
});
```

2. 在参数里面加：

```js
this.$router.push({
  name: "Describe",
  params: {
    id: id
  }
});
```

3. 在查询里面加：

```js
this.$router.push({
  path: '/describe',
    query: {
      id: id
  }
)
```

1,3 会把参数暴露，2 不会暴露但是刷新会丢失参数

### Vue.observable

2.6.0 新增 用法:让一个对象可响应。`Vue` 内部会用它来处理 `data` 函数返回的对象; 返回的对象可以直接用于渲染函数和计算属性内，并且会在发生改变时触发相应的更新; 也可以作为最小化的跨组件状态存储器，用于简单的场景。
