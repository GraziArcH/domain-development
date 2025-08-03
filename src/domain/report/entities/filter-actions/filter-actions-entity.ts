import { type IFilterActionsRepository, FilterActionsEntityModel } from '@/domain/report'
import { IdValueObject } from '@/domain/shared'
import { type FilterActionsDTO, type FilterActionsDTOWithoutId } from './filter-actions-dtos'

export class FilterActionsEntity {
  constructor (private readonly repository: IFilterActionsRepository) { }

  async create (dto: FilterActionsDTOWithoutId): Promise<FilterActionsEntityModel> {
    const filterClassificationModelOrError = FilterActionsEntityModel.create({
      filterActionId: 1,
      ...dto
    })

    return await this.repository.create(filterClassificationModelOrError)
  }

  async getById (filterClassificationId: number): Promise<FilterActionsEntityModel> {
    const filterClassificationIdOrError = IdValueObject.create(filterClassificationId)

    return await this.repository.getById(filterClassificationIdOrError)
  }

  async getAll (): Promise<FilterActionsEntityModel[]> {
    return await this.repository.getAll()
  }

  async update (dto: FilterActionsDTO): Promise<FilterActionsEntityModel> {
    const filterClassificationModelOrError = FilterActionsEntityModel.create(dto)

    const filterClassificationIdOrError = IdValueObject.create(filterClassificationModelOrError.filterActionId.value)

    const filterClassificationExists = await this.repository.getById(filterClassificationIdOrError)

    if (!filterClassificationExists) throw new Error('Esta classificação de filtro não existe')

    return await this.repository.update(filterClassificationModelOrError)
  }

  async delete (filterClassificationId: number): Promise<FilterActionsEntityModel> {
    const filterClassificationIdOrError = IdValueObject.create(filterClassificationId)

    const filterClassificationExists = await this.repository.getById(filterClassificationIdOrError)

    if (!filterClassificationExists) throw new Error('Esta classificação de filtro não existe')

    return await this.repository.delete(filterClassificationIdOrError)
  }
}
