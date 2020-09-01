# 哈希表

[toc]

## 概览

`哈希表` 是一种使用 `哈希函数` 组织数据，以支持快速插入和搜索的数据结构。

有两种不同类型的哈希表：

- `哈希集合` 是 `集合` 的实现方式之一，用于存储 非重复值。
- `哈希映射` 是 `映射` 的实现之一，用于存储 `(key, value)` 键值对。

在 标准模板库 的帮助下，哈希表是 易于使用的。大多数常见语言（`如 Java，C ++ 和 Python`）都支持哈希集合和哈希映射。

通过选择合适的哈希函数，哈希表可以在插入和搜索方面展现出出色的性能。

## 设计哈希表

哈希表的原理是借助 `哈希函数`，将键映射到存储桶地址：

- 要有一定长度具有连续物理地址的桶数组
- 当我们插入一个新的键时，哈希函数将决定该键应该分配到哪个桶中，并将该键存储在相应的桶中
- 当我们想要搜索一个键时，哈希表将使用相同的哈希函数来查找对应的桶，并只在特定的桶中进行搜索

### 负载因子

又叫填装因子，是哈希表的一个重要参数，它反映了哈希表的装满程度

实际利用桶的个数 与 桶的总数 的比值，称为负载因子

### 问题

1. 哈希函数

哈希函数是哈希表中最重要的组件，用于将键映射到特定的桶

一个好的哈希函数应该具备下面特点：

- 哈希函数的键与桶的对应关系具有确定性。也就是说，对于 `key` 所映射的桶地址，只由 `key` 键本身决定，而不由其他因素决定；
- 哈希函数不应太过复杂。太过于复杂的哈希函数将导致计算桶地址不能快速完成，从而无法快速定位桶
- 映射结果的分布应具有均匀性。对于特定的桶空间，我们应尽量保证数据经过哈希函数映射之后，能够均匀地分布在桶的整个地址空间中

理想情况下，完美的哈希函数将是键和桶之间的一对一映射。然而，在大多数情况下，完美的哈希函数并不多见。一般来讲，结果分布越随机，越均匀的哈希函数，它的性能越好。一方面，如果分布过于集中在某些桶中，会加剧这些桶发生冲突的概率；另一方面，剩余的桶由于没有得到有效利用导致空间利用率较低

2. 冲突解决

一般情况下，哈希函数会起到压缩键的地址空间的作用，设键的地址空间为 `S`，桶的地址空间为 `T`，则有 `S≫T`。

为了避免哈希冲突，有下面几种方法：

- 线性试探法 属于开放定址法的一种，除此之外，开放定址法还包括二次探测法、双重哈希法等

所谓线性试探法，就是在插入键的时候，如果发现桶单元已经被占用，就向下线性寻找，直到找到可以使用的空桶，经过 `i` 次试探之后，桶单元应该是：

```auto
bucket[(hash(key) + i)mod M]
```

在**查找**某个键的时候，会先通过哈希函数计算出桶的地址，然后比较值是否为该键，如果不是就继续向下查找，如果查询到末尾就会从头开始查找

在**刪除**某个键的时候，为了避免查找过程中出现信息丢失，会将刪除位置标记为 `delete`，再查找时遇到 `delete` 会继续向下查找而不会中断

- 链地址法：解决冲突的另一种方法就是将桶内产生冲突的键串联成一个链表

- 再哈希法：即发生冲突时，通过使用另一个哈希函数来避免冲突，同时也有一些问题：
  - 和线性试探法相比会消耗更多时间
  - 刪除会使得问题变得复杂
- 公共溢出区法：建立另一个哈希表作为公共溢出区，发生冲突就保存在该哈希表中

## 实现

哈希集合：

