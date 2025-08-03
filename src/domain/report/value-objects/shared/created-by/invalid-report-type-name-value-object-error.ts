import { DomainError } from '@/domain/shared'

export class InvalidCreatedByValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidCreatedByValueObjectError'
    this.message = 'O criador do ponto deve ter até 50 caracteres'
  }
}
