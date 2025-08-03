import { type Filters, SpotEntityModel, type ISpotDataRepository, type Filter, PurgeDTO } from '@/domain/report'
import { StringValueObject } from '@/domain/shared'
import { type DatabaseNoSQLHelper } from '@/application/framework'



export class SpotDataRepository implements ISpotDataRepository {
  constructor(private readonly databaseHelper: DatabaseNoSQLHelper) { }

  private mapper(row): SpotEntityModel {
    if (!row) return null

    return SpotEntityModel.create(
      {
        spotId: row.spot_data_id.toString(),
        spotTemplateId: row.spot_template_id.toString(),
        spotData: row.spot_data,
        filters: {
          primaryFilters: row.primary_filters ?? [],
          secondaryFilters: row.secondary_filters ?? [],
          specificFilters: row.specific_filters ?? []
        },
        spotName: row.spot_name.toString()
      }
    )
  }

  private verifyFilter(filters: Filter[]): Filter[] | null {
    return filters.length > 0 ? filters : null
  }

  modifyFilter(filters: Filter[][]) {
    const extractValues = (filterArray: Filter[]) => {
      if (filterArray.length === 0) { return }
      return filterArray.map(f => f.value)
    }
    const result = filters.map(filterArray => {
      const extractedFilters = extractValues(filterArray)
      return extractedFilters
    })
    return result
  }

  private buildFilterQuery(baseQuery: string, filters: Filters, queryValues: any[]): string {
    const whereClauses = []

    // Check primary filters
    if (filters.primaryFilters.length > 0) {
      filters.primaryFilters.forEach(filter => {
        const filterCondition = 'primary_filters CONTAINS {name: ?, value: ?}'
        whereClauses.push(filterCondition)
        queryValues.push(filter.name, filter.value)
      })
    }

    // Check secondary filters
    if (filters.secondaryFilters.length > 0) {
      filters.secondaryFilters.forEach(filter => {
        const filterCondition = 'secondary_filters CONTAINS {name: ?, value: ?}'
        whereClauses.push(filterCondition)
        queryValues.push(filter.name, filter.value)
      })
    }

    // Check specific filters
    if (filters.specificFilters.length > 0) {
      filters.specificFilters.forEach(filter => {
        const filterCondition = 'specific_filters CONTAINS {name: ?, value: ?}'
        whereClauses.push(filterCondition)
        queryValues.push(filter.name, filter.value)
      })
    }

    if (whereClauses.length > 0) {
      baseQuery += ` AND ${whereClauses.join(' AND ')} ALLOW FILTERING`
    } else {
      baseQuery += ' ALLOW FILTERING'
    }

    return baseQuery
  }

  private filterRows(rows: any[], filters: Filters) {
    return rows.filter(row => {
      const primaryMatch = this.checkExactMatch(row.primary_filters, filters.primaryFilters)

      // Check secondary filters
      const secondaryMatch = this.checkExactMatch(row.secondary_filters, filters.secondaryFilters)

      // Check specific filters
      const specificMatch = this.checkExactMatch(row.specific_filters, filters.specificFilters)

      return primaryMatch && secondaryMatch && specificMatch
    })
  }

  private checkExactMatch(rowFilters: any[], inputFilters: Filter[]) {
    try {
      // Check if rowFilters is null or undefined
      if (!rowFilters) {
        // If no input filters, rowFilters must be empty
        return inputFilters.length === 0
      }

      // If no input filters, the rowFilters must be empty
      if (inputFilters.length === 0) {
        return rowFilters.length === 0
      }

      // Compare lengths
      if (rowFilters.length !== inputFilters.length) {
        return false
      }

      // Create a set for easy comparison
      const rowFilterSet = new Set(rowFilters.map(filter => JSON.stringify(filter)))
      const inputFilterSet = new Set(inputFilters.map(filter => JSON.stringify(filter)))

      // Check if all input filters are present in row filters
      return [...inputFilterSet].every(filter => rowFilterSet.has(filter))
    } catch (e) {
      return false // Optionally return false if an error occurs
    }
  }

