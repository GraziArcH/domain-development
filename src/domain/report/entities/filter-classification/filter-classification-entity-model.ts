import { type FilterClassificationDTO } from './filter-classification-dtos'
import { IdValueObject, StringValueObject, type IEntityModel } from '@/domain/shared'

export class FilterClassificationEntityModel implements IEntityModel<FilterClassificationDTO> {
  constructor (
    public readonly filterClassificationId: IdValueObject,
    public readonly classification: StringValueObject,
    public readonly createdBy: IdValueObject,
    public readonly active: boolean
  ) { }

  static create (
    {
      filterClassificationId,
      classification,
      createdBy,
      active
    }: FilterClassificationDTO
  ): FilterClassificationEntityModel {
    const filterClassificationIdOrError = IdValueObject.create(filterClassificationId)
    const createdByOrError = IdValueObject.create(createdBy)
    const classificationOrError = StringValueObject.create(classification)

    return new FilterClassificationEntityModel(
      filterClassificationIdOrError,
      classificationOrError,
      createdByOrError,
      active
    )
  }

  getValues (): FilterClassificationDTO {
    return {
      filterClassificationId: this.filterClassificationId.value,
      classification: this.classification.value,
      createdBy: this.createdBy.value,
      active: this.active
    }
  }
}
