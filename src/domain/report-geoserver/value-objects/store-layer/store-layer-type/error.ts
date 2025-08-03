import { DomainError } from '@/domain/shared/errors'

export class InvalidStoreLayerTypeValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidStoreLayerTypeValueObjectError'
    this.message = 'O tipo da camada de armazenamento deve ter entre 1 e 50 caracteres'
  }
}
