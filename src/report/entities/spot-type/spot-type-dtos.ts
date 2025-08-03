export interface SpotTypeDTO {
  spotTypeId: number
  spotTypeName: string
  description: string
  spotData: string
  createdBy: number
  active: boolean
}

export type SpotTypeDTOWithoutId = Omit<SpotTypeDTO, 'spotTypeId'>
