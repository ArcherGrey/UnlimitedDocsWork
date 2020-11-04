# Virtual DOM

真正的 `DOM` 元素非常庞大，而且操作不当就会导致页面重排

相对于 `DOM` 对象，原生的 `JavaScript` 对象处理起来更快更简单，`DOM` 树上的结构、属性信息都可以很容易的用 `JavaScript` 对象表示出来：

```js
var element = {
  tagName: "ul", // 节点标签名
  props: {
    // DOM的属性，用一个对象存储键值对
    id: "list"
  },
  children: [
    // 该节点的子节点
    { tagName: "li", props: { class: "item" }, children: ["Item 1"] },
    { tagName: "li", props: { class: "item" }, children: ["Item 2"] },
    { tagName: "li", props: { class: "item" }, children: ["Item 3"] }
  ]
};
```

上面对应的 HTML 写法是：

```HTML
<ul id='list'>
  <li class='item'>Item 1</li>
  <li class='item'>Item 2</li>
  <li class='item'>Item 3</li>
</ul>
```

那么就可以用 `JavaScript` 对象来构建一个真正的 `DOM` 树

状态改变的时候，记录新树和旧树的差异，然后把差异应用到真正的 `DOM` 树上

这就是所谓的 `Virtual DOM` 算法。包括几个步骤：

1. 用 `JavaScript` 对象结构表示 `DOM` 树结构，然后用这个树构建一个真正的 `DOM` 树，插入到文档中
2. 状态改变的时候，重新构建一个对象树，然后将新树和旧树对比，记录差异
3. 将差异应用到 `步骤1` 构建的真正的 `DOM` 树上，更新视图

本质上 `Virtual DOM` 就是 `JavaScript` 和 `DOM` 之间做了一个缓存

## 实现

1. `JavaScript` 对象模拟 `DOM` 树

`element.js` 记录节点类型、属性、子节点

```js
function Element(tagName, props, children) {
  this.tagName = tagName; // 节点类型
  this.props = props; // 属性
  this.children = children; // 子节点
}

module.exports = function(tagName, props, children) {
  return new Element(tagName, props, children);
};
```

建立一个列表结构可以简单表示：

```js
var el = require("./element");

var ul = el("ul", { id: "list" }, [
  el("li", { class: "item" }, ["Item 1"]),
  el("li", { class: "item" }, ["Item 2"]),
  el("li", { class: "item" }, ["Item 3"])
]);
```

还需要渲染函数来把结构渲染到页面上：

```js
Element.prototype.render = function() {
  var el = document.createElement(this.tagName); // 根据tagName构建
  var props = this.props;

  for (var propName in props) {
    // 设置节点的DOM属性
    var propValue = props[propName];
    el.setAttribute(propName, propValue);
  }

  var children = this.children || [];

  children.forEach(function(child) {
    var childEl =
      child instanceof Element
        ? child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
        : document.createTextNode(child); // 如果字符串，只构建文本节点
    el.appendChild(childEl);
  });

  return el;
};
```

`render` 方法会根据 `tagName` 构建一个真正的 `DOM` 节点，最后只需要加入到文档中：

```js
var ulRoot = ul.render();
document.body.appendChild(ulRoot);
```

这样页面上就有了真正的 `<ul>` 的 `DOM` 结构

2. 比较虚拟 `DOM` 树的差异

这里就是所谓的 `diff` 算法

两颗树的完全 `diff` 算法是一个时间复杂度为 O(n<sup>3</sup>) 的问题

但是在实际情况中很少会越层级移动 `DOM`，所以可以简化为对相同层级进行对比，这样时间复杂度就会降低到 `O(n)`

深度优先遍历，记录差异：

```js
// diff 函数，对比两棵树
function diff (oldTree, newTree) {
  var index = 0 // 当前节点的标志
  var patches = {} // 用来记录每个节点差异的对象
  dfsWalk(oldTree, newTree, index, patches)
  return patches
}

// 对两棵树进行深度优先遍历
function dfsWalk (oldNode, newNode, index, patches) {
  // 对比oldNode和newNode的不同，记录下来
  patches[index] = [...]

  diffChildren(oldNode.children, newNode.children, index, patches)
}

// 遍历子节点
function diffChildren (oldChildren, newChildren, index, patches) {
  var leftNode = null
  var currentNodeIndex = index
  oldChildren.forEach(function (child, i) {
    var newChild = newChildren[i]
    currentNodeIndex = (leftNode && leftNode.count) // 计算节点的标识
      ? currentNodeIndex + leftNode.count + 1
      : currentNodeIndex + 1
    dfsWalk(child, newChild, currentNodeIndex, patches) // 深度遍历子节点
    leftNode = child
  })
}
```

