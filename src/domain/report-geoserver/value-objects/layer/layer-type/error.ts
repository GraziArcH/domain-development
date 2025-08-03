import { DomainError } from '@/domain/shared/errors'

export class InvalidLayerTypeValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidLayerTypeValueObjectError'
    this.message = 'O tipo do arquivo da camada deve ter entre 1 e 50 caracteres'
  }
}
