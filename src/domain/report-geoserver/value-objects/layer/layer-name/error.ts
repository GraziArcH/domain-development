import { DomainError } from '@/domain/shared/errors'

export class InvalidLayerNameValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidLayerNameValueObjectError'
    this.message = 'O nome da camada deve ter entre 1 e 255 caracteres'
  }
}
