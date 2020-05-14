# 队列&栈

## 队列

- 先入先出的数据结构 (`FIFO`)
  - 在 `FIFO` 数据结构中，将首先处理添加到队列中的第一个元素

普通队列实现：

```C++
#include <iostream>
#include <vector>
using namespace std;
class MyQueue {
    private:
        // 存储数据
        vector<int> data;
        // 指向开始位置的指针
        int p_start;
    public:
        MyQueue() {p_start = 0;}
        /** 入队操作，如果操作成功返回真. */
        bool enQueue(int x) {
            data.push_back(x);
            return true;
        }
        /** 出队操作，如果操作成功返回真. */
        bool deQueue() {
            if (isEmpty()) {
                return false;
            }
            p_start++;
            return true;
        };
        /** 返回队首元素. */
        int Front() {
            return data[p_start];
        };
        /** 检查队列是否为空. */
        bool isEmpty()  {
            return p_start >= data.size();
        }
};

int main() {
    MyQueue q; // 初始化队列
    q.enQueue(5); // 5 入队，现在队列是 5
    q.enQueue(3); // 3 入队，现在队列是 5，3
    if (!q.isEmpty()) { // 判断队列是否为空
        // 不为空输出队首元素，也就是 5
        cout << q.Front() << endl;
    }
    q.deQueue(); // 出队操作
    if (!q.isEmpty()) { // 判断队列是否为空
        // 不为空输出队首元素，此时是 3
        cout << q.Front() << endl;
    }
    q.deQueue(); // 出队操作
    if (!q.isEmpty()) { // 判断队列是否为空
        // 不为空输出队首元素，此时队列为空不输出
        cout << q.Front() << endl;
    }
}
```

循环队列：

- 固定大小的数组
- 两个指针分别指向开始和结束位置

循环队列实现：

```JavaScript
/**
 * 初始化循环队列. 参数 length 是队列长度.
 * @param {number} length
 */
var MyCircularQueue = function(length) {
    this.queue = new Array(length);
    this.head=-1;
    this.tail=-1;
    this.length=length;
};

/**
 * 入队. 操作成功返回真.
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
    // 队满操作失败
    if(this.isFull()){
        return false;
    }
    // 空队列，头指针指向 0
    if(this.isEmpty()){
        this.head=0;
    }
    // 其余情况,尾指针向后移动
    this.tail = (this.tail+1)%this.length;
    this.queue[this.tail] = value;
    return true;
};

/**
 * 出队操作，成功返回真.
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
    // 队空操作失败
    if(this.isEmpty())
        return false;
    // 队列只有一个元素，重置头尾指针
    if(this.head===this.tail){
        this.head=-1;
        this.tail=-1;
        return true;
    }
    // 其他情况头指针向后移动
    this.head = (this.head+1)%this.length;
    return true;
};

/**
 * 返回队首元素.队空返回 -1
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
    return this.isEmpty()?-1:this.queue[this.head];
};

/**
 * 返回队尾元素.队空返回 -1
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
    return this.isEmpty()?-1:this.queue[this.tail];
};

/**
 * 检查队列是否为空
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
    return this.head === -1;
};

/**
 * 检查队列是否已满.
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
  return (this.tail+1)%this.length===this.head;
};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
```

### 队列和广度优先搜索

广度优先搜索（`BFS`）的一个常见应用是找出从根节点到目标节点的最短路径

类似层次遍历，越接近根节点越早遍历，也就是在第 `k` 轮添加节点，那么最短路径就是 `k`

模板 ：

```JavaScript
// 返回根节点和目标节点之间的最短路径长度
function BFS(root,targer){
    let queue=[]; // 存储等待处理的节点
    let step=0; // 记录根节点到当前节点的步数
    queue.push(root); // 初始状态根节点入队
    while(queue.length===0){ // 队列不空就不断遍历
        step++;
        let size = queue.length;
        for(var i=0;i<size;++i){
            let cur = queue.shift(); // 需要处理的节点出队
            if(cur == target){ // 如果当前节点就是目标节点就返回
                return step;
            }
            // 如果不是就把当前节点的邻节点入队
            for(var i=0;i<cur.children;++i){
                queue.push(cur.children[i]);
            }
        }
    }
    return -1; // 没有找到目标节点就返回 -1

}
```

参考题目：

- 200. 岛屿数量
- 279. 完全平方数
- 752. 打开转盘锁

## 栈

后入先出（`LIFO`）

在 `LIFO` 数据结构中，将首先处理添加到队列中的最新元素。

参考题目：

- 155. 最小栈
- 20. 有效的括号
- 739. 每日温度
- 150. 逆波兰表达式求值

### 深度优先搜索

深度优先搜索的节点处理顺序和栈一样是后进先出的

模板：

```JavaScript
/**
 * @description: 递归 DFS 伪代码 隐式栈
 * @param cur 当前节点
 * @param target 目标节点
 * @param visited 访问过节点
 * @return: {Boolean}
 */
function DFS(cur, target, visited) {
  if (cur == target) return true;
  // 访问当前节点的邻居节点
  for (node of cur.neighbors) {
    // 如果这个节点没访问过
    if (visited.indexOf(node) < 0) {
      // 访问该节点
      visited.push(node);
      return DFS(node, target, visited);
    }
  }
  return false;
}

/**
 * @description: 迭代 DFS 伪代码 显示栈
 * @param root 根节点
 * @param target 目标节点
 * @return: {Boolean}
 */
function DFS(root, target) {
  let visited = [];
  let stack = [];
  stack.push(root);
  while (stack.length > 0) {
    let cur = stack.pop();
    if (cur == target) return true;
    for (node of cur.neighbors) {
      if (visited.indexOf(node) < 0) {
        visited.push(node);
        stack.push(node);
      }
    }
  }
  return false;
}

```
