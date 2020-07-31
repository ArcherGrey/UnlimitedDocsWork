# 创建对象

- [工厂模式](#工厂模式)
- [构造函数模式](#构造函数模式)
- [原型模式](#原型模式)
- [组合构造函数和原型模式](#组合构造函数和原型模式)
- [动态原型模式](#动态原型模式)
- [寄生构造函数模式](#寄生构造函数模式)
- [稳妥构造模式](#稳妥构造模式)

## 工厂模式

```JavaScript
function createPerson() {
  var o = new Object();
  o.name = 'hanmeimei';
  o.say = function() {
    alert(this.name);
  }
  return o;
}
var person1 = createPerson();
```

特点：

- 解决了创建多个相似对象的问题

问题：

- 无法识别对象的类型

## 构造函数模式

```JavaScript
function Person() {
  this.name = 'hanmeimei';
  this.say = function() {
    alert(this.name)
  }
}
var person1 = new Person();
```

特点：

- 没有显示创建对象
- 直接将属性和方法赋值给 `this`
- 没有 `return`
- 可以识别为特定类型

问题：

- 每个方法在实例上都要重新创建，造成内存浪费

## 原型模式

```JavaScript
function Person() {}
Person.prototype.name = 'hanmeimei';
Person.prototype.say = function() {
  alert(this.name);
}
Person.prototype.friends = ['lilei'];
var person1 = new Person();
```

特点：

- 方法不会重新创建

问题：

- 所有属性都是共享

## 组合构造函数和原型模式

```JavaScript
function Person(name) {
  this.name = name
  this.friends = ['lilei']
}
Person.prototype.say = function() {
  console.log(this.name)
}
var person1 = new Person('hanmeimei')
person1.say() //hanmeimei
```

特点：

- 结合构造函数和原型模式的长处
- 最常用的方式

## 动态原型模式

```JavaScript
function Person(name) {
  this.name = name
  if(typeof this.say != 'function') {
    Person.prototype.say = function(
    alert(this.name)
  }
}
```

特点：

- 完美

问题：

- 不能使用对象字面量重写原型，如果在已经创建了实例的情况下重写原型，那么就会切断现有的实例与新原型之间的联系。

## 寄生构造函数模式

```JavaScript
function Person(name) {
  var o = new Object()
  o.name = name
  o.say = function() {
    alert(this.name)
  }
  return o
}
var peron1 = new Person('hanmeimei')

```

和工厂模式一样，不过可以区分类型

## 稳妥构造模式

```JavaScript
function Person(name) {
  var o = new Object()
  o.say = function() {
    alert(name)
  }
}
var person1 = new Person('hanmeimei');
person1.name  // undefined
person1.say() //hanmeimei
```

适合在一些安全环境中，或者在防止数据被其他应用程序改动时使用

注意：与寄生构造函数模式类似，使用稳妥构造函数模式创建的对象与构造函数之间没有什么关系，因此`instanceof`操作符对这种对象也没有意义。
