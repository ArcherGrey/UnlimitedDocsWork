# `javascript` 分号结尾的问题

并不是 `全部加分号` 或者 `全部不加分号` 的问题，而是什么时候可以加，什么时候必须加，什么时候可以不加

---

## 分号的作用

- 语句（表达式）的分隔
- 语句的结尾

但是分号并不一定是语句的结尾：

```
function add(){
    var a=1;
    return
        a;
}
```

上面返回值是 `undefined` 而不是 `1`，因为 `return` 后面有换行符，相当于：

```
function add(){
    var a=1;
    return;
    a;
}
```

由于 `ECMAScript` 的自动插入分号（`ASI`）标准，在语句或者一段代码后，加了回车，解析器会在执行期间自动帮你插入分号。

---

## `ASI` 例外情况

下面情况是在使用回车或换行，但是不会自动插入分号作结尾：

- 当一行语句是没关闭的情况，例如数组、对象之类：

```
// example 1
var a =
[1,
2,
3,
]

// example 2
function test(a,
b,
c){
    console.log(a,b,c
    )
}
```

- 这一行是 `++` 或 `--`:

```
a=1
++
console.log(a)
```

- 这一行是 `for while do if else` 但没有用花括号：

```
if(...)
 console.log(...)
else
 console.log(...)
```

- 下一行开头是 `[ ( + * / - , .` 或者二进制运算符 `~ & |` 可以与这行组成一个表达式：

```
function test(){
    return 1
          +2
          -3
}
```

- 空白语句：

```
var i=1

// 这之间不管有多少换行都不会自动插入分号

if(i==2)
```

---

## 一定要使用分号的情况

分号不只是语句结尾使用，在某些语法中，具有分隔表达式或语句的作用：

- `for` 中的表达式之间：

```
for(var i=0;i<10;i++)
```

- 同一行使用多个表达式：

```
// example 1
var i=0; i++

// example 2
case 'foo': dosomething(); break
```

- 以 `[ (` 开头的行，这是一种特殊的风格，用来防止解析器或者压缩工具误认为某行和上面几行在一起解析，造成代码执行结果错误，还有 `IIFE`（立即执行函数表达式）这种情况 ：

```
// example 1
;(x||y).doSomething()
;[a,b,c].forEach(doSomething)

// example 2
var x = 2
;(function(){})()
```

---

## 不需要使用分号的情况

- `for` 最后一个表达式：

```
for(var i=0;i<12;i++;){}
```

- 花括号后面，赋值时可以加：

```
// 不建议加
function a(){};
if(){};

// 可以加
var obj = {a:1};
var foo = function(){};
do{...} while{...};
```

- 在 `if for while switch` 的圆括号后面：

```
if(a==1);{console.log(a)}

// 相当于
if(a==1);
console.log(a);
```

## 总结

是否使用分号作为语句结尾，在按照上面规则的情况下，可以根据个人习惯或者团队风格。

~~`npm bootstrap` 还有比较火的开源应用都不使用分号~~
