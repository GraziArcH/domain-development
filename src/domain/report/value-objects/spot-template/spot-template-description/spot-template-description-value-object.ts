import { InvalidSpotTemplateDescriptionValueObjectError } from './invalid-spot-template-description-value-object-error'

export class SpotTemplateDescriptionValueObject {
  private constructor (private readonly description: string) {
    this.description = description
    Object.freeze(this)
  }

  public get value (): string {
    return this.description
  }

  static create (description: string): SpotTemplateDescriptionValueObject {
    if (!this.validate(description)) throw new InvalidSpotTemplateDescriptionValueObjectError()

    return new SpotTemplateDescriptionValueObject(description)
  }

  private static validate (description: string): boolean {
    if (typeof description !== 'string') return false

    if (description.length === 0 || description.length > 80) return false

    return true
  }
}
