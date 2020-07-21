import { index } from "./index/index.js";
const cubic = value => Math.pow(value, 3);
const easeInOutCubic = value =>
  value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;

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
      data: index, // 目录
      count: 0,
      lastIndex: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      showBackTop: false
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
    },
    onScroll(e) {
      const top = e.target.scrollTop;
      if (top < 300) {
        this.showBackTop = false;
      } else this.showBackTop = true;
    }
  }
};
var Ctor = Vue.extend(Main);
new Ctor().$mount("#app");
