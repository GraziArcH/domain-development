export interface SpotByLineFiltersDTO {
  spotByLineFiltersId: number
  spotByLineId: number
  parentFilterId: number
  visible: boolean
  active: boolean
  defaultValue?: number[]
  createdBy: number
}

export type SpotByLineFiltersDTOWithoutId = Omit<SpotByLineFiltersDTO, 'spotByLineFiltersId'>
