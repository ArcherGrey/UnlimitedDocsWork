/**
 * @description: 生成最底层目录
 * @param {object} parent 父目录
 * @param {string} type 类型： 普通类型为空，leetcode为算法类型
 * @return {*}
 */
export function buildItemByType(parent, type) {
  // 普通类型
  if (!type)
    return arr => {
      return arr.map(e => {
        return {
          id: `${parent.id}.${e[0]}`,
          label: `${e[0]}`,
          path: `${parent.path}${e[1]}.md`
        };
      });
    };
  // leetcode 题解
  if (type === "leetcode") {
    return arr => {
      return arr.map(e => {
        return {
          id: `${parent.id}.${e[0]}`,
          label: `${e[0]}. ${e[1]}`,
          path: `${parent.path}${e[0]}.md`
        };
      });
    };
  }
}
/**
 * @description: 生成子目录
 * @param {Object} parent 结构为 {id.path} 的对象
 * @return {*}
 */
export function buildSubmenu(parent) {
  return (id, path) => {
    return {
      id: `${parent.id}.${id}`,
      path: `${parent.path}${path}/`
    };
  };
}
