/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
var updateBoard = function(board, click) {
  // 八个方向
  const dx = [0, 1, 0, -1, 1, 1, -1, -1];
  const dy = [1, 0, -1, 0, 1, -1, 1, -1];

  // 保存访问记录
  let v = new Array(board.length);
  for (let x = 0; x < board.length; ++x) {
    v[x] = new Array(board[0].length);
  }
  // 广度优先遍历
  function bfs(x, y) {
    let q = [{ x, y }];
    v[x][y] = 1;
    while (q.length) {
      let pos = q.shift();
      let c = 0,
        x = pos.x,
        y = pos.y;
      // 计算周围有几个地雷
      for (let i = 0; i < 8; ++i) {
        let tx = x + dx[i];
        let ty = y + dy[i];
        if (tx < 0 || tx >= board.length || ty < 0 || ty >= board[0].length) {
          continue;
        }
        c += board[tx][ty] == "M";
      }
      if (c > 0) {
        // 规则3
        board[x][y] = c + "";
      } else {
        // 规则2
        board[x][y] = "B";
        for (let i = 0; i < 8; ++i) {
          let tx = x + dx[i];
          let ty = y + dy[i];
          if (
            tx < 0 ||
            tx >= board.length ||
            ty < 0 ||
            ty >= board[0].length ||
            board[tx][ty] != "E" ||
            v[tx][ty]
          ) {
            continue;
          }
          q.push({ x: tx, y: ty });
          v[tx][ty] = 1;
        }
      }
    }
  }
  let [x, y] = click;
  if (board[x][y] == "M") {
    // 规则1
    board[x][y] = "X";
  } else {
    bfs(x, y);
  }
  return board;
};
