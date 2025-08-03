import { InvalidFilterDescriptionValueObjectError } from './invalid-filter-description-value-object-error'

export class FilterDescriptionValueObject {
  private constructor (private readonly description: string) {
    this.description = description
    Object.freeze(this)
  }

  public get value (): string {
    return this.description
  }

  static create (description: string): FilterDescriptionValueObject {
    if (!this.validate(description)) throw new InvalidFilterDescriptionValueObjectError()

    return new FilterDescriptionValueObject(description)
  }

  private static validate (description: string): boolean {
    if (typeof description !== 'string') return false

    if (description.length === 0 || description.length > 50) return false

    return true
  }
}
