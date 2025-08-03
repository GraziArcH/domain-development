import { DomainError } from '@/domain/shared'

export class InvalidPathValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidPathValueObjectError'
    this.message = 'O path deve ter entre 1 e 20 caracteres'
  }
}
