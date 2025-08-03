import { DomainError } from '@/domain/shared'

export class InvalidReportTypeIconValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidReportTypeIconValueObjectError'
    this.message = 'O icon do relatório deve ter entre 1 e 100 caracteres'
  }
}
