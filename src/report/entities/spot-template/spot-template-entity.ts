import { type ISpotTemplateRepository, SpotTemplateEntityModel, SpotTemplateNameValueObject, type SpotTemplateDTO, type SpotTemplateDTOWithoutId, PurgeTimeDTO } from '@/domain/report'
import { IdValueObject, NotFoundError } from '@/domain/shared'

export class SpotTemplateEntity {
  constructor(private readonly repository: ISpotTemplateRepository) { }

  async create(dto: SpotTemplateDTOWithoutId): Promise<SpotTemplateEntityModel> {
    const spotTemplateModelOrError = SpotTemplateEntityModel.create(
      {
        spotTemplateId: 1,
        ...dto
      }
    )

    return await this.repository.create(spotTemplateModelOrError)
  }

  async getById(spotTemplateId: number): Promise<SpotTemplateEntityModel> {
    const spotTemplateIdOrError = IdValueObject.create(spotTemplateId)
    return await this.repository.getById(spotTemplateIdOrError)
  }

  async getByName(spotTemplateName: string): Promise<SpotTemplateEntityModel> {
    const spotTemplateNameOrError = SpotTemplateNameValueObject.create(spotTemplateName)

    return await this.repository.getByName(spotTemplateNameOrError)
  }

  async getByLineTemplateId(lineTemplateId: number): Promise<SpotTemplateEntityModel[]> {
    const spotTemplateIdOrError = IdValueObject.create(lineTemplateId)

    return await this.repository.getByLineTemplateId(spotTemplateIdOrError)
  }

  async getAll(): Promise<SpotTemplateEntityModel[]> {
    return await this.repository.getAll()
  }

  async update(dto: SpotTemplateDTO): Promise<SpotTemplateEntityModel> {
    const spotTemplateModelOrError = SpotTemplateEntityModel.create(dto)
    const spotTemplateIdOrError = IdValueObject.create(spotTemplateModelOrError.spotTemplateId.value)
    const spotTemplateExists = await this.repository.getById(spotTemplateIdOrError)

    if (!spotTemplateExists) throw new NotFoundError('Esse modelo de ponto não existe')

    return await this.repository.update(spotTemplateModelOrError)
  }

  async delete(
    spotTemplateId: number
  ): Promise<SpotTemplateEntityModel> {
    const spotTemplateIdOrError = IdValueObject.create(spotTemplateId)

    const spotTemplateExists = await this.repository.getById(spotTemplateIdOrError)

    if (!spotTemplateExists) throw new NotFoundError('Esse modelo de ponto não existe')

    return await this.repository.delete(spotTemplateIdOrError)
  }

  async findTemplates(filter: { name?: string, active?: boolean, draft?: boolean }): Promise<SpotTemplateEntityModel[]> {
    return await this.repository.findTemplates(filter)
  }

  async deactivateOthersByName(name: string): Promise<void> {
    await this.repository.deactivateOthersByName(name)
  }

  async softDelete(spotTemplateId: number): Promise<SpotTemplateEntityModel> {
    return await this.repository.softDelete(spotTemplateId)
  }

  async getAllPurgeTimes(): Promise<PurgeTimeDTO[]> {
    return await this.repository.getAllPurgeTimes()
  }
}
