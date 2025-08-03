import { DomainError } from '@/domain/shared'

export class InvalidSpotTemplateNameValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidSpotTemplateNameValueObjectError'
    this.message = 'O nome do modelo de ponto deve ter entre 1 e 30 caracteres'
  }
}
