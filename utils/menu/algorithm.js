/* 算法 */
import { buildItemByType, buildSubmenu } from "./common.js";

const parent = {
  id: "10",
  path: "./docs/Algorithm/"
};
const bs = buildSubmenu(parent);

// leetcode 题解
const p1 = bs(1, "leetcode");
const buildItem1 = buildItemByType(p1, "leetcode");
const leetcode = {
  id: p1.id,
  label: "leetcode题解",
  children: [
    buildItem1(1, "两数之和"),
    buildItem1(3, "无重复字符的最长子串"),
    buildItem1(5, "最长回文子串"),
    buildItem1(7, "整数反转"),
    buildItem1(9, "回文数"),
    buildItem1(13, "罗马数字转整数"),
    buildItem1(14, "最长公共前缀"),
    buildItem1(15, "三数之和"),
    buildItem1(16, "最接近的三数之和"),
    buildItem1(17, "电话号码的字母组合"),
    buildItem1(20, "有效的括号"),
    buildItem1(21, "合并两个有序链表"),
    buildItem1(24, "两两交换链表中的节点"),
    buildItem1(26, "删除排序数组中的重复项"),
    buildItem1(27, "移除元素"),
    buildItem1(28, "实现 strStr()"),
    buildItem1(33, "搜索旋转排序数组"),
    buildItem1(35, "搜索插入位置"),
    buildItem1(36, "有效的数独"),
    buildItem1(37, "解数独"),
    buildItem1(39, "组合总和"),
    buildItem1(40, "组合总和 II"),
    buildItem1(41, "缺失的第一个正数"),
    buildItem1(43, "字符串相乘"),
    buildItem1(44, "通配符匹配"),
    buildItem1(47, "全排列 II"),
    buildItem1(49, "字母异位词分组"),
    buildItem1(50, "Pow(x,n)"),
    buildItem1(53, "最大子序和"),
    buildItem1(64, "最小路径和"),
    buildItem1(66, "加一"),
    buildItem1(67, "二进制求和"),
    buildItem1(69, "x 的平方根"),
    buildItem1(70, "爬楼梯"),
    buildItem1(76, "最小覆盖子串"),
    buildItem1(77, "组合"),
    buildItem1(84, "柱状图中最大的矩形"),
    buildItem1(88, "合并两个有序数组"),
    buildItem1(94, "二叉树中序遍历"),
    buildItem1(95, "不同的二叉搜索树 II"),
    buildItem1(96, "不同的二叉搜索树"),
    buildItem1(100, "相同的树"),
    buildItem1(101, "对称二叉树"),
    buildItem1(102, "二叉树的层序遍历"),
    buildItem1(104, "二叉树的最大深度"),
    buildItem1(105, "从前序与中序遍历序列构造二叉树"),
    buildItem1(106, "从中序与后序遍历序列构造二叉树"),
    buildItem1(107, "二叉树的层次遍历 II"),
    buildItem1(108, "将有序数组转换为二叉搜索树"),
    buildItem1(109, "有序链表转换二叉搜索树"),
    buildItem1(110, "平衡二叉树"),
    buildItem1(111, "二叉树的最小深度"),
    buildItem1(112, "路径总和"),
    buildItem1(114, "二叉树展开为链表"),
    buildItem1(116, "填充每个节点的下一个右侧节点指针"),
    buildItem1(117, "填充每个节点的下一个右侧节点指针 II"),
    buildItem1(118, "杨辉三角"),
    buildItem1(119, "杨辉三角 II"),
    buildItem1(120, "三角形最小路径和"),
    buildItem1(121, "买卖股票的最佳时机"),
    buildItem1(122, "买卖股票的最佳时机 II"),
    buildItem1(125, "验证回文串"),
    buildItem1(130, "被围绕的区域"),
    buildItem1(133, "克隆图"),
    buildItem1(136, "只出现一次的数字"),
    buildItem1(141, "环形链表"),
    buildItem1(144, "二叉树的前序遍历"),
    buildItem1(145, "二叉树的后序遍历"),
    buildItem1(146, "LRU 缓存机制"),
    buildItem1(150, "逆波兰表达式求值"),
    buildItem1(152, "乘积最大子数组"),
    buildItem1(155, "最小栈"),
    buildItem1(159, "至多包含两个不同字符的最长子串"),
    buildItem1(167, "两数之和 II - 输入有序数组"),
    buildItem1(169, "多数元素"),
    buildItem1(170, "两数之和 III - 数据结构设计"),
    buildItem1(189, "旋转数组"),
    buildItem1(198, "打家劫舍"),
    buildItem1(200, "岛屿数量"),
    buildItem1(202, "快乐数"),
    buildItem1(205, "同构字符串"),
    buildItem1(206, "反转链表"),
    buildItem1(207, "课程表"),
    buildItem1(209, "长度最小的子数组"),
    buildItem1(213, "打家劫舍 II"),
    buildItem1(215, "数组中的第 K 个最大元素"),
    buildItem1(216, "组合总和 III"),
    buildItem1(217, "存在重复元素"),
    buildItem1(219, "存在重复元素 II"),
    buildItem1(221, "最大正方形"),
    buildItem1(226, "翻转二叉树"),
    buildItem1(234, "回文链表"),
    buildItem1(235, "二叉搜索树的最近公共祖先"),
    buildItem1(236, "二叉树的最近公共祖先"),
    buildItem1(238, "除自身以外数组的乘积"),
    buildItem1(243, "最短单词距离"),
    buildItem1(249, "移位字符串分组"),
    buildItem1(256, "粉刷房子"),
    buildItem1(257, "二叉树的所有路径"),
    buildItem1(268, "缺失数字"),
    buildItem1(270, "最接近的二叉搜索树值"),
    buildItem1(276, "栅栏涂色"),
    buildItem1(279, "完全平方数"),
    buildItem1(283, "移动零"),
    buildItem1(287, "寻找重复数"),
    buildItem1(288, "单词的唯一缩写"),
    buildItem1(297, "二叉树的序列化与反序列化"),
    buildItem1(300, "最长上升子序列"),
    buildItem1(303, "区域和检索 - 数组不可变"),
    buildItem1(309, "最佳买卖股票时机含冷冻期"),
    buildItem1(311, "稀疏矩阵的乘法"),
    buildItem1(332, "重新安排行程"),
    buildItem1(336, "回文对"),
    buildItem1(337, "打家劫舍 III"),
    buildItem1(343, "整数拆分"),
    buildItem1(347, "前 K 个高频元素"),
    buildItem1(349, "两个数组的交集"),
    buildItem1(350, "两个数组的交集 II"),
    buildItem1(354, "俄罗斯套娃信封问题"),
    buildItem1(368, "最大整除子集"),
    buildItem1(378, "有序矩阵中第K小的元素"),
    buildItem1(380, "常数时间插入、删除和获取随机元素"),
    buildItem1(392, "判断子序列"),
    buildItem1(394, "字符串解码"),
    buildItem1(401, "二进制手表"),
    buildItem1(404, "左叶子之和"),
    buildItem1(413, "等差数列划分"),
    buildItem1(414, "第三大的数"),
    buildItem1(415, "字符串相加"),
    buildItem1(424, "替换后的最长重复字符"),
    buildItem1(437, "路径总和 III"),
    buildItem1(448, "找到所有数组中消失的数字"),
    buildItem1(454, "四数相加 II"),
    buildItem1(459, "重复的子字符串"),
    buildItem1(471, "编码最短长度的字符串"),
    buildItem1(485, "最大连续1的个数"),
    buildItem1(486, "预测赢家"),
    buildItem1(491, "递增子序列"),
    buildItem1(494, "目标和"),
    buildItem1(501, "二叉搜索树中的众数"),
    buildItem1(509, "斐波那契数"),
    buildItem1(529, "扫雷游戏"),
    buildItem1(530, "二叉搜索树的最小绝对差"),
    buildItem1(532, "数组中的 K-diff 数对"),
    buildItem1(538, "把二叉搜索树转换为累加树"),
    buildItem1(542, "01 矩阵"),
    buildItem1(560, "和为k的子数组"),
    buildItem1(561, "数组拆分 I"),
    buildItem1(566, "重塑矩阵"),
    buildItem1(572, "另一个树的子树"),
    buildItem1(581, "最短无序连续子数组"),
    buildItem1(599, "两个列表的最小索引总和"),
    buildItem1(605, "种花问题"),
    buildItem1(617, "合并二叉树"),
    buildItem1(624, "数组列表中的最大距离"),
    buildItem1(628, "三个数的最大乘积"),
    buildItem1(637, "二叉树的层平均值"),
    buildItem1(647, "回文子串"),
    buildItem1(652, "寻找重复的子树"),
    buildItem1(657, "机器人能否返回原点"),
    buildItem1(673, "最长递增子序列的个数"),
    buildItem1(680, "验证回文字符串 Ⅱ"),
    buildItem1(687, "最长同值路径"),
    buildItem1(696, "计数二进制子串"),
    buildItem1(701, "二叉搜索树中的插入操作"),
    buildItem1(705, "设计哈希集合"),
    buildItem1(706, "设计哈希映射"),
    buildItem1(718, "最长重复子数组"),
    buildItem1(725, "打开转盘锁"),
    buildItem1(733, "图像渲染"),
    buildItem1(739, "每日温度"),
    buildItem1(740, "删除与获得点数"),
    buildItem1(771, "宝石与石头"),
    buildItem1(779, "第K个语法符号"),
    buildItem1(783, "二叉搜索树节点最小距离"),
    buildItem1(785, "判断二分图"),
    buildItem1(821, "新21点"),
    buildItem1(841, "钥匙和房间"),
    buildItem1(844, "比较含退格的字符串"),
    buildItem1(873, "最长的斐波那契子序列的长度"),
    buildItem1(918, "环形子数组的最大和"),
    buildItem1(925, "长按键入"),
    buildItem1(974, "和可被 K 整除的子数组"),
    buildItem1(977, "有序数组的平方"),
    buildItem1(983, "最低票价"),
    buildItem1(990, "等式方程的可满足性"),
    buildItem1(1002, "查找常用字符"),
    buildItem1(1004, "最大连续1的个数 III"),
    buildItem1(1014, "最佳观光组合"),
    buildItem1(1025, "除数博弈"),
    buildItem1(1027, "最长等差数列"),
    buildItem1(1028, "从先序遍历还原二叉树"),
    buildItem1(1055, "形成字符串的最短路径"),
    buildItem1(1095, "山脉数组中查找目标值"),
    buildItem1(1371, "每个元音包含偶数次的最长子字符串"),
    buildItem1(1388, "3n 块披萨"),
    buildItem1(1431, "拥有最多糖果的孩子"),
    buildItem1("i29", "顺时针打印矩阵"),
    buildItem1("i46", "把数字翻译成字符串"),
    buildItem1("i51", "数组中的逆序对"),
    buildItem1("i56", "I. 数组中数字出现的次数"),
    buildItem1("i64", "求 1+2+…+n")
  ]
};

