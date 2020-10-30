/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function(grid) {
  let rows = grid.length;
  if (rows === 0) return 0;
  let cols = grid[0].length;
  let findIsland = false;
  let c = 0;
  for (let i = 0; i < rows; ++i) {
    let m = false;
    for (let j = 0; j < cols; ++j) {
      if (grid[i][j]) {
        findIsland = true;
        m = true;
        c += calc([i, j], rows, cols, grid);
      }
    }
    if (findIsland && !m) {
      return c;
    }
  }
  return c;
};

function calc(point, rs, cs, grid) {
  let r = point[0],
    c = point[1];
  let a = 4;

  if (r - 1 >= 0 && grid[r - 1][c] == 1) a--;
  if (r + 1 < rs && grid[r + 1][c] == 1) a--;
  if (c - 1 >= 0 && grid[r][c - 1] == 1) a--;
  if (c + 1 < cs && grid[r][c + 1] == 1) a--;

  return a;
}
