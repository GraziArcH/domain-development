import { SpotTypeDescriptionValueObject, SpotTypeNameValueObject } from '@/domain/report'
import { IdValueObject } from '@/domain/shared'
import { type SpotTypeDTO } from './spot-type-dtos'
import { type IEntityModel } from '@/domain/shared'

export class SpotTypeEntityModel implements IEntityModel<SpotTypeDTO> {
  constructor (
    public readonly spotTypeId: IdValueObject,
    public readonly spotTypeName: SpotTypeNameValueObject,
    public readonly description: SpotTypeDescriptionValueObject,
    public readonly spotData: string,
    public readonly createdBy: IdValueObject,
    public readonly active: boolean
  ) { }

  static create (
    {
      spotTypeId,
      spotTypeName,
      description,
      spotData,
      createdBy,
      active
    }: SpotTypeDTO
  ): SpotTypeEntityModel {
    const spotTypeIdOrError = IdValueObject.create(spotTypeId)

    const spotTypeNameOrError = SpotTypeNameValueObject.create(spotTypeName)

    const descriptionOrError = SpotTypeDescriptionValueObject.create(description)

    const createdByOrError = IdValueObject.create(createdBy)

    return new SpotTypeEntityModel(
      spotTypeIdOrError,
      spotTypeNameOrError,
      descriptionOrError,
      spotData,
      createdByOrError,
      active
    )
  }

  getValues (): SpotTypeDTO {
    return {
      spotTypeId: this.spotTypeId.value,
      spotTypeName: this.spotTypeName.value,
      description: this.description.value,
      spotData: this.spotData,
      createdBy: this.createdBy.value,
      active: this.active
    }
  }
}