  async create(spot: SpotEntityModel): Promise<SpotEntityModel> {
    const query = `
      INSERT INTO 
        report.spot_data 
      (spot_data_id, spot_template_id, spot_data, spot_name, primary_filters, secondary_filters, specific_filters, created_at, updated_at)
        VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    const uuid = this.databaseHelper.generateUUID()
    await this.databaseHelper.query(
      query,
      [
        uuid,
        spot.spotTemplateId.value,
        spot.spotData.value,
        spot.spotName.value,
        this.verifyFilter(spot.filters.primaryFilters),
        this.verifyFilter(spot.filters.secondaryFilters),
        this.verifyFilter(spot.filters.specificFilters),
        new Date(),
        new Date()
      ]
    )

    return await this.getById(StringValueObject.create(uuid.toString()))
  }

  async getById(spotId: StringValueObject): Promise<SpotEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM report.spot_data WHERE spot_data_id = ?',
      [spotId.value]
    )

    const row = result.rows[0]
    return this.mapper(row)
  }

  async getBySpotTemplateIdAndFilters(
    spotTemplateId: StringValueObject,
    filters: Filters
  ): Promise<SpotEntityModel | null> {
    let query = `
      SELECT * FROM 
        report.spot_data
      WHERE spot_template_id = ?
    `
    const queryValues = [spotTemplateId.value]

    // Initialize an array to hold the where clauses
    query = this.buildFilterQuery(query, filters, queryValues)

    const result = await this.databaseHelper.query(query, queryValues)

    const rows = this.filterRows(result.rows, filters)

    return rows.length > 0 ? this.mapper(rows[0]) : null
  }

  async getBySpotDataName(
    spotDataName: StringValueObject,
    filters: Filters
  ): Promise<SpotEntityModel | null> {
    let query = `
    SELECT * FROM 
      report.spot_data
    WHERE spot_name = ?
  `

    const queryValues = [spotDataName.value]

    // Initialize an array to hold the where clauses
    query = this.buildFilterQuery(query, filters, queryValues)

    const result = await this.databaseHelper.query(query, queryValues)

    const rows = this.filterRows(result.rows, filters)

    return rows.length > 0 ? this.mapper(rows[0]) : null
  }

  async update(spot: SpotEntityModel): Promise<SpotEntityModel> {
    const query = `
      UPDATE report.spot_data
        SET spot_template_id = ?, spot_data = ?, spot_name = ?, primary_filters = ?, secondary_filters = ?, specific_filters = ?, updated_at = ?
      WHERE spot_data_id = ?
    `
    await this.databaseHelper.query(
      query,
      [
        spot.spotTemplateId.value,
        spot.spotData.value,
        spot.spotName.value,
        this.verifyFilter(spot.filters.primaryFilters),
        this.verifyFilter(spot.filters.secondaryFilters),
        this.verifyFilter(spot.filters.specificFilters),
        new Date(),
        spot.spotId.value
      ]
    )

    return await this.getById(spot.spotId)
  }

  async delete(spotId: StringValueObject): Promise<SpotEntityModel> {
    const result = await this.getById(spotId)
    await this.databaseHelper.query(
      'DELETE FROM report.spot_data WHERE spot_data_id = ?',
      [spotId.value]
    )

    return result
  }


  async getSpotDataIdsToBeDeleted(purgeRules: PurgeDTO[]): Promise<string[]> {
    const results = purgeRules.map(async (rule) => await this.databaseHelper.query(
      'SELECT spot_data_id FROM report.spot_data WHERE spot_name = ? AND updated_at < ? ALLOW FILTERING', [rule.spotTemplateName, rule.purgeDate]
    ))

    const rows = await Promise.all(results)

    const spotDataIds = rows.flatMap((result) => result.rows.map((row) => row.spot_data_id)) as string[]

    return spotDataIds
  }
}
