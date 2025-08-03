export class InvalidRDSCreatedByValueObjectError extends Error {
  constructor () {
    super('Invalid created_by value')
    this.name = 'InvalidCreatedByValueObjectError'
  }
}
