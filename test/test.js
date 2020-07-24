/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function(rooms) {
  const n = rooms.length;
  if (!n) return true;
  let keys = [...rooms[0]];
  let mark = new Array(n);
  mark[0] = 1;

  while (keys.length) {
    let f = false;
    for (let i = 0; i < keys.length; ++i) {
      const key = keys[i];
      if (!mark[key]) {
        f = true;
        keys.splice(i, 1);
        keys = keys.concat(rooms[key]);
        mark[key] = 1;
      }
    }
    if (!f) {
      break;
    }
  }
  for (let i = 0; i < n; ++i) {
    if (!mark[i]) return false;
  }
  return true;
};
