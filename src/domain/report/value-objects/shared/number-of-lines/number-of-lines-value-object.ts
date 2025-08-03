import { InvalidNumberOfLinesValueObjectError } from './invalid-number-of-lines-value-object-error'

export class NumberOfLinesValueObject {
  private constructor (private readonly numberOfLines: number) {
    this.numberOfLines = numberOfLines
    Object.freeze(this)
  }

  public get value (): number {
    return this.numberOfLines
  }

  static create (numberOfLines: number): NumberOfLinesValueObject {
    if (!this.validate(numberOfLines)) throw new InvalidNumberOfLinesValueObjectError()

    return new NumberOfLinesValueObject(numberOfLines)
  }

  private static validate (numberOfLines: number): boolean {
    if (typeof numberOfLines !== 'number') return false

    if (numberOfLines <= 0) return false

    return true
  }
}
