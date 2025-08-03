import { InvalidReportTypeNameValueObjectError } from './invalid-report-type-name-value-object-error'

export class ReportTypeNameValueObject {
  private constructor (private readonly typeName: string) {
    this.typeName = typeName
    Object.freeze(this)
  }

  public get value (): string {
    return this.typeName
  }

  static create (typeName: string): ReportTypeNameValueObject {
    if (!this.validate(typeName)) throw new InvalidReportTypeNameValueObjectError()

    return new ReportTypeNameValueObject(typeName)
  }

  private static validate (typeName: string): boolean {
    if (typeof typeName !== 'string') return false

    if (typeName.length === 0 || typeName.length > 30) return false

    return true
  }
}
