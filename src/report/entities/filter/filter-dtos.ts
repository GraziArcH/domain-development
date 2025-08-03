import {
  type FilterActionsDTO,
  type FilterClassificationDTO,
  type FilterValueTypeDTO,
  type SpotByLineFiltersDTO
} from '@/domain/report'

export interface FilterDTO {
  filterId: number
  parentId?: number
  triggerFilterId?: number
  description: string
  value: string
  filterClassificationId: number
  filterValueTypeId: number
  filterActionId?: number
  order: number
  createdBy: number
  createdAt: number
  active: boolean
  filterAction?: FilterActionsDTO
  filterValueType?: FilterValueTypeDTO
  filterClassification?: FilterClassificationDTO
  spotByLineFilters?: SpotByLineFiltersDTO
}

export type FilterWithoutIdDTO = Omit<FilterDTO, 'filterId'>
