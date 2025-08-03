import { DomainError } from '@/domain/shared'

export class InvalidNameValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidNameValueObjectError'
    this.message = 'A descrição deve ter entre 1 e 30 caracteres'
  }
}
