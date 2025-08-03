import { DomainError } from '@/domain/shared'

export class InvalidReportTypeDescriptionValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidReportTypeDescriptionValueObjectError'
    this.message = 'A descrição do tipo de relatório deve ter entre 1 e 50 caracteres'
  }
}
