export class DomainError extends Error {}

export class NotFoundError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}
