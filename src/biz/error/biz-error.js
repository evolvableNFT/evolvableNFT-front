class BizError extends Error {
  constructor(message, code = '999999') {
    super(message)
    this.name = 'BizError'
    this.code = code
  }

  errMsg() {
    return this.code ? `[${this.code}] ${this.message}` : this.message
  }
}

BizError.name = 'BizError'

export default BizError
