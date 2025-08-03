export interface Filter { name: string, value: string }

export interface Filters {
  primaryFilters: Filter[]
  secondaryFilters: Filter[]
  specificFilters: Filter[]
}

export interface InnerFilter {
  id: number
  value: string
  action?: string
  type: string
  innerFilters: InnerFilter[]
  classification: string
  triggerFilterId?: number
}

export interface FilterTree {
  id: number
  value: string
  innerFilters?: InnerFilter[]
  type: string
  action?: string
  classification: string
  triggerFilterId?: number
}

export interface ReportDTO {
  reportId: number
  reportDescription: string
  numberOfLines: number
  reportName: string
  reportTitle: string
  filters: FilterTree[]
  lines: Array<{
    lineId: number
    draggable: boolean
    lineOrder: number
    title: string
    spots: Array<{
      spotId: number
      spotName: string
      spotType: string
      title: string
      format: object
      legend: string
      description: string
      spotOrder: number
    }>
    filters: FilterTree[]
  }>
}
