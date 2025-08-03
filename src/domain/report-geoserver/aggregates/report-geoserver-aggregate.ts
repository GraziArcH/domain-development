import {
  type LayerEntityModel,
  type LayerDTO,
  type LayerEntity,
  type LayerWithoutIdDTO,
  type StateControlDTO,
  type StateControlEntity,
  type StoreLayerDTO,
  type StoreLayerEntity,
  type StoreLayerWithoutDTO,
  type WorkspaceDTO,
  type WorkspaceEntity,
  type WorkspaceWithoutIdDTO,
  type StoreLayerEntityModel,
  type WorkspaceEntityModel,
  type StateControlEntityModel
} from '@/domain/report-geoserver'
import { LayerFilters } from '../../../application/framework'

export class ReportGeoserverAggregate {
  constructor(
    protected readonly layerEntity: LayerEntity,
    protected readonly storeLayerEntity: StoreLayerEntity,
    protected readonly workspaceEntity: WorkspaceEntity,
    protected readonly stateControlEntity: StateControlEntity
  ) { }

  async createLayer(dto: LayerWithoutIdDTO): Promise<LayerEntityModel> {
    return await this.layerEntity.create(dto)
  }

  async getLayerById(layerId: number): Promise<LayerEntityModel> {
    return await this.layerEntity.getById(layerId)
  }

  async getLayerByName(layerName: string): Promise<LayerEntityModel> {
    return await this.layerEntity.getByName(layerName)
  }

  async getAllLayers(): Promise<LayerEntityModel[]> {
    return await this.layerEntity.getAll()
  }

  async updateLayer(dto: LayerDTO): Promise<LayerEntityModel> {
    return await this.layerEntity.update(dto)
  }

  async deleteLayer(
    layerId: number
  ): Promise<LayerEntityModel> {
    return await this.layerEntity.delete(layerId)
  }

  async getLayerNames(filters: LayerFilters): Promise<{ contornos: string[], rasters: string[] }> {
    return await this.layerEntity.getLayerNames(filters)
  }

  async createStoreLayer(dto: StoreLayerWithoutDTO): Promise<StoreLayerEntityModel> {
    return await this.storeLayerEntity.create(dto)
  }

  async getStoreLayerById(storeLayerId: number): Promise<StoreLayerEntityModel> {
    return await this.storeLayerEntity.getById(storeLayerId)
  }

  async getStoreLayerByName(storeLayerName: string): Promise<StoreLayerEntityModel> {
    return await this.storeLayerEntity.getByName(storeLayerName)
  }

  async getAllStoreLayers(): Promise<StoreLayerEntityModel[]> {
    return await this.storeLayerEntity.getAll()
  }

  async updateStoreLayer(dto: StoreLayerDTO): Promise<StoreLayerEntityModel> {
    return await this.storeLayerEntity.update(dto)
  }

  async deleteStoreLayer(
    storeLayerId: number
  ): Promise<StoreLayerEntityModel> {
    return await this.storeLayerEntity.delete(storeLayerId)
  }

  async createWorkspace(dto: WorkspaceWithoutIdDTO): Promise<WorkspaceEntityModel> {
    return await this.workspaceEntity.create(dto)
  }

  async getWorkspaceById(workspaceId: number): Promise<WorkspaceEntityModel> {
    return await this.workspaceEntity.getById(workspaceId)
  }

  async getWorkspaceByWorkspaceName(workspaceName: string): Promise<WorkspaceEntityModel> {
    return await this.workspaceEntity.getByName(workspaceName)
  }

  async getAllWorkspaces(): Promise<WorkspaceEntityModel[]> {
    return await this.workspaceEntity.getAll()
  }

  async updateWorkspace(dto: WorkspaceDTO): Promise<WorkspaceEntityModel> {
    return await this.workspaceEntity.update(dto)
  }

  async deleteWorkspace(workspaceId: number): Promise<WorkspaceEntityModel> {
    return await this.workspaceEntity.delete(workspaceId)
  }

  async createStateControl(dto: StateControlDTO): Promise<StateControlEntityModel> {
    return await this.stateControlEntity.create(dto)
  }

  async getStateControlById(stateControlId: string): Promise<StateControlEntityModel> {
    return await this.stateControlEntity.getById(stateControlId)
  }

  async getAllStateControls(): Promise<StateControlEntityModel[]> {
    return await this.stateControlEntity.getAll()
  }

  async updateStateControl(dto: StateControlDTO): Promise<StateControlEntityModel> {
    return await this.stateControlEntity.update(dto)
  }

  async deleteStateControl(stateControlId: string): Promise<StateControlEntityModel> {
    return await this.stateControlEntity.delete(stateControlId)
  }
}
