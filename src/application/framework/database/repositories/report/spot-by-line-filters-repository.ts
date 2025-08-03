import {
  SpotByLineFiltersEntityModel,
  type ISpotByLineFiltersRepository
} from '@/domain/report'
import { type DatabaseHelper } from '@/application/framework'
import { type IdValueObject } from '@/domain/shared'

export class SpotByLineFiltersRepository
implements ISpotByLineFiltersRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  private mapper (rows): SpotByLineFiltersEntityModel {
    if (!rows) return null

    return SpotByLineFiltersEntityModel.create({
      spotByLineFiltersId: rows.spot_by_line_filters_id,
      spotByLineId: rows.spot_by_line_id,
      parentFilterId: rows.parent_filter_id,
      visible: rows.visible,
      defaultValue: rows.default_filter_id,
      active: rows.active,
      createdBy: rows.created_by
    })
  }

  async create (
    spotByLinePrimaryFilters: SpotByLineFiltersEntityModel
  ): Promise<SpotByLineFiltersEntityModel> {
    const query = `
      INSERT INTO spot_by_line_filters
      (spot_by_line_id, parent_filter_id, visible, default_filter_id, active, created_by, created_at)
        VALUES 
      ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *
    `
    const result = await this.databaseHelper.query(query, [
      spotByLinePrimaryFilters.spotByLineId.value,
      spotByLinePrimaryFilters.parentFilterId.value,
      spotByLinePrimaryFilters.visible,
      spotByLinePrimaryFilters.defaultValue,
      spotByLinePrimaryFilters.active,
      spotByLinePrimaryFilters.createdBy.value
    ])

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getById (
    spotByLineFiltersId: IdValueObject
  ): Promise<SpotByLineFiltersEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM spot_by_line_filters WHERE spot_by_line_filters_id = $1 AND active = true',
      [spotByLineFiltersId.value]
    )
    const rows = result.rows

    return this.mapper(rows[0])
  }

  async getAll (): Promise<SpotByLineFiltersEntityModel[]> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM spot_by_line_filters WHERE active = true'
    )
    const rows = result.rows

    const models = rows.map((row) => this.mapper(row))

    return models
  }

  async update (
    spotByLinePrimaryFilters: SpotByLineFiltersEntityModel
  ): Promise<SpotByLineFiltersEntityModel> {
    const query = `
      UPDATE spot_by_line_filters
        SET spot_by_line_id = $1, 
            parent_filter_id = $2, 
            visible = $3, 
            default_filter_id = $4,
            active = $5, 
            created_by = $6
      WHERE spot_by_line_filters_id = $7
      RETURNING *
    `
    const result = await this.databaseHelper.query(query, [
      spotByLinePrimaryFilters.spotByLineId.value,
      spotByLinePrimaryFilters.parentFilterId.value,
      spotByLinePrimaryFilters.visible,
      spotByLinePrimaryFilters.defaultValue,
      spotByLinePrimaryFilters.active,
      spotByLinePrimaryFilters.createdBy.value,
      spotByLinePrimaryFilters.spotByLineFiltersId.value
    ])

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async delete (
    spotByLineFiltersId: IdValueObject
  ): Promise<SpotByLineFiltersEntityModel> {
    const result = await this.databaseHelper.query(
      'DELETE FROM spot_by_line_filters WHERE spot_by_line_filters_id = $1 RETURNING *',
      [spotByLineFiltersId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async updateFiltersByLine (
    lineTemplateId: IdValueObject,
    filterId: IdValueObject,
    visible?: boolean,
    defaultFilterIds?: IdValueObject[]
  ): Promise<void> {
    const query = `
      UPDATE spot_by_line_filters
      SET 
        visible = $1,
        default_filter_id = $2,
        updated_at = CURRENT_TIMESTAMP
      WHERE 
        spot_by_line_id IN (
          SELECT spot_by_line_id
          FROM spot_by_line
          WHERE line_template_id = $3
        )
      AND
        parent_filter_id = $4;
    `

    // Se defaultFilterIds estiver definido, converte para um array de números
    const defaultFilterArray = defaultFilterIds
      ? defaultFilterIds.map((idObject) => idObject.value) // Mapeia para os valores numéricos
      : null

    // Executa a query com os parâmetros passados
    await this.databaseHelper.query(query, [
      visible !== undefined ? visible : null, // Se visível foi passado, usa, senão mantém o valor atual
      defaultFilterArray, // Formata o array para PostgreSQL
      lineTemplateId.value, // ID da linha (line_template_id)
      filterId.value // ID do filtro (parent_filter_id)
    ])
  }

  // Mapper para SpotByLineFilters
  private mapperFilter (row): SpotByLineFiltersEntityModel {
    if (!row) return null

    return SpotByLineFiltersEntityModel.create({
      spotByLineFiltersId: row.spot_by_line_filters_id,
      spotByLineId: row.spot_by_line_id,
      parentFilterId: row.parent_filter_id,
      visible: row.visible,
      defaultValue: row.default_filter_id, // Considerando que `default_filter_id` seja um array de números
      createdBy: row.created_by,
      active: row.active
    })
  }

  async getSpotByLineFiltersBySpotByLineId (
    spotByLineId: IdValueObject
  ): Promise<SpotByLineFiltersEntityModel[]> {
    const query = `
      SELECT * 
      FROM spot_by_line_filters
      WHERE spot_by_line_id = $1
        AND active = true;
    `

    // Executa a query e recebe o resultado
    const result = await this.databaseHelper.query(query, [spotByLineId.value])

    const rows = result.rows

    // Inicializa a lista de models
    const models: SpotByLineFiltersEntityModel[] = []

    // Itera pelas linhas retornadas e mapeia para o modelo usando o mapper
    for (const row of rows) {
      models.push(this.mapperFilter(row))
    }

    // Retorna a lista de SpotByLineFiltersEntityModel
    return models
  }
}
