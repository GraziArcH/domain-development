import {
  FilterActionsEntityModel,
  FilterClassificationEntityModel,
  FilterEntityModel,
  FilterValueTypeEntityModel,
  SpotByLineFiltersEntityModel,
  type IFilterRepository
} from '@/domain/report'
import { type StringValueObject, type IdValueObject } from '@/domain/shared'
import { type DatabaseHelper } from '@/application/framework'

export class FilterRepository implements IFilterRepository {
  constructor(private readonly databaseHelper: DatabaseHelper) { }

  private mapper(rows): FilterEntityModel {
    if (!rows) return null

    return FilterEntityModel.create({
      filterId: rows.filter_id,
      parentId: rows.parent_id || undefined,
      value: rows.value,
      description: rows.description,
      filterClassificationId: rows.filter_classification_id,
      filterValueTypeId: rows.filter_value_type_id,
      filterActionId: rows.filter_action_id ? rows.filter_action_id : undefined,
      order: rows.order,
      createdBy: rows.created_by,
      createdAt: rows.created_at,
      active: rows.active,
      triggerFilterId: rows.trigger_filter_id || undefined,
      filterAction: rows.action
        ? {
          filterActionId: rows.filter_action_id,
          action: rows.action,
          createdBy: rows.created_by,
          active: rows.active
        }
        : undefined,
      filterClassification: rows.classification
        ? {
          filterClassificationId: rows.filter_classification_id,
          classification: rows.classification,
          createdBy: rows.created_by,
          active: rows.active
        }
        : undefined,
      filterValueType: rows.value_type
        ? {
          filterValueTypeId: rows.filter_value_type_id,
          createdBy: rows.created_by,
          valueType: rows.value_type,
          active: rows.active
        }
        : undefined
    })
  }

  private mapperWithForeignKeyData(rows): FilterEntityModel {
    if (!rows) {
      return null
    }
    return FilterEntityModel.create({
      filterId: rows.filter_filter_id,
      parentId: rows.filter_parent_id,
      value: rows.filter_value,
      description: rows.filter_description,
      filterClassificationId: rows.filter_filter_classification_id,
      filterValueTypeId: rows.filter_filter_value_type_id,
      order: rows.filter_sequence,
      createdBy: rows.filter_created_by,
      active: rows.filter_active,
      filterActionId: rows.filter_filter_action_id
        ? rows.filter_filter_action_id
        : null,
      spotByLineFilters: rows.spot_by_line_filters_spot_by_line_filters_id
        ? {
          spotByLineFiltersId:
            rows.spot_by_line_filters_spot_by_line_filters_id,
          spotByLineId: rows.spot_by_line_filters_spot_by_line_id,
          parentFilterId: rows.spot_by_line_filters_filter_id,
          visible: rows.spot_by_line_filters_visible,
          defaultValue: rows.spot_by_line_filters_default_value,
          active: rows.spot_by_line_filters_active,
          createdBy: rows.spot_by_line_filters_created_by
        }
        : null,
      filterValueType: rows.filter_value_type_value_type
        ? {
          filterValueTypeId: rows.filter_value_type_filter_value_type_id,
          createdBy: rows.filter_value_type_created_by,
          valueType: rows.filter_value_type_value_type,
          active: rows.filter_value_type_active
        }
        : null,
      filterClassification: rows.filter_classification_classification
        ? {
          filterClassificationId:
            rows.filter_classification_filter_classification_id,
          classification: rows.filter_classification_classification,
          createdBy: rows.filter_classification_created_by,
          active: rows.filter_classification_active
        }
        : null,
      filterAction: rows.filter_action_action
        ? {
          filterActionId: rows.filter_action_filter_action_id,
          action: rows.filter_action_action,
          createdBy: rows.filter_action_created_by,
          active: rows.filter_action_active
        }
        : null,
      createdAt: rows.filter_created_at,
      triggerFilterId: rows.filter_trigger_filter_id
        ? rows.filter_trigger_filter_id
        : undefined
    })
  }

