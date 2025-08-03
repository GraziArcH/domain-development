import { DomainError } from '@/domain/shared'

export class InvalidIntervalValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidIntervalValueObjectError'
    this.message = 'O intervalo é inváldio'
  }
}
