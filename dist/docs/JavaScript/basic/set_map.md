# ES6 中的 Set 和 Map 集合

在 ES6 标准制定以前，由于可选的集合类型有限，数组使用的又是数值型索引，因而经常被用于创建队列和栈。如果需要使用非数值型索引，就会用非数组对象创建所需的数据结构，而这就是 Set 集合与 Map 集合的早期实现。本文将详细介绍 ES6 中的 set 和 map 集合

[toc]

## 概述

- `set` 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用
- `Map` 对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值，集合中每个元素分别存放着可访问的键名和它对应的值，经常被用于缓存频繁取用的数据。在标准正式发布以前，开发者们已经在 ES5 中用非数组对象实现了类似的功能

ES6 新标准将 Set 集合与 Map 集合添加到 JS 中

【ES5】

在 ES5 中，开发者们用对象属性来模拟这两种集合

```JavaScript
let set = Object.create(null);
set.foo = true;
// 检查属性的存在性
if (set.foo) {
    // 一些操作
}
```

这里的变量 set 是一个原型为 null 的对象，不继承任何属性。在 ES5 中，开发者们经常用类似的方法检查对象的某个属性值是否存在。　在这个示例中，将 set.foo 赋值为 true，通过 if 语句可以确认该值存在于当前对象中

模拟这两种集合对象的唯一区别是存储的值不同，以下这个示例是用对象模拟 Map 集合

```JavaScript
let map = Object.create(null);
map.foo = "bar";
// 提取一个值
let value = map.foo;
console.log(value); // "bar"
```

这段代码将字符串"bar"储存在 map.foo 中。一般来说，Set 集合常被用于检查对象中是否存在某个键名，而 Map 集合常被用于获取已存的信息

如果程序很简单，确实可以用对象来模拟 Set 集合与 Map 集合，但如果触碰到对象属性的某些限制，那么这个方法就会变得更加复杂。例如，所有对象的属性名必须是字符串类型，必须确保每个键名都是字符串类型且在对象中是唯一的

```JavaScript
let map = Object.create(null);
map[5] = "foo";
console.log(map["5"]); // "foo"
```

本例中将对象的某个属性赋值为字符串"foo"，而这个属性的键名是数值型的 5，它会被自动转换成字符串，所以 map["5"]和 map[5]引用的其实是同一个属性。如果想分别用数字和字符串作为对象属性的键名，则内部的自动转换机制会导致很多问题。当然，用对象作为属性的键名也会遇到类似的问题

```JavaScript
let map = Object.create(null),
key1 = {},
key2 = {};
map[key1] = "foo";
console.log(map[key2]); // "foo"
```

由于对象属性的键名必须是字符串，因而这段代码中的 key1 和 key2 将被转换为对象对应的默认字符串"[object Object]"，所以 map[key2]和 map[key1]引用的是同一个属性。这种错误很难被发现，用不同对象作为对象属性的键名理论上应该指向多个属性，但实际上这种假设却不成立

由于对象会被转换为默认的字符串表达方式，因此其很难用作对象属性的键名

对于 Map 集合来说，如果它的属性值是假值，则在要求使用布尔值的情况下(例如在 if 语句中)会被自动转换成 false。强制转换本身没有问题，但如果考虑这个值的使用场景，就有可能导致错误发生

```JavaScript
let map = Object.create(null);
map.count = 1;
// 是想检查 "count" 属性的存在性，还是想检查非零值？
if (map.count) {
    // ...
}
```

这个示例中有一些模棱两可的地方，比如我们应该怎样使用 map.count？if 语句中，我们是检查 map.count 是否存在，还是检查值是否非零。在示例中，由于 value 的值是 1，为真值，if 语句中的代码将被执行。然而，如果 map.count 的值为 0 或者不存在，if 语句中的代码块将不会被执行

在大型软件应用中，一旦发生此类问题将难以定位及调试，从而促使 ES6 在语言中加入 Set 集合与 Map 集合这两种新特性

