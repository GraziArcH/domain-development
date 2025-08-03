import {
  type IReportTemplateRepository,
  ReportTemplateEntityModel,
  ReportTemplateNameValueObject,
  ReportTemplateVersionValueObject
} from '@/domain/report'
import { DateValueObject, IdValueObject, NotFoundError, StringValueObject } from '@/domain/shared'
import { type ReportTemplateDTO, type ReportTemplateDTOWithoutId } from './report-template-dtos'
import { StatusValueObject } from '../../value-objects/report-template/report-template-status/report-template-status-value-object'

export class ReportTemplateEntity {
  constructor (private readonly repository: IReportTemplateRepository) { }

  async create (dto: ReportTemplateDTOWithoutId): Promise<ReportTemplateEntityModel> {
    const reportTemplateModelOrError = ReportTemplateEntityModel.create(
      {
        reportTemplateId: 1,
        ...dto
      }
    )

    return await this.repository.create(reportTemplateModelOrError)
  }

  async getById (reportTemplateId: number): Promise<ReportTemplateEntityModel> {
    const reportTemplateIdOrError = IdValueObject.create(reportTemplateId)

    return await this.repository.getById(reportTemplateIdOrError)
  }

  async getByReportTypeId (reportTemplateId: number): Promise<ReportTemplateEntityModel[]> {
    const reportTemplateIdOrError = IdValueObject.create(reportTemplateId)

    return await this.repository.getByReportTypeId(reportTemplateIdOrError)
  }

  async getByReportTemplateName (reportTemplateName: string): Promise<ReportTemplateEntityModel> {
    const reportTemplateIdOrError = ReportTemplateNameValueObject.create(reportTemplateName)

    return await this.repository.getByReportTemplateName(reportTemplateIdOrError)
  }

  async getReportTemplateByNameAndVersion (reportTemplateName: string, reportTemplateVersion: string): Promise<ReportTemplateEntityModel> {
    const reportTemplateNameOrError = ReportTemplateNameValueObject.create(reportTemplateName)
    const reportTemplateVersionOrError = ReportTemplateVersionValueObject.create(reportTemplateVersion)

    return await this.repository.getReportTemplateByNameAndVersion(reportTemplateNameOrError, reportTemplateVersionOrError)
  }

  async getReportTemplateByTemplateIdWithAnyActiveStatus (reportTemplateId: number): Promise<ReportTemplateEntityModel> {
    const reportTemplateIdOrError = IdValueObject.create(reportTemplateId)

    return await this.repository.getReportTemplateByTemplateIdWithAnyActiveStatus(reportTemplateIdOrError)
  }

  async activateReport (reportTemplateName: string, version: string): Promise<void> {
    const reportTemplateNameOrError = StringValueObject.create(reportTemplateName)
    const versionOrError = StringValueObject.create(version)

    await this.repository.activateReport(reportTemplateNameOrError, versionOrError)
  }

  async getAll (): Promise<ReportTemplateEntityModel[]> {
    return await this.repository.getAll()
  }

  async update (dto: ReportTemplateDTO): Promise<ReportTemplateEntityModel> {
    const reportTemplateModelOrError = ReportTemplateEntityModel.create(dto)

    const reportTemplateExists = await this.repository.getById(reportTemplateModelOrError.reportTemplateId)

    if (!reportTemplateExists) throw new NotFoundError('Esse template de relatório não existe')

    return await this.repository.update(reportTemplateModelOrError)
  }

  async updateStatus (status: string, updatedAt: Date, reportTemplateName: string): Promise<ReportTemplateEntityModel> {
    const reportTemplateIdOrError = ReportTemplateNameValueObject.create(reportTemplateName)
    const reportTemplateExists = await this.repository.getByReportTemplateName(reportTemplateIdOrError)

    if (!reportTemplateExists) throw new NotFoundError('Esse template de relatório não existe')

    const updatedAtOrError = DateValueObject.create(updatedAt)
    const statusOrError = StatusValueObject.create(status)

    return await this.repository.updateStatus(statusOrError, updatedAtOrError, reportTemplateIdOrError)
  }

  async delete (
    reportTemplateId: number
  ): Promise<ReportTemplateEntityModel> {
    const reportTemplateIdOrError = IdValueObject.create(reportTemplateId)

    const reportTemplateExists = await this.repository.getById(reportTemplateIdOrError)

    if (!reportTemplateExists) throw new NotFoundError('Esse template de relatório não existe')

    return await this.repository.delete(reportTemplateIdOrError)
  }
}
