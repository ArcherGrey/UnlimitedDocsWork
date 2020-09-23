/* ECMAScript */

import { buildItemByType, buildSubmenu } from "./common.js";
const parent = {
  id: "3",
  path: "./docs/JavaScript/"
};
const bs = buildSubmenu(parent);

// 基础
const p1 = bs(1, "basic");
const buildItem1 = buildItemByType(p1);
const esBasic = {
  id: p1.id,
  label: "基础",
  children: [
    buildItem1("模板字面量", "模板字面量"),
    buildItem1("set 和 map", "set_map"),
    buildItem1("各种 for", "for"),
    buildItem1("深拷贝和浅拷贝", "copy"),
    buildItem1("内存管理", "memmanager"),
    buildItem1("作用域和上下文", "context"),
    buildItem1("json和jsonp", "json"),
    buildItem1("闭包", "closure"),
    buildItem1("包装对象", "package"),
    buildItem1("call apply bind", "cab"),
    buildItem1("继承", "class"),
    buildItem1("创建对象", "create"),
    buildItem1("== 和 ===", "equal"),
    buildItem1("new", "new"),
    buildItem1("原型链", "prototype"),
    buildItem1("执行机制", "run"),
    buildItem1("this", "this"),
    buildItem1("类型判断", "typeof"),
    buildItem1("变量提升", "hoisting"),
    buildItem1("switch", "switch")
  ]
};

// 高级
const p2 = bs(2, "adv");
const buildItem2 = buildItemByType(p2);
const esAdvanced = {
  id: p2.id,
  label: "高级",
  children: [
    buildItem2("函数式编程", "func"),
    buildItem2("记忆化", "mem"),
    buildItem2("防抖和节流", "debounce"),
    buildItem2("设计模式", "design"),
    buildItem2("观察者模式和发布订阅模式", "observer")
  ]
};

export const esIndex = [esBasic, esAdvanced];
