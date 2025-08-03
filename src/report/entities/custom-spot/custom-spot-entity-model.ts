import { OrderValueObject } from '@/domain/report'
import { type IEntityModel, IdValueObject, StringValueObject } from '@/domain/shared'
import { type CustomSpotDTO } from './custom-spot-dtos'

export class CustomSpotEntityModel implements IEntityModel<CustomSpotDTO> {
  constructor (
    public readonly customSpotId: IdValueObject,
    public readonly spotTemplateName: StringValueObject,
    public readonly userId: IdValueObject,
    public readonly filters: StringValueObject,
    public readonly order: OrderValueObject,
    public readonly spotType?: StringValueObject
  ) { }

  static create (
    {
      customSpotId,
      spotTemplateName,
      userId,
      filters,
      order,
      spotTypeName
    }: CustomSpotDTO
  ): CustomSpotEntityModel {
    const customSpotIdOrError = IdValueObject.create(customSpotId)

    const spotTemplateNameOrError = StringValueObject.create(spotTemplateName)

    const filtersOrError = StringValueObject.create(filters)

    const userIdOrError = IdValueObject.create(userId)

    const orderOrError = OrderValueObject.create(order)

    let spotTypeOrError: StringValueObject = null

    if (spotTypeName) spotTypeOrError = StringValueObject.create(spotTypeName)

    return new CustomSpotEntityModel(
      customSpotIdOrError,
      spotTemplateNameOrError,
      userIdOrError,
      filtersOrError,
      orderOrError,
      spotTypeOrError
    )
  }

  getValues (): CustomSpotDTO {
    return {
      customSpotId: this.customSpotId.value,
      filters: this.filters.value,
      order: this.order.value,
      spotTemplateName: this.spotTemplateName.value,
      userId: this.userId.value,
      spotTypeName: this.spotType?.value
    }
  }
}
