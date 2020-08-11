/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];
  let n = board.length;
  if (!n) return;
  let m = board[0].length;
  let q = [];
  // 左右边界
  for (let i = 0; i < n; ++i) {
    if (board[i][0] === "O") q.push([i, 0]);
    if (board[i][m - 1] === "O") q.push([i, m - 1]);
  }
  // 上下边界
  for (let i = 1; i < m - 1; ++i) {
    if (board[0][i] === "O") q.push([0, i]);
    if (board[n - 1][i] === "O") q.push([n - 1, i]);
  }

  // 广度优先遍历
  while (q.length) {
    let x = q[0][0],
      y = q[0][1];
    q.shift();
    // 标记
    board[x][y] = "A";
    for (let i = 0; i < 4; ++i) {
      let mx = x + dx[i],
        my = y + dy[i];
      if (mx < 0 || mx > n - 1 || my < 0 || my > m - 1 || board[mx][my] != "O")
        continue;
      q.push([mx, my]);
    }
  }

  // 遍历矩阵
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < m; ++j) {
      if (board[i][j] === "A") board[i][j] = "O";
      else if (board[i][j] === "O") board[i][j] = "X";
    }
  }
};
