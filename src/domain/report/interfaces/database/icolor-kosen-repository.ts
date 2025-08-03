import { type IdValueObject } from '@/domain/shared'
import { type ColorKosenEntityModel } from '../../entities/color-kosen'

export interface IColorKosenRepository {
  create: (color: ColorKosenEntityModel) => Promise<ColorKosenEntityModel>
  getById: (colorId: IdValueObject) => Promise<ColorKosenEntityModel | null>
  getAll: () => Promise<ColorKosenEntityModel[]>
  update: (color: ColorKosenEntityModel) => Promise<ColorKosenEntityModel>
  delete: (colorId: IdValueObject) => Promise<void>
}
