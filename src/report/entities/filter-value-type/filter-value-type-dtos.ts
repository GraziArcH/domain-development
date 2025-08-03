export interface FilterValueTypeDTO {
  filterValueTypeId: number
  valueType: string
  createdBy: number
  active: boolean
}

export type FilterValueTypeWithoutIdDTO = Omit<FilterValueTypeDTO, 'filterValueTypeId'>
