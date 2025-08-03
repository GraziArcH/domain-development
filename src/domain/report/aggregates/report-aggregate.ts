import {
  type ReportTemplateEntity,
  type LineTemplateEntity,
  type SpotByLineEntity,
  type SpotTemplateEntity,
  type SpotTypeEntity,
  type IReportRepository,
  ReportAggregateModel,
  type SpotEntity,
  type SpotDTO,
  type SpotDTOWithoutId,
  type CustomSpotEntity,
  type ReportDTO,
  type ReportTemplateDTOWithoutId,
  type ReportTemplateDTO,
  type LineTemplateDTOWithoutId,
  type LineTemplateDTO,
  type SpotByLineDTOWithoutId,
  type SpotByLineDTO,
  type SpotTemplateDTOWithoutId,
  type SpotTemplateDTO,
  type SpotTypeDTOWithoutId,
  type SpotTypeDTO,
  type SpotByLineFiltersEntity,
  type SpotByLineFiltersDTO,
  type ReportTypeDTOWithoutId,
  type ReportTypeEntity,
  type ReportTypeDTO,
  type FilterEntity,
  type FilterClassificationEntity,
  type FilterValueTypeEntity,
  type FiltersBySpotEntity,
  type FilterWithoutIdDTO,
  type FilterDTO,
  type FilterClassificationWithoutIdDTO,
  type FilterClassificationDTO,
  type FilterValueTypeWithoutIdDTO,
  type FilterValueTypeDTO,
  type FilterBySpotWithoutIdDTO,
  type FilterBySpotDTO,
  type Filters,
  type CustomSpotDTOWithoutIdAndOrder,
  type FilterActionsEntity,
  type FilterActionsDTOWithoutId,
  type FilterActionsDTO,
  type ReportTemplateEntityModel,
  type LineTemplateEntityModel,
  type SpotByLineEntityModel,
  type SpotTemplateEntityModel,
  type SpotTypeEntityModel,
  type SpotEntityModel,
  type CustomSpotEntityModel,
  type SpotByLineFiltersEntityModel,
  type ReportTypeEntityModel,
  type FilterEntityModel,
  type FilterClassificationEntityModel,
  type FilterValueTypeEntityModel,
  type FiltersBySpotEntityModel,
  type FilterActionsEntityModel,
  type ColorKosenEntity,
  type ColorKosenDTOWithoutId,
  type ColorKosenEntityModel,
  type ColorKosenDTO,
  type ReportDataSchemaEntity,
  type ReportDataSchemaDTOWithoutId,
  type ReportDataSchemaEntityModel,
  type ReportDataSchemaDTO,
  PurgeTimeDTO,
  PurgeDTO
} from '@/domain/report'

export class ReportAggregate {
  constructor(
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
  ) { }

  async create(dto: ReportDTO): Promise<ReportAggregateModel> {
    const reportModelOrError = ReportAggregateModel.create(dto)

    return await this.repository.create(reportModelOrError)
  }

  async getByName(reportName: string): Promise<ReportAggregateModel> {
    return await this.repository.getByName(reportName)
  }

  async update(dto: ReportDTO): Promise<ReportAggregateModel> {
    const reportModelOrError = ReportAggregateModel.create(dto)

    return await this.repository.update(reportModelOrError)
  }

  async delete(
    reportId: string
  ): Promise<ReportAggregateModel> {
    return await this.repository.delete(reportId)
  }

  async createReportTemplate(dto: ReportTemplateDTOWithoutId): Promise<ReportTemplateEntityModel> {
    return await this.reportTemplateEntity.create(dto)
  }

  async getReportTemplateById(reportTemplatesById: number): Promise<ReportTemplateEntityModel> {
    return await this.reportTemplateEntity.getById(reportTemplatesById)
  }

  async getReportTemplateByReportTypeId(reportTemplatesById: number): Promise<ReportTemplateEntityModel[]> {
    return await this.reportTemplateEntity.getByReportTypeId(reportTemplatesById)
  }

  async getReportTemplateByReportTemplateName(reportTemplateName: string): Promise<ReportTemplateEntityModel> {
    return await this.reportTemplateEntity.getByReportTemplateName(reportTemplateName)
  }

  async getReportTemplateByNameAndVersion(reportTemplateName: string, reportTemplateVersion: string): Promise<ReportTemplateEntityModel> {
    return await this.reportTemplateEntity.getReportTemplateByNameAndVersion(reportTemplateName, reportTemplateVersion)
  }

  async getReportTemplateByTemplateIdWithAnyActiveStatus(reportTemplateId: number): Promise<ReportTemplateEntityModel> {
    return await this.reportTemplateEntity.getReportTemplateByTemplateIdWithAnyActiveStatus(reportTemplateId)
  }

