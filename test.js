/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */

var mincostTickets = function (days, costs) {
  let mem = [];
  let mark = new Set();
  for (date of days) {
    mark.add(date);
  }
  return dp(1, mem, mark, costs);
};

function dp(i, mem, mark, costs) {
  if (i > 365) return 0;
  if (mem[i] != undefined) {
    return mem[i];
  }
  if (mark.has(i)) {
    mem[i] = Math.min(
      Math.min(
        dp(i + 1, mem, mark, costs) + costs[0],
        dp(i + 7, mem, mark, costs) + costs[1]
      ),
      dp(i + 30, mem, mark, costs) + costs[2]
    );
  } else {
    mem[i] = dp(i + 1, mem, mark, costs);
  }
  return mem[i];
}
