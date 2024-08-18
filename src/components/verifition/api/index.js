// 获取验证图片  以及token
export function reqGet(data) {
  return fetch('http://localhost:9087/note/captcha/get', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}

// 滑动或者点选验证
export function reqCheck(data) {
  return fetch('http://localhost:9087/note/captcha/check', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}