当然，在 JS 中有一个 in 运算符，不需要读取对象的值就可以判断属性在对象中是否存在，如果存在就返回 true。但是，in 运算符也会检索对象的原型，只有当对象原型为 null 时使用这个方法才比较稳妥

## Set 集合

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。通过 Set 集合可以快速访问其中的数据，更有效地追踪各种离散值

Set 结构的实例有以下属性

```JavaScript
Set.prototype.constructor：构造函数，默认就是Set函数
Set.prototype.size：返回Set实例的成员总数
```

Set 实例的操作方法（用于操作数据）包括以下 4 个

```JavaScript
add(value)：添加某个值，返回Set结构本身
has(value)：返回一个布尔值，表示该值是否为Set的成员
delete(value)：删除某个值，返回一个布尔值，表示删除是否成功
clear()：清除所有成员，没有返回值
```

【创建 Set 集合、add()添加元素】

调用 new Set()创建 Set 集合，调用 add()方法向集合中添加元素，访问集合的 size 属性可以获取集合中目前的元素数量

```JavaScript
let set = new Set();
set.add(5);
set.add("5");
console.log(set.size); // 2
```

在 Set 集合中，不会对所存值进行强制的类型转换，数字 5 和字符串"5"可以作为两个独立元素存在

```JavaScript
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
for (let i of s) {
  console.log(i);
}
// 2 3 5 4
```

上面代码通过`add`方法向 Set 结构加入成员，结果表明 Set 结构不会添加重复的值。

当然，如果向 Set 集合中添加多个对象，则它们之间彼此保持独立

```JavaScript
let set = new Set(),
    key1 = {},
key2 = {};
set.add(key1);
set.add(key2);
console.log(set.size); // 2
```

由于 key1 和 key2 不会被转换成字符串，因而它们在 Set 集合中是两个独立的元素；如果被转换， 则二者的值都是'[object Object]'

如果多次调用 add()方法并传入相同的值作为参数，那么后续的调用实际上会被忽略

```JavaScript
let set = new Set();
set.add(5);
set.add("5");
set.add(5); // 重复了，该调用被忽略
console.log(set.size); // 2
```

由于第二次传入的数字 5 是一个重复值，因此其不会被添加到集合中，所以控制台最后输出的 Set 集合 size 属性值为 2

可以使用数组来初始化一个 Set ，并且 Set 构造器会确保不重复地使用这些值

```JavaScript
let set = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
console.log(set.size); // 5
```

在这个示例中，我们用一个含重复元素的数组来初始化 Set 集合，数组中有 4 个数字 5，而在生成的集合中只有一个。自动去重的功能对于将已有代码或 JSON 结构转换为 Set 集合执行得非常好

实际上，Set 构造函数可以接受所有可迭代对象作为参数，数组、Set 集合、Map 集合都是可迭代的，因而都可以作为 Set 构造函数的参数使用；构造函数通过迭代器从参数中提取值

【has()检测元素】

通过 has()方法可以检测 Set 集合中是否存在某个值

```JavaScript
let set = new Set();
set.add(5);
set.add("5");
console.log(set.has(5)); // true
console.log(set.has(6)); // false
```

在这段代码中，set 集合里没有数字 6 这个值，所以 set.has(6)调用返回 false

【delete()和 clear()移除元素】

调用 delete()方法可以移除 Set 集合中的某一个元素，调用 clear()方法会移除集合中的所有元素

```JavaScript
let set = new Set();
set.add(5);
set.add("5");
console.log(set.has(5)); // true
set.delete(5);
console.log(set.has(5)); // false
console.log(set.size); // 1
set.clear();
console.log(set.has("5")); // false
console.log(set.size); // 0
```

调用 delete(5)之后，只有数字 5 被移除；执行 clear()方法后，Set 集合中的所有元素都被清除了

【遍历操作】

