import { InvalidStoreLayerTypeValueObjectError } from './error'

export class StoreLayerTypeValueObject {
  private constructor (private readonly description: string) {
    this.description = description
    Object.freeze(this)
  }

  public get value (): string {
    return this.description
  }

  static create (description: string): StoreLayerTypeValueObject {
    if (!this.validate(description)) throw new InvalidStoreLayerTypeValueObjectError()

    return new StoreLayerTypeValueObject(description)
  }

  private static validate (description: string): boolean {
    if (typeof description !== 'string') return false

    if (description.length === 0 || description.length > 50) return false

    return true
  }
}
