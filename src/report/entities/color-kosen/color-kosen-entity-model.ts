import { IdValueObject } from '@/domain/shared'
import { type ColorKosenDTO } from './color-kosen-dtos'
import { type IEntityModel } from '@/domain/shared'
import { ColorNameValueObject, ColorValueObject } from '../../value-objects/color-kosen'

export class ColorKosenEntityModel implements IEntityModel<ColorKosenDTO> {
  constructor (
    public readonly colorId: IdValueObject,
    public readonly colorName: ColorNameValueObject,
    public readonly color: ColorValueObject
  ) { }

  static create (
    {
      colorId,
      colorName,
      color
    }: ColorKosenDTO
  ): ColorKosenEntityModel {
    const colorIdOrError = IdValueObject.create(colorId)
    const colorNameOrError = ColorNameValueObject.create(colorName)
    const colorOrError = ColorValueObject.create(color)

    if (colorIdOrError instanceof Error) throw colorIdOrError
    if (colorNameOrError instanceof Error) throw colorNameOrError
    if (colorOrError instanceof Error) throw colorOrError

    return new ColorKosenEntityModel(
      colorIdOrError,
      colorNameOrError,
      colorOrError
    )
  }

  getValues (): ColorKosenDTO {
    return {
      colorId: this.colorId.value,
      colorName: this.colorName.value,
      color: this.color.value
    }
  }
}
