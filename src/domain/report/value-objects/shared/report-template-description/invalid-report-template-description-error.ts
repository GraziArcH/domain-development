import { DomainError } from '@/domain/shared'

export class InvalidReportTemplateDescriptionValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidReportTemplateDescriptionValueObjectError'
    this.message = 'A descrição do modelo do template deve ter entre 1 e 50 caracteres'
  }
}
