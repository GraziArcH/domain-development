import { type ReportAggregateModel } from '@/domain/report'

export interface IReportRepository {
  create: (report: ReportAggregateModel) => Promise<ReportAggregateModel>

  getByName: (reportId: string) => Promise<ReportAggregateModel | null>

  update: (report: ReportAggregateModel) => Promise<ReportAggregateModel>

  delete: (reportId: string) => Promise<ReportAggregateModel>
}
