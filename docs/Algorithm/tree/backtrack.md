# 回溯

递归 + 减枝

1. 全局变量： 保存结果
2. 参数设计： 递归函数的参数，是将上一次操作的合法状态当作下一次操作的初始位置。这里的参数，我理解为两种参数：状态变量和条件变量。

- 状态变量（state）就是最后结果（result）要保存的值
- 条件变量就是决定搜索是否完毕或者合法的值。

3. 完成条件： 完成条件是决定 状态变量和条件变量 在取什么值时可以判定整个搜索流程结束。搜索流程结束有两种含义： 搜索成功并保存结果 和 搜索失败并返回上一次状态。
4. 递归过程： 传递当前状态给下一次递归进行搜索。

模板：

```python
res = []    # 定义全局变量保存最终结果
state = []  # 定义状态变量保存当前状态
p,q,r       # 定义条件变量（一般条件变量就是题目直接给的参数）
def back(状态，条件1，条件2，……):
    if # 不满足合法条件（可以说是剪枝）
        return
    elif # 状态满足最终要求
        res.append(state)   # 加入结果
        return
    # 主要递归过程，一般是带有 循环体 或者 条件体
    for # 满足执行条件
    if  # 满足执行条件
        back(状态，条件1，条件2，……)
back(状态，条件1，条件2，……)
return res
```

使用回溯法的明显标志

1. 排列、组合（子集、幂集、字符全排列）。 在传值时，对于排列问题，是要删掉单个用过的元素；组合问题，是删掉前面所有的元素。
2. 数组、字符串，给定一个特定的规则，尝试搜索迭代找到某个解。
3. 二维数组下的 DFS 搜索（八皇后、黄金矿工、数独）

排列组合

- 解决重复问题，需要先对数组排序然后回溯内部循环剪枝

全排列：

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
  const ans = [];
  // 标记是否访问过
  const vis = new Array(nums.length).fill(false);
  /**
   * @description: 回溯
   * @param {number} idx 下一个加入的在当前排列中的索引位置
   * @param {Array} perm 当前排列
   * @return {type}
   */
  const backtrack = (idx, perm) => {
    // 如果排列加满就加入到结果中
    if (idx === nums.length) {
      ans.push(perm.slice());
      return;
    }
    for (let i = 0; i < nums.length; ++i) {
      // 剪枝
      // 1. 当前索引被访问过
      // 2. !vis[i - 1] 代表重启位置，值和前面的值一样说明要剪枝
      if (vis[i] || (i > 0 && nums[i] === nums[i - 1] && !vis[i - 1])) {
        continue;
      }
      perm.push(nums[i]);
      vis[i] = true;
      backtrack(idx + 1, perm);
      vis[i] = false;
      perm.pop();
    }
  };
  nums.sort((x, y) => x - y);
  backtrack(0, []);
  return ans;
};
```
