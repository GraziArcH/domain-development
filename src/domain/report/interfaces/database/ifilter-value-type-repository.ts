import { type FilterValueTypeEntityModel } from '@/domain/report'
import { type IdValueObject } from '@/domain/shared'

export interface IFilterValueTypeRepository {
  create: (filterType: FilterValueTypeEntityModel) => Promise<FilterValueTypeEntityModel>

  getById: (filterTypeId: IdValueObject) => Promise<FilterValueTypeEntityModel | null>

  getAll: () => Promise<FilterValueTypeEntityModel[]>

  update: (filterType: FilterValueTypeEntityModel) => Promise<FilterValueTypeEntityModel>

  delete: (filterTypeId: IdValueObject) => Promise<FilterValueTypeEntityModel>
}
