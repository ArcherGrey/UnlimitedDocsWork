<template>
  <div class="content-wrap">
    <div id="content" ref="content" @scroll="onScroll">
      <markdown-it-vue :content="content" :options="options" />
    </div>
    <el-button
      type="primary"
      icon="el-icon-top"
      circle
      class="backtop-button"
      @click="backTop"
      v-show="showBackTop"
    ></el-button>
  </div>
</template>

<script>
import MarkdownItVue from "markdown-it-vue";
import "markdown-it-vue/dist/markdown-it-vue.css";
const cubic = value => Math.pow(value, 3);
const easeInOutCubic = value =>
  value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;
export default {
  name: "RightContent",
  components: { MarkdownItVue },
  props: {
    content: { type: String }
  },
  data() {
    return {
      showBackTop: false,
      options: {
        markdownIt: {
          html: true
        },
        linkAttributes: {
          attrs: {
            target: "_self",
            rel: "index"
          }
        }
      }
    };
  },
  methods: {
    onScroll(e) {
      const top = e.target.scrollTop;
      if (top < 300) {
        this.showBackTop = false;
      } else this.showBackTop = true;
    },
    backTop() {
      const el = this.$refs.content;
      const beginTime = Date.now();
      const beginValue = el.scrollTop;
      const rAF =
        window.requestAnimationFrame || (func => setTimeout(func, 16));
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500;
        if (progress < 1) {
          el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
          rAF(frameFunc);
        } else {
          el.scrollTop = 0;
        }
      };
      rAF(frameFunc);
    }
  }
};
</script>

<style lang="scss" scoped>
.content-wrap {
  position: relative;
  flex: 1 1 auto;
  @media screen and (max-width: 400px) {
    height: 66%;
    width: 100%;
  }
  @media screen and (max-width: 2000px) and (min-width: 800px) {
    width: 66%;
    height: 100%;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  #content {
    @media screen and (max-width: 400px) {
      height: 92%;
      width: 90%;
      padding: 10px;
    }
    @media screen and (max-width: 2000px) and (min-width: 800px) {
      width: 92%;
      height: 90%;
      padding: 20px;
    }

    overflow-y: scroll;
    color: #0b0c0b;
    border: 1px solid #e1e4e8;
    background-color: #f1f8ff;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
      sans-serif, Apple Color Emoji, Segoe UI Emoji;
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
  }
  /* 回到顶部样式 */
  .backtop-button {
    position: absolute;
    bottom: 6%;
    right: 5%;
  }
}
</style>
