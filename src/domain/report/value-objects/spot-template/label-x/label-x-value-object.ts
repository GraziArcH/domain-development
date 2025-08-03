import { InvalidSpotTemplateLabelXValueObjectError } from './invalid-label-x-value-object-error'

export class SpotTemplateLabelXValueObject {
  private constructor (private readonly labelX: string) {
    this.labelX = labelX
    Object.freeze(this)
  }

  public get value (): string {
    return this.labelX
  }

  static create (labelX: string): SpotTemplateLabelXValueObject {
    if (!this.validate(labelX)) throw new InvalidSpotTemplateLabelXValueObjectError()

    return new SpotTemplateLabelXValueObject(labelX)
  }

  private static validate (labelX: string): boolean {
    if (typeof labelX !== 'string') return false

    if (labelX.length === 0 || labelX.length > 30) return false

    return true
  }
}
