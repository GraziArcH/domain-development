import {
  ColorKosenEntity,
  CustomSpotEntity,
  FilterActionsEntity,
  FilterClassificationEntity,
  FilterEntity,
  FilterValueTypeEntity,
  FiltersBySpotEntity,
  LineTemplateEntity,
  ReportDataSchemaEntity,
  ReportTemplateEntity,
  ReportTypeEntity,
  SpotByLineEntity,
  SpotByLineFiltersEntity,
  SpotEntity,
  SpotTemplateEntity,
  SpotTypeEntity
} from '@/domain/report'
import {
  CustomSpotRepository,
  DatabaseCacheHelper,
  DatabaseHelper,
  DatabaseNoSQLHelper,
  FilterActionsRepository,
  FilterClassificationRepository,
  FilterRepository,
  FilterValueTypeRepository,
  FiltersBySpotRepository,
  LayerRepository,
  LineTemplateRepository,
  ReportRepository,
  ReportTemplateRepository,
  ReportTypeRepository,
  SpotByLineFiltersRepository,
  SpotByLineRepository,
  SpotDataRepository,
  SpotRepository,
  SpotTemplateRepository,
  SpotTypeRepository,
  StateControlRepository,
  StoreLayerRepository,
  WorkspaceRepository,
  ColorKosenRepository,
  ReportDataSchemaRepository
} from '../framework'
import { ReportFacade, ReportGeoserverFacade } from '../facade'
import { LayerEntity, StateControlEntity, StoreLayerEntity, WorkspaceEntity } from '@/domain/report-geoserver'


// Framework
export const databaseHelperMethodology = new DatabaseHelper('methodology')
export const databaseHelperData = new DatabaseHelper('data')
export const databaseHelperReport = new DatabaseHelper('report')
export const databaseHelperReportGeoserver = new DatabaseHelper('report-geoserver')
export const databaseCacheHelper = new DatabaseCacheHelper()
export const databaseNoSQLHelper = new DatabaseNoSQLHelper()

// Report Domain
export const reportRepository = new ReportRepository(databaseCacheHelper)
export const lineTemplateRepository = new LineTemplateRepository(databaseHelperReport)
export const reportTemplateRepository = new ReportTemplateRepository(databaseHelperReport)
export const spotByLineRepository = new SpotByLineRepository(databaseHelperReport)
export const spotTemplateRepository = new SpotTemplateRepository(databaseHelperReport)
export const spotTypeRepository = new SpotTypeRepository(databaseHelperReport)
export const customSpotRepository = new CustomSpotRepository(databaseHelperReport)
export const spotRepository = new SpotRepository(databaseCacheHelper)
export const spotDataRepository = new SpotDataRepository(databaseNoSQLHelper)
export const spotByLinePrimaryRepository = new SpotByLineFiltersRepository(databaseHelperReport)
export const reportTypeRepository = new ReportTypeRepository(databaseHelperReport)
export const filterRepository = new FilterRepository(databaseHelperReport)
export const filterClassificationRepository = new FilterClassificationRepository(databaseHelperReport)
export const filterValueTypeRepository = new FilterValueTypeRepository(databaseHelperReport)
export const filtersBySpotRepository = new FiltersBySpotRepository(databaseHelperReport)
export const filterActionsRepository = new FilterActionsRepository(databaseHelperReport)
export const colorKosenRepository = new ColorKosenRepository(databaseHelperReport)
export const reportDataSchemaRepository = new ReportDataSchemaRepository(databaseHelperReport)

export const reportTypeEntity = new ReportTypeEntity(reportTypeRepository)
export const lineTemplateEntity = new LineTemplateEntity(lineTemplateRepository)
export const reportTemplateEntity = new ReportTemplateEntity(reportTemplateRepository)
export const spotByLineEntity = new SpotByLineEntity(spotByLineRepository)
export const spotTemplateEntity = new SpotTemplateEntity(spotTemplateRepository)
export const spotTypeEntityepository = new SpotTypeEntity(spotTypeRepository)
export const spotEntity = new SpotEntity(spotRepository, spotDataRepository)
export const customSpotEntity = new CustomSpotEntity(customSpotRepository)
export const filterEntity = new FilterEntity(filterRepository)
export const filterClassificationEntity = new FilterClassificationEntity(filterClassificationRepository)
export const filterValueTypeEntity = new FilterValueTypeEntity(filterValueTypeRepository)
export const filtersBySpotEntity = new FiltersBySpotEntity(filtersBySpotRepository)
export const filterActionsEntity = new FilterActionsEntity(filterActionsRepository)
export const spotByLineFilters = new SpotByLineFiltersEntity(spotByLinePrimaryRepository)
export const colorKosenEntity = new ColorKosenEntity(colorKosenRepository)
export const reportDataSchemaEntity = new ReportDataSchemaEntity(reportDataSchemaRepository)

export const reportFacade = new ReportFacade(
  reportRepository,
  reportTemplateEntity,
  lineTemplateEntity,
  spotByLineEntity,
  spotTemplateEntity,
  spotTypeEntityepository,
  spotEntity,
  customSpotEntity,
  spotByLineFilters,
  reportTypeEntity,
  filterEntity,
  filterClassificationEntity,
  filterValueTypeEntity,
  filtersBySpotEntity,
  filterActionsEntity,
  colorKosenEntity,
  reportDataSchemaEntity
)

// Report Geoserver Domain

export const layerRepository = new LayerRepository(databaseHelperReportGeoserver)
export const storeLayerRepository = new StoreLayerRepository(databaseHelperReportGeoserver)
export const workspaceRepository = new WorkspaceRepository(databaseHelperReportGeoserver)
export const stateControlRepository = new StateControlRepository(databaseHelperReportGeoserver)

export const layerEntity = new LayerEntity(layerRepository)
export const storeLayerEntity = new StoreLayerEntity(storeLayerRepository)
export const workspaceEntity = new WorkspaceEntity(workspaceRepository)
export const stateControlEntity = new StateControlEntity(stateControlRepository)

export const reportGeoserverFacade = new ReportGeoserverFacade(
  layerEntity,
  storeLayerEntity,
  workspaceEntity,
  stateControlEntity
)
