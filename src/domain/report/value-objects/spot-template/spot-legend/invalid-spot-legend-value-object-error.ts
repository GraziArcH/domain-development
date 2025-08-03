import { DomainError } from '@/domain/shared'

export class InvalidSpotTemplateLegendValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidSpotTemplateLegendValueObjectError'
    this.message = 'A legenda do modelo de ponto deve ter no máximo 50 caracteres'
  }
}
