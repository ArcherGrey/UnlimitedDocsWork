import { item } from "../common.js";
const parent = {
  id: "3.1",
  path: "./docs/JavaScript/basic/"
};
export const javascriptBasic = {
  id: "3.1",
  label: "基础",
  children: [
    item(parent, "模板字面量", "模板字面量"),
    item(parent, "set 和 map", "set_map"),
    item(parent, "各种 for", "for"),
    item(parent, "深拷贝和浅拷贝", "copy"),
    item(parent, "内存管理", "memmanager"),
    item(parent, "作用域和上下文", "context"),
    item(parent, "json和jsonp", "json"),
    item(parent, "闭包", "closure"),
    item(parent, "包装对象", "package"),
    item(parent, "call apply bind", "cab"),
    item(parent, "继承", "class"),
    item(parent, "创建对象", "create"),
    item(parent, "== 和 ===", "equal"),
    item(parent, "new", "new"),
    item(parent, "原型链", "prototype"),
    item(parent, "执行机制", "run"),
    item(parent, "this", "this"),
    item(parent, "类型判断", "typeof")
  ]
};
