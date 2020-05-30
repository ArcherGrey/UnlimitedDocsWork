# JavaScript

- Array
  - 初始化数组并赋值
    - `[...Array(100)].map(_=>0)`
      - Array(100) 返回的是一个指向 100 个元素数组的指针，所以这里要解构
    - `Array(100).fill(0)`
