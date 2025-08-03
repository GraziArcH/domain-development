import { SpotTypeEntityModel, type ISpotTypeRepository } from '@/domain/report'
import { type DatabaseHelper } from '@/application/framework'
import { type IdValueObject, type StringValueObject } from '@/domain/shared'

export class SpotTypeRepository implements ISpotTypeRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  private mapper (rows): SpotTypeEntityModel {
    if (!rows) return null

    return SpotTypeEntityModel.create(
      {
        spotTypeId: rows.spot_type_id,
        spotTypeName: rows.spot_type_name,
        description: rows.description,
        active: rows.active,
        createdBy: rows.created_by,
        spotData: rows.spot_data_format
      }
    )
  }

  async create (spotType: SpotTypeEntityModel): Promise<SpotTypeEntityModel> {
    const result = await this.databaseHelper.query(
      `
        INSERT INTO spot_type 
        (spot_type_name, description, active, created_by, spot_data_format, created_at)
          VALUES 
        ($1, $2, $3, $4, $5, NOW()) RETURNING *
      `,
      [
        spotType.spotTypeName.value,
        spotType.description.value,
        spotType.active,
        spotType.createdBy.value,
        JSON.stringify(spotType.spotData)
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getById (spotTypeId: IdValueObject): Promise<SpotTypeEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM spot_type WHERE spot_type_id = $1 AND active = true',
      [spotTypeId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getSpotTypeByName (name: StringValueObject): Promise<SpotTypeEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM spot_type WHERE spot_type_name = $1 AND active = true',
      [name.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getAll (): Promise<SpotTypeEntityModel[]> {
    const result = await this.databaseHelper.query('SELECT * FROM spot_type WHERE active = true')
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async update (spotType: SpotTypeEntityModel): Promise<SpotTypeEntityModel> {
    const result = await this.databaseHelper.query(
      `
        UPDATE spot_type
          SET spot_type_name = $1, description = $2, active = $3, created_by = $4, spot_data_format = $5
        WHERE spot_type_id = $6 RETURNING *
      `,
      [
        spotType.spotTypeName.value,
        spotType.description.value,
        spotType.active,
        spotType.createdBy.value,
        JSON.stringify(spotType.spotData),
        spotType.spotTypeId.value
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async delete (spotTypeId: IdValueObject): Promise<SpotTypeEntityModel> {
    const result = await this.databaseHelper.query(
      'DELETE FROM spot_type WHERE spot_type_id = $1 RETURNING *',
      [spotTypeId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }
}
