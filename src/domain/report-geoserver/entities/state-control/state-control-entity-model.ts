import { type IEntityModel, StringValueObject } from '@/domain/shared'
import { type StateControlDTO } from './state-control-dtos'

export class StateControlEntityModel implements IEntityModel<StateControlDTO> {
  constructor (
    public readonly id: StringValueObject,
    public readonly workspaceStatus: StringValueObject,
    public readonly storeStatus: StringValueObject,
    public readonly layerStatus: StringValueObject,
    public readonly stack: StringValueObject
  ) { }

  static create ({
    id,
    workspaceStatus,
    storeStatus,
    layerStatus,
    stack
  }: StateControlDTO): StateControlEntityModel {
    const idOrError = StringValueObject.create(id)
    const workspaceStatusOrError = StringValueObject.create(workspaceStatus)
    const storeStatusOrError = StringValueObject.create(storeStatus)
    const layerStatusOrError = StringValueObject.create(layerStatus)
    const stackOrError = StringValueObject.create(stack)

    return new StateControlEntityModel(
      idOrError,
      workspaceStatusOrError,
      storeStatusOrError,
      layerStatusOrError,
      stackOrError
    )
  }

  getValues (): StateControlDTO {
    return {
      id: this.id.value,
      workspaceStatus: this.workspaceStatus.value,
      storeStatus: this.storeStatus.value,
      layerStatus: this.layerStatus.value,
      stack: this.stack.value
    }
  }
}
