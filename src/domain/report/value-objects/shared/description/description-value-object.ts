import { InvalidDescriptionValueObjectError } from './invalid-description-value-object-error'

export class DescriptionValueObject {
  private constructor (private readonly description: string) {
    this.description = description
    Object.freeze(this)
  }

  public get value (): string {
    return this.description
  }

  static create (description: string): DescriptionValueObject {
    if (!this.validate(description)) throw new InvalidDescriptionValueObjectError()

    return new DescriptionValueObject(description)
  }

  private static validate (description: string): boolean {
    if (typeof description !== 'string') return false

    if (description.length === 0 || description.length > 50) return false

    return true
  }
}
