export default class Updater {

  static uploader(){
    const updater = new Updater()
    console.log(updater)
  }

  constructor(options) {
    this.dispatch = {}
    this.init() //初始化
    // this.timing(options?.timer)//轮询
  }


  async init() {
    // const html = await this.getHtml()
    // this.oldScript = this.parserScript(html)
  }


  //发布订阅通知'no-update' | 'update'
  on(key, fn) {
    this.dispatch[key] = fn
    return this;
  }


  timing(time = 10000) {
    //轮询
    setInterval(async () => {
      const newHtml = await this.getHtml()
      this.newScript = this.parserScript(newHtml)
      this.compare(this.oldScript, this.newScript)
    }, time)
  }

} 