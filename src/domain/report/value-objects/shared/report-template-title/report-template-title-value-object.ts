import { InvalidReportTemplateTitleValueObjectError } from './invalid-report-template-title-value-object-error'

export class ReportTemplateTitleValueObject {
  private constructor (private readonly title: string) {
    this.title = title
    Object.freeze(this)
  }

  public get value (): string {
    return this.title
  }

  static create (title: string): ReportTemplateTitleValueObject {
    if (!this.validate(title)) throw new InvalidReportTemplateTitleValueObjectError()

    return new ReportTemplateTitleValueObject(title)
  }

  private static validate (title: string): boolean {
    if (typeof title !== 'string') return false

    if (title.length < 1 || title.length > 100) return false

    return true
  }
}
