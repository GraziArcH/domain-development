import { type FilterClassificationEntityModel } from '@/domain/report'
import { type IdValueObject } from '@/domain/shared'

export interface IFilterClassificationRepository {
  create: (filter: FilterClassificationEntityModel) => Promise<FilterClassificationEntityModel>

  getById: (filterId: IdValueObject) => Promise<FilterClassificationEntityModel | null>

  getAll: () => Promise<FilterClassificationEntityModel[]>

  update: (filter: FilterClassificationEntityModel) => Promise<FilterClassificationEntityModel>

  delete: (filterId: IdValueObject) => Promise<FilterClassificationEntityModel>
}
