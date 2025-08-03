import { InvalidColorNameValueObjectError } from './invalid-color-name-value-object-error'

export class ColorNameValueObject {
  private constructor (private readonly colorName: string) {
    this.colorName = colorName
    Object.freeze(this)
  }

  public get value (): string {
    return this.colorName
  }

  static create (colorName: string): ColorNameValueObject {
    if (!this.validate(colorName)) throw new InvalidColorNameValueObjectError()

    return new ColorNameValueObject(colorName)
  }

  private static validate (colorName: string): boolean {
    if (typeof colorName !== 'string') return false

    if (colorName.length === 0 || colorName.length > 50) return false

    return true
  }
}
