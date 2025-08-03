export interface FilterActionsDTO {
  filterActionId: number
  action: string
  createdBy: number
  active: boolean
}

export type FilterActionsDTOWithoutId = Omit<FilterActionsDTO, 'filterActionId'>
