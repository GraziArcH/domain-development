import { DomainError } from '@/domain/shared'

export class InvalidFilterValueValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidFilterValueValueObjectError'
    this.message = 'O valor do filtro deve ter entre 1 e 50 caracteres'
  }
}
