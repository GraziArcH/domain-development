import { FilterValueTypeNameValueObject } from '@/domain/report'
import { IdValueObject, type IEntityModel } from '@/domain/shared'
import { type FilterValueTypeDTO } from './filter-value-type-dtos'

export class FilterValueTypeEntityModel implements IEntityModel<FilterValueTypeDTO> {
  constructor (
    public readonly filterValueTypeId: IdValueObject,
    public readonly valueType: FilterValueTypeNameValueObject,
    public readonly createdBy: IdValueObject,
    public readonly active: boolean
  ) { }

  static create (
    {
      filterValueTypeId,
      valueType,
      createdBy,
      active
    }: FilterValueTypeDTO
  ): FilterValueTypeEntityModel {
    const filterTypeIdOrError = IdValueObject.create(filterValueTypeId)
    const nameOrError = FilterValueTypeNameValueObject.create(valueType)
    const createdByOrError = IdValueObject.create(createdBy)

    return new FilterValueTypeEntityModel(
      filterTypeIdOrError,
      nameOrError,
      createdByOrError,
      active
    )
  }

  getValues (): FilterValueTypeDTO {
    return {
      filterValueTypeId: this.filterValueTypeId.value,
      valueType: this.valueType.value,
      createdBy: this.createdBy.value,
      active: this.active
    }
  }
}
