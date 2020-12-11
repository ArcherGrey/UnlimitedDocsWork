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
  children: buildItem1([
    ["模板字面量", "模板字面量"],
    ["set 和 map", "set_map"],
    ["各种 for", "for"],
    ["深拷贝和浅拷贝", "copy"],
    ["内存管理", "memmanager"],
    ["作用域和上下文", "context"],
    ["json和jsonp", "json"],
    ["闭包", "closure"],
    ["包装对象", "package"],
    ["call apply bind", "cab"],
    ["继承", "class"],
    ["创建对象", "create"],
    ["== 和 ===", "equal"],
    ["new", "new"],
    ["原型链", "prototype"],
    ["执行机制", "run"],
    ["this", "this"],
    ["类型判断", "typeof"],
    ["变量提升", "hoisting"],
    ["switch", "switch"],
    ["Promise", "Promise"],
    ["变量声明", "declare"]
  ])
};

// 高级
const p2 = bs(2, "adv");
const buildItem2 = buildItemByType(p2);
const esAdvanced = {
  id: p2.id,
  label: "高级",
  children: buildItem2([
    ["函数式编程", "func"],
    ["记忆化", "mem"],
    ["防抖和节流", "debounce"],
    ["设计模式", "design"],
    ["设计模式ts", "design2"],
    ["观察者模式和发布订阅模式", "observer"]
  ])
};

// 应用
const p3 = bs(3, "app");
const buildItem3 = buildItemByType(p3);
const esApp = {
  id: p3.id,
  label: "应用",
  children: buildItem3([["翻转字符串", "reverseStr"]])
};

export const esIndex = [esBasic, esAdvanced, esApp];
