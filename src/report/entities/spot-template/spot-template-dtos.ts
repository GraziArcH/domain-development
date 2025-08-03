import { type SpotTypeDTO } from '@/domain/report'

export interface SpotTemplateDTO {
  spotTemplateId: number
  spotTemplateName: string
  spotTitle: string
  description: string
  spotLegend: string
  version: string
  spotTypeId: number
  createdBy: number
  formatting: object
  active: boolean
  draft: boolean
  spotOrder?: number
  spotType?: SpotTypeDTO
  dataPurgeTime: number
}

export interface PurgeTimeDTO {
  dataPurgeTime: number
  spotTemplateName: string;
}

export type SpotTemplateDTOWithoutId = Omit<SpotTemplateDTO, 'spotTemplateId'>
