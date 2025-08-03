import { type ISpotByLineFiltersRepository, SpotByLineFiltersEntityModel } from '@/domain/report'
import { IdValueObject, NotFoundError } from '@/domain/shared'
import { type SpotByLineFiltersDTO, type SpotByLineFiltersDTOWithoutId } from './spot-by-line-filters-dtos'

export class SpotByLineFiltersEntity {
  constructor (private readonly repository: ISpotByLineFiltersRepository) { }

  async create (dto: SpotByLineFiltersDTOWithoutId): Promise<SpotByLineFiltersEntityModel> {
    const spotByLinePrimaryFiltersModelOrError = SpotByLineFiltersEntityModel.create({
      spotByLineFiltersId: 1,
      ...dto
    })

    return await this.repository.create(spotByLinePrimaryFiltersModelOrError)
  }

  async getById (spotByLineFiltersId: number): Promise<SpotByLineFiltersEntityModel> {
    const spotByLineFiltersIdOrError = IdValueObject.create(spotByLineFiltersId)

    return await this.repository.getById(spotByLineFiltersIdOrError)
  }

  async getAll (): Promise<SpotByLineFiltersEntityModel[]> {
    return await this.repository.getAll()
  }

  async update (dto: SpotByLineFiltersDTO): Promise<SpotByLineFiltersEntityModel> {
    const spotByLinePrimaryFiltersModelOrError = SpotByLineFiltersEntityModel.create(dto)

    const spotByLinePrimaryFiltersExists = await this.repository.getById(spotByLinePrimaryFiltersModelOrError.spotByLineFiltersId)

    if (!spotByLinePrimaryFiltersExists) throw new NotFoundError('Esses filtros primários do ponto por linha não existem')

    return await this.repository.update(spotByLinePrimaryFiltersModelOrError)
  }

  async updateFiltersByLine (
    lineTemplateId: number,
    filterId: number,
    visible?: boolean,
    defaultFilterIds?: number[]
  ): Promise<void> {
    // Criação dos Value Objects para filterId e lineTemplateId
    const filterIdOrError = IdValueObject.create(filterId)
    const lineIdOrError = IdValueObject.create(lineTemplateId)

    // Criação dos Value Objects para defaultFilterIds, se existir
    let defaultFilterIdObjects: IdValueObject[] = []
    if (defaultFilterIds) {
      defaultFilterIdObjects = defaultFilterIds.map(id => IdValueObject.create(id))
    }

    // Chama o repositório para atualizar os filtros
    await this.repository.updateFiltersByLine(
      lineIdOrError,
      filterIdOrError,
      visible,
      defaultFilterIdObjects // Passa o array de IdValueObject se estiver definido
    )
  }

  async delete (spotByLineFiltersId: number): Promise<SpotByLineFiltersEntityModel> {
    const spotByLineFiltersIdOrError = IdValueObject.create(spotByLineFiltersId)

    const spotByLinePrimaryFiltersExists = await this.repository.getById(spotByLineFiltersIdOrError)

    if (!spotByLinePrimaryFiltersExists) throw new NotFoundError('Esses filtros primários do ponto por linha não existem')

    return await this.repository.delete(spotByLineFiltersIdOrError)
  }

  async getSpotByLineFiltersBySpotByLineId (spotByLineId: number): Promise<SpotByLineFiltersEntityModel[]> {
    const spotByLineIdOrError = IdValueObject.create(spotByLineId)

    return await this.repository.getSpotByLineFiltersBySpotByLineId(spotByLineIdOrError)
  }
}
