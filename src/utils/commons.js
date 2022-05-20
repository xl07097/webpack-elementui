export const deepClone = (target) => {
  let result;
  if (Array.isArray(target)) {
    result = [];
    target.forEach((item) => {
      result.push(deepClone(item));
    });
  } else if (Object.prototype.toString.call(target) === '[object Object]') {
    target = {};
    Object.keys(target).forEach((key) => {
      target[key] = deepClone(target[key]);
    });
  } else {
    result = target;
  }

  return result;
};

class Quene {
  value = null;
  _head = '';
}
