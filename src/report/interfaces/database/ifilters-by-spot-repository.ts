import { type FiltersBySpotEntityModel } from '@/domain/report'
import { type IdValueObject } from '@/domain/shared'

export interface IFiltersBySpotRepository {
  create: (filtersBySpot: FiltersBySpotEntityModel) => Promise<FiltersBySpotEntityModel>

  getById: (filtersBySpotId: IdValueObject) => Promise<FiltersBySpotEntityModel | null>

  getAll: () => Promise<FiltersBySpotEntityModel[]>

  update: (filtersBySpot: FiltersBySpotEntityModel) => Promise<FiltersBySpotEntityModel>

  delete: (filtersBySpotId: IdValueObject) => Promise<FiltersBySpotEntityModel>

  removeFilterFromTemplate: (templateId: IdValueObject, filterId: IdValueObject) => Promise<FiltersBySpotEntityModel>
}
