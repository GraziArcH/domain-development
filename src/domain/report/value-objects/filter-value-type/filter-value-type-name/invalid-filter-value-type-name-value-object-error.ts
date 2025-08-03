import { DomainError } from '@/domain/shared'

export class InvalidFilterValueTypeNameValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidFilterValueTypeNameValueObjectError'
    this.message = 'O nome do tipo de filtro deve ter entre 1 e 30 caracteres'
  }
}
