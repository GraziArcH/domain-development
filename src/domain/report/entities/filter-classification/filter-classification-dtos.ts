export interface FilterClassificationDTO {
  filterClassificationId: number
  classification: string
  createdBy: number
  active: boolean
}

export type FilterClassificationWithoutIdDTO = Omit<FilterClassificationDTO, 'filterClassificationId'>
