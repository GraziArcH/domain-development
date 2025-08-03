import { DomainError } from '@/domain/shared'

export class InvalidSpotTypeDescriptionValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidSpotTypeDescriptionValueObjectError'
    this.message = 'A descrição do tipo de ponto deve ter entre 1 e 50 caracteres'
  }
}
