import { InvalidPathValueObjectError } from './invalid-path-value-object-error'

export class PathValueObject {
  private constructor (private readonly description: string) {
    this.description = description
    Object.freeze(this)
  }

  public get value (): string {
    return this.description
  }

  static create (description: string): PathValueObject {
    if (!this.validate(description)) throw new InvalidPathValueObjectError()

    return new PathValueObject(description)
  }

  private static validate (description: string): boolean {
    if (typeof description !== 'string') return false

    if (description.length === 0 || description.length > 100) return false

    return true
  }
}