Set 结构的实例有四个遍历方法，可以用于遍历成员

```JavaScript
keys()：返回键名的遍历器
values()：返回键值的遍历器
entries()：返回键值对的遍历器
forEach()：使用回调函数遍历每个成员
```

**keys()、values()、entries()**

`keys`方法、`values`方法、`entries`方法返回的都是遍历器对象。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以`keys`方法和`values`方法的行为完全一致

```JavaScript
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

上面代码中，`entries`方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组，它的两个成员完全相等

Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的`values`方法

```JavaScript
Set.prototype[Symbol.iterator] === Set.prototype.values// true
```

这意味着，可以省略`values`方法，直接用`for...of`循环遍历 Set

```JavaScript
let set = new Set(['red', 'green', 'blue']);

for (let x of set) {
  console.log(x);
}
// red
// green
// blue
```

**forEach()**

Set 结构的实例的`forEach`方法，用于对每个成员执行某种操作，没有返回值

```JavaScript
let set = new Set(['a','b','c']);
set.forEach((key, value, set) => { console.log(key,value,set);} )
//a a ['a','b','c']
//b b ['a','b','c']
//c c ['a','b','c']
```

上面代码说明，`forEach`方法的参数就是一个处理函数。该函数的参数依次为键值、键名、集合本身

在 Set 集合的 forEach()方法中，第二个参数也与数组的一样，如果需要在回调函数中使用 this 引用，则可以将它作为第二个参数传入 forEach()函数

```JavaScript
let set = new Set([1, 2]);
let processor = {
    output(value) {
        console.log(value);
    },
    process(dataSet) {
        dataSet.forEach(function(value) {
            this.output(value);
        }, this);
    }
};
processor.process(set);
```

以上示例中，processor.process()方法调用了 Set 集合的 forEach()方法并将 this 传入作为回调函数的 this 值，从而 this.output()方法可以正确调用 processor.output()方法。forEach()方法的回调函数只使用了第一个参数 value，所以直接省略了其他参数。在这里也可以使用箭头函数，这样就无须再将 this 作为第二个参数传入回调函数了

```JavaScript
let set = new Set([1, 2]);
let processor = {
    output(value) {
        console.log(value);
    },
    process(dataSet) {
        dataSet.forEach((value) => this.output(value));
    }
};
processor.process(set);
```

在此示例中，箭头函数从外围的 process()函数读取 this 值，所以可以正确地将 this.output()方法解析为一次 processor.output()调用

注意：尽管 Set 集合更适合用来跟踪多个值，而且又可以通过 forEach()方法操作集合中的每一个元素，但是不能像访问数组元素那样直接通过索引访问集合中的元素。如有需要，最好先将 Set 集合转换成一个数组

【将 Set 集合转换为数组】

将数组转换为 Set 集合的过程很简单，只需给 Set 构造函数传入数组即可；将 Set 集合再转回数组的过程同样很简单，需要用到展开运算符(...)，它可以将数组中的元素分解为各自独立的函数参数。展开运算符也可以将诸如 Set 集合的可迭代对象转换为数组

```JavaScript
let set = new Set([1, 2, 3, 3, 3, 4, 5]),
array = [...set];
console.log(array); // [1,2,3,4,5]
```

在这里，用一个含重复元素的数组初始化 Set 集合，集合会自动移除这些重复元素然后再用展开运算符将这些元素放到一个新的数组中。Set 集合依然保留创建时接受的元素(1、2、3、4、5)，新数组中保存着这些元素的副本

如果已经创建过一个数组，想要复制它并创建一个无重复元素的新数组，则上述这个方法就非常有用

```JavaScript
function eliminateDuplicates(items) {
    return [...new Set(items)];
}
let numbers = [1, 2, 3, 3, 3, 4, 5],
noDuplicates = eliminateDuplicates(numbers);
console.log(noDuplicates); // [1,2,3,4,5]
```

在以上函数中，Set 集合仅是用来过滤重复值的临时中介，最后会输出新创建的无重复元素的数组

## WeakSet

将对象存储在 Set 的实例与存储在变量中完全一样，只要 Set 实例中的引用存在，垃圾回收机制就不能释放该对象的内存空间，于是之前提到的 Set 类型可以被看作是一个强引用的 Set 集合

```JavaScript
let set = new Set(),
key = {};
set.add(key);
console.log(set.size); // 1
// 取消原始引用
key = null;
console.log(set.size); // 1
// 重新获得原始引用
key = [...set][0];
```

在这个示例中，将变量 key 设置为 null 时便清除了对初始对象的引用，但是 Set 集合却保留了这个引用，仍然可以使用展开运算符将 Set 集合转换成数组格式并从数组的首个元素取出该引用

大部分情况下这段代码运行良好，但有时候会希望当其他所有引用都不再存在时，让 Set 集合中的这些引用随之消失。举个例子，如果在 Web 页面中通过 JS 代码记录了一些 DOM 元素，这些元素有可能被另一段脚本移除，而又不希望自己的代码保留这些 DOM 元素的最后一个引用

为了解决这个问题，ES6 中引入了另外一个类型：WeakSet 集合(弱引用 Set 集合)

【创建 WeakSet 集合】

用 Weakset 构造函数可以创建 WeakSet 集合，集合支持 3 个方法：add()、has()和 delete()

```JavaScript
let set = new WeakSet(),
key = {};
// 将对象加入 set
set.add(key);
console.log(set.has(key)); // true
set.delete(key);
console.log(set.has(key)); // false
```

WeakSet 集合的使用方式与 Set 集合类似，可以向集合中添加引用，从中移除引用，也可以检査集合中是否存在指定对象的引用。也可以调用 WeakSet 构造函数并传入一个可迭代对象来创建 WeakSet 集合

```JavaScript
let key1 = {},
key2 = {},
set = new WeakSet([key1, key2]);
console.log(set.has(key1)); // true
console.log(set.has(key2)); // true
```

以上示例中，向 WeakSet 构造函数传入一个含有两个对象的数组，最终创建包含这两个对象的 WeakSet 集合

【与 Set 集合的区别】

WeakSet 与 Set 最大的区别是 WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中

```JavaScript
let set = new WeakSet(),
key = {};
set.add(key);
console.log(set.has(key)); // true
// 取消原始引用
key = null;
console.log(set.has(key)); // false
```

由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历

除了以上主要区别之外，它们之间还有下面几个差别

1、在 Weakset 的实例中，如果向 add()、has()和 delete()这 3 个方法传入非对象参数都会导致程序报错

2、WeakSet 集合不可迭代，所以不能被用于 for-of 循环

3、WeakSet 集合不暴露任何迭代器(例如 keys()和 values()方法)，所以无法通过程序本身来检测其中的内容

4、WeakSet 集合不支持 forEach()方法

5、WeakSet 集合不支持 size 属性

WeakSet 集合的功能看似受限，其实这是为了让它能够正确地处理内存中的数据。总之，如果只需要跟踪对象引用，更应该使用 Weak Set 集合而不是普通的 Set 集合

Set 类型可以用来处理列表中的值，但是不适用于处理键值对这样的信息结构。ES6 也添加了 Map 集合来解决类似的问题

## Map 集合

JS 的对象(Object)，本质上是键值对的集合(Hash 结构)，但是传统上只能用字符串当作键。这给它的使用带来了很大的限制

为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是&ldquo;键&rdquo;的范围不限于字符串，各种类型的值(包括对象)都可以当作键。也就是说，Object 结构提供了&ldquo;字符串&mdash;值&rdquo;的对应，Map 结构提供了&ldquo;值&mdash;值&rdquo;的对应，是一种更完善的 Hash 结构实现

ES6 中的 Map 类型是一种储存着许多键值对的有序列表，其中的键名和对应的值支持所有的数据类型。键名的等价性判断是通过调用 Object.is()方法实现的，所以数字 5 与字符串"5"会被判定为两种类型，可以分别作为独立的两个键出现在程序中，这一点与对象不一样，因为对象的属性名总会被强制转换成字符串类型

注意：有一个例外，Map 集合中将+0 和-0 视为相等，与 Object.is()结果不同

如果需要&ldquo;键值对&rdquo;的数据结构，Map 比 Object 更合适

【创建 Map 集合】

如果要向 Map 集合中添加新的元素，可以调用 set()方法并分别传入键名和对应值作为两个参数；如果要从集合中获取信息，可以调用 get()方法

```JavaScript
let map = new Map();
map.set("title", "Understanding ES6");
map.set("year", 2017);
console.log(map.get("title")); // "Understanding ES6"
console.log(map.get("year")); // 2017
```

在这个示例中，两组键值对分别被存入了集合 Map 中，键名"title"对应的值是一个字符串，键名"year"对应的值是一个数字。调用 get()方法可以获得两个键名对应的值。如果调用 get()方法时传入的键名在 Map 集合中不存在，则会返回 undefined

在对象中，无法用对象作为对象属性的键名。但是在 Map 集合中，却可以这样做

```JavaScript
let map = new Map(),
    key1 = {},
    key2 = {};
