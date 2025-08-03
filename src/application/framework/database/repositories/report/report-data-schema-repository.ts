import { type IdValueObject } from '@/domain/shared'
import { type DatabaseHelper } from '@/application/framework'
import { type IReportDataSchemaRepository } from '../../../../../domain/report/interfaces/database/ireport-data-schema-repository'
import { ReportDataSchemaEntityModel } from '../../../../../domain/report/entities/report-data-schema'

export class ReportDataSchemaRepository implements IReportDataSchemaRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) {}

  private mapper (row: any): ReportDataSchemaEntityModel {
    if (!row) return null

    return ReportDataSchemaEntityModel.create({
      reportDataSchemaId: row.report_data_schema_id,
      jtd: row.jtd,
      version: row.version,
      createdBy: row.created_by,
      createdAt: row.created_at
    })
  }

  async create (reportDataSchema: ReportDataSchemaEntityModel): Promise<ReportDataSchemaEntityModel> {
    const query = `INSERT INTO report_data_schema (
      jtd,
      version,
      created_by,
      created_at
    ) 
      VALUES 
    (
      $1,
      $2,
      $3,
      NOW()
    ) RETURNING *
    `

    const result = await this.databaseHelper.query(
      query,
      [
        reportDataSchema.jtd,
        reportDataSchema.version,
        reportDataSchema.createdAt
      ]
    )

    const row = result.rows[0]
    return this.mapper(row)
  }

  async getById (reportDataSchemaId: IdValueObject): Promise<ReportDataSchemaEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM report_data_schema WHERE report_data_schema_id = $1',
      [reportDataSchemaId.value]
    )

    const row = result.rows[0]
    return this.mapper(row)
  }

  async getAll (): Promise<ReportDataSchemaEntityModel[]> {
    const result = await this.databaseHelper.query('SELECT * FROM report_data_schema')
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async update (reportDataSchema: ReportDataSchemaEntityModel): Promise<ReportDataSchemaEntityModel> {
    const query = `
    UPDATE report_data_schema 
    SET 
      jtd = $1,
      version = $2
    WHERE 
      report_data_schema_id = $3
    RETURNING *
  `
    const result = await this.databaseHelper.query(
      query,
      [
        reportDataSchema.jtd,
        reportDataSchema.version,
        reportDataSchema.reportDataSchemaId.value
      ]
    )

    const row = result.rows[0]
    return this.mapper(row)
  }

  async delete (reportDataSchemaId: IdValueObject): Promise<void> {
    await this.databaseHelper.query(
      'DELETE FROM report_data_schema WHERE report_data_schema_id = $1',
      [reportDataSchemaId.value]
    )
  }

  async getLatest (): Promise<ReportDataSchemaEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM report_data_schema ORDER BY created_at DESC LIMIT 1'
    )

    const row = result.rows[0]
    return this.mapper(row)
  }
}
