import { DomainError } from '@/domain/shared/errors'

export class InvalidStoreLayerDescriptionValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidStoreLayerDescriptionValueObjectError'
    this.message = 'A descrição da camada de armazenamento deve ter entre 1 e 255 caracteres'
  }
}
