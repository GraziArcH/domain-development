export interface FilterBySpotDTO {
  filtersBySpotId: number
  filterId: number
  spotTemplateId: number
  createdBy: number
  active: boolean
}

export type FilterBySpotWithoutIdDTO = Omit<FilterBySpotDTO, 'filtersBySpotId'>
