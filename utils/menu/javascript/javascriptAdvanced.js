import { item } from "../common.js";
const parent = {
  id: "3.2",
  path: "./docs/JavaScript/adv/"
};
export const javascriptAdvanced = {
  id: "3.2",
  label: "高级",
  children: [
    item(parent, "函数式编程", "func"),
    item(parent, "记忆化", "mem"),
    item(parent, "防抖和节流", "debounce"),
    item(parent, "设计模式", "design"),
    item(parent, "观察者模式和发布订阅模式", "observer")
  ]
};
