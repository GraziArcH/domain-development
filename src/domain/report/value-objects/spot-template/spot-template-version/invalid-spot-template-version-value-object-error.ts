import { DomainError } from '@/domain/shared'

export class InvalidSpotTemplateVersionValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidSpotTemplateVersionValueObjectError'
    this.message = 'A versão do modelo de ponto deve ter no máximo 4 caracteres'
  }
}
