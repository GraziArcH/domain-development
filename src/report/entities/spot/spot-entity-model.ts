import { type Filters, type SpotDTO } from '@/domain/report'
import { StringValueObject, type IEntityModel } from '@/domain/shared'

export class SpotEntityModel implements IEntityModel<SpotDTO> {
  constructor(
    public spotId: StringValueObject,
    public readonly spotName: StringValueObject,
    public readonly spotTemplateId: StringValueObject,
    public readonly spotData: StringValueObject,
    public readonly filters: Filters,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) { }

  static create(
    {
      spotId,
      spotName,
      spotTemplateId,
      spotData,
      filters,
      createdAt,
      updatedAt
    }: SpotDTO
  ): SpotEntityModel {
    const spotIdOrError = StringValueObject.create(spotId)
    const spotTemplateIdOrError = StringValueObject.create(spotTemplateId)
    const spotNameIdOrError = StringValueObject.create(spotName)
    const spotDataOrError = StringValueObject.create(spotData)

    return new SpotEntityModel(
      spotIdOrError,
      spotNameIdOrError,
      spotTemplateIdOrError,
      spotDataOrError,
      filters,
      createdAt,
      updatedAt
    )
  }

  getValues(): SpotDTO {
    return {
      spotId: this.spotId.value,
      spotName: this.spotName.value,
      spotTemplateId: this.spotTemplateId.value,
      spotData: this.spotData.value,
      filters: this.filters,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
