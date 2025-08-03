import { ReportTemplateEntityModel, type ReportTemplateVersionValueObject, type IReportTemplateRepository, type ReportTemplateNameValueObject } from '@/domain/report'
import { type DatabaseHelper } from '@/application/framework'
import { type DateValueObject, type StringValueObject, type IdValueObject } from '@/domain/shared'
import { type StatusValueObject } from '../../../../../domain/report/value-objects/report-template/report-template-status/report-template-status-value-object'

export class ReportTemplateRepository implements IReportTemplateRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  private mapper (rows): ReportTemplateEntityModel {
    if (!rows) return null

    for (const key in rows.data_purge_period) {
      if (key === 'years' || key === 'days') rows.data_purge_period = `${rows.data_purge_period[key]} ${key}`
    }

    for (const key in rows.cache_purge_period) {
      if (key === 'years' || key === 'days') rows.cache_purge_period = `${rows.cache_purge_period[key]} ${key}`
    }

    return ReportTemplateEntityModel.create(
      {
        reportTemplateId: rows.template_id,
        reportTypeId: rows.report_type_id,
        reportName: rows.template_name,
        title: rows.title,
        description: rows.description,
        numberOfLines: rows.number_of_lines,
        cachePurgePeriod: rows.cache_purge_period,
        version: rows.version,
        createdBy: rows.created_by,
        active: rows.active,
        draft: rows.draft,
        formatting: rows.formatting,
        path: rows.path,
        status: rows.status,
        updatedAt: rows.updated_at
      }
    )
  }

  async create (reportTemplate: ReportTemplateEntityModel): Promise<ReportTemplateEntityModel> {
    const query = `
      INSERT INTO report_template
      (
        template_name, 
        title, 
        description, 
        number_of_lines, 
        cache_purge_period, 
        version, 
        active, 
        created_by,
        draft,
        formatting,
        path,
        report_type_id,
        created_at
      )
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW()) RETURNING *
    `

    const result = await this.databaseHelper.query(
      query,
      [
        reportTemplate.reportName.value,
        reportTemplate.title.value,
        reportTemplate.description.value,
        reportTemplate.numberOfLines.value,
        reportTemplate.cachePurgePeriod.value,
        reportTemplate.version.value,
        reportTemplate.active,
        reportTemplate.createdBy.value,
        reportTemplate.draft,
        JSON.stringify(reportTemplate.formatting),
        reportTemplate.path.value,
        reportTemplate.reportTypeId.value
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getById (reportTemplateId: IdValueObject): Promise<ReportTemplateEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM report_template WHERE template_id = $1 AND active = true',
      [reportTemplateId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getByReportTemplateName (reportTemplateName: ReportTemplateNameValueObject): Promise<ReportTemplateEntityModel> {
    const query = 'SELECT * FROM report_template rt WHERE  rt.template_name = $1 AND active = true;'
    const result = await this.databaseHelper.query(
      query,
      [reportTemplateName.value]
    )
    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getReportTemplateByNameAndVersion (reportTemplateName: ReportTemplateNameValueObject, reportTemplateVersion: ReportTemplateVersionValueObject): Promise<ReportTemplateEntityModel> {
    const query = 'SELECT * FROM report_template rt WHERE rt.template_name = $1 AND rt.version = $2 AND active = true;'
    const result = await this.databaseHelper.query(
      query,
      [reportTemplateName.value,
        reportTemplateVersion.value
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getReportTemplateByTemplateIdWithAnyActiveStatus (reportTemplateId: IdValueObject): Promise<ReportTemplateEntityModel> {
    const query = 'SELECT * FROM report_template rt WHERE rt.template_id = $1'
    const result = await this.databaseHelper.query(
      query,
      [reportTemplateId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getByReportTypeId (reportTypeId: IdValueObject): Promise<ReportTemplateEntityModel[]> {
    const query = 'SELECT * FROM report_template rt WHERE rt.report_type_id = $1 AND active = true;'
    const result = await this.databaseHelper.query(
      query,
      [reportTypeId.value]
    )
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async getAll (): Promise<ReportTemplateEntityModel[]> {
    const result = await this.databaseHelper.query('SELECT * FROM report_template WHERE active = true')
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async update (reportTemplate: ReportTemplateEntityModel): Promise<ReportTemplateEntityModel> {
    const query = `
      UPDATE report_template
      SET template_name = $1, 
          title = $2, 
          description = $3, 
          number_of_lines = $4,
          cache_purge_period = $5, 
          version = $6, 
          active = $7,
          created_by = $8,
          draft = $9,
          formatting = $10,
          path = $11,
          report_type_id = $12
      WHERE template_id = $13 RETURNING *
    `
    const result = await this.databaseHelper.query(
      query,
      [
        reportTemplate.reportName.value,
        reportTemplate.title.value,
        reportTemplate.description.value,
        reportTemplate.numberOfLines.value,
        reportTemplate.cachePurgePeriod.value,
        reportTemplate.version.value,
        reportTemplate.active,
        reportTemplate.createdBy.value,
        reportTemplate.draft,
        JSON.stringify(reportTemplate.formatting),
        reportTemplate.path.value,
        reportTemplate.reportTypeId.value,
        reportTemplate.reportTemplateId.value
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  // Método para ativar o report template
  async activateReport (reportTemplateName: StringValueObject, version: StringValueObject): Promise<void> {
    const query = `
      UPDATE report_template
      SET active = true,
          draft = false
      WHERE template_name = $1
        AND version = $2;
    `

    // Executa a query passando o nome do template e a versão como parâmetros
    await this.databaseHelper.query(query, [reportTemplateName, version])
  }

  async updateStatus (status: StatusValueObject, updatedAt: DateValueObject, reportTemplateName: ReportTemplateNameValueObject): Promise<ReportTemplateEntityModel> {
    const query = `
      UPDATE report_template
      SET status = $1, 
          updated_at = $2
      WHERE template_name = $3 RETURNING *
    `
    const result = await this.databaseHelper.query(
      query,
      [
        status.value,
        updatedAt.value,
        reportTemplateName.value
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async delete (reportTemplateId: IdValueObject): Promise<ReportTemplateEntityModel> {
    const result = await this.databaseHelper.query(
      'DELETE FROM report_template WHERE template_id = $1 RETURNING *',
      [reportTemplateId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }
}
