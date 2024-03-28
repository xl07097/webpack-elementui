class Queue {
  constructor(options) {
    this._queue = []
    this._concurrency = options.concurrency
    this._activeCount = 0
  }

  add(fn) {
    return new Promise((resolve, reject) => {
      this._queue.push({ fn, resolve, reject })
      this._next()
    })
  }

  _next() {
    if (this._activeCount >= this._concurrency) return
    const task = this._queue.shift()
    if (!task) return
    this._activeCount++
    task
      .fn()
      .then(task.resolve)
      .catch(task.reject)
      .finally(() => {
        this._activeCount--
        this._next()
      })
  }
}

// 控制并发
export default function batchRequest(datas, options = {}) {
  const { concurrency = 3, request } = options
  const queue = new Queue({ concurrency })
  return Promise.all(datas.map((data) => queue.add(() => request(data))))
}