map.set(key1, 5);
map.set(key2, 42);
console.log(map.get(key1)); // 5
console.log(map.get(key2)); // 42
```

在这段代码中，分别用对象 key1 和 key2 作为两个键名在 Map 集合里存储了不同的值。这些键名不会被强制转换成其他形式，所以这两个对象在集合中是独立存在的，也就是说，以后不再需要修改对象本身就可以为其添加一些附加信息

【Map 集合支持的方法】

在设计语言新标准时，委员会为 Map 集合与 Set 集合设计了如下 3 个通用的方法

1、has(key)检测指定的键名在 Map 集合中是否已经存在

2、delete(key)从 Map 集合中移除指定键名及其对应的值

3、clear()移除 Map 集合中的所有键值对

Map 集合同样支持 size 属性，其代表当前集合中包含的键值对数量

```JavaScript
let map = new Map();
map.set("name", "huochai");
map.set("age", 25);
console.log(map.size); // 2
console.log(map.has("name")); // true
console.log(map.get("name")); // "huochai"
console.log(map.has("age")); // true
console.log(map.get("age")); // 25
map.delete("name");
console.log(map.has("name")); // false
console.log(map.get("name")); // undefined
console.log(map.size); // 1
map.clear();
console.log(map.has("name")); // false
console.log(map.get("name")); // undefined
console.log(map.has("age")); // false
console.log(map.get("age")); // undefined
console.log(map.size); // 0
```

Map 集合的 size 属性与 Set 集合中的 size 属性类似，其值为集合中键值对的数量。在此示例中，首先为 Map 的实例添加"name"和"age"这两个键名；然后调用 has()方法，分别传入两个键名，返回的结果为 true；调用 delete()方法移除"name"，再用 has()方法检测返回 false，且 size 的属性值减少 1；最后调用 clear()方法移除剩余的键值对，调用 has()方法检测全部返回 false，size 属性的值变为 0；clear()方法可以快速清除 Map 集合中的数据，同样，Map 集合也支持批量添加数据

【传入数组来初始化 Map 集合】

可以向 Map 构造函数传入数组来初始化一个 Map 集合，这一点同样与 Set 集合相似。数组中的每个元素都是一个子数组，子数组中包含一个键值对的键名与值两个元素。因此，整个 Map 集合中包含的全是这样的两元素数组

```JavaScript
let map = new Map([["name", "huochai"], ["age", 25]]);
console.log(map.has("name")); // true
console.log(map.get("name")); // "huochai"
console.log(map.has("age")); // true
console.log(map.get("age")); // 25
console.log(map.size); // 2
```

初始化构造函数之后，键名"name"和"age"分别被添加到 Map 集合中。数组包裹数组的模式看起来可能有点儿奇怪，但由于 Map 集合可以接受任意数据类型的键名，为了确保它们在被存储到 Map 集合中之前不会被强制转换为其他数据类型，因而只能将它们放在数组中，因为这是唯一一种可以准确地呈现键名类型的方式

【同名属性碰撞】

Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名

```JavaScript
const map = new Map();

