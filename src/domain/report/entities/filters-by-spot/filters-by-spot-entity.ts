import { type IFiltersBySpotRepository, FiltersBySpotEntityModel } from '@/domain/report'
import { IdValueObject } from '@/domain/shared'
import { type FilterBySpotDTO, type FilterBySpotWithoutIdDTO } from './filters-by-spot-dtos'

export class FiltersBySpotEntity {
  constructor (private readonly repository: IFiltersBySpotRepository) { }

  async create (dto: FilterBySpotWithoutIdDTO): Promise<FiltersBySpotEntityModel> {
    const filtersBySpotModelOrError = FiltersBySpotEntityModel.create({
      filtersBySpotId: 1,
      ...dto
    })

    return await this.repository.create(filtersBySpotModelOrError)
  }

  async getById (filtersBySpotId: number): Promise<FiltersBySpotEntityModel> {
    const filtersBySpotIdOrError = IdValueObject.create(filtersBySpotId)

    return await this.repository.getById(filtersBySpotIdOrError)
  }

  async getAll (): Promise<FiltersBySpotEntityModel[]> {
    return await this.repository.getAll()
  }

  async update (dto: FilterBySpotDTO): Promise<FiltersBySpotEntityModel> {
    const filtersBySpotModelOrError = FiltersBySpotEntityModel.create(dto)

    const filtersBySpotExists = await this.repository.getById(filtersBySpotModelOrError.filtersBySpotId)

    if (!filtersBySpotExists) throw new Error('Esses filtros por spot não existem')

    return await this.repository.update(filtersBySpotModelOrError)
  }

  async delete (
    filtersBySpotId: number
  ): Promise<FiltersBySpotEntityModel> {
    const filtersBySpotIdOrError = IdValueObject.create(filtersBySpotId)

    const filtersBySpotExists = await this.repository.getById(filtersBySpotIdOrError)

    if (!filtersBySpotExists) throw new Error('Esses filtros por spot não existem')

    return await this.repository.delete(filtersBySpotIdOrError)
  }

  async removeFilterFromTemplate (templateId: number, filterId: number): Promise<FiltersBySpotEntityModel> {
    const templateIdValue = IdValueObject.create(templateId)

    const filterIdValue = IdValueObject.create(filterId)

    return await this.repository.removeFilterFromTemplate(templateIdValue, filterIdValue)
  }
}
