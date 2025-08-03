import { ReportTypeEntityModel, type IReportTypeRepository } from '@/domain/report'
import { type DatabaseHelper } from '@/application/framework'
import { type IdValueObject } from '@/domain/shared'

export class ReportTypeRepository implements IReportTypeRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  private mapper (rows): ReportTypeEntityModel {
    if (!rows) return null

    return ReportTypeEntityModel.create(
      {
        reportTypeId: rows.report_type_id,
        typeName: rows.type_name,
        description: rows.description,
        icon: rows.icon,
        active: rows.active,
        createdBy: rows.created_by
      }
    )
  }

  async create (reportType: ReportTypeEntityModel): Promise<ReportTypeEntityModel> {
    const query = `
      INSERT INTO report_type (type_name, description, icon, created_at, active, created_by) VALUES ($1, $2, $3, NOW(), $4, $5) RETURNING *
    `
    const result = await this.databaseHelper.query(
      query,
      [
        reportType.typeName.value,
        reportType.description.value,
        reportType.icon.value,
        reportType.active,
        reportType.createdBy.value
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getById (reportTypeId: IdValueObject): Promise<ReportTypeEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM report_type WHERE report_type_id = $1',
      [reportTypeId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getAll (): Promise<ReportTypeEntityModel[]> {
    const result = await this.databaseHelper.query('SELECT * FROM report_type')
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async update (reportType: ReportTypeEntityModel): Promise<ReportTypeEntityModel> {
    const query = `
      UPDATE report_type SET type_name = $1, description = $2, icon = $3, active = $4, created_by = $5 WHERE report_type_id = $6 RETURNING *
    `
    const result = await this.databaseHelper.query(
      query,
      [
        reportType.typeName.value,
        reportType.description.value,
        reportType.icon.value,
        reportType.active,
        reportType.createdBy.value,
        reportType.reportTypeId.value
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async delete (reportTypeId: IdValueObject): Promise<ReportTypeEntityModel> {
    const result = await this.databaseHelper.query(
      'DELETE FROM report_type WHERE report_type_id = $1 RETURNING *',
      [reportTypeId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }
}