  async getReportTemplates(): Promise<ReportTemplateEntityModel[]> {
    return await this.reportTemplateEntity.getAll()
  }

  async updateReportTemplate(dto: ReportTemplateDTO): Promise<ReportTemplateEntityModel> {
    return await this.reportTemplateEntity.update(dto)
  }

  async updateReportTemplateStatusByName(status: string, updatedAt: Date, reportTemplateName: string): Promise<ReportTemplateEntityModel> {
    return await this.reportTemplateEntity.updateStatus(status, updatedAt, reportTemplateName)
  }

  async deleteReportTemplate(reportTemplateId: number): Promise<ReportTemplateEntityModel> {
    return await this.reportTemplateEntity.delete(reportTemplateId)
  }

  async activateReport(reportTemplateName: string, version: string): Promise<void> {
    await this.reportTemplateEntity.activateReport(reportTemplateName, version)
  }

  async createLineTemplate(dto: LineTemplateDTOWithoutId): Promise<LineTemplateEntityModel> {
    return await this.lineTemplateEntity.create(dto)
  }

  async getLineTemplateById(lineTemplatesById: number): Promise<LineTemplateEntityModel> {
    return await this.lineTemplateEntity.getById(lineTemplatesById)
  }

  async getLineTemplateByReportTemplateId(lineTemplatesById: number): Promise<LineTemplateEntityModel[]> {
    return await this.lineTemplateEntity.getByReportTemplateId(lineTemplatesById)
  }

  async getAllLineTemplates(): Promise<LineTemplateEntityModel[]> {
    return await this.lineTemplateEntity.getAll()
  }

  async updateLineTemplate(dto: LineTemplateDTO): Promise<LineTemplateEntityModel> {
    return await this.lineTemplateEntity.update(dto)
  }

  async deleteLineTemplate(lineTemplateId: number): Promise<LineTemplateEntityModel> {
    return await this.lineTemplateEntity.delete(lineTemplateId)
  }

  async createSpotByLine(dto: SpotByLineDTOWithoutId): Promise<SpotByLineEntityModel> {
    return await this.spotByLineEntity.create(dto)
  }

  async getSpotByLineById(spotByLineById: number): Promise<SpotByLineEntityModel> {
    return await this.spotByLineEntity.getById(spotByLineById)
  }

  async getAllSpotByLine(): Promise<SpotByLineEntityModel[]> {
    return await this.spotByLineEntity.getAll()
  }

  async updateSpotByLine(dto: SpotByLineDTO): Promise<SpotByLineEntityModel> {
    return await this.spotByLineEntity.update(dto)
  }

  async deleteSpotByLine(spotByLineId: number): Promise<SpotByLineEntityModel> {
    return await this.spotByLineEntity.delete(spotByLineId)
  }

  async createSpotTemplate(dto: SpotTemplateDTOWithoutId): Promise<SpotTemplateEntityModel> {
    return await this.spotTemplateEntity.create(dto)
  }

  async getSpotTemplateById(spotTemplateById: number): Promise<SpotTemplateEntityModel> {
    return await this.spotTemplateEntity.getById(spotTemplateById)
  }

  async getSpotTemplateByName(spotTemplateByName: string): Promise<SpotTemplateEntityModel> {
    return await this.spotTemplateEntity.getByName(spotTemplateByName)
  }

  async getSpotTemplateByLineTemplateId(lineTemplateById: number): Promise<SpotTemplateEntityModel[]> {
    return await this.spotTemplateEntity.getByLineTemplateId(lineTemplateById)
  }

  async getAllSpotTemplates(): Promise<SpotTemplateEntityModel[]> {
    return await this.spotTemplateEntity.getAll()
  }

  async updateSpotTemplate(dto: SpotTemplateDTO): Promise<SpotTemplateEntityModel> {
    return await this.spotTemplateEntity.update(dto)
  }

  async deleteSpotTemplate(spotTemplateId: number): Promise<SpotTemplateEntityModel> {
    return await this.spotTemplateEntity.delete(spotTemplateId)
  }

  async findSpotTemplate(filter: { name?: string, active?: boolean, draft?: boolean }): Promise<SpotTemplateEntityModel[]> {
    return await this.spotTemplateEntity.findTemplates(filter)
  }

  async deactivateSpotTemplateOthersByName(name: string): Promise<void> {
    await this.spotTemplateEntity.deactivateOthersByName(name)
  }

  async softDeleteSpotTemplate(spotTemplateId: number): Promise<SpotTemplateEntityModel> {
    return await this.spotTemplateEntity.softDelete(spotTemplateId)
  }

