import { type DatabaseHelper } from '@/application/framework'
import { StateControlEntityModel, type IStateControlRepository } from '@/domain/report-geoserver'
import { type StringValueObject } from '@/domain/shared'

export class StateControlRepository implements IStateControlRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  private mapper (rows): StateControlEntityModel {
    if (!rows) return null

    return StateControlEntityModel.create({
      id: rows.id,
      workspaceStatus: rows.workspace_status,
      storeStatus: rows.store_status,
      layerStatus: rows.layer_status,
      stack: rows.stack
    })
  }

  async create (stateControl: StateControlEntityModel): Promise<StateControlEntityModel> {
    const query = `
        INSERT INTO state_control 
        (
          id,
          workspace_status, 
          store_status, 
          layer_status, 
          stack,
          created_at
        )
          VALUES ($1, $2, $3, $4, $5, NOW())
        RETURNING *
    `

    const result = await this.databaseHelper.query(
      query,
      [
        stateControl.id.value,
        stateControl.workspaceStatus.value,
        stateControl.storeStatus.value,
        stateControl.layerStatus.value,
        stateControl.stack.value
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getById (stateControlId: StringValueObject): Promise<StateControlEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM state_control WHERE id = $1',
      [stateControlId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getAll (): Promise<StateControlEntityModel[]> {
    const result = await this.databaseHelper.query('SELECT * FROM state_control')
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async update (stateControl: StateControlEntityModel): Promise<StateControlEntityModel> {
    const query = `
      UPDATE state_control
        SET workspace_status = $1,  
            store_status = $2, 
            layer_status = $3, 
            stack = $4,
            updated_at = NOW()
      WHERE id = $5
      RETURNING *
    `
    const result = await this.databaseHelper.query(
      query,
      [
        stateControl.workspaceStatus.value,
        stateControl.storeStatus.value,
        stateControl.layerStatus.value,
        stateControl.stack.value,
        stateControl.id.value
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async delete (stateControlId: StringValueObject): Promise<StateControlEntityModel> {
    const result = await this.databaseHelper.query(
      'DELETE FROM state_control WHERE id = $1 RETURNING *',
      [stateControlId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }
}
