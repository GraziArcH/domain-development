import { StoreLayerEntityModel, type IStoreLayerRepository, type StoreLayerNameValueObject } from '@/domain/report-geoserver'
import { type DatabaseHelper } from '@/application/framework'
import { type IdValueObject } from '@/domain/shared'

export class StoreLayerRepository implements IStoreLayerRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  private mapper (rows): StoreLayerEntityModel {
    if (!rows) return null

    return StoreLayerEntityModel.create({
      id: rows.id,
      idWorkspace: rows.id_workspace,
      name: rows.name,
      description: rows.description,
      type: rows.type,
      endpoint: rows.endpoint,
      createdBy: rows.created_by
    })
  }

  async create (storeLayer: StoreLayerEntityModel): Promise<StoreLayerEntityModel> {
    const query = `
INSERT INTO store_layer (id_workspace, name, description, type, endpoint, created_by, created_at, updated_at)
VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
RETURNING *
`

    const result = await this.databaseHelper.query(
      query,
      [
        storeLayer.idWorkspace.value,
        storeLayer.name.value,
        storeLayer.description.value,
        storeLayer.type.value,
        storeLayer.endpoint.value,
        storeLayer.createdBy.value
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getById (storeLayerId: IdValueObject): Promise<StoreLayerEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM store_layer WHERE id = $1',
      [storeLayerId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getByName (storeLayerName: StoreLayerNameValueObject): Promise<StoreLayerEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM store_layer WHERE name = $1',
      [storeLayerName.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getAll (): Promise<StoreLayerEntityModel[]> {
    const result = await this.databaseHelper.query('SELECT * FROM store_layer')
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async update (storeLayer: StoreLayerEntityModel): Promise<StoreLayerEntityModel> {
    const query = `
      UPDATE store_layer
        SET name = $1, description = $2, type = $3, endpoint = $4, updated_at = NOW()
      WHERE id = $5
      RETURNING *
    `
    const result = await this.databaseHelper.query(
      query,
      [
        storeLayer.name.value,
        storeLayer.description.value,
        storeLayer.type.value,
        storeLayer.endpoint.value,
        storeLayer.id.value
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async delete (storeLayerId: IdValueObject): Promise<StoreLayerEntityModel> {
    const result = await this.databaseHelper.query(
      'DELETE FROM store_layer WHERE id = $1 RETURNING *',
      [storeLayerId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }
}
