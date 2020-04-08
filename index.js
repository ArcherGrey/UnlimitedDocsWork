import { index as indexData } from "./indexData.js";

var Main = {
  watch: {},

  methods: {},

  data() {
    return {
      filterText: "",
      data: indexData,
      count: 0,
    };
  },
  mounted() {
    anime({
      targets: ".index",
      translateX: 100,
      scale: [
        { value: 0.1, easing: "easeOutSine", duration: 500 },
        { value: 1, easing: "easeInOutQuad", duration: 1200 },
      ],
      delay: anime.stagger(200, { grid: [14, 5], from: "center" }),
    });
  },
  methods: {
    anime() {
      let x = this.count % 2 === 0 ? 250 : -250;
      this.count++;
      anime({
        targets: ".index",
        translateX: x,
        delay: anime.stagger(100),
      });
    },
  },
};
var Ctor = Vue.extend(Main);
new Ctor().$mount("#main");
