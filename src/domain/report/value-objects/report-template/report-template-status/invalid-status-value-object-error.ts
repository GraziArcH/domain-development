export class InvalidStatusColumnValueObjectError extends Error {
  constructor () {
    super('Invalid status column value')
    this.name = 'InvalidStatusColumnValueObjectError'
  }
}
