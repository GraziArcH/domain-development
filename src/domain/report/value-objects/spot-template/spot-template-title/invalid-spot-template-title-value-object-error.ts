import { DomainError } from '@/domain/shared'

export class InvalidSpotTitleValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidSpotTitleValueObjectError'
    this.message = 'O título do ponto deve ter entre 1 e 30 caracteres'
  }
}
