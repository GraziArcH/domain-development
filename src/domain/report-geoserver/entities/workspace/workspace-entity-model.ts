import { type IEntityModel, IdValueObject } from '@/domain/shared'
import { WorkspaceDescriptionValueObject, WorkspaceNameValueObject } from '@/domain/report-geoserver'
import { type WorkspaceDTO } from './workspace-dtos'

export class WorkspaceEntityModel implements IEntityModel<WorkspaceDTO> {
  constructor (
    public readonly id: IdValueObject,
    public readonly name: WorkspaceNameValueObject,
    public readonly description: WorkspaceDescriptionValueObject
  ) { }

  static create ({
    id,
    name,
    description
  }: WorkspaceDTO): WorkspaceEntityModel {
    const idOrError = IdValueObject.create(id)
    const nameOrError = WorkspaceNameValueObject.create(name)
    const descriptionOrError = WorkspaceDescriptionValueObject.create(description)

    return new WorkspaceEntityModel(
      idOrError,
      nameOrError,
      descriptionOrError
    )
  }

  getValues (): WorkspaceDTO {
    return {
      id: this.id.value,
      description: this.description.value,
      name: this.name.value
    }
  }
}
