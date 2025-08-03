import { type ICustomSpotRepository, CustomSpotEntityModel } from '@/domain/report'
import { IdValueObject, NotFoundError, StringValueObject } from '@/domain/shared'
import { type CustomSpotDTOWithoutIdAndOrder } from './custom-spot-dtos'

export class CustomSpotEntity {
  constructor (private readonly repository: ICustomSpotRepository) { }

  async create (dto: CustomSpotDTOWithoutIdAndOrder): Promise<CustomSpotEntityModel> {
    const customSpotModelOrError = CustomSpotEntityModel.create(
      {
        customSpotId: 1,
        order: 1,
        ...dto
      }
    )

    return await this.repository.create(customSpotModelOrError)
  }

  async getByUserId (userId: number): Promise<CustomSpotEntityModel[]> {
    const userIdOrError = IdValueObject.create(userId)

    return await this.repository.getByUserId(userIdOrError)
  }

  async getBySpotNameAndFilter (spotName: string, filters: string): Promise<CustomSpotEntityModel | null> {
    const spotNameOrError = StringValueObject.create(spotName)
    const filtersOrError = StringValueObject.create(filters)

    return await this.repository.getBySpotNameAndFilter(spotNameOrError, filtersOrError)
  }

  async delete (customSpotId: number): Promise<CustomSpotEntityModel> {
    const customSpotIdOrError = IdValueObject.create(customSpotId)

    const customSpotExists = await this.repository.getById(customSpotIdOrError)

    if (!customSpotExists) throw new NotFoundError('Esse spot customizado não existe')

    return await this.repository.delete(customSpotIdOrError)
  }
}
