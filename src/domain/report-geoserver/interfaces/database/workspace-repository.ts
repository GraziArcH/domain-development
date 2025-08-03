import { type WorkspaceEntityModel, type WorkspaceNameValueObject } from '@/domain/report-geoserver'
import { type IdValueObject } from '@/domain/shared'

export interface IWorkspaceRepository {
  create: (storeLayer: WorkspaceEntityModel) => Promise<WorkspaceEntityModel>

  getById: (storeLayerId: IdValueObject) => Promise<WorkspaceEntityModel | null>

  getByName: (workspaceId: WorkspaceNameValueObject) => Promise<WorkspaceEntityModel | null>

  getAll: () => Promise<WorkspaceEntityModel[]>

  update: (storeLayer: WorkspaceEntityModel) => Promise<WorkspaceEntityModel>

  delete: (storeLayerId: IdValueObject) => Promise<WorkspaceEntityModel>
}
