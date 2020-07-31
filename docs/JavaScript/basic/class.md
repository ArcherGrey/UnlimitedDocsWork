# `JavaScript` 中的继承

- [构造函数继承](#构造函数继承)
- [组合继承](#组合继承)
- [原型继承](#原型继承)
- [寄生式继承](#寄生式继承)
- [寄生组合式继承](#寄生组合式继承)

## 构造函数继承

~~(也叫经典继承)~~

基本思想:即在子类型构造函数的内部调用超类型构造函数：

```
function Father(){
	this.colors = ["red","blue","green"];
}
function Son(){
	Father.call(this);//继承了Father,且向父类型传递参数
}
var instance1 = new Son();
instance1.colors.push("black");
console.log(instance1.colors);//"red,blue,green,black"

var instance2 = new Son();
console.log(instance2.colors);//"red,blue,green" 可见引用类型值是独立的
```

解决了原型链的两大问题:

- 保证了原型链中引用类型值的独立,不再被所有实例共享;

- 子类型创建时也能够向父类型传递参数.

存在的问题:

- 方法都在构造函数中定义, 因此函数复用也就不可用了.
- 超类型(如 Father)中定义的方法,对子类型而言也是不可见的.

考虑此,借用构造函数的技术也很少单独使用.

## 组合继承

~~（伪经典继承）~~

指的是将原型链和借用构造函数的技术组合到一块,从而发挥两者之长的一种继承模式.

基本思路: 使用原型链实现对原型属性和方法的继承,通过借用构造函数来实现对实例属性的继承：

```
function Father(name){
	this.name = name;
	this.colors = ["red","blue","green"];
}
Father.prototype.sayName = function(){
	alert(this.name);
};
function Son(name,age){
	Father.call(this,name);//继承实例属性，第一次调用Father()
	this.age = age;
}
Son.prototype = new Father();//继承父类方法,第二次调用Father()
Son.prototype.sayAge = function(){
	alert(this.age);
}
var instance1 = new Son("louis",5);
instance1.colors.push("black");
console.log(instance1.colors);//"red,blue,green,black"
instance1.sayName();//louis
instance1.sayAge();//5

var instance1 = new Son("zhai",10);
console.log(instance1.colors);//"red,blue,green"
instance1.sayName();//zhai
instance1.sayAge();//10
```

组合继承避免了原型链和借用构造函数的缺陷,融合了它们的优点,成为 `JavaScript` 中最常用的继承模式. 而且, `instanceof` 和 `isPrototypeOf( )`也能用于识别基于组合继承创建的对象.
同时我们还注意到组合继承其实调用了两次父类构造函数, 造成了不必要的消耗.

## 原型继承

在`object()`函数内部, 先创建一个临时性的构造函数, 然后将传入的对象作为这个构造函数的原型,最后返回了这个临时类型的一个新实例:

```
function object(o){
	function F(){}
	F.prototype = o;
	return new F();
}
```

从本质上讲, `object()` 对传入其中的对象执行了一次浅复制

原型式继承中, 包含引用类型值的属性始终都会共享相应的值, 就像使用原型模式一样.

## 寄生式继承

寄生式继承的思路与(寄生)构造函数和工厂模式类似, 即创建一个仅用于封装继承过程的函数,该函数在内部以某种方式来增强对象,最后再像真的是它做了所有工作一样返回对象. 如下:

```
function createAnother(original){
	var clone = object(original);//通过调用object函数创建一个新对象
	clone.sayHi = function(){//以某种方式来增强这个对象
		alert("hi");
	};
	return clone;//返回这个对象
}
```

## 寄生组合式继承

组合继承是 `JavaScript` 最常用的继承模式; 不过, 它也有自己的不足. 组合继承最大的问题就是无论什么情况下,都会调用两次父类构造函数

寄生组合式继承就是为了降低调用父类构造函数的开销而出现的:

```
function extend(subClass,superClass){
	var prototype = object(superClass.prototype);//创建对象
	prototype.constructor = subClass;//增强对象
	subClass.prototype = prototype;//指定对象
}
```

寄生组合式继承,集寄生式继承和组合继承的优点于一身,是实现基于类型继承的最有效方法
