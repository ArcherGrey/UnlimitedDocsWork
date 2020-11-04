# Minipack (简易打包器实现)

参考 [minipack](https://github.com/ronami/minipack)

[toc]

## 目录结构

```auto
├─example
│      entry.js
│      message.js
│      name.js
│
└─src
        minipack.js
```

### example 代码

```js
// entry.js
import message from "./message.js";
console.log(message);

// message.js
import { name } from "./name.js";
export default `hello ${name}!`;

// name.js
export const name = "world";
```

### minipack 代码

```js
const fs = require("fs"); // 文件读取
const path = require("path"); // 文件路径
const { parse } = require("@babel/parser"); // 解析代码生成 AST
const transformFromAst = require("@babel/core").transformFromAst; // 将 AST 解析生成代码
const traverse = require("@babel/traverse").default; // 对 AST 进行遍历

let ID = 0;

/**
 * @description: 生成文件依赖信息
 * @param {*} filename 文件的绝对路径
 * @return {*}
 */
function createAsset(filename) {
  /* 读取文件内容 */
  // 字符串形式读取文件内容.
  const content = fs.readFileSync(filename, "utf-8");

  // 现在我们需要搞清楚文件的依赖关系，可以通过寻找文件内容中的 import 字符串，为此我们就需要一个 JavaScript 解析器

  /* 生成 AST */
  // JavaScript 解析器可以帮助我们来理解代码，生成一个抽象的数据结构称为 AST(抽象语法树)

  // 可以在这里看看抽象语法树是什么样子
  // AST Explorer (https://astexplorer.net)
  //
  // 一个 AST 包含了代码中的大量信息，我们可以通过它来了解代码想要做什么
  const ast = parse(content, {
    sourceType: "module"
  });

  // 这个数组用来保存当前模块依赖的其他模块的路径
  const dependencies = [];

  /* 遍历 AST */
  // 遍历 AST 来查询当前模块依赖哪些模块，也就是检查 AST 上每个 import 语句
  traverse(ast, {
    // ES 模块都很简单，因为它们都是静态的，所以看到 import 语句可以直接把值作为依赖
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    }
  });

  // 用 ID 来标识当前模块
  const id = ID++;

  // ES 模块和其他 js 特性可能不是所有浏览器都支持，为了能够在所有浏览器上运行，我们使用 Babel 来转译
  const { code } = transformFromAst(ast, null, {
    presets: ["@babel/preset-env"]
  });

  // 返回该模块的所有信息.
  return {
    id,
    filename,
    dependencies,
    code
  };
}

/**
 * @description: 创建依赖结构图
 * @param {*} entry 入口文件的相对路径
 * @return {*}
 */
function createGraph(entry) {
  // 先解析入口文件的依赖信息.
  const mainAsset = createAsset(entry);

  // 用一个队列来保存所有的依赖信息
  const queue = [mainAsset];

  // 遍历队列
  for (const asset of queue) {
    // 每个 asset 都有一组它依赖模块的相对路径
    // 我们用 createAsset 来迭代解析
    asset.mapping = {};

    // 当前模块的目录.
    const dirname = path.dirname(asset.filename);

    // 迭代访问依赖的相对路径.
    asset.dependencies.forEach(relativePath => {
      // 生成绝对路径
      const absolutePath = path.join(dirname, relativePath);

      // 提取依赖信息.
      const child = createAsset(absolutePath);

      // asset 保存 id 和 相对路径 的映射关系
      asset.mapping[relativePath] = child.id;

      // 加入队列
      queue.push(child);
    });
  }

  // queue 保存的就是当前应用的所有模块的依赖结构图
  return queue;
}

/**
 * @description: 文件打包
 * @param {*} graph 依赖结构图
 * @return {*}
 */
function bundle(graph) {
  let modules = "";

  graph.forEach(mod => {
    // 每个模块用 id 来标识都是数组类型
    // 每个模块有两个值
    // 第一个是用函数包装每个模块的代码，是为了限定每个模块的作用域
    // 第二个是模块的 相对路径和id 的依赖关系
    modules += `${mod.id}: [
      function (require, module, exports) {
        ${mod.code}
      },
      ${JSON.stringify(mod.mapping)},
    ],`;
  });

  // 最后实现自动执行函数的主题
  // 1. 创建 require 函数接收模块 id
  // 2. 通过 id 来获取模块代码和映射关系
  // 3. 根据不同的模块导入方式生成代码
  const result = `
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];

        function localRequire(name) {
          return require(mapping[name]);
        }

        const module = { exports : {} };

        fn(localRequire, module, module.exports);

        return module.exports;
      }

      require(0);
    })({${modules}})
  `;

  // 返回的结果就是打包完成的内容了
  return result;
}

const graph = createGraph("./example/entry.js");
const result = bundle(graph);

console.log(result);

fs.writeFile("dist.js", result, e => {
  if (e) throw e;
  console.log("打包完成");
});
```

### package.json

```json
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@babel/core": "^7.12.3",
    "@babel/generator": "^7.12.1",
    "@babel/parser": "^7.12.3",
    "@babel/preset-env": "^7.12.1",
    "@babel/traverse": "^7.12.1"
  }
}
```

## 使用说明

```shell
# 安装依赖
yarn install

# 执行
node src/minipack.js

# 会在最外层目录下生成 dist.js，执行该文件
node dist.js

# 输出 hello world!
```