map.set(['a'], 555);
map.get(['a']) // undefined
```

上面代码的`set`和`get`方法，表面是针对同一个键，但实际上这是两个值，内存地址是不一样的，因此`get`方法无法读取该键，返回`undefined`

```JavaScript
const map = new Map();

const k1 = ['a'];
const k2 = ['a'];

map
.set(k1, 111)
.set(k2, 222);

map.get(k1) // 111
map.get(k2) // 222
```

上面代码中，变量`k1`和`k2`的值是一样的，但是它们在 Map 结构中被视为两个键

【遍历】

Map 结构原生提供三个遍历器生成函数和一个遍历方法

```JavaScript
keys()：返回键名的遍历器
values()：返回键值的遍历器
entries()：返回所有成员的遍历器
forEach()：遍历 Map 的所有成员
```

注意：Map 的遍历顺序就是插入顺序

```JavaScript
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
```

上面代码最后的那个例子，表示 Map 结构的默认遍历器接口，就是`entries`方法

```JavaScript
map[Symbol.iterator] === map.entries// true
```

**转为数组**

Map 结构转为数组结构，比较快速的方法是使用扩展运算符（`...`）。

```JavaScript
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
```

结合数组的`map`方法、`filter`方法，可以实现 Map 的遍历和过滤

```JavaScript
const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);
// 产生 Map 结构 {1 => 'a', 2 => 'b'}

