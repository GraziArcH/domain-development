import { IdValueObject, type IEntityModel } from '@/domain/shared'
import { type SpotByLineFiltersDTO } from './spot-by-line-filters-dtos'

export class SpotByLineFiltersEntityModel implements IEntityModel<SpotByLineFiltersDTO> {
  constructor (
    public readonly spotByLineFiltersId: IdValueObject,
    public readonly spotByLineId: IdValueObject,
    public readonly parentFilterId: IdValueObject,
    public readonly defaultValue: number[],
    public readonly visible: boolean,
    public readonly createdBy: IdValueObject,
    public readonly active: boolean
  ) { }

  static create (
    {
      spotByLineFiltersId,
      spotByLineId,
      parentFilterId,
      visible,
      defaultValue,
      createdBy,
      active
    }: SpotByLineFiltersDTO
  ): SpotByLineFiltersEntityModel {
    const spotByLineFiltersIdOrError = IdValueObject.create(spotByLineFiltersId)
    const spotByLineIdOrError = IdValueObject.create(spotByLineId)
    const parentFilterIdOrError = IdValueObject.create(parentFilterId)
    const createdByOrError = IdValueObject.create(createdBy)

    return new SpotByLineFiltersEntityModel(
      spotByLineFiltersIdOrError,
      spotByLineIdOrError,
      parentFilterIdOrError,
      defaultValue,
      visible,
      createdByOrError,
      active
    )
  }

  getValues (): SpotByLineFiltersDTO {
    return {
      spotByLineFiltersId: this.spotByLineFiltersId.value,
      spotByLineId: this.spotByLineId.value,
      parentFilterId: this.parentFilterId.value,
      defaultValue: this.defaultValue,
      visible: this.visible,
      createdBy: this.createdBy.value,
      active: this.active
    }
  }
}
