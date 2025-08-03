export interface CustomSpotDTO {
  customSpotId: number
  spotTemplateName: string
  userId: number
  filters: string
  order: number
  spotTypeName?: string
}

export type CustomSpotDTOWithoutIdAndOrder = Omit<CustomSpotDTO, 'customSpotId' | 'order'>