const map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
```

**forEach()**

Map 还有一个`forEach`方法，与数组的`forEach`方法类似，也可以实现遍历

```JavaScript
const map = new Map([[1, 'one'],[2, 'two'],[3, 'three']]);
map.forEach((value,key,map)=>{
    //one 1 {1 => "one", 2 => "two", 3 => "three"}
    //two 2 {1 => "one", 2 => "two", 3 => "three"}
    //three 3 {1 => "one", 2 => "two", 3 => "three"}
    console.log(value,key,map);
})
```

注意：遍历过程中，Map 会按照键值对插入 Map 集合的顺序将相应信息传入 forEach()方法的回调函数；而在数组中，会按照数值型索引值的顺序依次传入回调函数

`forEach`方法还可以接受第二个参数，用来绑定`this`

```JavaScript
const reporter = {
  report: function(key, value) {
    console.log("Key: %s, Value: %s", key, value);
  }
};

map.forEach(function(value, key, map) {
  this.report(key, value);
}, reporter);
```

上面代码中，`forEach`方法的回调函数的`this`，就指向`reporter`

## WeakMap

WeakSet 是引用 Set 集合，相对地，WeakMap 是弱引用 Map 集合，也用于存储对象的弱引用

WeakMap 集合中的键名必须是一个对象，如果使用非对象键名会报错；集合中保存的是这些对象的弱引用，如果在弱引用之外不存在其他的强引用，引擎的垃圾回收机制会自动回收这个对象，同时也会移除 WeakMap 集合中的键值对。但是只有集合的键名遵从这个规则，键名对应的值如果是一个对象，则保存的是对象的强引用，不会触发垃圾回收机制

WeakMap 集合最大的用途是保存 Web 页面中的 DOM 元素，例如，一些为 Web 页面打造的 JS 库，会通过自定义的对象保存每一个引用的 DOM 元素

使用这种方法最困难的是，一旦从 Web 页面中移除保存过的 DOM 元素，如何通过库本身将这些对象从集合中清除；否则，可能由于库过于庞大而导致内存泄露，最终程序不再正常执行。如果用 WeakMap 集合来跟踪 DOM 元素，这些库仍然可以通过自定义的对象整合每一个 DOM 元素，而且当 DOM 元素消失时，可以自动销毁集合中的相关对象

【使用 WeakMap 集合】

ES6 中的 Weak Map 类型是一种存储着许多键值对的无序列表，列表的键名必须是非 null 类型的对象，键名对应的值则可以是任意类型。WeakMap 的接口与 Map 非常相似，通过 set()方法添加数据，通过 get()方法获取数据

```JavaScript
let map = new WeakMap(),
    element = document.querySelector(".element");
