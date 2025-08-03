import { DomainError } from '@/domain/shared/errors'

export class InvalidStoreLayerNameValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidStoreLayerNameValueObjectError'
    this.message = 'O nome da camada de armazenamento deve ter entre 1 e 255 caracteres'
  }
}
