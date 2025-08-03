import { DomainError } from '@/domain/shared'

export class InvalidFilterValueTypeDescriptionValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidFilterValueTypeDescriptionValueObjectError'
    this.message = 'A descrição do tipo de filtro deve ter entre 1 e 50 caracteres'
  }
}