map.set(element, "Original");
let value = map.get(element);
console.log(value); // "Original"
// 移除元素
element.parentNode.removeChild(element);
element = null;
// 该 Weak Map 在此处为空
```

在这个示例中储存了一个键值对，键名 element 是一个 DOM 元素，其对应的值是一个字符串，将 DOM 元素传入 get()方法即可获取之前存过的值。如果随后从 document 对象中移除 DOM 元素并将引用这个元素的变量设置为 null，那么 WeakMap 集合中的数据也会被同步清除

与 WeakSet 集合相似的是，WeakMap 集合也不支持 size 属性，从而无法验证集合是否为空；同样，由于没有键对应的引用，因而无法通过 get()方法获取到相应的值，WeakMap 集合自动切断了访问这个值的途径，当垃圾回收程序运行时，被这个值占用的内存将会被释放

【WeakMap 集合的初始化方法】

WeakMap 集合的初始化过程与 Map 集合类似，调用 WeakMap 构造函数并传入一个数组容器，容器内包含其他数组，每一个数组由两个元素构成：第一个元素是一个键名，传入的值必须是非 null 的对象；第二个元素是这个键对应的值(可以是任意类型)

```JavaScript
let key1 = {},
    key2 = {},
    map = new WeakMap([[key1, "Hello"], [key2, 42]]);
console.log(map.has(key1)); // true
console.log(map.get(key1)); // "Hello"
console.log(map.has(key2)); // true
console.log(map.get(key2)); // 42
```

对象 key1 和 key2 被当作 WeakMap 集合的键使用，可以通过 get()方法和 has()方法去访问。如果给 WeakMap 构造函数传入的诸多键值对中含有非对象的键，会导致程序抛出错误

【WeakMap 集合支持的方法】

WeakMap 集合只支持两个可以操作键值对的方法：has()方法可以检测给定的键在集合中是否存在；delete()方法可移除指定的键值对。WeakMap 集合与 WeakSet 集合一样，都不支持键名枚举，从而也不支持 clear()方法

```JavaScript
let map = new WeakMap(),
    element = document.querySelector(".element");
map.set(element, "Original");
console.log(map.has(element)); // true
console.log(map.get(element)); // "Original"
map.delete(element);
console.log(map.has(element)); // false
console.log(map.get(element)); // undefined
```

在这段代码中，我们还是用 DOM 元素作为 Weak Map 集合的键名。has()方法可以用于检查 Weak Map 集合中是否存在指定的引用；Weak Map 集合的键名只支持非 null 的对象值；调用 delete()方法可以从 Weak Map 集合中移除指定的键值对，此时如果再调用 has()方法检查这个键名会返回 false，调用 get()方法返回 undefined

【用途】

**储存 DOM 元素**

前面介绍过，WeakMap 应用的典型场合就是 DOM 节点作为键名

```JavaScript
let myElement = document.getElementById('logo');
let myWeakmap = new WeakMap();

myWeakmap.set(myElement, {timesClicked: 0});

myElement.addEventListener('click', function() {
  let logoData = myWeakmap.get(myElement);
  logoData.timesClicked++;
}, false);
```

上面代码中，`myElement`是一个 DOM 节点，每当发生`click`事件，就更新一下状态。我们将这个状态作为键值放在 WeakMap 里，对应的键名就是`myElement`。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险

进一步说，注册监听事件的`listener`对象，就很合适用 WeakMap 实现

```JavaScript
const listener = new WeakMap();

