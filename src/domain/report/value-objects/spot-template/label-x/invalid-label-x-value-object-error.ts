import { DomainError } from '@/domain/shared'

export class InvalidSpotTemplateLabelXValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidSpotTemplateLabelXValueObjectError'
    this.message = 'A etiqueta X do modelo de ponto deve ter entre 1 e 30 caracteres'
  }
}
