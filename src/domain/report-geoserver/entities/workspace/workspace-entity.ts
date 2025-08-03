import { type IWorkspaceRepository, WorkspaceEntityModel, WorkspaceNameValueObject } from '@/domain/report-geoserver'
import { IdValueObject, NotFoundError } from '@/domain/shared'
import { type WorkspaceDTO, type WorkspaceWithoutIdDTO } from './workspace-dtos'

export class WorkspaceEntity {
  constructor (private readonly repository: IWorkspaceRepository) { }

  async create (dto: WorkspaceWithoutIdDTO): Promise<WorkspaceEntityModel> {
    const workspaceModelOrError = WorkspaceEntityModel.create({
      id: 1,
      ...dto
    })

    return await this.repository.create(workspaceModelOrError)
  }

  async getById (workspaceId: number): Promise<WorkspaceEntityModel> {
    const workspaceIdOrError = IdValueObject.create(workspaceId)

    return await this.repository.getById(workspaceIdOrError)
  }

  async getByName (workspaceName: string): Promise<WorkspaceEntityModel> {
    const workspaceNameOrError = WorkspaceNameValueObject.create(workspaceName)

    return await this.repository.getByName(workspaceNameOrError)
  }

  async getAll (): Promise<WorkspaceEntityModel[]> {
    return await this.repository.getAll()
  }

  async update (dto: WorkspaceDTO): Promise<WorkspaceEntityModel> {
    const workspaceModelOrError = WorkspaceEntityModel.create(dto)

    const workspaceExists = await this.repository.getById(workspaceModelOrError.id)

    if (!workspaceExists) throw new NotFoundError('Este espaço de trabalho não existe')

    return await this.repository.update(workspaceModelOrError)
  }

  async delete (workspaceId: number): Promise<WorkspaceEntityModel> {
    const workspaceIdOrError = IdValueObject.create(workspaceId)

    const workspaceExists = await this.repository.getById(workspaceIdOrError)

    if (!workspaceExists) throw new NotFoundError('Este espaço de trabalho não existe')

    return await this.repository.delete(workspaceIdOrError)
  }
}
