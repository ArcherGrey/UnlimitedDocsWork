# 深拷贝

## 数组深拷贝

- `for` 循环赋值
- `concat`

```JavaScript
var a1=[1,2,3];
var a2=a1.concat();
```

- `slice`

```JavaScript
var a1=[1,2,3];
var a2=a1.slice(0)
```

- 扩展运算符

```JavaScript
var a1=[1,2,3];
var [...a2]=a1
```
