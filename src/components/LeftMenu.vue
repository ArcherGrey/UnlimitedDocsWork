<template>
  <div id="main">
    <el-input placeholder="输入关键字进行搜索" v-model="filterText"> </el-input>
    <el-tree
      class="filter-tree"
      :data="data"
      :filter-node-method="filterNode"
      :props="defaultProps"
      ref="tree"
      @node-click="clickIndex"
    >
    </el-tree>
  </div>
</template>

<script>
import { menu } from "../../utils/menu/index.js";
export default {
  name: "LeftMenu",
  data() {
    return {
      filterText: "", // 查询过滤
      data: menu, // 目录
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    showContentAnime() {
      this.$anime({
        targets: "#content",
        // scale: [
        //   { value: 0.1, easing: "easeOutSine", duration: 100 },
        //   { value: 1, easing: "easeInOutQuad", duration: 1200 }
        // ]
        opacity: [0.1, 1],
        duration: 10000
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    clickIndex(item) {
      if (item.path) {
        this.axios.get(item.path).then(response => {
          this.showContentAnime();
          // 更新 content 内容
          document.getElementById("content").innerHTML = this.$marked(
            response.data
          );

          // 新页面重新拉回顶部
          this.$emit("initScroll");
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#main {
  @media screen and (max-width: 400px) {
    height: 26%;
    width: 90%;
    margin: 10px 0px 0px 0px;
    padding: 10px;
  }
  @media screen and (max-width: 2000px) and (min-width: 800px) {
    width: 26%;
    height: 90%;
    margin: 0 0 0 10px;
    padding: 20px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1.3rem;
  border: 1px solid #e1e4e8;
  .filter-tree {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
  }
}
</style>
