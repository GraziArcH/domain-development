import { type IFilterRepository, FilterEntityModel } from '@/domain/report'
import { IdValueObject, StringValueObject } from '@/domain/shared'
import { type FilterDTO, type FilterWithoutIdDTO } from './filter-dtos'

export class FilterEntity {
  constructor (private readonly repository: IFilterRepository) { }

  async create (dto: FilterWithoutIdDTO): Promise<FilterEntityModel> {
    const filterModelOrError = FilterEntityModel.create({
      filterId: 1,
      ...dto
    })

    return await this.repository.create(filterModelOrError)
  }

  async getById (filterId: number): Promise<FilterEntityModel> {
    const filterIdOrError = IdValueObject.create(filterId)

    return await this.repository.getById(filterIdOrError)
  }

  async getParentId (filterId: number): Promise<FilterEntityModel[]> {
    const filterIdOrError = IdValueObject.create(filterId)

    return await this.repository.getByParentId(filterIdOrError)
  }

  async getBySpotTemplateId (spotTemplateId: number): Promise<FilterEntityModel[]> {
    const spotTemplateIdOrError = IdValueObject.create(spotTemplateId)

    return await this.repository.getBySpotTemplateId(spotTemplateIdOrError)
  }

  async getBySpotTemplateName (spotTemplateName: string): Promise<FilterEntityModel[]> {
    const spotTemplateNameOrError = StringValueObject.create(spotTemplateName)
    return await this.repository.getBySpotTemplateName(spotTemplateNameOrError)
  }

  async getBySpotTemplateIdWithYourDependents (spotTemplateId: number): Promise<FilterEntityModel[]> {
    const spotTemplateIdOrError = IdValueObject.create(spotTemplateId)

    return await this.repository.getBySpotTemplateIdWithYourDependents(spotTemplateIdOrError)
  }

  async getFiltersByReportTemplateId (reportTemplateId: number): Promise<FilterEntityModel[]> {
    const reportTemplateIdOrError = IdValueObject.create(reportTemplateId)

    return await this.repository.getFiltersByReportTemplateId(reportTemplateIdOrError)
  }

  async getFiltersByReportTemplateName (reportTemplateName: string): Promise<FilterEntityModel[]> {
    const reportTemplateNameOrError = StringValueObject.create(reportTemplateName)

    return await this.repository.getFiltersByReportTemplateName(reportTemplateNameOrError)
  }

  async removeLineFilterByFilterIdAndReportTemplaName (filterId: number, reportTemplateName: string): Promise<void> {
    const filterIdOrError = IdValueObject.create(filterId)
    const reportTemplateNameOrError = StringValueObject.create(reportTemplateName)

    await this.repository.removeLineFilterByFilterIdAndReportTemplaName(filterIdOrError, reportTemplateNameOrError)
  }

  async getFiltersByLine (spotId: number, lineId: number): Promise<FilterEntityModel[]> {
    const spotIdOrError = IdValueObject.create(spotId)
    const lineIdOrError = IdValueObject.create(lineId)

    return await this.repository.getFiltersByLine(spotIdOrError, lineIdOrError)
  }

  async getAll (): Promise<FilterEntityModel[]> {
    return await this.repository.getAll()
  }

  async update (dto: FilterDTO): Promise<FilterEntityModel> {
    const filterModelOrError = FilterEntityModel.create(dto)

    const filterIdOrError = IdValueObject.create(filterModelOrError.filterId.value)

    const filterExists = await this.repository.getById(filterIdOrError)

    if (!filterExists) throw new Error('Esse filtro não existe')

    return await this.repository.update(filterModelOrError)
  }

  async delete (
    filterId: number
  ): Promise<FilterEntityModel> {
    const filterIdOrError = IdValueObject.create(filterId)

    const filterExists = await this.repository.getById(filterIdOrError)

    if (!filterExists) throw new Error('Esse filtro não existe')

    return await this.repository.delete(filterIdOrError)
  }
}