```C++
#define MAX_LEN 100000          // 初始化桶的数量

class MyHashSet {
private:
    vector<int> set[MAX_LEN];   // 使用数组实现哈希集合

    /** 返回对应的桶的索引 */
    int getIndex(int key) {
        return key % MAX_LEN;
    }

    /** 在特定的桶中搜索键，如果该键不存在则返回 -1 */
    int getPos(int key, int index) {
        // 每个桶中包含一个列表，遍历所有桶中的元素来寻找特定的键
        for (int i = 0; i < set[index].size(); ++i) {
            if (set[index][i] == key) {
                return i;
            }
        }
        return -1;
    }
public:

    MyHashSet() {

    }

    void add(int key) {
        int index = getIndex(key);
        int pos = getPos(key, index);
        if (pos < 0) {
            // 如果键不存在，则添加
            set[index].push_back(key);
        }
    }

    void remove(int key) {
        int index = getIndex(key);
        int pos = getPos(key, index);
        if (pos >= 0) {
            // 如果键存在，则删除
            set[index].erase(set[index].begin() + pos);
        }
    }

    bool contains(int key) {
        int index = getIndex(key);
        int pos = getPos(key, index);
        return pos >= 0;
    }
};

```

哈希映射：

```C++
#define MAX_LEN 100000            // 初始化桶的数量

class MyHashMap {
private:
    vector<pair<int, int>> map[MAX_LEN];       // 使用数组实现哈希集合

    /** 返回指定桶的索引 */
    int getIndex(int key) {
        return key % MAX_LEN;
    }

    /** 在桶中搜索键，如果不存在则返回 -1 */
    int getPos(int key, int index) {
        // 每个桶包含一个数组，遍历桶中的所有元素来查找指定的 key
        for (int i = 0; i < map[index].size(); ++i) {
            if (map[index][i].first == key) {
                return i;
            }
        }
        return -1;
    }

public:
    MyHashMap() {

    }

    /** value 始终为正 */
    void put(int key, int value) {
        int index = getIndex(key);
        int pos = getPos(key, index);
        if (pos < 0) {
            map[index].push_back(make_pair(key, value));
        } else {
            map[index][pos].second = value;
        }
    }

    /** 如果存在映射关系，则返回 value，否则返回 -1 */
    int get(int key) {
        int index = getIndex(key);
        int pos = getPos(key, index);
        if (pos < 0) {
            return -1;
        } else {
            return map[index][pos].second;
        }
    }

    /** 如果存在 key 的映射，则删除该映射关系 */
    void remove(int key) {
        int index = getIndex(key);
        int pos = getPos(key, index);
        if (pos >= 0) {
            map[index].erase(map[index].begin() + pos);
        }
    }
};


```

插入和搜索的平均时间复杂度为 `O(1)`，空间复杂度为 `O(n)`

## 哈希集合应用

### 存在重复元素

给定一个整数数组，判断是否存在重复元素。

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
  // 利用哈希集合保存访问过的键
  let s = new Set();
  for (let i = 0; i < nums.length; ++i) {
    if (s.has(nums[i])) return true;
    s.add(nums[i]);
  }
  return false;
};
```

### 只出现一次的数字

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  let s = new Set();
  for (let i = 0; i < nums.length; ++i) {
    // 除了一个每个都出现了两次
    // 那就先加入再刪除
    // 最后剩下的就是所求
    if (!s.has(nums[i])) s.add(nums[i]);
    else s.delete(nums[i]);
  }
  for (let x of s) {
    return x;
  }
};
```

### 两个数组的交集

给定两个数组，编写一个函数来计算它们的交集。

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  // 用两个数组初始化哈希集合
  let s1 = new Set(nums1);
  let s2 = new Set(nums2);
  // 遍历其中一个哈希集合，查看另一个中是否存在
  for (let x of s1) {
    if (!s2.has(x)) s1.delete(x);
  }
  return [...s1];
};
```

## 哈希映射应用

### 两数之和

给定一个整数数组 `nums`  和一个目标值 `target`，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  // 哈希映射保存 {target-cur:index}
  let m = new Map();
  for (let i = 0; i < nums.length; ++i) {
    let cur = nums[i];
    if (m.has(cur)) return [m.get(cur), i];
    m.set(target - cur, i);
  }
};
```

