import {
  NumberOfLinesValueObject,
  ReportTemplateDescriptionValueObject,
  ReportTemplateNameValueObject,
  ReportTemplateTitleValueObject,
  ReportTemplateVersionValueObject,
  IntervalValueObject,
  PathValueObject
} from '@/domain/report'
import { DateValueObject, IdValueObject, type IEntityModel } from '@/domain/shared'
import { type ReportTemplateDTO } from './report-template-dtos'
import { StatusValueObject } from '../../value-objects/report-template/report-template-status/report-template-status-value-object'

export class ReportTemplateEntityModel implements IEntityModel<ReportTemplateDTO> {
  constructor (
    public readonly reportTemplateId: IdValueObject,
    public readonly reportTypeId: IdValueObject,
    public readonly path: PathValueObject,
    public readonly reportName: ReportTemplateNameValueObject,
    public readonly title: ReportTemplateTitleValueObject,
    public readonly description: ReportTemplateDescriptionValueObject,
    public readonly numberOfLines: NumberOfLinesValueObject,
    public readonly cachePurgePeriod: IntervalValueObject,
    public readonly formatting: object,
    public readonly createdBy: IdValueObject,
    public readonly version: ReportTemplateVersionValueObject,
    public readonly active: boolean,
    public readonly draft: boolean,
    public readonly status?: StatusValueObject,
    public readonly updatedAt?: DateValueObject
  ) { }

  static create (
    {
      reportTemplateId,
      reportTypeId,
      reportName,
      path,
      title,
      description,
      numberOfLines,
      cachePurgePeriod,
      formatting,
      version,
      createdBy,
      active,
      draft,
      status,
      updatedAt
    }: ReportTemplateDTO
  ): ReportTemplateEntityModel {
    const reportTemplateIdOrError = IdValueObject.create(reportTemplateId)
    const reportTypeIdOrError = IdValueObject.create(reportTypeId)
    const reportNameOrError = ReportTemplateNameValueObject.create(reportName)
    const pathOrError = PathValueObject.create(path)
    const titleOrError = ReportTemplateTitleValueObject.create(title)
    const descriptionOrError = ReportTemplateDescriptionValueObject.create(description)
    const numberOfLinesOrError = NumberOfLinesValueObject.create(numberOfLines)
    const cachePurgePeriodOrError = IntervalValueObject.create(cachePurgePeriod)
    const createdByOrError = IdValueObject.create(createdBy)
    const versionOrError = ReportTemplateVersionValueObject.create(version)
    let statusOrError: StatusValueObject | undefined
    let updatedAtOrError: DateValueObject | undefined

    if (status) statusOrError = StatusValueObject.create(status)
    if (updatedAt) updatedAtOrError = DateValueObject.create(updatedAt)

    return new ReportTemplateEntityModel(
      reportTemplateIdOrError,
      reportTypeIdOrError,
      pathOrError,
      reportNameOrError,
      titleOrError,
      descriptionOrError,
      numberOfLinesOrError,
      cachePurgePeriodOrError,
      formatting,
      createdByOrError,
      versionOrError,
      active,
      draft,
      statusOrError,
      updatedAtOrError
    )
  }

  getValues (): ReportTemplateDTO {
    return {
      reportTemplateId: this.reportTemplateId.value,
      reportTypeId: this.reportTypeId.value,
      reportName: this.reportName.value,
      path: this.path.value,
      title: this.title.value,
      description: this.description.value,
      numberOfLines: this.numberOfLines.value,
      cachePurgePeriod: this.cachePurgePeriod.value,
      formatting: this.formatting,
      createdBy: this.createdBy.value,
      version: this.version.value,
      active: this.active,
      draft: this.draft,
      status: this.status?.value,
      updatedAt: this.updatedAt?.value
    }
  }
}
