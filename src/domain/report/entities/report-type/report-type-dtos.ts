export interface ReportTypeDTO {
  reportTypeId: number
  typeName: string
  icon: string
  description: string
  createdBy: number
  active: boolean
}

export type ReportTypeDTOWithoutId = Omit<ReportTypeDTO, 'reportTypeId'>
