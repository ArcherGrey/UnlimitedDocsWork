<template>
  <div id="app">
    <left-menu @initScroll="initScroll" @changeContent="changeContent" />
    <right-content ref="right" :content="content" />
  </div>
</template>

<script>
import RightContent from "./components/RightContent.vue";
import LeftMenu from "./components/LeftMenu.vue";

export default {
  name: "App",
  components: {
    RightContent,
    LeftMenu
  },
  data() {
    return {
      content: "# 文档合集"
    };
  },
  mounted() {
    this.indexAnime();
  },
  methods: {
    changeContent(val) {
      this.content = val;
    },
    initScroll() {
      this.$refs.right.backTop();
    },
    indexAnime() {
      this.$anime({
        targets: ".index",
        scale: [
          { value: 0.1, easing: "easeOutSine", duration: 100 },
          { value: 1, easing: "easeInOutQuad", duration: 500 }
        ],
        delay: this.$anime.stagger(100)
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 400px) {
    flex-direction: column;
  }
  @media screen and (max-width: 2000px) and (min-width: 800px) {
    flex-direction: row;
  }

  height: 100%;
}
</style>
