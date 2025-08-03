import { IdValueObject } from '@/domain/shared'
import { type ReportDataSchemaDTO } from './report-data-schema-dtos'
import { type IEntityModel } from '@/domain/shared'
import { DateValueObject, JtdColumnValueObject, RDSCreatedByValueObject, VersionValueObject } from '../../value-objects'

export class ReportDataSchemaEntityModel implements IEntityModel<ReportDataSchemaDTO> {
  constructor (
    public readonly reportDataSchemaId: IdValueObject,
    public readonly jtd: JtdColumnValueObject,
    public readonly version: VersionValueObject,
    public readonly createdBy: RDSCreatedByValueObject,
    public readonly createdAt: DateValueObject
  ) { }

  static create (
    {
      reportDataSchemaId,
      jtd,
      version,
      createdBy,
      createdAt
    }: ReportDataSchemaDTO
  ): ReportDataSchemaEntityModel {
    const reportDataSchemaIdOrError = IdValueObject.create(reportDataSchemaId)
    const jtdOrError = JtdColumnValueObject.create(jtd)
    const versionOrError = VersionValueObject.create(version)
    const createdByOrError = RDSCreatedByValueObject.create(createdBy)
    const createdAtOrError = DateValueObject.create(createdAt)

    if (reportDataSchemaIdOrError instanceof Error) throw reportDataSchemaIdOrError
    if (jtdOrError instanceof Error) throw jtdOrError
    if (versionOrError instanceof Error) throw versionOrError

    return new ReportDataSchemaEntityModel(
      reportDataSchemaIdOrError,
      jtdOrError,
      versionOrError,
      createdByOrError,
      createdAtOrError
    )
  }

  getValues (): ReportDataSchemaDTO {
    return {
      reportDataSchemaId: this.reportDataSchemaId.value,
      jtd: this.jtd.value,
      version: this.version.value,
      createdBy: this.createdBy.value,
      createdAt: this.createdAt.value
    }
  }
}
