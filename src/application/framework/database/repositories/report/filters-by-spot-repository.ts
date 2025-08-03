import { FiltersBySpotEntityModel, type IFiltersBySpotRepository } from '@/domain/report'
import { type DatabaseHelper } from '@/application/framework'
import { type IdValueObject } from '@/domain/shared'

export class FiltersBySpotRepository implements IFiltersBySpotRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  private mapper (rows): FiltersBySpotEntityModel {
    if (!rows) return null

    return FiltersBySpotEntityModel.create(
      {
        active: rows.active,
        createdBy: rows.created_by,
        filtersBySpotId: rows.filter_by_spot_id,
        spotTemplateId: rows.spot_template_id,
        filterId: rows.filter_id
      }
    )
  }

  async create (filtersBySpot: FiltersBySpotEntityModel): Promise<FiltersBySpotEntityModel> {
    const result = await this.databaseHelper.query(
        `
        INSERT INTO 
          filter_by_spot 
          (
            filter_id,
            spot_template_id,
            created_by,
            active,
            created_at
          ) 
        VALUES 
          (
            $1, 
            $2,
            $3,
            $4,
            NOW()
          ) RETURNING *
                    `,
        [
          filtersBySpot.filterId.value,
          filtersBySpot.spotTemplateId.value,
          filtersBySpot.createdBy.value,
          filtersBySpot.active
        ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getById (filtersBySpotId: IdValueObject): Promise<FiltersBySpotEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM filter_by_spot WHERE filter_by_spot_id = $1 AND active = true',
      [filtersBySpotId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getAll (): Promise<FiltersBySpotEntityModel[]> {
    const result = await this.databaseHelper.query('SELECT * FROM filter_by_spot WHERE active = true')
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async update (filtersBySpot: FiltersBySpotEntityModel): Promise<FiltersBySpotEntityModel> {
    const result = await this.databaseHelper.query(
        `
        UPDATE filter_by_spot 
          SET 
          filter_id = $1,
          spot_template_id = $2,
          created_by = $3,
          active = $4
        WHERE filter_by_spot_id = $5 RETURNING *
        `,
        [
          filtersBySpot.filterId.value,
          filtersBySpot.spotTemplateId.value,
          filtersBySpot.createdBy.value,
          filtersBySpot.active,
          filtersBySpot.filtersBySpotId.value
        ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async delete (filtersBySpotId: IdValueObject): Promise<FiltersBySpotEntityModel> {
    const result = await this.databaseHelper.query(
      'DELETE FROM filter_by_spot WHERE filter_by_spot_id = $1 RETURNING *',
      [filtersBySpotId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async removeFilterFromTemplate (templateId: IdValueObject, filterId: IdValueObject): Promise<FiltersBySpotEntityModel> {
    const result = await this.databaseHelper.query(
      'DELETE FROM filter_by_spot WHERE spot_template_id = $1 AND filter_id = $2 RETURNING *',
      [templateId.value, filterId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }
}
