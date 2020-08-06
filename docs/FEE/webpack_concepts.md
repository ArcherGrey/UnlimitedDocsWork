# webpack 概念

- [入口](#入口)
  - [简写语法](#简写语法)
  - [对象语法](#对象语法)
  - [常见场景](#常见场景)
- [出口](#出口)
  - [出口用法](#出口用法)
- [loader](#loader)
  - [用法](#用法)
  - [特性](#特性)
- [插件](#插件)
  - [插件用法](#插件用法)
- [模式](#模式)
  - [模式用法](#模式用法)

## 入口

入口指示 `webpack` 使用哪个模块来作为构建内部依赖图的开始

可以通过配置 `entry` 属性来指定一个入口起点(或者多个),默认值是 `./src`

### 简写语法

用法：`entry: string|Array<string>`

例:

```JavaScript
const config = {
  entry: './path/to/my/entry/file.js'
};


// 相当于下面的简写
const config = {
  entry: {
    main: './path/to/my/entry/file.js'
  }
};
```

如果传入数组相当于创建多个主入口,快速配置的时候是不错的选择,但是灵活性不高

### 对象语法

用法：`entry: {[entryChunkName: string]: string|Array<string>}`

例:

```JavaScript
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```

对象语法配置会比较复杂,但是是最可扩展的方式

### 常见场景

1. 分离 应用程序(`app`) 和 第三方(`vendor`)入口

```JavaScript
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```

适用于只有一个入口的单页面应用(`single page application`)

2. 多页面应用程序

```JavaScript
const config = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};
```

> 每个页面只使用一个入口

## 出口

出口(`output`) 告诉 `webpack` 在哪输出创建的 `bundles` 以及如何命名这些文件,默认值为 `./dist`

可以指定多个入口但是只能指定一个出口

### 出口用法

`output` 是一个对象,至少需要设置两个属性:

- `filename` 输出文件的文件名
- `path` 目标输出目录的绝对路径

基本:

```JavaScript
const config = {
  output: {
    filename: 'bundle.js',
    path: '/home/proj/public/assets'
  }
};
```

多个入口起点,应该使用占位符来确保每个文件具有唯一的名称:

```JSON
{
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
}
```

高级进阶:

```JSON
// 使用CDN和资源hash
output: {
  path: "/home/proj/cdn/assets/[hash]",
  publicPath: "http://cdn.example.com/assets/[hash]/"
}
```

在编译时不知道最终输出文件的 `publicPath` 的情况下，`publicPath` 可以留空，并且在入口起点文件运行时动态设置。如果你在编译时不知道 `publicPath`，你可以先忽略它，并且在入口起点设置 `__webpack_public_path__`。

## loader

`loader` 让 `webpack` 可以处理非 `JavaScript` 文件,可以将所有类型文件转换为 `webpack` 可以处理的有效模块,然后利用 `webpack` 进行打包处理

> 注意，`loader` 能够 `import` 导入任何类型的模块（例如 `.css` 文件），这是 `webpack` 特有的功能，其他打包程序或任务执行器的可能并不支持。我们认为这种语言扩展是有很必要的，因为这可以使开发人员创建出更准确的依赖关系图。

在使用 `loader` 之前需要安装对应的 `loader`:

```shell
npm install --save-dev css-loader
npm install --save-dev ts-loader
```

基础的两个属性:

- `test` 正则表达式用于筛选需要 `loader` 进行转换的文件
- `use` 表示在转换时使用哪个 `loader`

```JavaScript
const config = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

```

### 用法

有三种使用方式:

- 配置(推荐) 在 `webpack.config.js` 中指定对应的 `loader`,不但可以减少代码量,而且出现问题可以快速定位

```JavaScript
 module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
```

- 内联 在每个 `import` 语句中显式指定 `loader`,使用 `!` 将资源中的 `loader` 分开。分开的每个部分都相对于当前目录解析

```JavaScript
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

- `CLI` 在 `shell` 命令中指定

```cmd
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```

### 特性

- 支持链式传递,能够对资源使用流水线
- 可以是同步或者异步
- 可以执行任何 `nodejs` 中的操作
- 可以接收查询参数
- 可以使用 `options` 对象进行配置
- 插件可以带来更多特性
- 可以产生额外的任意文件

## 插件

`loader` 用于转换类型,而插件则用于更广的范围

### 插件用法

使用一个插件只需要 `require` 这个插件,然后把 `new` 实例添加到 `plugins` 数组中.多数插件可以通过 `option` 自定义

```JavaScript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

const config = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```

## 模式

提供 `mode` 选项,告诉 `webpack` 使用对应模式的内置优化

### 模式用法

```JavaScript
module.exports = {
  mode: 'production'
};
```

|     选项      |                                                                                                                描述                                                                                                                |
| :-----------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `development` |                                                                    `process.env.NODE_ENV` 设为 `development`。启用 `NamedChunksPlugin` 和 `NamedModulesPlugin`                                                                     |
| `production`  | `process.env.NODE_ENV` 设为 `production`。启用 `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` 和 `UglifyJsPlugin`. |
