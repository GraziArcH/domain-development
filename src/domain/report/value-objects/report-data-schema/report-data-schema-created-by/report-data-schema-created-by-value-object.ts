import { InvalidRDSCreatedByValueObjectError } from './invalid-created-by-value-object-error'

export class RDSCreatedByValueObject {
  private constructor (private readonly createdBy: number) {
    this.createdBy = createdBy
    Object.freeze(this)
  }

  public get value (): number {
    return this.createdBy
  }

  static create (createdBy: number): RDSCreatedByValueObject {
    if (!this.validate(createdBy)) throw new InvalidRDSCreatedByValueObjectError()

    return new RDSCreatedByValueObject(createdBy)
  }

  private static validate (createdBy: number): boolean {
    if (typeof createdBy !== 'number' || !Number.isInteger(createdBy)) return false

    // Additional validation logic can be added here if needed

    return true
  }
}
