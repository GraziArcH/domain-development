import { type ReportTypeEntityModel } from '@/domain/report'
import { type IdValueObject } from '@/domain/shared'

export interface IReportTypeRepository {
  create: (reportType: ReportTypeEntityModel) => Promise<ReportTypeEntityModel>

  getById: (reportTypeId: IdValueObject) => Promise<ReportTypeEntityModel | null>

  getAll: () => Promise<ReportTypeEntityModel[]>

  update: (reportType: ReportTypeEntityModel) => Promise<ReportTypeEntityModel>

  delete: (reportTypeId: IdValueObject) => Promise<ReportTypeEntityModel>
}
