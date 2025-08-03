import { type StateControlEntityModel } from '@/domain/report-geoserver'
import { type StringValueObject } from '@/domain/shared'

export interface IStateControlRepository {
  create: (layer: StateControlEntityModel) => Promise<StateControlEntityModel>

  getById: (layerId: StringValueObject) => Promise<StateControlEntityModel | null>

  getAll: () => Promise<StateControlEntityModel[]>

  update: (layer: StateControlEntityModel) => Promise<StateControlEntityModel>

  delete: (layerId: StringValueObject) => Promise<StateControlEntityModel>
}
