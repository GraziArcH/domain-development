import { FilterClassificationEntityModel, type IFilterClassificationRepository } from '@/domain/report'
import { type IdValueObject } from '@/domain/shared'
import { type DatabaseHelper } from '@/application/framework'

export class FilterClassificationRepository implements IFilterClassificationRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  private mapper (rows): FilterClassificationEntityModel {
    if (!rows) return null

    return FilterClassificationEntityModel.create(
      {
        filterClassificationId: rows.filter_classification_id,
        classification: rows.classification,
        createdBy: rows.created_by,
        active: rows.active
      }
    )
  }

  async create (filter: FilterClassificationEntityModel): Promise<FilterClassificationEntityModel> {
    const query = `
        INSERT INTO filter_classification (
          classification,
          created_by,
          active,
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
        filter.classification.value,
        filter.createdBy.value,
        filter.active
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getById (filterId: IdValueObject): Promise<FilterClassificationEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM filter_classification WHERE filter_classification_id = $1 AND active = true',
      [filterId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getAll (): Promise<FilterClassificationEntityModel[]> {
    const result = await this.databaseHelper.query('SELECT * FROM filter_classification WHERE active = true')
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async update (filter: FilterClassificationEntityModel): Promise<FilterClassificationEntityModel> {
    const query = 'UPDATE filter_classification SET classification = $1, created_by = $2, active = $3 WHERE filter_classification_id = $4 RETURNING *'
    const result = await this.databaseHelper.query(
      query,
      [
        filter.classification.value,
        filter.createdBy.value,
        filter.active,
        filter.filterClassificationId.value
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async delete (filterId: IdValueObject): Promise<FilterClassificationEntityModel> {
    const result = await this.databaseHelper.query(
      'DELETE FROM filter_classification WHERE filter_classification_id = $1 RETURNING *',
      [filterId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }
}
