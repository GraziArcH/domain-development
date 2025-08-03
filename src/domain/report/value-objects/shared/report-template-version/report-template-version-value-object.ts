import { InvalidReportTemplateVersionValueObjectError } from './invalid-report-template-version-value-object-error'

export class ReportTemplateVersionValueObject {
  private constructor (private readonly version: string) {
    this.version = version
    Object.freeze(this)
  }

  public get value (): string {
    return this.version
  }

  static create (version: string): ReportTemplateVersionValueObject {
    if (!this.validate(version)) throw new InvalidReportTemplateVersionValueObjectError()

    return new ReportTemplateVersionValueObject(version)
  }

  private static validate (version: string): boolean {
    if (typeof version !== 'string') return false

    if (version.length === 0 || version.length > 11) return false

    return true
  }
}
