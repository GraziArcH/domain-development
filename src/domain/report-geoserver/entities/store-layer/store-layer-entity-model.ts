import { type IEntityModel, IdValueObject } from '@/domain/shared'
import {
  StoreLayerDescriptionValueObject,
  StoreLayerEndpointValueObject,
  StoreLayerNameValueObject,
  StoreLayerTypeValueObject
} from '@/domain/report-geoserver'
import { type StoreLayerDTO } from './store-layer-dtos'

export class StoreLayerEntityModel implements IEntityModel<StoreLayerDTO> {
  constructor (
    public readonly id: IdValueObject,
    public readonly idWorkspace: IdValueObject,
    public readonly name: StoreLayerNameValueObject,
    public readonly description: StoreLayerDescriptionValueObject,
    public readonly type: StoreLayerTypeValueObject,
    public readonly endpoint: StoreLayerEndpointValueObject,
    public readonly createdBy: IdValueObject
  ) { }

  static create ({
    id,
    idWorkspace,
    name,
    description,
    type,
    endpoint,
    createdBy
  }: StoreLayerDTO): StoreLayerEntityModel {
    const idOrError = IdValueObject.create(id)
    const idWorkspaceOrError = IdValueObject.create(idWorkspace)
    const descriptionOrError = StoreLayerDescriptionValueObject.create(description)
    const nameOrError = StoreLayerNameValueObject.create(name)
    const typeOrError = StoreLayerTypeValueObject.create(type)
    const endpointOrError = StoreLayerEndpointValueObject.create(endpoint)
    const createdByOrError = IdValueObject.create(createdBy)

    return new StoreLayerEntityModel(
      idOrError,
      idWorkspaceOrError,
      nameOrError,
      descriptionOrError,
      typeOrError,
      endpointOrError,
      createdByOrError
    )
  }

  getValues (): StoreLayerDTO {
    return {
      id: this.id.value,
      idWorkspace: this.idWorkspace.value,
      name: this.name.value,
      description: this.description.value,
      type: this.type.value,
      endpoint: this.endpoint.value,
      createdBy: this.createdBy.value
    }
  }
}
