import { InvalidSpotTemplateLabelYValueObjectError } from './invalid-label-y-value-object-error'

export class SpotTemplateLabelYValueObject {
  private constructor (private readonly labelY: string) {
    this.labelY = labelY
    Object.freeze(this)
  }

  public get value (): string {
    return this.labelY
  }

  static create (labelY: string): SpotTemplateLabelYValueObject {
    if (!this.validate(labelY)) throw new InvalidSpotTemplateLabelYValueObjectError()

    return new SpotTemplateLabelYValueObject(labelY)
  }

  private static validate (labelY: string): boolean {
    if (typeof labelY !== 'string') return false

    if (labelY.length === 0 || labelY.length > 30) return false

    return true
  }
}
