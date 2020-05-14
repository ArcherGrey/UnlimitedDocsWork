const commonPath = "./docs/FE_framework/vue";
export const vueIndex = {
  id: "6.1",
  label: "vue",
  children: [
    {
      id: "6.1.1",
      label: "基础",
      children: [
        {
          id: "6.1.1.1",
          label: "计算属性和监听器",
          path: `${commonPath}/computed.md`
        },
        {
          id: "6.1.1.2",
          label: "生命周期",
          path: `${commonPath}/life.md`
        },
        {
          id: "6.1.1.3",
          label: "v-if & v-show",
          path: `${commonPath}/conditional.md`
        }
      ]
    },
    {
      id: "6.1.2",
      label: "可复用性 & 组合",
      children: [
        {
          id: "6.1.2.1",
          label: "过滤器",
          path: `${commonPath}/filter.md`
        }
      ]
    },
    {
      id: "6.1.3",
      label: "API",
      children: [
        {
          label: "6.1.3.1",
          label: "nextTick",
          path: `${commonPath}/nextTick.md`
        }
      ]
    }
  ]
};
