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
