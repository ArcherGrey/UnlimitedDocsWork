import { index as indexData } from "./indexData.js";

var Main = {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {},

  data() {
    return {
      filterText: "",
      data: indexData,
      count: 0,
      index: indexData,
      lastIndex: {}
    };
  },
  mounted() {
    this.indexAnime();
  },
  methods: {
    indexAnime() {
      anime({
        targets: ".index",
        scale: [
          { value: 0.1, easing: "easeOutSine", duration: 100 },
          { value: 1, easing: "easeInOutQuad", duration: 500 }
        ],
        delay: anime.stagger(100)
      });
    },
    showContentAnime() {
      anime({
        targets: "#content",
        // scale: [
        //   { value: 0.1, easing: "easeOutSine", duration: 100 },
        //   { value: 1, easing: "easeInOutQuad", duration: 1200 }
        // ]
        opacity: [0.1, 1],
        duration: 10000
      });
    },
    hideContentAnime() {
      anime({
        targets: "#content",
        opacity: [1, 0.1],
        duration: 10000
      });
    },
    clickIndex(item) {
      if (item.path) {
        let context = this;
        axios.get(item.path).then(function (response) {
          context.showContentAnime();
          // 更新 content 内容
          document.getElementById("content").innerHTML = marked(response.data);

          // 新页面重新拉回顶部
          context.$refs.content.scrollTop = 0;
        });
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  }
};
var Ctor = Vue.extend(Main);
new Ctor().$mount("#app");
