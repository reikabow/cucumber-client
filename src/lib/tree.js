
// Rows is a list of node objects with an id, name, and parent id
export function buildTree(categories) {
  let rows = categories.map(({ id, name }) => ({ id, name }))
  let root = rows.find(e => e.name === 'ROOT');
  if (!root) {
    throw new Error("bad tree: no root");
  }

  // Appends all children of node id to a list in node id called children
  const helper = (node) => {
    let children = categories.filter(e => e.parent_id === node.id).map(({ id, name }) => ({ id, name }));
    if (!children.length) {
      return;
    }
    node.children = children;
    for (let ch of node.children) {
      helper(ch);
    }

  }

  helper(root);
  return root;
}
