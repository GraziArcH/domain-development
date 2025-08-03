import { InvalidWorkspaceNameValueObjectError } from './error'

export class WorkspaceNameValueObject {
  private constructor (private readonly description: string) {
    this.description = description
    Object.freeze(this)
  }

  public get value (): string {
    return this.description
  }

  static create (description: string): WorkspaceNameValueObject {
    if (!this.validate(description)) throw new InvalidWorkspaceNameValueObjectError()

    return new WorkspaceNameValueObject(description)
  }

  private static validate (description: string): boolean {
    if (typeof description !== 'string') return false

    if (description.length === 0 || description.length > 255) return false

    return true
  }
}
