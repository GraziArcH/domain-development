import { InvalidStatusColumnValueObjectError } from './invalid-status-value-object-error'

export class StatusValueObject {
  private constructor (private readonly status: string) {
    this.status = status
    Object.freeze(this)
  }

  public get value (): string {
    return this.status
  }

  static create (status: string): StatusValueObject {
    if (!this.validate(status)) throw new InvalidStatusColumnValueObjectError()

    return new StatusValueObject(status)
  }

  private static validate (status: string): boolean {
    const validStatuses = ['fresh', 'recent', 'stale', 'outdated']
    return validStatuses.includes(status)
  }
}
