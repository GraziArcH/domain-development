export interface ColorKosenDTO {
  colorId: number
  colorName: string
  color: string
}

export type ColorKosenDTOWithoutId = Omit<ColorKosenDTO, 'colorId'>
