import { type IStateControlRepository, StateControlEntityModel } from '@/domain/report-geoserver'
import { NotFoundError, StringValueObject } from '@/domain/shared'
import { type StateControlDTO } from './state-control-dtos'

export class StateControlEntity {
  constructor (private readonly repository: IStateControlRepository) { }

  async create (dto: StateControlDTO): Promise<StateControlEntityModel> {
    const stateControlModelOrError = StateControlEntityModel.create(dto)

    return await this.repository.create(stateControlModelOrError)
  }

  async getById (stateControlId: string): Promise<StateControlEntityModel> {
    const stateControlIdOrError = StringValueObject.create(stateControlId)

    return await this.repository.getById(stateControlIdOrError)
  }

  async getAll (): Promise<StateControlEntityModel[]> {
    return await this.repository.getAll()
  }

  async update (dto: StateControlDTO): Promise<StateControlEntityModel> {
    const stateControlModelOrError = StateControlEntityModel.create(dto)

    const stateControlExists = await this.repository.getById(stateControlModelOrError.id)

    if (!stateControlExists) throw new NotFoundError('Este controle de estado não existe')

    return await this.repository.update(stateControlModelOrError)
  }

  async delete (stateControlId: string): Promise<StateControlEntityModel> {
    const stateControlIdOrError = StringValueObject.create(stateControlId)

    const stateControlExists = await this.repository.getById(stateControlIdOrError)

    if (!stateControlExists) throw new NotFoundError('Este controle de estado não existe')

    return await this.repository.delete(stateControlIdOrError)
  }
}
