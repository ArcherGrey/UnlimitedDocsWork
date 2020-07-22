# 可调整宽高的 div

## 原理

1. 两个区域一个定高一个撑满剩余
2. 中间有个分割栏
3. 分割栏处按下鼠标进入拉动状态，任意地方放开鼠标结束拉动
4. 进入拉动状态时根据鼠标的坐标修改定高的区域高度
5. 可以设置一个最小高度

[代码](./code/resize.html)