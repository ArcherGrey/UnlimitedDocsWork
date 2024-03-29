# 包装对象

> 对于基本类型值而言，本来是不存在属性和方法的，包装对象是为了弥补基本数据类型的非对象特性而产生的。

## 包装对象的理解

包装对象指的是数据类型为 `Number`、`String`、`Boolean` 的值对应的原生对象；
包装对象的意义在于：

- 能够将基本类型值包装成真正的对象，从而体现 `JavaScript` 中一切皆对象的特点
- 是字面量使用对应包装对象的方法的内在原理
- 是进行数据类型转换的利器

### 字面量和包装对象

基本数据类型可以通过字面量的形式创建：

```js
var num = 1;
var str = "hello";
var bool = true;
```

也可以采用对应包装对象的形式创建：

```js
var num = new Number(1);
var str = new String("hello");
var bool = new Boolean(true);
```

两者区别在于一个是基本数据类型，一个是属于对象的引用数据类型。 （也就是 `typeof` 得到的结果一个是基本数据类型一个是对象类型）

包装对象的原理在于每次基本类型字面量在调用包装对象实例的方法时，首先创建对于包装对象的实例，然后在实例上调用该方法，最后销毁该实例：

```js
var str = "hello";
str.split(" ");
//等价于
var str = new String("hello");
str.split(" ");
str = null;
```

所以，对字面量属性进行赋值时都是无效的，因为每次字面量调用完包装对象实例的方法后都会销毁实例。

### Object 和包装对象的关系

`Object` 是一切对象的构造函数，包装对象的实例也是由 `Object` 来构造的：

```js
var num = new Object(1); // 等价于 new Number(1)
var str = new Object("hello"); // 等价于 new String('hello')
var bool = new Object(true); // 等价于 new Boolean(true)
```

`Object` 构造函数根据传入参数的数据类型返回相应的基本包装类型的实例。

## 小结

- 包装对象是三大原始类型数据 Number、String 和 Boolean 对于的原生对象；
- 三大包装对象在 JavaScript 中的作用主要是能将三大基本数据类型也包装成对象，从而体现 JavaScript 一切皆对象的特性；是字面量调用对应实例方法的内在原理；是进行数据类型转换的利器；
- 通过 new+包装对象方法能够创建不同的包装对象实例，调用其 valueOf()方法就可以得到对应的原始类型值；同时也可以通过 Object 对象去构造对应的包装对象；
- 包装对象的使用既可以作为工具方法，起到数据类型转换作用；又可以创建实例，从而实例可以调用部署在对应包装对象原型上的方法；
- valueOf()和 toString()是三大包装对象实例的共有方法，在进行数据类型转换时会派上用场；
