import { LayerEntityModel, type ILayerRepository, type LayerNameValueObject } from '@/domain/report-geoserver'
import { type DatabaseHelper } from '@/application/framework'
import { type IdValueObject } from '@/domain/shared'

export type LayerFilters = {
  static: string[],
  dynamic: string[],
  date: Date
};

export class LayerRepository implements ILayerRepository {
  constructor(private readonly databaseHelper: DatabaseHelper) { }

  private mapper(rows): LayerEntityModel {
    if (!rows) return null;

    return LayerEntityModel.create({
      id: rows.id,
      idStore: rows.id_store,
      idWorkspace: rows.id_workspace,
      name: rows.name,
      type: rows.type,
      geoserverResponseCode: rows.geoserver_response_code,
      status: rows.status,
      persistedInStoreAt: rows.persisted_in_store_at,
      sendToGeoserverAt: rows.send_to_geoserver_at,
      dateArquivo: rows.date_arquivo,
      contornos: rows.contornos,
      modelos: rows.modelos,
      modulos: rows.modulos,
      extensao: rows.extensao,
    });
  }

  async create(layer: LayerEntityModel): Promise<LayerEntityModel> {
    const query = `
      INSERT INTO layer 
      (
        id_store, 
        id_workspace, 
        name, 
        type, 
        geoserver_response_code, 
        status, 
        persisted_in_store_at, 
        send_to_geoserver_at, 
        created_at, 
        updated_at,
        date_arquivo, 
        contornos, 
        modelos, 
        modulos,
        extensao
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW(), $9, $10, $11, $12, $13)
      RETURNING *
    `;
    const result = await this.databaseHelper.query(query, [
      layer.idStore.value,
      layer.idWorkspace.value,
      layer.name.value,
      layer.type.value,
      layer.geoserverResponseCode.value,
      layer.status,
      layer.persistedInStoreAt,
      layer.sendToGeoserverAt,
      layer.dateArquivo,
      layer.contornos,
      layer.modelos,
      layer.modulos,
      layer.extensao,
    ]);

    return this.mapper(result.rows[0]);
  }

  async update(layer: LayerEntityModel): Promise<LayerEntityModel> {
    const query = `
      UPDATE layer
      SET id_store = $1,  
          id_workspace = $2, 
          name = $3, 
          type = $4, 
          geoserver_response_code = $5, 
          status = $6, 
          persisted_in_store_at = $7, 
          send_to_geoserver_at = $8, 
          updated_at = NOW(),
          date_arquivo = $9, 
          contornos = $10, 
          modelos = $11, 
          modulos = $12, 
          extensao = $13
      WHERE id = $14
      RETURNING *
    `;
    const result = await this.databaseHelper.query(query, [
      layer.idStore.value,
      layer.idWorkspace.value,
      layer.name.value,
      layer.type.value,
      layer.geoserverResponseCode.value,
      layer.status,
      layer.persistedInStoreAt,
      layer.sendToGeoserverAt,
      layer.dateArquivo,
      layer.contornos,
      layer.modelos,
      layer.modulos,
      layer.extensao,
      layer.id.value,
    ]);

    return this.mapper(result.rows[0]);
  }

  async getById(layerId: IdValueObject): Promise<LayerEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM layer WHERE id = $1',
      [layerId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getByName(layerName: LayerNameValueObject): Promise<LayerEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM layer WHERE name = $1',
      [layerName.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  async getAll(): Promise<LayerEntityModel[]> {
    const result = await this.databaseHelper.query('SELECT * FROM layer')
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async delete(layerId: IdValueObject): Promise<LayerEntityModel> {
    const result = await this.databaseHelper.query(
      'DELETE FROM layer WHERE id = $1 RETURNING *',
      [layerId.value]
    )

    const rows = result.rows[0]
    return this.mapper(rows)
  }

  buildWhereClauseStatic(staticFilters: string[]): { clause: string; values: any[] } {
    if (staticFilters.length === 0) {
      return { clause: '', values: [] };
    }

    const placeholders = staticFilters.map((_, i) => `$${i + 1}`).join(', ');
    return { clause: `contornos IN (${placeholders})`, values: staticFilters };
  }

  buildWhereClauseDynamic(dynamicFilters: string[], date: Date): { clause: string; values: any[] } {
    if (dynamicFilters.length === 0) {
      return { clause: '', values: [] };
    }

    //ensure Date is a Date object
    date = new Date(date);

    // Filter out "GEFS" if it appears alongside specific entries
    const refinedFilters = dynamicFilters.filter(filter => filter !== 'GEFS');

    // Separate placeholders for modelos and modulos
    const modelosPlaceholders = refinedFilters.map((_, i) => `$${i + 1}`).join(', ');
    const modulosPlaceholders = refinedFilters.map((_, i) => `$${refinedFilters.length + i + 1}`).join(', ');

    // Placeholder for date
    const datePlaceholder = `$${2 * refinedFilters.length + 1}`;
    const formattedDate = date.toISOString().split('T')[0];

    // Build the clause
    const clause = `
        (modelos IN (${modelosPlaceholders}) OR modulos IN (${modulosPlaceholders}))
        AND date_arquivo = ${datePlaceholder}
    `;

    return {
      clause,
      values: [...refinedFilters, ...refinedFilters, formattedDate]
    };
  }

  async getLayerNames(filters: LayerFilters) {
    const contornos: string[] = [];
    const rasters: string[] = [];

    // Static filters query
    if (filters.static.length > 0) {
      const { clause: staticClause, values: staticValues } = this.buildWhereClauseStatic(filters.static);
      const staticQuery = `
        SELECT w.name AS workspace_name, l.name AS layer_name
        FROM layer l
        JOIN workspace w ON l.id_workspace = w.id
        WHERE ${staticClause}
    `;
      const staticResult = await this.databaseHelper.query(staticQuery, staticValues);
      contornos.push(
        ...staticResult.rows.map((row) => `${row.workspace_name}:${row.layer_name}`)
      );
    }

    // Dynamic filters query
    if (filters.dynamic.length > 0) {
      const { clause: dynamicClause, values: dynamicValues } = this.buildWhereClauseDynamic(filters.dynamic, filters.date);
      const dynamicQuery = `
      SELECT w.name AS workspace_name, l.name AS layer_name
      FROM layer l
      JOIN workspace w ON l.id_workspace = w.id
      WHERE ${dynamicClause}
    `;
      const dynamicResult = await this.databaseHelper.query(dynamicQuery, dynamicValues);
      rasters.push(
        ...dynamicResult.rows.map((row) => `${row.workspace_name}:${row.layer_name}`)
      );
    }

    return {
      contornos,
      rasters
    }
  }
}
