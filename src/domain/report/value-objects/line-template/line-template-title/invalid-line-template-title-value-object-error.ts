import { DomainError } from '@/domain/shared'

export class InvalidLineTemplateTitleValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidLineTemplateTitleValueObjectError'
    this.message = 'O título da linha deve ter entre 1 e 50 caracteres'
  }
}
