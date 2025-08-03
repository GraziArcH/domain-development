import { DomainError } from '@/domain/shared'

export class InvalidColorValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidColorValueObjectError'
    this.message = 'A descrição do tipo de ponto deve estar no formato HEX'
  }
}
