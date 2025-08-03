import { DomainError } from '@/domain/shared'

export class InvalidSpotTypeNameValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidSpotTypeNameValueObjectError'
    this.message = 'O nome do tipo de ponto deve ter entre 1 e 30 caracteres'
  }
}
