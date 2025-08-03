import { IdValueObject, NotFoundError } from '@/domain/shared'
import { type ReportDataSchemaDTO, type ReportDataSchemaDTOWithoutId } from './report-data-schema-dtos'
import { ReportDataSchemaEntityModel } from './report-data-schema-entity-model'
import { type IReportDataSchemaRepository } from '../../interfaces/database/ireport-data-schema-repository'

export class ReportDataSchemaEntity {
  constructor (private readonly repository: IReportDataSchemaRepository) { }

  async create (dto: ReportDataSchemaDTOWithoutId): Promise<ReportDataSchemaEntityModel> {
    const reportDataSchemaId = IdValueObject.create(1) // assuming 1 for simplicity, replace with appropriate logic

    if (reportDataSchemaId instanceof Error) throw reportDataSchemaId

    const reportModelOrError = ReportDataSchemaEntityModel.create({
      reportDataSchemaId: reportDataSchemaId.value,
      ...dto
    })

    if (reportModelOrError instanceof Error) throw reportModelOrError

    return await this.repository.create(reportModelOrError)
  }

  async getById (reportDataSchemaId: number): Promise<ReportDataSchemaEntityModel> {
    const reportDataSchemaIdOrError = IdValueObject.create(reportDataSchemaId)

    if (reportDataSchemaIdOrError instanceof Error) throw reportDataSchemaIdOrError

    const reportDataSchema = await this.repository.getById(reportDataSchemaIdOrError)

    if (!reportDataSchema) throw new NotFoundError('Esse schema de dados não existe')

    return reportDataSchema
  }

  async getAll (): Promise<ReportDataSchemaEntityModel[]> {
    return await this.repository.getAll()
  }

  async update (dto: ReportDataSchemaDTO): Promise<ReportDataSchemaEntityModel> {
    const reportModelOrError = ReportDataSchemaEntityModel.create(dto)

    if (reportModelOrError instanceof Error) throw reportModelOrError

    const reportExists = await this.repository.getById(reportModelOrError.reportDataSchemaId)

    if (!reportExists) throw new NotFoundError('Esse schema de dados não existe')

    return await this.repository.update(reportModelOrError)
  }

  async delete (reportDataSchemaId: number): Promise<void> {
    const reportDataSchemaIdOrError = IdValueObject.create(reportDataSchemaId)

    if (reportDataSchemaIdOrError instanceof Error) throw reportDataSchemaIdOrError

    const reportExists = await this.repository.getById(reportDataSchemaIdOrError)

    if (!reportExists) throw new NotFoundError('Esse schema de dados não existe')

    await this.repository.delete(reportDataSchemaIdOrError)
  }

  async getLatest (): Promise<ReportDataSchemaEntityModel> {
    const latestReportDataSchema = await this.repository.getLatest()

    if (!latestReportDataSchema) throw new NotFoundError('Nenhum schema de dados encontrado')

    return latestReportDataSchema
  }
}
