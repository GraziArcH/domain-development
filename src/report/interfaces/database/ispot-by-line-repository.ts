import { type SpotByLineEntityModel } from '@/domain/report'
import { type IdValueObject } from '@/domain/shared'

export interface ISpotByLineRepository {
  create: (spotByLine: SpotByLineEntityModel) => Promise<SpotByLineEntityModel>

  getById: (spotByLineId: IdValueObject) => Promise<SpotByLineEntityModel | null>

  getAll: () => Promise<SpotByLineEntityModel[]>

  update: (spotByLine: SpotByLineEntityModel) => Promise<SpotByLineEntityModel>

  delete: (spotByLineId: IdValueObject) => Promise<SpotByLineEntityModel>

  getSpotByLineByLineTemplateId: (lineTemplateId: IdValueObject) => Promise<SpotByLineEntityModel[]>
}
