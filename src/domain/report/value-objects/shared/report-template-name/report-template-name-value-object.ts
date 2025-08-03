import { InvalidReportTemplateNameValueObjectError } from './invalid-report-template-name-value-object-error'

export class ReportTemplateNameValueObject {
  private constructor (private readonly reportName: string) {
    this.reportName = reportName
    Object.freeze(this)
  }

  public get value (): string {
    return this.reportName
  }

  static create (reportName: string): ReportTemplateNameValueObject {
    if (!this.validate(reportName)) throw new InvalidReportTemplateNameValueObjectError()

    return new ReportTemplateNameValueObject(reportName)
  }

  private static validate (reportName: string): boolean {
    if (typeof reportName !== 'string') return false

    if (reportName.length === 0 || reportName.length > 30) return false

    return true
  }
}
