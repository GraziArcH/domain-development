import { InvalidSpotTypeDescriptionValueObjectError } from './invalid-spot-type-description-value-object-error'

export class SpotTypeDescriptionValueObject {
  private constructor (private readonly description: string) {
    this.description = description
    Object.freeze(this)
  }

  public get value (): string {
    return this.description
  }

  static create (description: string): SpotTypeDescriptionValueObject {
    if (!this.validate(description)) throw new InvalidSpotTypeDescriptionValueObjectError()

    return new SpotTypeDescriptionValueObject(description)
  }

  private static validate (description: string): boolean {
    if (typeof description !== 'string') return false

    if (description.length === 0 || description.length > 50) return false

    return true
  }
}
