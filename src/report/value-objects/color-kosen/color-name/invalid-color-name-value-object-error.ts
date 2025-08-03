import { DomainError } from '@/domain/shared'

export class InvalidColorNameValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidColorNameValueObjectError'
    this.message = 'O nome da cor deve ser uma string com no máximo 50 caracteres'
  }
}
