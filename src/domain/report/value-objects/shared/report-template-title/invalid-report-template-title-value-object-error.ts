import { DomainError } from '@/domain/shared'

export class InvalidReportTemplateTitleValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidReportTemplateTitleValueObjectError'
    this.message = 'O título do modelo do template deve ter entre 1 e 100 caracteres'
  }
}
