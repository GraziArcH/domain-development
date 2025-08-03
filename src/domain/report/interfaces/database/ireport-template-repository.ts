import { type ReportTemplateVersionValueObject, type ReportTemplateEntityModel, type ReportTemplateNameValueObject } from '@/domain/report'
import { type DateValueObject, type StringValueObject, type IdValueObject } from '@/domain/shared'
import { type StatusValueObject } from '../../value-objects/report-template/report-template-status/report-template-status-value-object'

export interface IReportTemplateRepository {
  create: (reportTemplate: ReportTemplateEntityModel) => Promise<ReportTemplateEntityModel>

  getById: (reportTemplateId: IdValueObject) => Promise<ReportTemplateEntityModel | null>

  getByReportTemplateName: (reportTemplateName: ReportTemplateNameValueObject) => Promise<ReportTemplateEntityModel | null>

  getReportTemplateByNameAndVersion: (reportTemplateName: ReportTemplateNameValueObject, reporTemplateVersion: ReportTemplateVersionValueObject) => Promise<ReportTemplateEntityModel | null>

  getReportTemplateByTemplateIdWithAnyActiveStatus: (reportTemplateId: IdValueObject) => Promise<ReportTemplateEntityModel>

  activateReport: (reportTemplateName: StringValueObject, version: StringValueObject) => Promise<void>

  getByReportTypeId: (reportTypeId: IdValueObject) => Promise<ReportTemplateEntityModel[]>

  getAll: () => Promise<ReportTemplateEntityModel[]>

  update: (reportTemplate: ReportTemplateEntityModel) => Promise<ReportTemplateEntityModel>

  updateStatus: (status: StatusValueObject, updatedAt: DateValueObject, reportTemplateName: ReportTemplateNameValueObject) => Promise<ReportTemplateEntityModel>

  delete: (reportTemplateId: IdValueObject) => Promise<ReportTemplateEntityModel>
}
