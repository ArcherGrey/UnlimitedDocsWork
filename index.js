import { index as indexData } from "./indexData.js";

var Main = {
  watch: {},

  methods: {},

  data() {
    return {
      filterText: "",
      data: indexData,
      count: 0,
      index: indexData,
      lastIndex: {},
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
          { value: 1, easing: "easeInOutQuad", duration: 500 },
        ],
        delay: anime.stagger(100),
      });
    },
    showContentAnime() {
      anime({
        targets: "#content",
        rotate: [
          {
            value: 0,
            duration: 10,
            easing: "easeInOutSine",
          },
          {
            value: 3600,
            duration: 1000,
            easing: "easeInOutSine",
          },
        ],
        scale: [
          { value: 0.1, easing: "easeOutSine", duration: 100 },
          { value: 1, easing: "easeInOutQuad", duration: 1200 },
        ],
      });
    },
    hideContentAnime() {
      anime({
        targets: "#content",
        rotate: [
          {
            value: 0,
            duration: 10,
            easing: "easeInOutSine",
          },
          {
            value: 3600,
            duration: 1000,
            easing: "easeInOutSine",
          },
        ],
        scale: [
          { value: 1, easing: "easeOutSine", duration: 100 },
          { value: 0, easing: "easeInOutQuad", duration: 300 },
        ],
      });
    },
    mouseover(e) {
      anime({
        targets: e.target,
        scale: { value: 1.2, easing: "easeInOutQuad", duration: 1000 },
      });
    },
    mouseleave(e) {
      anime({
        targets: e.target,
        scale: { value: 1, easing: "easeOutSine", duration: 1000 },
      });
    },
    clickIndex(item) {
      if (item.children instanceof Array) {
        this.data = item.children;
        this.lastIndex = item.id;
        setTimeout(() => {
          this.indexAnime();
        }, 100);
      } else if (item.path) {
        this.lastIndex = item.id;
        let context = this;
        axios.get(item.path).then(function (response) {
          document.getElementById("content").innerHTML = marked(response.data);
          console.log(response);
          context.showContentAnime();
          context.data = [];
        });
      }
    },
    backToIndex() {
      this.data = this.index;
      setTimeout(() => {
        this.indexAnime();
      }, 100);
    },
    backToLast() {
      this.hideContentAnime();
      let level = this.lastIndex.split(".");
      switch (level.length) {
        case 1:
          this.data = this.index;
          break;
        case 2:
          this.data = this.index.filter((e) => {
            return e.id == level[0];
          })[0].children;
          break;
        case 3:
          this.data = this.index
            .filter((e) => {
              return e.id == level[0];
            })[0]
            .children.filter((e) => {
              return e.id == level[0] + "." + level[1];
            })[0].children;
      }
      level.pop();
      if (level.length > 1) {
        this.lastIndex = level.join(".");
      } else if (level.length === 0) {
        this.lastIndex = "";
      } else {
        this.lastIndex = level[0];
      }

      setTimeout(() => {
        this.indexAnime();
      }, 100);
    },
  },
};
var Ctor = Vue.extend(Main);
new Ctor().$mount("#app");
