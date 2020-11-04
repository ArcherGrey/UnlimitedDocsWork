# 深拷贝和浅拷贝（值传递和引用传递）

## 堆和栈

堆：动态分配内存，大小不固定不会自动释放，存取速度较慢

栈：系统自动分配固定大小的内存，由系统自动释放，存取速度快

---

## 基本类型和引用类型

### 基本类型

基本类型（`undefined` | `null` | `boolean` | `Number` | `String`）都是直接按值存储在栈中，每种类型的数据占用的内存空间的大小是确定。

```JavaScript
// 1. 在栈中创建一个变量为a的引用
// 2. 然后查找栈中是否有3这个值，如果没有找到就将3存放进来
// 3. 最后将引用指向3
var a=3;

// 1. 在栈中创建一个变量为b的引用
// 2. 最后将引用指向3
var b=a;

// 1. 搜索栈中是否有4这个值，如果没有将把4存放进来
// 2. b的引用指向4
b=4;
```

存放在栈中的基本类型是可以共享的，但是数据的生存周期是固定的。

### 引用类型

引用类型（对象、数组、函数）值是对象，保存在堆内存中，和基本类型一样也是通过引用来访问存放在堆内存中的值，而引用也是保持在栈中。

如果栈中不存在对堆中某个对象的引用，那么就认为该对象不再需要，在垃圾回收的时候就会清除该对象占用的内存空间。

所有在不需要时应该将对象的引用释放，以便垃圾回收，这样就可以提供程序性能，释放对象的引用最常用的方法就是赋值为`null`。

## 浅拷贝

引用对象的变量保存的值就是引用的地址，所以一个引用对象赋值给另一个引用对象的时候实际上是传递的是一个引用的地址，两个变量都会指向一个相同的引用对象，这就叫浅拷贝。（引用对象作为参数传入函数中都是传入引用，只有通过深拷贝或者重新生成一个对象才能避免对传入引用的修改）

对其中任何一个对象进行修改都会导致另一个对象的修改。

只拷贝对象的第一层属性：

```js
var shallowCopy = function(obj) {
  // 只拷贝对象
  if (typeof obj !== "object") return;
  // 根据obj的类型判断是新建一个数组还是对象
  var newObj = obj instanceof Array ? [] : {};
  // 遍历obj，并且判断是obj的属性才拷贝
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};
```

## 深拷贝

如果不希望两个对象之间有关联，那就需要使用深拷贝。

可以通过递归来解决这个问题，把父对象中所有属于对象的属性类型都遍历赋给子对象既可。

如果是对象就递归：

```js
// 只能拷贝数组或者对象
var deepCopy = function(obj) {
  if (typeof obj !== "object") return;
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
};
```

## 数组深拷贝

- `for` 循环赋值
- `concat`

```js
var a1 = [1, 2, 3];
var a2 = a1.concat();
```

- `slice`

```js
var a1 = [1, 2, 3];
var a2 = a1.slice(0);
```

- 扩展运算符

```js
var a1 = [1, 2, 3];
var [...a2] = a1;
```

- `Object.assign`

```js
var a = { x: 1 };
var b = Object.assign({}, a);
```

## 除了函数之外的深拷贝

`json`:

```js
var a = { x: { x: 1 } };
var b = JSON.parse(JSON.stringify(a));
```

## 性能问题

深拷贝使用递归，性能不如浅拷贝，具体使用要根据实际情况进行选择。
