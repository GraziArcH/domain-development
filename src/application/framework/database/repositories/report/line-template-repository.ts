import {
  LineTemplateEntityModel,
  type ILineTemplateRepository
} from '@/domain/report'
import { type DatabaseHelper } from '@/application/framework'
import { type IdValueObject } from '@/domain/shared'

export class LineTemplateRepository implements ILineTemplateRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) {}

  private mapper (rows): LineTemplateEntityModel {
    if (!rows) return null

    return LineTemplateEntityModel.create({
      lineTemplateId: rows.line_template_id,
      title: rows.line_title,
      createdBy: rows.created_by,
      reportTemplateId: rows.report_template_id,
      active: rows.active,
      draggable: rows.draggable,
      lineOrder: rows.line_order,
      name: rows.line_name
    })
  }

  async create (
    lineTemplate: LineTemplateEntityModel
  ): Promise<LineTemplateEntityModel> {
    const query = `
      INSERT INTO line_template 
      (report_template_id, line_name, line_title, line_order, draggable, created_at, created_by, active) 
        VALUES 
      ($1, $2, $3, $4, $5, NOW(), $6, $7) RETURNING *
    `
    const result = await this.databaseHelper.query(query, [
      lineTemplate.reportTemplateId.value,
      lineTemplate.name.value,
      lineTemplate.title.value,
      lineTemplate.lineOrder.value,
      lineTemplate.draggable,
      lineTemplate.createdBy.value,
      lineTemplate.active
    ])

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getById (
    lineTemplateId: IdValueObject
  ): Promise<LineTemplateEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM line_template WHERE line_template_id = $1 AND active = true',
      [lineTemplateId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getByReportTemplateId (
    reportTemplateId: IdValueObject
  ): Promise<LineTemplateEntityModel[]> {
    const query = 'SELECT * FROM line_template WHERE report_template_id = $1;'
    const result = await this.databaseHelper.query(query, [
      reportTemplateId.value
    ])
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async getAll (): Promise<LineTemplateEntityModel[]> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM line_template WHERE active = true'
    )
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async update (
    lineTemplate: LineTemplateEntityModel
  ): Promise<LineTemplateEntityModel> {
    const query = `
      UPDATE line_template
        SET line_title = $1, 
            report_template_id = $2, 
            created_by = $3, 
            active = $4, 
            draggable = $5, 
            line_order = $6,
            line_name = $7
      WHERE line_template_id = $8 RETURNING *
    `
    const result = await this.databaseHelper.query(query, [
      lineTemplate.title.value,
      lineTemplate.reportTemplateId.value,
      lineTemplate.createdBy.value,
      lineTemplate.active,
      lineTemplate.draggable,
      lineTemplate.lineOrder.value,
      lineTemplate.name.value,
      lineTemplate.lineTemplateId.value
    ])

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async delete (
    lineTemplateId: IdValueObject
  ): Promise<LineTemplateEntityModel> {
    const result = await this.databaseHelper.query(
      'DELETE FROM line_template WHERE line_template_id = $1 RETURNING *',
      [lineTemplateId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }
}
