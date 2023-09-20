function Queue(options) {
  this._queue = []
  this._concurrency = options.concurrency
  this._activeCount = 0
}

// 添加任务
Queue.prototype.add = function add(fn) {
  return new Promise((resolve, reject) => {
    this._queue.push({ fn, resolve, reject })
    this._next()
  })
}

// 执行任务
Queue.prototype._next = function _next() {
  if (this._activeCount >= this._concurrency) return
  const task = this._queue.shift()
  if (!task) return
  this._activeCount++
  task
    .fn()
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

// 控制并发
export default function batchRequest(datas, options = {}) {
  const { concurrency = 3, request } = options
  const handle = (data) => request(data)
  const queue = new Queue({ concurrency })
  return Promise.all(datas.map((data) => queue.add(() => handle(data))))
}

