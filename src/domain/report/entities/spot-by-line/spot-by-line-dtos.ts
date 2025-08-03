export interface SpotByLineDTO {
  spotByLineId: number
  lineTemplateId: number
  spotTemplateName: string
  spotOrder: number
  createdBy: number
  active: boolean
}

export type SpotByLineDTOWithoutId = Omit<SpotByLineDTO, 'spotByLineId'>
