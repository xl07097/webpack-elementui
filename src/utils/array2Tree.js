export const array2Tree = (data) => {
  const tmpMap = {};
  const tree = [];
  const key = 'id';
  const parentKey = 'pid';
  const childKey = 'children';

  data.forEach((item) => {
    tmpMap[item[key]] = item;
  });

  data.forEach((item) => {
    if (tmpMap[item[parentKey]] && item[key] !== item[parentKey]) {
      if (!tmpMap[item[parentKey]][childKey]) tmpMap[item[parentKey]][childKey] = [];
      tmpMap[item[parentKey]][childKey].push(item);
    } else {
      tree.push(item);
    }
  });

  return tree;
};

export const tree2Array = (tree) => {
  const list = []
  const stack = [...tree]
  while (stack.length) {
    const node = stack.shift()
    list.push({
      ...node,
      children: [],
    })
    if (node.children && node.children.length) {
      stack.push(...node.children)
    }
  }
  return list
};