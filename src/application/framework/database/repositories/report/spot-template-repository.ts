import {
  PurgeTimeDTO,
  SpotTemplateEntityModel,
  type ISpotTemplateRepository,
  type SpotTemplateNameValueObject
} from '@/domain/report'
import { type DatabaseHelper } from '@/application/framework'
import { type IdValueObject } from '@/domain/shared'

export class SpotTemplateRepository implements ISpotTemplateRepository {
  constructor(private readonly databaseHelper: DatabaseHelper) { }

  private mapper(rows): SpotTemplateEntityModel {
    if (!rows) return null

    return SpotTemplateEntityModel.create({
      spotTemplateId: rows.spot_template_id,
      spotTemplateName: rows.spot_template_name,
      spotTitle: rows.spot_title,
      description: rows.description,
      spotLegend: rows.spot_legend,
      version: rows.version,
      spotTypeId: rows.spot_type_id,
      createdBy: rows.created_by,
      active: rows.active,
      draft: rows.draft,
      formatting: rows.formatting,
      spotOrder: rows.spot_order,
      dataPurgeTime: rows.data_purge_time
    })
  }

  private mapperWithForeignKeyData(rows): SpotTemplateEntityModel {
    if (!rows) return null

    return SpotTemplateEntityModel.create({
      spotTemplateId: rows.spot_template_id,
      spotTemplateName: rows.spot_template_name,
      spotTitle: rows.spot_title,
      description: rows.description,
      spotLegend: rows.spot_legend,
      version: rows.version,
      spotTypeId: rows.spot_type_id,
      createdBy: rows.created_by,
      active: rows.active,
      draft: rows.draft,
      formatting: rows.formatting,
      spotOrder: rows.spot_order,
      dataPurgeTime: rows.data_purge_time,
      spotType: rows.spot_type_spot_type_id
        ? {
          spotTypeId: rows.spot_type_spot_type_id,
          spotTypeName: rows.spot_type_spot_type_name,
          description: rows.spot_type_description,
          active: rows.spot_type_active,
          createdBy: rows.spot_type_created_by,
          spotData: rows.spot_type_spot_data_format
        }
        : null
    })
  }

  async create(
    spotTemplate: SpotTemplateEntityModel
  ): Promise<SpotTemplateEntityModel> {
    const result = await this.databaseHelper.query(
      `
        INSERT INTO spot_template
        (
          spot_template_name, 
          spot_title, 
          description, 
          spot_legend, 
          version, 
          active, 
          spot_type_id, 
          created_by, 
          draft,
          formatting,
          data_purge_time,
          created_at
        )
          VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW()) RETURNING *
        `,
      [
        spotTemplate.spotTemplateName.value,
        spotTemplate.spotTitle.value,
        spotTemplate.description.value,
        spotTemplate.spotLegend.value,
        spotTemplate.version.value,
        spotTemplate.active,
        spotTemplate.spotTypeId.value,
        spotTemplate.createdBy.value,
        spotTemplate.draft,
        JSON.stringify(spotTemplate.formatting),
        spotTemplate.dataPurgeTime
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getById(
    spotTemplateId: IdValueObject
  ): Promise<SpotTemplateEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM spot_template WHERE spot_template_id = $1',
      [spotTemplateId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getByName(
    spotTemplateName: SpotTemplateNameValueObject
  ): Promise<SpotTemplateEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM spot_template WHERE spot_template_name = $1',
      [spotTemplateName.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async findTemplates(filter: {
    name?: string
    active?: boolean
    draft?: boolean
  }): Promise<SpotTemplateEntityModel[]> {
    let query = 'SELECT * FROM spot_template WHERE '
    const conditions = []
    const parameters = []
    let count = 1

    if (filter.active !== undefined) {
      conditions.push(`active = $${count++}`)
      parameters.push(filter.active)
    }
    if (filter.draft !== undefined) {
      conditions.push(`draft = $${count++}`)
      parameters.push(filter.draft)
    }
    if (filter.name) {
      conditions.push(`spot_template_name = $${count++}`)
      parameters.push(filter.name)
    }

    query += conditions.join(' AND ')

    const result = await this.databaseHelper.query(query, parameters)
    return result.rows.map((x) => this.mapper(x))
  }

  async getByLineTemplateId(
    lineTemplateId: IdValueObject
  ): Promise<SpotTemplateEntityModel[]> {
    const result = await this.databaseHelper.query(
      `
        SELECT 
            st.*, 
            sbl.spot_order,
            stp.spot_type_id AS spot_type_spot_type_id,
            stp.spot_type_name AS spot_type_spot_type_name,
            stp.description AS spot_type_description,
            stp.active AS spot_type_active,
            stp.created_by AS spot_type_created_by,
            stp.spot_data_format AS spot_type_spot_data_format,
            stp.created_at AS spot_type_created_at
          FROM spot_template st
            INNER JOIN spot_by_line sbl ON st.spot_template_name = sbl.spot_template_name
            INNER JOIN spot_type stp ON stp.spot_type_id = st.spot_type_id
          WHERE sbl.line_template_id = $1 AND sbl.active = TRUE;
      `,
      [lineTemplateId.value]
    )
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapperWithForeignKeyData(row))

    return models
  }

  async getAll(): Promise<SpotTemplateEntityModel[]> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM spot_template WHERE active = true'
    )
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async update(
    spotTemplate: SpotTemplateEntityModel
  ): Promise<SpotTemplateEntityModel> {
    const result = await this.databaseHelper.query(
      `
        UPDATE spot_template
          SET spot_template_name = $1, 
              spot_title = $2, 
              description = $3, 
              spot_legend = $4, 
              version = $5, 
              active = $6, 
              spot_type_id = $7, 
              created_by = $8,
              draft = $9,
              formatting = $10,
              data_purge_time = $11
        WHERE spot_template_id = $12 RETURNING *
        `,
      [
        spotTemplate.spotTemplateName.value,
        spotTemplate.spotTitle.value,
        spotTemplate.description.value,
        spotTemplate.spotLegend.value,
        spotTemplate.version.value,
        spotTemplate.active,
        spotTemplate.spotTypeId.value,
        spotTemplate.createdBy.value,
        spotTemplate.draft,
        JSON.stringify(spotTemplate.formatting),
        spotTemplate.dataPurgeTime,
        spotTemplate.spotTemplateId.value
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async softDelete(spotTemplateId: number): Promise<SpotTemplateEntityModel> {
    const query = `
      UPDATE spot_template
        SET active = false
      WHERE spot_template_id = $1 RETURNING *
    `
    const result = await this.databaseHelper.query(query, [spotTemplateId])
    return this.mapper(result.rows[0])
  }

  async deactivateOthersByName(name: string): Promise<void> {
    const query = `
      UPDATE spot_template
        SET active = false
      WHERE spot_template_name = $1 AND active = true
    `
    await this.databaseHelper.query(query, [name])
  }

  async delete(
    spotTemplateId: IdValueObject
  ): Promise<SpotTemplateEntityModel> {
    const result = await this.databaseHelper.query(
      'DELETE FROM spot_template WHERE spot_template_id = $1 RETURNING *',
      [spotTemplateId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getAllPurgeTimes(): Promise<PurgeTimeDTO[]> {
    const result = await this.databaseHelper.query(
      'SELECT data_purge_time, spot_template_name FROM spot_template WHERE data_purge_time IS NOT NULL'
    )
    const rows = result.rows
    return rows.map((x) => ({
      dataPurgeTime: x.data_purge_time,
      spotTemplateName: x.spot_template_name
    }))
  }
}
