import { InvalidOrderValueObjectError } from './invalid-order-value-object-error'

export class OrderValueObject {
  private constructor (private readonly numberOfLines: number) {
    this.numberOfLines = numberOfLines
    Object.freeze(this)
  }

  public get value (): number {
    return this.numberOfLines
  }

  static create (numberOfLines: number): OrderValueObject {
    if (!this.validate(numberOfLines)) throw new InvalidOrderValueObjectError()

    return new OrderValueObject(numberOfLines)
  }

  private static validate (numberOfLines: number): boolean {
    if (typeof numberOfLines !== 'number') return false

    if (numberOfLines <= 0) return false

    return true
  }
}
