import { DomainError } from '@/domain/shared/errors'

export class InvalidWorkspaceDescriptionValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidWorkspaceDescriptionValueObjectError'
    this.message = 'A descrição do ambiente de trabalho deve ter entre 1 e 255 caracteres'
  }
}
