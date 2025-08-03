import { InvalidSpotTitleValueObjectError } from './invalid-spot-template-title-value-object-error'

export class SpotTitleValueObject {
  private constructor (private readonly spotTitle: string) {
    this.spotTitle = spotTitle
    Object.freeze(this)
  }

  public get value (): string {
    return this.spotTitle
  }

  static create (spotTitle: string): SpotTitleValueObject {
    if (!this.validate(spotTitle)) throw new InvalidSpotTitleValueObjectError()

    return new SpotTitleValueObject(spotTitle)
  }

  private static validate (spotTitle: string): boolean {
    if (typeof spotTitle !== 'string') return false

    if (spotTitle.length === 0 || spotTitle.length > 60) return false

    return true
  }
}
