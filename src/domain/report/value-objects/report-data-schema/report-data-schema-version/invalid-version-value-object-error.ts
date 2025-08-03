export class InvalidVersionValueObjectError extends Error {
  constructor () {
    super('Invalid version value')
    this.name = 'InvalidVersionValueObjectError'
  }
}
