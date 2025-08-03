export interface ReportTemplateDTO {
  reportTemplateId: number
  reportTypeId: number
  reportName: string
  path: string
  title: string
  description: string
  numberOfLines: number
  cachePurgePeriod: string
  formatting: object
  version: string
  createdBy: number
  active: boolean
  draft: boolean
  status?: string
  updatedAt?: Date
  createdAt?: Date
}

export type ReportTemplateDTOWithoutId = Omit<ReportTemplateDTO, 'reportTemplateId'>
