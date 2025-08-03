import { type ILineTemplateRepository, LineTemplateEntityModel } from '@/domain/report'
import { IdValueObject, NotFoundError } from '@/domain/shared'
import { type LineTemplateDTO, type LineTemplateDTOWithoutId } from './line-template-dtos'

export class LineTemplateEntity {
  constructor (private readonly repository: ILineTemplateRepository) { }

  async create (dto: LineTemplateDTOWithoutId): Promise<LineTemplateEntityModel> {
    const lineTemplateModelOrError = LineTemplateEntityModel.create(
      {
        lineTemplateId: 1,
        ...dto
      }
    )

    return await this.repository.create(lineTemplateModelOrError)
  }

  async getById (lineTemplateId: number): Promise<LineTemplateEntityModel> {
    const lineTemplateIdOrError = IdValueObject.create(lineTemplateId)

    return await this.repository.getById(lineTemplateIdOrError)
  }

  async getByReportTemplateId (reportTemplateId: number): Promise<LineTemplateEntityModel[]> {
    const reportTemplateIdOrError = IdValueObject.create(reportTemplateId)

    return await this.repository.getByReportTemplateId(reportTemplateIdOrError)
  }

  async getAll (): Promise<LineTemplateEntityModel[]> {
    return await this.repository.getAll()
  }

  async update (dto: LineTemplateDTO): Promise<LineTemplateEntityModel> {
    const lineTemplateModelOrError = LineTemplateEntityModel.create(dto)

    const lineTemplateExists = await this.repository.getById(lineTemplateModelOrError.lineTemplateId)

    if (!lineTemplateExists) throw new NotFoundError('Esse template de linha não existe')

    return await this.repository.update(lineTemplateModelOrError)
  }

  async delete (
    lineTemplateId: number
  ): Promise<LineTemplateEntityModel> {
    const lineTemplateIdOrError = IdValueObject.create(lineTemplateId)

    const lineTemplateExists = await this.repository.getById(lineTemplateIdOrError)

    if (!lineTemplateExists) throw new NotFoundError('Esse template de linha não existe')

    return await this.repository.delete(lineTemplateIdOrError)
  }
}