// leetcode 探索
const p2 = bs(2, "leetcode_Class");
const buildItem2 = buildItemByType(p2);
const book = {
  id: p2.id,
  label: "leetcode 探索",
  children: [
    buildItem2("队列&栈", "queue_stack"),
    buildItem2("哈希表", "hash"),
    buildItem2("递归", "recursion"),
    buildItem2("动态规划", "dynamic")
  ]
};

// 图
const p3 = bs(3, "graph");
const buildItem3 = buildItemByType(p3);
const graph = {
  id: p3.id,
  label: "图",
  children: [buildItem3("欧拉图", "euler")]
};

// 排序
const p4 = bs(4, "sort");
const buildItem4 = buildItemByType(p4);
const sort = {
  id: p4.id,
  label: "排序查找",
  children: [buildItem4("二分查找", "bs"), buildItem4("快速排序", "quick")]
};

// 字符串
const p5 = bs(5, "string");
const buildItem5 = buildItemByType(p5);
const string = {
  id: p5.id,
  label: "字符串",
  children: [buildItem5("kmp", "kmp")]
};

// 树
const p6 = bs(6, "tree");
const buildItem6 = buildItemByType(p6);
const tree = {
  id: p6.id,
  label: "树",
  children: [
    buildItem6("二叉树遍历", "btTravers"),
    buildItem6("二叉树常见问题", "btQs"),
    buildItem6("回溯", "backtrack")
  ]
};

export const algorithmIndex = [leetcode, book, graph, sort, string, tree];
