import { type StoreLayerEntityModel, type StoreLayerNameValueObject } from '@/domain/report-geoserver'
import { type IdValueObject } from '@/domain/shared'

export interface IStoreLayerRepository {
  create: (storeLayer: StoreLayerEntityModel) => Promise<StoreLayerEntityModel>

  getById: (storeLayerId: IdValueObject) => Promise<StoreLayerEntityModel | null>

  getByName: (storeLayerName: StoreLayerNameValueObject) => Promise<StoreLayerEntityModel | null>

  getAll: () => Promise<StoreLayerEntityModel[]>

  update: (storeLayer: StoreLayerEntityModel) => Promise<StoreLayerEntityModel>

  delete: (storeLayerId: IdValueObject) => Promise<StoreLayerEntityModel>
}
