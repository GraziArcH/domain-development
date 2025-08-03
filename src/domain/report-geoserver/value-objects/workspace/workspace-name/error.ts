import { DomainError } from '@/domain/shared/errors'

export class InvalidWorkspaceNameValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidWorkspaceNameValueObjectError'
    this.message = 'O nome do ambiente de trabalho deve ter entre 1 e 255 caracteres'
  }
}
