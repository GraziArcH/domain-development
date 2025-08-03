import { CustomSpotEntityModel, type ICustomSpotRepository } from '@/domain/report'
import { type IdValueObject, type StringValueObject } from '@/domain/shared'
import { type DatabaseHelper } from '@/application/framework'

export class CustomSpotRepository implements ICustomSpotRepository {
  constructor(private readonly databaseHelper: DatabaseHelper) { }

  private mapper(rows): CustomSpotEntityModel {
    if (!rows) return null

    return CustomSpotEntityModel.create(
      {
        customSpotId: rows.custom_spot_id,
        spotTemplateName: rows.spot_template_name,
        userId: rows.user_id,
        filters: rows.filters,
        order: rows.order,
        spotTypeName: rows?.spot_type_name
      }
    )
  }

  async create(customSpot: CustomSpotEntityModel): Promise<CustomSpotEntityModel> {
    const query = `
      INSERT INTO pinned
      (spot_template_name, filters, user_id, "order")
        VALUES 
      ($1, $2, $3, $4) RETURNING *
    `

    const result = await this.databaseHelper.query(
      query,
      [
        customSpot.spotTemplateName.value,
        customSpot.filters.value,
        customSpot.userId.value,
        customSpot.order.value
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getBySpotNameAndFilter(spotName: StringValueObject, filters: object): Promise<CustomSpotEntityModel | null> {
    const query = `
      SELECT cs.*, stp.spot_type_name FROM pinned cs
        INNER JOIN spot_template stl ON cs.spot_template_name = stl.spot_template_name 
        INNER JOIN spot_type stp ON stp.spot_type_id = stl.spot_type_id 
      WHERE stl.spot_template_name  = $1 AND cs.filters = $2
    `

    const result = await this.databaseHelper.query(
      query,
      [spotName.value, JSON.stringify(filters)]
    )
    const rows = result.rows

    return this.mapper(rows[0])
  }

  async getById(customSpotId: IdValueObject): Promise<CustomSpotEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM pinned WHERE custom_spot_id = $1',
      [customSpotId.value]
    )
    const rows = result.rows

    return this.mapper(rows[0])
  }

  async getByUserId(userId: IdValueObject): Promise<CustomSpotEntityModel[]> {
    const query = `
    SELECT cs.*, stp.spot_type_name FROM pinned cs
      INNER JOIN spot_template stl ON cs.spot_template_name = stl.spot_template_name 
      INNER JOIN spot_type stp ON stp.spot_type_id = stl.spot_type_id 
    WHERE cs.user_id = $1
  `
    const result = await this.databaseHelper.query(
      query,
      [userId.value]
    )
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async delete(customSpotId: IdValueObject): Promise<CustomSpotEntityModel> {
    const result = await this.databaseHelper.query(
      'DELETE FROM pinned WHERE custom_spot_id = $1 RETURNING *',
      [customSpotId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }
}
