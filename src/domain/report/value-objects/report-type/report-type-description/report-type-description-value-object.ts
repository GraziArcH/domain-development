import { InvalidReportTypeDescriptionValueObjectError } from './invalid-report-type-description-value-object-error'

export class ReportTypeDescriptionValueObject {
  private constructor (private readonly description: string) {
    this.description = description
    Object.freeze(this)
  }

  public get value (): string {
    return this.description
  }

  static create (description: string): ReportTypeDescriptionValueObject {
    if (!this.validate(description)) throw new InvalidReportTypeDescriptionValueObjectError()

    return new ReportTypeDescriptionValueObject(description)
  }

  private static validate (description: string): boolean {
    if (typeof description !== 'string') return false

    if (description.length === 0 || description.length > 50) return false

    return true
  }
}
