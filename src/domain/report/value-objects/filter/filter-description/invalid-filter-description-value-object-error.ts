import { DomainError } from '@/domain/shared/errors'

export class InvalidFilterDescriptionValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidFilterDescriptionValueObjectError'
    this.message = 'A descrição do filtro deve ter entre 1 e 50 caracteres'
  }
}
