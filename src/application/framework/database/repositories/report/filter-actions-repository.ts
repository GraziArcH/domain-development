import { FilterActionsEntityModel, type IFilterActionsRepository } from '@/domain/report'
import { type DatabaseHelper } from '@/application/framework'
import { type IdValueObject } from '@/domain/shared'

export class FilterActionsRepository implements IFilterActionsRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  private mapper (rows): FilterActionsEntityModel {
    if (!rows) return null

    return FilterActionsEntityModel.create(
      {
        filterActionId: rows.filter_action_id,
        action: rows.action,
        createdBy: rows.created_by,
        active: rows.active
      }
    )
  }

  async create (filter: FilterActionsEntityModel): Promise<FilterActionsEntityModel> {
    const query = `
      INSERT INTO filter_actions
      (action, created_by, active, created_at)
        VALUES 
      ($1, $2, $3, NOW()) RETURNING *
    `

    const result = await this.databaseHelper.query(
      query,
      [
        filter.action,
        filter.createdBy,
        filter.active
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getById (filterId: IdValueObject): Promise<FilterActionsEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM filter_actions WHERE filter_action_id = $1 AND active = true',
      [filterId.value]
    )
    const rows = result.rows

    return this.mapper(rows[0])
  }

  async getAll (): Promise<FilterActionsEntityModel[]> {
    const result = await this.databaseHelper.query('SELECT * FROM filter_actions WHERE active = true')
    const rows = result.rows

    const models = rows.map(row => this.mapper(row))

    return models
  }

  async update (filter: FilterActionsEntityModel): Promise<FilterActionsEntityModel> {
    const query = `
      UPDATE filter_actions
        SET action = $1, 
        created_by = $2,
        active = $3
      WHERE filter_action_id = $4
      RETURNING *
    `

    const result = await this.databaseHelper.query(
      query,
      [
        filter.action,
        filter.createdBy,
        filter.active,
        filter.filterActionId
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async delete (filterId: IdValueObject): Promise<FilterActionsEntityModel> {
    const result = await this.databaseHelper.query(
      'DELETE FROM filter_actions WHERE filter_action_id = $1 RETURNING *',
      [filterId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }
}
