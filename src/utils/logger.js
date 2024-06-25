class Logger {
  static log(level, message, error) {
    const timestamp = new Date().toISOString()
    const stack = error ? error.stack : ''
    const formattedMessage = `[${timestamp}] [${level}] ${message} ${stack}`

    switch (level) {
      case 'DEBUG':
        console.debug(formattedMessage)
        break
      case 'INFO':
        console.info(formattedMessage)
        break
      case 'WARN':
        console.warn(formattedMessage)
        break
      case 'ERROR':
      case 'FATAL':
        console.error(formattedMessage)
        break
      default:
        console.log(formattedMessage)
    }
  }

  static debug(message) {
    this.log('DEBUG', message)
  }

  static info(message) {
    this.log('INFO', message)
  }

  static warn(message) {
    this.log('WARN', message)
  }

  static error(message, error) {
    this.log('ERROR', message, error)
  }

  static fatal(message, error) {
    this.log('FATAL', message, error)
  }
}

export default Logger
