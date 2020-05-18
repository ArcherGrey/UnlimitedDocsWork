export function item(parent, id, name) {
  return {
    id: `${parent.id}${id}`,
    label: `${id}. ${name}`,
    path: `${parent.path}${id}.md`
  };
}
