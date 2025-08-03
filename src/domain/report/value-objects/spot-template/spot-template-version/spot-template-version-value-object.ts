import { InvalidSpotTemplateVersionValueObjectError } from './invalid-spot-template-version-value-object-error'

export class SpotTemplateVersionValueObject {
  private constructor (private readonly version: string) {
    this.version = version
    Object.freeze(this)
  }

  public get value (): string {
    return this.version
  }

  static create (version: string): SpotTemplateVersionValueObject {
    if (!this.validate(version)) throw new InvalidSpotTemplateVersionValueObjectError()

    return new SpotTemplateVersionValueObject(version)
  }

  private static validate (version: string): boolean {
    if (typeof version !== 'string') return false

    if (version.length > 4) return false

    return true
  }
}
