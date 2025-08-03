import {
  ReportTypeDescriptionValueObject,
  ReportTypeIconValueObject,
  ReportTypeNameValueObject
} from '@/domain/report'
import { IdValueObject, type IEntityModel } from '@/domain/shared'
import { type ReportTypeDTO } from './report-type-dtos'

export class ReportTypeEntityModel implements IEntityModel<ReportTypeDTO> {
  constructor (
    public readonly reportTypeId: IdValueObject,
    public readonly typeName: ReportTypeNameValueObject,
    public readonly icon: ReportTypeIconValueObject,
    public readonly description: ReportTypeDescriptionValueObject,
    public readonly createdBy: IdValueObject,
    public readonly active: boolean
  ) { }

  static create (
    {
      reportTypeId,
      typeName,
      icon,
      description,
      createdBy,
      active
    }: ReportTypeDTO
  ): ReportTypeEntityModel {
    const reportTypeIdOrError = IdValueObject.create(reportTypeId)
    const typeNameOrError = ReportTypeNameValueObject.create(typeName)
    const iconOrError = ReportTypeIconValueObject.create(icon)
    const descriptionOrError = ReportTypeDescriptionValueObject.create(description)
    const createdByOrError = IdValueObject.create(createdBy)

    return new ReportTypeEntityModel(
      reportTypeIdOrError,
      typeNameOrError,
      iconOrError,
      descriptionOrError,
      createdByOrError,
      active
    )
  }

  getValues (): ReportTypeDTO {
    return {
      reportTypeId: this.reportTypeId.value,
      typeName: this.typeName.value,
      icon: this.icon.value,
      description: this.description.value,
      createdBy: this.createdBy.value,
      active: this.active
    }
  }
}
