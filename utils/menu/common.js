export function leetcodeItem(parent, id, name) {
  return {
    id: `${parent.id}.${id}`,
    label: `${id}. ${name}`,
    path: `${parent.path}${id}.md`
  };
}

export function leetNoteItem(parent, id, name) {
  return {
    id: `${parent.id}${id}`,
    label: `${name}`,
    path: `${parent.path}${name}.md`
  };
}

export function item(parent, name, filename) {
  return {
    id: `${parent.id}.${name}`,
    label: `${name}`,
    path: `${parent.path}${filename}.md`
  };
}
