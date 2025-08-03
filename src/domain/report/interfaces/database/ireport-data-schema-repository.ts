import { type IdValueObject } from '@/domain/shared'
import { type ReportDataSchemaEntityModel } from '../../entities/report-data-schema'

export interface IReportDataSchemaRepository {
  create: (reportDataSchema: ReportDataSchemaEntityModel) => Promise<ReportDataSchemaEntityModel>
  getById: (reportDataSchemaId: IdValueObject) => Promise<ReportDataSchemaEntityModel | null>
  getAll: () => Promise<ReportDataSchemaEntityModel[]>
  update: (reportDataSchema: ReportDataSchemaEntityModel) => Promise<ReportDataSchemaEntityModel>
  delete: (reportDataSchemaId: IdValueObject) => Promise<void>
  getLatest: () => Promise<ReportDataSchemaEntityModel | null>
}
