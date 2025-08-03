import { type IReportTypeRepository, ReportTypeEntityModel } from '@/domain/report'
import { IdValueObject, NotFoundError } from '@/domain/shared'
import { type ReportTypeDTO, type ReportTypeDTOWithoutId } from './report-type-dtos'

export class ReportTypeEntity {
  constructor (private readonly repository: IReportTypeRepository) { }

  async create (dto: ReportTypeDTOWithoutId): Promise<ReportTypeEntityModel> {
    const reportTypeModelOrError = ReportTypeEntityModel.create(
      {
        reportTypeId: 1,
        ...dto
      }
    )

    return await this.repository.create(reportTypeModelOrError)
  }

  async getById (reportTypeId: number): Promise<ReportTypeEntityModel> {
    const reportTypeIdOrError = IdValueObject.create(reportTypeId)

    return await this.repository.getById(reportTypeIdOrError)
  }

  async getAll (): Promise<ReportTypeEntityModel[]> {
    return await this.repository.getAll()
  }

  async update (dto: ReportTypeDTO): Promise<ReportTypeEntityModel> {
    const reportTypeModelOrError = ReportTypeEntityModel.create(dto)

    const reportTypeExists = await this.repository.getById(reportTypeModelOrError.reportTypeId)

    if (!reportTypeExists) throw new NotFoundError('Esse tipo de relatório não existe')

    return await this.repository.update(reportTypeModelOrError)
  }

  async delete (
    reportTypeId: number
  ): Promise<ReportTypeEntityModel> {
    const reportTypeIdOrError = IdValueObject.create(reportTypeId)

    const reportTypeExists = await this.repository.getById(reportTypeIdOrError)

    if (!reportTypeExists) throw new NotFoundError('Esse tipo de relatório não existe')

    return await this.repository.delete(reportTypeIdOrError)
  }
}
