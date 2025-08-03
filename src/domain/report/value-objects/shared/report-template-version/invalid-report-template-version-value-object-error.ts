import { DomainError } from '@/domain/shared'

export class InvalidReportTemplateVersionValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidReportTemplateVersionValueObjectError'
    this.message = 'Versão do modelo do template deve ter entre 1 e 11 caracteres'
  }
}