listener.set(element1, handler1);
listener.set(element2, handler2);

element1.addEventListener('click', listener.get(element1), false);
element2.addEventListener('click', listener.get(element2), false);
```

上面代码中，监听函数放在 WeakMap 里面。一旦 DOM 对象消失，跟它绑定的监听函数也会自动消失

**部署私有属性**

WeakMap 的另一个用处是部署私有属性

```JavaScript
function Person(name) {
    this._name = name;
}
Person.prototype.getName = function() {
    return this._name;
};
```

在这段代码中，约定前缀为下划线\_的属性为私有属性，不允许在对象实例外改变这些属性。例如，只能通过 getName()方法读取 this.\_name 属性，不允许改变它的值。然而没有任何标准规定如何写\_name 属性，所以它也有可能在无意间被覆写

在 ES5 中，可以通过以下这种模式创建一个对象接近真正的私有数据

```JavaScript
var Person = (function() {
    var privateData = {},
        privateId = 0;
    function Person(name) {
        Object.defineProperty(this, "_id", { value: privateId++ });
        privateData[this._id] = {
            name: name
        };
    }
    Person.prototype.getName = function() {
        return privateData[this._id].name;
    };
    return Person;
}());
```

在上面的示例中，变量 person 由一个立即调用函数表达式(IIFE)生成，包括两个私有变量 privateData 和 privateld。privateData 对象储存的是每一个实例的私有信息，privateld 则为每个实例生成一个独立 ID。当调用 person 构造函数时，属性\_id 的值会被加 1，这个属性不可枚举、不可配置并且不可写

然后，新的条目会被添加到 privateData 对象中，条目的键名是对象实例的 ID；privateData 对象中储存了所有实例对应的名称。调用 getName()函数，即可通过 this_id 获得当前实例的 ID，并以此从 privateData 对象中提取实例名称。在 IIFE 外无法访问 privateData 对象，即使可以访问 this.\_id，数据实际上也很安全

这种方法最大的问题是，如果不主动管理，由于无法获知对象实例何时被销毁，因此 privateData 中的数据就永远不会消失。而使用 WeakMap 集合可以解决这个问题

```JavaScript
let Person = (function() {
    let privateData = new WeakMap();
    function Person(name) {
        privateData.set(this, { name: name });
    }
    Person.prototype.getName = function() {
        return privateData.get(this).name;
    };
    return Person;
}());
```

经过改进后的 Person 构造函数选用一个 WeakMap 集合来存放私有数据。由于 Person 对象的实例可以直接作为集合的键使用，无须单独维护一套 ID 的体系来跟踪数据。调用 Person 构造函数时，新条目会被添加到 WeakMap 集合中，条目的键是 this，值是对象包含的私有信息。在这个示例中，值是一个包含 name 属性的对象。调用 getName()函数时会将 this 传入 privateData.get()方法作为参数获取私有信息，亦即获取 value 对象并且访问 name 属性。只要对象实例被销毁，相关信息也会被销毁，从而保证了信息的私有性

【使用方式及使用限制】

要在 WeakMap 集合与普通的 Map 集合之间做出选择时，需要考虑的主要问题是，是否只用对象作为集合的键名。如果是，那么 Weak Map 集合是最好的选择。当数据再也不可访问后，集合中存储的相关引用和数据都会被自动回收，这有效地避免了内存泄露的问题，从而优化了内存的使用

相对 Map 集合而言，WeakMap 集合对用户的可见度更低，其不支持通过 forEach()方法、size 属性及 clear()方法来管理集合中的元素。如果非常需要这些特性，那么 Map 集合是一个更好的选择，只是一定要留意内存的使用情况

当然，如果只想使用非对象作为键名，那么普通的 Map 集合是唯一的选择
