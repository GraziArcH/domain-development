import { FilterValueTypeEntityModel, type IFilterValueTypeRepository } from '@/domain/report'
import { type IdValueObject } from '@/domain/shared'
import { type DatabaseHelper } from '@/application/framework'

export class FilterValueTypeRepository implements IFilterValueTypeRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  private mapper (rows): FilterValueTypeEntityModel {
    if (!rows) return null

    return FilterValueTypeEntityModel.create({
      filterValueTypeId: rows.filter_value_type_id,
      createdBy: rows.created_by,
      valueType: rows.value_type,
      active: rows.active
    })
  }

  async create (filterType: FilterValueTypeEntityModel): Promise<FilterValueTypeEntityModel> {
    const query = 'INSERT INTO filter_value_type (value_type, created_by, active, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *'
    const result = await this.databaseHelper.query(
      query,
      [
        filterType.valueType.value,
        filterType.createdBy.value,
        filterType.active
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getById (filterTypeId: IdValueObject): Promise<FilterValueTypeEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM filter_value_type WHERE filter_value_type_id = $1 AND active = true',
      [filterTypeId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getAll (): Promise<FilterValueTypeEntityModel[]> {
    const result = await this.databaseHelper.query('SELECT * FROM filter_value_type WHERE active = true')
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row).getValues())

    return models
  }

  async update (filterType: FilterValueTypeEntityModel): Promise<FilterValueTypeEntityModel> {
    const query = 'UPDATE filter_value_type SET value_type = $1, created_by = $2, active = $3 WHERE filter_value_type_id = $4 RETURNING *'
    const result = await this.databaseHelper.query(
      query,
      [
        filterType.valueType.value,
        filterType.createdBy.value,
        filterType.active,
        filterType.filterValueTypeId.value
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async delete (filterTypeId: IdValueObject): Promise<FilterValueTypeEntityModel> {
    const result = await this.databaseHelper.query(
      'DELETE FROM filter_value_type WHERE filter_value_type_id = $1 RETURNING *',
      [filterTypeId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }
}
