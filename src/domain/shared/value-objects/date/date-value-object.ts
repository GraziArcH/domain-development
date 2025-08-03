import { InvalidDateValueObjectError } from './invalid-date-value-object-error'

export class DateValueObject {
  private constructor (private readonly createdAt: Date) {
    this.createdAt = createdAt
    Object.freeze(this)
  }

  public get value (): Date {
    return this.createdAt
  }

  static create (createdAt: Date): DateValueObject {
    if (!this.validate(createdAt)) throw new InvalidDateValueObjectError()

    return new DateValueObject(createdAt)
  }

  private static validate (createdAt: Date): boolean {
    if (!(createdAt instanceof Date) || isNaN(createdAt.getTime())) return false

    return true
  }
}
