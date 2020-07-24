# vue hook

场景：生命周期函数内部，监听移除事件

```JavaScript
// 不使用 hook
mounted(){
  // 绑定事件
  window.addEventListener('resize', this.$_handleResizeChart)
},
beforeDestroy(){
  // 组件销毁
  window.removeEventListener('resize', this.$_handleResizeChart)
}

// 使用 hook
mounted(){
  // 绑定事件
  window.addEventListener('resize', this.$_handleResizeChart)
  // 通过hook监听组件销毁钩子函数，并取消监听事件
  this.$once('hook:beforeDestroy', () => {
    window.removeEventListener('resize', this.$_handleResizeChart)
  })
}
```

场景：父组件想在子组件 `mount` 时触发事件

```
// 不使用 hook
<!-- parent -->
<parent-component>
  <child-component @mounted="handleChildMounted"></child-component>
</parent-component>

// child
export default {
  mounted() {
    this.$emit('mounted')
  }
}

// 使用 hook
<!-- parent -->
<parent-component>
  <child-component @hook:mounted="handleChildMounted">
  </child-component>
</parent-component>
```
