/**
 * @param {string} senate
 * @return {string}
 */
var predictPartyVictory = function(senate) {
  const n = senate.length;
  // 两个数组分别保存两边的序号
  const radiant = [],
    dire = [];

  for (const [i, ch] of Array.from(senate).entries()) {
    if (ch === "R") {
      radiant.push(i);
    } else {
      dire.push(i);
    }
  }

  // 有一个空队就结束
  while (radiant.length && dire.length) {
    // 序号在前,就更新序号加入到队尾
    if (radiant[0] < dire[0]) {
      radiant.push(radiant[0] + n);
    } else {
      dire.push(dire[0] + n);
    }
    // 出队
    radiant.shift();
    dire.shift();
  }
  return radiant.length ? "Radiant" : "Dire";
};
