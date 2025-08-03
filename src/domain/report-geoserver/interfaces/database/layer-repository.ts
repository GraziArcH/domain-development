import { type LayerEntityModel, type LayerNameValueObject } from '@/domain/report-geoserver'
import { type IdValueObject } from '@/domain/shared'
import { LayerFilters } from '../../../../application/framework'

export interface ILayerRepository {
  create: (layer: LayerEntityModel) => Promise<LayerEntityModel>

  getById: (layerId: IdValueObject) => Promise<LayerEntityModel | null>

  getByName: (layerName: LayerNameValueObject) => Promise<LayerEntityModel | null>

  getAll: () => Promise<LayerEntityModel[]>

  update: (layer: LayerEntityModel) => Promise<LayerEntityModel>

  delete: (layerId: IdValueObject) => Promise<LayerEntityModel>

  getLayerNames: (filters: LayerFilters) => Promise<{ contornos: string[], rasters: string[] }>
}
