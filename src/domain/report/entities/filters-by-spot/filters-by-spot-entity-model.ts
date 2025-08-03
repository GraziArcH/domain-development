import { IdValueObject, type IEntityModel } from '@/domain/shared'
import { type FilterBySpotDTO } from './filters-by-spot-dtos'

export class FiltersBySpotEntityModel implements IEntityModel<FilterBySpotDTO> {
  constructor (
    public readonly filtersBySpotId: IdValueObject,
    public readonly spotTemplateId: IdValueObject,
    public readonly filterId: IdValueObject,
    public readonly createdBy: IdValueObject,
    public readonly active: boolean
  ) { }

  static create (
    {
      filtersBySpotId,
      filterId,
      spotTemplateId,
      createdBy,
      active
    }: FilterBySpotDTO
  ): FiltersBySpotEntityModel {
    const filtersBySpotIdOrError = IdValueObject.create(filtersBySpotId)
    const spotTemplateIdOrError = IdValueObject.create(spotTemplateId)
    const filterIdOrError = IdValueObject.create(filterId)
    const createdByOrError = IdValueObject.create(createdBy)

    return new FiltersBySpotEntityModel(
      filtersBySpotIdOrError,
      spotTemplateIdOrError,
      filterIdOrError,
      createdByOrError,
      active
    )
  }

  getValues (): FilterBySpotDTO {
    return {
      filtersBySpotId: this.filtersBySpotId.value,
      spotTemplateId: this.spotTemplateId.value,
      filterId: this.filterId.value,
      createdBy: this.createdBy.value,
      active: this.active
    }
  }
}
