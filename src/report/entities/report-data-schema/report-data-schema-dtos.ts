export interface JtdSchema {
  type: string
  properties: Record<string, any>
  required?: string[]
  [key: string]: any
}

export interface ReportDataSchemaDTO {
  reportDataSchemaId: number
  jtd: JtdSchema
  version: number
  createdBy: number
  createdAt: Date
}

export type ReportDataSchemaDTOWithoutId = Omit<ReportDataSchemaDTO, 'reportDataSchemaId'>
