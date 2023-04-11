// 多文件选择上传，控制并发
export function uploadFiles(files, options) {
  const { concurrency = 3, ...rest } = options
  const upload = (file) => uploadFile(file, rest)
  const queue = new PQueue({ concurrency })
  files = [...files]
  return Promise.all(files.map((file) => queue.add(() => upload(file))))
}

function PQueue(options) {
  this._queue = []
  this._concurrency = options.concurrency
  this._activeCount = 0
} // 添加任务
PQueue.prototype.add = function (fn) {
  return new Promise((resolve, reject) => {
    this._queue.push({ fn, resolve, reject })
    this._next()
  })
} // 执行任务
PQueue.prototype._next = function () {
  if (this._activeCount >= this._concurrency) return
  const task = this._queue.shift()
  if (!task) return
  this._activeCount++
  task.fn()
    .then((res) => {
      this._activeCount--
      task.resolve(res)
      this._next()
    })
    .catch((err) => {
      this._activeCount--
      task.reject(err)
      this._next()
    })
}

function uploadFile(file, options) {
  const { onProgress, ...rest } = options
  const formData = new FormData()
  formData.append('upfile', file)
  return fetch('http://localhost:3003/upload/alioss', {
    method: 'post',
    body: formData
  }).then((res) => res.json())
}