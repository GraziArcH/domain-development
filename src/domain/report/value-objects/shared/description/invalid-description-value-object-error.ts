import { DomainError } from '@/domain/shared'

export class InvalidDescriptionValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidDescriptionValueObjectError'
    this.message = 'A descrição deve ter entre 1 e 50 caracteres'
  }
}