  async getAllSpotTemplatesPurgeTimes(): Promise<PurgeTimeDTO[]> {
    return await this.spotTemplateEntity.getAllPurgeTimes()
  }

  async createSpotType(dto: SpotTypeDTOWithoutId): Promise<SpotTypeEntityModel> {
    return await this.spotTypeEntity.create(dto)
  }

  async getSpotTypeByName(name: string): Promise<SpotTypeEntityModel> {
    return await this.spotTypeEntity.getSpotTypeByName(name)
  }

  async getSpotTypeId(spotTypeId: number): Promise<SpotTypeEntityModel> {
    return await this.spotTypeEntity.getById(spotTypeId)
  }

  async getAllSpotTypes(): Promise<SpotTypeEntityModel[]> {
    return await this.spotTypeEntity.getAll()
  }

  async updateSpotType(dto: SpotTypeDTO): Promise<SpotTypeEntityModel> {
    return await this.spotTypeEntity.update(dto)
  }

  async deleteSpotType(spotTypeId: number): Promise<SpotTypeEntityModel> {
    return await this.spotTypeEntity.delete(spotTypeId)
  }

  async createSpot(
    dto: SpotDTO, expireIn: number = 3600
  ): Promise<SpotEntityModel> {
    return await this.spotEntity.createInCache(dto, expireIn)
  }

  async getSpotById(spotId: string): Promise<SpotEntityModel> {
    return await this.spotEntity.getCacheById(spotId)
  }

  async updateSpot(
    dto: SpotDTO, expireIn: number = 3600
  ): Promise<SpotEntityModel> {
    return await this.spotEntity.updateCache(dto, expireIn)
  }

  async deleteSpot(
    spotId: string
  ): Promise<SpotEntityModel> {
    return await this.spotEntity.deleteCache(spotId)
  }

  async createSpotData(
    dto: SpotDTOWithoutId
  ): Promise<SpotEntityModel> {
    return await this.spotEntity.createInNoSQL(dto)
  }

  async getSpotDataById(spotDataId: string): Promise<SpotEntityModel> {
    return await this.spotEntity.getNoSQLById(spotDataId)
  }

  async getSpotDataBySpotDataName(spotDataName: string, filters: Filters): Promise<SpotEntityModel> {
    return await this.spotEntity.getNoSQLBySpotName(spotDataName, filters)
  }

  async getSpotDataBySpotTemplateIdAndFilters(
    spotTemplateId: string,
    filters: Filters
  ): Promise<SpotEntityModel> {
    return await this.spotEntity.getNoSQLBySpotTemplateId(spotTemplateId, filters)
  }

  async updateSpotData(
    dto: SpotDTO
  ): Promise<SpotEntityModel> {
    return await this.spotEntity.updateNoSQL(dto)
  }

  async deleteSpotData(
    spotId: string
  ): Promise<SpotEntityModel> {
    return await this.spotEntity.deleteNoSQL(spotId)
  }

  async getSpotDataIdsToBeDeleted(purgeRules: PurgeDTO[]): Promise<string[]> {
    return await this.spotEntity.getSpotDataIdsToBeDeleted(purgeRules)
  }

  async createCustomSpot(dto: CustomSpotDTOWithoutIdAndOrder): Promise<CustomSpotEntityModel> {
    return await this.customSpotEntity.create(dto)
  }

  async getCustomSpotByUserId(userId: number): Promise<CustomSpotEntityModel[]> {
    return await this.customSpotEntity.getByUserId(userId)
  }

  async getCustomSpotNameAndFilter(spotName: string, filters: string): Promise<CustomSpotEntityModel> {
    return await this.customSpotEntity.getBySpotNameAndFilter(spotName, filters)
  }

  async deleteCustomSpot(customSpotId: number): Promise<CustomSpotEntityModel> {
    return await this.customSpotEntity.delete(customSpotId)
  }

  async createSpotByLineFilters(dto: SpotByLineFiltersDTO): Promise<SpotByLineFiltersEntityModel> {
    return await this.spotByLineFilters.create(dto)
  }

  async getSpotByLineFiltersById(spotByLineFiltersId: number): Promise<SpotByLineFiltersEntityModel> {
    return await this.spotByLineFilters.getById(spotByLineFiltersId)
  }

  async getSpotByLineByLineTemplateId(lineTemplateId: number): Promise<SpotByLineEntityModel[]> {
    return await this.spotByLineEntity.getSpotByLineByLineTemplateId(lineTemplateId)
  }

