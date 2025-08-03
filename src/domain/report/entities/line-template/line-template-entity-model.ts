import { LineTemplateNameValueObject, LineTemplateTitleValueObject, OrderValueObject } from '@/domain/report'
import { IdValueObject, type IEntityModel } from '@/domain/shared'
import { type LineTemplateDTO } from './line-template-dtos'

export class LineTemplateEntityModel implements IEntityModel<LineTemplateDTO> {
  constructor (
    public readonly lineTemplateId: IdValueObject,
    public readonly reportTemplateId: IdValueObject,
    public readonly title: LineTemplateTitleValueObject,
    public readonly name: LineTemplateNameValueObject,
    public readonly createdBy: IdValueObject,
    public readonly lineOrder: OrderValueObject,
    public readonly draggable: boolean,
    public readonly active: boolean
  ) { }

  static create (
    {
      lineTemplateId,
      reportTemplateId,
      lineOrder,
      title,
      name,
      active,
      draggable,
      createdBy
    }: LineTemplateDTO
  ): LineTemplateEntityModel {
    const lineTemplateIdOrError = IdValueObject.create(lineTemplateId)
    const reportTemplateIdOrError = IdValueObject.create(reportTemplateId)
    const titleOrError = LineTemplateTitleValueObject.create(title)
    const nameOrError = LineTemplateNameValueObject.create(name)
    const createdByOrError = IdValueObject.create(createdBy)
    const lineOrderOrError = OrderValueObject.create(lineOrder)

    return new LineTemplateEntityModel(
      lineTemplateIdOrError,
      reportTemplateIdOrError,
      titleOrError,
      nameOrError,
      createdByOrError,
      lineOrderOrError,
      draggable,
      active
    )
  }

  getValues (): LineTemplateDTO {
    return {
      lineTemplateId: this.lineTemplateId.value,
      reportTemplateId: this.reportTemplateId.value,
      title: this.title.value,
      name: this.name.value,
      createdBy: this.createdBy.value,
      lineOrder: this.lineOrder.value,
      draggable: this.draggable,
      active: this.active
    }
  }
}
