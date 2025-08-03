import { WorkspaceEntityModel, type IWorkspaceRepository, type WorkspaceNameValueObject } from '@/domain/report-geoserver'
import { type DatabaseHelper } from '@/application/framework'
import { type IdValueObject } from '@/domain/shared'

export class WorkspaceRepository implements IWorkspaceRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  private mapper (rows): WorkspaceEntityModel {
    if (!rows) return null

    return WorkspaceEntityModel.create({
      id: rows.id,
      name: rows.name,
      description: rows.description
    })
  }

  async create (workspace: WorkspaceEntityModel): Promise<WorkspaceEntityModel> {
    const query = `
      INSERT INTO workspace 
      (name, description, created_at)
        VALUES 
      ($1, $2, NOW())
      RETURNING *
    `

    const result = await this.databaseHelper.query(
      query,
      [
        workspace.name.value,
        workspace.description.value
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getById (workspaceId: IdValueObject): Promise<WorkspaceEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM workspace WHERE id = $1',
      [workspaceId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getByName (workspaceName: WorkspaceNameValueObject): Promise<WorkspaceEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM workspace WHERE name = $1',
      [workspaceName.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getAll (): Promise<WorkspaceEntityModel[]> {
    const result = await this.databaseHelper.query('SELECT * FROM workspace')
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async update (workspace: WorkspaceEntityModel): Promise<WorkspaceEntityModel> {
    const query = `
      UPDATE workspace
        SET name = $1, description = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING *
    `

    const result = await this.databaseHelper.query(
      query,
      [
        workspace.name.value,
        workspace.description.value,
        workspace.id.value
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async delete (workspaceId: IdValueObject): Promise<WorkspaceEntityModel> {
    const result = await this.databaseHelper.query(
      'DELETE FROM workspace WHERE id = $1 RETURNING *',
      [workspaceId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }
}
