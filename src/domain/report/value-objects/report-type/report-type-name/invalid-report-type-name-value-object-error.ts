import { DomainError } from '@/domain/shared'

export class InvalidReportTypeNameValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidReportTypeNameValueObjectError'
    this.message = 'O nome do tipo de relatório deve ter entre 1 e 30 caracteres'
  }
}
