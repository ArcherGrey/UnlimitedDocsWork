export function buildItemByType(parent, type) {
  // 普通类型
  if (!type)
    // return (name, filename) => {
    //   return {
    //     id: `${parent.id}.${name}`,
    //     label: `${name}`,
    //     path: `${parent.path}${filename}.md`
    //   };
    // };
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
    // return (id, name) => {
    //   return {
    //     id: `${parent.id}.${id}`,
    //     label: `${id}. ${name}`,
    //     path: `${parent.path}${id}.md`
    //   };
    // };
    return arr => {
      return arr.map(e => {
        return {
          id: `${parent.id}.${e[0]}`,
          label: `${e[0]}. ${e[1]}`,
          path: `${parent.path}${e[1]}.md`
        };
      });
    };
  }
}

export function buildSubmenu(parent) {
  return (id, path) => {
    return {
      id: `${parent.id}.${id}`,
      path: `${parent.path}${path}/`
    };
  };
}
