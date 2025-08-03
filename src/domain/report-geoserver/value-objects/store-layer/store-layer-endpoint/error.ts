import { DomainError } from '@/domain/shared/errors'

export class InvalidStoreLayerEndpointValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidStoreLayerEndpointValueObjectError'
    this.message = 'O endpoint da camada de armazenamento deve ter entre 1 e 255 caracteres'
  }
}
