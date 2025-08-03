import { InvalidFilterValueTypeNameValueObjectError } from './invalid-filter-value-type-name-value-object-error'

export class FilterValueTypeNameValueObject {
  private constructor (private readonly name: string) {
    this.name = name
    Object.freeze(this)
  }

  public get value (): string {
    return this.name
  }

  static create (name: string): FilterValueTypeNameValueObject {
    if (!this.validate(name)) throw new InvalidFilterValueTypeNameValueObjectError()

    return new FilterValueTypeNameValueObject(name)
  }

  private static validate (name: string): boolean {
    if (typeof name !== 'string') return false

    if (name.length === 0 || name.length > 30) return false

    return true
  }
}
