import { InvalidSpotTemplateNameValueObjectError } from './invalid-spot-template-name-value-object-error'

export class SpotTemplateNameValueObject {
  private constructor (private readonly spotTemplateName: string) {
    this.spotTemplateName = spotTemplateName
    Object.freeze(this)
  }

  public get value (): string {
    return this.spotTemplateName
  }

  static create (spotTemplateName: string): SpotTemplateNameValueObject {
    if (!this.validate(spotTemplateName)) throw new InvalidSpotTemplateNameValueObjectError()

    return new SpotTemplateNameValueObject(spotTemplateName)
  }

  private static validate (spotTemplateName: string): boolean {
    if (typeof spotTemplateName !== 'string') return false

    if (spotTemplateName.length === 0 || spotTemplateName.length > 40) return false

    return true
  }
}
