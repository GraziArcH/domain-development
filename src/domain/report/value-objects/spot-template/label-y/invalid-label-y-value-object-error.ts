import { DomainError } from '@/domain/shared'

export class InvalidSpotTemplateLabelYValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidSpotTemplateLabelYValueObjectError'
    this.message = 'A etiqueta Y do modelo de ponto deve ter entre 1 e 30 caracteres'
  }
}
