import { type FilterTree, type ReportDTO } from './report-dtos'

export class ReportAggregateModel {
  constructor (
    public readonly reportId: number,
    public readonly reportDescription: string,
    public readonly numberOfLines: number,
    public readonly reportName: string,
    public readonly reportTitle: string,
    public readonly filters: FilterTree[],
    public readonly lines: Array<{
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
  ) { }

  static create (
    {
      reportId,
      reportDescription,
      numberOfLines,
      reportName,
      reportTitle,
      filters,
      lines
    }: ReportDTO
  ): ReportAggregateModel {
    return new ReportAggregateModel(
      reportId,
      reportDescription,
      numberOfLines,
      reportName,
      reportTitle,
      filters,
      lines
    )
  }
}
