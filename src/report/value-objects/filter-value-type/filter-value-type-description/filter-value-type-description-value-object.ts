import { InvalidFilterValueTypeDescriptionValueObjectError } from './invalid-filter-value-value-object-error'

export class FilterValueTypeDescriptionValueObject {
  private constructor (private readonly description: string) {
    this.description = description
    Object.freeze(this)
  }

  public get value (): string {
    return this.description
  }

  static create (description: string): FilterValueTypeDescriptionValueObject {
    if (!this.validate(description)) throw new InvalidFilterValueTypeDescriptionValueObjectError()

    return new FilterValueTypeDescriptionValueObject(description)
  }

  private static validate (description: string): boolean {
    if (typeof description !== 'string') return false

    if (description.length === 0 || description.length > 50) return false

    return true
  }
}