  async create(filter: FilterEntityModel): Promise<FilterEntityModel> {
    const query = `INSERT INTO filter (
      parent_id, 
      value,
      description,
      filter_classification_id,
      filter_value_type_id,
      filter_action_id,
      trigger_filter_id,
      "order",
      active,
      created_by,
      created_at
    ) 
      VALUES 
    (
      $1, 
      $2, 
      $3, 
      $4,
      $5, 
      $6,
      $7,
      $8,
      $9,
      $10,
      NOW()
    ) RETURNING *
    `

    const result = await this.databaseHelper.query(query, [
      filter.parentId?.value,
      filter.value.value,
      filter.description.value,
      filter.filterClassificationId.value,
      filter.filterValueTypeId.value,
      filter.filterActionId.value,
      filter.triggerFilterId?.value,
      filter.order.value,
      filter.active,
      filter.createdBy.value
    ])

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getById(filterId: IdValueObject): Promise<FilterEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM filter WHERE filter_id = $1 AND active = true',
      [filterId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getByParentId(parentId: IdValueObject): Promise<FilterEntityModel[]> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM filter WHERE parent_id = $1 AND active = true',
      [parentId.value]
    )
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async getBySpotTemplateIdWithYourDependents(
    spotTemplateId: IdValueObject
  ): Promise<FilterEntityModel[]> {
    const query = `
      WITH RECURSIVE filter_hierarchy AS (
        -- Get initial filters based on spot_by_line_filters using spot_template_name
        SELECT
            f.filter_id,
            f.parent_id,
            f.trigger_filter_id,
            f.value,
            f.description,
            f.filter_classification_id,
            f.filter_value_type_id,
            f.filter_action_id,
            f."order",
            f.created_by,
            f.created_at,
            f.active,
            1 AS level -- Track recursion depth
        FROM
            filter f
        INNER JOIN
            spot_by_line_filters slf ON f.filter_id = slf.parent_filter_id
        INNER JOIN
            spot_by_line sbl ON slf.spot_by_line_id = sbl.spot_by_line_id
        INNER JOIN
            spot_template st ON sbl.spot_template_name = st.spot_template_name -- Join with spot_template to match spot_template_id
        WHERE
            st.spot_template_id = $1 -- Using spot_template_id as the parameter
            AND f.active = TRUE
            AND slf.active = TRUE -- Optionally filter by active spot_by_line_filters

        UNION ALL

        -- Recursive part to get child filters
        SELECT
            child_f.filter_id,
            child_f.parent_id,
            child_f.trigger_filter_id,
            child_f.value,
            child_f.description,
            child_f.filter_classification_id,
            child_f.filter_value_type_id,
            child_f.filter_action_id,
            child_f."order",
            child_f.created_by,
            child_f.created_at,
            child_f.active,
            parent_f.level + 1 -- Increment level
        FROM
            filter child_f
        INNER JOIN
            filter_hierarchy parent_f ON child_f.parent_id = parent_f.filter_id
        WHERE
            child_f.active = TRUE
    )

    SELECT DISTINCT ON (f.filter_id)
        f.filter_id AS filter_filter_id,
        f.parent_id AS filter_parent_id,
        f.value AS filter_value,
        f.description AS filter_description,
        f.filter_classification_id AS filter_filter_classification_id,
        f.filter_value_type_id AS filter_filter_value_type_id,
        f."order" AS filter_sequence,
        f.created_by AS filter_created_by,
        f.created_at AS filter_created_at,
        f.active AS filter_active,
        f.trigger_filter_id AS filter_trigger_filter_id,
        fa.filter_action_id AS filter_action_filter_action_id,
        fa.action AS filter_action_action,
        fa.created_at AS filter_action_created_at,
        fa.created_by AS filter_action_created_by,
        fa.active AS filter_action_active,
        fc.filter_classification_id AS filter_classification_filter_classification_id,
        fc.classification AS filter_classification_classification,
        fc.created_by AS filter_classification_created_by,
        fc.active AS filter_classification_active,
        fc.created_at AS filter_classification_created_at,
        fvt.filter_value_type_id AS filter_value_type_filter_value_type_id,
        fvt.value_type AS filter_value_type_value_type,
        fvt.created_by AS filter_value_type_created_by,
        fvt.active AS filter_value_type_active,
        fvt.created_at AS filter_value_type_created_at,
        slf.spot_by_line_filters_id AS spot_by_line_filters_spot_by_line_filters_id,
        slf.spot_by_line_id AS spot_by_line_filters_spot_by_line_id,
        slf.parent_filter_id AS spot_by_line_filters_filter_id,
        slf.visible AS spot_by_line_filters_visible,
        slf.default_filter_id AS spot_by_line_filters_default_value,
        slf.created_by AS spot_by_line_filters_created_by,
        slf.active AS spot_by_line_filters_active,
        slf.created_at AS spot_by_line_filters_created_at
    FROM
        filter_hierarchy f
    LEFT JOIN
        filter_actions fa ON f.filter_action_id = fa.filter_action_id
    INNER JOIN
        filter_classification fc ON f.filter_classification_id = fc.filter_classification_id
    INNER JOIN
        filter_value_type fvt ON f.filter_value_type_id = fvt.filter_value_type_id
    LEFT JOIN
        spot_by_line_filters slf ON f.filter_id = slf.parent_filter_id
    ORDER BY
        f.filter_id, f.level DESC;
    `
    const result = await this.databaseHelper.query(query, [
      spotTemplateId.value
    ])
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapperWithForeignKeyData(row))

    return models
  }

