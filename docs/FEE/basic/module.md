# 模块化

- [服务器端](#服务器端)
- [浏览器端](#浏览器端)
- [ES6 中的模块化](#ES6)

> 模块化是指在解决某一个复杂问题或者一系列问题时，依照一种分类的思维把问题进行系统性的分解加以处理。模块化是一种处理复杂系统分解为代码结构更为合理、可维护性更高的可管理的模块的方式。

重点：

- 信息隐藏：内部的处理过程和具体数据在外部调用时不可见，每个模块只完成独立的功能，提供该功能的结构，模块间通过接口访问
- 内聚度：内聚指的是模块内各个元素的联系程度，最不希望的就是出现偶尔性内聚，也就是没有关系的抽象放在同一模块中，最希望的就是功能性内聚，也就是一个模块提供一系列相互关联的功能。内聚是同一模块内部的实现，是信息隐藏和局部化概念的扩展，标志一个模块内部各个成分之间结合的紧密程度。设计时应尽可能提高模块内聚度，从而获得较高的模块独立性
- 耦合度：强耦合使得系统变得复杂，模块之间难以独立理解、修改。耦合度是指模块之间的关联程度，耦合度取决于模块之间接口的复杂程度，进入或调用模块的位置等。设计模块时，应该尽量追求松散耦合的系统

## 服务器端

### CommonJs

`Commonjs` 作为 `Node` 中模块化规范

特点：

- 原生 `Module` 对象，每个文件都是一个 `Module` 实例
- 文件内通过 `require` 对象引入指定模块
- 所有文件加载均是同步完成
- 通过 `module` 关键字暴露内容
- 每个模块加载一次之后就会被缓存
- 模块编译本质上是沙箱编译
- 由于使用了 `Node` 的 `api`，只能在服务端环境上运行

优点：

- 强大的查找模块功能，开发十分方便
- 标准化的输入输出，非常统一
- 每个文件引入自己的依赖，最终形成文件依赖树
- 模块缓存机制，提高编译效率
- 利用 `node` 实现文件同步读取
- 依靠注入变量的沙箱编译实现模块化

参考：

- [CommonJS 规范](http://javascript.ruanyifeng.com/nodejs/module.html)
- [require()源码解读](http://www.ruanyifeng.com/blog/2015/05/require.html)
- [Node 中的 Module 源码分析](https://segmentfault.com/a/1190000015139548)

## 浏览器端

### AMD 和 RequireJS

`Commonjs` 局限性很明显：基于 `Node` 原生 `api` 在服务端可以实现模块同步加载，但是仅仅局限于服务端，客户端如果同步加载依赖的话时间消耗非常大，所以需要一个在客户端上基于 `Commonjs` 但是对于加载模块做改进的方案，于是 `AMD` 规范诞生了。

`AMD` 是"`Asynchronous Module Definition`"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到所有依赖加载完成之后（前置依赖），这个回调函数才会运行。

`RequireJs` 是 `js` 模块化的工具框架，是 `AMD` 规范的具体实现

特点：

- 依赖前置：动态创建 `<script>` 引入依赖，在 `<script>` 标签的 `onload` 事件监听文件加载完毕；一个模块的回调函数必须得等到所有依赖都加载完毕之后，才可执行，类似 `Promise.all`。
- 配置文件：有一个 `main` 文件，配置不同模块的路径，以及`shim`不满足 `AMD` 规范的 `js` 文件。

### CMD 和 SeaJs

同样是受到 `Commonjs` 的启发，国内（阿里）诞生了一个 `CMD（Common Module Definition）`规范。该规范借鉴了 `Commonjs` 的规范与 `AMD` 规范，在两者基础上做了改进。

特点：

- `define`定义模块，`require`加载模块，`exports`暴露变量。
- 不同于 `AMD` 的依赖前置，`CMD` 推崇依赖就近（需要的时候再加载）
- 推崇 `api` 功能单一，一个模块干一件事。

SeaJs 是 CMD 规范的实现:

- 需要配置模块对应的 `url`
- 入口文件执行之后，根据文件内的依赖关系整理出依赖树，然后通过插入`<script>`标签加载依赖。
- 依赖加载完毕之后，执行根 `factory`
- 在 `factory` 中遇到 `require`，则去执行对应模块的 `factory`，实现就近依赖
- 类似 `Commonjs`，对所有模块进行缓存（模块的 `url` 就是 `id`）。
- 类似 `Commonjs`，可以使用相对路径加载模块。
- 可以向 `RequireJs` 一样前置依赖，但是推崇就近依赖。
- `exports` 和 `return` 都可以暴露变量

## ES6

`ES6` 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量

`ES6` 的模块自动采用严格模式，不管你有没有在模块头部加上"`use strict`"

模块功能主要由两个命令构成：

- `export` 命令用于规定模块的对外接口
- `import` 命令用于输入其他模块提供的功能

### export

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用 `export` 关键字输出该变量。下面使用 `export` 命令输出变量:

```JavaScript
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
```

除了像上面这样，还有另外一种:

```JavaScript
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };
```

应该优先考虑使用这种写法。因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量。

除了输出变量，还可以输出函数或类（`class`）:

```JavaScript
export function multiply(x, y) {
  return x * y;
};
```

通常情况下，`export` 输出的变量就是本来的名字，但是可以使用 `as` 关键字重命名:

```JavaScript
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

需要特别注意的是，`export` 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系:

```JavaScript
// 报错
export 1;

// 报错
var m = 1;
export m;

// 正确写法
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};
```

同样的，`function` 和 `class` 的输出，也必须遵守这样的写法:

```JavaScript
// 报错
function f() {}
export f;

// 正确
export function f() {};

// 正确
function f() {}
export {f};
```

`export` 命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，`import` 命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了 `ES6` 模块的设计初衷

### import

使用 `export` 命令定义了模块的对外接口以后，其他文件就可以通过 `import` 命令加载这个模块:

```JavaScript
// main.js
import { firstName, lastName, year } from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```

`import` 命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（`profile.js`）对外接口的名称相同

如果想为输入的变量重新取一个名字，要使用 as 关键字，将输入的变量重命名:

```JavaScript
import { lastName as surname } from './profile.js';
```

`import` 命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口:

```JavaScript
import {a} from './xxx.js'

a = {}; // Syntax Error : 'a' is read-only;
```

如果 `a` 是一个对象，改写 `a` 的属性是允许的:

```JavaScript
import {a} from './xxx.js'

a.foo = 'hello'; // 合法操作
```

属性可以成功改写，并且其他模块也可以读到改写后的值。不过，这种写法很难查错，建议凡是输入的变量，都当作完全只读，不要轻易改变它的属性。

`from` 指定模块文件的位置，可以是相对路径，也可以是绝对路径，.js 后缀可以省略。如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。

注:`import` 命令具有提升效果，会提升到整个模块的头部，首先执行

由于 `import` 是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构:

```JavaScript
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

除了指定加载某个输出值，还可以使用整体加载，即用星号（`*`）指定一个对象，所有输出值都加载在这个对象上面:

```JavaScript
// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}

// 整体加载
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));

// 不允许运行时改变

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};
```

### export default

使用 `import` 命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。

了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到 `export default` 命令，为模块指定默认输出:

```JavaScript
// export-default.js
export default function () {
  console.log('foo');
}

// 其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。

// import-default.js
import customName from './export-default';
customName(); // 'foo'

// export default命令用在非匿名函数前，也是可以的
function foo() {
  console.log('foo');
}
// foo函数的函数名foo，在模块外部是无效的。加载的时候，视同匿名函数加载
export default foo;
```

`export default` 的本质是将后面的值，赋给 `default` 变量，所以可以直接将一个值写在 `export default` 之后

也可以用来输出类:

```JavaScript
// MyClass.js
export default class { ... }

// main.js
import MyClass from 'MyClass';
let o = new MyClass();
```

### export 与 import 的复合写法

如果在一个模块之中，先输入后输出同一个模块，`import` 语句可以与 `export` 语句写在一起:

```JavaScript
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```
