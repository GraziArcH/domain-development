import { InvalidIntervalValueObjectError } from './invalid-interval-value-object-error'

export class IntervalValueObject {
  private constructor (private readonly interval: string) {
    this.interval = interval
    Object.freeze(this)
  }

  public get value (): string {
    return this.interval
  }

  static create (interval: string): IntervalValueObject {
    if (!this.validate(interval)) throw new InvalidIntervalValueObjectError()

    return new IntervalValueObject(interval)
  }

  private static validate (interval: string): boolean {
    if (typeof interval === 'object') return true

    if (typeof interval !== 'string') return false

    if (interval.length === 0 || interval.length > 10) return false

    return true
  }
}
