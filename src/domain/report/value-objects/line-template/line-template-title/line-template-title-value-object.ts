import { InvalidLineTemplateTitleValueObjectError } from './invalid-line-template-title-value-object-error'

export class LineTemplateTitleValueObject {
  private constructor (private readonly title: string) {
    this.title = title
    Object.freeze(this)
  }

  public get value (): string {
    return this.title
  }

  static create (title: string): LineTemplateTitleValueObject {
    if (!this.validate(title)) throw new InvalidLineTemplateTitleValueObjectError()

    return new LineTemplateTitleValueObject(title)
  }

  private static validate (title: string): boolean {
    if (typeof title !== 'string') return false

    if (title.length === 0 || title.length > 100) return false

    return true
  }
}
