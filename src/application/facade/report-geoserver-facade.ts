import {
  type LayerEntity,
  type StoreLayerEntity,
  type WorkspaceEntity,
  ReportGeoserverAggregate,
  type StateControlEntity
} from '@/domain/report-geoserver'

export class ReportGeoserverFacade extends ReportGeoserverAggregate {
  constructor (
    protected readonly layerEntity: LayerEntity,
    protected readonly storeLayerEntity: StoreLayerEntity,
    protected readonly workspaceEntity: WorkspaceEntity,
    protected readonly stateControlEntity: StateControlEntity
  ) {
    super(
      layerEntity,
      storeLayerEntity,
      workspaceEntity,
      stateControlEntity
    )
  }
}