  async getBySpotTemplateId(
    spotTemplateId: IdValueObject
  ): Promise<FilterEntityModel[]> {
    const query = `
      SELECT *
      FROM filter f
            left JOIN
        filter_by_spot fb ON f.filter_id = fb.filter_id
      WHERE fb.spot_template_id = $1 AND
        f.active = TRUE
      order by f.order limit 1
        `
    const result = await this.databaseHelper.query(query, [
      spotTemplateId.value
    ])
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async getBySpotTemplateName(
    spotTemplateName: StringValueObject
  ): Promise<FilterEntityModel[]> {
    const query = `
      SELECT *
      FROM filter f
            left JOIN
        filter_by_spot fb ON f.filter_id = fb.filter_id
      WHERE fb.spot_template_id = (SELECT spot_template_id FROM spot_template WHERE spot_template_name = $1) AND
        f.active = TRUE
      order by f.order limit 1
        `
    const result = await this.databaseHelper.query(query, [
      spotTemplateName.value
    ])
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async getFiltersByReportTemplateId(
    spotTemplateId: IdValueObject
  ): Promise<FilterEntityModel[]> {
    const query = `
          SELECT f.*
      FROM filter f
              left join spot_by_line_filters sblf on f.filter_id = sblf.filter_id
              left join spot_by_line sbl on sblf.spot_by_line_id = sbl.spot_by_line_id
              left join line_template lt on sbl.line_template_id = lt.line_template_id
      WHERE lt.report_template_id = $1
        AND f.active = TRUE;
    `
    const result = await this.databaseHelper.query(query, [
      spotTemplateId.value
    ])
    const rows = result.rows

    const models = []

    for (const row of rows) { models.push(this.mapperWithForeignKeyData(row).getValues()) }

    return models
  }

  async getFiltersByReportTemplateName(
    reportTemplateName: StringValueObject
  ): Promise<FilterEntityModel[]> {
    const query = `
       SELECT
        f.filter_id AS filter_filter_id,
        f.parent_id AS filter_parent_id,
        f.value AS filter_value,
        f.description AS filter_description,
        f.filter_classification_id AS filter_filter_classification_id,
        f.filter_value_type_id AS filter_filter_value_type_id,
        f.order AS filter_sequence,
        f.created_by AS filter_created_by,
        f.active AS filter_active,
        f.filter_action_id AS filter_filter_action_id,
        f.created_at AS filter_created_at,
        f.trigger_filter_id AS filter_trigger_filter_id
    FROM
        report_template rt
    LEFT JOIN
        line_template lt ON rt.template_id = lt.report_template_id
    LEFT JOIN
        spot_by_line sbl ON lt.line_template_id = sbl.line_template_id
    LEFT JOIN
        spot_template st ON sbl.spot_template_name = st.spot_template_name
    LEFT JOIN
        filter_by_spot fbs ON st.spot_template_id = fbs.spot_template_id
    LEFT JOIN
        filter f ON fbs.filter_id = f.filter_id
    LEFT JOIN
        filter_classification fc ON f.filter_classification_id = fc.filter_classification_id
    LEFT JOIN
        filter_value_type fvt ON f.filter_value_type_id = fvt.filter_value_type_id
    LEFT JOIN
        filter_actions fa ON f.filter_action_id = fa.filter_action_id
    WHERE
        rt.template_name = $1
    GROUP BY
        f.filter_id,
        f.parent_id,
        f.value,
        f.description,
        f.filter_classification_id,
        f.filter_value_type_id,
        f.order,
        f.created_by,
        f.filter_action_id,
        f.trigger_filter_id,
        f.created_at,
        f.active 
    ORDER BY
        f.filter_id;
    `
    const result = await this.databaseHelper.query(query, [
      reportTemplateName.value
    ])
    const rows = result.rows

    const models = []

    for (const row of rows) { models.push(this.mapperWithForeignKeyData(row).getValues()) }

    return models
  }

  private mapperFilter(row): FilterEntityModel {
    return FilterEntityModel.create({
      filterId: row.filter_id,
      value: row.value,
      description: row.description,
      filterClassificationId: row.filter_classification_id,
      filterValueTypeId: row.filter_value_type_id,
      filterActionId: row.filter_action_id,
      order: row.order,
      createdBy: row.created_by,
      active: row.active,
      createdAt: row.created_at,
      parentId: row.parent_id,
      triggerFilterId: row.trigger_filter_id,
      // Mapeando SpotByLineFiltersEntityModel e retornando valores primitivos com getValues()
      spotByLineFilters: row.spot_by_line_filters_id
        ? SpotByLineFiltersEntityModel.create({
          spotByLineFiltersId: row.spot_by_line_filters_id,
          spotByLineId: row.spot_by_line_id,
          parentFilterId: row.parent_filter_id,
          defaultValue: row.default_value,
          visible: row.visible,
          createdBy: row.created_by,
          active: row.active
        }).getValues()
        : undefined,
      // Mapeando FilterActionsEntityModel e retornando valores primitivos com getValues()
      filterAction: row.filter_action_id
        ? FilterActionsEntityModel.create({
          filterActionId: row.filter_action_id,
          action: row.action,
          createdBy: row.created_by,
          active: row.active
        }).getValues()
        : undefined,
      // Mapeando FilterClassificationEntityModel e retornando valores primitivos com getValues()
      filterClassification: row.filter_classification_id
        ? FilterClassificationEntityModel.create({
          filterClassificationId: row.filter_classification_id,
          classification: row.classification,
          createdBy: row.created_by,
          active: row.active
        }).getValues()
        : undefined,
      // Mapeando FilterValueTypeEntityModel e retornando valores primitivos com getValues()
      filterValueType: row.filter_value_type_id
        ? FilterValueTypeEntityModel.create({
          filterValueTypeId: row.filter_value_type_id,
          valueType: row.value_type,
          createdBy: row.created_by,
          active: row.active
        }).getValues()
        : undefined
    })
  }

  // Método para buscar os filtros associados ao spotId e lineId
  async getFiltersByLine(
    spotId: IdValueObject,
    lineId: IdValueObject
  ): Promise<FilterEntityModel[]> {
    const query = `
      SELECT f.*, 
             sblf.*,
             fa.*, 
             fc.*, 
             fvt.*
      FROM filter f
      JOIN spot_by_line_filters sblf ON f.filter_id = sblf.parent_filter_id
      JOIN spot_by_line sbl ON sbl.spot_by_line_id = sblf.spot_by_line_id
      LEFT JOIN filter_actions fa ON f.filter_action_id = fa.filter_action_id
      LEFT JOIN filter_classification fc ON f.filter_classification_id = fc.filter_classification_id
      LEFT JOIN filter_value_type fvt ON f.filter_value_type_id = fvt.filter_value_type_id
      WHERE sbl.spot_by_line_id = $1
        AND sbl.line_template_id = $2
        AND f.active = true;
    `

    // Executa a query e recebe o resultado
    const result = await this.databaseHelper.query(query, [
      spotId.value,
      lineId.value
    ])

    const rows = result.rows

    // Inicializa a lista de FilterEntityModel
    const models: FilterEntityModel[] = []

    // Itera pelas linhas retornadas e mapeia para o modelo usando o mapper
    for (const row of rows) {
      models.push(this.mapperFilter(row))
    }

    // Retorna a lista de FilterEntityModel
    return models
  }

  async getAll(): Promise<FilterEntityModel[]> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM filter WHERE active = true'
    )
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async update(filter: FilterEntityModel): Promise<FilterEntityModel> {
    // Verificar associações com templates de report
    const associatedReports = await this.databaseHelper.query(
      'SELECT * FROM filter_by_spot WHERE filter_id = $1',
      [filter.filterId.value]
    )
    if (associatedReports.rows.length > 0) {
      throw new Error(
        'Filtro não pode ser atualizado pois está associado a um ou mais templates de report.'
      )
    }

    // Verificar associações com templates de spot
    const associatedSpots = await this.databaseHelper.query(
      'SELECT * FROM spot_by_line_filters WHERE parent_filter_id = $1',
      [filter.filterId.value]
    )
    if (associatedSpots.rows.length > 0) {
      // Verificar se todos os spots associados são rascunhos
      const nonDraftSpots = associatedSpots.rows.filter((spot) => !spot.draft)
      if (nonDraftSpots.length > 0) {
        throw new Error(
          'Filtro não pode ser atualizado pois está associado a spots que não são rascunhos.'
        )
      }
    }

    const query = `
      UPDATE filter 
      SET parent_id = $1,
      value = $2,
      description = $3,
      filter_classification_id = $4,
      filter_value_type_id = $5,
      "order" = $6,
      created_by = $7,
      active = $8,
      filter_action_id = $9,
      trigger_filter_id = $10,
      updated_at = NOW(),
        WHERE filter_id = $11 RETURNING *
      `
    const result = await this.databaseHelper.query(query, [
      filter.parentId?.value,
      filter.value?.value,
      filter.description?.value,
      filter.filterClassificationId?.value,
      filter.filterValueTypeId?.value,
      filter.order?.value,
      filter.createdBy?.value,
      filter.active,
      filter.filterActionId?.value,
      filter.triggerFilterId?.value,
      filter.filterId.value
    ])

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async removeLineFilterByFilterIdAndReportTemplaName(
    filterId: IdValueObject,
    reportTemplateName: StringValueObject
  ): Promise<void> {
    const query = `
      DELETE FROM spot_by_line_filters
      WHERE spot_by_line_id IN (
          SELECT spot_by_line_id
          FROM spot_by_line
          WHERE line_template_id IN (
              SELECT line_template_id
              FROM line_template
              WHERE report_template_id IN (
                  SELECT template_id
                  FROM report_template
                  WHERE template_name = $2
                  AND draft = true
              )
          )
      )
      AND parent_filter_id = $1;
    `

    const result = await this.databaseHelper.query(query, [
      filterId.value,
      reportTemplateName.value
    ])

    if (result.rowCount === 0) {
      throw new Error(
        'A remoção do filtro falhou. O template pode não estar em draft ou o filtro não foi encontrado.'
      )
    }
  }

  async delete(filterId: IdValueObject): Promise<FilterEntityModel> {
    // Verificar associações com templates de report
    const associatedReports = await this.databaseHelper.query(
      'SELECT * FROM filter_by_spot WHERE filter_id = $1',
      [filterId.value]
    )
    if (associatedReports.rows.length > 0) {
      throw new Error(
        'Filtro não pode ser excluído pois está associado a um ou mais templates de report.'
      )
    }

    // Verificar associações com templates de spot
    const associatedSpots = await this.databaseHelper.query(
      'SELECT * FROM spot_by_line_filters WHERE parent_filter_id = $1',
      [filterId.value]
    )
    if (associatedSpots.rows.length > 0) {
      // Verificar se todos os spots associados são rascunhos
      const nonDraftSpots = associatedSpots.rows.filter((spot) => !spot.draft)
      if (nonDraftSpots.length > 0) {
        throw new Error(
          'Filtro não pode ser excluído pois está associado a spots que não são rascunhos.'
        )
      }
    }

    // Marcar o filtro como inativo
    const result = await this.databaseHelper.query(
      'UPDATE filter set active = false, updated_at = NOW() WHERE filter_id = $1 RETURNING *',
      [filterId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }
}
