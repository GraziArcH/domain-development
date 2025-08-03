import { InvalidNameValueObjectError } from './invalid-name-value-object-error'

export class NameValueObject {
  private constructor (private readonly description: string) {
    this.description = description
    Object.freeze(this)
  }

  public get value (): string {
    return this.description
  }

  static create (description: string): NameValueObject {
    if (!this.validate(description)) throw new InvalidNameValueObjectError()

    return new NameValueObject(description)
  }

  private static validate (description: string): boolean {
    if (typeof description !== 'string') return false

    if (description.length === 0 || description.length > 30) return false

    return true
  }
}