  async getSpotByLineFiltersBySpotByLineId(spotByLineId: number): Promise<SpotByLineFiltersEntityModel[]> {
    return await this.spotByLineFilters.getSpotByLineFiltersBySpotByLineId(spotByLineId)
  }

  async getAllSpotByLineFilters(): Promise<SpotByLineFiltersEntityModel[]> {
    return await this.spotByLineFilters.getAll()
  }

  async updateFiltersByLine(
    lineTemplateId: number,
    filterId: number,
    visible?: boolean,
    defaultFilterIds?: number[]
  ): Promise<void> {
    await this.spotByLineFilters.updateFiltersByLine(lineTemplateId, filterId, visible, defaultFilterIds)
  }

  async updateSpotByLineFilters(dto: SpotByLineFiltersDTO): Promise<SpotByLineFiltersEntityModel> {
    return await this.spotByLineFilters.update(dto)
  }

  async deleteSpotByLineFilters(spotByLineFiltersId: number): Promise<SpotByLineFiltersEntityModel> {
    return await this.spotByLineFilters.delete(spotByLineFiltersId)
  }

  async createReportType(dto: ReportTypeDTOWithoutId): Promise<ReportTypeEntityModel> {
    return await this.reportTypeEntity.create(dto)
  }

  async getReportTypeById(reportTypeById: number): Promise<ReportTypeEntityModel> {
    return await this.reportTypeEntity.getById(reportTypeById)
  }

  async getAllReportTypes(): Promise<ReportTypeEntityModel[]> {
    return await this.reportTypeEntity.getAll()
  }

  async updateReportType(dto: ReportTypeDTO): Promise<ReportTypeEntityModel> {
    return await this.reportTypeEntity.update(dto)
  }

  async deleteReportType(reportTypeId: number): Promise<ReportTypeEntityModel> {
    return await this.reportTypeEntity.delete(reportTypeId)
  }

  async createFilter(dto: FilterWithoutIdDTO): Promise<FilterEntityModel> {
    return await this.filter.create(dto)
  }

  async getFilterById(filterId: number): Promise<FilterEntityModel> {
    return ((await this.filter.getById(filterId)))
  }

  async getFiltersByParentId(parentId: number): Promise<FilterEntityModel[]> {
    return await this.filter.getParentId(parentId)
  }

  async getFiltersBySpotTemplateId(parentId: number): Promise<FilterEntityModel[]> {
    return await this.filter.getBySpotTemplateId(parentId)
  }

  async getFiltersBySpotTemplateName(spotTemplateName: string): Promise<FilterEntityModel[]> {
    return await this.filter.getBySpotTemplateName(spotTemplateName)
  }

  async getFiltersBySpotTemplateIdWithYourDependents(parentId: number): Promise<FilterEntityModel[]> {
    return await this.filter.getBySpotTemplateIdWithYourDependents(parentId)
  }

  async getFiltersByReportTemplateId(reportTemplateId: number): Promise<FilterEntityModel[]> {
    return await this.filter.getFiltersByReportTemplateId(reportTemplateId)
  }

  async getFiltersByLine(spotId: number, lineId: number): Promise<FilterEntityModel[]> {
    return await this.filter.getFiltersByLine(spotId, lineId)
  }

  async getFiltersByReportTemplateName(reportTemplateName: string): Promise<FilterEntityModel[]> {
    return await this.filter.getFiltersByReportTemplateName(reportTemplateName)
  }

  async getAllFilters(): Promise<FilterEntityModel[]> {
    return await this.filter.getAll()
  }

  async updateFilter(dto: FilterDTO): Promise<FilterEntityModel> {
    return await this.filter.update(dto)
  }

  async removeLineFilterByFilterIdAndReportTemplaName(filterId: number, reportTemplateName: string): Promise<void> {
    await this.filter.removeLineFilterByFilterIdAndReportTemplaName(filterId, reportTemplateName)
  }

  async deleteFilter(
    filterId: number
  ): Promise<FilterEntityModel> {
    return await this.filter.delete(filterId)
  }

  async createFilterClassification(dto: FilterClassificationWithoutIdDTO): Promise<FilterClassificationEntityModel> {
    return await this.filterClassification.create(dto)
  }

  async getFilterClassificationById(filterClassificationId: number): Promise<FilterClassificationEntityModel> {
    return await this.filterClassification.getById(filterClassificationId)
  }

  async getAllFilterClassifications(): Promise<FilterClassificationEntityModel[]> {
    return await this.filterClassification.getAll()
  }

  async updateFilterClassification(dto: FilterClassificationDTO): Promise<FilterClassificationEntityModel> {
    return await this.filterClassification.update(dto)
  }

