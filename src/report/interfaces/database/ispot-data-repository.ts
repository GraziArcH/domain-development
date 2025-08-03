import { type Filters, type SpotEntityModel } from '@/domain/report'
import { type StringValueObject } from '@/domain/shared'

export interface ISpotDataRepository {
  create: (spot: SpotEntityModel) => Promise<SpotEntityModel>

  getById: (spotId: StringValueObject) => Promise<SpotEntityModel | null>

  getBySpotDataName: (
    spotDataName: StringValueObject,
    filters: Filters
  ) => Promise<SpotEntityModel | null>

  getBySpotTemplateIdAndFilters: (
    spotTemplateId: StringValueObject,
    filters: Filters
  ) => Promise<SpotEntityModel | null>

  update: (spot: SpotEntityModel) => Promise<SpotEntityModel>

  delete: (spotId: StringValueObject) => Promise<SpotEntityModel>

  getSpotDataIdsToBeDeleted: (purgeRules: PurgeDTO[]) => Promise<string[]>
}

export interface PurgeDTO {
  spotTemplateName: string,
  purgeDate: Date
}
