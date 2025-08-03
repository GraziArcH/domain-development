import { InvalidReportTypeIconValueObjectError } from './invalid-report-type-icon-value-object-error'

export class ReportTypeIconValueObject {
  private constructor (private readonly description: string) {
    this.description = description
    Object.freeze(this)
  }

  public get value (): string {
    return this.description
  }

  static create (description: string): ReportTypeIconValueObject {
    if (!this.validate(description)) throw new InvalidReportTypeIconValueObjectError()

    return new ReportTypeIconValueObject(description)
  }

  private static validate (description: string): boolean {
    if (typeof description !== 'string') return false

    if (description.length === 0 || description.length > 100) return false

    return true
  }
}
