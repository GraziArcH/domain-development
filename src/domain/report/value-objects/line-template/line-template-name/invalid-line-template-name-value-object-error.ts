import { DomainError } from '@/domain/shared'

export class InvalidLineTemplateNameValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidLineTemplateNameValueObjectError'
    this.message = 'O nome da linha deve ter entre 1 e 50 caracteres'
  }
}
