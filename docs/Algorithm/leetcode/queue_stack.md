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
