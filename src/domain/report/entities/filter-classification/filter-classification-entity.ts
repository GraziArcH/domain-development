import { type IFilterClassificationRepository, FilterClassificationEntityModel } from '@/domain/report'
import { IdValueObject } from '@/domain/shared'
import { type FilterClassificationDTO, type FilterClassificationWithoutIdDTO } from './filter-classification-dtos'

export class FilterClassificationEntity {
  constructor (private readonly repository: IFilterClassificationRepository) { }

  async create (dto: FilterClassificationWithoutIdDTO): Promise<FilterClassificationEntityModel> {
    const filterClassificationModelOrError = FilterClassificationEntityModel.create({
      filterClassificationId: 1,
      ...dto
    })

    return await this.repository.create(filterClassificationModelOrError)
  }

  async getById (filterClassificationId: number): Promise<FilterClassificationEntityModel> {
    const filterClassificationIdOrError = IdValueObject.create(filterClassificationId)

    return await this.repository.getById(filterClassificationIdOrError)
  }

  async getAll (): Promise<FilterClassificationEntityModel[]> {
    return await this.repository.getAll()
  }

  async update (dto: FilterClassificationDTO): Promise<FilterClassificationEntityModel> {
    const filterClassificationModelOrError = FilterClassificationEntityModel.create(dto)

    const filterClassificationIdOrError = IdValueObject.create(filterClassificationModelOrError.filterClassificationId.value)

    const filterClassificationExists = await this.repository.getById(filterClassificationIdOrError)

    if (!filterClassificationExists) throw new Error('Esta classificação de filtro não existe')

    return await this.repository.update(filterClassificationModelOrError)
  }

  async delete (filterClassificationId: number): Promise<FilterClassificationEntityModel> {
    const filterClassificationIdOrError = IdValueObject.create(filterClassificationId)

    const filterClassificationExists = await this.repository.getById(filterClassificationIdOrError)

    if (!filterClassificationExists) throw new Error('Esta classificação de filtro não existe')

    return await this.repository.delete(filterClassificationIdOrError)
  }
}
