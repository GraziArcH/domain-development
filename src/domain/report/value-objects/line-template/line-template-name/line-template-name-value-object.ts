import { InvalidLineTemplateNameValueObjectError } from './invalid-line-template-name-value-object-error'

export class LineTemplateNameValueObject {
  private constructor (private readonly name: string) {
    this.name = name
    Object.freeze(this)
  }

  public get value (): string {
    return this.name
  }

  static create (name: string): LineTemplateNameValueObject {
    if (!this.validate(name)) throw new InvalidLineTemplateNameValueObjectError()

    return new LineTemplateNameValueObject(name)
  }

  private static validate (name: string): boolean {
    if (typeof name !== 'string') return false

    if (name.length === 0 || name.length > 80) return false

    return true
  }
}
