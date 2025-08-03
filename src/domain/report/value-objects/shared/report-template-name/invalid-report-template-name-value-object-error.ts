import { DomainError } from '@/domain/shared'

export class InvalidReportTemplateNameValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidReportTemplateNameValueObjectError'
    this.message = 'O nome do template do relatório deve ter entre 1 e 30 caracteres'
  }
}
