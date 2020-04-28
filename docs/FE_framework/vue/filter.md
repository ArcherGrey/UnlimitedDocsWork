# 过滤器

## 使用位置

- 双花括号插值 `{{}}`
- `v-bind` 表达式

例子：

```JavaScript
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

## 定义方式

组件选项中定义

```JavaScript
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

---

创建 `vue` 实例之前 全局定义

```JavaScript
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  // ...
})
```

## 特殊

- 全局过滤器和局部顾虑器重名时，会采用局部过滤器
- 可以串联 `{{ message | filterA | filterB }}`， `message` 作为参数传到 `filterA`， `filterA` 的结果作为参数传到 `filterB`
- 可以传递多个参数 `{{ message | filterA('arg1', arg2) }}`， `message` 作为第一个参数， `'arg1'` 作为第二个参数， `arg2` 作为第三个参数
