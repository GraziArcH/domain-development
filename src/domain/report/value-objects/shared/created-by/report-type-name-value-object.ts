import { InvalidCreatedByValueObjectError } from './invalid-report-type-name-value-object-error'

export class CreatedByValueObject {
  private constructor (private readonly createdBy: string) {
    this.createdBy = createdBy
    Object.freeze(this)
  }

  public get value (): string {
    return this.createdBy
  }

  static create (createdBy: string): CreatedByValueObject {
    if (!this.validate(createdBy)) throw new InvalidCreatedByValueObjectError()

    return new CreatedByValueObject(createdBy)
  }

  private static validate (createdBy: string): boolean {
    if (typeof createdBy !== 'string') return false

    if (createdBy.length === 0 || createdBy.length > 50) return false

    return true
  }
}
