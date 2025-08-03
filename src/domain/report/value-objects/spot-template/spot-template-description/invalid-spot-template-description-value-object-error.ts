import { DomainError } from '@/domain/shared'

export class InvalidSpotTemplateDescriptionValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidSpotTemplateDescriptionValueObjectError'
    this.message = 'A descrição do modelo de ponto deve ter entre 1 e 50 caracteres'
  }
}
