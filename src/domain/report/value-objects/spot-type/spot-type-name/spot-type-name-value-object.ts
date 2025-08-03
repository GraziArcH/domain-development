import { InvalidSpotTypeNameValueObjectError } from './invalid-spot-type-name-value-object-error'

export class SpotTypeNameValueObject {
  private constructor (private readonly spotTypeName: string) {
    this.spotTypeName = spotTypeName
    Object.freeze(this)
  }

  public get value (): string {
    return this.spotTypeName
  }

  static create (spotTypeName: string): SpotTypeNameValueObject {
    if (!this.validate(spotTypeName)) throw new InvalidSpotTypeNameValueObjectError()

    return new SpotTypeNameValueObject(spotTypeName)
  }

  private static validate (spotTypeName: string): boolean {
    if (typeof spotTypeName !== 'string') return false

    if (spotTypeName.length === 0 || spotTypeName.length > 30) return false

    return true
  }
}
