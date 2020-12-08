var splitIntoFibonacci = function(S) {
  const list = new Array().fill(0);
  backtrack(list, S, 0, 0, 0);
  return list;
};

/**
 * @description: 回溯
 * @param {Array} list 当前序列
 * @param {Array} S 原数组
 * @param {*} index 遍历到原数组的位置
 * @param {*} sum 序列最后两个数之和
 * @param {*} prev 序列最后一个值
 * @return {*}
 */
const backtrack = (list, S, index, sum, prev) => {
  // 遍历完原数组，长度大于等于3满足要求
  if (index === S.length) {
    return list.length >= 3;
  }
  let currLong = 0; // 当前拆分出来的值
  for (let i = index; i < S.length; i++) {
    // 开头不能是 0
    if (i > index && S[index] === "0") {
      break;
    }
    currLong = currLong * 10 + S[i].charCodeAt() - "0".charCodeAt();

    // 必须符合32位有符号整数
    if (currLong > Math.pow(2, 31) - 1) {
      break;
    }

    let curr = currLong;
    // 序列长度大于等于2 最后两个之和小于当前值就结束拆分，因为后面的只会越来越大
    if (list.length >= 2) {
      if (curr < sum) {
        continue;
      } else if (curr > sum) {
        break;
      }
    }

    // 都满足条件就加入序列
    list.push(curr);
    // 更新状态继续回溯
    if (backtrack(list, S, i + 1, prev + curr, curr)) {
      return true;
    } else {
      // 不满足条件，还原序列
      list.splice(list.length - 1, 1);
    }
  }
  return false;
};