### 同构字符串

给定两个字符串  `s`  和  `t`，判断它们是否是同构的。

如果  `s`  中的字符可以被替换得到  `t` ，那么这两个字符串是同构的。

所有出现的字符都必须用另一个字符替换，同时保留字符的顺序。两个字符不能映射到同一个字符上，但字符可以映射自己本身。

```auto
示例 1:

输入: s = "egg", t = "add"
输出: true

示例 2:

输入: s = "foo", t = "bar"
输出: false
```

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
  // 两个哈希映射分别保存两个字符串对应的映射
  // 结果为真 a->b b->a
  // 所以两个映射都应该满足条件
  let m1 = new Map();
  let m2 = new Map();
  // 题目已经假设长度一样
  for (let i = 0; i < s.length; ++i) {
    if (!m1.has(s[i])) {
      m1.set(s[i], t[i]);
    } else {
      if (m1.get(s[i]) != t[i]) return false;
    }
    if (!m2.has(t[i])) {
      m2.set(t[i], s[i]);
    } else {
      if (m2.get(t[i]) != s[i]) return false;
    }
  }
  return true;
};
```

### 两个列表的最小索引总和

假设 `Andy` 和 `Doris` 想在晚餐时选择一家餐厅，并且他们都有一个表示最喜爱餐厅的列表，每个餐厅的名字用字符串表示。

你需要帮助他们用最少的索引和找出他们共同喜爱的餐厅。 如果答案不止一个，则输出所有答案并且不考虑顺序。 你可以假设总是存在一个答案。

```auto
示例 1:

输入:
["Shogun", "Tapioca Express", "Burger King", "KFC"]
["Piatti", "The Grill at Torrey Pines", "Hungry Hunter Steakhouse", "Shogun"]
输出: ["Shogun"]
解释: 他们唯一共同喜爱的餐厅是“Shogun”。
```

```js
/**
 * @param {string[]} list1
 * @param {string[]} list2
 * @return {string[]}
 */
var findRestaurant = function(list1, list2) {
  // 哈希映射保存餐厅的索引
  // 遍历第一个初始哈希映射
  // 遍历第二个如果有相同的更新结果

  let m = new Map();
  let max = list2.length + list1.length,
    ans = [];
  for (let i = 0; i < list1.length; ++i) {
    m.set(list1[i], i);
  }
  for (let i = 0; i < list2.length; ++i) {
    if (m.has(list2[i])) {
      // 如果存在相同的且索引值小于当前的
      // 替换结果 替换当前值
      if (max > m.get(list2[i]) + i) {
        max = m.get(list2[i]) + i;
        ans = [list2[i]];
      } else if (max == m.get(list2[i]) + i) {
        // 如果相等就加入结果数组
        ans.push(list2[i]);
      }
    }
  }
  return ans;
};
```

## 滑动窗口 + 哈希表

- 219
- 424
- 1004
- 159

1. 窗口更新条件
2. 判断窗口是否满足要求

遍历窗口右侧扩展,然后判断是否满足条件,缩小左侧

## 设计键

- 当字符串 / 数组中每个元素的顺序不重要时，可以使用 **排序后的字符串 / 数组** 作为键。
- 如果只关心每个值的偏移量，通常是第一个值的偏移量，则可以使用偏移量作为键。
- 在树的题目中，可以直接使用 `TreeNode` 作为键。但在大多数情况下，可以将 子树的序列化结果 作为键。
- 在矩阵中，你可能会使用 行索引 或 列索引 作为键。
- 如果需要将矩阵分块，可以将行索引和列索引进行组合以标识该元素属于哪个 块。
- 有时，在矩阵中，你可能会希望将对角线的元素组合在一起。
