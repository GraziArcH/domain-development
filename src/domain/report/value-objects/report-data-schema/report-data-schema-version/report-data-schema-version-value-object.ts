import { InvalidVersionValueObjectError } from './invalid-version-value-object-error'

export class VersionValueObject {
  private constructor (private readonly version: number) {
    this.version = version
    Object.freeze(this)
  }

  public get value (): number {
    return this.version
  }

  static create (version: number): VersionValueObject {
    if (!this.validate(version)) throw new InvalidVersionValueObjectError()

    return new VersionValueObject(version)
  }

  private static validate (version: number): boolean {
    if (typeof version !== 'number' || !Number.isInteger(version)) return false

    return true
  }
}
