export class InvalidJtdColumnValueObjectError extends Error {
  constructor () {
    super('Invalid JTD column value')
    this.name = 'InvalidJtdColumnValueObjectError'
  }
}
