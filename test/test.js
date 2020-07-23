/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, newColor) {
  let m = image.length;
  if (!m) return image;
  let n = image[0].length;
  let color = image[sr][sc];
  if (color == newColor) return image;
  function dfs(r, c) {
    if (image[r][c] == color) {
      image[r][c] = newColor;
      if (r >= 1) dfs(r - 1, c);
      if (r + 1 < m) dfs(r + 1, c);
      if (c >= 1) dfs(r, c - 1);
      if (c + 1 < n) dfs(r, c + 1);
    }
  }
  dfs(sr, sc);
  return image;
};
