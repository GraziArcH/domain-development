import {
  OrderValueObject,
  SpotTemplateDescriptionValueObject,
  SpotTemplateLegendValueObject,
  SpotTemplateNameValueObject,
  SpotTemplateVersionValueObject,
  SpotTitleValueObject,
  SpotTypeEntityModel
} from '@/domain/report'
import { IdValueObject, type IEntityModel } from '@/domain/shared'
import { type SpotTemplateDTO } from './spot-template-dtos'

export class SpotTemplateEntityModel implements IEntityModel<SpotTemplateDTO> {
  constructor (
    public readonly spotTemplateId: IdValueObject,
    public readonly spotTypeId: IdValueObject,
    public readonly spotTemplateName: SpotTemplateNameValueObject,
    public readonly spotTitle: SpotTitleValueObject,
    public readonly description: SpotTemplateDescriptionValueObject,
    public readonly spotLegend: SpotTemplateLegendValueObject,
    public readonly version: SpotTemplateVersionValueObject,
    public readonly createdBy: IdValueObject,
    public readonly active: boolean,
    public readonly draft: boolean,
    public readonly formatting: object,
    public readonly spotOrder?: OrderValueObject,
    public readonly spotType?: SpotTypeEntityModel,
    public readonly dataPurgeTime?: number
  ) {}

  static create ({
    spotTemplateId,
    spotTemplateName,
    spotTitle,
    description,
    spotLegend,
    version,
    spotTypeId,
    createdBy,
    active,
    draft,
    formatting,
    spotOrder,
    spotType,
    dataPurgeTime
  }: SpotTemplateDTO): SpotTemplateEntityModel {
    const spotTemplateIdOrError = IdValueObject.create(spotTemplateId)

    const spotTemplateNameOrError =
      SpotTemplateNameValueObject.create(spotTemplateName)

    const spotTitleOrError = SpotTitleValueObject.create(spotTitle)

    const descriptionOrError =
      SpotTemplateDescriptionValueObject.create(description)

    const spotLegendOrError = SpotTemplateLegendValueObject.create(spotLegend)

    const versionOrError = SpotTemplateVersionValueObject.create(version)

    const spotTypeIdOrError = IdValueObject.create(spotTypeId)

    const createdByOrError = IdValueObject.create(createdBy)

    let spotOrderOrError: OrderValueObject
    if (spotOrder) spotOrderOrError = OrderValueObject.create(spotOrder)

    let spotTypeOrError: SpotTypeEntityModel
    if (spotType) spotTypeOrError = SpotTypeEntityModel.create(spotType)

    return new SpotTemplateEntityModel(
      spotTemplateIdOrError,
      spotTypeIdOrError,
      spotTemplateNameOrError,
      spotTitleOrError,
      descriptionOrError,
      spotLegendOrError,
      versionOrError,
      createdByOrError,
      active,
      draft,
      formatting,
      spotOrderOrError,
      spotTypeOrError,
      dataPurgeTime
    )
  }

  getValues (): SpotTemplateDTO {
    return {
      spotTemplateId: this.spotTemplateId.value,
      spotTypeId: this.spotTypeId.value,
      spotTemplateName: this.spotTemplateName.value,
      spotTitle: this.spotTitle.value,
      description: this.description.value,
      spotLegend: this.spotLegend.value,
      version: this.version.value,
      createdBy: this.createdBy.value,
      active: this.active,
      draft: this.draft,
      formatting: this.formatting,
      spotType: this.spotType ? this.spotType.getValues() : null,
      spotOrder: this.spotOrder?.value,
      dataPurgeTime: this.dataPurgeTime
    }
  }
}
