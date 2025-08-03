import { type FilterActionsDTO } from './filter-actions-dtos'
import { IdValueObject, StringValueObject, type IEntityModel } from '@/domain/shared'

export class FilterActionsEntityModel implements IEntityModel<FilterActionsDTO> {
  constructor (
    public readonly filterActionId: IdValueObject,
    public readonly action: StringValueObject,
    public readonly createdBy: IdValueObject,
    public readonly active: boolean
  ) { }

  static create (
    {
      filterActionId,
      action,
      createdBy,
      active
    }: FilterActionsDTO
  ): FilterActionsEntityModel {
    const filterActionIdOrError = IdValueObject.create(filterActionId)
    const createdByOrError = IdValueObject.create(createdBy)
    const actionOrError = StringValueObject.create(action)

    return new FilterActionsEntityModel(
      filterActionIdOrError,
      actionOrError,
      createdByOrError,
      active
    )
  }

  getValues (): FilterActionsDTO {
    return {
      filterActionId: this.filterActionId.value,
      action: this.action.value,
      createdBy: this.createdBy.value,
      active: this.active
    }
  }
}
