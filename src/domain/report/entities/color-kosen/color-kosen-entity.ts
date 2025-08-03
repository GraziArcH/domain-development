import { IdValueObject, NotFoundError } from '@/domain/shared'
import { type ColorKosenDTO, type ColorKosenDTOWithoutId } from './color-kosen-dtos'
import { ColorKosenEntityModel } from './color-kosen-entity-model'
import { type IColorKosenRepository } from '../../interfaces/database/icolor-kosen-repository'

export class ColorKosenEntity {
  constructor (private readonly repository: IColorKosenRepository) { }

  async create (dto: ColorKosenDTOWithoutId): Promise<ColorKosenEntityModel> {
    const colorModelOrError = ColorKosenEntityModel.create({
      colorId: 1,
      ...dto
    })

    if (colorModelOrError instanceof Error) throw colorModelOrError

    return await this.repository.create(colorModelOrError)
  }

  async getById (colorId: number): Promise<ColorKosenEntityModel> {
    const colorIdOrError = IdValueObject.create(colorId)

    if (colorIdOrError instanceof Error) throw colorIdOrError

    const color = await this.repository.getById(colorIdOrError)

    if (!color) throw new NotFoundError('Essa cor não existe')

    return color
  }

  async getAll (): Promise<ColorKosenEntityModel[]> {
    return await this.repository.getAll()
  }

  async update (dto: ColorKosenDTO): Promise<ColorKosenEntityModel> {
    const colorModelOrError = ColorKosenEntityModel.create(dto)

    if (colorModelOrError instanceof Error) throw colorModelOrError

    const colorExists = await this.repository.getById(colorModelOrError.colorId)

    if (!colorExists) throw new NotFoundError('Essa cor não existe')

    return await this.repository.update(colorModelOrError)
  }

  async delete (colorId: number): Promise<void> {
    const colorIdOrError = IdValueObject.create(colorId)

    if (colorIdOrError instanceof Error) throw colorIdOrError

    const colorExists = await this.repository.getById(colorIdOrError)

    if (!colorExists) throw new NotFoundError('Essa cor não existe')

    await this.repository.delete(colorIdOrError)
  }
}