  async deleteFilterClassification(filterClassificationId: number): Promise<FilterClassificationEntityModel> {
    return await this.filterClassification.delete(filterClassificationId)
  }

  async createFilterValueType(dto: FilterValueTypeWithoutIdDTO): Promise<FilterValueTypeEntityModel> {
    return await this.filterValueType.create(dto)
  }

  async getFilterValueTypeById(filterTypeId: number): Promise<FilterValueTypeEntityModel> {
    return await this.filterValueType.getById(filterTypeId)
  }

  async getAllFilterValueTypes(): Promise<FilterValueTypeEntityModel[]> {
    return await this.filterValueType.getAll()
  }

  async updateFilterValueType(dto: FilterValueTypeDTO): Promise<FilterValueTypeEntityModel> {
    return await this.filterValueType.update(dto)
  }

  async deleteFilterValueType(
    filterTypeId: number
  ): Promise<FilterValueTypeEntityModel> {
    return await this.filterValueType.delete(filterTypeId)
  }

  async createFilterBySpot(dto: FilterBySpotWithoutIdDTO): Promise<FiltersBySpotEntityModel> {
    return await this.filtersBySpot.create(dto)
  }

  async getFilterBySpotById(filtersBySpotId: number): Promise<FiltersBySpotEntityModel> {
    return await this.filtersBySpot.getById(filtersBySpotId)
  }

  async getAllFilterBySpots(): Promise<FiltersBySpotEntityModel[]> {
    return await this.filtersBySpot.getAll()
  }

  async updateFilterBySpot(dto: FilterBySpotDTO): Promise<FiltersBySpotEntityModel> {
    return await this.filtersBySpot.update(dto)
  }

  async deleteFilterBySpot(
    filtersBySpotId: number
  ): Promise<FiltersBySpotEntityModel> {
    return await this.filtersBySpot.delete(filtersBySpotId)
  }

  async removeFilterFromTemplate(templateId: number, filterId: number): Promise<FiltersBySpotEntityModel> {
    return await this.filtersBySpot.removeFilterFromTemplate(templateId, filterId)
  }

  async createFilterActions(dto: FilterActionsDTOWithoutId): Promise<FilterActionsEntityModel> {
    return await this.filterActions.create(dto)
  }

  async getFilterActionsById(filterActionsId: number): Promise<FilterActionsEntityModel> {
    return await this.filterActions.getById(filterActionsId)
  }

  async getAllFilterActionss(): Promise<FilterActionsEntityModel[]> {
    return await this.filterActions.getAll()
  }

  async updateFilterActions(dto: FilterActionsDTO): Promise<FilterActionsEntityModel> {
    return await this.filterActions.update(dto)
  }

  async deleteFilterActions(filterActionsId: number): Promise<FilterActionsEntityModel> {
    return await this.filterActions.delete(filterActionsId)
  }

  async createColorKosen(dto: ColorKosenDTOWithoutId): Promise<ColorKosenEntityModel> {
    return await this.colorKosenEntity.create(dto)
  }

  async getColorKosenById(colorId: number): Promise<ColorKosenEntityModel> {
    return await this.colorKosenEntity.getById(colorId)
  }

  async getAllColorKosen(): Promise<ColorKosenEntityModel[]> {
    return await this.colorKosenEntity.getAll()
  }

  async updateColorKosen(dto: ColorKosenDTO): Promise<ColorKosenEntityModel> {
    return await this.colorKosenEntity.update(dto)
  }

  async deleteColorKosen(colorId: number): Promise<void> {
    await this.colorKosenEntity.delete(colorId)
  }

  async createReportDataSchema(dto: ReportDataSchemaDTOWithoutId): Promise<ReportDataSchemaEntityModel> {
    return await this.reportDataSchemaEntity.create(dto)
  }

  async getReportDataSchemaById(reportDataSchemaId: number): Promise<ReportDataSchemaEntityModel> {
    return await this.reportDataSchemaEntity.getById(reportDataSchemaId)
  }

  async getLatestReportDataSchema(): Promise<ReportDataSchemaEntityModel> {
    return await this.reportDataSchemaEntity.getLatest()
  }

  async getAllReportDataSchemas(): Promise<ReportDataSchemaEntityModel[]> {
    return await this.reportDataSchemaEntity.getAll()
  }

  async updateReportDataSchema(dto: ReportDataSchemaDTO): Promise<ReportDataSchemaEntityModel> {
    return await this.reportDataSchemaEntity.update(dto)
  }

  async deleteReportDataSchema(reportDataSchemaId: number): Promise<void> {
    await this.reportDataSchemaEntity.delete(reportDataSchemaId)
  }

}