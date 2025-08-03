import {
  type LineTemplateEntity,
  type ReportTemplateEntity,
  type SpotByLineEntity,
  type SpotTemplateEntity,
  type SpotTypeEntity,
  ReportAggregate,
  type SpotEntity,
  type IReportRepository,
  type CustomSpotEntity,
  type SpotByLineFiltersEntity,
  type ReportTypeEntity,
  type FilterEntity,
  type FilterClassificationEntity,
  type FilterValueTypeEntity,
  type FiltersBySpotEntity,
  type FilterActionsEntity,
  type ColorKosenEntity,
  type ReportDataSchemaEntity
} from '@/domain/report'

export class ReportFacade extends ReportAggregate {
  constructor (
    protected readonly repository: IReportRepository,
    protected readonly reportTemplateEntity: ReportTemplateEntity,
    protected readonly lineTemplateEntity: LineTemplateEntity,
    protected readonly spotByLineEntity: SpotByLineEntity,
    protected readonly spotTemplateEntity: SpotTemplateEntity,
    protected readonly spotTypeEntity: SpotTypeEntity,
    protected readonly spotEntity: SpotEntity,
    protected readonly customSpotEntity: CustomSpotEntity,
    protected readonly spotByLineFilters: SpotByLineFiltersEntity,
    protected readonly reportTypeEntity: ReportTypeEntity,
    protected readonly filter: FilterEntity,
    protected readonly filterClassification: FilterClassificationEntity,
    protected readonly filterValueType: FilterValueTypeEntity,
    protected readonly filtersBySpot: FiltersBySpotEntity,
    protected readonly filterActions: FilterActionsEntity,
    protected readonly colorKosenEntity: ColorKosenEntity,
    protected readonly reportDataSchemaEntity: ReportDataSchemaEntity
  ) {
    super(
      repository,
      reportTemplateEntity,
      lineTemplateEntity,
      spotByLineEntity,
      spotTemplateEntity,
      spotTypeEntity,
      spotEntity,
      customSpotEntity,
      spotByLineFilters,
      reportTypeEntity,
      filter,
      filterClassification,
      filterValueType,
      filtersBySpot,
      filterActions,
      colorKosenEntity,
      reportDataSchemaEntity
    )
  }
}
