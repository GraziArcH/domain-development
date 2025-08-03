import { type SpotEntityModel } from '@/domain/report'
import { type StringValueObject } from '@/domain/shared'

export interface ISpotRepository {
  create: (spot: SpotEntityModel, expireIn: number) => Promise<SpotEntityModel>

  getById: (spotId: StringValueObject) => Promise<SpotEntityModel | null>

  update: (spot: SpotEntityModel, expireIn: number) => Promise<SpotEntityModel>

  delete: (spotId: StringValueObject) => Promise<SpotEntityModel>
}
