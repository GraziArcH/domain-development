export class InvalidDateValueObjectError extends Error {
  constructor () {
    super('Invalid Date value')
    this.name = 'InvalidDateValueObjectError'
    this.message = 'Invalid Date'
  }
}
