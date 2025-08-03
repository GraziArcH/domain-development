import { type JtdSchema } from '../../../entities'
import { InvalidJtdColumnValueObjectError } from './invalid-jtd-value-object-error'

export class JtdColumnValueObject {
  private constructor (private readonly jtdColumn: JtdSchema) {
    this.jtdColumn = jtdColumn
    Object.freeze(this)
  }

  public get value (): JtdSchema {
    return this.jtdColumn
  }

  static create (jtdColumn: JtdSchema): JtdColumnValueObject {
    if (!this.validate(jtdColumn)) throw new InvalidJtdColumnValueObjectError()

    return new JtdColumnValueObject(jtdColumn)
  }

  private static validate (jtdColumn: object): boolean {
    if (typeof jtdColumn !== 'object' || jtdColumn === null) return false

    return true
  }
}
