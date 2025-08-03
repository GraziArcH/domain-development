import { type CustomSpotEntityModel } from '@/domain/report'
import { type IdValueObject, type StringValueObject } from '@/domain/shared'

export interface ICustomSpotRepository {
  create: (customSpot: CustomSpotEntityModel) => Promise<CustomSpotEntityModel>
  getByUserId: (userId: IdValueObject) => Promise<CustomSpotEntityModel[]>
  getBySpotNameAndFilter: (spotName: StringValueObject, filters: StringValueObject) => Promise<CustomSpotEntityModel | null>
  getById: (customSpotId: IdValueObject) => Promise<CustomSpotEntityModel | null>
  delete: (customSpotId: IdValueObject) => Promise<CustomSpotEntityModel>
}
