import { InvalidSpotTemplateLegendValueObjectError } from './invalid-spot-legend-value-object-error'

export class SpotTemplateLegendValueObject {
  private constructor (private readonly spotLegend: string) {
    this.spotLegend = spotLegend
    Object.freeze(this)
  }

  public get value (): string {
    return this.spotLegend
  }

  static create (spotLegend: string): SpotTemplateLegendValueObject {
    if (!this.validate(spotLegend)) throw new InvalidSpotTemplateLegendValueObjectError()

    return new SpotTemplateLegendValueObject(spotLegend)
  }

  private static validate (spotLegend: string): boolean {
    if (typeof spotLegend !== 'string') return false

    if (spotLegend.length > 50) return false

    return true
  }
}
