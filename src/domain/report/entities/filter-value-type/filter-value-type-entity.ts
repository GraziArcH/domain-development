import { type IFilterValueTypeRepository, FilterValueTypeEntityModel } from '@/domain/report'
import { IdValueObject, NotFoundError } from '@/domain/shared'
import { type FilterValueTypeDTO, type FilterValueTypeWithoutIdDTO } from './filter-value-type-dtos'

export class FilterValueTypeEntity {
  constructor (private readonly repository: IFilterValueTypeRepository) { }

  async create (dto: FilterValueTypeWithoutIdDTO): Promise<FilterValueTypeEntityModel> {
    const filterTypeModelOrError = FilterValueTypeEntityModel.create(
      {
        filterValueTypeId: 1,
        ...dto
      }
    )

    return await this.repository.create(filterTypeModelOrError)
  }

  async getById (filterTypeId: number): Promise<FilterValueTypeEntityModel> {
    const filterTypeIdOrError = IdValueObject.create(filterTypeId)

    return await this.repository.getById(filterTypeIdOrError)
  }

  async getAll (): Promise<FilterValueTypeEntityModel[]> {
    return await this.repository.getAll()
  }

  async update (dto: FilterValueTypeDTO): Promise<FilterValueTypeEntityModel> {
    const filterTypeModelOrError = FilterValueTypeEntityModel.create(
      {
        filterValueTypeId: 1,
        ...dto
      }
    )
    const filterTypeIdOrError = IdValueObject.create(filterTypeModelOrError.filterValueTypeId.value)

    const filterTypeExists = await this.repository.getById(filterTypeIdOrError)

    if (!filterTypeExists) throw new NotFoundError('Esse tipo de filtro não existe')

    return await this.repository.update(filterTypeModelOrError)
  }

  async delete (
    filterTypeId: number
  ): Promise<FilterValueTypeEntityModel> {
    const filterTypeIdOrError = IdValueObject.create(filterTypeId)

    const filterTypeExists = await this.repository.getById(filterTypeIdOrError)

    if (!filterTypeExists) throw new NotFoundError('Esse tipo de filtro não existe')

    return await this.repository.delete(filterTypeIdOrError)
  }
}
