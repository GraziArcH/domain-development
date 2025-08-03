import { DomainError } from '@/domain/shared/errors'

export class InvalidLayerFilePathValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidLayerFilePathValueObjectError'
    this.message = 'O caminho do arquivo da camada deve ter entre 1 e 255 caracteres'
  }
}
