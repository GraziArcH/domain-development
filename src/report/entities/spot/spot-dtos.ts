import { type Filters } from '@/domain/report'

export interface SpotDTO {
  spotId: string
  spotName: string
  spotTemplateId: string
  spotData: string
  filters: Filters
  createdAt?: Date
  updatedAt?: Date
}

export type SpotDTOWithoutId = Omit<SpotDTO, 'spotId'>
