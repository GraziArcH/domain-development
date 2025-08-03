import { type FilterActionsEntityModel } from '@/domain/report'
import { type IdValueObject } from '@/domain/shared'

export interface IFilterActionsRepository {
  create: (filter: FilterActionsEntityModel) => Promise<FilterActionsEntityModel>

  getById: (filterId: IdValueObject) => Promise<FilterActionsEntityModel | null>

  getAll: () => Promise<FilterActionsEntityModel[]>

  update: (filter: FilterActionsEntityModel) => Promise<FilterActionsEntityModel>

  delete: (filterId: IdValueObject) => Promise<FilterActionsEntityModel>
}
