import { type ISpotTypeRepository, SpotTypeEntityModel } from '@/domain/report'
import { IdValueObject, NotFoundError, StringValueObject } from '@/domain/shared'
import { type SpotTypeDTO, type SpotTypeDTOWithoutId } from './spot-type-dtos'

export class SpotTypeEntity {
  constructor (private readonly repository: ISpotTypeRepository) { }

  async create (dto: SpotTypeDTOWithoutId): Promise<SpotTypeEntityModel> {
    const spotTypeModelOrError = SpotTypeEntityModel.create(
      {
        spotTypeId: 1,
        ...dto
      }
    )

    return await this.repository.create(spotTypeModelOrError)
  }

  async getById (spotTypeId: number): Promise<SpotTypeEntityModel> {
    const spotTypeIdOrError = IdValueObject.create(spotTypeId)

    return await this.repository.getById(spotTypeIdOrError)
  }

  async getSpotTypeByName (name: string): Promise<SpotTypeEntityModel> {
    const nameValue = StringValueObject.create(name)
    return await this.repository.getSpotTypeByName(nameValue)
  }

  async getAll (): Promise<SpotTypeEntityModel[]> {
    return await this.repository.getAll()
  }

  async update (dto: SpotTypeDTO): Promise<SpotTypeEntityModel> {
    const spotTypeModelOrError = SpotTypeEntityModel.create(dto)

    const spotTypeIdOrError = IdValueObject.create(spotTypeModelOrError.spotTypeId.value)

    const spotTypeExists = await this.repository.getById(spotTypeIdOrError)

    if (!spotTypeExists) throw new NotFoundError('Esse tipo de ponto não existe')

    return await this.repository.update(spotTypeModelOrError)
  }

  async delete (
    spotTypeId: number
  ): Promise<SpotTypeEntityModel> {
    const spotTypeIdOrError = IdValueObject.create(spotTypeId)

    const spotTypeExists = await this.repository.getById(spotTypeIdOrError)

    if (!spotTypeExists) throw new NotFoundError('Esse tipo de ponto não existe')

    return await this.repository.delete(spotTypeIdOrError)
  }
}
