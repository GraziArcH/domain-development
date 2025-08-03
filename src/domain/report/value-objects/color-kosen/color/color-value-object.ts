import { InvalidColorValueObjectError } from './invalid-color-value-object-error'

export class ColorValueObject {
  private constructor (private readonly color: string) {
    this.color = color
    Object.freeze(this)
  }

  public get value (): string {
    return this.color
  }

  static create (color: string): ColorValueObject {
    if (!this.validate(color)) throw new InvalidColorValueObjectError()

    return new ColorValueObject(color)
  }

  private static validate (color: string): boolean {
    if (typeof color !== 'string') return false

    // Regex para validar cores hexadecimais (# seguido de 3 ou 6 caracteres hexadecimais)
    const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/
    if (!hexColorRegex.test(color)) return false

    return true
  }
}
