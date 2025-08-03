import { type SpotTypeEntityModel } from '@/domain/report'
import { type IdValueObject, type StringValueObject } from '@/domain/shared'

export interface ISpotTypeRepository {

  create: (spotType: SpotTypeEntityModel) => Promise<SpotTypeEntityModel>

  getById: (spotTypeId: IdValueObject) => Promise<SpotTypeEntityModel | null>

  getSpotTypeByName: (nameValue: StringValueObject) => Promise<SpotTypeEntityModel | null>

  getAll: () => Promise<SpotTypeEntityModel[]>

  update: (spotType: SpotTypeEntityModel) => Promise<SpotTypeEntityModel>

  delete: (spotTypeId: IdValueObject) => Promise<SpotTypeEntityModel>
}
