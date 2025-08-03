import {
  FilterActionsEntityModel,
  FilterClassificationEntityModel,
  FilterDescriptionValueObject,
  FilterValueTypeEntityModel,
  FilterValueValueObject,
  OrderValueObject,
  SpotByLineFiltersEntityModel
} from '@/domain/report'
import { IdValueObject, type IEntityModel } from '@/domain/shared'
import { type FilterDTO } from './filter-dtos'

export class FilterEntityModel implements IEntityModel<FilterDTO> {
  constructor (
    public readonly filterId: IdValueObject,
    public readonly value: FilterValueValueObject,
    public readonly description: FilterDescriptionValueObject,
    public readonly filterClassificationId: IdValueObject,
    public readonly filterValueTypeId: IdValueObject,
    public readonly filterActionId: IdValueObject,
    public readonly order: OrderValueObject,
    public readonly active: boolean,
    public readonly createdBy: IdValueObject,
    public readonly createdAt: number,
    public readonly triggerFilterId?: IdValueObject,
    public readonly parentId?: IdValueObject,
    public readonly filterAction?: FilterActionsEntityModel,
    public readonly filterClassification?: FilterClassificationEntityModel,
    public readonly filterValueType?: FilterValueTypeEntityModel,
    public readonly spotByLineFilters?: SpotByLineFiltersEntityModel
  ) { }

  static create ({
    filterId,
    parentId,
    value,
    description,
    filterClassificationId,
    filterValueTypeId,
    filterActionId,
    triggerFilterId,
    order,
    createdBy,
    active,
    createdAt,
    spotByLineFilters,
    filterAction,
    filterClassification,
    filterValueType
  }: FilterDTO): FilterEntityModel {
    const filterIdOrError = IdValueObject.create(filterId)
    const valueOrError = FilterValueValueObject.create(value)
    const descriptionOrError = FilterDescriptionValueObject.create(description)
    const filterClassificationIdOrError = IdValueObject.create(filterClassificationId)
    const filterValueTypeIdOrError = IdValueObject.create(filterValueTypeId)
    const orderOrError = OrderValueObject.create(order)
    const createdByOrError = IdValueObject.create(createdBy)

    let parentIdOrError: IdValueObject | undefined
    let triggerFilterIdOrError: IdValueObject | undefined
    let filterActionIdOrError: IdValueObject | undefined

    let filterActionOrError: FilterActionsEntityModel
    let filterClassificationOrError: FilterClassificationEntityModel
    let filterValueTypeOrError: FilterValueTypeEntityModel
    let spotByLineFiltersOrError: SpotByLineFiltersEntityModel

    if (spotByLineFilters) spotByLineFiltersOrError = SpotByLineFiltersEntityModel.create(spotByLineFilters)
    if (filterAction) filterActionOrError = FilterActionsEntityModel.create(filterAction)
    if (filterClassification) filterClassificationOrError = FilterClassificationEntityModel.create(filterClassification)
    if (filterValueType) filterValueTypeOrError = FilterValueTypeEntityModel.create(filterValueType)

    if (parentId) parentIdOrError = IdValueObject.create(parentId)
    if (triggerFilterId) triggerFilterIdOrError = IdValueObject.create(triggerFilterId)
    if (filterActionId) filterActionIdOrError = IdValueObject.create(filterActionId)

    return new FilterEntityModel(
      filterIdOrError,
      valueOrError,
      descriptionOrError,
      filterClassificationIdOrError,
      filterValueTypeIdOrError,
      filterActionIdOrError,
      orderOrError,
      active,
      createdByOrError,
      createdAt,
      triggerFilterIdOrError || undefined,
      parentIdOrError || undefined,
      filterActionOrError,
      filterClassificationOrError,
      filterValueTypeOrError,
      spotByLineFiltersOrError
    )
  }

  getValues (): FilterDTO {
    return {
      filterId: this.filterId?.value,
      parentId: this.parentId?.value,
      value: this.value?.value,
      description: this.description?.value,
      filterClassificationId: this.filterClassificationId?.value,
      filterValueTypeId: this.filterValueTypeId?.value,
      filterActionId: this.filterActionId?.value,
      triggerFilterId: this.triggerFilterId?.value,
      order: this.order?.value,
      active: this.active,
      createdBy: this.createdBy?.value,
      createdAt: this.createdAt
    }
  }
}
