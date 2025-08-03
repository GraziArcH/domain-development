import { DomainError } from '@/domain/shared'

export class InvalidOrderValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidOrderValueObjectError'
    this.message = 'A ordem deve ser maior que zero'
  }
}
