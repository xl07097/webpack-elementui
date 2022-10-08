export const deepClone = (target) => {
  let result;
  if (Array.isArray(target)) {
    result = [];
    target.forEach((item) => {
      result.push(deepClone(item));
    });
  } else if (Object.prototype.toString.call(target) === '[object Object]') {
    result = {};
    Object.keys(target).forEach((key) => {
      result[key] = deepClone(target[key]);
    });
  } else {
    result = target;
  }

  return result;
};

export const delay = (ms = 200) => {
  return new Promise((resovle) => setTimeout(resovle, ms))
}

export function timeout(ms = 1000) {
  return new Promise((_, reject) => setTimeout(reject, ms));
}