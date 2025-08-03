import { DomainError } from '@/domain/shared'

export class InvalidNumberOfLinesValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidNumberOfLinesValueObjectError'
    this.message = 'O número de linhas deve ser maior que zero'
  }
}
