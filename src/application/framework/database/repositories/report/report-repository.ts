import { type IReportRepository, ReportAggregateModel } from '@/domain/report';
import { type DatabaseCacheHelper } from '@/application/framework';

export class ReportRepository implements IReportRepository {
  constructor(private readonly databaseCacheHelper: DatabaseCacheHelper) { }

  private mapper(report): ReportAggregateModel | null {
    if (!report) return null;

    return ReportAggregateModel.create({
      reportName: report.reportName,
      reportTitle: report.reportTitle,
      reportDescription: report.reportDescription,
      numberOfLines: report.numberOfLines,
      filters: report.filters,
      lines: report.lines,
      reportId: report.reportId,
    });
  }

  private buildKey(reportName: string): string {
    if (!reportName || typeof reportName !== 'string') {
      throw new Error('Invalid report name: must be a non-empty string.');
    }
    return `kosen:report:${reportName}`;
  }

  async create(report: ReportAggregateModel): Promise<ReportAggregateModel> {
    if (!report || !(report instanceof ReportAggregateModel)) {
      throw new Error('Invalid report: must be an instance of ReportAggregateModel.');
    }

    await this.databaseCacheHelper.set(this.buildKey(report.reportName), JSON.stringify(report));
    return await this.getByName(report.reportName);
  }

  async getByName(reportName: string): Promise<ReportAggregateModel | null> {
    const key = this.buildKey(reportName);
    const value = await this.databaseCacheHelper.get(key);

    if (!value) {
      console.warn(`Report not found: ${key}`);
      return null;
    }

    try {
      return this.mapper(JSON.parse(value));
    } catch (error) {
      console.error(`Failed to parse report for key ${key}:`, error);
      throw new Error('Failed to parse report data.');
    }
  }

  async update(report: ReportAggregateModel): Promise<ReportAggregateModel> {
    if (!report || !(report instanceof ReportAggregateModel)) {
      throw new Error('Invalid report: must be an instance of ReportAggregateModel.');
    }

    const key = this.buildKey(report.reportName);
    await this.databaseCacheHelper.del(key);
    await this.databaseCacheHelper.set(key, JSON.stringify(report));
    return await this.getByName(report.reportName);
  }

  async delete(reportName: string): Promise<ReportAggregateModel | null> {
    const key = this.buildKey(reportName);
    const report = await this.getByName(reportName);

    if (!report) {
      console.warn(`Attempted to delete a non-existent report: ${key}`);
      return null;
    }

    await this.databaseCacheHelper.del(key);
    return report;
  }
}
