import { OrderValueObject } from '@/domain/report'
import { IdValueObject, StringValueObject, type IEntityModel } from '@/domain/shared'
import { type SpotByLineDTO } from './spot-by-line-dtos'

export class SpotByLineEntityModel implements IEntityModel<SpotByLineDTO> {
  constructor (
    public readonly spotByLineId: IdValueObject,
    public readonly lineTemplateId: IdValueObject,
    public readonly spotTemplateName: StringValueObject,
    public readonly spotOrder: OrderValueObject,
    public readonly createdBy: IdValueObject,
    public readonly active: boolean
  ) { }

  static create (
    {
      spotByLineId,
      lineTemplateId,
      spotTemplateName,
      createdBy,
      spotOrder,
      active
    }: SpotByLineDTO
  ): SpotByLineEntityModel {
    const spotByLineIdOrError = IdValueObject.create(spotByLineId)
    const lineTemplateIdOrError = IdValueObject.create(lineTemplateId)
    const spotTemplateNameOrError = StringValueObject.create(spotTemplateName)
    const spotOrderOrError = OrderValueObject.create(spotOrder)
    const createdByOrError = IdValueObject.create(createdBy)

    return new SpotByLineEntityModel(
      spotByLineIdOrError,
      lineTemplateIdOrError,
      spotTemplateNameOrError,
      spotOrderOrError,
      createdByOrError,
      active
    )
  }

  getValues (): SpotByLineDTO {
    return {
      spotByLineId: this.spotByLineId.value,
      lineTemplateId: this.lineTemplateId.value,
      spotTemplateName: this.spotTemplateName.value,
      spotOrder: this.spotOrder.value,
      createdBy: this.createdBy.value,
      active: this.active
    }
  }
}
