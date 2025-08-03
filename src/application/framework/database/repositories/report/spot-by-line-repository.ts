import { SpotByLineEntityModel, type ISpotByLineRepository } from '@/domain/report'
import { type DatabaseHelper } from '@/application/framework'
import { type IdValueObject } from '@/domain/shared'

export class SpotByLineRepository implements ISpotByLineRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  private mapper (rows): SpotByLineEntityModel {
    if (!rows) return null

    return SpotByLineEntityModel.create(
      {
        spotByLineId: rows.spot_by_line_id,
        lineTemplateId: rows.line_template_id,
        spotTemplateName: rows.spot_template_name,
        active: rows.active,
        createdBy: rows.created_by,
        spotOrder: rows.spot_order
      }
    )
  }

  async create (spotByLine: SpotByLineEntityModel): Promise<SpotByLineEntityModel> {
    const query = `
      INSERT INTO spot_by_line 
      (line_template_id, spot_template_name, created_by, active, created_at, spot_order) 
        VALUES 
      ($1, $2, $3, $4, NOW(), $5) RETURNING *
    `
    const result = await this.databaseHelper.query(
      query,
      [
        spotByLine.lineTemplateId.value,
        spotByLine.spotTemplateName.value,
        spotByLine.createdBy.value,
        spotByLine.active,
        spotByLine.spotOrder.value
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getById (spotByLineId: IdValueObject): Promise<SpotByLineEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM spot_by_line WHERE spot_by_line_id = $1 AND active = true',
      [spotByLineId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getAll (): Promise<SpotByLineEntityModel[]> {
    const result = await this.databaseHelper.query('SELECT * FROM spot_by_line WHERE active = true')
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async update (spotByLine: SpotByLineEntityModel): Promise<SpotByLineEntityModel> {
    const query = `
      UPDATE spot_by_line
        SET line_template_id = $1, spot_template_name = $2, created_by = $3, active = $4, spot_order = $5
      WHERE spot_by_line_id = $6 RETURNING *
    `
    const result = await this.databaseHelper.query(
      query,
      [
        spotByLine.lineTemplateId.value,
        spotByLine.spotTemplateName.value,
        spotByLine.createdBy.value,
        spotByLine.active,
        spotByLine.spotOrder.value,
        spotByLine.spotByLineId.value
      ]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async delete (spotByLineId: IdValueObject): Promise<SpotByLineEntityModel> {
    const result = await this.databaseHelper.query(
      'DELETE FROM spot_by_line WHERE spot_by_line_id = $1 RETURNING *',
      [spotByLineId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getSpotByLineByLineTemplateId (lineTemplateId: IdValueObject): Promise<SpotByLineEntityModel[]> {
    const query = `
      SELECT * 
      FROM spot_by_line
      WHERE line_template_id = $1
        AND active = true;
    `

    // Executa a query e recebe o resultado
    const result = await this.databaseHelper.query(query, [lineTemplateId.value])

    const rows = result.rows

    // Inicializa a lista de models
    const models: SpotByLineEntityModel[] = []

    // Itera pelas linhas retornadas e mapeia para o modelo usando o mapper
    for (const row of rows) {
      models.push(this.mapper(row))
    }

    // Retorna a lista de SpotByLineEntityModel
    return models
  }
}