可能带来差异的 `DOM` 操作：

- 替换节点
- 移动刪除新增节点
- 修改节点属性
- 修改节点内容

对应几种差异可以定义相应的差异类型：

```js
var REPLACE = 0;
var REORDER = 1;
var PROPS = 2;
var TEXT = 3;
```

替换节点，直接判断节点类型，记录需要替换的节点就可以：

```js
patches[0] = [
  {
    type: REPALCE,
    node: newNode // el('section', props, children)
  }
];
```

如果是修改属性：

```js
patches[0] = [
  {
    type: REPALCE,
    node: newNode // el('section', props, children)
  },
  {
    type: PROPS,
    props: {
      id: "container"
    }
  }
];
```

如果是修改文本内容：

```js
patches[2] = [
  {
    type: TEXT,
    content: "Virtual DOM2"
  }
];
```

如果是子节点重新排序，按照同层级对比，会全部替换，这样开销就很大，实际上可以通过移动节点实现，这里就涉及到列表对比算法。

获取到某个父节点的子节点的操作，就可以记录下来：

```js
patches[0] = [{
  type: REORDER,
  moves: [{remove or insert}, {remove or insert}, ...]
}]
```

要注意的是，因为 `tagName` 是可重复的，不能用这个来进行对比。所以需要给子节点加上唯一标识 `key`，列表对比的时候，使用 `key` 进行对比，这样才能复用老的 `DOM` 树上的节点。

这样，我们就可以通过深度优先遍历两棵树，每层的节点进行对比，记录下每个节点的差异了。完整 `diff` 算法代码可见 [diff.js](https://github.com/livoras/simple-virtual-dom/blob/master/lib/diff.js)。

3. 将差异应用到真正的 `DOM` 树

因为步骤一所构建的 `JavaScript` 对象树和 `render` 出来真正的 `DOM` 树的信息、结构是一样的。所以我们可以对那棵 `DOM` 树也进行深度优先的遍历，遍历的时候从步骤二生成的 `patches` 对象中找出当前遍历的节点差异，然后进行 `DOM` 操作

```js
function patch(node, patches) {
  var walker = { index: 0 };
  dfsWalk(node, walker, patches);
}

function dfsWalk(node, walker, patches) {
  var currentPatches = patches[walker.index]; // 从patches拿出当前节点的差异

  var len = node.childNodes ? node.childNodes.length : 0;
  for (var i = 0; i < len; i++) {
    // 深度遍历子节点
    var child = node.childNodes[i];
    walker.index++;
    dfsWalk(child, walker, patches);
  }

  if (currentPatches) {
    applyPatches(node, currentPatches); // 对当前节点进行DOM操作
  }
}
```

`applyPatches` ，根据不同类型的差异对当前节点进行 `DOM` 操作：

```js
function applyPatches(node, currentPatches) {
  currentPatches.forEach(function(currentPatch) {
    switch (currentPatch.type) {
      case REPLACE:
        node.parentNode.replaceChild(currentPatch.node.render(), node);
        break;
      case REORDER:
        reorderChildren(node, currentPatch.moves);
        break;
      case PROPS:
        setProps(node, currentPatch.props);
        break;
      case TEXT:
        node.textContent = currentPatch.content;
        break;
      default:
        throw new Error("Unknown patch type " + currentPatch.type);
    }
  });
}
```

完整的可见 [patch.js](https://github.com/livoras/simple-virtual-dom/blob/master/lib/patch.js)

## 总结

`Virtual DOM` 算法主要是实现上面步骤的三个函数：`element，diff，patch`。然后就可以实际的进行使用：

```js
// 1. 构建虚拟DOM
var tree = el("div", { id: "container" }, [
  el("h1", { style: "color: blue" }, ["simple virtal dom"]),
  el("p", ["Hello, virtual-dom"]),
  el("ul", [el("li")])
]);

// 2. 通过虚拟DOM构建真正的DOM
var root = tree.render();
document.body.appendChild(root);

// 3. 生成新的虚拟DOM
var newTree = el("div", { id: "container" }, [
  el("h1", { style: "color: red" }, ["simple virtal dom"]),
  el("p", ["Hello, virtual-dom"]),
  el("ul", [el("li"), el("li")])
]);

// 4. 比较两棵虚拟DOM树的不同
var patches = diff(tree, newTree);

// 5. 在真正的DOM元素上应用变更
patch(root, patches);
```

实际中还需要处理事件监听等；生成虚拟 `DOM` 的时候也可以加入 `JSX` 语法。这些事情都做了的话，就可以构造一个简单的 `ReactJS` 了。
