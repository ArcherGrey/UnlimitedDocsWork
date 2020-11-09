# `JavaScript` 中的继承

[toc]

## 原型链继承

```js
function SuperType() {
  this.property = true;
}
SuperType.prototype.showValue = function() {
  console.log(this.property);
};
function SubType(val) {
  this.sub = val;
}
// 子类原型指向父类实例
SubType.prototype = new SuperType();
SubType.prototype.showSub = function() {
  console.log(this.sub);
};
```

问题：

- 引用类型属性被所有实例共享
- 创建子类的实例时，不能像超类构造函数中传递参数

## 构造函数继承

~~(也叫经典继承)~~

基本思想:即在子类型构造函数的内部调用超类型构造函数：

```js
function Father(val) {
  this.colors = ["red", "blue", "green"];
  this.colors.push(val);
}
Father.prototype.count = 1;
Father.prototype.show = function() {
  console.log(this.count);
};
function Son() {
  Father.apply(this, arguments); //继承了Father,且向父类型传递参数
}
var instance1 = new Son("black");

console.log(instance1.colors); //"red,blue,green,black"

var instance2 = new Son();
console.log(instance2.colors); //"red,blue,green" 可见引用类型值是独立的

// 无法访问父类的原型对象上的属性和方法
console.log(instance2.count); // undefined
console.log(instance2.show); // undefined
```

解决了原型链的两大问题:

- 保证了原型链中引用类型值的独立,不再被所有实例共享;
- 子类型创建时也能够向父类型传递参数.

存在的问题:

- 每次创建实例都会在对应实例里创建方法，无法对方法进行复用
- 没有拼接原型链，无法继承原型对象上的属性和方法

考虑此,借用构造函数的技术也很少单独使用.

## 组合继承

~~（伪经典继承）~~

指的是将原型链和借用构造函数的技术组合到一块,从而发挥两者之长的一种继承模式.

基本思路: 使用原型链实现对原型属性和方法的继承,通过借用构造函数来实现对实例属性的继承：

```js
function Father(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
Father.prototype.sayName = function() {
  alert(this.name);
};
function Son(name, age) {
  Father.call(this, name); //继承实例属性，第一次调用Father()
  this.age = age;
}
Son.prototype = new Father(); //继承父类方法,第二次调用Father()
Son.prototype.sayAge = function() {
  alert(this.age);
};
var instance1 = new Son("louis", 5);
instance1.colors.push("black");
console.log(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //louis
instance1.sayAge(); //5

var instance1 = new Son("zhai", 10);
console.log(instance1.colors); //"red,blue,green"
instance1.sayName(); //zhai
instance1.sayAge(); //10
```

组合继承避免了原型链和借用构造函数的缺陷,融合了它们的优点,成为 `JavaScript` 中最常用的继承模式. 而且, `instanceof` 和 `isPrototypeOf( )`也能用于识别基于组合继承创建的对象.
同时我们还注意到组合继承其实调用了两次父类构造函数, 造成了不必要的消耗.

## 原型继承

在`object()`函数内部, 先创建一个临时性的构造函数, 然后将传入的对象作为这个构造函数的原型,最后返回了这个临时类型的一个新实例:

```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

从本质上讲, `object()` 对传入其中的对象执行了一次浅复制

原型式继承中, 包含引用类型值的属性始终都会共享相应的值, 就像使用原型模式一样.

## 寄生式继承

寄生式继承的思路与(寄生)构造函数和工厂模式类似, 即创建一个仅用于封装继承过程的函数,该函数在内部以某种方式来增强对象,最后再像真的是它做了所有工作一样返回对象. 如下:

```js
function createAnother(original) {
  var clone = object(original); //通过调用object函数创建一个新对象
  clone.sayHi = function() {
    //以某种方式来增强这个对象
    alert("hi");
  };
  return clone; //返回这个对象
}
```

## 寄生组合式继承

组合继承是 `JavaScript` 最常用的继承模式; 不过, 它也有自己的不足. 组合继承最大的问题就是无论什么情况下,都会调用两次父类构造函数

寄生组合式继承就是为了降低调用父类构造函数的开销而出现的:

```js
// 借用构造函数 继承父类上私有属性和方法
function subClass() {
  superClass.apply(this, arugments);
}

// 寄生 继承父类上公有的属性和方法
function extend(subClass, superClass) {
  var prototype = object(superClass.prototype); //创建对象
  prototype.constructor = subClass; //增强对象
  subClass.prototype = prototype; //指定对象
}
```

寄生组合式继承,集寄生式继承和组合继承的优点于一身,是实现基于类型继承的最有效方法

## es6 class 继承

`extends` 实现类的继承：

```js
class Person {
  constructor(name) {
    this.name = name;
    this.color = ["red", "blue", "green"];
  }
  sayName() {
    console.log(this.name);
  }
}

class Student extends Person {
  constructor(name, score) {
    super(name);
    this.score = score;
  }
  showScore() {
    alert(this.score);
  }
}

let s1 = new Student("s1", 99);
s1.sayName(); // s1
s1.showScore(); // 99
```

经过 `Babel` 转换成 `es5`:

```js
var Person = /*#__PURE__*/ (function() {
  function Person(name) {
    _classCallCheck(this, Person);

    this.name = name;
    this.color = ["red", "blue", "green"];
  }

  _createClass(Person, [
    {
      key: "sayName",
      value: function sayName() {
        console.log(this.name);
      }
    }
  ]);

  return Person;
})();

var Student = /*#__PURE__*/ (function(_Person) {
  _inherits(Student, _Person);

  var _super = _createSuper(Student);

  function Student(name, score) {
    var _this;

    _classCallCheck(this, Student);

    _this = _super.call(this, name);
    _this.score = score;
    return _this;
  }

  _createClass(Student, [
    {
      key: "showScore",
      value: function showScore() {
        alert(this.score);
      }
    }
  ]);

  return Student;
})(Person);
```

其中 `_inherits`:

```js
function _inherits(subClass, superClass) {
  // extend 的继承目标必须是函数或者是 null
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }

  // 类似于 ES5 的寄生组合式继承，使用 Object.create，设置子类 prototype 属性的 __proto__ 属性指向父类的 prototype 属性
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  // 设置子类的 __proto__ 属性指向父类
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}
```

具体的流程就是：

1. 首先执行 `_inherits(Child, Parent)`，建立 `Child` 和 `Parent` 的原型链关系

- `Object.setPrototypeOf(Child.prototype, Parent.prototype)`
- `Object.setPrototypeOf(Child, Parent)`

2. 然后调用 `Parent.call(this, name)`，根据 `Parent` 构造函数的返回值类型确定子类构造函数 `this` 的初始值 `_this`
3. 最终，根据子类构造函数，修改 `_this` 的值，然后返回该值。
