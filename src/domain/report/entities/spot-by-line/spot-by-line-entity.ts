import { type ISpotByLineRepository, SpotByLineEntityModel } from '@/domain/report'
import { IdValueObject, NotFoundError } from '@/domain/shared'
import { type SpotByLineDTO, type SpotByLineDTOWithoutId } from './spot-by-line-dtos'

export class SpotByLineEntity {
  constructor (private readonly repository: ISpotByLineRepository) { }

  async create (dto: SpotByLineDTOWithoutId): Promise<SpotByLineEntityModel> {
    const spotByLineModelOrError = SpotByLineEntityModel.create(
      {
        spotByLineId: 1,
        ...dto
      }
    )

    return await this.repository.create(spotByLineModelOrError)
  }

  async getById (spotByLineId: number): Promise<SpotByLineEntityModel> {
    const spotByLineIdOrError = IdValueObject.create(spotByLineId)

    return await this.repository.getById(spotByLineIdOrError)
  }

  async getAll (): Promise<SpotByLineEntityModel[]> {
    return await this.repository.getAll()
  }

  async update (dto: SpotByLineDTO): Promise<SpotByLineEntityModel> {
    const spotByLineModelOrError = SpotByLineEntityModel.create(dto)

    const spotByLineExists = await this.repository.getById(spotByLineModelOrError.spotByLineId)

    if (!spotByLineExists) throw new NotFoundError('Esse ponto por linha não existe')

    return await this.repository.update(spotByLineModelOrError)
  }

  async delete (
    spotByLineId: number
  ): Promise<SpotByLineEntityModel> {
    const spotByLineIdOrError = IdValueObject.create(spotByLineId)

    const spotByLineExists = await this.repository.getById(spotByLineIdOrError)

    if (!spotByLineExists) throw new NotFoundError('Esse ponto por linha não existe')

    return await this.repository.delete(spotByLineIdOrError)
  }

  async getSpotByLineByLineTemplateId (lineTemplateId: number): Promise<SpotByLineEntityModel[]> {
    const lineTemplateIdOrError = IdValueObject.create(lineTemplateId)

    return await this.repository.getSpotByLineByLineTemplateId(lineTemplateIdOrError)
  }
}
