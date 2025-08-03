import { InvalidFilterValueValueObjectError } from './invalid-filter-value-value-object-error'

export class FilterValueValueObject {
  private constructor (private readonly filterValue: string) {
    this.filterValue = filterValue
    Object.freeze(this)
  }

  public get value (): string {
    return this.filterValue
  }

  static create (filterValue: string): FilterValueValueObject {
    if (!this.validate(filterValue)) throw new InvalidFilterValueValueObjectError()

    return new FilterValueValueObject(filterValue)
  }

  private static validate (filterValue: string): boolean {
    if (typeof filterValue !== 'string') return false

    if (filterValue.length === 0 || filterValue.length > 50) return false

    return true
  }
}
