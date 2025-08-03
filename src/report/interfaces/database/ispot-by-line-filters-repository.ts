import { type SpotByLineFiltersEntityModel } from '@/domain/report'
import { type IdValueObject } from '@/domain/shared'

export interface ISpotByLineFiltersRepository {
  create: (spotByLinePrimaryFilters: SpotByLineFiltersEntityModel) => Promise<SpotByLineFiltersEntityModel>

  getById: (spotByLineFiltersId: IdValueObject) => Promise<SpotByLineFiltersEntityModel | null>

  getAll: () => Promise<SpotByLineFiltersEntityModel[]>

  update: (spotByLinePrimaryFilters: SpotByLineFiltersEntityModel) => Promise<SpotByLineFiltersEntityModel>

  delete: (spotByLineFiltersId: IdValueObject) => Promise<SpotByLineFiltersEntityModel>

  updateFiltersByLine: (
    lineTemplateId: IdValueObject,
    filterId: IdValueObject,
    visible?: boolean,
    defaultFilterIds?: IdValueObject[]
  ) => Promise<void>

  getSpotByLineFiltersBySpotByLineId: (spotByLineId: IdValueObject) => Promise<SpotByLineFiltersEntityModel[]>
}
