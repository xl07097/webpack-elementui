class MyStorage{

  storage;

  prefix;

  constructor(storage=window.sessionStorage, prefix='note_') {
    this.storage = storage
    this.prefix = prefix
  }

  clear() {
    this.storage.clear()
  }
  
  getItem(key) {
    const value = this.storage.getItem(`${this.prefix}${key}`)
    try {
      return JSON.parse(value).data
    } catch (_e) {
      return null
    }
  }

  removeItem(key) {
    this.storage.removeItem(`${this.prefix}${key}`)
  }

  setItem(key, value) {
    this.storage.setItem(`${this.prefix}${key}`, JSON.stringify({
      data: value,
      time: Date.now()
    }))
  }

}

export default MyStorage

export const storage = new MyStorage()
